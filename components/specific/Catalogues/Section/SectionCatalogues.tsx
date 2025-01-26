"use client";

import { SectionCataloguesProps } from "@/types/Catalogues";
import {
  ContainerCatalogues,
  SectionCataloguesWrapper,
} from "./SectionCatalogues.style";
import CatalogueCard from "../CatalogueCard/CatalogueCard";

const SectionCatalogues = ({ data }: { data: SectionCataloguesProps }) => {
  const STRAPI_URL = "https://strapi.gironaplants.es";

  return (
    <SectionCataloguesWrapper>
      <h1>{data.section_title}</h1>
      <h2>{data.section_subtitle}</h2>
      <ContainerCatalogues>
        <CatalogueCard
          title={data.catalogue1_title}
          description={data.catalogue1_subtitle}
          catalogue={
            data.catalogue1?.url ? `${STRAPI_URL}${data.catalogue1.url}` : ""
          }
          imageUrl={data.catalogue1_img}
          button={data.catalogue1_button}
        />
        <CatalogueCard
          title={data.catalogue2_title}
          description={data.catalogue2_subtitle}
          catalogue={
            data.catalogue2?.url ? `${STRAPI_URL}${data.catalogue2.url}` : ""
          }
          imageUrl={data.catalogue2_img}
          button={data.catalogue2_button}
        />
        <CatalogueCard
          title={data.catalogue3_title}
          description={data.catalogue3_subtitle}
          catalogue={
            data.catalogue3?.url ? `${STRAPI_URL}${data.catalogue3.url}` : ""
          }
          imageUrl={data.catalogue3_img}
          button={data.catalogue3_button}
        />
      </ContainerCatalogues>
    </SectionCataloguesWrapper>
  );
};

export default SectionCatalogues;
