"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import {
  PrivacyContainer,
  PrivacySection,
  SectionTitle,
  SectionContent,
} from "./PrivacyContent.style";
import Head from "next/head";
import Loader from "@/components/ui/Loader/Loader";

interface PrivacyContentProps {
  lng: string;
}

const PrivacyContent = ({ lng }: PrivacyContentProps) => {
  const { t } = useTranslation("privacy");

  if (!t("politicaPrivacidad.titulo")) return <Loader />;

  return (
    <>
      <Head>
        <title>{t("title")} | GironaPlants</title>
        <meta name="description" content={t("description")} />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`https://gironaplants.com/${lng}/privacy`}
        />
        {["es", "en", "fr", "ca"].map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`https://gironaplants.com/${lang}/privacy`}
          />
        ))}
      </Head>
      <PrivacyContainer>
        <PrivacySection>
          <SectionTitle>{t("politicaPrivacidad.titulo")}</SectionTitle>
          <SectionContent>{t("politicaPrivacidad.contenido")}</SectionContent>
        </PrivacySection>

        <PrivacySection>
          <SectionTitle>
            {t("politicaPrivacidadRedesSociales.titulo")}
          </SectionTitle>
          <SectionContent>
            {t("politicaPrivacidadRedesSociales.contenido")}
          </SectionContent>
        </PrivacySection>

        <PrivacySection>
          <SectionTitle>
            {t("informacionPreviaPoliticaCookies.titulo")}
          </SectionTitle>
          <SectionContent>
            {t("informacionPreviaPoliticaCookies.contenido")}
          </SectionContent>
        </PrivacySection>

        <PrivacySection>
          <SectionTitle>{t("politicaCookies.titulo")}</SectionTitle>
          <SectionContent>{t("politicaCookies.contenido")}</SectionContent>
        </PrivacySection>

        <PrivacySection>
          <SectionTitle>{t("avisoLegal.titulo")}</SectionTitle>
          <SectionContent>{t("avisoLegal.contenido")}</SectionContent>
        </PrivacySection>
      </PrivacyContainer>
    </>
  );
};

export default PrivacyContent;
