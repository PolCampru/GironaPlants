// Per-locale fallback copy for the /catalogues page.
//
// This page used to call notFound() whenever Strapi returned nothing — and
// the `catalogue` single type had never been created, so /catalogues was a
// hard 404 in production while the navbar, the home page and the About Us
// page all linked to it. A content page must not 404 because a CMS entry is
// missing; it renders this copy instead.

export type CataloguesFallbackContent = {
  label: string;
  main_title: string;
  main_subtitle: string;
  main_button: string;
  /** Short description of the general catalogue on the teaser card. */
  main_card_subtitle: string;
  browse_button: string;
  request_button: string;
  section_label: string;
  section_title: string;
  section_subtitle: string;
  /** Tag on the young-plant catalogues, so they don't read as extracts. */
  grow_on_tag: string;
  download_label: string;
  contact_title: string;
  contact_subtitle: string;
  contact_button: string;
};

const content: Record<string, CataloguesFallbackContent> = {
  es: {
    label: "Catálogo general",
    main_title: "Todo lo que te podemos servir, en un solo documento",
    main_subtitle:
      "La gama completa con género, formato, altura y precio de referencia. El documento que tu equipo de compras necesita para cerrar un proyecto entero de una sola vez.",
    main_button: "Descargar catálogo general",
    main_card_subtitle:
      "Nuestro catálogo principal: la gama completa con género, formato, altura y precio de referencia.",
    browse_button: "Ver el catálogo online",
    request_button: "Pedir el PDF",
    section_label: "Planta para hacer crecer",
    section_title: "Dos catálogos más, dos gamas distintas",
    section_subtitle:
      "No son extractos del catálogo general: es planta joven para hacer crecer, con su propio stock y su propio calendario. Esquejes enraizados en bandeja y vivaces en alvéolo.",
    grow_on_tag: "Planta para hacer crecer",
    download_label: "Descargar",
    contact_title: "¿Necesitas algo que no está en los catálogos?",
    contact_subtitle:
      "Mándanos tu listado y lo buscamos en nuestra red de viveros en España y el resto de Europa.",
    contact_button: "Solicitar presupuesto",
  },
  ca: {
    label: "Catàleg general",
    main_title: "Tot el que et podem servir, en un sol document",
    main_subtitle:
      "La gamma completa amb gènere, format, alçada i preu de referència. El document que el teu equip de compres necessita per tancar un projecte sencer d'un sol cop.",
    main_button: "Descarregar catàleg general",
    main_card_subtitle:
      "El nostre catàleg principal: la gamma completa amb gènere, format, alçada i preu de referència.",
    browse_button: "Veure el catàleg en línia",
    request_button: "Demanar el PDF",
    section_label: "Planta per fer créixer",
    section_title: "Dos catàlegs més, dues gammes diferents",
    section_subtitle:
      "No són extractes del catàleg general: és planta jove per fer créixer, amb el seu propi estoc i calendari. Esqueixos arrelats en safata i vivaces en alvèol.",
    grow_on_tag: "Planta per fer créixer",
    download_label: "Descarregar",
    contact_title: "Necessites alguna cosa que no és als catàlegs?",
    contact_subtitle:
      "Envia'ns el teu llistat i el busquem a la nostra xarxa de vivers a Espanya i la resta d'Europa.",
    contact_button: "Demanar pressupost",
  },
  en: {
    label: "General catalogue",
    main_title: "Everything we can supply, in a single document",
    main_subtitle:
      "The full range with genus, format, height and reference price. The document your purchasing team needs to close out a whole project in one go.",
    main_button: "Download the general catalogue",
    main_card_subtitle:
      "Our main catalogue: the full range with genus, format, height and reference price.",
    browse_button: "Browse the catalogue online",
    request_button: "Ask for the PDF",
    section_label: "Young plants to grow on",
    section_title: "A separate range, not an extract",
    section_subtitle:
      "Our rooted cuttings are not a slice of the general catalogue: they are young plants to grow on, supplied in trays, with their own stock list and availability.",
    grow_on_tag: "Young plants to grow on",
    download_label: "Download",
    contact_title: "Need something that isn't in the catalogue?",
    contact_subtitle:
      "Send us your list and we'll look for it across our grower network in Spain and the rest of Europe.",
    contact_button: "Request a quote",
  },
  fr: {
    label: "Catalogue général",
    main_title: "Tout ce que nous pouvons livrer, en un seul document",
    main_subtitle:
      "La gamme complète avec genre, format, hauteur et prix de référence. Le document dont votre service achats a besoin pour boucler un projet entier en une fois.",
    main_button: "Télécharger le catalogue général",
    main_card_subtitle:
      "Notre catalogue principal : la gamme complète avec genre, format, hauteur et prix de référence.",
    browse_button: "Voir le catalogue en ligne",
    request_button: "Demander le PDF",
    section_label: "Jeunes plants à cultiver",
    section_title: "Une gamme à part, pas un extrait",
    section_subtitle:
      "Nos boutures racinées ne sont pas un extrait du catalogue général : ce sont des jeunes plants à cultiver, livrés en plaques, avec leur propre stock et leur propre disponibilité.",
    grow_on_tag: "Jeunes plants à cultiver",
    download_label: "Télécharger",
    contact_title: "Il vous faut quelque chose qui n'est pas au catalogue ?",
    contact_subtitle:
      "Envoyez-nous votre liste et nous la cherchons dans notre réseau de pépinières en Espagne et dans le reste de l'Europe.",
    contact_button: "Demander un devis",
  },
  it: {
    label: "Catalogo generale",
    main_title: "Tutto ciò che possiamo fornire, in un unico documento",
    main_subtitle:
      "La gamma completa con genere, formato, altezza e prezzo di riferimento. Il documento di cui il tuo ufficio acquisti ha bisogno per chiudere un intero progetto in una sola volta.",
    main_button: "Scarica il catalogo generale",
    main_card_subtitle:
      "Il nostro catalogo principale: la gamma completa con genere, formato, altezza e prezzo di riferimento.",
    browse_button: "Consulta il catalogo online",
    request_button: "Richiedi il PDF",
    section_label: "Giovani piante da coltivare",
    section_title: "Una gamma a parte, non un estratto",
    section_subtitle:
      "Le nostre talee radicate non sono un estratto del catalogo generale: sono giovani piante da coltivare, fornite in vassoio, con stock e disponibilità propri.",
    grow_on_tag: "Giovani piante da coltivare",
    download_label: "Scarica",
    contact_title: "Ti serve qualcosa che non è nel catalogo?",
    contact_subtitle:
      "Inviaci la tua lista e la cerchiamo nella nostra rete di vivai in Spagna e nel resto d'Europa.",
    contact_button: "Richiedi un preventivo",
  },
};

export function getCataloguesContent(
  locale: string
): CataloguesFallbackContent {
  return content[locale] ?? content.es;
}

/**
 * The young-plant catalogues (rooted cuttings, perennials & grasses) are only
 * offered in the Spanish and Catalan market; every other locale gets the
 * general catalogue alone. The CMS entries exist in every locale, so they are
 * dropped here rather than in Strapi.
 */
const GROW_ON_LOCALES = ["es", "ca"];

export const offersGrowOnCatalogues = (locale: string) =>
  GROW_ON_LOCALES.includes(locale);
