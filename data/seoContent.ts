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
      title: "GironaPlants · Vivero y plantas para proyectos en Girona",
      description:
        "Empresa familiar de Girona. Cultivamos planta mediterránea y conseguimos las plantas que tu proyecto necesita. Presupuesto en 24-48 h.",
      keywords: [
        "vivero Girona",
        "plantas al por mayor Girona",
        "plantas mediterráneas",
        "proveedor de plantas para paisajistas",
        "vivero familiar Cataluña",
        "plantas para proyectos de jardinería",
      ],
    },
    products: {
      title: "Catálogo de plantas mediterráneas",
      description:
        "Árboles, arbustos, coníferas, gramíneas, cubresuelos y planta forestal cultivados en Girona. Consulta el catálogo y pide tu oferta al por mayor sin compromiso.",
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
      title: "Nosotros · Vivero familiar en Girona",
      description:
        "Más de 25 años y dos generaciones dedicadas a la planta mediterránea. Cultivo propio y una red de viveros locales de confianza para conseguir cualquier especie.",
      keywords: [
        "vivero familiar Girona",
        "empresa familiar plantas",
        "viveros en la provincia de Girona",
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
      title: "GironaPlants · Viver i plantes per a projectes a Girona",
      description:
        "Empresa familiar de Girona. Cultivem planta mediterrània i aconseguim les plantes que el teu projecte necessita. Pressupost en 24-48 h.",
      keywords: [
        "viver Girona",
        "plantes a l'engròs Girona",
        "plantes mediterrànies",
        "proveïdor de plantes per a paisatgistes",
        "viver familiar Catalunya",
        "plantes per a projectes de jardineria",
      ],
    },
    products: {
      title: "Catàleg de plantes mediterrànies",
      description:
        "Arbres, arbustos, coníferes, gramínies, entapissants i planta forestal cultivats a Girona. Consulta el catàleg i demana la teva oferta a l'engròs sense compromís.",
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
      title: "Nosaltres · Viver familiar a Girona",
      description:
        "Més de 25 anys i dues generacions dedicades a la planta mediterrània. Cultiu propi i una xarxa de vivers locals de confiança per aconseguir qualsevol espècie.",
      keywords: [
        "viver familiar Girona",
        "empresa familiar plantes",
        "vivers a la província de Girona",
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
      title: "GironaPlants · Plant nursery & sourcing in Girona, Spain",
      description:
        "Family-run nursery in Girona, Catalonia. We grow Mediterranean plants and source the exact plants your project needs. Quote within 24-48 h.",
      keywords: [
        "wholesale plant nursery Spain",
        "Mediterranean plants supplier",
        "plant sourcing Spain",
        "plants for landscaping projects",
        "Girona nursery",
        "buy plants wholesale Europe",
      ],
    },
    products: {
      title: "Mediterranean plants catalogue",
      description:
        "Trees, shrubs, conifers, ornamental grasses, ground covers and forest plants grown in Girona, Spain. Browse the catalogue and request a wholesale quote.",
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
      title: "About us · Family nursery in Girona",
      description:
        "More than 25 years and two generations devoted to Mediterranean plants. Our own production plus a trusted network of local growers to source any species.",
      keywords: [
        "family plant nursery Spain",
        "plant supplier Girona",
        "nurseries in Catalonia",
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
      title: "GironaPlants · Pépinière et plantes pour vos projets",
      description:
        "Pépinière familiale à Gérone, en Catalogne. Nous cultivons des plantes méditerranéennes et trouvons celles dont votre projet a besoin. Devis sous 24-48 h.",
      keywords: [
        "pépinière Espagne",
        "plantes méditerranéennes en gros",
        "fournisseur de plantes paysagistes",
        "pépinière Gérone",
        "achat plantes Espagne",
        "plantes pour projets paysagers",
      ],
    },
    products: {
      title: "Catalogue de plantes méditerranéennes",
      description:
        "Arbres, arbustes, conifères, graminées, couvre-sols et plants forestiers cultivés à Gérone, en Espagne. Parcourez le catalogue et demandez votre devis en gros.",
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
      title: "À propos · Pépinière familiale à Gérone",
      description:
        "Plus de 25 ans et deux générations consacrées aux plantes méditerranéennes. Production propre et réseau de pépinières locales de confiance pour trouver chaque espèce.",
      keywords: [
        "pépinière familiale Espagne",
        "fournisseur plantes Gérone",
        "pépinières Catalogne",
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
