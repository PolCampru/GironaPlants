"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ca",
    supportedLngs: ["ca", "en", "es", "fr"],
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
      "products",
    ],
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
  });

export default i18n;
