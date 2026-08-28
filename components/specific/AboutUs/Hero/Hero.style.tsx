"use client";

import styled from "styled-components";

export const HeroWrapper = styled.div`
  padding-top: 4.5rem;
  padding-bottom: 0;

  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding-top: 3rem;
  }
`;

export const ContainerData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;

  h1 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(2.25rem, 4.2vw, 3.5rem);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.018em;
    color: ${({ theme }) => theme.colors.dark};
  }

  p {
    font-size: 1.125rem;
    line-height: 1.65;
    color: #4a443e;
    max-width: 34rem;
  }
`;

export const Label = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

export const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.375rem;
`;

/**
 * Photo mosaic. The old version was a gapless 2x2 of square blocks that
 * collapsed to a 10rem strip on tablet and showed flat colour where Strapi
 * had no image.
 */
export const MediaMosaic = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 10.5rem);
  gap: 0.875rem;

  @media (max-width: 1024px) {
    grid-template-rows: repeat(3, 9rem);
  }

  @media (max-width: 560px) {
    grid-template-rows: repeat(3, 7rem);
    gap: 0.5rem;
  }
`;

export const MosaicTile = styled.div<{ $tall?: boolean }>`
  grid-row: ${({ $tall }) => ($tall ? "span 2" : "auto")};
  border-radius: ${({ theme }) => theme.radii.card};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.lightGreen};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MosaicStat = styled.div`
  border-radius: ${({ theme }) => theme.radii.card};
  background-color: ${({ theme }) => theme.colors.lightGreen};
  padding: 1.25rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.125rem;

  strong {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 2.125rem;
    font-weight: 500;
    line-height: 1;
    color: ${({ theme }) => theme.colors.greenDeep};
  }

  span {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.moss};
  }
`;
