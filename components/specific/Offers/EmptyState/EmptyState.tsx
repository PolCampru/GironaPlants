"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiTag } from "react-icons/fi";
import {
  ButtonsContainer,
  EmptyStateContainer,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "./EmptyState.style";
import CtaLink from "@/components/ui/CtaLink/CtaLink";

const EmptyState = ({ lng }: { lng: string }) => {
  const { t } = useTranslation("offers");

  // The locale comes from the route; forcing i18n.changeLanguage from inside
  // this component (as it used to) fought the language selector.
  return (
    <EmptyStateContainer>
      <EmptyStateIcon>
        <FiTag aria-hidden="true" size={22} />
      </EmptyStateIcon>
      <EmptyStateTitle>{t("emptyState.title")}</EmptyStateTitle>
      <EmptyStateDescription>
        {t("emptyState.description")}
      </EmptyStateDescription>
      <ButtonsContainer>
        <CtaLink href={`/${lng}/products`} $variant="solid">
          {t("emptyState.productsButton")}
          <FiArrowRight aria-hidden="true" />
        </CtaLink>
        <CtaLink href={`/${lng}/contact`} $variant="outline">
          {t("emptyState.contactButton")}
        </CtaLink>
      </ButtonsContainer>
    </EmptyStateContainer>
  );
};

export default EmptyState;
