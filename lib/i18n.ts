"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "ca",
  supportedLngs: ["en", "es", "ca", "fr"],
});

export default i18n;
