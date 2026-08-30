// Renders a local HTML file to PDF or PNG with WKWebView.
//
//   webrender pdf  <in.html> <out.pdf>  <pageW> <pageH>
//   webrender png  <in.html> <out.png>  <w> <h>
//
// The catalogue documents paginate themselves on load, so the render waits for
// document.documentElement.dataset.ready before capturing.

import Cocoa
import PDFKit
import WebKit

let args = CommandLine.arguments
guard args.count >= 6 else {
    FileHandle.standardError.write("usage: webrender pdf|png in out w h\n".data(using: .utf8)!)
    exit(2)
}
let mode = args[1]
let input = args[2].hasPrefix("http") ? URL(string: args[2])! : URL(fileURLWithPath: args[2])
let output = URL(fileURLWithPath: args[3])
let W = Double(args[4])!
let H = Double(args[5])!
let PAGE_INDEX = args.count > 6 ? Int(args[6])! : 0

final class Renderer: NSObject, WKNavigationDelegate {
    let web: WKWebView
    var done = false

    override init() {
        let cfg = WKWebViewConfiguration()
        cfg.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        web = WKWebView(frame: NSRect(x: 0, y: 0, width: W, height: H), configuration: cfg)
        web.setValue(false, forKey: "drawsBackground")
        super.init()
        web.navigationDelegate = self
    }

    func load() {
        let arg = CommandLine.arguments[2]
        if arg.hasPrefix("http") {
            web.load(URLRequest(url: URL(string: arg)!))
        } else {
            web.loadFileURL(input, allowingReadAccessTo: input.deletingLastPathComponent())
        }
    }

    func webView(_ w: WKWebView, didFinish nav: WKNavigation!) {
        waitReady(attempt: 0)
    }

    func webView(_ w: WKWebView, didFail nav: WKNavigation!, withError e: Error) {
        FileHandle.standardError.write("load failed: \(e)\n".data(using: .utf8)!)
        exit(1)
    }

    /// Poll for the document's own "I have finished laying out" flag.
    func waitReady(attempt: Int) {
        web.evaluateJavaScript(
            "String(document.documentElement.dataset.ready === '1' && document.fonts.status === 'loaded')"
        ) { value, _ in
            let ready = ((value as? String) ?? "false") == "true"
            if ready || attempt > 600 {
                if !ready {
                    FileHandle.standardError.write("warning: timed out waiting for layout\n".data(using: .utf8)!)
                }
                // one more runloop turn so the final paint settles
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.6) { self.capture() }
            } else {
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                    self.waitReady(attempt: attempt + 1)
                }
            }
        }
    }

    func capture() {
        if mode == "png" {
            if PAGE_INDEX > 0 {
                let full = NSRect(x: 0, y: 0, width: W, height: H * Double(PAGE_INDEX + 1))
                let win = NSWindow(contentRect: full, styleMask: [.borderless],
                                   backing: .buffered, defer: false)
                win.contentView = web
                web.frame = full
                window = win
            }
            let cfg = WKSnapshotConfiguration()
            cfg.rect = NSRect(x: 0, y: Double(PAGE_INDEX) * H, width: W, height: H)
            cfg.snapshotWidth = NSNumber(value: W)
            DispatchQueue.main.asyncAfter(deadline: .now() + (PAGE_INDEX > 0 ? 1.0 : 0.0)) {
            self.web.takeSnapshot(with: cfg) { image, err in
                guard let image = image, err == nil else {
                    FileHandle.standardError.write("snapshot failed: \(String(describing: err))\n".data(using: .utf8)!)
                    exit(1)
                }
                guard let tiff = image.tiffRepresentation,
                      let rep = NSBitmapImageRep(data: tiff),
                      let png = rep.representation(using: .png, properties: [:]) else {
                    FileHandle.standardError.write("encode failed\n".data(using: .utf8)!)
                    exit(1)
                }
                try? png.write(to: output)
                print("wrote \(output.lastPathComponent)")
                exit(0)
            }
            }
        } else {
            // Measure the document, then print every page-sized slice.
            web.evaluateJavaScript("document.documentElement.dataset.pages") { v, err in
                let pages = Int((v as? String) ?? "0") ?? 0
                if pages == 0 {
                    FileHandle.standardError.write("page count failed: \(String(describing: v)) \(String(describing: err))\n".data(using: .utf8)!)
                    exit(1)
                }
                self.printPDF(pageCount: pages)
            }
        }
    }

    var window: NSWindow?
    var slices: [Data] = []

    /// WebKit renders a rect of the page straight to vector PDF. Printing the
    /// whole view instead produces a rasterised file hundreds of times larger.
    func printPDF(pageCount: Int) {
        let full = NSRect(x: 0, y: 0, width: W, height: H * Double(pageCount))
        let win = NSWindow(contentRect: full, styleMask: [.borderless],
                           backing: .buffered, defer: false)
        win.contentView = web
        web.frame = full
        window = win

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.8) {
            self.slice(index: 0, of: pageCount)
        }
    }

    func slice(index: Int, of total: Int) {
        if index == total { return finish(pageCount: total) }
        let cfg = WKPDFConfiguration()
        cfg.rect = CGRect(x: 0, y: Double(index) * H, width: W, height: H)
        web.createPDF(configuration: cfg) { result in
            switch result {
            case .success(let data):
                self.slices.append(data)
                DispatchQueue.main.async { self.slice(index: index + 1, of: total) }
            case .failure(let e):
                FileHandle.standardError.write("page \(index + 1) failed: \(e)\n".data(using: .utf8)!)
                exit(1)
            }
        }
    }

    func finish(pageCount: Int) {
        let out = PDFDocument()
        var n = 0
        for data in slices {
            guard let d = PDFDocument(data: data) else { continue }
            for i in 0..<d.pageCount {
                if let p = d.page(at: i) { out.insert(p, at: n); n += 1 }
            }
        }
        out.write(to: output)
        print("wrote \(output.lastPathComponent) (\(n) pages)")
        exit(0)
    }
}

let app = NSApplication.shared
app.setActivationPolicy(.prohibited)
let r = Renderer()
r.load()
app.run()
