"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import {
  AskCard,
  CardArrow,
  CardBody,
  CardText,
  PlantCard,
  PlantsGrid,
} from "./OurPlants.style";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Section from "@/components/ui/Section/Section";
import CtaLink from "@/components/ui/CtaLink/CtaLink";
import { PlantsHomeProps } from "@/types/Home";

const OurPlants = ({ data }: { data: PlantsHomeProps }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  // The categories come from the server as props. They used to be read from
  // i18n inside this client component, which meant the server rendered zero
  // cards and the client rendered nine — a hydration mismatch that made React
  // throw away and re-render the whole subtree on every load.
  const categories = data.categories;

  return (
    <Section ref={ref}>
      <SectionHeading
        label={data.plants_title}
        title={data.plants_headline}
        lead={data.plants_subtitle}
        action={
          <CtaLink href={`/${data.locale}/products`} $variant="outline">
            {data.plants_button}
            <FiArrowRight aria-hidden="true" />
          </CtaLink>
        }
      />

      <PlantsGrid>
        {categories.map((plant, index) => (
          <motion.div
            key={plant.key}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.06 }}
          >
            <PlantCard
              href={`/${data.locale}/products?search=${encodeURIComponent(
                plant.search ?? plant.title
              )}`}
            >
              {plant.img && (
                <Image
                  src={plant.img}
                  alt=""
                  width={520}
                  height={420}
                  sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
              <CardBody>
                <CardText>
                  <h3>{plant.title}</h3>
                  {plant.description && <p>{plant.description}</p>}
                </CardText>
                <CardArrow aria-hidden="true">
                  <FiArrowRight />
                </CardArrow>
              </CardBody>
            </PlantCard>
          </motion.div>
        ))}

        {data.ask && (
          <AskCard>
            <div>
              <h3>{data.ask.title}</h3>
              <p>{data.ask.text}</p>
            </div>
            <CtaLink
              href={`/${data.locale}/contact`}
              $variant="solid"
              $size="md"
            >
              {data.ask.button}
              <FiArrowRight aria-hidden="true" />
            </CtaLink>
          </AskCard>
        )}
      </PlantsGrid>
    </Section>
  );
};

export default OurPlants;
