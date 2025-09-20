"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import {
  ContactWrapper,
  ContainerButton,
  ContainerText,
} from "./Contact.style";
import { ContactHomeProps } from "@/types/Home";
import Link from "next/link";
import Image from "next/image";
import { fadeInUpVariants, scaleInVariants } from "@/animations/ScrollAnimations";

const Contact = ({ data }: { data: ContactHomeProps }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <ContactWrapper
      ref={ref}
      style={{
        backgroundImage: `url('/path/to/your/image.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ContainerText
        as={motion.div}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUpVariants}
      >
        <h2>{data.contact_title}</h2>
        <h3>{data.contact_subtitle}</h3>
      </ContainerText>
      
      <ContainerButton
        as={motion.div}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={scaleInVariants}
      >
        <div className="background" />
        <Link href={`/${data.locale}/contact`} className="link">
          <p>{data.contact_button}</p>
          <Image
            src="/images/products/arrowIcon.svg"
            alt="arrow"
            width={24}
            height={24}
          />
        </Link>
      </ContainerButton>
    </ContactWrapper>
  );
};

export default Contact;
