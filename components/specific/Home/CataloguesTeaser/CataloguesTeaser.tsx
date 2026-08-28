"use client";

import React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { CardsGrid } from "./CataloguesTeaser.style";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Section from "@/components/ui/Section/Section";
import CtaLink from "@/components/ui/CtaLink/CtaLink";
import CatalogueCard from "@/components/specific/Catalogues/CatalogueCard/CatalogueCard";
import { CataloguesTeaserProps } from "@/types/AboutUs";

/**
 * Shows the real downloadable catalogues instead of the previous decorative
 * stack of four coloured rectangles whose click handlers only console.logged.
 */
const CataloguesTeaser = ({ data }: { data: CataloguesTeaserProps }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const items = data.items.slice(0, 3);

  return (
    <Section ref={ref}>
      <SectionHeading
        label={data.catalogues_title}
        title={data.catalogues_headline}
        lead={data.catalogues_subtitle}
        action={
          <CtaLink href={`/${data.locale}/catalogues`} $variant="outline">
            {data.catalogues_button}
            <FiArrowRight aria-hidden="true" />
          </CtaLink>
        }
      />

      {items.length > 0 && (
        <CardsGrid>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <CatalogueCard item={item} downloadLabel={data.download_label} />
            </motion.div>
          ))}
        </CardsGrid>
      )}
    </Section>
  );
};

export default CataloguesTeaser;
