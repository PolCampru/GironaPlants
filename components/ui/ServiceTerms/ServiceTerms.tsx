"use client";

import React from "react";
import { FiBriefcase, FiGlobe, FiHome, FiTruck } from "react-icons/fi";
import {
  CompactList,
  CompactPanel,
  ParticularNote,
  TermIcon,
  TermItem,
  TermsGrid,
  TermsPanel,
} from "./ServiceTerms.style";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Section from "@/components/ui/Section/Section";
import type {
  ServiceTermKey,
  ServiceTermsContent,
} from "@/data/serviceTermsContent";

const ICONS: Record<ServiceTermKey, typeof FiGlobe> = {
  europe: FiGlobe,
  pallet: FiTruck,
  trade: FiBriefcase,
};

/**
 * Europe only, pallets only, trade volumes — said up front so nobody fills in
 * a quote we can't serve. `section` is the full-width block for content
 * pages; `compact` sits beside a form.
 */
const ServiceTerms = ({
  content,
  variant = "section",
}: {
  content: ServiceTermsContent;
  variant?: "section" | "compact";
}) => {
  const note = (
    <ParticularNote $compact={variant === "compact"}>
      <FiHome aria-hidden="true" size={variant === "compact" ? 17 : 20} />
      <p>
        <strong>{content.particular.title}</strong> {content.particular.text}
      </p>
    </ParticularNote>
  );

  if (variant === "compact") {
    return (
      <CompactPanel>
        <h2>{content.label}</h2>
        <CompactList>
          {content.items.map(({ key, title, text }) => {
            const Icon = ICONS[key];
            return (
              <li key={key}>
                <TermIcon $compact>
                  <Icon aria-hidden="true" size={16} />
                </TermIcon>
                <span>
                  <strong>{title}</strong>
                  {text}
                </span>
              </li>
            );
          })}
        </CompactList>
        {note}
      </CompactPanel>
    );
  }

  return (
    <Section>
      <TermsPanel>
        <SectionHeading label={content.label} title={content.title} size="md" />
        <TermsGrid>
          {content.items.map(({ key, title, text }) => {
            const Icon = ICONS[key];
            return (
              <TermItem key={key}>
                <TermIcon>
                  <Icon aria-hidden="true" size={20} />
                </TermIcon>
                <h3>{title}</h3>
                <p>{text}</p>
              </TermItem>
            );
          })}
        </TermsGrid>
        {note}
      </TermsPanel>
    </Section>
  );
};

export default ServiceTerms;
