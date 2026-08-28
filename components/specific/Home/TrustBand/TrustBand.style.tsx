"use client";

import styled from "styled-components";

export const TrustBandWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.moss};
  padding-block: 2.125rem;
`;

export const TrustBandInner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1875rem;

  strong {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.lime};
    font-variant-numeric: tabular-nums;
  }

  span {
    font-size: 0.875rem;
    line-height: 1.45;
    color: rgba(255, 255, 255, 0.72);
  }

  @media (max-width: 560px) {
    strong {
      font-size: 1.625rem;
    }
  }
`;
