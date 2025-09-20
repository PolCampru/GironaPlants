"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { OurPlantsWrapper, PlantBox, PlantsContainer } from "./OurPlants.style";
import { OurPlantsType, PlantsHomeProps } from "@/types/Home";
import Title from "@/components/ui/Title/Title";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Loader from "@/components/ui/Loader/Loader";
import { 
  fadeInUpVariants, 
  staggerContainerVariants, 
  staggerItemVariants 
} from "@/animations/ScrollAnimations";

const OurPlants = ({ data }: { data: PlantsHomeProps }) => {
  const { t } = useTranslation(["home"]);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const ourPlants = t("ourPlants", { returnObjects: true }) as OurPlantsType;

  if (typeof ourPlants === "string") {
    return <Loader />;
  }

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
        {ourPlants.map((plant) => (
          <motion.div key={plant.key} variants={staggerItemVariants}>
            <PlantBox
              style={{
                backgroundImage: `url(${plant.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {plant.title}
              <p>{plant.description}</p>
            </PlantBox>
          </motion.div>
        ))}
      </PlantsContainer>
      
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUpVariants}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Link href={`/${data.locale}/products`}>
          <Button>{data.plants_button}</Button>
        </Link>
      </motion.div>
    </OurPlantsWrapper>
  );
};

export default OurPlants;
