// The quote form's field configuration and messages, per locale.
//
// This used to be fetched at runtime by react-i18next, which meant the server
// rendered a form with zero fields and the browser then rendered eight —
// a hydration mismatch that threw away and rebuilt the page on every load of
// /contact and /budget. The config is server data now; only the toast
// messages are ever read in the browser.

import type { FormType } from "@/types/Contact";

const content: Record<string, FormType> = {
  es: {
    submit: "Enviar",
    remove: "Eliminar",
    messages: {
      inProgress: {
        title: "Enviando la solicitud...",
        text: "Por favor, espera unos segundos.",
      },
      success: {
        title: "Solicitud enviada",
        text: "Gracias por confiar en nosotros. Hemos recibido tu solicitud y nos pondremos en contacto contigo lo antes posible.",
      },
      error: {
        title: "Error en el envío",
        text: "Ha ocurrido un error en el envío de la solicitud. Por favor, inténtalo de nuevo.",
      },
    },
    inputs: [
      {
        type: "toggle",
        name: "type",
        options: [
          {
            label: "Empresa",
            value: "company",
          },
          {
            label: "Particular",
            value: "particular",
          },
        ],
        label: "Solicitud de presupuesto",
      },
      {
        type: "text",
        label: "Empresa",
        name: "company",
        required: true,
        requiredError: "La empresa es un campo obligatorio",
      },
      {
        type: "text",
        label: "Nombre y apellidos",
        name: "name",
        required: true,
        requiredError: "El nombre y apellidos son un campo obligatorio",
        formatError: "El nombre y apellidos deben contener al menos 3 caracteres",
      },
      {
        type: "text",
        label: "Correo electrónico",
        name: "email",
        required: true,
        requiredError: "El correo electrónico es un campo obligatorio",
        formatError: "El formato del correo electrónico no es válido",
      },
      {
        type: "text",
        label: "Teléfono",
        name: "phone",
        required: true,
        requiredError: "El teléfono es un campo obligatorio",
        formatError: "El formato del teléfono no es válido",
      },
      {
        type: "textarea",
        label: "Comentario",
        name: "comment",
        placeholder: "Ej.: 300 Quercus ilex AF 300 de 40/60, 150 Lavandula angustifolia C2, entrega en octubre…",
      },
      {
        type: "file",
        label: "Adjunta tu listado",
        name: "files",
        hint: "Excel, PDF o imagen. Es la vía más rápida para un presupuesto exacto.",
      },
      {
        type: "checkbox",
        label: "Acepto la Política de Privacidad",
        name: "privacyPolicy",
        required: true,
      },
    ],
    responseNote: "Respuesta en 24-48 h laborables",
  },
  ca: {
    submit: "Enviar",
    remove: "Eliminar",
    messages: {
      inProgress: {
        title: "Enviant la sol·licitud...",
        text: "Si us plau, espera uns segons.",
      },
      success: {
        title: "Sol·licitud enviada",
        text: "Gràcies per confiar en nosaltres. Hem rebut la teva sol·licitud i ens posarem en contacte amb tu el més aviat possible.",
      },
      error: {
        title: "Error en l'enviament",
        text: "Hi ha hagut un error en l'enviament de la sol·licitud. Si us plau, torna a intentar",
      },
    },
    inputs: [
      {
        type: "toggle",
        name: "type",
        options: [
          {
            label: "Empresa",
            value: "company",
          },
          {
            label: "Particular",
            value: "particular",
          },
        ],
        label: "Sol·licitud de pressupost",
      },
      {
        type: "text",
        label: "Empresa",
        name: "company",
        required: true,
        requiredError: "L'empresa és un camp obligatori",
      },
      {
        type: "text",
        label: "Nom i cognoms",
        name: "name",
        required: true,
        requiredError: "El nom i cognoms són un camp obligatori",
        formatError: "El nom i cognoms han de contenir com a mínim 3 caràcters",
      },
      {
        type: "text",
        label: "Correu electrònic",
        name: "email",
        required: true,
        requiredError: "El correu electrònic és un camp obligatori",
        formatError: "El format del correu electrònic no és vàlid",
      },
      {
        type: "text",
        label: "Telèfon",
        name: "phone",
        required: true,
        requiredError: "El telèfon és un camp obligatori",
        formatError: "El format del telèfon no és vàlid",
      },
      {
        type: "textarea",
        label: "Comentari",
        name: "comment",
        placeholder: "Ex.: 300 Quercus ilex AF 300 de 40/60, 150 Lavandula angustifolia C2, entrega a l'octubre…",
      },
      {
        type: "file",
        label: "Adjunta el teu llistat",
        name: "files",
        hint: "Excel, PDF o imatge. És la via més ràpida per a un pressupost exacte.",
      },
      {
        type: "checkbox",
        label: "Accepto la Política de Privacitat",
        name: "privacyPolicy",
        required: true,
      },
    ],
    responseNote: "Resposta en 24-48 h laborables",
  },
  en: {
    submit: "Submit",
    remove: "Remove",
    messages: {
      inProgress: {
        title: "Sending request...",
        text: "Please wait a few seconds.",
      },
      success: {
        title: "Request sent",
        text: "Thank you for trusting us. We have received your request and will contact you as soon as possible.",
      },
      error: {
        title: "Error sending request",
        text: "There was an error sending the request. Please try again.",
      },
    },
    inputs: [
      {
        type: "toggle",
        name: "type",
        options: [
          {
            label: "Company",
            value: "company",
          },
          {
            label: "Individual",
            value: "particular",
          },
        ],
        label: "Quote request",
      },
      {
        type: "text",
        label: "Company",
        name: "company",
        required: true,
        requiredError: "Company is a required field",
      },
      {
        type: "text",
        label: "Name and Surname",
        name: "name",
        required: true,
        requiredError: "Name and surname are required",
        formatError: "Name and surname must contain at least 3 characters",
      },
      {
        type: "text",
        label: "Email",
        name: "email",
        required: true,
        requiredError: "Email is a required field",
        formatError: "The email format is not valid",
      },
      {
        type: "text",
        label: "Phone",
        name: "phone",
        required: true,
        requiredError: "Phone is a required field",
        formatError: "The phone format is not valid",
      },
      {
        type: "textarea",
        label: "Comment",
        name: "comment",
        placeholder: "e.g. 300 Quercus ilex AF 300 at 40/60, 150 Lavandula angustifolia C2, delivery in October…",
      },
      {
        type: "file",
        label: "Attach your list",
        name: "files",
        hint: "Excel, PDF or image. It's the fastest route to an exact quote.",
      },
      {
        type: "checkbox",
        label: "I accept the Privacy Policy",
        name: "privacyPolicy",
        required: true,
      },
    ],
    responseNote: "Reply within 24-48 working hours",
  },
  fr: {
    submit: "Envoyer",
    remove: "Supprimer",
    messages: {
      inProgress: {
        title: "Envoi de la demande...",
        text: "Veuillez patienter quelques secondes.",
      },
      success: {
        title: "Demande envoyée",
        text: "Merci de votre confiance. Nous avons bien reçu votre demande et nous vous contacterons dès que possible.",
      },
      error: {
        title: "Erreur lors de l'envoi",
        text: "Une erreur s'est produite lors de l'envoi de la demande. Veuillez réessayer.",
      },
    },
    inputs: [
      {
        type: "toggle",
        name: "type",
        options: [
          {
            label: "Entreprise",
            value: "company",
          },
          {
            label: "Particulier",
            value: "particular",
          },
        ],
        label: "Demande de devis",
      },
      {
        type: "text",
        label: "Entreprise",
        name: "company",
        required: true,
        requiredError: "L'entreprise est un champ obligatoire",
      },
      {
        type: "text",
        label: "Nom et prénom",
        name: "name",
        required: true,
        requiredError: "Le nom et le prénom sont obligatoires",
        formatError: "Le nom et le prénom doit contenir au moins 3 caractères",
      },
      {
        type: "text",
        label: "Adresse e-mail",
        name: "email",
        required: true,
        requiredError: "L'adresse e-mail est un champ obligatoire",
        formatError: "Le format de l'adresse e-mail n'est pas valide",
      },
      {
        type: "text",
        label: "Téléphone",
        name: "phone",
        required: true,
        requiredError: "Le téléphone est un champ obligatoire",
        formatError: "Le format du téléphone n'est pas valide",
      },
      {
        type: "textarea",
        label: "Commentaire",
        name: "comment",
        placeholder: "Ex. : 300 Quercus ilex AF 300 en 40/60, 150 Lavandula angustifolia C2, livraison en octobre…",
      },
      {
        type: "file",
        label: "Joignez votre liste",
        name: "files",
        hint: "Excel, PDF ou image. C'est la voie la plus rapide vers un devis exact.",
      },
      {
        type: "checkbox",
        label: "J'accepte la Politique de confidentialité",
        name: "privacyPolicy",
        required: true,
      },
    ],
    responseNote: "Réponse sous 24-48 h ouvrées",
  },
};

export function getFormContent(locale: string): FormType {
  return content[locale] ?? content.es;
}
