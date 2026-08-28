"use client";

import styled from "styled-components";

export const StatsPanel = styled.div`
  background-color: ${({ theme }) => theme.colors.moss};
  border-radius: ${({ theme }) => theme.radii.panel};
  padding: 2.5rem 3rem;

  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 2rem 1.75rem;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  strong {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 2.125rem;
    font-weight: 500;
    line-height: 1.05;
    color: ${({ theme }) => theme.colors.lime};
    font-variant-numeric: tabular-nums;
  }

  span {
    font-size: 0.875rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.72);
  }
`;
