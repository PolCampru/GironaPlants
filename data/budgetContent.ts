// Quote ("presupuesto") copy: the selection panel, the navbar drawer and the
// empty state.
//
// This used to live in public/locales/*/budget.json and resolve through
// runtime i18n, which returns nothing during the server render — so the panel
// head, the empty state and the drawer CTA were emitted empty on the server
// and filled in on the client. Same reason data/navigation.ts exists: copy
// that has to be in the server HTML lives in data/, keyed by the locale in
// the URL.
//
// `{n}` and `{name}` are filled by fill() below.

export type QuoteCopy = {
  /** Eyebrow over the selection summary. */
  inRequest: string;
  /** "{n} species" — the line count. */
  speciesOne: string;
  speciesMany: string;
  /** "{n} units" — the sum of the quantities, which is what we price. */
  unitsOne: string;
  unitsMany: string;
  searchPlaceholder: string;
  clear: string;
  noMatches: string;
  /** "Minimum order is {n} units" */
  minimum: string;
  /** "min. {n} units" — the resting state of the same fact. */
  minimumShort: string;
  /** One-tap fix for a line under its minimum. */
  setToMin: string;
  /** Accessible names for the stepper. */
  fewer: string;
  more: string;
  quantityOf: string;
  /** Undo bar. */
  removed: string;
  cleared: string;
  undo: string;
  /** Empty state. */
  emptyTitle: string;
  emptyLead: string;
  emptyCta: string;
  /** "Didn't find what you're looking for?" + the modal trigger. */
  addQuestion: string;
  addButton: string;
  keptLocal: string;
  /** Band over the request form: "4 species · 550 units travel with this form". */
  travelWithForm: string;
  /** Drawer CTA through to /budget. */
  drawerCta: string;
  pricedIn: string;
};

