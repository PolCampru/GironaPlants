"use client";

import { useEffect } from "react";
import i18n from "@/lib/i18n";

interface LanguageInitializerProps {
  lng: string;
}

export default function LanguageInitializer({ lng }: LanguageInitializerProps) {
  useEffect(() => {
    const changeLanguage = async () => {
      if (i18n.language !== lng) {
        await i18n.changeLanguage(lng);
      }
    };
    changeLanguage();
  }, [lng]);

  return null;
}
