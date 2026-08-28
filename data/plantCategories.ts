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
 *    Prunus (34) and Acer (28) are not cards; Vinca and Corylus are.
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
  { genus: "Quercus", img: "/images/aboutUs/ilex.jpg", photo: "Quercus ilex in leaf and fruit" },
  { genus: "Juniperus", img: "/images/redCedar.jpg", photo: "juniper foliage and berries" },
  { genus: "Lavandula", img: "/images/lavenders.jpg", photo: "lavender field in flower" },
  { genus: "Carex", img: "/images/plants/grasses.jpg", photo: "sedge and grass clumps" },
  { genus: "Nymphaea", img: "/images/plants/aquatic.jpg", photo: "water lilies in flower" },
  { genus: "Vinca", img: "/images/plants/groundcovers.jpg", photo: "periwinkle in flower" },
  { genus: "Corylus", img: "/images/hazelnut.jpg", photo: "hazel leaf and nuts" },
];

/** Plain-language gloss per genus, per locale. */
export const GENUS_GLOSS: Record<string, Record<string, string>> = {
  es: {
    Quercus: "Encinas, robles y alcornoques",
    Juniperus: "Enebros y sabinas",
    Lavandula: "Lavandas y lavandines",
    Carex: "Cárices y gramíneas de sombra",
    Nymphaea: "Nenúfares y planta de ribera",
    Vinca: "Vincapervincas, cubresuelos de sombra",
    Corylus: "Avellanos para seto y fruto",
  },
  ca: {
    Quercus: "Alzines, roures i suros",
    Juniperus: "Ginebres i savines",
    Lavandula: "Lavandes i lavandins",
    Carex: "Càrexs i gramínies d'ombra",
    Nymphaea: "Nenúfars i planta de ribera",
    Vinca: "Vincapervinques, cobertores d'ombra",
    Corylus: "Avellaners per a tanca i fruit",
  },
  en: {
    Quercus: "Holm oaks, oaks and cork oaks",
    Juniperus: "Junipers and savins",
    Lavandula: "Lavenders and lavandins",
    Carex: "Sedges and shade grasses",
    Nymphaea: "Water lilies and marginal plants",
    Vinca: "Periwinkles, groundcover for shade",
    Corylus: "Hazels for hedging and nuts",
  },
  fr: {
    Quercus: "Chênes verts, chênes et chênes-lièges",
    Juniperus: "Genévriers et sabines",
    Lavandula: "Lavandes et lavandins",
    Carex: "Laîches et graminées d'ombre",
    Nymphaea: "Nénuphars et plantes de berge",
    Vinca: "Pervenches, couvre-sol d'ombre",
    Corylus: "Noisetiers pour haie et fruit",
  },
};

export function getGenusGloss(locale: string, genus: string): string {
  return (GENUS_GLOSS[locale] ?? GENUS_GLOSS.es)[genus] ?? "";
}
