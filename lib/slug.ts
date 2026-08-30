/**
 * URL segments for genus and species pages.
 *
 * Its own module because both the server (lib/catalogue.ts, which builds the
 * pages) and the browser (the catalogue table, which links to them) need it,
 * and importing it from lib/catalogue would drag the Strapi fetch — and the
 * server-only env it reads — into the client bundle.
 */

/**
 * Cultivar quotes disappear rather than becoming separators, so
 * "Abelia grandiflora 'Prostrata'" is abelia-grandiflora-prostrata and not
 * abelia-grandiflora--prostrata-. The multiplication sign in hybrid names
 * ("Cistus × florentinus") becomes a plain x, which is also how the catalogue
 * spells half of them anyway.
 */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/×/g, "x")
    .replace(/['’`"]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
