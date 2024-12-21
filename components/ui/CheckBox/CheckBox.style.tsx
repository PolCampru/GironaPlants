// CheckBox.style.ts

import styled, { keyframes, css } from "styled-components";
import { motion } from "framer-motion";

const jellyAnimation = keyframes`
  from {
    transform: scale(1, 1);
  }
  30% {
    transform: scale(1.25, 0.75);
  }
  40% {
    transform: scale(0.75, 1.25);
  }
  50% {
    transform: scale(1.15, 0.85);
  }
  65% {
    transform: scale(0.95, 1.05);
  }
  75% {
    transform: scale(1.05, 0.95);
  }
  to {
    transform: scale(1, 1);
  }
`;

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

interface StyledCheckboxProps {
  checked: boolean;
  $error: boolean;
  $size: "small" | "medium" | "large";
}

const sizeStyles = {
  small: {
    checkboxSize: "1rem",
    borderWidth: "0.08rem",
    checkMarkSize: "0.18rem",
    labelFontSize: "0.8rem",
    labelMarginLeft: "0.4rem",
  },
  medium: {
    checkboxSize: "1.25rem",
    borderWidth: "0.1rem",
    checkMarkSize: "0.22rem",
    labelFontSize: "1rem",
    labelMarginLeft: "0.5rem",
  },
  large: {
    checkboxSize: "1.5rem",
    borderWidth: "0.12rem",
    checkMarkSize: "0.3rem",
    labelFontSize: "1.2rem",
    labelMarginLeft: "0.6rem",
  },
};

export const StyledCheckbox = styled(motion.div)<StyledCheckboxProps>`
  position: relative;
  width: ${(props) => sizeStyles[props.$size].checkboxSize};
  height: ${(props) => sizeStyles[props.$size].checkboxSize};
  border: ${(props) =>
    props.$error
      ? `${sizeStyles[props.$size].borderWidth} solid ${
          props.theme.colors.orange
        }`
      : `${sizeStyles[props.$size].borderWidth} solid ${
          props.theme.colors.gray
        }`};
  border-radius: 0.2rem;
  background: ${(props) =>
    props.checked ? props.theme.colors.brandGreen : "transparent"};
  transition: background 0.1s ease, border-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "";
    position: absolute;
    bottom: 0.2rem;
    width: ${(props) => sizeStyles[props.$size].checkMarkSize};
    height: ${(props) =>
      `calc(${sizeStyles[props.$size].checkMarkSize} * 2.72)`};
    border-right: ${(props) =>
      `calc(${sizeStyles[props.$size].checkMarkSize} / 1.8) solid ${
        props.theme.colors.white
      }`};
    border-bottom: ${(props) =>
      `calc(${sizeStyles[props.$size].checkMarkSize} / 1.8) solid ${
        props.theme.colors.white
      }`};
    opacity: 0;
    transform: rotate(45deg) scale(0);
    transition: all 0.3s ease;
    transition-delay: 0.15s;
  }

  ${({ checked }) =>
    checked &&
    css`
      border-color: transparent;
      background: ${(props) => props.theme.colors.brandGreen};
      animation: ${jellyAnimation} 0.6s ease forwards;

      &::after {
        opacity: 1;
        transform: rotate(45deg) scale(1);
      }
    `}
`;

interface LabelTextProps {
  $error: boolean;
  $size: "small" | "medium" | "large";
}

export const LabelText = styled.span<LabelTextProps>`
  margin-left: ${(props) => sizeStyles[props.$size].labelMarginLeft};
  font-size: ${(props) => sizeStyles[props.$size].labelFontSize};
  font-style: normal;
  font-weight: 500;
  color: ${(props) =>
    props.$error ? props.theme.colors.orange : props.theme.colors.dark};
  cursor: pointer;
`;
