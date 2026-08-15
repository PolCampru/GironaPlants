"use client";

import { HeroAboutUsProps } from "@/types/AboutUs";
import React from "react";
import { motion } from "framer-motion";
import { ContainerData, ContainerImages, HeroWrapper } from "./Hero.style";
import Box from "@/components/ui/Box/Box";
import { HeroImageBox } from "@/data/AboutUs";
import Title from "@/components/ui/Title/Title";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import {
  containerVariants,
  boxVariants,
  dataVariants,
} from "@/animations/AboutUs";
import { strapiMediaUrl } from "@/lib/strapi";

const HeroAboutUs = ({ data }: { data: HeroAboutUsProps }) => {
  return (
    <HeroWrapper>
      <ContainerImages
        as={motion.div}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {HeroImageBox.map((item, index) => {
          const fullUrl = strapiMediaUrl(data.hero_images?.[index]);
          const imageUrl = fullUrl || item.defaultImage;

          return (
            <motion.div key={index} variants={boxVariants}>
              <Box
                imageUrl={imageUrl}
                width={item.width}
                height={item.height}
                borderRadiusBottomLeft={item.borderRadiusBottomLeft}
                borderRadiusBottomRight={item.borderRadiusBottomRight}
                borderRadiusTopLeft={item.borderRadiusTopLeft}
                borderRadiusTopRight={item.borderRadiusTopRight}
              />
            </motion.div>
          );
        })}
      </ContainerImages>

      <ContainerData
        as={motion.div}
        initial="hidden"
        animate="visible"
        variants={dataVariants}
      >
        <Title title={data.title} />
        <p>
          <span>Girona Plants </span>
          {data.subtitle}
        </p>
        <Link href={`/${data.locale}/products`}>
          <Button>{data.hero_button}</Button>
        </Link>
      </ContainerData>
    </HeroWrapper>
  );
};

export default HeroAboutUs;
