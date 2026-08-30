import { cache } from "react";
import { fetchStrapiDirect } from "./strapi";
import { slugify } from "./slug";

export { slugify };

/**
 * The plant catalogue, grouped into the shape the indexable pages need.
 *
 * The catalogue table at /products is a client-rendered, paginated view over
 * Strapi: 1,530 rows behind one URL, so nothing in it can ever rank. These
 * helpers group the same rows by genus and by botanical name so each one gets
 * a server-rendered page a buyer can actually land on from a search.
 *
 * Everything goes straight to Strapi with the server token rather than through
 * the app's /api/strapi proxy, for the reason spelled out in lib/plants.ts: on
 * the VPS the proxy route would leave the container, cross Caddy and come back
 * in. One `revalidate` window covers the whole site because the catalogue is
 * re-imported in bulk, not edited row by row.
 */

export type CatalogueRow = {
  id: number;
  /** Uppercase in Strapi ("ABELIA") — use `genusName` for anything on screen. */
  genus: string;
  /** Full botanical name, cultivar included: "Abelia grandiflora 'Prostrata'". */
  description: string;
  pot_size: string | null;
  height: string | null;
  price: number | null;
};

export type SpeciesEntry = {
  slug: string;
  /** "Abelia grandiflora 'Prostrata'" */
  name: string;
  genusSlug: string;
  /** "Abelia" */
  genusName: string;
  rows: CatalogueRow[];
  /** Distinct pot sizes, in catalogue order. */
  potSizes: string[];
  /** Distinct heights, in catalogue order. */
  heights: string[];
  minPrice: number | null;
  maxPrice: number | null;
  /** Rows carrying a price. Only these are offers in the JSON-LD. */
  pricedCount: number;
};

export type GenusEntry = {
  slug: string;
  /** "Abelia" — title case, because Strapi stores it shouting. */
  name: string;
  rowCount: number;
  species: SpeciesEntry[];
  minPrice: number | null;
  maxPrice: number | null;
};

/**
 * What a client component is given about a genus or species it only links to.
 *
 * The entries themselves carry every catalogue row, and a React server
 * component serialises whatever it hands across the boundary: passing whole
 * entries for eight neighbouring genera would put a few hundred rows of pot
 * sizes and prices into the payload of a page that renders their names.
 */
export type GenusSummary = { slug: string; name: string; rowCount: number };
export type SpeciesSummary = { slug: string; name: string; rowCount: number };

export const toGenusSummary = ({
  slug,
  name,
  rowCount,
}: GenusEntry): GenusSummary => ({ slug, name, rowCount });

export const toSpeciesSummary = ({
  slug,
  name,
  rows,
}: SpeciesEntry): SpeciesSummary => ({ slug, name, rowCount: rows.length });

const PAGE_SIZE = 100;
/**
 * A stop on runaway pagination, not a size limit — 200 pages is 20,000 rows
 * against a catalogue of ~1,500. Truncating instead of stopping would be the
 * worst of both worlds: `genus:asc` means the rows lost are always the tail of
 * the alphabet, so every genus from S on would still resolve, still be in the
 * sitemap, and start returning 404.
 */
const MAX_PAGES = 200;

