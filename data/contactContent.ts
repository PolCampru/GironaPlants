// The contact page's side panel, per locale. Server data for the same reason
// as data/formContent.ts: it has to be in the server-rendered HTML.

import type { ContactAsideType } from "@/types/Contact";

const content: Record<string, ContactAsideType> = {
  es: {
    phone: {
      title: "Teléfono",
      text: "+34 639 811 560",
    },
    email: {
      title: "Correo",
      text: "gironaplants@gironaplants.com",
    },
    title: "Prefiero hablarlo",
    hours: {
      title: "Horario",
      text: "Lun-Vie · 8:00-18:00",
    },
    location: {
      title: "Vivero",
      text: "Girona, Catalunya",
    },
    languagesTitle: "Te atendemos en",
    languages: [
      "Castellano",
      "Català",
      "English",
      "Français",
    ],
    catalogue: {
      title: "¿Ya tienes tu lista?",
      text: "Márcala directamente en el catálogo y nos llega con formatos y alturas ya rellenados.",
      button: "Ir al catálogo",
    },
  },
  ca: {
    phone: {
      title: "Telèfon",
      text: "+34 639 811 560",
    },
    email: {
      title: "Correu",
      text: "gironaplants@gironaplants.com",
    },
    title: "Prefereixo parlar-ho",
    hours: {
      title: "Horari",
      text: "Dl-Dv · 8:00-18:00",
    },
    location: {
      title: "Viver",
      text: "Girona, Catalunya",
    },
    languagesTitle: "T'atenem en",
    languages: [
      "Català",
      "Castellano",
      "English",
      "Français",
    ],
    catalogue: {
      title: "Ja tens la teva llista?",
      text: "Marca-la directament al catàleg i ens arriba amb formats i alçades ja emplenats.",
      button: "Anar al catàleg",
    },
  },
  en: {
    phone: {
      title: "Phone",
      text: "+34 639 811 560",
    },
    email: {
      title: "Email",
      text: "gironaplants@gironaplants.com",
    },
    title: "I'd rather talk",
    hours: {
      title: "Hours",
      text: "Mon-Fri · 8:00-18:00",
    },
    location: {
      title: "Nursery",
      text: "Girona, Catalonia",
    },
    languagesTitle: "We answer in",
    languages: [
      "English",
      "Español",
      "Català",
      "Français",
    ],
    catalogue: {
      title: "Already have your list?",
      text: "Tick it straight from the catalogue and it reaches us with formats and heights already filled in.",
      button: "Go to the catalogue",
    },
  },
  fr: {
    phone: {
      title: "Téléphone",
      text: "+34 639 811 560",
    },
    email: {
      title: "E-mail",
      text: "gironaplants@gironaplants.com",
    },
    title: "Je préfère en parler",
    hours: {
      title: "Horaires",
      text: "Lun-Ven · 8h00-18h00",
    },
    location: {
      title: "Pépinière",
      text: "Gérone, Catalogne",
    },
    languagesTitle: "Nous répondons en",
    languages: [
      "Français",
      "Español",
      "Català",
      "English",
    ],
    catalogue: {
      title: "Vous avez déjà votre liste ?",
      text: "Cochez-la directement dans le catalogue : elle nous parvient avec formats et hauteurs déjà remplis.",
      button: "Aller au catalogue",
    },
  },
};

export function getContactAside(locale: string): ContactAsideType {
  return content[locale] ?? content.es;
}
