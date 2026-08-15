"use strict";

/**
 * One-off data migration: copies the legacy catalogue1..3 flat fields of the
 * `catalogue` single type into the new `catalogues` repeatable component,
 * for every locale.
 *
 * Run from the STRAPI project root (after the schema change is deployed):
 *
 *   node scripts/migrate-catalogues.js
 *
 * Idempotent: locales whose `catalogues` array is already non-empty are
 * skipped, and it still runs cleanly after the legacy fields have been
 * removed from the schema (it simply finds nothing left to migrate).
 *
 * Locales listed in EMPTY_LOCALES are skipped entirely (the new field
 * defaults to an empty array, which hides the section — matching the old
 * frontend hardcoding "hide on en/fr"). Adjust via env var:
 *   CATALOGUE_MIGRATION_EMPTY_LOCALES="" node scripts/migrate-catalogues.js
 *
 * NOTE: publishing a document publishes its ENTIRE current draft. Make sure
 * there are no half-finished draft edits on the Catalogue single type before
 * running this, or they will go live together with the migrated data.
 */

const { createStrapi, compileStrapi } = require("@strapi/strapi");

const UID = "api::catalogue.catalogue";
const LEGACY_SLOTS = [1, 2, 3];
const EMPTY_LOCALES = (process.env.CATALOGUE_MIGRATION_EMPTY_LOCALES ?? "en,fr")
  .split(",")
  .map((l) => l.trim())
  .filter(Boolean);

async function findDoc(app, locale) {
  const fullPopulate = { catalogues: { populate: "*" } };
  for (const n of LEGACY_SLOTS) {
    fullPopulate[`catalogue${n}`] = true;
    fullPopulate[`catalogue${n}_img`] = true;
  }
  try {
    return await app
      .documents(UID)
      .findFirst({ locale, status: "draft", populate: fullPopulate });
  } catch {
    // Legacy fields already removed from the schema (post-cleanup re-run):
    // retry populating only the new field.
    return await app.documents(UID).findFirst({
      locale,
      status: "draft",
      populate: { catalogues: { populate: "*" } },
    });
  }
}

async function main() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  try {
    const locales = await app.plugin("i18n").service("locales").find();
    const codes = locales.map((l) => l.code);
    console.log(`Locales found: ${codes.join(", ")}`);

    for (const locale of codes) {
      if (EMPTY_LOCALES.includes(locale)) {
        console.log(`[${locale}] in EMPTY_LOCALES — leaving array empty`);
        continue;
      }

      const doc = await findDoc(app, locale);
      if (!doc) {
        console.log(`[${locale}] no catalogue document — skipping`);
        continue;
      }
      if (Array.isArray(doc.catalogues) && doc.catalogues.length > 0) {
        console.log(
          `[${locale}] already migrated (${doc.catalogues.length} items) — skipping`
        );
        continue;
      }

      const items = [];
      for (const n of LEGACY_SLOTS) {
        const title = doc[`catalogue${n}_title`];
        const subtitle = doc[`catalogue${n}_subtitle`];
        const button = doc[`catalogue${n}_button`];
        const file = doc[`catalogue${n}`];
        const image = doc[`catalogue${n}_img`];
        // Keep any slot with content in ANY field — the old frontend rendered
        // all three slots unconditionally.
        if (!title && !subtitle && !button && !file && !image) continue;
        items.push({
          title: title ?? "",
          subtitle: subtitle ?? "",
          button: button ?? "",
          file: file ? file.id : null,
          image: image ? image.id : null,
        });
      }

      if (items.length === 0) {
        console.log(`[${locale}] no legacy data found — skipping`);
        continue;
      }

      await app.documents(UID).update({
        documentId: doc.documentId,
        locale,
        data: { catalogues: items },
      });

      console.log(
        `[${locale}] publishing draft (any pending draft edits go live too)`
      );
      try {
        await app.documents(UID).publish({ documentId: doc.documentId, locale });
      } catch (err) {
        console.warn(
          `[${locale}] publish failed (draft & publish disabled?): ${err.message}`
        );
      }

      console.log(`[${locale}] migrated ${items.length} catalogue item(s)`);
    }

    console.log("Done.");
  } finally {
    await app.destroy();
  }
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
