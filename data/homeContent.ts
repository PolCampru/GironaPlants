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
    hero_badge: "Suministro de plantas en toda Europa",
    hero_title: "Las plantas que tu proyecto necesita, en toda Europa",
    hero_subtitle:
      "Más de 30 años consiguiendo planta para profesionales. Cultivamos planta mediterránea en Girona y localizamos cualquier otra especie a través de nuestra red de viveros en España y el resto de Europa. Si no la cultivamos, la encontramos.",
    hero_button: "Ver productos",
    hero_secondary_button: "Solicitar presupuesto",
    trust_items: [
      "Más de 30 años de experiencia",
      "Red de viveros en toda Europa",
      "Cultivo propio en Girona",
      "Presupuesto en 24-48 h",
    ],
    plants_title: "Nuestras plantas",
    plants_subtitle:
      "Del árbol forestal a la gramínea ornamental: encuentra la variedad perfecta para cada proyecto de jardinería y paisajismo. Y si no está en el catálogo, la localizamos por ti.",
    plants_button: "Ver todo el catálogo",
    catalogues_title: "Catálogos",
    catalogues_subtitle:
      "Descarga nuestros catálogos de disponibilidad y producción actualizados.",
    catalogues_button: "Ver catálogos",
    contact_title: "¿Preparamos tu oferta?",
    contact_subtitle:
      "Cuéntanos qué necesita tu proyecto —especies, medidas y cantidades— y te enviamos un presupuesto a medida en 24-48 h, sin compromiso. Servimos en toda Europa.",
    contact_button: "Solicitar presupuesto",
  },
  ca: {
    hero_badge: "Subministrament de plantes a tot Europa",
    hero_title: "Les plantes que el teu projecte necessita, a tot Europa",
    hero_subtitle:
      "Més de 30 anys aconseguint planta per a professionals. Cultivem planta mediterrània a Girona i localitzem qualsevol altra espècie a través de la nostra xarxa de vivers a Espanya i la resta d'Europa. Si no la cultivem, la trobem.",
    hero_button: "Veure productes",
    hero_secondary_button: "Demanar pressupost",
    trust_items: [
      "Més de 30 anys d'experiència",
      "Xarxa de vivers a tot Europa",
      "Cultiu propi a Girona",
      "Pressupost en 24-48 h",
    ],
    plants_title: "Les nostres plantes",
    plants_subtitle:
      "De l'arbre forestal a la gramínia ornamental: troba la varietat perfecta per a cada projecte de jardineria i paisatgisme. I si no és al catàleg, la localitzem per tu.",
    plants_button: "Veure tot el catàleg",
    catalogues_title: "Catàlegs",
    catalogues_subtitle:
      "Descarrega els nostres catàlegs de disponibilitat i producció actualitzats.",
    catalogues_button: "Veure catàlegs",
    contact_title: "Preparem la teva oferta?",
    contact_subtitle:
      "Explica'ns què necessita el teu projecte —espècies, mides i quantitats— i t'enviem un pressupost a mida en 24-48 h, sense compromís. Servim a tot Europa.",
    contact_button: "Demanar pressupost",
  },
  en: {
    hero_badge: "Plant sourcing across Europe",
    hero_title: "The plants your project needs, anywhere in Europe",
    hero_subtitle:
      "More than 30 years sourcing plants for professionals. We grow Mediterranean species at our own nursery in Girona and track down everything else through our grower network across Spain and the rest of Europe. If we don't grow it, we'll find it.",
    hero_button: "Browse products",
    hero_secondary_button: "Request a quote",
    trust_items: [
      "More than 30 years of experience",
      "Grower network across Europe",
      "Own production in Girona",
      "Quote within 24-48 h",
    ],
    plants_title: "Our plants",
    plants_subtitle:
      "From forest trees to ornamental grasses: find the right variety for every gardening and landscaping project — and if it isn't in the catalogue, we'll source it for you.",
    plants_button: "View full catalogue",
    catalogues_title: "Catalogues",
    catalogues_subtitle:
      "Download our up-to-date availability and production catalogues.",
    catalogues_button: "View catalogues",
    contact_title: "Ready for your quote?",
    contact_subtitle:
      "Tell us what your project needs — species, sizes and quantities — and we'll send a tailored quote within 24-48 h, no obligation. We deliver across Europe.",
    contact_button: "Request a quote",
  },
  fr: {
    hero_badge: "Approvisionnement en plantes en Europe",
    hero_title: "Les plantes dont votre projet a besoin, partout en Europe",
    hero_subtitle:
      "Plus de 30 ans à trouver des plantes pour les professionnels. Nous cultivons des plantes méditerranéennes dans notre pépinière de Gérone et localisons toutes les autres espèces grâce à notre réseau de pépinières en Espagne et dans le reste de l'Europe. Si nous ne la cultivons pas, nous la trouvons.",
    hero_button: "Voir les produits",
    hero_secondary_button: "Demander un devis",
    trust_items: [
      "Plus de 30 ans d'expérience",
      "Réseau de pépinières dans toute l'Europe",
      "Production propre à Gérone",
      "Devis sous 24-48 h",
    ],
    plants_title: "Nos plantes",
    plants_subtitle:
      "De l'arbre forestier aux graminées ornementales : trouvez la variété idéale pour chaque projet de jardinage et de paysagisme — et si elle n'est pas au catalogue, nous la trouvons pour vous.",
    plants_button: "Voir tout le catalogue",
    catalogues_title: "Catalogues",
    catalogues_subtitle:
      "Téléchargez nos catalogues de disponibilité et de production à jour.",
    catalogues_button: "Voir les catalogues",
    contact_title: "On prépare votre devis ?",
    contact_subtitle:
      "Dites-nous ce qu'il faut à votre projet — espèces, tailles et quantités — et nous vous envoyons un devis sur mesure sous 24-48 h, sans engagement. Nous livrons dans toute l'Europe.",
    contact_button: "Demander un devis",
  },
};

export function getHomeContent(locale: string): HomeFallbackContent {
  return content[locale] ?? content.es;
}
