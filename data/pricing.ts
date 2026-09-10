/**
 * Who the published prices are for.
 *
 * Every price on the site comes from the supplier catalogue (see
 * tools/catalogues), which is a trade catalogue: the figures are the ones
 * quoted to companies and professionals buying by the batch. A particular
 * ordering a handful of plants is not buying against that catalogue, so the
 * price they end up paying can differ — the site has to say so rather than
 * let a trade figure read as a retail one.
 *
 * Two shapes for two moments:
 *  - `audienceNote` sits with the prices themselves, for anyone browsing,
 *    because a visitor reading a table has not told us who they are yet.
 *  - `particularNotice` is the direct version, shown in the quote form once
 *    someone picks "Particular" and we do know.
 *
 * It lives here, as plain per-locale copy, rather than in public/locales: the
 * catalogue pages are landed on from search, so the words have to be in the
 * server-rendered HTML (see the note at the top of data/pageHeadings.ts).
 */

type PricingCopy = {
  /** One clause, appended to the price note under a table. */
  audienceNote: string;
  /** Shown in the quote form when the visitor says they are a particular. */
  particularNotice: string;
};

const COPY: Record<string, PricingCopy> = {
  es: {
    audienceNote:
      "Los precios del catálogo son para empresas y profesionales; para particulares pueden variar.",
    particularNotice:
      "El catálogo está pensado para empresas y profesionales, así que el precio que ves puede variar en un pedido de particular. Te confirmamos el precio final en el presupuesto, sin compromiso.",
  },
  ca: {
    audienceNote:
      "Els preus del catàleg són per a empreses i professionals; per a particulars poden variar.",
    particularNotice:
      "El catàleg està pensat per a empreses i professionals, així que el preu que veus pot variar en una comanda de particular. Et confirmem el preu final al pressupost, sense compromís.",
  },
  en: {
    audienceNote:
      "Catalogue prices are for companies and professionals; for individuals they may vary.",
    particularNotice:
      "The catalogue is meant for companies and professionals, so the price you see may vary on an individual order. We confirm the final price in your quote, with no obligation.",
  },
  fr: {
    audienceNote:
      "Les prix du catalogue s'adressent aux entreprises et aux professionnels ; pour les particuliers, ils peuvent varier.",
    particularNotice:
      "Le catalogue s'adresse aux entreprises et aux professionnels : le prix affiché peut donc varier pour une commande de particulier. Nous confirmons le prix final dans le devis, sans engagement.",
  },
};

const get = (locale: string): PricingCopy => COPY[locale] ?? COPY.es;

/** Clause for the price notes under the catalogue and product tables. */
export const getPriceAudienceNote = (locale: string): string =>
  get(locale).audienceNote;

/** The notice the quote form shows once "Particular" is selected. */
export const getParticularPriceNotice = (locale: string): string =>
  get(locale).particularNotice;
