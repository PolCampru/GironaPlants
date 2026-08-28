// Per-locale copy for headings that must exist in the server-rendered HTML.
//
// react-i18next resolves nothing during the server render (it loads its
// namespaces over HTTP from the browser), so any heading read through t()
// shipped empty — /offers literally served `<h1>title</h1>` — and then
// changed on the client, which is both an SEO hole and a hydration risk.
// These strings come from the server component instead. Interactive copy
// that only ever runs in the browser (validation messages, toasts) stays on
// i18n.

export type PageHeading = {
  label: string;
  title: string;
  lead: string;
};

const offers: Record<string, PageHeading> = {
  es: {
    label: "Ofertas",
    title: "Planta con precio especial",
    lead: "Partidas concretas del vivero a precio reducido mientras dure el stock. Se actualizan cada semana.",
  },
  ca: {
    label: "Ofertes",
    title: "Planta amb preu especial",
    lead: "Partides concretes del viver a preu reduït mentre duri l'estoc. S'actualitzen cada setmana.",
  },
  en: {
    label: "Offers",
    title: "Plants at a special price",
    lead: "Specific batches from the nursery at a reduced price while stock lasts. Updated every week.",
  },
  fr: {
    label: "Offres",
    title: "Plantes à prix spécial",
    lead: "Des lots précis de la pépinière à prix réduit jusqu'à épuisement du stock. Mis à jour chaque semaine.",
  },
};

export type ProductsHeading = PageHeading & {
  fallbackTitle: string;
  askQuestion: string;
  askButton: string;
};

const products: Record<string, ProductsHeading> = {
  es: {
    label: "Catálogo vivo",
    title: "referencias disponibles",
    fallbackTitle: "Nuestro catálogo",
    askQuestion: "¿No encuentras la especie que buscas?",
    askButton: "Añádela a tu presupuesto",
    lead: "Filtra por formato o busca por género, márcalas y envíanos la lista. Te devolvemos un presupuesto cerrado en 24-48 h.",
  },
  ca: {
    label: "Catàleg viu",
    title: "referències disponibles",
    fallbackTitle: "El nostre catàleg",
    askQuestion: "No trobes l'espècie que busques?",
    askButton: "Afegeix-la al teu pressupost",
    lead: "Filtra per format o busca per gènere, marca-les i envia'ns la llista. Et tornem un pressupost tancat en 24-48 h.",
  },
  en: {
    label: "Live catalogue",
    title: "references available",
    fallbackTitle: "Our catalogue",
    askQuestion: "Can't find the species you need?",
    askButton: "Add it to your quote",
    lead: "Filter by format or search by genus, tick what you need and send us the list. We come back with a firm quote within 24-48 h.",
  },
  fr: {
    label: "Catalogue vivant",
    title: "références disponibles",
    fallbackTitle: "Notre catalogue",
    askQuestion: "Vous ne trouvez pas l'espèce recherchée ?",
    askButton: "Ajoutez-la à votre devis",
    lead: "Filtrez par format ou cherchez par genre, cochez ce qu'il vous faut et envoyez-nous la liste. Nous revenons avec un devis ferme sous 24-48 h.",
  },
};

const contact: Record<string, PageHeading> = {
  es: {
    label: "Solicitud de presupuesto",
    title: "Dinos qué necesitas",
    lead: "Especies, medidas y cantidades. Te respondemos con un presupuesto cerrado en 24-48 h laborables, sin compromiso.",
  },
  ca: {
    label: "Sol·licitud de pressupost",
    title: "Digues-nos què necessites",
    lead: "Espècies, mides i quantitats. Et responem amb un pressupost tancat en 24-48 h laborables, sense compromís.",
  },
  en: {
    label: "Quote request",
    title: "Tell us what you need",
    lead: "Species, sizes and quantities. We come back with a firm quote within 24-48 working hours, no obligation.",
  },
  fr: {
    label: "Demande de devis",
    title: "Dites-nous ce qu'il vous faut",
    lead: "Espèces, tailles et quantités. Nous revenons avec un devis ferme sous 24-48 h ouvrées, sans engagement.",
  },
};

const budget: Record<string, PageHeading> = {
  es: {
    label: "Tu selección",
    title: "Solicitud de presupuesto",
    lead: "Revisa las especies y las cantidades, completa tus datos y te devolvemos un presupuesto cerrado en 24-48 h.",
  },
  ca: {
    label: "La teva selecció",
    title: "Sol·licitud de pressupost",
    lead: "Revisa les espècies i les quantitats, completa les teves dades i et tornem un pressupost tancat en 24-48 h.",
  },
  en: {
    label: "Your selection",
    title: "Quote request",
    lead: "Check the species and quantities, fill in your details and we come back with a firm quote within 24-48 h.",
  },
  fr: {
    label: "Votre sélection",
    title: "Demande de devis",
    lead: "Vérifiez les espèces et les quantités, renseignez vos coordonnées et nous revenons avec un devis ferme sous 24-48 h.",
  },
};

export const getBudgetHeading = (locale: string) => budget[locale] ?? budget.es;

export const getOffersHeading = (locale: string) => offers[locale] ?? offers.es;
export const getProductsHeading = (locale: string): ProductsHeading =>
  products[locale] ?? products.es;
export const getContactHeading = (locale: string) =>
  contact[locale] ?? contact.es;
