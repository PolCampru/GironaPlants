"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Badge,
  ContainerData,
  ContainerImages,
  CtaRow,
  HeroWrapper,
  TrustList,
} from "./Hero.style";
import Box from "@/components/ui/Box/Box";
import CtaLink from "@/components/ui/CtaLink/CtaLink";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import {
  containerVariants,
  boxVariants,
  dataVariants,
} from "@/animations/AboutUs";
import { HeroHomeProps } from "@/types/Home";
import { HeroImageBox } from "@/data/Home";
import { strapiMediaUrl } from "@/lib/strapi";

const HeroHome = ({ data }: { data: HeroHomeProps }) => {
  return (
    <HeroWrapper>
      <ContainerData
        as={motion.div}
        initial="hidden"
        animate="visible"
        variants={dataVariants}
      >
        {data.hero_badge && <Badge>{data.hero_badge}</Badge>}
        <h1>
          <span>Girona Plants</span>
          {data.hero_title}
        </h1>
        <p>{data.hero_subtitle}</p>
        <CtaRow>
          <CtaLink
            href={`/${data.locale}/products`}
            $variant="solid"
            aria-label={`Ver productos de Girona Plants - ${data.hero_button}`}
          >
            {data.hero_button}
            <FiArrowRight aria-hidden="true" />
          </CtaLink>
          {data.hero_secondary_button && (
            <CtaLink href={`/${data.locale}/contact`} $variant="outline">
              {data.hero_secondary_button}
            </CtaLink>
          )}
        </CtaRow>
        {data.trust_items && data.trust_items.length > 0 && (
          <TrustList>
            {data.trust_items.map((item) => (
              <li key={item}>
                <FiCheckCircle aria-hidden="true" />
                {item}
              </li>
            ))}
          </TrustList>
        )}
      </ContainerData>
      <ContainerImages
        as={motion.div}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {HeroImageBox.map((item, index) => {
          let fullUrl = null;
          if (data.hero_images.length === 1 && index === 2) {
            fullUrl = strapiMediaUrl(data.hero_images[0]);
          } else if (
            data.hero_images.length === 2 &&
            (index === 1 || index === 2)
          ) {
            fullUrl = strapiMediaUrl(data.hero_images[index - 1]);
          } else if (
            data.hero_images[index] &&
            data.hero_images.length === HeroImageBox.length
          ) {
            fullUrl = strapiMediaUrl(data.hero_images[index]);
          }

          const imageUrl = fullUrl || item.defaultImage;

          const altText = imageUrl
            ? `Imagen de planta mediterránea en el vivero Girona Plants - ${
                index + 1
              }`
            : undefined;

          return (
            <motion.div key={index} variants={boxVariants}>
              <Box
                imageUrl={imageUrl}
                width={item.width}
                height={item.height}
                borderRadiusTopLeft={item.borderRadiusTopLeft}
                borderRadiusTopRight={item.borderRadiusTopRight}
                borderRadiusBottomLeft={item.borderRadiusBottomLeft}
                borderRadiusBottomRight={item.borderRadiusBottomRight}
                color={item.color}
                altText={altText}
              />
            </motion.div>
          );
        })}
      </ContainerImages>
    </HeroWrapper>
  );
};

export default HeroHome;