const copy: Record<string, QuoteCopy> = {
  es: {
    inRequest: "En esta solicitud",
    speciesOne: "{n} especie",
    speciesMany: "{n} especies",
    unitsOne: "{n} unidad",
    unitsMany: "{n} unidades",
    searchPlaceholder: "Buscar en tu lista…",
    clear: "Vaciar la solicitud",
    noMatches: "Ningún artículo de tu lista coincide con esa búsqueda.",
    minimum: "El pedido mínimo es de {n} unidades",
    minimumShort: "mín. {n} unidades",
    setToMin: "Poner {n}",
    fewer: "Menos unidades",
    more: "Más unidades",
    quantityOf: "Unidades de {name}",
    removed: "Has quitado {name} de la solicitud.",
    cleared: "Has vaciado la solicitud.",
    undo: "Deshacer",
    emptyTitle: "No hay ningún artículo en la solicitud",
    emptyLead:
      "Elige especies del catálogo y aparecerán aquí con su formato, su altura y su pedido mínimo, listas para presupuestar.",
    emptyCta: "Ver el catálogo",
    addQuestion: "¿No has encontrado lo que buscas?",
    addButton: "Añádelo aquí",
    keptLocal: "Tu selección se guarda en este navegador hasta que la envíes.",
    travelWithForm: "viajan con este formulario",
    drawerCta: "Formulario de solicitud",
    pricedIn: "Presupuesto en 24-48 h",
  },
  ca: {
    inRequest: "En aquesta sol·licitud",
    speciesOne: "{n} espècie",
    speciesMany: "{n} espècies",
    unitsOne: "{n} unitat",
    unitsMany: "{n} unitats",
    searchPlaceholder: "Cerca a la teva llista…",
    clear: "Buidar la sol·licitud",
    noMatches: "Cap article de la teva llista coincideix amb aquesta cerca.",
    minimum: "La comanda mínima és de {n} unitats",
    minimumShort: "mín. {n} unitats",
    setToMin: "Posa-hi {n}",
    fewer: "Menys unitats",
    more: "Més unitats",
    quantityOf: "Unitats de {name}",
    removed: "Has tret {name} de la sol·licitud.",
    cleared: "Has buidat la sol·licitud.",
    undo: "Desfés",
    emptyTitle: "No hi ha cap article a la sol·licitud",
    emptyLead:
      "Tria espècies del catàleg i apareixeran aquí amb el format, l'alçada i la comanda mínima, a punt per pressupostar.",
    emptyCta: "Veure el catàleg",
    addQuestion: "No has trobat el que busques?",
    addButton: "Afegeix-lo aquí",
    keptLocal:
      "La teva selecció es guarda en aquest navegador fins que l'enviïs.",
    travelWithForm: "viatgen amb aquest formulari",
    drawerCta: "Formulari de sol·licitud",
    pricedIn: "Pressupost en 24-48 h",
  },
  en: {
    inRequest: "In this request",
    speciesOne: "{n} species",
    speciesMany: "{n} species",
    unitsOne: "{n} unit",
    unitsMany: "{n} units",
    searchPlaceholder: "Search this list…",
    clear: "Clear the request",
    noMatches: "Nothing in your list matches that search.",
    minimum: "Minimum order is {n} units",
    minimumShort: "min. {n} units",
    setToMin: "Set to {n}",
    fewer: "Fewer units",
    more: "More units",
    quantityOf: "Units of {name}",
    removed: "Removed {name} from the request.",
    cleared: "Request emptied.",
    undo: "Undo",
    emptyTitle: "There are no items in the request",
    emptyLead:
      "Pick species from the catalogue and they land here with their pot size, height and minimum order — ready to price.",
    emptyCta: "Browse the catalogue",
    addQuestion: "Didn't find what you're looking for?",
    addButton: "Add it here",
    keptLocal: "Your selection is kept in this browser until you send it.",
    travelWithForm: "travel with this form",
    drawerCta: "Request form",
    pricedIn: "Priced in 24-48 h",
  },
  fr: {
    inRequest: "Dans cette demande",
    speciesOne: "{n} espèce",
    speciesMany: "{n} espèces",
    unitsOne: "{n} unité",
    unitsMany: "{n} unités",
    searchPlaceholder: "Rechercher dans votre liste…",
    clear: "Vider la demande",
    noMatches: "Aucun article de votre liste ne correspond à cette recherche.",
    minimum: "La commande minimum est de {n} unités",
    minimumShort: "min. {n} unités",
    setToMin: "Mettre {n}",
    fewer: "Moins d'unités",
    more: "Plus d'unités",
    quantityOf: "Unités de {name}",
    removed: "{name} retiré de la demande.",
    cleared: "Demande vidée.",
    undo: "Annuler",
    emptyTitle: "Il n'y a aucun article dans la demande",
    emptyLead:
      "Choisissez des espèces dans le catalogue : elles arrivent ici avec leur format, leur hauteur et la commande minimum, prêtes à être chiffrées.",
    emptyCta: "Voir le catalogue",
    addQuestion: "Vous n'avez pas trouvé ce que vous cherchez ?",
    addButton: "Ajoutez-le ici",
    keptLocal:
      "Votre sélection est conservée dans ce navigateur jusqu'à l'envoi.",
    travelWithForm: "accompagnent ce formulaire",
    drawerCta: "Formulaire de demande",
    pricedIn: "Devis en 24-48 h",
  },
};

export function getQuoteCopy(locale: string): QuoteCopy {
  return copy[locale] ?? copy.es;
}

/** Fills `{n}` / `{name}` in one of the strings above. */
export function fill(
  template: string,
  values: { n?: string | number; name?: string }
) {
  return template
    .replace("{n}", String(values.n ?? ""))
    .replace("{name}", values.name ?? "");
}

/** Singular/plural against the count, then fill. */
export function plural(
  one: string,
  many: string,
  count: number,
  formatted: string
) {
  return fill(count === 1 ? one : many, { n: formatted });
}
