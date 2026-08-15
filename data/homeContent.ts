// Per-locale fallback copy for the home page. Strapi content wins whenever a
// field is filled in; these guarantee the landing page never renders blank
// while the CMS is empty or unreachable.

export const CONTACT_PHONE = "+34 639 811 560";
export const CONTACT_EMAIL = "gironaplants@gironaplants.com";

export type HomeFallbackContent = {
  hero_badge: string;
  hero_title: string;
  hero_subtitle: string;
  hero_button: string;
  hero_secondary_button: string;
  trust_items: string[];
  plants_title: string;
  plants_subtitle: string;
  plants_button: string;
  catalogues_title: string;
  catalogues_subtitle: string;
  catalogues_button: string;
  contact_title: string;
  contact_subtitle: string;
  contact_button: string;
};

const content: Record<string, HomeFallbackContent> = {
  es: {
    hero_badge: "Vivero especializado en Girona",
    hero_title: "Plantas mediterráneas para tus proyectos",
    hero_subtitle:
      "Cultivamos árboles, arbustos y planta mediterránea de calidad. Explora nuestro catálogo y solicita tu oferta sin compromiso.",
    hero_button: "Ver productos",
    hero_secondary_button: "Solicitar presupuesto",
    trust_items: [
      "Cultivo propio mediterráneo",
      "Atención a profesionales y particulares",
      "Respuesta en 24-48 h",
    ],
    plants_title: "Nuestras plantas",
    plants_subtitle:
      "Encuentra la variedad perfecta para cada proyecto de jardinería y paisajismo.",
    plants_button: "Ver todo el catálogo",
    catalogues_title: "Catálogos",
    catalogues_subtitle:
      "Descarga nuestros catálogos de disponibilidad y producción actualizados.",
    catalogues_button: "Ver catálogos",
    contact_title: "¿Preparamos tu oferta?",
    contact_subtitle:
      "Cuéntanos qué necesitas y te enviamos un presupuesto a medida, sin compromiso.",
    contact_button: "Solicitar presupuesto",
  },
  ca: {
    hero_badge: "Viver especialitzat a Girona",
    hero_title: "Plantes mediterrànies per als teus projectes",
    hero_subtitle:
      "Cultivem arbres, arbustos i planta mediterrània de qualitat. Explora el nostre catàleg i demana la teva oferta sense compromís.",
    hero_button: "Veure productes",
    hero_secondary_button: "Demanar pressupost",
    trust_items: [
      "Cultiu propi mediterrani",
      "Atenció a professionals i particulars",
      "Resposta en 24-48 h",
    ],
    plants_title: "Les nostres plantes",
    plants_subtitle:
      "Troba la varietat perfecta per a cada projecte de jardineria i paisatgisme.",
    plants_button: "Veure tot el catàleg",
    catalogues_title: "Catàlegs",
    catalogues_subtitle:
      "Descarrega els nostres catàlegs de disponibilitat i producció actualitzats.",
    catalogues_button: "Veure catàlegs",
    contact_title: "Preparem la teva oferta?",
    contact_subtitle:
      "Explica'ns què necessites i t'enviem un pressupost a mida, sense compromís.",
    contact_button: "Demanar pressupost",
  },
  en: {
    hero_badge: "Specialized nursery in Girona",
    hero_title: "Mediterranean plants for your projects",
    hero_subtitle:
      "We grow quality Mediterranean trees, shrubs and plants. Browse our catalogue and request a quote with no obligation.",
    hero_button: "Browse products",
    hero_secondary_button: "Request a quote",
    trust_items: [
      "Grown at our own nursery",
      "Serving professionals and individuals",
      "Reply within 24-48 h",
    ],
    plants_title: "Our plants",
    plants_subtitle:
      "Find the perfect variety for every gardening and landscaping project.",
    plants_button: "View full catalogue",
    catalogues_title: "Catalogues",
    catalogues_subtitle:
      "Download our up-to-date availability and production catalogues.",
    catalogues_button: "View catalogues",
    contact_title: "Ready for your quote?",
    contact_subtitle:
      "Tell us what you need and we will send you a tailored offer, with no obligation.",
    contact_button: "Request a quote",
  },
  fr: {
    hero_badge: "Pépinière spécialisée à Gérone",
    hero_title: "Des plantes méditerranéennes pour vos projets",
    hero_subtitle:
      "Nous cultivons des arbres, arbustes et plantes méditerranéennes de qualité. Parcourez notre catalogue et demandez votre devis sans engagement.",
    hero_button: "Voir les produits",
    hero_secondary_button: "Demander un devis",
    trust_items: [
      "Culture méditerranéenne locale",
      "Professionnels et particuliers",
      "Réponse sous 24-48 h",
    ],
    plants_title: "Nos plantes",
    plants_subtitle:
      "Trouvez la variété idéale pour chaque projet de jardinage et de paysagisme.",
    plants_button: "Voir tout le catalogue",
    catalogues_title: "Catalogues",
    catalogues_subtitle:
      "Téléchargez nos catalogues de disponibilité et de production à jour.",
    catalogues_button: "Voir les catalogues",
    contact_title: "On prépare votre devis ?",
    contact_subtitle:
      "Dites-nous ce qu'il vous faut et nous vous enverrons une offre sur mesure, sans engagement.",
    contact_button: "Demander un devis",
  },
};

export function getHomeContent(locale: string): HomeFallbackContent {
  return content[locale] ?? content.es;
}
