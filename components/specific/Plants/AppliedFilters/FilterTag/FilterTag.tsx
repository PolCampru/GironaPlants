"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const FilterTagWrapper = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.4375rem;

  height: 1.875rem;
  padding-inline: 0.75rem;

  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.lightGreen};
  color: ${({ theme }) => theme.colors.greenDeep};

  font-size: 0.8125rem;
  font-weight: 600;

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    background: none;
    border: 0;
    padding: 0;
    color: inherit;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
`;

interface FilterTagProps {
  label: string;
  onRemove: () => void;
  removeLabel: string;
}

const FilterTag = ({ label, onRemove, removeLabel }: FilterTagProps) => (
  <FilterTagWrapper
    initial={{ opacity: 0, scale: 0.94 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.94 }}
    transition={{ duration: 0.15 }}
  >
    {label}
    {/* Was an <img> of a cross icon inside an unlabelled button. */}
    <button type="button" onClick={onRemove} aria-label={`${removeLabel}: ${label}`}>
      <FiX aria-hidden="true" size={13} strokeWidth={2.6} />
    </button>
  </FilterTagWrapper>
);

export default FilterTag;
