// Per-locale copy for the Google reviews section on the home page. Lives here,
// not in public/locales, so it is in the server HTML (see lib/i18n.ts).

export type ReviewsContent = {
  label: string;
  title: string;
  /** "{count}" is replaced with the formatted number of reviews. */
  based_on: string;
  write_button: string;
  all_button: string;
  read_more: string;
  translated: string;
  previous: string;
  next: string;
  empty_title: string;
  empty_text: string;
  stars_label: string;
};

const content: Record<string, ReviewsContent> = {
  es: {
    label: "Opiniones",
    title: "Lo que dicen quienes ya trabajan con nosotros",
    based_on: "{count} reseñas en Google",
    write_button: "Escribir una reseña",
    all_button: "Ver todas en Google",
    read_more: "Leer en Google",
    translated: "Traducida por Google",
    previous: "Reseñas anteriores",
    next: "Reseñas siguientes",
    empty_title: "¿Ya has trabajado con nosotros?",
    empty_text:
      "Tu opinión ayuda a otros paisajistas, constructoras y viveros a encontrarnos. Déjala en Google: es cuestión de un minuto.",
    stars_label: "{rating} de 5 estrellas",
  },
  ca: {
    label: "Opinions",
    title: "El que diuen els qui ja treballen amb nosaltres",
    based_on: "{count} ressenyes a Google",
    write_button: "Escriure una ressenya",
    all_button: "Veure-les totes a Google",
    read_more: "Llegir a Google",
    translated: "Traduïda per Google",
    previous: "Ressenyes anteriors",
    next: "Ressenyes següents",
    empty_title: "Ja has treballat amb nosaltres?",
    empty_text:
      "La teva opinió ajuda altres paisatgistes, constructores i vivers a trobar-nos. Deixa-la a Google: és qüestió d'un minut.",
    stars_label: "{rating} de 5 estrelles",
  },
  en: {
    label: "Reviews",
    title: "What the people we already supply say",
    based_on: "{count} reviews on Google",
    write_button: "Write a review",
    all_button: "See all on Google",
    read_more: "Read on Google",
    translated: "Translated by Google",
    previous: "Previous reviews",
    next: "Next reviews",
    empty_title: "Already worked with us?",
    empty_text:
      "Your review helps other landscapers, contractors and nurseries find us. Leave it on Google — it takes a minute.",
    stars_label: "{rating} out of 5 stars",
  },
  fr: {
    label: "Avis",
    title: "Ce qu'en disent ceux qui travaillent déjà avec nous",
    based_on: "{count} avis sur Google",
    write_button: "Laisser un avis",
    all_button: "Tous les avis sur Google",
    read_more: "Lire sur Google",
    translated: "Traduit par Google",
    previous: "Avis précédents",
    next: "Avis suivants",
    empty_title: "Vous avez déjà travaillé avec nous ?",
    empty_text:
      "Votre avis aide d'autres paysagistes, entreprises et pépinières à nous trouver. Laissez-le sur Google : une minute suffit.",
    stars_label: "{rating} sur 5 étoiles",
  },
  it: {
    label: "Recensioni",
    title: "Cosa dice chi lavora già con noi",
    based_on: "{count} recensioni su Google",
    write_button: "Scrivi una recensione",
    all_button: "Vedi tutte su Google",
    read_more: "Leggi su Google",
    translated: "Tradotta da Google",
    previous: "Recensioni precedenti",
    next: "Recensioni successive",
    empty_title: "Hai già lavorato con noi?",
    empty_text:
      "La tua opinione aiuta altri paesaggisti, imprese edili e vivai a trovarci. Lasciala su Google: basta un minuto.",
    stars_label: "{rating} su 5 stelle",
  },
};

export function getReviewsContent(locale: string): ReviewsContent {
  return content[locale] ?? content.es;
}
