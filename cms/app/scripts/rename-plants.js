"use strict";

/**
 * Renames plant rows in place, without touching anything else.
 *
 * `load-plants.js` is the normal way the catalogue changes: it wipes the
 * collection and rewrites it from the supplier listing. That is right when the
 * listing itself is new, and wrong when the only thing that changed is how a
 * name is spelled — a wipe leaves the catalogue empty for as long as the 1,458
 * creates take, and `getCatalogue()` caches for an hour, so a revalidation
 * landing in that window serves an empty A-Z and 404s the deep pages for the
 * next hour. For a two-name correction that risk buys nothing.
 *
 * Run from the STRAPI project root, with the pair file alongside it:
 *
 *   node scripts/rename-plants.js renames.json
 *
 * where renames.json is [{ "from": "<exact description>", "to": "..." }, …].
 *
 * `description` is the species page's <h1> and its URL, so a rename retires
 * the old URL and creates a new one. Check that the new slug is not already
 * taken by another name before running: the script refuses if it is.
 *
 * Set DRY_RUN=1 to report what would change without writing.
 */

const fs = require("fs");
const path = require("path");
const { createStrapi, compileStrapi } = require("@strapi/strapi");

const UID = "api::plant.plant";
const DRY_RUN = process.env.DRY_RUN === "1";

/** A port of lib/slug.ts — the app derives the species URL the same way. */
const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/×/g, "x")
    .replace(/['’`"]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function readPairs(file) {
  const pairs = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(pairs) || pairs.length === 0)
    throw new Error(`${file}: expected a non-empty array of {from, to}`);

  pairs.forEach((pair, i) => {
    const at = `${file} pair ${i}`;
    for (const key of ["from", "to"]) {
      if (typeof pair[key] !== "string" || !pair[key].trim())
        throw new Error(`${at}: ${key} must be a non-empty string`);
    }
    if (pair.from === pair.to) throw new Error(`${at}: from and to are equal`);
    if (Object.keys(pair).some((k) => !["from", "to"].includes(k)))
      throw new Error(`${at}: unknown field`);
  });

  return pairs;
}

async function main() {
  const file = path.resolve(process.argv[2] || "renames.json");
  const pairs = readPairs(file);
  console.log(`${file}: ${pairs.length} rename(s)`);

  const app = await createStrapi(await compileStrapi()).load();
  try {
    // Draft rows included: a document is two table rows, and the draft one
    // carries the same description. Leaving it behind would resurrect the old
    // name the next time anything republishes.
    const all = await app.db.query(UID).findMany({
      select: ["description"],
      limit: Number.MAX_SAFE_INTEGER,
    });
    const names = new Set(all.map((r) => r.description));
    const slugs = new Map();
    for (const name of names) slugs.set(slugify(name), name);

    let refuse = false;
    for (const { from, to } of pairs) {
      if (!names.has(from)) {
        console.error(`  MISSING  ${JSON.stringify(from)} — no row has this description`);
        refuse = true;
        continue;
      }
      const taken = slugs.get(slugify(to));
      if (taken && taken !== from) {
        console.error(
          `  COLLIDES ${JSON.stringify(to)} — slug ${slugify(to)} already belongs to ${JSON.stringify(taken)}`
        );
        refuse = true;
      }
    }
    if (refuse) throw new Error("nothing written — fix the pair file first");

    for (const { from, to } of pairs) {
      const rows = all.filter((r) => r.description === from).length;
      console.log(
        `  ${rows} table row(s)  ${JSON.stringify(from)}\n      -> ${JSON.stringify(to)}  /${slugify(to)}`
      );
    }

    if (DRY_RUN) {
      console.log("DRY_RUN=1 — nothing written.");
      return;
    }

    // `plant` has no relations, no media and no lifecycles, so a direct
    // UPDATE is equivalent to the document service here and is one statement
    // per name rather than one per row.
    let updated = 0;
    for (const { from, to } of pairs) {
      const { count } = await app.db
        .query(UID)
        .updateMany({ where: { description: from }, data: { description: to } });
      console.log(`updated ${count} table row(s) for ${JSON.stringify(to)}`);
      updated += count;
    }

    const after = await app.db.query(UID).findMany({
      select: ["description"],
      limit: Number.MAX_SAFE_INTEGER,
    });
    const left = pairs.filter(({ from }) =>
      after.some((r) => r.description === from)
    );
    const arrived = pairs.filter(({ to }) =>
      after.some((r) => r.description === to)
    );

    console.log(`\ntable rows updated ${updated}`);
    if (left.length || arrived.length !== pairs.length) {
      console.error(
        `MISMATCH — ${left.length} old name(s) still present, ` +
          `${arrived.length}/${pairs.length} new name(s) found`
      );
      process.exitCode = 1;
    } else {
      console.log("OK — every old name is gone and every new one is in place.");
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
