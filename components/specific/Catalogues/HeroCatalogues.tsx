"use client";

import React from "react";
import {
  HeroWrapper,
  ImageContainer,
  InfoContainer,
} from "./HeroCatalogues.style";
import { HeroCataloguesProps } from "@/types/Catalogues";
import Button from "@/components/ui/Button/Button";

const STRAPI_URL = "https://strapi.gironaplants.es";

const HeroCatalogues = ({ data }: { data: HeroCataloguesProps }) => {
  const handleButtonClick = () => {
    console.log("Button clicked");
    const catalogueUrl = data.catalogue.url;
    if (catalogueUrl) {
      const fullUrl = `${STRAPI_URL}${catalogueUrl}`;
      window.open(fullUrl, "_blank", "noopener,noreferrer");
    } else {
      console.error("Catalogue URL is not defined.");
    }
  };

  return (
    <HeroWrapper>
      <ImageContainer onClick={handleButtonClick}>
        <img src="/images/mainCatalogue.jpg" alt="catalolgue" />
      </ImageContainer>
      <InfoContainer>
        <h1>{data.main_title}</h1>
        <h2>{data.main_subtitle}</h2>
        <div onClick={handleButtonClick}>
          <Button>{data.main_button}</Button>
        </div>
      </InfoContainer>
    </HeroWrapper>
  );
};

export default HeroCatalogues;
