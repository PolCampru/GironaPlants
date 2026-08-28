"use client";

import i18n from "i18next";
import { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getLanguages } from "./languages";

const languages = getLanguages();

const i18nConfig: InitOptions = {
  fallbackLng: "ca",
  supportedLngs: languages,
  // "home" and "aboutUs" are gone: the home page categories now come from
  // the server as props (they used to be read here, which desynced the server
  // and client renders) and the About Us copy comes from Strapi.
  // "privacy" was missing, so it was only ever fetched lazily on that page.
  // Only namespaces still read in the browser. Everything that has to be in
  // the server-rendered HTML moved to data/ modules — see data/navigation.ts.
  ns: ["addProducts", "budget", "offers", "privacy", "products"],
  detection: {
    order: ["path"],
    lookupFromPathIndex: 0,
    caches: [],
  },
  defaultNS: "products",
  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json",
  },
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
  returnEmptyString: false,
};

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init(i18nConfig);

export default i18n;
