// Per-locale, per-page SEO copy plus a Metadata builder used by every
// page's generateMetadata. Keeps titles/descriptions/keywords, canonical
// URLs and hreflang alternates consistent across the whole site.

import type { Metadata } from "next";

export const SITE_URL = "https://gironaplants.com";
export const SITE_NAME = "GironaPlants";
export const OG_IMAGE = "/images/lavenders.jpg";

export const SEO_LOCALES = ["es", "ca", "en", "fr"] as const;
export type SeoLocale = (typeof SEO_LOCALES)[number];

const OG_LOCALE: Record<SeoLocale, string> = {
  es: "es_ES",
  ca: "ca_ES",
  en: "en_GB",
  fr: "fr_FR",
};

export type SeoPageKey =
  | "home"
  | "products"
  | "offers"
  | "aboutUs"
  | "catalogues"
  | "budget"
  | "contact";

const PAGE_PATH: Record<SeoPageKey, string> = {
  home: "",
  products: "/products",
  offers: "/offers",
  aboutUs: "/about-us",
  catalogues: "/catalogues",
  budget: "/budget",
  contact: "/contact",
};

type PageSeo = {
  title: string;
  description: string;
  keywords: string[];
};

const SEO: Record<SeoLocale, Record<SeoPageKey, PageSeo>> = {
  es: {
    home: {
      title: "GironaPlants · Plantas al por mayor en toda Europa",
      description:
        "Más de 30 años comercializando planta para profesionales. No la cultivamos: la seleccionamos en viveros de toda Europa y te servimos la lista completa. Presupuesto en 24-48 h.",
      keywords: [
        "distribuidor de plantas al por mayor",
        "proveedor de plantas Europa",
        "comercializadora de planta",
        "plantas al por mayor para paisajistas",
        "suministro de planta ornamental",
        "comprar plantas al por mayor Girona",
      ],
    },
    products: {
      title: "Catálogo de plantas al por mayor",
      description:
        "Árboles, arbustos, coníferas, gramíneas, cubresuelos y planta forestal de viveros seleccionados de España y del resto de Europa. Pide tu oferta al por mayor sin compromiso.",
      keywords: [
        "comprar plantas al por mayor",
        "plantas mediterráneas al por mayor",
        "árboles y arbustos al por mayor",
        "planta forestal autóctona",
        "proveedor de plantas Girona",
      ],
    },
    offers: {
      title: "Ofertas de planta para profesionales",
      description:
        "Ofertas de temporada y disponibilidad especial para profesionales de la jardinería y el paisajismo, con precio cerrado mientras dure el stock.",
      keywords: [
        "ofertas plantas al por mayor",
        "planta de temporada precio especial",
        "ofertas jardinería profesional",
      ],
    },
    aboutUs: {
      title: "Nosotros · 30 años comercializando planta",
      description:
        "Más de 30 años y dos generaciones dedicadas al comercio de planta. Sin producción propia: elegimos para cada especie el vivero de Europa que mejor la cultiva.",
      keywords: [
        "comercializadora de planta",
        "proveedor de plantas Europa",
        "empresa familiar de planta Girona",
      ],
    },
    catalogues: {
      title: "Catálogos de disponibilidad y temporada",
      description:
        "Descarga en PDF los catálogos actualizados de GironaPlants: género, formato, altura y precio de referencia de toda la planta que servimos.",
      keywords: [
        "catálogo de plantas PDF",
        "lista de disponibilidad de planta",
        "catálogo plantas al por mayor",
      ],
    },
    budget: {
      title: "Solicitar presupuesto de plantas",
      description:
        "Dinos qué especies, medidas y cantidades necesita tu proyecto y te enviamos un presupuesto a medida en 24-48 h, sin compromiso.",
      keywords: [
        "presupuesto plantas",
        "presupuesto jardinería Girona",
        "precio plantas al por mayor",
      ],
    },
    contact: {
      title: "Contacto",
      description:
        "Habla con GironaPlants: +34 639 811 560 · gironaplants@gironaplants.com. Empresa familiar en Breda (Girona), con envíos a toda España y Europa.",
      keywords: [
        "contacto GironaPlants",
        "proveedor de plantas Breda Girona",
        "teléfono GironaPlants",
      ],
    },
  },
  ca: {
    home: {
      title: "GironaPlants · Plantes a l'engròs a tot Europa",
      description:
        "Més de 30 anys comercialitzant planta per a professionals. No la cultivem: la seleccionem en vivers de tot Europa i et servim la llista completa. Pressupost en 24-48 h.",
      keywords: [
        "distribuïdor de plantes a l'engròs",
        "proveïdor de plantes Europa",
        "comercialitzadora de planta",
        "plantes a l'engròs per a paisatgistes",
        "subministrament de planta ornamental",
        "comprar plantes a l'engròs Girona",
      ],
    },
    products: {
      title: "Catàleg de plantes a l'engròs",
      description:
        "Arbres, arbustos, coníferes, gramínies, entapissants i planta forestal de vivers seleccionats d'Espanya i de la resta d'Europa. Demana la teva oferta a l'engròs sense compromís.",
      keywords: [
        "comprar plantes a l'engròs",
        "plantes mediterrànies a l'engròs",
        "arbres i arbustos a l'engròs",
        "planta forestal autòctona",
        "proveïdor de plantes Girona",
      ],
    },
    offers: {
      title: "Ofertes de planta per a professionals",
      description:
        "Ofertes de temporada i disponibilitat especial per a professionals de la jardineria i el paisatgisme, amb preu tancat mentre duri l'estoc.",
      keywords: [
        "ofertes plantes a l'engròs",
        "planta de temporada preu especial",
        "ofertes jardineria professional",
      ],
    },
    aboutUs: {
      title: "Nosaltres · 30 anys comercialitzant planta",
      description:
        "Més de 30 anys i dues generacions dedicades al comerç de planta. Sense producció pròpia: triem per a cada espècie el viver d'Europa que millor la cultiva.",
      keywords: [
        "comercialitzadora de planta",
        "proveïdor de plantes Europa",
        "empresa familiar de planta Girona",
      ],
    },
    catalogues: {
      title: "Catàlegs de disponibilitat i temporada",
      description:
        "Descarrega en PDF els catàlegs actualitzats de GironaPlants: gènere, format, alçada i preu de referència de tota la planta que servim.",
      keywords: [
        "catàleg de plantes PDF",
        "llista de disponibilitat de planta",
        "catàleg plantes a l'engròs",
      ],
    },
    budget: {
      title: "Demanar pressupost de plantes",
      description:
        "Digue'ns quines espècies, mides i quantitats necessita el teu projecte i t'enviem un pressupost a mida en 24-48 h, sense compromís.",
      keywords: [
        "pressupost plantes",
        "pressupost jardineria Girona",
        "preu plantes a l'engròs",
      ],
    },
    contact: {
      title: "Contacte",
      description:
        "Parla amb GironaPlants: +34 639 811 560 · gironaplants@gironaplants.com. Empresa familiar a Breda (Girona), amb enviaments a tot Espanya i Europa.",
      keywords: [
        "contacte GironaPlants",
        "proveïdor de plantes Breda Girona",
        "telèfon GironaPlants",
      ],
    },
  },
  en: {
    home: {
      title: "GironaPlants · Wholesale plant supplier in Europe",
      description:
        "More than 30 years supplying plants to the trade. We don't grow them — we select them from nurseries across Europe and deliver your whole list. Quote within 24-48 h.",
      keywords: [
        "wholesale plant supplier Europe",
        "plant distributor Spain",
        "plant sourcing Europe",
        "Mediterranean plants wholesale",
        "plants for landscaping projects",
        "buy plants wholesale Europe",
      ],
    },
    products: {
      title: "Wholesale plant catalogue",
      description:
        "Trees, shrubs, conifers, ornamental grasses, ground covers and forest plants from selected growers in Spain and the rest of Europe. Request a wholesale quote.",
      keywords: [
        "buy Mediterranean plants wholesale",
        "wholesale trees and shrubs Spain",
        "native forest plants",
        "plant supplier Girona",
      ],
    },
    offers: {
      title: "Plant offers for the trade",
      description:
        "Seasonal offers and special availability for landscaping and gardening professionals, at a firm price while stock lasts.",
      keywords: [
        "wholesale plant offers",
        "wholesale plant deals Spain",
        "landscaping plant offers",
      ],
    },
    aboutUs: {
      title: "About us · 30 years in the plant trade",
      description:
        "More than 30 years and two generations in the plant trade. No production of our own: for every species we pick the European grower who raises it best.",
      keywords: [
        "wholesale plant supplier Europe",
        "family plant merchant Spain",
        "plant supplier Girona",
      ],
    },
    catalogues: {
      title: "Availability & seasonal catalogues",
      description:
        "Download GironaPlants' up-to-date catalogues in PDF: genus, format, height and reference price for every plant we supply.",
      keywords: [
        "plant catalogue PDF",
        "plant availability list Spain",
        "wholesale plant catalogue",
      ],
    },
    budget: {
      title: "Request a plant quote",
      description:
        "Tell us the species, sizes and quantities your project needs and we'll send a tailored quote within 24-48 h, with no obligation.",
      keywords: [
        "plant quote",
        "wholesale plant prices Spain",
        "landscaping plants quote",
      ],
    },
    contact: {
      title: "Contact",
      description:
        "Talk to GironaPlants: +34 639 811 560 · gironaplants@gironaplants.com. Family business in Breda (Girona, Spain), shipping across Spain and Europe.",
      keywords: [
        "contact GironaPlants",
        "plant supplier Breda Girona",
        "GironaPlants phone",
      ],
    },
  },
  fr: {
    home: {
      title: "GironaPlants · Fournisseur de plantes en gros",
      description:
        "Plus de 30 ans à fournir des plantes aux professionnels. Nous ne les cultivons pas : nous les sélectionnons dans les pépinières d'Europe. Devis sous 24-48 h.",
      keywords: [
        "fournisseur de plantes en gros",
        "négociant en plantes Europe",
        "plantes méditerranéennes en gros",
        "fournisseur de plantes paysagistes",
        "plantes pour projets paysagers",
        "acheter des plantes en gros Espagne",
      ],
    },
    products: {
      title: "Catalogue de plantes en gros",
      description:
        "Arbres, arbustes, conifères, graminées, couvre-sols et plants forestiers de pépinières sélectionnées en Espagne et dans le reste de l'Europe. Demandez votre devis en gros.",
      keywords: [
        "acheter plantes méditerranéennes en gros",
        "arbres et arbustes en gros Espagne",
        "plants forestiers indigènes",
        "fournisseur de plantes Gérone",
      ],
    },
    offers: {
      title: "Offres de plantes pour professionnels",
      description:
        "Offres de saison et disponibilités spéciales pour les professionnels du paysage et du jardin, à prix ferme jusqu'à épuisement du stock.",
      keywords: [
        "offres plantes en gros",
        "plantes en gros pas chères",
        "offres paysagistes Espagne",
      ],
    },
    aboutUs: {
      title: "À propos · 30 ans de négoce de plantes",
      description:
        "Plus de 30 ans et deux générations dans le négoce de plantes. Sans production propre : pour chaque espèce, nous choisissons le pépiniériste européen qui la réussit le mieux.",
      keywords: [
        "fournisseur de plantes Europe",
        "négociant en plantes familial Espagne",
        "fournisseur plantes Gérone",
      ],
    },
    catalogues: {
      title: "Catalogues de disponibilité et de saison",
      description:
        "Téléchargez en PDF les catalogues à jour de GironaPlants : genre, format, hauteur et prix de référence de toutes les plantes que nous livrons.",
      keywords: [
        "catalogue de plantes PDF",
        "liste de disponibilité de plantes",
        "catalogue plantes en gros",
      ],
    },
    budget: {
      title: "Demander un devis de plantes",
      description:
        "Indiquez-nous les espèces, tailles et quantités dont votre projet a besoin et recevez un devis sur mesure sous 24-48 h, sans engagement.",
      keywords: [
        "devis plantes",
        "prix plantes en gros",
        "devis plantes paysagistes",
      ],
    },
    contact: {
      title: "Contact",
      description:
        "Contactez GironaPlants : +34 639 811 560 · gironaplants@gironaplants.com. Entreprise familiale à Breda (Gérone), livraison en France et en Europe.",
      keywords: [
        "contact GironaPlants",
        "fournisseur de plantes Breda Gérone",
        "téléphone GironaPlants",
      ],
    },
  },
};

