import styled from "styled-components";
import { motion } from "framer-motion";

export const BudgetAndLanguageWrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 0.25rem 0.3rem;
  border-radius: 6.25rem;
`;

export const BudgetContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  padding: 0.8125rem 0.75rem;

  border-radius: 6.25rem;

  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.hoverGreen};
  }

  &:active {
    background-color: ${(props) => props.theme.colors.brandGreen};
    color: ${(props) => props.theme.colors.white};

    img {
      filter: brightness(0) invert(1);
    }
  }

  img {
    transition: filter 0.3s;
  }

  p {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 500;
    color: inherit;
  }
`;

export const Line = styled.div`
  height: 2.5rem;
  width: 0.1rem;
  background-color: ${(props) => props.theme.colors.cream};
  margin: 0 1rem;
`;

export const LanguageContainer = styled.div``;

export const LanguageButton = styled(motion.div)<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  cursor: pointer;
  border-radius: 6.25rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.colors.creamLight};
  transition: background-color 0.3s, color 0.3s;
  position: relative;
  color: ${(props) => props.isOpen && props.theme.colors.white};

  &:hover {
    background-color: ${(props) => props.theme.colors.hoverGreen};
  }

  img {
    width: 12px;
    height: 12px;
    transition: transform 0.3s ease;
    transform: ${(props) =>
      props.isOpen ? "rotate(-180deg)" : "rotate(0deg)"};
    filter: ${(props) => props.isOpen && "brightness(0) invert(1)"};
  }
`;

export const DropdownMenu = styled(motion.ul)`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${(props) => props.theme.colors.creamLight};
  border-radius: 8px;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0.5rem 0 0 0;
  box-shadow: 0 4px 12px ${(props) => props.theme.colors.creamLight};
  z-index: 1000;
  width: max-content;
`;

export const DropdownItem = styled.li`
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text};

  &:hover {
    background-color: ${(props) => props.theme.colors.hoverGreen};
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const BudgetDrawer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 35%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export const CloseButton = styled.button`
  width: 1.2rem;
  height: 1.2rem;
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text};
  padding: 0;
  transition: transform 0.3s;
  filter: brightness(0);

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: rotate(90deg);
  }
`;
