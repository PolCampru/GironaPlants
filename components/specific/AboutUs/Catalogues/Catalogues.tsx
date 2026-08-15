"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import ContainerCatalogs from "@/components/ui/Catalogues/ContainerCatalogues";
import { CataloguesWrapper, ContainerInfo } from "./Catalogues.style";
import { CataloguesProps } from "@/types/AboutUs";
import Link from "next/link";
import Title from "@/components/ui/Title/Title";
import CtaLink from "@/components/ui/CtaLink/CtaLink";
import { FiArrowRight } from "react-icons/fi";
import {
  fadeInLeftVariants,
  fadeInRightVariants,
} from "@/animations/ScrollAnimations";

const Catalogues = ({ data }: { data: CataloguesProps }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <CataloguesWrapper ref={ref}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInLeftVariants}
      >
        <Link
          href={`/${data.locale}/catalogues`}
          aria-label={data.catalogues_title}
        >
          <ContainerCatalogs />
        </Link>
      </motion.div>

      <ContainerInfo>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInRightVariants}
        >
          <Title title={data.catalogues_title} />
          <p>{data.catalogues_subtitle}</p>
          <CtaLink href={`/${data.locale}/catalogues`} $variant="solid">
            {data.catalogues_button}
            <FiArrowRight aria-hidden="true" />
          </CtaLink>
        </motion.div>
      </ContainerInfo>
    </CataloguesWrapper>
  );
};

export default Catalogues;
