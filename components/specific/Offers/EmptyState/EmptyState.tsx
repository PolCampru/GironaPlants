"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import { useRouter } from "next/navigation";
import {
  ButtonsContainer,
  EmptyStateContainer,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateTitle,
  StyledButton,
} from "./EmptyState.style";

interface EmptyStateProps {
  lng: string;
}

const EmptyState = ({ lng }: EmptyStateProps) => {
  const { t, i18n } = useTranslation("offers");
  const router = useRouter();

  // Forzar el idioma actual
  React.useEffect(() => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  return (
    <EmptyStateContainer>
      <EmptyStateContent>
        <EmptyStateTitle>{t("emptyState.title")}</EmptyStateTitle>
        <EmptyStateDescription>
          {t("emptyState.description")}
        </EmptyStateDescription>
        <ButtonsContainer>
          <StyledButton
            onClick={() => router.push(`/${lng}/products`)}
            variant="primary"
          >
            {t("emptyState.productsButton")}
          </StyledButton>
          <StyledButton
            onClick={() => router.push(`/${lng}/contact`)}
            variant="secondary"
          >
            {t("emptyState.contactButton")}
          </StyledButton>
        </ButtonsContainer>
      </EmptyStateContent>
    </EmptyStateContainer>
  );
};

export default EmptyState;
