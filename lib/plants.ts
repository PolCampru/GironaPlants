import { fetchStrapiDirect } from "./strapi";

/**
 * Reference counts from the plant catalogue, for the home page.
 *
 * These go straight to Strapi with the server token rather than through the
 * app's own /api/strapi proxy: on the VPS `NEXT_PUBLIC_BASE_URL` is the public
 * origin, so a proxied call would leave the container, cross Caddy and come
 * back in — nine times per uncached home render, just to read nine numbers.
 *
 * Never throws: a failed lookup is `null` and the card simply shows no count.
 */

/**
 * The genus filter must be the SAME predicate the card links to, which is
 * `/products?search=<genus>` — and useProducts turns that into
 * "genus contains X OR description contains X". Counting with an exact `$eqi`
 * on genus instead advertised a number the products table then contradicted.
 */
export function genusSearchFilter(term: string) {
  const encoded = encodeURIComponent(term);
  return (
    `filters[$and][0][$or][0][genus][$containsi]=${encoded}` +
    `&filters[$and][0][$or][1][description][$containsi]=${encoded}`
  );
}

async function countPlants(filter = ""): Promise<number | null> {
  try {
    const json = await fetchStrapiDirect(
      `plants?pagination[pageSize]=1&fields[0]=genus${filter ? `&${filter}` : ""}`,
      { retries: 1, revalidate: 3600 }
    );
    const total = json?.meta?.pagination?.total;
    return typeof total === "number" ? total : null;
  } catch {
    return null;
  }
}

/** Total published references, for the hero stat card. */
export function getTotalReferences() {
  return countPlants();
}

export async function getGenusCounts(
  genera: string[]
): Promise<Record<string, number | null>> {
  const entries = await Promise.all(
    genera.map(
      async (genus) =>
        [genus, await countPlants(genusSearchFilter(genus))] as const
    )
  );

  return Object.fromEntries(entries);
}
