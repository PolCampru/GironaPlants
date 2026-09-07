/**
 * The season the published catalogue belongs to.
 *
 * Every price on a product page comes from one supplier PDF per campaign (see
 * tools/catalogues), so a price is only true for that campaign — the last
 * import repriced 693 rows. Saying which campaign it is on the page itself is
 * what stops a stale figure from reading as a current one.
 *
 * It lives here, as plain per-locale copy, rather than in public/locales: the
 * catalogue pages are landed on from search, so the words have to be in the
 * server-rendered HTML (see the note at the top of data/pageHeadings.ts).
 */

/** Bump this — and only this — when the next supplier catalogue is loaded. */
export const CATALOGUE_CAMPAIGN = "2025/26";

const LABEL: Record<string, string> = {
  es: `Campaña ${CATALOGUE_CAMPAIGN}`,
  ca: `Campanya ${CATALOGUE_CAMPAIGN}`,
  en: `${CATALOGUE_CAMPAIGN} campaign`,
  fr: `Campagne ${CATALOGUE_CAMPAIGN}`,
};

/** Short badge, e.g. "Campaña 2025/26". */
export const getCampaignLabel = (locale: string): string =>
  LABEL[locale] ?? LABEL.es;
