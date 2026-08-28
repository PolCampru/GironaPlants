"use strict";

/**
 * Seeds localized marketing content into the `home`, `about-us` and
 * `catalogue` single types for every site locale (es, ca, en, fr).
 *
 * The copy is NOT written here. It comes from site-content.json, which is
 * generated from the frontend fallbacks in data/*Content.ts by
 * cms/scripts/build-seed-content.mts (`npm run seed:build`). Keeping the
 * strings in one place is deliberate: this file used to hold a second
 * hand-maintained copy of everything and the two drifted apart.
 *
 * Run from the STRAPI project root (inside the gp-strapi container):
 *
 *   node scripts/seed-site-content.js
 *
 * Behavior:
 *  - Only sets attributes that actually exist in each content type's schema
 *    (unknown fields are skipped and reported), so it is safe to run against
 *    any schema version.
 *  - By default only fills EMPTY fields — hand-edited content in the admin
 *    panel is never overwritten. Run with SEED_FORCE=1 to overwrite
 *    everything with the seed copy.
 *  - Creates missing i18n locales, creates missing locale versions of the
 *    documents (including a `catalogue` document that never existed, which
 *    is what made /catalogues a 404), and publishes each seeded locale.
 *
 * NOTE: publishing a document publishes its ENTIRE current draft. Make sure
 * there are no half-finished draft edits on these single types before
 * running, or they will go live together with the seeded data.
 */

const path = require("path");
const { createStrapi, compileStrapi } = require("@strapi/strapi");

const FORCE = process.env.SEED_FORCE === "1";

const CONTENT = require(path.join(__dirname, "site-content.json"));
const LOCALES = CONTENT.locales;

const TARGETS = [
  { uid: "api::home.home", label: "home", content: CONTENT.home },
  { uid: "api::about-us.about-us", label: "about-us", content: CONTENT["about-us"] },
  { uid: "api::catalogue.catalogue", label: "catalogue", content: CONTENT.catalogue },
];

const isEmpty = (value) =>
  value == null ||
  (typeof value === "string" && value.trim() === "") ||
  (Array.isArray(value) && value.length === 0);

// Text-ish and json attribute types we are willing to seed. Anything else
// (media, relations, components) is out of scope for this script.
const SEEDABLE_TYPES = new Set(["string", "text", "richtext", "json"]);

async function ensureLocales(app) {
  const service = app.plugin("i18n").service("locales");
  const existing = await service.find();
  const codes = existing.map((l) => l.code);
  for (const code of LOCALES) {
    if (codes.includes(code)) continue;
    try {
      await service.create({ code, name: code });
      console.log(`[i18n] created missing locale "${code}"`);
    } catch (err) {
      console.warn(
        `[i18n] could not create locale "${code}" (${err.message}) — create it in the admin panel and re-run`
      );
    }
  }
}

function buildData(attributes, seed, existing) {
  const data = {};
  const skipped = [];
  for (const [key, value] of Object.entries(seed)) {
    const attr = attributes[key];
    if (!attr || !SEEDABLE_TYPES.has(attr.type)) {
      skipped.push(key);
      continue;
    }
    if (!FORCE && existing && !isEmpty(existing[key])) continue; // keep hand-edited content
    data[key] = value;
  }
  return { data, skipped };
}

async function findLocaleDoc(app, uid, locale) {
  try {
    return await app.documents(uid).findFirst({ locale, status: "draft" });
  } catch {
    return null;
  }
}

async function findAnyDoc(app, uid) {
  for (const locale of LOCALES) {
    const doc = await findLocaleDoc(app, uid, locale);
    if (doc) return doc;
  }
  return null;
}

async function seedTarget(app, { uid, label, content }) {
  console.log(`\n=== ${label} (${uid}) ===`);

  const contentType = app.contentTypes[uid];
  if (!contentType) {
    console.warn(`[${label}] content type ${uid} not found in this Strapi — skipping`);
    return;
  }

  let anyDoc = await findAnyDoc(app, uid);

  for (const locale of LOCALES) {
    const seed = content[locale];
    if (!seed) continue;

    const existing = await findLocaleDoc(app, uid, locale);
    const { data, skipped } = buildData(contentType.attributes, seed, existing);

    if (skipped.length) {
      console.log(
        `[${label}/${locale}] not in schema, skipped: ${skipped.join(", ")}`
      );
    }
    if (Object.keys(data).length === 0) {
      console.log(
        `[${label}/${locale}] nothing to write (already filled — use SEED_FORCE=1 to overwrite)`
      );
      continue;
    }

    let documentId;
    if (existing) {
      documentId = existing.documentId;
      await app.documents(uid).update({ documentId, locale, data });
    } else if (anyDoc) {
      // Creates the missing locale version of the existing document.
      documentId = anyDoc.documentId;
      await app.documents(uid).update({ documentId, locale, data });
    } else {
      const created = await app.documents(uid).create({ locale, data });
      documentId = created.documentId;
      anyDoc = created;
    }

    try {
      await app.documents(uid).publish({ documentId, locale });
      console.log(
        `[${label}/${locale}] wrote ${Object.keys(data).length} field(s) and published`
      );
    } catch (err) {
      console.warn(
        `[${label}/${locale}] wrote ${Object.keys(data).length} field(s); publish failed (draft & publish disabled?): ${err.message}`
      );
    }
  }
}

async function main() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  try {
    await ensureLocales(app);
    for (const target of TARGETS) {
      await seedTarget(app, target);
    }
    console.log(`\nDone.${FORCE ? " (SEED_FORCE=1: existing content overwritten)" : ""}`);
  } finally {
    await app.destroy();
  }
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
