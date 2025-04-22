import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

const FilterTagWrapper = styled(motion.div)`
  display: flex;
  padding: 0.375rem 0.75rem;
  align-items: center;
  gap: 0.5625rem;

  border-radius: 2.3125rem;
  border: 1px solid var(--lines, #cecccc);
  background: var(--white, #fff);

  span {
    color: var(--gray-600, #505050);
    font-size: 1rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: rotate(90deg);
    }
  }
`;

interface FilterTagProps {
  label: string;
  onRemove: () => void;
}

const FilterTag = ({ label, onRemove }: FilterTagProps) => {
  return (
    <FilterTagWrapper
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span>{label}</span>
      <button onClick={onRemove}>
        <Image src="/images/crossIcon.svg" alt="close" width={24} height={24} />
      </button>
    </FilterTagWrapper>
  );
};

export default FilterTag;
