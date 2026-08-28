"use client";

import styled, { css } from "styled-components";
import Link from "next/link";

export const PlantsGrid = styled.div`
  display: grid;
  /* Eight cells: seven genera plus the "can't find it?" card. Four and two
     columns both divide evenly; three would leave a ragged last row. */
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 2.5rem;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 0.875rem;
  }
`;

const cardBase = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  height: 16.25rem;
  padding: 1.375rem;

  border-radius: ${({ theme }) => theme.radii.card};
  overflow: hidden;

  transition: transform 0.22s ease, box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

export const PlantCard = styled(Link)`
  ${cardBase};
  background-color: ${({ theme }) => theme.colors.moss};

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Scrim so the title keeps 4.5:1 whatever the photograph does. */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(10, 42, 53, 0) 36%,
      rgba(10, 42, 53, 0.86) 100%
    );
  }
`;

export const CardBody = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.875rem;
`;

export const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  h3 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 1.4375rem;
    font-weight: 500;
    line-height: 1.15;
    color: ${({ theme }) => theme.colors.white};
  }

  p {
    font-size: 0.875rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.78);

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const CardArrow = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 2.375rem;
  height: 2.375rem;
  border-radius: ${({ theme }) => theme.radii.pill};

  background-color: ${({ theme }) => theme.colors.brandGreen};
  color: ${({ theme }) => theme.colors.white};

  transition: transform 0.22s ease;

  ${PlantCard}:hover & {
    transform: translateX(3px);
  }
`;

/** Last cell of the grid: the "we'll source it" prompt. */
export const AskCard = styled.div`
  height: 16.25rem;
  padding: 1.5rem;

  border-radius: ${({ theme }) => theme.radii.card};
  background-color: ${({ theme }) => theme.colors.lightGreen};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  h3 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 1.4375rem;
    font-weight: 500;
    line-height: 1.15;
    color: ${({ theme }) => theme.colors.moss};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.875rem;
    line-height: 1.55;
    color: #3b4f45;
  }
`;
