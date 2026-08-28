"use client";

import React from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";
import useUiLabels from "@/hooks/useUiLabels";

interface AddToCartProps {
  onClick: () => void;
  size?: string;
  label?: string;
}

const AddToCartButton = styled.button<{ $size: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};

  background-color: ${({ theme }) => theme.colors.lightGreen};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.greenDeep};
  cursor: pointer;

  transition: background-color 0.18s ease, color 0.18s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.brandGreen};
    color: ${({ theme }) => theme.colors.white};
  }
`;

/**
 * A real button with a label, so it is reachable by keyboard and announced.
 * It used to be a div holding an <img> of a plus sign that scaled to 1.5x on
 * hover, overlapping the neighbouring table rows.
 */
const AddToCart: React.FC<AddToCartProps> = ({ onClick, size = "2rem", label }) => {
  const labels = useUiLabels();
  const accessibleName = label ?? labels.addToQuote;

  return (
    <AddToCartButton
      type="button"
      onClick={onClick}
      $size={size}
      aria-label={accessibleName}
      title={accessibleName}
    >
      <FiPlus aria-hidden="true" size={16} strokeWidth={2.4} />
    </AddToCartButton>
  );
};

export default AddToCart;
