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
      "¡Gracias por tu interés! Trabajamos con profesionales y solo enviamos en palé, así que no podemos atender pedidos pequeños. Si tu pedido es de volumen, envíanos la solicitud y te confirmamos precio y transporte; para unas pocas plantas, tu garden center de confianza te atenderá mejor.",
  },
  ca: {
    audienceNote:
      "Els preus del catàleg són per a empreses i professionals; per a particulars poden variar.",
    particularNotice:
      "Gràcies per l'interès! Treballem amb professionals i només enviem en palet, així que no podem atendre comandes petites. Si la teva comanda és de volum, envia'ns la sol·licitud i et confirmem preu i transport; per a unes quantes plantes, el teu garden center de confiança t'atendrà millor.",
  },
  en: {
    audienceNote:
      "Catalogue prices are for companies and professionals; for individuals they may vary.",
    particularNotice:
      "Thanks for your interest! We work with the trade and only ship on pallets, so we can't take on small orders. If yours is a volume order, send the request and we'll confirm price and transport; for a few plants, your local garden centre will look after you better.",
  },
  fr: {
    audienceNote:
      "Les prix du catalogue s'adressent aux entreprises et aux professionnels ; pour les particuliers, ils peuvent varier.",
    particularNotice:
      "Merci de votre intérêt ! Nous travaillons avec les professionnels et livrons uniquement sur palette : nous ne pouvons donc pas honorer les petites commandes. Pour une commande en volume, envoyez-nous la demande et nous confirmons prix et transport ; pour quelques plantes, votre jardinerie de proximité vous servira mieux.",
  },
  it: {
    audienceNote:
      "I prezzi del catalogo sono riservati ad aziende e professionisti; per i privati possono variare.",
    particularNotice:
      "Grazie per l'interesse! Lavoriamo con i professionisti e spediamo solo su pallet, quindi non possiamo evadere ordini piccoli. Se il tuo ordine è di volume, inviaci la richiesta e ti confermiamo prezzo e trasporto; per poche piante, il tuo garden center di fiducia ti servirà meglio.",
  },
};

const get = (locale: string): PricingCopy => COPY[locale] ?? COPY.es;

/** Clause for the price notes under the catalogue and product tables. */
export const getPriceAudienceNote = (locale: string): string =>
  get(locale).audienceNote;

/** The notice the quote form shows once "Particular" is selected. */
export const getParticularPriceNotice = (locale: string): string =>
  get(locale).particularNotice;
