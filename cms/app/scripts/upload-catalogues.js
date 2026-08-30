"use strict";

/**
 * Uploads the three catalogue PDFs and their covers, and wires them into the
 * `catalogue` single type: the general catalogue into `main_catalogue` /
 * `main_cover`, the two availability lists into the `catalogues` repeatable
 * component of every locale.
 *
 * Run from the STRAPI project root, with the files in ./catalogue-assets:
 *
 *   node scripts/upload-catalogues.js
 *
 * Idempotent: a file already in the media library under the same name is
 * reused instead of uploaded again. After regenerating an asset, replace it
 * with FORCE_NAMES="a.pdf,b.jpg" (or FORCE_UPLOAD=1 for all of them) — the old
 * copy is deleted so the library keeps one file per name.
 *
 * NOTE: publishing a document publishes its ENTIRE current draft, so make sure
 * there are no half-finished draft edits on the Catalogue single type first.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const { createStrapi, compileStrapi } = require("@strapi/strapi");

const UID = "api::catalogue.catalogue";
const ASSETS = process.env.ASSETS_DIR || path.join(process.cwd(), "catalogue-assets");
const FORCE_ALL = process.env.FORCE_UPLOAD === "1";
/** Re-upload only these names, replacing what is in the library. */
const FORCE_NAMES = new Set(
  (process.env.FORCE_NAMES || "").split(",").map((s) => s.trim()).filter(Boolean)
);

const MIME = { ".pdf": "application/pdf", ".jpg": "image/jpeg", ".png": "image/png" };

/** The files, and the alt/caption they carry into the media library. */
const ASSET_LIST = [
  ["girona-plants-catalogo-general-2025-2026.pdf", "main.pdf"],
  ["girona-plants-catalogo-general-portada.jpg", "cover-main.jpg"],
  ["girona-plants-esquejes-enraizados-2026.pdf", "cuttings.pdf"],
  ["girona-plants-esquejes-enraizados-portada.jpg", "card-cuttings.jpg"],
  ["girona-plants-vivaces-gramineas-helechos-2026.pdf", "perennials.pdf"],
  ["girona-plants-vivaces-gramineas-helechos-portada.jpg", "card-perennials.jpg"],
];

/** Card copy per locale, in the order the cards should appear. */
const CARDS = {
  es: [
    {
      title: "Esquejes enraizados",
      subtitle:
        "Stock real a 14 de abril de 2026: 2.084 referencias de arbustos, coníferas, trepadoras, gramíneas y vivaces, con las unidades disponibles en bandeja.",
      button: "Descargar PDF",
    },
    {
      title: "Vivaces, gramíneas y helechos",
      subtitle:
        "Planta joven en alvéolo de 4 cm: 1.192 referencias con floración, altura y semana de disponibilidad para la temporada 2026.",
      button: "Descargar PDF",
    },
  ],
  ca: [
    {
      title: "Esqueixos arrelats",
      subtitle:
        "Estoc real a 14 d'abril de 2026: 2.084 referències d'arbusts, coníferes, enfiladisses, gramínies i vivaces, amb les unitats disponibles en safata.",
      button: "Descarregar PDF",
    },
    {
      title: "Vivaces, gramínies i falgueres",
      subtitle:
        "Planta jove en alvèol de 4 cm: 1.192 referències amb floració, alçada i setmana de disponibilitat per a la temporada 2026.",
      button: "Descarregar PDF",
    },
  ],
  en: [
    {
      title: "Rooted cuttings",
      subtitle:
        "Live stock at 14 April 2026: 2,084 references across shrubs, conifers, climbers, grasses and perennials, with the units available per tray.",
      button: "Download PDF",
    },
    {
      title: "Perennials, grasses and ferns",
      subtitle:
        "Young plants in 4 cm plugs: 1,192 references with flowering months, mature height and the week each batch is available in 2026.",
      button: "Download PDF",
    },
  ],
  fr: [
    {
      title: "Boutures racinées",
      subtitle:
        "Stock réel au 14 avril 2026 : 2 084 références d'arbustes, conifères, grimpantes, graminées et vivaces, avec les quantités disponibles par plaque.",
      button: "Télécharger le PDF",
    },
    {
      title: "Vivaces, graminées et fougères",
      subtitle:
        "Jeunes plants en alvéole de 4 cm : 1 192 références avec floraison, hauteur et semaine de disponibilité pour la saison 2026.",
      button: "Télécharger le PDF",
    },
  ],
};

async function findOrUpload(app, name, source) {
  const force = FORCE_ALL || FORCE_NAMES.has(name);
  const existing = await app.documents("plugin::upload.file").findMany({
    filters: { name },
  });

  if (!force) {
    if (existing.length) {
      console.log(`  reusing  ${name} (id ${existing[0].id})`);
      return existing[0];
    }
  } else {
    // replacing: drop the old copies so the library keeps one file per name
    for (const old of existing) {
      await app.plugin("upload").service("upload").remove(old);
      console.log(`  removed  ${name} (id ${old.id})`);
    }
  }

  const file = path.join(ASSETS, source);
  if (!fs.existsSync(file)) throw new Error(`missing asset: ${file}`);
  const stat = fs.statSync(file);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "gp-upload-"));

  const [uploaded] = await app
    .plugin("upload")
    .service("upload")
    .upload({
      data: { fileInfo: { name, alternativeText: "", caption: "" } },
      files: {
        filepath: file,
        originalFilename: name,
        mimetype: MIME[path.extname(source)] || "application/octet-stream",
        size: stat.size,
        tmpWorkingDirectory: tmp,
      },
    });

  console.log(
    `  uploaded ${name} (id ${uploaded.id}, ${(stat.size / 1024).toFixed(0)} KB)`
  );
  return uploaded;
}

async function main() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  try {
    console.log(`Assets from ${ASSETS}`);
    const media = {};
    for (const [name, source] of ASSET_LIST) {
      media[source] = await findOrUpload(app, name, source);
    }

    const locales = (await app.plugin("i18n").service("locales").find()).map(
      (l) => l.code
    );
    console.log(`Locales: ${locales.join(", ")}`);

    for (const locale of locales) {
      const cards = CARDS[locale];
      if (!cards) {
        console.log(`[${locale}] no card copy written for this locale — skipped`);
        continue;
      }

      const doc = await app
        .documents(UID)
        .findFirst({ locale, status: "draft" });
      if (!doc) {
        console.log(`[${locale}] no catalogue document — skipped`);
        continue;
      }

      await app.documents(UID).update({
        documentId: doc.documentId,
        locale,
        data: {
          // not localized: written on every locale, stored once
          main_catalogue: media["main.pdf"].id,
          main_cover: media["cover-main.jpg"].id,
          catalogues: [
            {
              ...cards[0],
              file: media["cuttings.pdf"].id,
              image: media["card-cuttings.jpg"].id,
            },
            {
              ...cards[1],
              file: media["perennials.pdf"].id,
              image: media["card-perennials.jpg"].id,
            },
          ],
        },
      });
      await app.documents(UID).publish({ documentId: doc.documentId, locale });
      console.log(`[${locale}] catalogue updated and published`);
    }
  } finally {
    await app.destroy();
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
