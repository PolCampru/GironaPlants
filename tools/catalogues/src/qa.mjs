// Reads the rendered PDFs back and checks that every figure in the source data
// survived the redesign. WebKit emits text in short runs, so lines are
// reassembled by y-coordinate before comparing.
import fs from "fs";
const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
import path from "path";
import { fileURLToPath } from "url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const S = ROOT + "/";

/** Every text line in the document, in reading order per column. */
async function linesOf(file) {
  const doc = await pdfjs.getDocument({
    data: new Uint8Array(fs.readFileSync(file)),
  }).promise;
  const lines = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const tc = await (await doc.getPage(p)).getTextContent();
    // split the page down the middle: the layout is two columns
    for (const half of [0, 1]) {
      const rows = new Map();
      for (const it of tc.items) {
        const s = it.str;
        if (!s.trim()) continue;
        const x = it.transform[4];
        if (half === 0 ? x >= 400 : x < 400) continue;
        const y = Math.round(it.transform[5]);
        let k = [...rows.keys()].find((k) => Math.abs(k - y) <= 2);
        if (k === undefined) {
          k = y;
          rows.set(k, []);
        }
        rows.get(k).push({ x, s });
      }
      for (const [, items] of [...rows.entries()].sort((a, b) => b[0] - a[0])) {
        items.sort((a, b) => a.x - b.x);
        lines.push(items.map((i) => i.s).join("").replace(/\s+/g, " ").trim());
      }
    }
  }
  return { lines, pages: doc.numPages };
}

const norm = (s) => s.replace(/\s+/g, "").replace(/—/g, "");

function compare(label, wanted, lines, pages) {
  const bag = new Map();
  for (const l of lines) {
    const k = norm(l);
    bag.set(k, (bag.get(k) || 0) + 1);
  }
  const missing = [];
  for (const w of wanted) {
    const k = norm(w);
    const c = bag.get(k) || 0;
    if (c === 0) missing.push(w);
    else bag.set(k, c - 1);
  }
  console.log(
    `${label}  ${pages}pp  expected ${wanted.length} rows, missing ${missing.length}`,
    missing.slice(0, 6)
  );
}

{
  const src = JSON.parse(fs.readFileSync(S + "data/main.json", "utf8"));
  const wanted = [];
  for (const g of src)
    for (const it of g.items)
      it.rows.forEach((r, i) =>
        wanted.push(
          (i === 0 ? it.name : "·") + r.format + (r.height || "—") + r.price
        )
      );
  const { lines, pages } = await linesOf(S + "out/main.pdf");
  compare("MAIN ", wanted, lines, pages);
  const prices = src.flatMap((g) => g.items.flatMap((i) => i.rows.map((r) => r.price)));
  console.log(
    "      price sum in source:",
    prices.reduce((a, p) => a + parseFloat(p.replace(",", ".")), 0).toFixed(2)
  );
}

{
  const src = JSON.parse(fs.readFileSync(S + "data/esquejes.json", "utf8"));
  const fmt = new Intl.NumberFormat("es-ES", { useGrouping: "always" });
  const wanted = src.map(
    (r) =>
      r.name.slice(r.name.split(" ")[0].length).trim() +
      (r.tray || "—") +
      fmt.format(r.qty)
  );
  const { lines, pages } = await linesOf(S + "out/cuttings.pdf");
  compare("CUTT ", wanted, lines, pages);
}

{
  const { rows } = JSON.parse(fs.readFileSync(S + "data/vivaces.clean.json", "utf8"));
  const wanted = rows.map((r) => {
    const rest = r.name.slice(r.genus.length).replace(/^[\s.]+/, "").trim();
    return (rest || r.name) + (r.flowering || "—") + r.height + r.weeks;
  });
  const { lines, pages } = await linesOf(S + "out/perennials.pdf");
  compare("PER  ", wanted, lines, pages);
}
