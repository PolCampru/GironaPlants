import styled from "styled-components";
import theme from "@/lib/theme";
import React from "react";

interface AddToCartProps {
  onClick: () => void;
  size?: string;
}

const AddToCartWrapper = styled.div<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};

  border-radius: 100%;
  background-color: ${theme.colors.hoverGreen};

  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.brandGreen};
    color: ${theme.colors.white};
    transform: scale(1.5);

    img {
      filter: invert(1) brightness(10);
      stroke-width: 10px;
    }
  }
`;

const AddToCart: React.FC<AddToCartProps> = ({ onClick, size = "1.5rem" }) => {
  return (
    <AddToCartWrapper onClick={onClick} size={size}>
      <img
        src="/images/plus.svg"
        alt="plus"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </AddToCartWrapper>
  );
};

export default AddToCart;
