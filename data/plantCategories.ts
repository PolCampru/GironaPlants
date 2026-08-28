/**
 * Home page category cards.
 *
 * These are real genera from the catalogue, not invented marketing buckets:
 * the card title IS the search term, so clicking one always lands on a
 * filtered result that matches its label, and the count next to it comes from
 * Strapi at render time. The previous nine categories ("Jardinería
 * sostenible", "Otras", …) mapped to no field in the data, so every card led
 * to the same unfiltered 1,530-row table.
 *
 * Photos are illustrative; `alt` is empty because the visible title already
 * names the plant.
 */
export type PlantCategory = {
  /** Genus, used verbatim as the products search term and the card title. */
  genus: string;
  img: string;
};

export const PLANT_CATEGORIES: PlantCategory[] = [
  { genus: "Quercus", img: "/images/aboutUs/ilex.jpg" },
  { genus: "Juniperus", img: "/images/redCedar.jpg" },
  { genus: "Prunus", img: "/images/hazelnut.jpg" },
  { genus: "Cistus", img: "/images/plants/groundcovers.jpg" },
  { genus: "Lavandula", img: "/images/lavenders.jpg" },
  { genus: "Carex", img: "/images/plants/grasses.jpg" },
  { genus: "Acer", img: "/images/plants/nursery.jpg" },
  { genus: "Nymphaea", img: "/images/plants/aquatic.jpg" },
];

/** Plain-language gloss per genus, per locale. */
export const GENUS_GLOSS: Record<string, Record<string, string>> = {
  es: {
    Quercus: "Encinas, robles y alcornoques",
    Juniperus: "Enebros y sabinas",
    Prunus: "Frutales y cerezos ornamentales",
    Cistus: "Jaras y matorral mediterráneo",
    Lavandula: "Lavandas y lavandines",
    Carex: "Cárices y gramíneas de sombra",
    Acer: "Arces para sombra y alineación",
    Nymphaea: "Nenúfares y planta de ribera",
  },
  ca: {
    Quercus: "Alzines, roures i suros",
    Juniperus: "Ginebres i savines",
    Prunus: "Fruiters i cirerers ornamentals",
    Cistus: "Estepes i matollar mediterrani",
    Lavandula: "Lavandes i lavandins",
    Carex: "Càrexs i gramínies d'ombra",
    Acer: "Aurons per a ombra i alineació",
    Nymphaea: "Nenúfars i planta de ribera",
  },
  en: {
    Quercus: "Holm oaks, oaks and cork oaks",
    Juniperus: "Junipers and savins",
    Prunus: "Fruit trees and ornamental cherries",
    Cistus: "Rockroses and Mediterranean scrub",
    Lavandula: "Lavenders and lavandins",
    Carex: "Sedges and shade grasses",
    Acer: "Maples for shade and street planting",
    Nymphaea: "Water lilies and marginal plants",
  },
  fr: {
    Quercus: "Chênes verts, chênes et chênes-lièges",
    Juniperus: "Genévriers et sabines",
    Prunus: "Arbres fruitiers et cerisiers d'ornement",
    Cistus: "Cistes et maquis méditerranéen",
    Lavandula: "Lavandes et lavandins",
    Carex: "Laîches et graminées d'ombre",
    Acer: "Érables d'ombrage et d'alignement",
    Nymphaea: "Nénuphars et plantes de berge",
  },
};

export function getGenusGloss(locale: string, genus: string): string {
  return (GENUS_GLOSS[locale] ?? GENUS_GLOSS.es)[genus] ?? "";
}
