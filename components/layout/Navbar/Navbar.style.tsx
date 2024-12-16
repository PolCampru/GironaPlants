"use client";
import styled from "styled-components";

export const NavbarWrapper = styled.nav`
  width: 100%;
  height: 5rem;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 1.5rem;
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
`;

export const NavItem = styled.a<{ selected: boolean }>`
  color: ${(props) => props.theme.colors.dark};
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.selected ? undefined : props.theme.colors.hoverGreen};
  }

  ${(props) =>
    props.selected &&
    `
    background-color: ${props.theme.colors.brandGreen};
    color: ${props.theme.colors.white};
  `}
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  padding: 0.5rem 1rem;
  border-radius: 30px;
`;
