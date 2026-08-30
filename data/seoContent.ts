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
      title: "GironaPlants · Plantas para tu proyecto en toda Europa",
      description:
        "Más de 30 años consiguiendo plantas para profesionales. Cultivo propio en Girona y red de viveros en toda Europa. Presupuesto en 24-48 h.",
      keywords: [
        "proveedor de plantas Europa",
        "suministro de plantas al por mayor",
        "plantas mediterráneas",
        "proveedor de plantas para paisajistas",
        "vivero Girona",
        "buscamos cualquier especie de planta",
      ],
    },
    products: {
      title: "Catálogo de plantas mediterráneas",
      description:
        "Árboles, arbustos, coníferas, gramíneas, cubresuelos y planta forestal cultivados en Girona. Y si no la cultivamos, la localizamos en Europa: pide tu oferta al por mayor sin compromiso.",
      keywords: [
        "comprar plantas Girona",
        "plantas mediterráneas al por mayor",
        "árboles y arbustos vivero",
        "planta forestal autóctona",
      ],
    },
    offers: {
      title: "Ofertas de plantas de vivero",
      description:
        "Ofertas de temporada y disponibilidad especial para profesionales de la jardinería y el paisajismo, directas de nuestro vivero en Girona.",
      keywords: [
        "ofertas plantas vivero",
        "plantas baratas al por mayor",
        "ofertas jardinería Girona",
      ],
    },
    aboutUs: {
      title: "Nosotros · Más de 30 años de experiencia en planta",
      description:
        "Más de 30 años y dos generaciones dedicadas a la planta. Cultivo propio en Girona y una red de viveros en toda Europa para conseguir cualquier especie.",
      keywords: [
        "proveedor de plantas Europa",
        "empresa familiar plantas",
        "vivero familiar Girona",
      ],
    },
    catalogues: {
      title: "Catálogos de disponibilidad y producción",
      description:
        "Descarga en PDF los catálogos actualizados de disponibilidad y producción del vivero GironaPlants.",
      keywords: [
        "catálogo de plantas PDF",
        "disponibilidad vivero Girona",
        "catálogo producción plantas",
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
        "Habla con GironaPlants: +34 639 811 560 · gironaplants@gironaplants.com. Vivero familiar en la provincia de Girona, envíos a toda España y Europa.",
      keywords: ["contacto vivero Girona", "teléfono GironaPlants"],
    },
  },
  ca: {
    home: {
      title: "GironaPlants · Plantes per al teu projecte a tot Europa",
      description:
        "Més de 30 anys aconseguint plantes per a professionals. Cultiu propi a Girona i xarxa de vivers a tot Europa. Pressupost en 24-48 h.",
      keywords: [
        "proveïdor de plantes Europa",
        "plantes a l'engròs",
        "plantes mediterrànies",
        "proveïdor de plantes per a paisatgistes",
        "viver Girona",
        "busquem qualsevol espècie de planta",
      ],
    },
    products: {
      title: "Catàleg de plantes mediterrànies",
      description:
        "Arbres, arbustos, coníferes, gramínies, entapissants i planta forestal cultivats a Girona. I si no la cultivem, la localitzem a Europa: demana la teva oferta a l'engròs sense compromís.",
      keywords: [
        "comprar plantes Girona",
        "plantes mediterrànies a l'engròs",
        "arbres i arbustos viver",
        "planta forestal autòctona",
      ],
    },
    offers: {
      title: "Ofertes de plantes de viver",
      description:
        "Ofertes de temporada i disponibilitat especial per a professionals de la jardineria i el paisatgisme, directes del nostre viver a Girona.",
      keywords: [
        "ofertes plantes viver",
        "plantes a bon preu a l'engròs",
        "ofertes jardineria Girona",
      ],
    },
    aboutUs: {
      title: "Nosaltres · Més de 30 anys d'experiència en planta",
      description:
        "Més de 30 anys i dues generacions dedicades a la planta. Cultiu propi a Girona i una xarxa de vivers a tot Europa per aconseguir qualsevol espècie.",
      keywords: [
        "proveïdor de plantes Europa",
        "empresa familiar plantes",
        "viver familiar Girona",
      ],
    },
    catalogues: {
      title: "Catàlegs de disponibilitat i producció",
      description:
        "Descarrega en PDF els catàlegs actualitzats de disponibilitat i producció del viver GironaPlants.",
      keywords: [
        "catàleg de plantes PDF",
        "disponibilitat viver Girona",
        "catàleg producció plantes",
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
        "Parla amb GironaPlants: +34 639 811 560 · gironaplants@gironaplants.com. Viver familiar a la província de Girona, enviaments a tot Espanya i Europa.",
      keywords: ["contacte viver Girona", "telèfon GironaPlants"],
    },
  },
  en: {
    home: {
      title: "GironaPlants · Plant sourcing across Europe",
      description:
        "More than 30 years sourcing plants for professionals. Own production in Girona, Spain, plus a grower network across Europe. Quote within 24-48 h.",
      keywords: [
        "plant sourcing Europe",
        "wholesale plant supplier Europe",
        "Mediterranean plants supplier",
        "plants for landscaping projects",
        "Girona plant nursery",
        "buy plants wholesale Europe",
      ],
    },
    products: {
      title: "Mediterranean plants catalogue",
      description:
        "Trees, shrubs, conifers, ornamental grasses, ground covers and forest plants grown in Girona, Spain. Anything we don't grow, we source across Europe. Request a wholesale quote.",
      keywords: [
        "buy Mediterranean plants",
        "wholesale trees and shrubs Spain",
        "native forest plants",
      ],
    },
    offers: {
      title: "Nursery plant offers",
      description:
        "Seasonal offers and special availability for landscaping and gardening professionals, straight from our nursery in Girona, Spain.",
      keywords: [
        "plant nursery offers",
        "wholesale plant deals Spain",
        "landscaping plant offers",
      ],
    },
    aboutUs: {
      title: "About us · 30 years sourcing plants",
      description:
        "More than 30 years and two generations devoted to plants. Our own production in Girona plus a grower network across Europe to source any species.",
      keywords: [
        "plant supplier Europe",
        "family plant nursery Spain",
        "plant supplier Girona",
      ],
    },
    catalogues: {
      title: "Availability & production catalogues",
      description:
        "Download GironaPlants' up-to-date availability and production catalogues in PDF.",
      keywords: [
        "plant catalogue PDF",
        "nursery availability list Spain",
        "plant production catalogue",
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
        "Talk to GironaPlants: +34 639 811 560 · gironaplants@gironaplants.com. Family nursery in the province of Girona, shipping across Spain and Europe.",
      keywords: ["contact plant nursery Girona", "GironaPlants phone"],
    },
  },
  fr: {
    home: {
      title: "GironaPlants · Plantes pour vos projets partout en Europe",
      description:
        "Plus de 30 ans à trouver des plantes pour les professionnels. Production propre à Gérone et réseau de pépinières dans toute l'Europe. Devis sous 24-48 h.",
      keywords: [
        "fournisseur de plantes Europe",
        "plantes méditerranéennes en gros",
        "fournisseur de plantes paysagistes",
        "pépinière Gérone",
        "sourcing de plantes Europe",
        "plantes pour projets paysagers",
      ],
    },
    products: {
      title: "Catalogue de plantes méditerranéennes",
      description:
        "Arbres, arbustes, conifères, graminées, couvre-sols et plants forestiers cultivés à Gérone, en Espagne. Ce que nous ne cultivons pas, nous le trouvons en Europe. Demandez votre devis en gros.",
      keywords: [
        "acheter plantes méditerranéennes",
        "arbres et arbustes en gros Espagne",
        "plants forestiers indigènes",
      ],
    },
    offers: {
      title: "Offres de plantes de pépinière",
      description:
        "Offres de saison et disponibilités spéciales pour les professionnels du paysage et du jardin, directement de notre pépinière à Gérone.",
      keywords: [
        "offres plantes pépinière",
        "plantes en gros pas chères",
        "offres paysagistes Espagne",
      ],
    },
    aboutUs: {
      title: "À propos · Plus de 30 ans d'expérience",
      description:
        "Plus de 30 ans et deux générations consacrées aux plantes. Production propre à Gérone et réseau de pépinières dans toute l'Europe pour trouver chaque espèce.",
      keywords: [
        "fournisseur de plantes Europe",
        "pépinière familiale Espagne",
        "fournisseur plantes Gérone",
      ],
    },
    catalogues: {
      title: "Catalogues de disponibilité et de production",
      description:
        "Téléchargez en PDF les catalogues de disponibilité et de production à jour de la pépinière GironaPlants.",
      keywords: [
        "catalogue de plantes PDF",
        "disponibilité pépinière",
        "catalogue production plantes",
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
        "Contactez GironaPlants : +34 639 811 560 · gironaplants@gironaplants.com. Pépinière familiale dans la province de Gérone, livraison en France et en Europe.",
      keywords: ["contact pépinière Gérone", "téléphone GironaPlants"],
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
