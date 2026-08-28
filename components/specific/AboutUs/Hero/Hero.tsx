"use client";

import React from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import {
  ActionRow,
  ContainerData,
  HeroWrapper,
  Label,
  MediaMosaic,
  MosaicStat,
  MosaicTile,
} from "./Hero.style";
import CtaLink from "@/components/ui/CtaLink/CtaLink";
import { HeroAboutUsProps } from "@/types/AboutUs";
import { strapiMediaUrl } from "@/lib/strapi";

const MOSAIC_FALLBACKS = [
  { src: "/images/aboutUs/ilex.jpg", tall: true },
  { src: "/images/plants/nursery.jpg", tall: false },
  { src: "/images/lavenders.jpg", tall: false },
  { src: "/images/redCedar.jpg", tall: false },
];

const HeroAboutUs = ({ data }: { data: HeroAboutUsProps }) => {
  const tiles = MOSAIC_FALLBACKS.map((tile, index) => ({
    ...tile,
    // Strapi image if the editor uploaded one, otherwise the local photo, so
    // a tile is never an empty coloured block.
    src: strapiMediaUrl(data.hero_images?.[index]) || tile.src,
  }));

  return (
    <HeroWrapper>
      {/* Above the fold: painted, not animated in. See Home/Hero. */}
      <ContainerData>
        <Label>{data.label}</Label>
        <h1>{data.title}</h1>
        {/* The brand name used to be spliced in as a <span> before this
            sentence, so the copy in the CMS had to start mid-sentence and in
            lowercase to read correctly. */}
        <p>{data.subtitle}</p>

        <ActionRow>
          <CtaLink href={`/${data.locale}/products`} $variant="solid">
            {data.hero_button}
            <FiArrowRight aria-hidden="true" />
          </CtaLink>
          {data.hero_secondary_button && (
            <CtaLink href={`/${data.locale}/contact`} $variant="outline">
              {data.hero_secondary_button}
            </CtaLink>
          )}
        </ActionRow>
      </ContainerData>

      <MediaMosaic>
        {tiles.map((tile, index) => (
          <MosaicTile key={tile.src + index} $tall={tile.tall}>
            <Image
              src={tile.src}
              alt=""
              width={520}
              height={620}
              priority={index === 0}
              sizes="(max-width: 1024px) 50vw, 23vw"
            />
          </MosaicTile>
        ))}
        {data.founded && (
          <MosaicStat>
            <strong>{data.founded.value}</strong>
            <span>{data.founded.label}</span>
          </MosaicStat>
        )}
      </MediaMosaic>
    </HeroWrapper>
  );
};

export default HeroAboutUs;
