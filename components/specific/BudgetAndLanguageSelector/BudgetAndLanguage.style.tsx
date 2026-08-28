"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const BudgetAndLanguageWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

export const BudgetButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  height: ${({ theme }) => theme.control.height};
  padding-inline: 1.25rem;

  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.brandGreen};
  color: ${({ theme }) => theme.colors.white};

  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;

  transition: background-color 0.18s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.greenDeep};
  }

  svg {
    flex-shrink: 0;
  }

  /* Below the tablet breakpoint the label goes and the icon carries it, so
     the navbar keeps the logo, the quote button and the menu on one line. */
  @media (max-width: 560px) {
    padding-inline: 0;
    width: ${({ theme }) => theme.control.height};
    justify-content: center;

    span[data-label] {
      display: none;
    }
  }
`;

export const CountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 1.25rem;
  height: 1.25rem;
  padding-inline: 0.3125rem;

  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.lime};
  color: ${({ theme }) => theme.colors.moss};

  font-size: 0.6875rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

export const LanguageContainer = styled.div`
  position: relative;

  @media (max-width: 560px) {
    display: none;
  }
`;

export const LanguageButton = styled.button<{ $isOpen: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.3125rem;

  height: ${({ theme }) => theme.control.height};
  padding-inline: 0.875rem;

  border: 1px solid
    ${({ $isOpen, theme }) =>
      $isOpen ? theme.colors.brandGreen : "transparent"};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ $isOpen, theme }) =>
    $isOpen ? theme.colors.hoverGreen : "transparent"};
  color: ${({ theme }) => theme.colors.dark};

  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;

  transition: background-color 0.18s ease, border-color 0.18s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.hoverGreen};
  }

  svg {
    flex-shrink: 0;
    transition: transform 0.18s ease;
    transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
  }
`;

export const DropdownMenu = styled(motion.ul)`
  position: absolute;
  top: calc(100% + 0.375rem);
  right: 0;
  z-index: 20;

  min-width: 6rem;
  padding: 0.25rem;
  list-style: none;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 0.625rem;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

export const DropdownItem = styled.li<{ $active: boolean }>`
  display: flex;
  align-items: center;

  height: 2.25rem;
  padding-inline: 0.75rem;
  border-radius: ${({ theme }) => theme.radii.field};

  font-size: 0.875rem;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;

  color: ${({ $active, theme }) =>
    $active ? theme.colors.white : theme.colors.dark};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.brandGreen : "transparent"};

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.brandGreen : theme.colors.hoverGreen};
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(10, 42, 53, 0.45);
  z-index: 1000;
`;

export const BudgetDrawer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: min(32rem, 100%);
  height: 100dvh;
  z-index: 1001;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.paper};
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  h2 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 1.375rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

export const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 2.5rem;
  height: 2.5rem;

  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.white};
  }
`;

export const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.5rem 1.5rem;
`;
