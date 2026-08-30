"use client";

import React from "react";
import { FiArrowRight } from "react-icons/fi";
import CtaLink from "@/components/ui/CtaLink/CtaLink";
import type { CatalogueCopy } from "@/data/catalogueContent";
import { CtaActions, CtaPanel, CtaSecondary, CtaText } from "./Catalogue.style";

/**
 * The conversion step. Every genus and species page ends here, because a
 * visitor who arrived from a search for one botanical name has no other reason
 * to know the quote form exists.
 */
const CatalogueCta = ({
  copy,
  locale,
}: {
  copy: CatalogueCopy["cta"];
  locale: string;
}) => (
  <CtaPanel>
    <CtaText>
      <h2>{copy.title}</h2>
      <p>{copy.body}</p>
    </CtaText>
    <CtaActions>
      <CtaLink href={`/${locale}/budget`} $variant="light">
        {copy.quote}
        <FiArrowRight aria-hidden="true" />
      </CtaLink>
      <CtaSecondary href={`/${locale}/contact`}>{copy.contact}</CtaSecondary>
    </CtaActions>
  </CtaPanel>
);

export default CatalogueCta;
