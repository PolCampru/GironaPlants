"use client";

import styled from "styled-components";

export const HeadingBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 41rem;
`;

export const HeadingLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

export const HeadingTitle = styled.h2<{ $size: "md" | "lg" }>`
  font-family: ${({ theme }) => theme.font.display};
  font-size: ${({ $size }) =>
    $size === "lg" ? "clamp(2rem, 3.4vw, 2.625rem)" : "clamp(1.75rem, 2.6vw, 2.125rem)"};
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.012em;
  color: ${({ theme }) => theme.colors.dark};
`;

export const HeadingLead = styled.p`
  font-size: 1.0625rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 34rem;
`;

export const HeadingRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 3rem;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
`;
