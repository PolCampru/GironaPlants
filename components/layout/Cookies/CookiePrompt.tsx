"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";

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
    <div className="cookie-prompt">
      <div className="cookie-content">
        <p>{texts.message}</p>
        <div className="cookie-buttons">
          <button onClick={handleAccept} className="accept-button">
            {texts.accept}
          </button>
          <button onClick={handleReject} className="reject-button">
            {texts.reject}
          </button>
          <Link href={moreInfoPath}>
            <button className="more-info-button">{texts.moreInfo}</button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .cookie-prompt {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: #333;
          color: white;
          padding: 1rem;
          z-index: 1000;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        }

        .cookie-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .cookie-content {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        p {
          margin: 0;
        }

        .cookie-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .accept-button {
          background-color: #4caf50;
          color: white;
        }

        .reject-button {
          background-color: #f44336;
          color: white;
        }

        .more-info-button {
          background-color: transparent;
          border: 1px solid white;
          color: white;
        }
      `}</style>
    </div>
  );
}
