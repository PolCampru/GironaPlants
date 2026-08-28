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
  browse_button: string;
  request_button: string;
  updated_label: string;
  section_label: string;
  section_title: string;
  section_subtitle: string;
  download_label: string;
  contact_title: string;
  contact_subtitle: string;
  contact_button: string;
};

const content: Record<string, CataloguesFallbackContent> = {
  es: {
    label: "Catálogo general",
    main_title: "Todo lo que cultivamos y todo lo que localizamos",
    main_subtitle:
      "La gama completa con género, formato, altura y precio de referencia. El documento que tu equipo de compras necesita para cerrar un proyecto entero de una sola vez.",
    main_button: "Descargar catálogo general",
    browse_button: "Ver el catálogo online",
    request_button: "Pedir el PDF",
    updated_label: "Actualizado",
    section_label: "Catálogos específicos",
    section_title: "Si solo necesitas una parte",
    section_subtitle:
      "Documentos más cortos por familia y por temporada, pensados para enviar directamente a obra.",
    download_label: "Descargar",
    contact_title: "¿Necesitas algo que no está en los catálogos?",
    contact_subtitle:
      "Mándanos tu listado y lo buscamos en nuestra red de viveros en España y el resto de Europa.",
    contact_button: "Solicitar presupuesto",
  },
  ca: {
    label: "Catàleg general",
    main_title: "Tot el que cultivem i tot el que localitzem",
    main_subtitle:
      "La gamma completa amb gènere, format, alçada i preu de referència. El document que el teu equip de compres necessita per tancar un projecte sencer d'un sol cop.",
    main_button: "Descarregar catàleg general",
    browse_button: "Veure el catàleg en línia",
    request_button: "Demanar el PDF",
    updated_label: "Actualitzat",
    section_label: "Catàlegs específics",
    section_title: "Si només necessites una part",
    section_subtitle:
      "Documents més curts per família i per temporada, pensats per enviar directament a obra.",
    download_label: "Descarregar",
    contact_title: "Necessites alguna cosa que no és als catàlegs?",
    contact_subtitle:
      "Envia'ns el teu llistat i el busquem a la nostra xarxa de vivers a Espanya i la resta d'Europa.",
    contact_button: "Demanar pressupost",
  },
  en: {
    label: "General catalogue",
    main_title: "Everything we grow and everything we source",
    main_subtitle:
      "The full range with genus, format, height and reference price. The document your purchasing team needs to close out a whole project in one go.",
    main_button: "Download the general catalogue",
    browse_button: "Browse the catalogue online",
    request_button: "Ask for the PDF",
    updated_label: "Updated",
    section_label: "Specific catalogues",
    section_title: "If you only need one part of it",
    section_subtitle:
      "Shorter documents by family and by season, made to forward straight to site.",
    download_label: "Download",
    contact_title: "Need something that isn't in the catalogues?",
    contact_subtitle:
      "Send us your list and we'll look for it across our grower network in Spain and the rest of Europe.",
    contact_button: "Request a quote",
  },
  fr: {
    label: "Catalogue général",
    main_title: "Tout ce que nous cultivons et tout ce que nous trouvons",
    main_subtitle:
      "La gamme complète avec genre, format, hauteur et prix de référence. Le document dont votre service achats a besoin pour boucler un projet entier en une fois.",
    main_button: "Télécharger le catalogue général",
    browse_button: "Voir le catalogue en ligne",
    request_button: "Demander le PDF",
    updated_label: "Mis à jour",
    section_label: "Catalogues spécifiques",
    section_title: "Si vous n'avez besoin que d'une partie",
    section_subtitle:
      "Des documents plus courts par famille et par saison, à transmettre directement au chantier.",
    download_label: "Télécharger",
    contact_title: "Il vous faut quelque chose qui n'est pas au catalogue ?",
    contact_subtitle:
      "Envoyez-nous votre liste et nous la cherchons dans notre réseau de pépinières en Espagne et dans le reste de l'Europe.",
    contact_button: "Demander un devis",
  },
};

export function getCataloguesContent(
  locale: string
): CataloguesFallbackContent {
  return content[locale] ?? content.es;
}
