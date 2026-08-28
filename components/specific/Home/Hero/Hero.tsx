"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiGlobe } from "react-icons/fi";
import {
  Badge,
  ContainerData,
  HeroMedia,
  HeroWrapper,
  Lead,
  MediaFrame,
  MediaTag,
  SearchBlock,
  SecondaryAction,
  StatCard,
} from "./Hero.style";
import PlantSearch from "@/components/ui/PlantSearch/PlantSearch";
import { HeroHomeProps } from "@/types/Home";
import { strapiMediaUrl } from "@/lib/strapi";

const HERO_FALLBACK_IMAGE = "/images/lavenders.jpg";

const HeroHome = ({ data }: { data: HeroHomeProps }) => {
  // One photograph, not a 2x2 grid of four. Strapi has never had hero images,
  // so the old grid rendered two stock photos and two flat colour blocks.
  const imageUrl =
    strapiMediaUrl(data.hero_images?.[0]) || HERO_FALLBACK_IMAGE;

  return (
    <HeroWrapper>
      {/* No entrance animation above the fold. Fading the hero in from
          opacity 0 means the headline is invisible until a frame runs — and
          in a throttled or backgrounded tab, or if the JS is slow, it never
          does. */}
      <ContainerData>
        {data.hero_badge && (
          <Badge>
            <FiGlobe aria-hidden="true" size={14} />
            {data.hero_badge}
          </Badge>
        )}

        {/* The brand name lives in the logo. It used to be repeated here at
            4.25rem, above a smaller h1 — the headline lost to the wordmark. */}
        <h1>{data.hero_title}</h1>

        <Lead>{data.hero_subtitle}</Lead>

        <SearchBlock>
          <PlantSearch
            locale={data.locale}
            placeholder={data.search_placeholder}
            submitLabel={data.search_button}
            suggestions={data.search_suggestions}
            suggestionsLabel={data.search_suggestions_label}
          />
        </SearchBlock>

        {data.hero_secondary_button && (
          <SecondaryAction>
            <Link href={`/${data.locale}/contact`}>
              {data.hero_secondary_button}
              <FiArrowRight aria-hidden="true" />
            </Link>
          </SecondaryAction>
        )}
      </ContainerData>

      <HeroMedia>
        <MediaFrame>
          <Image
            src={imageUrl}
            alt={data.hero_image_alt}
            width={900}
            height={1040}
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
          />
        </MediaFrame>

        {data.hero_tag && (
          <MediaTag>
            <FiCheck aria-hidden="true" size={13} />
            {data.hero_tag}
          </MediaTag>
        )}

        {data.hero_stat && (
          <StatCard>
            <strong>{data.hero_stat.value}</strong>
            <span>{data.hero_stat.label}</span>
            {data.hero_stat.note && <small>{data.hero_stat.note}</small>}
          </StatCard>
        )}
      </HeroMedia>
    </HeroWrapper>
  );
};

export default HeroHome;
