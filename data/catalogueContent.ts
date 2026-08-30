/**
 * Copy for the genus and species catalogue pages.
 *
 * These pages exist to be landed on from a search engine, so every word here
 * has to be in the server-rendered HTML — which rules out react-i18next, for
 * the reason set out at the top of data/pageHeadings.ts. Sentences that
 * interpolate counts are functions rather than templates so each locale keeps
 * control of its own plurals and word order.
 *
 * Nothing here states a horticultural fact. Everything interpolated (species
 * counts, pot sizes, heights, prices) comes from the catalogue rows, so a page
 * can never claim something the nursery does not actually hold.
 */

type Plural = (n: number, one: string, many: string) => string;

const plural: Plural = (n, one, many) => (n === 1 ? one : many);

export type GenusLeadParams = {
  genus: string;
  /** Distinct botanical names in this genus. */
  species: number;
  /** Catalogue rows — one per name/pot/height combination. */
  references: number;
  /** Human list of the most common pot sizes, e.g. "C3, C5, C10". */
  formats: string;
};

export type SpeciesLeadParams = {
  name: string;
  genus: string;
  formats: number;
  formatList: string;
  heightList: string;
  price: string;
};

export type CatalogueCopy = {
  breadcrumb: { home: string; products: string };
  genus: {
    label: string;
    lead: (p: GenusLeadParams) => string;
    speciesHeading: string;
    speciesLead: string;
    referencesHeading: string;
    neighboursHeading: string;
    neighboursLead: string;
  };
  species: {
    label: string;
    lead: (p: SpeciesLeadParams) => string;
    formatsHeading: string;
    siblingsHeading: (genus: string) => string;
    seeGenus: (genus: string) => string;
  };
  table: {
    species: string;
    potSize: string;
    height: string;
    price: string;
    /** Accessible name for the quote column, which has no visible header. */
    addLabel: string;
    note: string;
  };
  cta: { title: string; body: string; quote: string; contact: string };
  directory: { label: string; title: string; lead: string; all: string };
  meta: {
    genusTitle: (genus: string) => string;
    genusDescription: (p: GenusLeadParams) => string;
    speciesTitle: (name: string) => string;
    speciesDescription: (p: SpeciesLeadParams) => string;
    genusKeywords: (genus: string) => string[];
    speciesKeywords: (name: string) => string[];
  };
};

