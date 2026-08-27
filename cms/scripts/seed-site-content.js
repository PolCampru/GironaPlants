"use strict";

/**
 * Seeds localized marketing content into the `home` and `about-us` single
 * types for every site locale (es, ca, en, fr). The copy mirrors the
 * frontend fallbacks in data/homeContent.ts and data/aboutUsContent.ts —
 * keep them in sync when editing.
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
 *    documents, and publishes each seeded locale.
 *
 * NOTE: publishing a document publishes its ENTIRE current draft. Make sure
 * there are no half-finished draft edits on these single types before
 * running, or they will go live together with the seeded data.
 */

const { createStrapi, compileStrapi } = require("@strapi/strapi");

const FORCE = process.env.SEED_FORCE === "1";
const LOCALES = ["es", "ca", "en", "fr"];

const HOME = {
  es: {
    hero_badge: "Suministro de plantas en toda Europa",
    hero_title: "Las plantas que tu proyecto necesita, en toda Europa",
    hero_subtitle:
      "Más de 30 años consiguiendo planta para profesionales. Cultivamos planta mediterránea en Girona y localizamos cualquier otra especie a través de nuestra red de viveros en España y el resto de Europa. Si no la cultivamos, la encontramos.",
    hero_button: "Ver productos",
    hero_secondary_button: "Solicitar presupuesto",
    trust_items: [
      "Más de 30 años de experiencia",
      "Red de viveros en toda Europa",
      "Cultivo propio en Girona",
      "Presupuesto en 24-48 h",
    ],
    plants_title: "Nuestras plantas",
    plants_subtitle:
      "Del árbol forestal a la gramínea ornamental: encuentra la variedad perfecta para cada proyecto de jardinería y paisajismo. Y si no está en el catálogo, la localizamos por ti.",
    plants_button: "Ver todo el catálogo",
    catalogues_title: "Catálogos",
    catalogues_subtitle:
      "Descarga nuestros catálogos de disponibilidad y producción actualizados.",
    catalogues_button: "Ver catálogos",
    contact_title: "¿Preparamos tu oferta?",
    contact_subtitle:
      "Cuéntanos qué necesita tu proyecto —especies, medidas y cantidades— y te enviamos un presupuesto a medida en 24-48 h, sin compromiso. Servimos en toda Europa.",
    contact_button: "Solicitar presupuesto",
  },
  ca: {
    hero_badge: "Subministrament de plantes a tot Europa",
    hero_title: "Les plantes que el teu projecte necessita, a tot Europa",
    hero_subtitle:
      "Més de 30 anys aconseguint planta per a professionals. Cultivem planta mediterrània a Girona i localitzem qualsevol altra espècie a través de la nostra xarxa de vivers a Espanya i la resta d'Europa. Si no la cultivem, la trobem.",
    hero_button: "Veure productes",
    hero_secondary_button: "Demanar pressupost",
    trust_items: [
      "Més de 30 anys d'experiència",
      "Xarxa de vivers a tot Europa",
      "Cultiu propi a Girona",
      "Pressupost en 24-48 h",
    ],
    plants_title: "Les nostres plantes",
    plants_subtitle:
      "De l'arbre forestal a la gramínia ornamental: troba la varietat perfecta per a cada projecte de jardineria i paisatgisme. I si no és al catàleg, la localitzem per tu.",
    plants_button: "Veure tot el catàleg",
    catalogues_title: "Catàlegs",
    catalogues_subtitle:
      "Descarrega els nostres catàlegs de disponibilitat i producció actualitzats.",
    catalogues_button: "Veure catàlegs",
    contact_title: "Preparem la teva oferta?",
    contact_subtitle:
      "Explica'ns què necessita el teu projecte —espècies, mides i quantitats— i t'enviem un pressupost a mida en 24-48 h, sense compromís. Servim a tot Europa.",
    contact_button: "Demanar pressupost",
  },
  en: {
    hero_badge: "Plant sourcing across Europe",
    hero_title: "The plants your project needs, anywhere in Europe",
    hero_subtitle:
      "More than 30 years sourcing plants for professionals. We grow Mediterranean species at our own nursery in Girona and track down everything else through our grower network across Spain and the rest of Europe. If we don't grow it, we'll find it.",
    hero_button: "Browse products",
    hero_secondary_button: "Request a quote",
    trust_items: [
      "More than 30 years of experience",
      "Grower network across Europe",
      "Own production in Girona",
      "Quote within 24-48 h",
    ],
    plants_title: "Our plants",
    plants_subtitle:
      "From forest trees to ornamental grasses: find the right variety for every gardening and landscaping project — and if it isn't in the catalogue, we'll source it for you.",
    plants_button: "View full catalogue",
    catalogues_title: "Catalogues",
    catalogues_subtitle:
      "Download our up-to-date availability and production catalogues.",
    catalogues_button: "View catalogues",
    contact_title: "Ready for your quote?",
    contact_subtitle:
      "Tell us what your project needs — species, sizes and quantities — and we'll send a tailored quote within 24-48 h, no obligation. We deliver across Europe.",
    contact_button: "Request a quote",
  },
  fr: {
    hero_badge: "Approvisionnement en plantes en Europe",
    hero_title: "Les plantes dont votre projet a besoin, partout en Europe",
    hero_subtitle:
      "Plus de 30 ans à trouver des plantes pour les professionnels. Nous cultivons des plantes méditerranéennes dans notre pépinière de Gérone et localisons toutes les autres espèces grâce à notre réseau de pépinières en Espagne et dans le reste de l'Europe. Si nous ne la cultivons pas, nous la trouvons.",
    hero_button: "Voir les produits",
    hero_secondary_button: "Demander un devis",
    trust_items: [
      "Plus de 30 ans d'expérience",
      "Réseau de pépinières dans toute l'Europe",
      "Production propre à Gérone",
      "Devis sous 24-48 h",
    ],
    plants_title: "Nos plantes",
    plants_subtitle:
      "De l'arbre forestier aux graminées ornementales : trouvez la variété idéale pour chaque projet de jardinage et de paysagisme — et si elle n'est pas au catalogue, nous la trouvons pour vous.",
    plants_button: "Voir tout le catalogue",
    catalogues_title: "Catalogues",
    catalogues_subtitle:
      "Téléchargez nos catalogues de disponibilité et de production à jour.",
    catalogues_button: "Voir les catalogues",
    contact_title: "On prépare votre devis ?",
    contact_subtitle:
      "Dites-nous ce qu'il faut à votre projet — espèces, tailles et quantités — et nous vous envoyons un devis sur mesure sous 24-48 h, sans engagement. Nous livrons dans toute l'Europe.",
    contact_button: "Demander un devis",
  },
};

