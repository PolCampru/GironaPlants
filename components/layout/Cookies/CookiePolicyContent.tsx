"use client";

import React from "react";
import { useEffect, useState } from "react";

interface CookieContentType {
  title: string;
  intro: string;
  whatAreCookies: {
    title: string;
    content: string;
  };
  howWeUse: {
    title: string;
    content: string;
  };
  typesOfCookies: {
    title: string;
    essentialTitle: string;
    essentialContent: string;
    preferenceTitle: string;
    preferenceContent: string;
    statisticsTitle: string;
    statisticsContent: string;
    marketingTitle: string;
    marketingContent: string;
  };
  controlCookies: {
    title: string;
    content: string;
  };
  moreInfo: {
    title: string;
    content: string;
  };
}

interface CookiePolicyContentType {
  es: CookieContentType;
  ca: CookieContentType;
  en: CookieContentType;
  fr: CookieContentType;
  [key: string]: CookieContentType;
}

const cookiePolicyContent: CookiePolicyContentType = {
  es: {
    title: "Política de Cookies",
    intro:
      "Esta política de cookies explica qué son las cookies y cómo las utilizamos en nuestra web.",
    whatAreCookies: {
      title: "¿Qué son las cookies?",
      content:
        "Las cookies son pequeños archivos de texto que los sitios web colocan en su dispositivo cuando los visita. Sirven para que el sitio funcione, o funcione de manera más eficiente, así como para proporcionar información a los propietarios del sitio.",
    },
    howWeUse: {
      title: "Cómo utilizamos las cookies",
      content:
        "Utilizamos cookies por varias razones que se detallan a continuación. Desafortunadamente, en la mayoría de los casos, no existen opciones estándar para desactivar las cookies sin desactivar por completo la funcionalidad y características que añaden a este sitio.",
    },
    typesOfCookies: {
      title: "Tipos de cookies que utilizamos",
      essentialTitle: "Cookies esenciales",
      essentialContent:
        "Las cookies esenciales son necesarias para el funcionamiento básico del sitio web y no se pueden desactivar en nuestros sistemas.",
      preferenceTitle: "Cookies de preferencias",
      preferenceContent:
        "Estas cookies permiten al sitio web recordar elecciones que usted realiza para proporcionarle funcionalidades mejoradas y más personales.",
      statisticsTitle: "Cookies estadísticas",
      statisticsContent:
        "Estas cookies nos ayudan a entender cómo los visitantes interactúan con el sitio web, recopilando y reportando información de forma anónima.",
      marketingTitle: "Cookies de marketing",
      marketingContent:
        "Estas cookies se utilizan para rastrear a los visitantes en los sitios web. La intención es mostrar anuncios que sean relevantes y atractivos para el usuario individual.",
    },
    controlCookies: {
      title: "Cómo controlar las cookies",
      content:
        "Puede controlar y/o eliminar las cookies como desee. Puede eliminar todas las cookies que ya están en su dispositivo y puede configurar la mayoría de los navegadores para evitar que se coloquen. Si lo hace, es posible que tenga que ajustar manualmente algunas preferencias cada vez que visite un sitio y que algunos servicios y funcionalidades no funcionen.",
    },
    moreInfo: {
      title: "Más información",
      content:
        "Para obtener información más detallada sobre las cookies y cómo gestionarlas, visite aboutcookies.org o allaboutcookies.org.",
    },
  },
  ca: {
    title: "Política de Cookies",
    intro:
      "Aquesta política de cookies explica què són les cookies i com les utilitzem al nostre lloc web.",
    whatAreCookies: {
      title: "Què són les cookies?",
      content:
        "Les cookies són petits arxius de text que els llocs web col·loquen al seu dispositiu quan els visita. Serveixen perquè el lloc funcioni, o funcioni de manera més eficient, així com per proporcionar informació als propietaris del lloc.",
    },
    howWeUse: {
      title: "Com utilitzem les cookies",
      content:
        "Utilitzem cookies per diverses raons que es detallen a continuació. Malauradament, en la majoria dels casos, no existeixen opcions estàndard per desactivar les cookies sense desactivar per complet la funcionalitat i característiques que afegeixen a aquest lloc.",
    },
    typesOfCookies: {
      title: "Tipus de cookies que utilitzem",
      essentialTitle: "Cookies essencials",
      essentialContent:
        "Les cookies essencials són necessàries per al funcionament bàsic del lloc web i no es poden desactivar en els nostres sistemes.",
      preferenceTitle: "Cookies de preferències",
      preferenceContent:
        "Aquestes cookies permeten al lloc web recordar eleccions que vostè realitza per proporcionar-li funcionalitats millorades i més personalitzades.",
      statisticsTitle: "Cookies estadístiques",
      statisticsContent:
        "Aquestes cookies ens ajuden a entendre com els visitants interactuen amb el lloc web, recopilant i reportant informació de forma anònima.",
      marketingTitle: "Cookies de màrqueting",
      marketingContent:
        "Aquestes cookies s'utilitzen per rastrejar els visitants als llocs web. La intenció és mostrar anuncis que siguin rellevants i atractius per a l'usuari individual.",
    },
    controlCookies: {
      title: "Com controlar les cookies",
      content:
        "Pot controlar i/o eliminar les cookies com desitgi. Pot eliminar totes les cookies que ja estan al seu dispositiu i pot configurar la majoria dels navegadors per evitar que es col·loquin. Si ho fa, és possible que hagi d'ajustar manualment algunes preferències cada vegada que visiti un lloc i que alguns serveis i funcionalitats no funcionin.",
    },
    moreInfo: {
      title: "Més informació",
      content:
        "Per obtenir informació més detallada sobre les cookies i com gestionar-les, visiti aboutcookies.org o allaboutcookies.org.",
    },
  },
  en: {
    title: "Cookie Policy",
    intro:
      "This cookie policy explains what cookies are and how we use them on our website.",
    whatAreCookies: {
      title: "What are cookies?",
      content:
        "Cookies are small text files that websites place on your device when you visit them. They are used to make the site work, or work more efficiently, as well as to provide information to the site owners.",
    },
    howWeUse: {
      title: "How we use cookies",
      content:
        "We use cookies for several reasons detailed below. Unfortunately, in most cases there are no standard options for disabling cookies without completely disabling the functionality and features they add to this site.",
    },
    typesOfCookies: {
      title: "Types of cookies we use",
      essentialTitle: "Essential cookies",
      essentialContent:
        "Essential cookies are necessary for the basic functioning of the website and cannot be disabled in our systems.",
      preferenceTitle: "Preference cookies",
      preferenceContent:
        "These cookies allow the website to remember choices you make to provide enhanced, more personal features to you.",
      statisticsTitle: "Statistics cookies",
      statisticsContent:
        "These cookies help us understand how visitors interact with the website by collecting and reporting information anonymously.",
      marketingTitle: "Marketing cookies",
      marketingContent:
        "These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.",
    },
    controlCookies: {
      title: "How to control cookies",
      content:
        "You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.",
    },
    moreInfo: {
      title: "More information",
      content:
        "For more detailed information about cookies and how to manage them, visit aboutcookies.org or allaboutcookies.org.",
    },
  },
  fr: {
    title: "Politique de Cookies",
    intro:
      "Cette politique de cookies explique ce que sont les cookies et comment nous les utilisons sur notre site web.",
    whatAreCookies: {
      title: "Que sont les cookies?",
      content:
        "Les cookies sont de petits fichiers texte que les sites web placent sur votre appareil lorsque vous les visitez. Ils servent à faire fonctionner le site, ou à le faire fonctionner plus efficacement, ainsi qu'à fournir des informations aux propriétaires du site.",
    },
    howWeUse: {
      title: "Comment nous utilisons les cookies",
      content:
        "Nous utilisons des cookies pour plusieurs raisons détaillées ci-dessous. Malheureusement, dans la plupart des cas, il n'existe pas d'options standard pour désactiver les cookies sans désactiver complètement les fonctionnalités et caractéristiques qu'ils ajoutent à ce site.",
    },
    typesOfCookies: {
      title: "Types de cookies que nous utilisons",
      essentialTitle: "Cookies essentiels",
      essentialContent:
        "Les cookies essentiels sont nécessaires au fonctionnement de base du site web et ne peuvent pas être désactivés dans nos systèmes.",
      preferenceTitle: "Cookies de préférence",
      preferenceContent:
        "Ces cookies permettent au site web de se souvenir des choix que vous faites pour vous offrir des fonctionnalités améliorées et plus personnelles.",
      statisticsTitle: "Cookies statistiques",
      statisticsContent:
        "Ces cookies nous aident à comprendre comment les visiteurs interagissent avec le site web en collectant et en rapportant des informations de manière anonyme.",
      marketingTitle: "Cookies de marketing",
      marketingContent:
        "Ces cookies sont utilisés pour suivre les visiteurs sur les sites web. L'intention est d'afficher des publicités qui sont pertinentes et attrayantes pour l'utilisateur individuel.",
    },
    controlCookies: {
      title: "Comment contrôler les cookies",
      content:
        "Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies qui sont déjà sur votre appareil et vous pouvez configurer la plupart des navigateurs pour empêcher leur placement. Si vous le faites, vous devrez peut-être ajuster manuellement certaines préférences chaque fois que vous visitez un site et certains services et fonctionnalités peuvent ne pas fonctionner.",
    },
    moreInfo: {
      title: "Plus d'informations",
      content:
        "Pour des informations plus détaillées sur les cookies et comment les gérer, visitez aboutcookies.org ou allaboutcookies.org.",
    },
  },
};