const es: CatalogueCopy = {
  breadcrumb: { home: "Inicio", products: "Catálogo" },
  genus: {
    label: "Género",
    lead: ({ genus, species, references, formats }) =>
      `${references} ${plural(references, "referencia disponible", "referencias disponibles")} de ${species} ${plural(species, "especie", "especies")} del género ${genus}` +
      (formats ? `, en formatos ${formats}` : "") +
      `. Cultivo propio en Girona y red de viveros en toda Europa para lo que no tenemos en stock.`,
    speciesHeading: "Especies y variedades",
    speciesLead: "Cada ficha reúne los formatos, alturas y precios disponibles.",
    referencesHeading: "Todas las referencias",
    neighboursHeading: "Otros géneros del catálogo",
    neighboursLead: "Más de 300 géneros disponibles para profesionales.",
  },
  species: {
    label: "Especie",
    lead: ({ name, formats, formatList, heightList, price }) =>
      `${name} disponible en ${formats} ${plural(formats, "formato", "formatos")}` +
      (formatList ? ` (${formatList})` : "") +
      (heightList ? `, con alturas de ${heightList}` : "") +
      (price ? `. Precio al por mayor desde ${price} por unidad` : "") +
      `. Te confirmamos disponibilidad y precio cerrado en 24-48 h.`,
    formatsHeading: "Formatos disponibles",
    siblingsHeading: (genus) => `Otras especies de ${genus}`,
    seeGenus: (genus) => `Ver todo el género ${genus}`,
  },
  table: {
    species: "Especie",
    potSize: "Formato",
    height: "Altura",
    price: "Precio",
    addLabel: "Añadir al presupuesto",
    note: "Precio por unidad, orientativo. La disponibilidad y el precio final se confirman en el presupuesto.",
  },
  cta: {
    title: "¿Necesitas esta planta para tu proyecto?",
    body: "Dinos formato, altura y cantidad y te devolvemos un presupuesto cerrado en 24-48 h. Si no la cultivamos, la localizamos en nuestra red de viveros europea.",
    quote: "Pedir presupuesto",
    contact: "Hablar con nosotros",
  },
  directory: {
    label: "Índice",
    title: "Todos los géneros del catálogo",
    lead: "Recorre el catálogo por género botánico: cada uno lleva a sus especies, formatos y precios.",
    all: "Ver todas las referencias",
  },
  meta: {
    genusTitle: (genus) => `${genus} · Venta al por mayor`,
    genusDescription: ({ genus, species, references, formats }) =>
      `${references} referencias de ${genus} en ${species} ${plural(species, "especie", "especies")}` +
      (formats ? `, formatos ${formats}` : "") +
      `. Precios al por mayor para paisajistas y garden centers. Presupuesto en 24-48 h.`,
    speciesTitle: (name) => `${name} · Precio al por mayor`,
    speciesDescription: ({ name, formats, formatList, price }) =>
      `${name} en ${formats} ${plural(formats, "formato", "formatos")}` +
      (formatList ? ` (${formatList})` : "") +
      (price ? `, desde ${price} por unidad` : "") +
      `. Vivero en Girona con envío a toda Europa. Pide presupuesto.`,
    genusKeywords: (genus) => [
      genus,
      `comprar ${genus}`,
      `${genus} al por mayor`,
      `${genus} vivero`,
      `precio ${genus}`,
    ],
    speciesKeywords: (name) => [
      name,
      `comprar ${name}`,
      `${name} precio`,
      `${name} al por mayor`,
      `${name} vivero Girona`,
    ],
  },
};

const ca: CatalogueCopy = {
  breadcrumb: { home: "Inici", products: "Catàleg" },
  genus: {
    label: "Gènere",
    lead: ({ genus, species, references, formats }) =>
      `${references} ${plural(references, "referència disponible", "referències disponibles")} de ${species} ${plural(species, "espècie", "espècies")} del gènere ${genus}` +
      (formats ? `, en formats ${formats}` : "") +
      `. Cultiu propi a Girona i xarxa de vivers arreu d'Europa per al que no tenim en estoc.`,
    speciesHeading: "Espècies i varietats",
    speciesLead: "Cada fitxa recull els formats, alçades i preus disponibles.",
    referencesHeading: "Totes les referències",
    neighboursHeading: "Altres gèneres del catàleg",
    neighboursLead: "Més de 300 gèneres disponibles per a professionals.",
  },
  species: {
    label: "Espècie",
    lead: ({ name, formats, formatList, heightList, price }) =>
      `${name} disponible en ${formats} ${plural(formats, "format", "formats")}` +
      (formatList ? ` (${formatList})` : "") +
      (heightList ? `, amb alçades de ${heightList}` : "") +
      (price ? `. Preu a l'engròs des de ${price} per unitat` : "") +
      `. Et confirmem disponibilitat i preu tancat en 24-48 h.`,
    formatsHeading: "Formats disponibles",
    siblingsHeading: (genus) => `Altres espècies de ${genus}`,
    seeGenus: (genus) => `Veure tot el gènere ${genus}`,
  },
  table: {
    species: "Espècie",
    potSize: "Format",
    height: "Alçada",
    price: "Preu",
    addLabel: "Afegir al pressupost",
    note: "Preu per unitat, orientatiu. La disponibilitat i el preu final es confirmen al pressupost.",
  },
  cta: {
    title: "Necessites aquesta planta per al teu projecte?",
    body: "Digues-nos format, alçada i quantitat i et tornem un pressupost tancat en 24-48 h. Si no la cultivem, la localitzem a la nostra xarxa de vivers europea.",
    quote: "Demanar pressupost",
    contact: "Parlar amb nosaltres",
  },
  directory: {
    label: "Índex",
    title: "Tots els gèneres del catàleg",
    lead: "Recorre el catàleg per gènere botànic: cadascun porta a les seves espècies, formats i preus.",
    all: "Veure totes les referències",
  },
  meta: {
    genusTitle: (genus) => `${genus} · Venda a l'engròs`,
    genusDescription: ({ genus, species, references, formats }) =>
      `${references} referències de ${genus} en ${species} ${plural(species, "espècie", "espècies")}` +
      (formats ? `, formats ${formats}` : "") +
      `. Preus a l'engròs per a paisatgistes i garden centers. Pressupost en 24-48 h.`,
    speciesTitle: (name) => `${name} · Preu a l'engròs`,
    speciesDescription: ({ name, formats, formatList, price }) =>
      `${name} en ${formats} ${plural(formats, "format", "formats")}` +
      (formatList ? ` (${formatList})` : "") +
      (price ? `, des de ${price} per unitat` : "") +
      `. Viver a Girona amb enviament a tot Europa. Demana pressupost.`,
    genusKeywords: (genus) => [
      genus,
      `comprar ${genus}`,
      `${genus} a l'engròs`,
      `${genus} viver`,
      `preu ${genus}`,
    ],
    speciesKeywords: (name) => [
      name,
      `comprar ${name}`,
      `${name} preu`,
      `${name} a l'engròs`,
      `${name} viver Girona`,
    ],
  },
};

