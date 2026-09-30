"use client";

import styled from "styled-components";

/** Google's own star yellow — recognisable as "Google rating" at a glance. */
const STAR = "#FBBC04";
export const STAR_GAP = 2;

export const ReviewsLayout = styled.div`
  display: grid;
  grid-template-columns: 19rem minmax(0, 1fr);
  gap: 1.25rem;
  margin-top: 2.25rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.75rem;
  border-radius: ${({ theme }) => theme.radii.card};
  background: ${({ theme }) => theme.colors.lightGreen};

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 1.25rem;
  }
`;

export const GoogleTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};

  @media (max-width: 900px) {
    grid-column: 1 / -1;
  }
`;

export const RatingValue = styled.strong`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 4rem;
  font-weight: 500;
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.dark};
  font-variant-numeric: tabular-nums;
`;

export const RatingMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const RatingCount = styled.span`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const SummaryActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.875rem;
  margin-top: auto;
  padding-top: 0.5rem;

  @media (max-width: 900px) {
    grid-column: 1 / -1;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
`;

export const TextLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.greenDeep};
  text-decoration: underline;
  text-underline-offset: 0.2em;
  text-decoration-thickness: 1px;

  &:hover {
    color: ${({ theme }) => theme.colors.brandGreen};
  }
`;

export const StarRow = styled.span<{ $size: number }>`
  position: relative;
  display: inline-flex;
  gap: ${STAR_GAP}px;
  width: max-content;
  line-height: 0;
  color: ${({ theme }) => theme.colors.gray};

  svg {
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    flex-shrink: 0;
  }
`;

export const StarFill = styled.span`
  position: absolute;
  inset: 0 auto 0 0;
  display: inline-flex;
  gap: ${STAR_GAP}px;
  overflow: hidden;
  white-space: nowrap;
  color: ${STAR};
`;

export const Carousel = styled.div`
  position: relative;
  min-width: 0;
`;

export const Track = styled.ul`
  display: flex;
  gap: 1.25rem;
  height: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  list-style: none;
  padding: 0;
  margin: 0;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brandGreen};
    outline-offset: 4px;
    border-radius: ${({ theme }) => theme.radii.card};
  }

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
`;

export const ReviewCard = styled.li`
  flex: 0 0 calc((100% - 1.25rem) / 2);
  scroll-snap-align: start;

  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.card};

  @media (max-width: 1100px) and (min-width: 901px) {
    flex-basis: 85%;
  }

  @media (max-width: 560px) {
    flex-basis: 86%;
  }
`;

export const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const ReviewDate = styled.span`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Quote = styled.p`
  flex: 1;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.dark};

  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Translated = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 0.875rem;
  border-top: 1px solid ${({ theme }) => theme.colors.lineSoft};
`;

export const Avatar = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.lightGreen};
  color: ${({ theme }) => theme.colors.greenDeep};
  font-weight: 700;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Author = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;

  strong,
  a {
    font-size: 0.9375rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.dark};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.brandGreen};
  }
`;

export const ReadMore = styled.a`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.brandGreen};
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.greenDeep};
    text-decoration: underline;
  }
`;

export const Arrows = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const ArrowButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.control.height};
  height: ${({ theme }) => theme.control.height};
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;
  transition: border-color 0.18s ease, color 0.18s ease, opacity 0.18s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.brandGreen};
    color: ${({ theme }) => theme.colors.brandGreen};
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

export const EmptyPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.radii.panel};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};

  h2 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(1.75rem, 2.6vw, 2.125rem);
    font-weight: 400;
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.dark};
  }

  p {
    max-width: 36rem;
    font-size: 1.0625rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.muted};
  }

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.75rem;
    padding: 2rem 1.5rem;
  }
`;

export const EmptyText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;
