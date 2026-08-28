"use client";

import styled from "styled-components";

export const StepGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 2.25rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const StepCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  padding: 1.75rem;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.card};

  h3 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 1.375rem;
    font-weight: 500;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.dark};
  }

  p {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const StepTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StepIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.lightGreen};
  color: ${({ theme }) => theme.colors.greenDeep};
`;

export const StepNumber = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 1;
  color: ${({ theme }) => theme.colors.line};
  font-variant-numeric: tabular-nums;
`;
