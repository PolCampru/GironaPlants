"use client";

import React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiFileText, FiSearch, FiTruck } from "react-icons/fi";
import {
  StepCard,
  StepGrid,
  StepIcon,
  StepNumber,
  StepTop,
} from "./HowWeWork.style";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Section from "@/components/ui/Section/Section";
import { HowWeWorkProps } from "@/types/Home";

const ICONS = [FiFileText, FiSearch, FiTruck];

/**
 * "What happens if you don't have the species I need?" is the question a
 * sourcing company gets asked most, and the site never answered it.
 */
const HowWeWork = ({ data }: { data: HowWeWorkProps }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  if (!data.steps.length) return null;

  return (
    <Section ref={ref}>
      <SectionHeading label={data.label} title={data.title} />

      <StepGrid>
        {data.steps.map((step, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <StepCard
              key={step.title}
              as={motion.div}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <StepTop>
                <StepIcon>
                  <Icon aria-hidden="true" size={21} />
                </StepIcon>
                <StepNumber aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </StepNumber>
              </StepTop>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </StepCard>
          );
        })}
      </StepGrid>
    </Section>
  );
};

export default HowWeWork;