const en: CatalogueCopy = {
  breadcrumb: { home: "Home", products: "Catalogue" },
  genus: {
    label: "Genus",
    lead: ({ genus, species, references, formats }) =>
      `${references} ${plural(references, "reference", "references")} of ${species} ${plural(species, "species", "species")} in the genus ${genus}` +
      (formats ? `, in ${formats} formats` : "") +
      `. Grown at our own nursery in Girona, Spain, and sourced through a grower network across Europe for whatever we don't hold in stock.`,
    speciesHeading: "Species and varieties",
    speciesLead: "Each page lists the pot sizes, heights and prices available.",
    referencesHeading: "All references",
    neighboursHeading: "Other genera in the catalogue",
    neighboursLead: "More than 300 genera available to the trade.",
  },
  species: {
    label: "Species",
    lead: ({ name, formats, formatList, heightList, price }) =>
      `${name} available in ${formats} ${plural(formats, "format", "formats")}` +
      (formatList ? ` (${formatList})` : "") +
      (heightList ? `, in heights of ${heightList}` : "") +
      (price ? `. Wholesale price from ${price} per unit` : "") +
      `. We confirm availability and a firm price within 24-48 h.`,
    formatsHeading: "Available formats",
    siblingsHeading: (genus) => `Other ${genus} species`,
    seeGenus: (genus) => `See the whole ${genus} genus`,
  },
  table: {
    species: "Species",
    potSize: "Format",
    height: "Height",
    price: "Price",
    addLabel: "Add to quote",
    note: "Indicative price per unit. Availability and the final price are confirmed in the quote.",
  },
  cta: {
    title: "Need this plant for your project?",
    body: "Tell us the format, height and quantity and we'll send a firm quote within 24-48 h. If we don't grow it, we'll find it through our European grower network.",
    quote: "Request a quote",
    contact: "Talk to us",
  },
  directory: {
    label: "Index",
    title: "Every genus in the catalogue",
    lead: "Browse the catalogue by botanical genus: each one leads to its species, formats and prices.",
    all: "See all references",
  },
  meta: {
    genusTitle: (genus) => `${genus} · Wholesale supply`,
    genusDescription: ({ genus, species, references, formats }) =>
      `${references} ${genus} references across ${species} ${plural(species, "species", "species")}` +
      (formats ? `, ${formats} formats` : "") +
      `. Wholesale prices for landscapers and garden centres. Quote in 24-48 h.`,
    speciesTitle: (name) => `${name} · Wholesale price`,
    speciesDescription: ({ name, formats, formatList, price }) =>
      `${name} in ${formats} ${plural(formats, "format", "formats")}` +
      (formatList ? ` (${formatList})` : "") +
      (price ? `, from ${price} per unit` : "") +
      `. Nursery in Girona, Spain, shipping across Europe. Request a quote.`,
    genusKeywords: (genus) => [
      genus,
      `buy ${genus}`,
      `${genus} wholesale`,
      `${genus} nursery`,
      `${genus} price`,
    ],
    speciesKeywords: (name) => [
      name,
      `buy ${name}`,
      `${name} price`,
      `${name} wholesale`,
      `${name} nursery Spain`,
    ],
  },
};

