"use client";

import styled from "styled-components";

export const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2.25rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ClientCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  padding: 1.375rem 1.25rem;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.card};

  h3 {
    font-family: ${({ theme }) => theme.font.body};
    font-size: 0.9375rem;
    font-weight: 700;
    letter-spacing: 0;
    color: ${({ theme }) => theme.colors.dark};
  }

  p {
    font-size: 0.8125rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const ClientIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.625rem;
  height: 2.625rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.lightGreen};
  color: ${({ theme }) => theme.colors.greenDeep};
`;
