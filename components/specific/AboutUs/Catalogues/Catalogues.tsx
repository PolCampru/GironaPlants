"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import ContainerCatalogs from "@/components/ui/Catalogues/ContainerCatalogues";
import { CataloguesWrapper, ContainerInfo } from "./Catalogues.style";
import { CataloguesProps } from "@/types/AboutUs";
import Title from "@/components/ui/Title/Title";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { fadeInLeftVariants, fadeInRightVariants } from "@/animations/ScrollAnimations";

const Catalogues = ({ data }: { data: CataloguesProps }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <CataloguesWrapper
      ref={ref}
      onClick={() => (window.location.href = `/${data.locale}/catalogues`)}
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInLeftVariants}
      >
        <ContainerCatalogs />
      </motion.div>
      
      <ContainerInfo>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInRightVariants}
        >
          <Title title={data.catalogues_title} />
          <p>{data.catalogues_subtitle}</p>
          <Link href={`/${data.locale}/catalogues`}>
            <Button>{data.catalogues_button}</Button>
          </Link>
        </motion.div>
      </ContainerInfo>
    </CataloguesWrapper>
  );
};

export default Catalogues;
