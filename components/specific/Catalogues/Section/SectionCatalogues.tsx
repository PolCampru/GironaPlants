"use client";

import React from "react";
import { SectionCataloguesProps } from "@/types/Catalogues";
import { CataloguesGrid } from "./SectionCatalogues.style";
import CatalogueCard from "../CatalogueCard/CatalogueCard";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Section from "@/components/ui/Section/Section";

const SectionCatalogues = ({ data }: { data: SectionCataloguesProps }) => (
  <Section>
    <SectionHeading
      label={data.label}
      title={data.section_title}
      lead={data.section_subtitle}
    />
    <CataloguesGrid>
      {data.items.map((item) => (
        <CatalogueCard
          key={item.id}
          item={item}
          downloadLabel={data.download_label}
        />
      ))}
    </CataloguesGrid>
  </Section>
);

export default SectionCatalogues;
