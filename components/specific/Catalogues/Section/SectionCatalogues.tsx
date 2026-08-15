"use client";

import { SectionCataloguesProps } from "@/types/Catalogues";
import {
  ContainerCatalogues,
  SectionCataloguesWrapper,
} from "./SectionCatalogues.style";
import CatalogueCard from "../CatalogueCard/CatalogueCard";

const SectionCatalogues = ({ data }: { data: SectionCataloguesProps }) => {
  return (
    <SectionCataloguesWrapper>
      <h1>{data.section_title}</h1>
      <h2>{data.section_subtitle}</h2>
      <ContainerCatalogues>
        {data.items.map((item) => (
          <CatalogueCard
            key={item.id}
            title={item.title}
            description={item.subtitle}
            catalogue={item.fileUrl}
            imageUrl={item.imageUrl}
            button={item.button}
          />
        ))}
      </ContainerCatalogues>
    </SectionCataloguesWrapper>
  );
};

export default SectionCatalogues;
