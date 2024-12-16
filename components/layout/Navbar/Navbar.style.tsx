"use client";
import styled from "styled-components";
import { motion } from "framer-motion";

export const NavbarWrapper = styled.nav`
  width: 100%;
  height: 5rem;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 1.5rem;
  position: fixed;
  top: 0;
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
  display: flex;
  background-color: ${(props) => props.theme.colors.creamLight};
  padding: 0.5rem;
  border-radius: 30px;
  position: relative;
`;

export const NavItem = styled(motion.div)<{ selected: boolean }>`
  position: relative;
  margin: 0 0.5rem;

  a {
    color: ${(props) => props.theme.colors.dark};
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    display: inline-block;
    position: relative;
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
      z-index: 150;
    }
  `}
`;

export const SelectedBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.brandGreen};
  z-index: 110;
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  padding: 0.5rem 1rem;
  border-radius: 30px;
`;
