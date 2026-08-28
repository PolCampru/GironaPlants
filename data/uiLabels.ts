// Accessible names for icon-only controls, per locale.
//
// These are read by screen readers on every page, so they cannot go through
// runtime i18n (which resolves nothing on the server) and they must not be
// hardcoded Spanish on /ca, /en and /fr — which is what they were.

export type UiLabels = {
  close: string;
  openMenu: string;
  closeMenu: string;
  previous: string;
  next: string;
  addToQuote: string;
  removeFromQuote: string;
  clearSearch: string;
  remove: string;
  language: string;
  mainNav: string;
  mobileNav: string;
  footerNav: string;
  searchInList: string;
};

const labels: Record<string, UiLabels> = {
  es: {
    close: "Cerrar",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    previous: "Anterior",
    next: "Siguiente",
    addToQuote: "Añadir al presupuesto",
    removeFromQuote: "Quitar del presupuesto",
    clearSearch: "Limpiar búsqueda",
    remove: "Quitar",
    language: "Idioma",
    mainNav: "Navegación principal",
    mobileNav: "Menú móvil",
    footerNav: "Pie de página",
    searchInList: "Buscar en la lista…",
  },
  ca: {
    close: "Tancar",
    openMenu: "Obrir menú",
    closeMenu: "Tancar menú",
    previous: "Anterior",
    next: "Següent",
    addToQuote: "Afegir al pressupost",
    removeFromQuote: "Treure del pressupost",
    clearSearch: "Netejar la cerca",
    remove: "Treure",
    language: "Idioma",
    mainNav: "Navegació principal",
    mobileNav: "Menú mòbil",
    footerNav: "Peu de pàgina",
    searchInList: "Cerca a la llista…",
  },
  en: {
    close: "Close",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    previous: "Previous",
    next: "Next",
    addToQuote: "Add to quote",
    removeFromQuote: "Remove from quote",
    clearSearch: "Clear search",
    remove: "Remove",
    language: "Language",
    mainNav: "Main navigation",
    mobileNav: "Mobile menu",
    footerNav: "Footer",
    searchInList: "Search this list…",
  },
  fr: {
    close: "Fermer",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    previous: "Précédent",
    next: "Suivant",
    addToQuote: "Ajouter au devis",
    removeFromQuote: "Retirer du devis",
    clearSearch: "Effacer la recherche",
    remove: "Retirer",
    language: "Langue",
    mainNav: "Navigation principale",
    mobileNav: "Menu mobile",
    footerNav: "Pied de page",
    searchInList: "Rechercher dans la liste…",
  },
};

export function getUiLabels(locale: string): UiLabels {
  return labels[locale] ?? labels.es;
}
