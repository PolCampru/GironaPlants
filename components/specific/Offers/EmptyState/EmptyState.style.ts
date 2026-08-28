"use client";

import styled from "styled-components";

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;

  margin-top: 2.25rem;
  padding: 3rem 2.5rem;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.panel};

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

export const EmptyStateIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 3rem;
  height: 3rem;
  margin-bottom: 0.5rem;

  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.lightGreen};
  color: ${({ theme }) => theme.colors.greenDeep};
`;

export const EmptyStateTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 400;
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.dark};
`;

export const EmptyStateDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 34rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.75rem;
`;
