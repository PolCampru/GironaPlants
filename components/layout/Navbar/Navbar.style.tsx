"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";

export const NavShell = styled(motion.header)`
  position: fixed;
  inset-inline: 0;
  top: 0;
  z-index: 999;
`;

export const NavbarWrapper = styled.nav`
  height: var(--nav-height);
  width: 100%;
  max-width: calc(var(--content-max) + var(--gutter) * 2);
  margin-inline: auto;
  padding-inline: var(--gutter);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const NavBackdrop = styled.div`
  background-color: rgba(250, 247, 240, 0.9);
  backdrop-filter: saturate(140%) blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const MenuContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const NavItem = styled(Link)<{ $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  height: 2.5rem;
  padding-inline: 0.875rem;
  border-radius: ${({ theme }) => theme.radii.pill};

  font-size: 0.875rem;
  font-weight: ${({ $selected }) => ($selected ? 600 : 500)};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.greenDeep : theme.colors.dark};
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.lightGreen : "transparent"};

  transition: background-color 0.18s ease, color 0.18s ease;

  &:hover {
    background-color: ${({ $selected, theme }) =>
      $selected ? theme.colors.lightGreen : theme.colors.hoverGreen};
    color: ${({ theme }) => theme.colors.greenDeep};
  }
`;

export const RightContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const Hamburger = styled.button`
  display: none;

  width: 2.75rem;
  height: 2.75rem;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;

  @media (max-width: 1024px) {
    display: inline-flex;
  }
`;

export const MobileScrim = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(10, 42, 53, 0.45);
  z-index: 998;

  @media (min-width: 1025px) {
    display: none;
  }
`;

export const MobileMenu = styled(motion.nav)`
  position: fixed;
  top: var(--nav-height);
  inset-inline: 0;
  z-index: 999;

  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  padding: 1rem var(--gutter) 1.5rem;
  background-color: ${({ theme }) => theme.colors.paper};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  box-shadow: ${({ theme }) => theme.shadow.md};

  @media (min-width: 1025px) {
    display: none;
  }
`;

export const MobileItem = styled(Link)<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  min-height: 3rem;
  padding-inline: 1rem;
  border-radius: ${({ theme }) => theme.radii.field};

  font-size: 1rem;
  font-weight: ${({ $selected }) => ($selected ? 600 : 500)};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.greenDeep : theme.colors.dark};
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.lightGreen : "transparent"};
`;

/** Reserves the fixed navbar's height so page content starts below it. */
export const NavSpacer = styled.div`
  height: var(--nav-height);
`;