/** "ABELIA" -> "Abelia". Latin genus names are always capitalised this way. */
function titleCaseGenus(genus: string): string {
  const trimmed = genus.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

function distinct(values: (string | null | undefined)[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const v = value?.trim();
    if (!v || seen.has(v)) continue;
    seen.add(v);
    out.push(v);
  }
  return out;
}

function prices(rows: CatalogueRow[]): number[] {
  return rows
    .map((r) => (typeof r.price === "string" ? Number(r.price) : r.price))
    .filter((p): p is number => typeof p === "number" && !Number.isNaN(p));
}

function priceRange(rows: CatalogueRow[]): [number | null, number | null] {
  const found = prices(rows);
  if (found.length === 0) return [null, null];
  return [Math.min(...found), Math.max(...found)];
}

const FIELDS = [
  "fields[0]=genus",
  "fields[1]=description",
  "fields[2]=pot_size",
  "fields[3]=height",
  "fields[4]=price",
].join("&");

async function fetchPage(page: number) {
  // The id tiebreaker is not cosmetic. `genus:asc` alone is not a unique
  // ordering — 31 rows share the genus CISTUS — and each page is its own
  // LIMIT/OFFSET query, so the database may order the ties differently from
  // one request to the next and hand the same row to two pages, or to none.
  // A duplicated row breaks React keys and inflates offerCount; a dropped one
  // deletes a species that the sitemap still advertises.
  return fetchStrapiDirect(
    `plants?pagination[pageSize]=${PAGE_SIZE}&pagination[page]=${page}` +
      `&sort[0]=genus:asc&sort[1]=id:asc&${FIELDS}`,
    { revalidate: 3600, retries: 2 }
  );
}

/**
 * Every published row, paged out of Strapi. Empty array on any failure.
 *
 * All of it or none of it, deliberately. A partial catalogue is the one
 * outcome worth avoiding: the pages it is missing do not degrade, they 404,
 * and they 404 at URLs this app's own sitemap is still advertising. An empty
 * result costs a 500 on the deep pages and hides the A-Z for one revalidate
 * window, which is recoverable; a silent gap teaches Google those pages are
 * gone. fetchStrapiDirect already retries each page twice with backoff, so
 * reaching the failure branch means Strapi is genuinely unavailable.
 */
async function fetchAllRows(): Promise<CatalogueRow[]> {
  try {
    const first = await fetchPage(1);
    const rows: CatalogueRow[] = [...(first?.data ?? [])];

    const pageCount = first?.meta?.pagination?.pageCount ?? 1;

    if (pageCount > MAX_PAGES) {
      throw new Error(
        `Plant catalogue is ${pageCount} pages, over the ${MAX_PAGES}-page cap`
      );
    }

    if (pageCount > 1) {
      const rest = await Promise.all(
        Array.from({ length: pageCount - 1 }, (_, i) => fetchPage(i + 2))
      );
      for (const page of rest) rows.push(...(page?.data ?? []));
    }

    return rows;
  } catch (error) {
    console.error("Error loading the plant catalogue:", error);
    return [];
  }
}

/**
 * The whole catalogue, grouped by genus and then by botanical name.
 *
 * `cache()` collapses the repeated calls a single render makes — a species
 * page asks for its genus, its siblings and its breadcrumb — into one fetch.
 */
export const getCatalogue = cache(async (): Promise<GenusEntry[]> => {
  const rows = await fetchAllRows();

  // Two levels of grouping keyed by slug, not by the raw string: casing and
  // trailing spaces vary row to row ("Magnolia grandiflora 'Gallisonensis' ")
  // and would otherwise split one species across two pages.
  const genera = new Map<
    string,
    { name: string; species: Map<string, { name: string; rows: CatalogueRow[] }> }
  >();

  for (const row of rows) {
    const genusRaw = row.genus?.trim();
    const speciesRaw = row.description?.trim();
    if (!genusRaw || !speciesRaw) continue;

    const genusSlug = slugify(genusRaw);
    const speciesSlug = slugify(speciesRaw);
    if (!genusSlug || !speciesSlug) continue;

    let genus = genera.get(genusSlug);
    if (!genus) {
      genus = { name: titleCaseGenus(genusRaw), species: new Map() };
      genera.set(genusSlug, genus);
    }

    let species = genus.species.get(speciesSlug);
    if (!species) {
      species = { name: speciesRaw, rows: [] };
      genus.species.set(speciesSlug, species);
    }

    species.rows.push({ ...row, genus: genusRaw, description: speciesRaw });
  }

  const entries: GenusEntry[] = [];

  for (const [genusSlug, genus] of genera) {
    const species: SpeciesEntry[] = [];

    for (const [speciesSlug, sp] of genus.species) {
      const [minPrice, maxPrice] = priceRange(sp.rows);
      species.push({
        slug: speciesSlug,
        name: sp.name,
        genusSlug,
        genusName: genus.name,
        rows: sp.rows,
        potSizes: distinct(sp.rows.map((r) => r.pot_size)),
        heights: distinct(sp.rows.map((r) => r.height)),
        minPrice,
        maxPrice,
        pricedCount: prices(sp.rows).length,
      });
    }

    species.sort((a, b) => a.name.localeCompare(b.name, "es"));

    const allRows = species.flatMap((s) => s.rows);
    const [minPrice, maxPrice] = priceRange(allRows);

    entries.push({
      slug: genusSlug,
      name: genus.name,
      rowCount: allRows.length,
      species,
      minPrice,
      maxPrice,
    });
  }

  entries.sort((a, b) => a.name.localeCompare(b.name, "es"));
  return entries;
});

/**
 * The catalogue, or an error.
 *
 * getCatalogue() swallows a Strapi outage and returns an empty list, which is
 * right for the sitemap and for a page that can degrade. It is wrong for the
 * genus and species pages: an empty catalogue there would 404 every one of the
 * ~1,100 live URLs and tell Google they are gone. A 500 is recoverable, a
 * mass 404 is not.
 */
export async function requireCatalogue(): Promise<GenusEntry[]> {
  const catalogue = await getCatalogue();
  if (catalogue.length === 0) throw new Error("Plant catalogue unavailable");
  return catalogue;
}

/** The pot sizes a set of rows is most often held in, commonest first. */
export function topFormats(rows: CatalogueRow[], limit = 4): string[] {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const size = row.pot_size?.trim();
    if (!size) continue;
    counts.set(size, (counts.get(size) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([size]) => size);
}

export async function getGenus(slug: string): Promise<GenusEntry | null> {
  const catalogue = await requireCatalogue();
  return catalogue.find((g) => g.slug === slug) ?? null;
}

export async function getSpecies(
  genusSlug: string,
  speciesSlug: string
): Promise<{ genus: GenusEntry; species: SpeciesEntry } | null> {
  const genus = await getGenus(genusSlug);
  if (!genus) return null;
  const species = genus.species.find((s) => s.slug === speciesSlug);
  return species ? { genus, species } : null;
}

/**
 * The genera either side of this one alphabetically, plus enough of the rest
 * to give every genus page outbound links to its neighbours. Without these
 * the deep pages are only reachable from the A-Z index.
 */
export async function getNeighbourGenera(
  slug: string,
  count = 8
): Promise<GenusEntry[]> {
  const catalogue = await requireCatalogue();
  const index = catalogue.findIndex((g) => g.slug === slug);
  if (index === -1) return [];

  const before = catalogue.slice(Math.max(0, index - count / 2), index);
  const after = catalogue.slice(index + 1, index + 1 + count - before.length);
  return [...before, ...after];
}
