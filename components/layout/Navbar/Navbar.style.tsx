"use client";
import styled from "styled-components";

export const NavbarWrapper = styled.nav`
  width: 100%;
  height: 5rem;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 1rem;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const MenuContainer = styled.div`
  display: flex;
  gap: 1rem;
  background-color: ${(props) => props.theme.colors.creamLight};
  padding: 0.5rem 1rem;
  border-radius: 30px;
`;

export const NavItem = styled.a<{ active?: boolean; highlight?: boolean }>`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.dark};
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: background-color 0.3s;

  ${(props) =>
    props.active &&
    `
    background-color: ${props.theme.colors.hoverGreen};
    font-weight: 600;
  `}

  ${(props) =>
    props.highlight &&
    `
    background-color: ${props.theme.colors.brandGreen};
    color: ${props.theme.colors.white};
    font-weight: 600;
  `}

  &:hover {
    background-color: ${(props) =>
      props.highlight
        ? props.theme.colors.brandGreen
        : props.theme.colors.hoverGreen};
  }
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  padding: 0.5rem 1rem;
  border-radius: 30px;
`;

export const CartIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LanguageSelector = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.dark};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  span {
    font-size: 0.7rem;
  }
`;
