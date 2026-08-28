"use client";

import styled from "styled-components";

export const BudgetScreenWrapper = styled.div`
  padding-top: 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;

  @media (max-width: 768px) {
    padding-top: 2.5rem;
  }
`;

export const FlexContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 1.75rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const BudgetContainer = styled.div`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.panel};

  @media (max-width: 768px) {
    padding: 1.125rem;
  }
`;

export const ContactContainer = styled.div`
  min-width: 0;
`;
