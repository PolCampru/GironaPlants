// Site chrome copy: the navbar, the footer and the logo.
//
// This deliberately does NOT go through runtime i18n. The navbar and footer
// render inside the root layout on every page, and react-i18next resolves
// nothing during the server render — so the server emitted an empty nav and
// no logo while the client emitted both. React treated that as a hydration
// mismatch and threw the whole tree away on load, which is what left the
// hero stuck at the start of its entrance animation.
//
// The locale comes from the pathname, which is identical on both sides.

export const LOGO = {
  src: "/images/logo.png",
  alt: "Girona Plants",
};

export type NavItem = { name: string; slug: string };

type NavCopy = {
  items: NavItem[];
  budgetLabel: string;
  languageLabel: string;
  footer: {
    tagline: string;
    location: string;
    columns: { catalogue: string; company: string; contact: string };
    privacyPolicy: string;
    rights: string;
  };
};

const nav: Record<string, NavCopy> = {
  es: {
    items: [
      { name: "Inicio", slug: "" },
      { name: "Productos", slug: "products" },
      { name: "Ofertas", slug: "offers" },
      { name: "Nosotros", slug: "about-us" },
      { name: "Catálogos", slug: "catalogues" },
      { name: "Contacto", slug: "contact" },
    ],
    budgetLabel: "Presupuesto",
    languageLabel: "Idioma",
    footer: {
      tagline:
        "Empresa familiar de Girona. Cultivo propio de planta mediterránea y suministro a profesionales en toda Europa desde 1992.",
      location: "Girona, Catalunya · España",
      columns: { catalogue: "Catálogo", company: "Empresa", contact: "Contacto" },
      privacyPolicy: "Política de privacidad",
      rights: "Todos los derechos reservados",
    },
  },
  ca: {
    items: [
      { name: "Inici", slug: "" },
      { name: "Productes", slug: "products" },
      { name: "Ofertes", slug: "offers" },
      { name: "Nosaltres", slug: "about-us" },
      { name: "Catàlegs", slug: "catalogues" },
      { name: "Contacte", slug: "contact" },
    ],
    budgetLabel: "Pressupost",
    languageLabel: "Idioma",
    footer: {
      tagline:
        "Empresa familiar de Girona. Cultiu propi de planta mediterrània i subministrament a professionals arreu d'Europa des del 1992.",
      location: "Girona, Catalunya · Espanya",
      columns: { catalogue: "Catàleg", company: "Empresa", contact: "Contacte" },
      privacyPolicy: "Política de privacitat",
      rights: "Tots els drets reservats",
    },
  },
  en: {
    items: [
      { name: "Home", slug: "" },
      { name: "Products", slug: "products" },
      { name: "Offers", slug: "offers" },
      { name: "About us", slug: "about-us" },
      { name: "Catalogues", slug: "catalogues" },
      { name: "Contact", slug: "contact" },
    ],
    budgetLabel: "Quote",
    languageLabel: "Language",
    footer: {
      tagline:
        "A family business from Girona. Our own Mediterranean plant production, supplying professionals across Europe since 1992.",
      location: "Girona, Catalonia · Spain",
      columns: { catalogue: "Catalogue", company: "Company", contact: "Contact" },
      privacyPolicy: "Privacy policy",
      rights: "All rights reserved",
    },
  },
  fr: {
    items: [
      { name: "Accueil", slug: "" },
      { name: "Produits", slug: "products" },
      { name: "Offres", slug: "offers" },
      { name: "À propos", slug: "about-us" },
      { name: "Catalogues", slug: "catalogues" },
      { name: "Contact", slug: "contact" },
    ],
    budgetLabel: "Devis",
    languageLabel: "Langue",
    footer: {
      tagline:
        "Entreprise familiale de Gérone. Production propre de plantes méditerranéennes et approvisionnement des professionnels dans toute l'Europe depuis 1992.",
      location: "Gérone, Catalogne · Espagne",
      columns: {
        catalogue: "Catalogue",
        company: "Entreprise",
        contact: "Contact",
      },
      privacyPolicy: "Politique de confidentialité",
      rights: "Tous droits réservés",
    },
  },
};

export const CONTACT_LINKS = {
  phone: "+34 639 811 560",
  email: "gironaplants@gironaplants.com",
};

export function getNavigation(locale: string): NavCopy {
  return nav[locale] ?? nav.es;
}

/** Absolute href for a nav item in a given locale. */
export function navHref(locale: string, slug: string) {
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}
