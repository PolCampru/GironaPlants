"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const PlantsWrapper = styled.div`
  padding-top: 2.75rem;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

export const PageHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2.5rem;

  h1 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(2rem, 3.6vw, 2.75rem);
    font-weight: 400;
    line-height: 1.06;
    letter-spacing: -0.015em;
    color: ${({ theme }) => theme.colors.dark};
    font-variant-numeric: tabular-nums;
  }

  p {
    font-size: 1rem;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.muted};
    max-width: 38rem;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }
`;

export const HeadText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

export const HeadAside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;

  span {
    font-size: 0.8125rem;
    color: ${({ theme }) => theme.colors.muted};
  }

  @media (max-width: 900px) {
    align-items: flex-start;
  }
`;

export const ContainerGlobal = styled.div`
  display: grid;
  grid-template-columns: 16.75rem 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

/** Desktop filter rail. Sticky so it stays reachable down a long table. */
export const ContainerFilters = styled.div`
  position: sticky;
  top: calc(var(--nav-height) + 1rem);

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  padding: 1.375rem;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.card};

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const FiltersHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  p {
    display: inline-flex;
    align-items: center;
    gap: 0.5625rem;
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.dark};

    svg {
      color: ${({ theme }) => theme.colors.brandGreen};
    }
  }
`;

export const ClearButton = styled.button`
  background: none;
  border: 0;
  padding: 0;

  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.brandGreen};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.greenDeep};
    text-decoration: underline;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.mediumGray};
    cursor: default;
    text-decoration: none;
  }
`;

export const ContainerProducts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  min-width: 0;
`;

export const ResultsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  flex-wrap: wrap;
`;

export const ResultsCount = styled.p`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};

  span {
    font-variant-numeric: tabular-nums;
  }

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 500;
  }
`;

export const SortSelect = styled.select`
  height: 2.5rem;
  padding-inline: 0.9375rem 2rem;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.pill};

  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;

  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #635c55 50%),
    linear-gradient(135deg, #635c55 50%, transparent 50%);
  background-position: calc(100% - 1.0625rem) 1.125rem,
    calc(100% - 0.75rem) 1.125rem;
  background-size: 0.3125rem 0.3125rem, 0.3125rem 0.3125rem;
  background-repeat: no-repeat;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandGreen};
  }
`;

export const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.line};
`;

/** Opens the filter drawer below 1024px. */
export const FilterToggleButton = styled.button`
  display: none;
  align-items: center;
  gap: 0.5rem;

  height: ${({ theme }) => theme.control.height};
  padding-inline: 1.125rem;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.pill};

  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;

  @media (max-width: 1024px) {
    display: inline-flex;
  }
`;

export const ActiveDot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding-inline: 0.3125rem;

  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.brandGreen};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.6875rem;
  font-weight: 700;
`;

export const FilterOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(10, 42, 53, 0.45);
  z-index: 998;

  @media (min-width: 1025px) {
    display: none;
  }
`;

export const FilterMenuMobile = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: min(21rem, 88%);
  height: 100dvh;
  z-index: 999;

  background-color: ${({ theme }) => theme.colors.paper};
  box-shadow: ${({ theme }) => theme.shadow.lg};

  @media (min-width: 1025px) {
    display: none;
  }
`;

export const FilterContent = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 1.25rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const DrawerHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  p {
    font-size: 1.0625rem;
    font-weight: 700;
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
`;