const CLIENT_IMAGES = [
  "/images/aboutUs/viveristes.svg",
  "/images/aboutUs/gardens.svg",
  "/images/aboutUs/jardiners.svg",
  "/images/aboutUs/obraPublica.svg",
  "/images/aboutUs/sostenibles.svg",
  "/images/aboutUs/paisagistes.svg",
  "/images/aboutUs/comercials.svg",
  "/images/aboutUs/fruiters.svg",
  "/images/aboutUs/organismesOficials.svg",
  "/images/aboutUs/repobladorsForestals.svg",
];

const clients = (list) =>
  list.map(([name, description], i) => ({
    name,
    description,
    image: CLIENT_IMAGES[i],
  }));

const ABOUT = {
  es: {
    title: "Una familia dedicada a las plantas",
    subtitle:
      "es una empresa familiar con más de 30 años de experiencia en el sector de la planta. Cultivamos planta mediterránea en la provincia de Girona y, cuando un proyecto necesita una especie que no tenemos, la conseguimos: trabajamos con una red de viveros de confianza en España y el resto de Europa para servir pedidos completos, de la primera planta a la última.",
    hero_button: "Ver nuestras plantas",
    our_clients: {
      title: "Nuestros clientes",
      subtitle:
        "Del viverista al organismo público: damos servicio a todo tipo de proyectos verdes.",
      clients: clients([
        ["Viveros", "Suministro entre viveros y planta joven para engorde."],
        ["Jardines", "Planta acabada y de temporada, lista para la venta."],
        ["Jardineros", "Pedidos a medida para obra nueva y mantenimiento."],
        ["Obra pública", "Planta para licitaciones y proyectos de obra civil."],
        ["Sostenibles", "Especies de bajo consumo hídrico que favorecen la biodiversidad."],
        ["Paisajistas", "Localizamos los ejemplares exactos que pide cada diseño."],
        ["Comerciales", "Grandes volúmenes con condiciones al por mayor."],
        ["Fruticultores", "Frutales y planta de producción adaptada al clima."],
        ["Organismos oficiales", "Ayuntamientos y administraciones con espacios verdes."],
        ["Reforestadores", "Planta forestal autóctona para repoblaciones."],
      ]),
    },
    catalogues_title: "Catálogos",
    catalogues_subtitle:
      "Descarga nuestros catálogos de disponibilidad y producción actualizados.",
    catalogues_button: "Ver catálogos",
  },
  ca: {
    title: "Una família dedicada a les plantes",
    subtitle:
      "és una empresa familiar amb més de 30 anys d'experiència en el sector de la planta. Cultivem planta mediterrània a la província de Girona i, quan un projecte necessita una espècie que no tenim, l'aconseguim: treballem amb una xarxa de vivers de confiança a Espanya i la resta d'Europa per servir comandes completes, de la primera planta a l'última.",
    hero_button: "Veure les nostres plantes",
    our_clients: {
      title: "Els nostres clients",
      subtitle:
        "Del viverista a l'organisme públic: donem servei a tota mena de projectes verds.",
      clients: clients([
        ["Vivers", "Subministrament entre vivers i planta jove per engreixar."],
        ["Jardins", "Planta acabada i de temporada, a punt per a la venda."],
        ["Jardiners", "Comandes a mida per a obra nova i manteniment."],
        ["Obra pública", "Planta per a licitacions i projectes d'obra civil."],
        ["Sostenibles", "Espècies de baix consum hídric que afavoreixen la biodiversitat."],
        ["Paisatgistes", "Localitzem els exemplars exactes que demana cada disseny."],
        ["Comercials", "Grans volums amb condicions a l'engròs."],
        ["Fruticultors", "Fruiters i planta de producció adaptada al clima."],
        ["Organismes oficials", "Ajuntaments i administracions amb espais verds."],
        ["Repobladors forestals", "Planta forestal autòctona per a repoblacions."],
      ]),
    },
    catalogues_title: "Catàlegs",
    catalogues_subtitle:
      "Descarrega els nostres catàlegs de disponibilitat i producció actualitzats.",
    catalogues_button: "Veure catàlegs",
  },
  en: {
    title: "A family devoted to plants",
    subtitle:
      "is a family-run company with more than 30 years of experience in the plant trade. We grow Mediterranean plants in the province of Girona, Catalonia — and when a project calls for a species we don't grow, we source it through our trusted network of nurseries across Spain and the rest of Europe, delivering complete orders wherever the project is.",
    hero_button: "See our plants",
    our_clients: {
      title: "Our clients",
      subtitle:
        "From nurseries to public bodies: we serve every kind of green project.",
      clients: clients([
        ["Nurseries", "Trade supply and young plants for growing on."],
        ["Garden centres", "Finished, seasonal plants ready for retail."],
        ["Gardeners", "Made-to-measure orders for new builds and maintenance."],
        ["Public works", "Plants for tenders and civil-works projects."],
        ["Sustainable projects", "Low-water species that support biodiversity."],
        ["Landscapers", "We track down the exact specimens each design calls for."],
        ["Retailers", "Large volumes at wholesale terms."],
        ["Fruit growers", "Fruit trees and productive plants suited to the climate."],
        ["Official bodies", "Town councils and public administrations."],
        ["Reforestation", "Native forest plants for repopulation projects."],
      ]),
    },
    catalogues_title: "Catalogues",
    catalogues_subtitle:
      "Download our up-to-date availability and production catalogues.",
    catalogues_button: "View catalogues",
  },
  fr: {
    title: "Une famille passionnée de plantes",
    subtitle:
      "est une entreprise familiale forte de plus de 30 ans d'expérience dans le secteur végétal. Nous cultivons des plantes méditerranéennes dans la province de Gérone, en Catalogne — et lorsqu'un projet demande une espèce que nous ne cultivons pas, nous la trouvons grâce à notre réseau de pépinières de confiance en Espagne et dans le reste de l'Europe, pour livrer des commandes complètes partout en Europe.",
    hero_button: "Voir nos plantes",
    our_clients: {
      title: "Nos clients",
      subtitle:
        "De la pépinière aux organismes publics : nous accompagnons tous les projets verts.",
      clients: clients([
        ["Pépinières", "Approvisionnement entre professionnels et jeunes plants à élever."],
        ["Jardineries", "Plantes finies et de saison, prêtes à la vente."],
        ["Jardiniers", "Commandes sur mesure pour créations et entretien."],
        ["Travaux publics", "Plantes pour appels d'offres et génie civil."],
        ["Projets durables", "Espèces sobres en eau qui favorisent la biodiversité."],
        ["Paysagistes", "Nous trouvons les sujets exacts qu'exige chaque projet."],
        ["Revendeurs", "Gros volumes aux conditions de gros."],
        ["Arboriculteurs", "Arbres fruitiers et plants productifs adaptés au climat."],
        ["Organismes officiels", "Mairies et administrations publiques."],
        ["Reboiseurs", "Plants forestiers indigènes pour le reboisement."],
      ]),
    },
    catalogues_title: "Catalogues",
    catalogues_subtitle:
      "Téléchargez nos catalogues de disponibilité et de production à jour.",
    catalogues_button: "Voir les catalogues",
  },
};

const TARGETS = [
  { uid: "api::home.home", label: "home", content: HOME },
  { uid: "api::about-us.about-us", label: "about-us", content: ABOUT },
];

const isEmpty = (value) =>
  value == null ||
  (typeof value === "string" && value.trim() === "") ||
  (Array.isArray(value) && value.length === 0);

// Text-ish and json attribute types we are willing to seed. Anything else
// (media, relations, components) is out of scope for this script.
const SEEDABLE_TYPES = new Set([
  "string",
  "text",
  "richtext",
  "json",
]);

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
