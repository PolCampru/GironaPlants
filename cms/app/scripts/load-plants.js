"use strict";

/**
 * Replaces the whole `plant` collection with a new catalogue listing.
 *
 * The listing is produced from the supplier's PDF by
 * `tools/catalogues/src/parse-main.mjs` and flattened by
 * `tools/catalogues/src/plants-for-strapi.mjs`; this script only loads it.
 *
 * Run from the STRAPI project root, with the JSON alongside it:
 *
 *   node scripts/load-plants.js plants.json
 *
 * Destructive by design: the catalogue is re-imported in bulk, never edited
 * row by row, so every existing plant document is deleted first. Nothing else
 * in Strapi points at `plant` — no relation, no media, no component — so the
 * delete is a plain table wipe rather than a document-by-document teardown,
 * which for ~1,500 rows is the difference between seconds and minutes.
 *
 * Back up data/data.db before running. `deploy-schema-to-vps.sh` does this;
 * on its own, this script does not.
 *
 * Set DRY_RUN=1 to validate the file and report the delta without writing.
 */

const fs = require("fs");
const path = require("path");
const { createStrapi, compileStrapi } = require("@strapi/strapi");

const UID = "api::plant.plant";
const DRY_RUN = process.env.DRY_RUN === "1";
/** Documents are created one HTTP-less call at a time; a few in flight keeps
 *  SQLite busy without piling up write locks. */
const CONCURRENCY = Number(process.env.CONCURRENCY || 8);

const FIELDS = ["genus", "description", "pot_size", "height", "price"];

function readRows(file) {
  const rows = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(rows) || rows.length === 0)
    throw new Error(`${file}: expected a non-empty array of rows`);

  rows.forEach((row, i) => {
    const at = `${file} row ${i}`;
    for (const key of Object.keys(row))
      if (!FIELDS.includes(key)) throw new Error(`${at}: unknown field ${key}`);
    if (!row.genus || typeof row.genus !== "string")
      throw new Error(`${at}: genus is required`);
    if (!row.description || typeof row.description !== "string")
      throw new Error(`${at}: description is required`);
    if (typeof row.price !== "number" || !Number.isFinite(row.price) || row.price <= 0)
      throw new Error(`${at}: price must be a positive number, got ${row.price}`);
    for (const key of ["pot_size", "height"])
      if (row[key] != null && typeof row[key] !== "string")
        throw new Error(`${at}: ${key} must be a string`);
  });

  return rows;
}

/** Runs `fn` over `items`, at most `limit` at a time, in order. */
async function pooled(items, limit, fn) {
  let next = 0;
  let done = 0;
  const failures = [];
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    for (let i = next++; i < items.length; i = next++) {
      try {
        await fn(items[i], i);
      } catch (err) {
        failures.push({ index: i, item: items[i], message: err.message });
      }
      if (++done % 200 === 0) console.log(`  ${done}/${items.length}`);
    }
  });
  await Promise.all(workers);
  return failures;
}

/** The whole table, draft rows included. `publishedAt` has to be selected
 *  explicitly or every row reads as a draft. */
const readAll = (app) =>
  app.db.query(UID).findMany({
    select: [...FIELDS, "publishedAt"],
    limit: Number.MAX_SAFE_INTEGER,
  });

const summarise = (rows) => ({
  rows: rows.length,
  genera: new Set(rows.map((r) => r.genus)).size,
  taxa: new Set(rows.map((r) => r.description)).size,
  priceSum: Number(rows.reduce((a, r) => a + Number(r.price), 0).toFixed(2)),
});

async function main() {
  const file = path.resolve(process.argv[2] || "plants.json");
  const rows = readRows(file);
  console.log(`${file}: ${JSON.stringify(summarise(rows))}`);

  const app = await createStrapi(await compileStrapi()).load();
  try {
    const before = await readAll(app);
    const published = before.filter((r) => r.publishedAt != null);
    console.log(
      `in Strapi now: ${before.length} table rows, ` +
        `${JSON.stringify(summarise(published.length ? published : before))}`
    );

    if (DRY_RUN) {
      console.log("DRY_RUN=1 — nothing written.");
      return;
    }

    const { count } = await app.db.query(UID).deleteMany({ where: {} });
    console.log(`deleted ${count} table rows`);

    console.log(`creating ${rows.length} published documents…`);
    const failures = await pooled(rows, CONCURRENCY, (row) =>
      app.documents(UID).create({
        status: "published",
        data: {
          genus: row.genus,
          description: row.description,
          pot_size: row.pot_size ?? "",
          height: row.height ?? "",
          price: row.price,
        },
      })
    );

    for (const f of failures.slice(0, 20))
      console.error(`  FAILED ${f.item.genus} | ${f.item.description}: ${f.message}`);
    if (failures.length > 20) console.error(`  …and ${failures.length - 20} more`);

    const after = await readAll(app);
    const live = after.filter((r) => r.publishedAt != null);
    console.log(`\ncreated ${rows.length - failures.length}, failed ${failures.length}`);
    console.log(`table rows now ${after.length}`);
    console.log(`published: ${JSON.stringify(summarise(live))}`);

    const expected = summarise(rows);
    const got = summarise(live);
    const mismatch = Object.keys(expected).filter((k) => expected[k] !== got[k]);
    if (failures.length || mismatch.length) {
      console.error(`\nMISMATCH on ${mismatch.join(", ") || "creates"} — expected ${JSON.stringify(expected)}`);
      process.exitCode = 1;
    } else {
      console.log("\nOK — published set matches the listing exactly.");
    }
  } finally {
    await app.destroy();
  }
}

main().then(
  () => process.exit(process.exitCode ?? 0),
  (err) => {
    console.error(err);
    process.exit(1);
  }
);