interface CookiePolicyContentProps {
  lng: string;
}

export default function CookiePolicyContent({ lng }: CookiePolicyContentProps) {
  const [content, setContent] = useState<CookieContentType>(
    cookiePolicyContent.en
  );

  useEffect(() => {
    if (cookiePolicyContent[lng]) {
      setContent(cookiePolicyContent[lng]);
    } else {
      setContent(cookiePolicyContent.en);
    }
  }, [lng]);

  return (
    <div className="cookie-policy-container">
      <div className="cookie-policy-content">
        <h1>{content.title}</h1>
        <p className="intro">{content.intro}</p>

        <section>
          <h2>{content.whatAreCookies.title}</h2>
          <p>{content.whatAreCookies.content}</p>
        </section>

        <section>
          <h2>{content.howWeUse.title}</h2>
          <p>{content.howWeUse.content}</p>
        </section>

        <section>
          <h2>{content.typesOfCookies.title}</h2>

          <div className="cookie-type">
            <h3>{content.typesOfCookies.essentialTitle}</h3>
            <p>{content.typesOfCookies.essentialContent}</p>
          </div>

          <div className="cookie-type">
            <h3>{content.typesOfCookies.preferenceTitle}</h3>
            <p>{content.typesOfCookies.preferenceContent}</p>
          </div>

          <div className="cookie-type">
            <h3>{content.typesOfCookies.statisticsTitle}</h3>
            <p>{content.typesOfCookies.statisticsContent}</p>
          </div>

          <div className="cookie-type">
            <h3>{content.typesOfCookies.marketingTitle}</h3>
            <p>{content.typesOfCookies.marketingContent}</p>
          </div>
        </section>

        <section>
          <h2>{content.controlCookies.title}</h2>
          <p>{content.controlCookies.content}</p>
        </section>

        <section>
          <h2>{content.moreInfo.title}</h2>
          <p>{content.moreInfo.content}</p>
        </section>
      </div>

      <style jsx>{`
        .cookie-policy-container {
          padding-top: 10rem;
          padding: 3rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .cookie-policy-content {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          color: #333;
          margin-top: 6rem;
        }

        h1 {
          font-size: 2.2rem;
          margin-bottom: 1.5rem;
          color: #333;
          font-weight: 600;
          border-bottom: 1px solid #eee;
          padding-bottom: 0.5rem;
        }

        .intro {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          color: #555;
          line-height: 1.6;
        }

        section {
          margin-bottom: 2rem;
        }

        h2 {
          font-size: 1.6rem;
          color: #333;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .cookie-type {
          margin-bottom: 1.2rem;
          padding-left: 1rem;
          border-left: 3px solid #4caf50;
        }

        h3 {
          font-size: 1.2rem;
          color: #444;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        p {
          line-height: 1.6;
          color: #555;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .cookie-policy-content {
            padding: 1.5rem;
          }

          h1 {
            font-size: 1.8rem;
          }

          h2 {
            font-size: 1.4rem;
          }

          h3 {
            font-size: 1.1rem;
          }

          .cookie-policy-container {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
