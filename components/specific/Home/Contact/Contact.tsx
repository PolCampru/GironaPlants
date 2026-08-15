"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import {
  ContactMeta,
  ContactWrapper,
  ContainerAction,
  ContainerText,
} from "./Contact.style";
import { ContactHomeProps } from "@/types/Home";
import CtaLink from "@/components/ui/CtaLink/CtaLink";
import { FiArrowRight, FiMail, FiPhone } from "react-icons/fi";
import {
  fadeInUpVariants,
  scaleInVariants,
} from "@/animations/ScrollAnimations";

const Contact = ({ data }: { data: ContactHomeProps }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <ContactWrapper ref={ref}>
      <ContainerText
        as={motion.div}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUpVariants}
      >
        <h2>{data.contact_title}</h2>
        <h3>{data.contact_subtitle}</h3>
        {(data.contact_phone || data.contact_email) && (
          <ContactMeta>
            {data.contact_phone && (
              <a href={`tel:${data.contact_phone.replace(/\s/g, "")}`}>
                <FiPhone aria-hidden="true" />
                {data.contact_phone}
              </a>
            )}
            {data.contact_email && (
              <a href={`mailto:${data.contact_email}`}>
                <FiMail aria-hidden="true" />
                {data.contact_email}
              </a>
            )}
          </ContactMeta>
        )}
      </ContainerText>

      <ContainerAction
        as={motion.div}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={scaleInVariants}
      >
        <CtaLink href={`/${data.locale}/contact`} $variant="light">
          {data.contact_button}
          <FiArrowRight aria-hidden="true" />
        </CtaLink>
      </ContainerAction>
    </ContactWrapper>
  );
};

export default Contact;
