"use client";

import React from "react";
import { motion } from "framer-motion";
import { ContainerData, ContainerImages, HeroWrapper } from "./Hero.style";
import Box from "@/components/ui/Box/Box";

import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import {
  containerVariants,
  boxVariants,
  dataVariants,
} from "@/animations/AboutUs";
import { HeroHomeProps } from "@/types/Home";
import { HeroImageBox } from "@/data/Home";

const STRAPI_URL = "https://strapi.gironaplants.es";

const HeroHome = ({ data }: { data: HeroHomeProps }) => {
  return (
    <HeroWrapper>
      <ContainerData
        as={motion.div}
        initial="hidden"
        animate="visible"
        variants={dataVariants}
      >
        <h1>
          <span>Girona Plants</span>
          {data.hero_title}
        </h1>
        <p>{data.hero_subtitle}</p>
        <Link href={`/${data.locale}/products`}>
          <Button>{data.hero_button}</Button>
        </Link>
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
            fullUrl = `${STRAPI_URL}${data.hero_images[0].url}`;
          } else if (
            data.hero_images.length === 2 &&
            (index === 1 || index === 2)
          ) {
            fullUrl = `${STRAPI_URL}${data.hero_images[index - 1].url}`;
          } else if (
            data.hero_images[index] &&
            data.hero_images.length === HeroImageBox.length
          ) {
            fullUrl = `${STRAPI_URL}${data.hero_images[index].url}`;
          }

          return (
            <motion.div key={index} variants={boxVariants}>
              <Box
                imageUrl={fullUrl || ""}
                width={item.width}
                height={item.height}
                borderRadiusBottomRight={item.borderRadiusBottomRight}
                borderRadiusTopLeft={item.borderRadiusTopLeft}
                color={item.color}
              />
            </motion.div>
          );
        })}
      </ContainerImages>
    </HeroWrapper>
  );
};

export default HeroHome;
