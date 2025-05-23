"use client";
import styled from "styled-components";
import { motion } from "framer-motion";

export const NavbarWrapper = styled.nav`
  width: 100%;
  height: 6.875rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 2.4rem;
  padding-top: 1rem;
  position: fixed;
  top: 0;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 100;
`;

export const LogoContainer = styled.div`
  height: 100%;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 475px) {
    width: 30%;
  }
`;

export const MenuContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;
  border-radius: 6.25rem;
  background-color: ${(props) => props.theme.colors.creamLight};

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const NavItem = styled(motion.div)<{ selected: boolean }>`
  height: 2.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  position: relative;
  z-index: 10;
  border-radius: 6.25rem;

  a {
    border-radius: 6.25rem;
    padding: 0.8125rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.dark};
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: ${(props) => props.theme.colors.hoverGreen};
    }
  }

  ${(props) =>
    props.selected &&
    `
    a {
      color: ${props.theme.colors.white};
    }
  `}
`;

export const SelectedBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 6.25rem;
  background-color: ${(props) => props.theme.colors.brandGreen};
  z-index: -1;
`;

export const RightContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  border-radius: 6.25rem;
  background-color: ${(props) => props.theme.colors.creamLight};

  @media (max-width: 1024px) {
    gap: 0;
  }
`;

export const Hamburger = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 6.875rem;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  padding: 1rem 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 98;

  @media (min-width: 1024px) {
    display: none;
  }
`;
