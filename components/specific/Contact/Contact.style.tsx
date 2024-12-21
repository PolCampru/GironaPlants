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
`;

export const FormWrapper = styled(motion.div)`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
`;

export const ImagesWrapper = styled(motion.div)`
  width: 50%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0;
`;
