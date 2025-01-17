import { motion } from "framer-motion";
import styled from "styled-components";

export const ModalAddPlantWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  button {
    display: flex;
    width: 100%;
    height: 2rem;
    padding: 0.75rem 1.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;

    border: none;
    border-radius: 6.25rem;
    background-color: ${(props) => props.theme.colors.brandGreen};
    color: ${(props) => props.theme.colors.white};

    cursor: pointer;

    transition: background-color 0.3s, color 0.3s, transform 0.3s;

    &:hover {
      background-color: ${(props) => props.theme.colors.hoverGreen2};
      color: ${(props) => props.theme.colors.dark};
    }

    &:active {
      transform: scale(0.98);
    }

    color: ${(props) => props.theme.colors.white};
    font-family: Inter;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
