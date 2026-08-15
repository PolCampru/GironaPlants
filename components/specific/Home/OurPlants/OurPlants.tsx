"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import {
  CardArrow,
  OurPlantsWrapper,
  PlantCard,
  PlantsContainer,
  SectionFooter,
} from "./OurPlants.style";
import { OurPlantsType, PlantsHomeProps } from "@/types/Home";
import Title from "@/components/ui/Title/Title";
import CtaLink from "@/components/ui/CtaLink/CtaLink";
import { FiArrowRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import {
  fadeInUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/animations/ScrollAnimations";

const OurPlants = ({ data }: { data: PlantsHomeProps }) => {
  const { t } = useTranslation(["home"]);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const translated = t("ourPlants", { returnObjects: true });
  // Keep the wrapper mounted while translations load: useInView only attaches
  // its observer to elements present on first render, so an early return
  // would leave the section permanently invisible.
  const ourPlants: OurPlantsType = Array.isArray(translated) ? translated : [];

  return (
    <OurPlantsWrapper ref={ref}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUpVariants}
      >
        <Title title={data.plants_title} />
        <h2>{data.plants_subtitle}</h2>
      </motion.div>

      <PlantsContainer
        as={motion.div}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainerVariants}
      >
        {ourPlants.map((plant, index) => {
          return (
            <motion.div key={plant.key} variants={staggerItemVariants}>
              <PlantCard
                href={`/${data.locale}/products`}
                $image={plant.img}
                $tone={index % 2 === 0 ? "cream" : "green"}
              >
                <h3>{plant.title}</h3>
                {plant.description && <p>{plant.description}</p>}
                <CardArrow aria-hidden="true">
                  <FiArrowRight />
                </CardArrow>
              </PlantCard>
            </motion.div>
          );
        })}
      </PlantsContainer>

      <SectionFooter
        as={motion.div}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUpVariants}
      >
        <CtaLink href={`/${data.locale}/products`} $variant="solid">
          {data.plants_button}
          <FiArrowRight aria-hidden="true" />
        </CtaLink>
      </SectionFooter>
    </OurPlantsWrapper>
  );
};

export default OurPlants;
