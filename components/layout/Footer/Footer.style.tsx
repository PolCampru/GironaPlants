"use client";

import styled from "styled-components";
import Link from "next/link";

export const FooterOuter = styled.footer`
  background-color: ${({ theme }) => theme.colors.moss};
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ theme }) => theme.space.section};

  @media (max-width: 768px) {
    margin-top: ${({ theme }) => theme.space.sectionSm};
  }
`;

export const FooterInner = styled.div`
  width: 100%;
  max-width: calc(var(--content-max) + var(--gutter) * 2);
  margin-inline: auto;
  padding: 4rem var(--gutter) 1.75rem;

  @media (max-width: 768px) {
    padding-top: 2.5rem;
  }
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.3fr;
  gap: 3rem;
  padding-bottom: 2.75rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const BrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    font-size: 0.875rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.62);
    max-width: 19rem;
  }

  img {
    /* The logo is dark-on-transparent; the footer is dark. */
    filter: brightness(0) invert(1);
    opacity: 0.95;
  }
`;

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ColumnTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.body};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.lime};
`;

export const FooterLink = styled(Link)`
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.72);
  transition: color 0.18s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const ContactLink = styled.a`
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.white};
  transition: color 0.18s ease;
  overflow-wrap: anywhere;

  &:hover {
    color: ${({ theme }) => theme.colors.lime};
  }
`;

export const FooterNote = styled.p`
  font-size: 0.875rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.62);
`;

export const BottomBar = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  padding-top: 1.375rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;

  p {
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const LocaleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const LocaleLink = styled(Link)<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  height: 1.875rem;
  padding-inline: 0.75rem;
  border-radius: ${({ theme }) => theme.radii.pill};

  font-size: 0.75rem;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  text-transform: uppercase;
  color: ${({ $active }) =>
    $active ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)"};
  background-color: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.12)" : "transparent"};

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;
