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
      title: "Dónde estamos",
      text: "Breda, Girona · Catalunya",
    },
    languagesTitle: "Te atendemos en",
    languages: [
      "Castellano",
      "Català",
      "English",
      "Français",
      "Italiano",
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
      title: "On som",
      text: "Breda, Girona · Catalunya",
    },
    languagesTitle: "T'atenem en",
    languages: [
      "Català",
      "Castellano",
      "English",
      "Français",
      "Italiano",
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
      title: "Where we are",
      text: "Breda, Girona · Catalonia",
    },
    languagesTitle: "We answer in",
    languages: [
      "English",
      "Español",
      "Català",
      "Français",
      "Italiano",
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
      title: "Où nous sommes",
      text: "Breda, Gérone · Catalogne",
    },
    languagesTitle: "Nous répondons en",
    languages: [
      "Français",
      "Español",
      "Català",
      "English",
      "Italiano",
    ],
    catalogue: {
      title: "Vous avez déjà votre liste ?",
      text: "Cochez-la directement dans le catalogue : elle nous parvient avec formats et hauteurs déjà remplis.",
      button: "Aller au catalogue",
    },
  },
  it: {
    phone: {
      title: "Telefono",
      text: "+34 639 811 560",
    },
    email: {
      title: "E-mail",
      text: "gironaplants@gironaplants.com",
    },
    title: "Preferisco parlarne",
    hours: {
      title: "Orari",
      text: "Lun-Ven · 8:00-18:00",
    },
    location: {
      title: "Dove siamo",
      text: "Breda, Girona · Catalogna",
    },
    languagesTitle: "Rispondiamo in",
    languages: [
      "Italiano",
      "English",
      "Español",
      "Català",
      "Français",
    ],
    catalogue: {
      title: "Hai già la tua lista?",
      text: "Selezionala direttamente dal catalogo: ci arriva con formati e altezze già compilati.",
      button: "Vai al catalogo",
    },
  },
};

export function getContactAside(locale: string): ContactAsideType {
  return content[locale] ?? content.es;
}