const fr: CatalogueCopy = {
  breadcrumb: { home: "Accueil", products: "Catalogue" },
  genus: {
    label: "Genre",
    lead: ({ genus, species, references, formats }) =>
      `${references} ${plural(references, "référence disponible", "références disponibles")} de ${species} ${plural(species, "espèce", "espèces")} du genre ${genus}` +
      (formats ? `, en formats ${formats}` : "") +
      `. Production propre à Gérone et réseau de pépinières dans toute l'Europe pour ce que nous n'avons pas en stock.`,
    speciesHeading: "Espèces et variétés",
    speciesLead: "Chaque fiche réunit les formats, hauteurs et prix disponibles.",
    referencesHeading: "Toutes les références",
    neighboursHeading: "Autres genres du catalogue",
    neighboursLead: "Plus de 300 genres disponibles pour les professionnels.",
  },
  species: {
    label: "Espèce",
    lead: ({ name, formats, formatList, heightList, price }) =>
      `${name} disponible en ${formats} ${plural(formats, "format", "formats")}` +
      (formatList ? ` (${formatList})` : "") +
      (heightList ? `, avec des hauteurs de ${heightList}` : "") +
      (price ? `. Prix de gros à partir de ${price} l'unité` : "") +
      `. Nous confirmons la disponibilité et un prix ferme sous 24-48 h.`,
    formatsHeading: "Formats disponibles",
    siblingsHeading: (genus) => `Autres espèces de ${genus}`,
    seeGenus: (genus) => `Voir tout le genre ${genus}`,
  },
  table: {
    species: "Espèce",
    potSize: "Format",
    height: "Hauteur",
    price: "Prix",
    addLabel: "Ajouter au devis",
    note: "Prix unitaire indicatif. La disponibilité et le prix final sont confirmés dans le devis.",
  },
  cta: {
    title: "Besoin de cette plante pour votre projet ?",
    body: "Indiquez-nous le format, la hauteur et la quantité et nous vous envoyons un devis ferme sous 24-48 h. Ce que nous ne cultivons pas, nous le trouvons via notre réseau européen.",
    quote: "Demander un devis",
    contact: "Nous contacter",
  },
  directory: {
    label: "Index",
    title: "Tous les genres du catalogue",
    lead: "Parcourez le catalogue par genre botanique : chacun mène à ses espèces, formats et prix.",
    all: "Voir toutes les références",
  },
  meta: {
    genusTitle: (genus) => `${genus} · Vente en gros`,
    genusDescription: ({ genus, species, references, formats }) =>
      `${references} références de ${genus} en ${species} ${plural(species, "espèce", "espèces")}` +
      (formats ? `, formats ${formats}` : "") +
      `. Prix de gros pour paysagistes et jardineries. Devis sous 24-48 h.`,
    speciesTitle: (name) => `${name} · Prix de gros`,
    speciesDescription: ({ name, formats, formatList, price }) =>
      `${name} en ${formats} ${plural(formats, "format", "formats")}` +
      (formatList ? ` (${formatList})` : "") +
      (price ? `, à partir de ${price} l'unité` : "") +
      `. Pépinière à Gérone, livraison dans toute l'Europe. Demandez un devis.`,
    genusKeywords: (genus) => [
      genus,
      `acheter ${genus}`,
      `${genus} en gros`,
      `${genus} pépinière`,
      `prix ${genus}`,
    ],
    speciesKeywords: (name) => [
      name,
      `acheter ${name}`,
      `${name} prix`,
      `${name} en gros`,
      `${name} pépinière Espagne`,
    ],
  },
};

const COPY: Record<string, CatalogueCopy> = { es, ca, en, fr };

export function getCatalogueCopy(lng: string): CatalogueCopy {
  return COPY[lng] ?? COPY.es;
}
