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
}

export const StyledCheckbox = styled(motion.div)<StyledCheckboxProps>`
  position: relative;
  width: 1.25rem;
  height: 1.25rem;
  border: ${(props) =>
    props.$error
      ? `0.1rem solid ${props.theme.colors.orange}`
      : `0.1rem solid ${props.theme.colors.gray}`};
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
    width: 0.22rem;
    height: 0.62rem;
    border-right: ${(props) => `0.125rem solid ${props.theme.colors.white}`};
    border-bottom: ${(props) => `0.125rem solid ${props.theme.colors.white}`};
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
}

export const LabelText = styled.span<LabelTextProps>`
  margin-left: 0.5rem;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  color: ${(props) =>
    props.$error ? props.theme.colors.orange : props.theme.colors.dark};
  cursor: pointer;
`;
