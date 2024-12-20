import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledButton = styled(motion.button)`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  outline: none;
  border: 0;
  background: transparent;
  font-size: inherit;
  font-family: inherit;
  white-space: nowrap;
  height: 1rem;

  &:hover .circle {
    width: 100%;
  }

  &:hover .circle .icon.arrow {
    background: ${(props) => props.theme.colors.white};
    transform: translate(1rem, 0);
  }

  &:hover .button-text {
    color: ${(props) => props.theme.colors.white};
  }
`;

export const Circle = styled(motion.span)`
  position: absolute;
  left: 0;
  z-index: 0;
  display: block;
  margin: 0;
  width: 1.8rem;
  height: 1.8rem;
  background: ${(props) => props.theme.colors.brandGreen};
  border-radius: 1.625rem;
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
`;

export const Icon = styled(motion.span)`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: ${(props) => props.theme.colors.white};
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);

  &.arrow {
    left: 0.02rem;
    width: 1.125rem;
    height: 0.125rem;
    background: none;

    &::before {
      position: absolute;
      content: "";
      top: -0.25rem;
      right: 0.0625rem;
      width: 0.5rem;
      height: 0.5rem;
      border-top: ${(props) => `0.125rem solid ${props.theme.colors.white}`};
      border-right: ${(props) => `0.125rem solid ${props.theme.colors.white}`};
      transform: rotate(45deg);
    }
  }
`;

export const ButtonText = styled(motion.span)`
  position: relative;
  z-index: 1;
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  color: ${(props) => props.theme.colors.dark};
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  padding: 0.65rem 1rem 0.65rem 1.9rem;

  &:hover {
    padding: 0.65rem 1rem 0.65rem 2.7rem;
  }
`;
