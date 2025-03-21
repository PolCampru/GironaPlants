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
  ns: [
    "aboutUs",
    "addProducts",
    "budget",
    "common",
    "contact",
    "footer",
    "form",
    "home",
    "navbar",
    "offers",
    "products",
  ],
  detection: {
    order: ["path", "navigator", "htmlTag"],
    lookupFromPathIndex: 0,
    caches: ["cookie"],
  },
  defaultNS: "common",
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
