/**
 * Home page category cards.
 *
 * Two rules, both learned the hard way:
 *
 * 1. The card title IS the search term, so clicking one always lands on a
 *    filtered result that matches its label. The nine categories this
 *    replaced ("Jardinería sostenible", "Otras", …) mapped to no field in the
 *    data, so every card led to the same unfiltered 1,530-row table.
 * 2. Every photograph actually depicts its genus. The first pass filled the
 *    slots by size — Cistus got a picture of periwinkle, Acer a picture of a
 *    nursery yard — which is worse than no picture. Genera are chosen to fit
 *    the photographs available, not the other way round, so Cistus (31),
 *    Prunus (34) and Acer (28) are not cards; Vinca is.
 *
 * Counts are read from Strapi at render time (lib/plants.ts), never hardcoded.
 */
export type PlantCategory = {
  /** Genus, used verbatim as the products search term and the card title. */
  genus: string;
  img: string;
  /** What the photograph shows, so the pairing can be checked at a glance. */
  photo: string;
};

export const PLANT_CATEGORIES: PlantCategory[] = [
  { genus: "Quercus", img: "/images/plants/quercusIlexAcorns.jpg", photo: "Quercus ilex leaves and acorns" },
  { genus: "Juniperus", img: "/images/redCedar.jpg", photo: "juniper foliage and berries" },
  { genus: "Lavandula", img: "/images/lavenders.jpg", photo: "lavender field in flower" },
  { genus: "Carex", img: "/images/plants/grasses.jpg", photo: "sedge and grass clumps" },
  { genus: "Iris", img: "/images/plants/irisSibirica.jpg", photo: "Iris sibirica in flower" },
  { genus: "Vinca", img: "/images/plants/groundcovers.jpg", photo: "periwinkle in flower" },
  // Not a genus: "Leylandii" matches every Cupressocyparis leylandii row, and
  // it is the name the trade asks for.
  { genus: "Leylandii", img: "/images/plants/leylandiiColumns.jpg", photo: "clipped Leyland cypress columns along a walkway" },
];

/** Plain-language gloss per genus, per locale. */
export const GENUS_GLOSS: Record<string, Record<string, string>> = {
  es: {
    Quercus: "Encinas, robles y alcornoques",
    Juniperus: "Enebros y sabinas",
    Lavandula: "Lavandas, lavandines y aromáticas",
    Carex: "Cárices y gramíneas de sombra",
    Iris: "Lirios de jardín y de ribera",
    Vinca: "Vincapervincas, cubresuelos de sombra",
    Leylandii: "Plantas para seto: ciprés de Leyland",
  },
  ca: {
    Quercus: "Alzines, roures i suros",
    Juniperus: "Ginebres i savines",
    Lavandula: "Lavandes, lavandins i aromàtiques",
    Carex: "Càrexs i gramínies d'ombra",
    Iris: "Lliris de jardí i de ribera",
    Vinca: "Vincapervinques, entapissants d'ombra",
    Leylandii: "Plantes per a tanca: xiprer de Leyland",
  },
  en: {
    Quercus: "Holm oaks, oaks and cork oaks",
    Juniperus: "Junipers and savins",
    Lavandula: "Lavenders, lavandins and aromatics",
    Carex: "Sedges and shade grasses",
    Iris: "Garden and waterside irises",
    Vinca: "Periwinkles, groundcover for shade",
    Leylandii: "Hedging plants: Leyland cypress",
  },
  fr: {
    Quercus: "Chênes verts, chênes et chênes-lièges",
    Juniperus: "Genévriers et sabines",
    Lavandula: "Lavandes, lavandins et aromatiques",
    Carex: "Laîches et graminées d'ombre",
    Iris: "Iris de jardin et de berge",
    Vinca: "Pervenches, couvre-sol d'ombre",
    Leylandii: "Plantes de haie : cyprès de Leyland",
  },
  it: {
    Quercus: "Lecci, querce e sughere",
    Juniperus: "Ginepri e sabine",
    Lavandula: "Lavande, lavande ibride e aromatiche",
    Carex: "Carici e graminacee da ombra",
    Iris: "Iris da giardino e di riva",
    Vinca: "Pervinche, tappezzanti da ombra",
    Leylandii: "Piante da siepe: cipresso di Leyland",
  },
};

export function getGenusGloss(locale: string, genus: string): string {
  return (GENUS_GLOSS[locale] ?? GENUS_GLOSS.es)[genus] ?? "";
}
