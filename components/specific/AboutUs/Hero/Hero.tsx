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

const STRAPI_URL = "https://strapi.gironaplants.es";

const HeroAboutUs = ({ data }: { data: HeroAboutUsProps }) => {
  return (
    <HeroWrapper>
      <ContainerImages
        as={motion.div}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {data.hero_images.map((image, index) => {
          const fullUrl = image.url.startsWith("http")
            ? image.url
            : `${STRAPI_URL}${image.url}`;

          return (
            <motion.div key={image.id} variants={boxVariants}>
              <Box
                imageUrl={fullUrl || "/images/aboutUs/ilex.jpg"}
                width={HeroImageBox[index].width}
                height={HeroImageBox[index].height}
                borderRadiusBottomLeft={
                  HeroImageBox[index].borderRadiusBottomLeft
                }
                borderRadiusBottomRight={
                  HeroImageBox[index].borderRadiusBottomRight
                }
                borderRadiusTopLeft={HeroImageBox[index].borderRadiusTopLeft}
                borderRadiusTopRight={HeroImageBox[index].borderRadiusTopRight}
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
