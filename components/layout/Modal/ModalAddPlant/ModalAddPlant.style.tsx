"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

export const ModalAddPlantWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  h2 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 1.75rem;
    font-weight: 400;
    line-height: 1.12;
    color: ${({ theme }) => theme.colors.dark};
    padding-right: 2.5rem;
  }

  > p {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const ModalFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;
