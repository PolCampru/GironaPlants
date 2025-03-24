"use client";

import React from "react";
import { OurPlantsWrapper, PlantBox, PlantsContainer } from "./OurPlants.style";
import { OurPlantsType, PlantsHomeProps } from "@/types/Home";
import Title from "@/components/ui/Title/Title";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Loader from "@/components/ui/Loader/Loader";

const OurPlants = ({ data }: { data: PlantsHomeProps }) => {
  const { t } = useTranslation(["home"]);

  const ourPlants = t("ourPlants", { returnObjects: true }) as OurPlantsType;

  if (typeof ourPlants === "string") {
    return <Loader />;
  }

  return (
    <OurPlantsWrapper>
      <Title title={data.plants_title} />
      <h2>{data.plants_subtitle}</h2>
      <PlantsContainer>
        {ourPlants.map((plant) => (
          <PlantBox
            key={plant.key}
            style={{
              backgroundImage: `url(${plant.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {plant.title}
            <p>{plant.description}</p>
          </PlantBox>
        ))}
      </PlantsContainer>
      <Link href={`/${data.locale}/products`}>
        <Button>{data.plants_button}</Button>
      </Link>
    </OurPlantsWrapper>
  );
};

export default OurPlants;