function resolveLocale(lng: string): SeoLocale {
  return (SEO_LOCALES as readonly string[]).includes(lng)
    ? (lng as SeoLocale)
    : "es";
}

export function buildPageMetadata(lng: string, page: SeoPageKey): Metadata {
  const locale = resolveLocale(lng);
  const seo = SEO[locale][page];
  const path = PAGE_PATH[page];
  const canonical = `/${locale}${path}`;

  const languages: Record<string, string> = {};
  for (const l of SEO_LOCALES) languages[l] = `/${l}${path}`;
  languages["x-default"] = `/es${path}`;

  return {
    // The home page carries the full brand title; subpages rely on the root
    // layout's "%s | GironaPlants" template.
    title: page === "home" ? { absolute: seo.title } : seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${canonical}`,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: OG_IMAGE,
          width: 1280,
          height: 853,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [OG_IMAGE],
    },
  };
}

/**
 * Metadata for a page whose path is not known at build time — the genus and
 * species catalogue pages, one per row group in Strapi.
 *
 * Same canonical + hreflang contract as buildPageMetadata: the plant data is
 * not localised (botanical names are Latin in all four locales), so the four
 * language versions of a species page are near-identical by nature and the
 * alternates are what tells Google that is deliberate.
 */
export function buildDynamicMetadata({
  lng,
  path,
  title,
  description,
  keywords,
}: {
  lng: string;
  /** Locale-independent, leading slash: "/products/quercus". */
  path: string;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata {
  const locale = resolveLocale(lng);
  const canonical = `/${locale}${path}`;

  const languages: Record<string, string> = {};
  for (const l of SEO_LOCALES) languages[l] = `/${l}${path}`;
  languages["x-default"] = `/es${path}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${canonical}`,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1280, height: 853, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
