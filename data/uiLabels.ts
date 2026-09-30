// Accessible names for icon-only controls, per locale.
//
// These are read by screen readers on every page, so they cannot go through
// runtime i18n (which resolves nothing on the server) and they must not be
// hardcoded Spanish on /ca, /en, /fr and /it — which is what they were.

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
  /** Toasts on the genus and species pages. */
  addedToQuote: string;
  alreadyInQuote: string;
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
    addedToQuote: "Añadido al presupuesto",
    alreadyInQuote: "Ya está en tu presupuesto",
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
    addedToQuote: "Afegit al pressupost",
    alreadyInQuote: "Ja és al teu pressupost",
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
    addedToQuote: "Added to your quote",
    alreadyInQuote: "Already in your quote",
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
    addedToQuote: "Ajouté à votre devis",
    alreadyInQuote: "Déjà dans votre devis",
  },
  it: {
    close: "Chiudi",
    openMenu: "Apri il menu",
    closeMenu: "Chiudi il menu",
    previous: "Precedente",
    next: "Successivo",
    addToQuote: "Aggiungi al preventivo",
    removeFromQuote: "Rimuovi dal preventivo",
    clearSearch: "Cancella la ricerca",
    remove: "Rimuovi",
    language: "Lingua",
    mainNav: "Navigazione principale",
    mobileNav: "Menu mobile",
    footerNav: "Piè di pagina",
    searchInList: "Cerca nell'elenco…",
    addedToQuote: "Aggiunto al preventivo",
    alreadyInQuote: "Già nel tuo preventivo",
  },
};

export function getUiLabels(locale: string): UiLabels {
  return labels[locale] ?? labels.es;
}
