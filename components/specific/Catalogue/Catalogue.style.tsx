"use client";

import Link from "next/link";
import styled from "styled-components";

export const PageWrapper = styled.div`
  padding-top: 3.5rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding-top: 2.5rem;
  }
`;

export const CrumbNav = styled.nav`
  margin-bottom: 1.5rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const CrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const CrumbItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::after {
    content: "/";
    color: ${({ theme }) => theme.colors.gray};
  }

  &:last-child::after {
    content: none;
  }

  a {
    color: ${({ theme }) => theme.colors.muted};

    &:hover {
      color: ${({ theme }) => theme.colors.brandGreen};
    }
  }
`;

export const CrumbCurrent = styled.span`
  color: ${({ theme }) => theme.colors.dark};
  font-weight: 600;
`;

/** Facts pulled straight from the catalogue rows, under the page heading. */
export const StatRow = styled.dl`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1.75rem 0 0;
`;

export const Stat = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  padding: 0.5rem 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.white};
  font-size: 0.8125rem;

  dt {
    color: ${({ theme }) => theme.colors.muted};
  }

  dd {
    margin: 0;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

export const Block = styled.section`
  margin-top: 3.5rem;

  @media (max-width: 768px) {
    margin-top: 2.5rem;
  }
`;

/**
 * The reference table is the substance of these pages, so it is plain
 * server-rendered HTML — no tanstack, no client fetch. It only ever scrolls
 * inside its own box; the page itself must never scroll sideways.
 */
export const TableScroll = styled.div`
  margin-top: 1.5rem;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.card};
  background: ${({ theme }) => theme.colors.white};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;

  th,
  td {
    padding: 0.875rem 1.125rem;
    text-align: left;
    white-space: nowrap;
  }

  thead th {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.muted};
    border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  }

  tbody tr + tr td {
    border-top: 1px solid ${({ theme }) => theme.colors.lineSoft};
  }

  tbody tr:hover td {
    background: ${({ theme }) => theme.colors.paper};
  }

  td a {
    color: ${({ theme }) => theme.colors.dark};
    font-style: italic;

    &:hover {
      color: ${({ theme }) => theme.colors.brandGreen};
    }
  }

  .price {
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }

  .action {
    width: 1%;
    text-align: right;
  }
`;

export const TableNote = styled.p`
  margin: 0.875rem 0 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted};
`;

/** Species links on a genus page — the main crawl path down the catalogue. */
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 0.875rem;
  margin-top: 1.5rem;
`;

export const SpeciesCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem 1.125rem;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.card};
  background: ${({ theme }) => theme.colors.white};
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandGreen};
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }

  strong {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 1.0625rem;
    font-weight: 500;
    font-style: italic;
    color: ${({ theme }) => theme.colors.dark};
  }

  span {
    font-size: 0.8125rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

/** Genus chips — neighbours at the foot of a genus page, and the A-Z index. */
export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.25rem;
`;

export const Chip = styled(Link)`
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  padding: 0.4rem 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.white};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.dark};
  transition: border-color 0.18s ease, color 0.18s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandGreen};
    color: ${({ theme }) => theme.colors.brandGreen};
  }

  small {
    color: ${({ theme }) => theme.colors.mediumGray};
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
  }
`;

export const CtaPanel = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 4rem;
  padding: 2rem 2.25rem;
  border-radius: ${({ theme }) => theme.radii.panel};
  background: ${({ theme }) => theme.colors.moss};
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: 768px) {
    margin-top: 3rem;
    padding: 1.75rem 1.5rem;
  }
`;

export const CtaText = styled.div`
  max-width: 34rem;

  h2 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(1.5rem, 2.4vw, 1.875rem);
    font-weight: 400;
    line-height: 1.15;
  }

  p {
    margin-top: 0.625rem;
    font-size: 0.9375rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.78);
  }
`;

export const CtaActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

/** A-Z index sections on the catalogue page. */
export const IndexGroup = styled.div`
  margin-top: 2rem;
`;

export const IndexLetter = styled.h3`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.brandGreen};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  padding-bottom: 0.4rem;
`;

/**
 * Secondary action on the dark panel. CtaLink's "outline" variant is brand
 * green on a transparent ground, which on moss is barely legible — the only
 * variant meant for this panel is "light".
 */
export const CtaSecondary = styled(Link)`
  display: inline-flex;
  align-items: center;
  height: ${({ theme }) => theme.control.heightLg};
  padding-inline: 1.25rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 0;

  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.white};
  }
`;
