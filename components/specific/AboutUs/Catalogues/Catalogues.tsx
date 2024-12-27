"use client";

import ContainerCatalogs from "@/components/ui/Catalogues/ContainerCatalogues";
import { CataloguesWrapper, ContainerInfo } from "./Catalogues.style";
import { CataloguesProps } from "@/types/AboutUs";
import Title from "@/components/ui/Title/Title";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";

const Catalogues = ({ data }: { data: CataloguesProps }) => {
  return (
    <CataloguesWrapper>
      <ContainerCatalogs />
      <ContainerInfo>
        <Title title={data.title_catalogues} />
        <p>{data.subtitle_catalogues}</p>
        <Link href={`/${data.locale}/catalogues`}>
          <Button>{data.button_catalogues}</Button>
        </Link>
      </ContainerInfo>
    </CataloguesWrapper>
  );
};

export default Catalogues;
