"use client";

import ContainerCatalogs from "@/components/ui/Catalogues/ContainerCatalogues";
import { CataloguesWrapper, ContainerInfo } from "./Catalogues.style";
import { CataloguesProps } from "@/types/AboutUs";
import Title from "@/components/ui/Title/Title";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";

const Catalogues = ({ data }: { data: CataloguesProps }) => {
  return (
    <CataloguesWrapper
      onClick={() => (window.location.href = `/${data.locale}/catalogues`)}
    >
      <ContainerCatalogs />
      <ContainerInfo>
        <Title title={data.catalogues_title} />
        <p>{data.catalogues_subtitle}</p>
        <Link href={`/${data.locale}/catalogues`}>
          <Button>{data.catalogues_button}</Button>
        </Link>
      </ContainerInfo>
    </CataloguesWrapper>
  );
};

export default Catalogues;
