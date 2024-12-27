"use client";
import styled from "styled-components";
import { motion } from "framer-motion";

export const NavbarWrapper = styled.nav`
  width: 100%;
  height: 4.875rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-inline: 2.4rem;

  position: fixed;
  top: 1rem;

  background-color: ${(props) => props.theme.colors.white};
  z-index: 100;
`;

export const LogoContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const MenuContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;

  border-radius: 6.25rem;
  background-color: ${(props) => props.theme.colors.creamLight};
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
`;
