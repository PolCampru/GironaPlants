"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const ContactWrapper = styled(motion.div)`
  height: 100vh;
  width: 100%;
  padding-top: 8rem;
  padding-bottom: 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5%;

  @media (max-width: 1024px) {
    height: auto;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

export const FormWrapper = styled(motion.div)`
  width: 50%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0 2rem;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const ImagesWrapper = styled(motion.div)`
  width: 50%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0;

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, auto);
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, auto);
    gap: 1rem;
    padding: 0 1rem;
  }
`;
