"use client";

import React from "react";
import {
  HeroWrapper,
  ImageContainer,
  InfoContainer,
} from "./HeroCatalogues.style";
import { HeroCataloguesProps } from "@/types/Catalogues";
import Button from "@/components/ui/Button/Button";
import Image from "next/image";

const STRAPI_URL = "https://api.gironaplants.com";

const HeroCatalogues = ({ data }: { data: HeroCataloguesProps }) => {
  const handleButtonClick = () => {
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
        <Image
          src="/images/mainCatalogue.jpg"
          alt="catalogue"
          width={800}
          height={600}
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: '4/3',
            objectFit: 'cover'
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          priority
        />
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
