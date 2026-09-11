/**
 * Pre-renders the Next image cache at build time.
 *
 * The optimiser encodes AVIF on demand and writes the result to
 * .next/cache/images. A rebuild starts that cache empty, so the first visitor
 * to each photograph waits on an encode -- 2-4s per variant on the VPS's two
 * cores, which reads as missing images. This runs after `next build`, inside
 * the image, so the cache ships already populated.
 *
 * It boots the built server, crawls the pages that carry photographs, pulls
 * the exact variants out of their srcsets and requests them the way a browser
 * would. Nothing here can fail the build: a Strapi outage or a cold network
 * during `docker build` just means fewer variants are warmed, and those get
 * encoded on first request as before.
 */
import { spawn } from "node:child_process";

const PORT = process.env.WARM_PORT || "3000";
const ORIGIN = `http://127.0.0.1:${PORT}`;

/** Locales share their photographs today, but a cover could be localised. */
const LOCALES = ["en", "es", "ca", "fr"];
const PAGES = ["", "/about-us", "/catalogues", "/contact"];

/**
 * Widths worth paying for. The srcsets offer every deviceSize, but a browser
 * picks one: these cover phone through desktop at 1x and 2x. 2048 and 3840 are
 * left out on purpose -- they are the slowest to encode and are only ever
 * chosen by very large or very dense displays.
 */
const WIDTHS = new Set([128, 256, 384, 640, 750, 828, 1080, 1920]);

// What Chrome, Firefox and Safari 16+ all send. Next serves the first format
// in `images.formats` the header allows, so this is the AVIF path.
const ACCEPT = "image/avif,image/webp,image/apng,image/*,*/*;q=0.8";

const BOOT_TIMEOUT_MS = 60_000;
const TOTAL_BUDGET_MS = 8 * 60_000;

const log = (msg) => console.log(`[warm-images] ${msg}`);

async function waitForServer(deadline) {
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${ORIGIN}/api/health`, {
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) return true;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

/** Every /_next/image variant referenced by a page, from src and srcset. */
async function variantsOn(path) {
  const found = new Set();
  try {
    const res = await fetch(`${ORIGIN}${path}`, {
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) {
      log(`${path} -> HTTP ${res.status}, skipped`);
      return found;
    }
    const html = await res.text();
    for (const m of html.matchAll(/\/_next\/image\?url=[^"'\s,]+/g)) {
      const url = m[0].replace(/&amp;/g, "&");
      const width = Number(new URL(url, ORIGIN).searchParams.get("w"));
      if (WIDTHS.has(width)) found.add(url);
    }
  } catch (err) {
    log(`${path} -> ${err.message}, skipped`);
  }
  return found;
}

async function main() {
  const started = Date.now();
  const server = spawn("node_modules/.bin/next", ["start", "--port", PORT], {
    stdio: "ignore",
    env: { ...process.env, NODE_ENV: "production" },
  });
  server.on("error", (err) => log(`could not start server: ${err.message}`));

  try {
    if (!await waitForServer(started + BOOT_TIMEOUT_MS)) {
      log("server did not come up; leaving the cache cold");
      return;
    }

    const variants = new Set();
    for (const locale of LOCALES) {
      for (const page of PAGES) {
        for (const v of await variantsOn(`/${locale}${page}`)) variants.add(v);
      }
    }
    log(`${variants.size} variants to warm`);

    let ok = 0;
    let failed = 0;
    for (const url of variants) {
      if (Date.now() - started > TOTAL_BUDGET_MS) {
        log("time budget spent; stopping early");
        break;
      }
      try {
        const res = await fetch(`${ORIGIN}${url}`, {
          headers: { Accept: ACCEPT },
          signal: AbortSignal.timeout(60_000),
        });
        // Read the body: the cache entry is only written once it is served.
        await res.arrayBuffer();
        if (res.ok) ok += 1;
        else failed += 1;
      } catch {
        failed += 1;
      }
    }

    const secs = ((Date.now() - started) / 1000).toFixed(0);
    log(`warmed ${ok}, failed ${failed}, in ${secs}s`);
  } finally {
    server.kill("SIGTERM");
  }
}

// A cold cache is slow, not broken, so nothing here is worth failing a build.
main()
  .catch((err) => log(`skipped: ${err.message}`))
  .finally(() => process.exit(0));
