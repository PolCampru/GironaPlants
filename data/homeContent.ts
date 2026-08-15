// Per-locale fallback copy for the home page. Strapi content wins whenever a
// field is filled in; these guarantee the landing page never renders blank
// while the CMS is empty or unreachable.
// The same copy is seeded into Strapi by cms/scripts/seed-site-content.js —
// keep both in sync when editing.

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
    hero_badge: "Vivero familiar en Girona",
    hero_title: "Las plantas que tu proyecto necesita",
    hero_subtitle:
      "Cultivamos planta mediterránea en Girona y localizamos cualquier especie a través de nuestra red de viveros de confianza. Si no la cultivamos, la encontramos.",
    hero_button: "Ver productos",
    hero_secondary_button: "Solicitar presupuesto",
    trust_items: [
      "Empresa familiar, 2ª generación",
      "Cultivo propio y red de viveros locales",
      "Presupuesto en 24-48 h",
    ],
    plants_title: "Nuestras plantas",
    plants_subtitle:
      "Del árbol forestal a la gramínea ornamental: encuentra la variedad perfecta para cada proyecto de jardinería y paisajismo.",
    plants_button: "Ver todo el catálogo",
    catalogues_title: "Catálogos",
    catalogues_subtitle:
      "Descarga nuestros catálogos de disponibilidad y producción actualizados.",
    catalogues_button: "Ver catálogos",
    contact_title: "¿Preparamos tu oferta?",
    contact_subtitle:
      "Cuéntanos qué necesita tu proyecto —especies, medidas y cantidades— y te enviamos un presupuesto a medida en 24-48 h, sin compromiso.",
    contact_button: "Solicitar presupuesto",
  },
  ca: {
    hero_badge: "Viver familiar a Girona",
    hero_title: "Les plantes que el teu projecte necessita",
    hero_subtitle:
      "Cultivem planta mediterrània a Girona i localitzem qualsevol espècie a través de la nostra xarxa de vivers de confiança. Si no la cultivem, la trobem.",
    hero_button: "Veure productes",
    hero_secondary_button: "Demanar pressupost",
    trust_items: [
      "Empresa familiar, 2a generació",
      "Cultiu propi i xarxa de vivers locals",
      "Pressupost en 24-48 h",
    ],
    plants_title: "Les nostres plantes",
    plants_subtitle:
      "De l'arbre forestal a la gramínia ornamental: troba la varietat perfecta per a cada projecte de jardineria i paisatgisme.",
    plants_button: "Veure tot el catàleg",
    catalogues_title: "Catàlegs",
    catalogues_subtitle:
      "Descarrega els nostres catàlegs de disponibilitat i producció actualitzats.",
    catalogues_button: "Veure catàlegs",
    contact_title: "Preparem la teva oferta?",
    contact_subtitle:
      "Explica'ns què necessita el teu projecte —espècies, mides i quantitats— i t'enviem un pressupost a mida en 24-48 h, sense compromís.",
    contact_button: "Demanar pressupost",
  },
  en: {
    hero_badge: "Family-run nursery in Girona",
    hero_title: "The plants your project needs",
    hero_subtitle:
      "We grow Mediterranean plants in Girona, Catalonia, and source any species through our trusted network of local growers. If we don't grow it, we'll find it.",
    hero_button: "Browse products",
    hero_secondary_button: "Request a quote",
    trust_items: [
      "Second-generation family business",
      "Own production plus a local grower network",
      "Quote within 24-48 h",
    ],
    plants_title: "Our plants",
    plants_subtitle:
      "From forest trees to ornamental grasses: find the right variety for every gardening and landscaping project.",
    plants_button: "View full catalogue",
    catalogues_title: "Catalogues",
    catalogues_subtitle:
      "Download our up-to-date availability and production catalogues.",
    catalogues_button: "View catalogues",
    contact_title: "Ready for your quote?",
    contact_subtitle:
      "Tell us what your project needs — species, sizes and quantities — and we'll send a tailored quote within 24-48 h, no obligation.",
    contact_button: "Request a quote",
  },
  fr: {
    hero_badge: "Pépinière familiale à Gérone",
    hero_title: "Les plantes dont votre projet a besoin",
    hero_subtitle:
      "Nous cultivons des plantes méditerranéennes à Gérone, en Catalogne, et trouvons chaque espèce grâce à notre réseau de pépinières locales de confiance. Livraison en France et dans toute l'Europe.",
    hero_button: "Voir les produits",
    hero_secondary_button: "Demander un devis",
    trust_items: [
      "Entreprise familiale, 2e génération",
      "Production propre et réseau de pépinières locales",
      "Devis sous 24-48 h",
    ],
    plants_title: "Nos plantes",
    plants_subtitle:
      "De l'arbre forestier aux graminées ornementales : trouvez la variété idéale pour chaque projet de jardinage et de paysagisme.",
    plants_button: "Voir tout le catalogue",
    catalogues_title: "Catalogues",
    catalogues_subtitle:
      "Téléchargez nos catalogues de disponibilité et de production à jour.",
    catalogues_button: "Voir les catalogues",
    contact_title: "On prépare votre devis ?",
    contact_subtitle:
      "Dites-nous ce qu'il faut à votre projet — espèces, tailles et quantités — et nous vous envoyons un devis sur mesure sous 24-48 h, sans engagement.",
    contact_button: "Demander un devis",
  },
};

export function getHomeContent(locale: string): HomeFallbackContent {
  return content[locale] ?? content.es;
}
