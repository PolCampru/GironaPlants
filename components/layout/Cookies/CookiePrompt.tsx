"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import {
  AcceptButton,
  MoreInfoLink,
  PromptActions,
  PromptBar,
  PromptInner,
  RejectButton,
} from "./CookiePrompt.style";

interface TranslationTexts {
  message: string;
  accept: string;
  reject: string;
  moreInfo: string;
}

interface Translations {
  [key: string]: TranslationTexts;
}

const translations: Translations = {
  es: {
    message:
      "Este sitio utiliza cookies para mejorar tu experiencia de usuario.",
    accept: "Aceptar",
    reject: "Rechazar",
    moreInfo: "Más información",
  },
  ca: {
    message:
      "Aquest lloc web utilitza cookies per millorar la teva experiència.",
    accept: "Acceptar",
    reject: "Rebutjar",
    moreInfo: "Més informació",
  },
  en: {
    message: "This website uses cookies to improve your experience.",
    accept: "Accept",
    reject: "Reject",
    moreInfo: "More information",
  },
  fr: {
    message: "Ce site utilise des cookies pour améliorer votre expérience.",
    accept: "Accepter",
    reject: "Refuser",
    moreInfo: "Plus d'informations",
  },
};

export default function CookiePrompt(): React.ReactNode {
  const [visible, setVisible] = useState<boolean>(false);
  const [texts, setTexts] = useState<TranslationTexts>(translations.en);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("cookieConsent");
      if (!consent) {
        setVisible(true);
      }
    }

    const pathSegments = pathname?.split("/").filter(Boolean);
    const locale = pathSegments?.[0];

    if (locale && translations[locale]) {
      setTexts(translations[locale]);
    } else {
      setTexts(translations.en);
    }
  }, [pathname]);

  const handleAccept = (): void => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const handleReject = (): void => {
    localStorage.setItem("cookieConsent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  const pathSegments = pathname?.split("/").filter(Boolean);
  const locale = pathSegments?.[0];
  const moreInfoPath =
    locale && translations[locale]
      ? `/${locale}/cookie-policy`
      : "/en/cookie-policy";

  return (
    <PromptBar role="region" aria-label="Cookies">
      <PromptInner>
        <p>{texts.message}</p>
        <PromptActions>
          <AcceptButton type="button" onClick={handleAccept}>
            {texts.accept}
          </AcceptButton>
          <RejectButton type="button" onClick={handleReject}>
            {texts.reject}
          </RejectButton>
          <MoreInfoLink href={moreInfoPath}>{texts.moreInfo}</MoreInfoLink>
        </PromptActions>
      </PromptInner>
    </PromptBar>
  );
}
