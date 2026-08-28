"use client";

import React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiMail, FiPhone } from "react-icons/fi";
import {
  ContactMeta,
  ContactPanel,
  ContainerAction,
  ContainerText,
} from "./Contact.style";
import { ContactHomeProps } from "@/types/Home";
import CtaLink from "@/components/ui/CtaLink/CtaLink";
import Section from "@/components/ui/Section/Section";

const Contact = ({ data }: { data: ContactHomeProps }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  return (
    <Section ref={ref}>
      <ContactPanel
        as={motion.div}
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <ContainerText>
          <h2>{data.contact_title}</h2>
          {/* Was an <h3>, which made the supporting sentence a heading. */}
          <p>{data.contact_subtitle}</p>

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

        <ContainerAction>
          <CtaLink href={`/${data.locale}/contact`} $variant="light">
            {data.contact_button}
            <FiArrowRight aria-hidden="true" />
          </CtaLink>
        </ContainerAction>
      </ContactPanel>
    </Section>
  );
};

export default Contact;
