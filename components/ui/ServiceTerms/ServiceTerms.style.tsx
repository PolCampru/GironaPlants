"use client";

import styled from "styled-components";

export const TermsPanel = styled.div`
  padding: 2.5rem;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.panel};

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const TermsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const TermItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    margin-top: 0.375rem;
    font-family: ${({ theme }) => theme.font.display};
    font-size: 1.25rem;
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

export const TermIcon = styled.span<{ $compact?: boolean }>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ $compact }) => ($compact ? "2.125rem" : "2.75rem")};
  height: ${({ $compact }) => ($compact ? "2.125rem" : "2.75rem")};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.lightGreen};
  color: ${({ theme }) => theme.colors.greenDeep};
`;

/**
 * The private-buyer note. Warm ground, no warning colour: being told "not
 * us" should still read as help, not as a rejection.
 */
export const ParticularNote = styled.div<{ $compact?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  margin-top: ${({ $compact }) => ($compact ? "1rem" : "2rem")};
  padding: ${({ $compact }) => ($compact ? "0.875rem 1rem" : "1.125rem 1.375rem")};
  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.card};

  svg {
    flex-shrink: 0;
    margin-top: 0.125rem;
    color: ${({ theme }) => theme.colors.brandGreen};
  }

  p {
    font-size: ${({ $compact }) => ($compact ? "0.8125rem" : "0.9375rem")};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.muted};
  }

  strong {
    color: ${({ theme }) => theme.colors.dark};
    font-weight: 700;
  }
`;

export const CompactPanel = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.panel};

  h2 {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.greenDeep};
  }
`;

export const CompactList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-top: 1rem;
  list-style: none;
  padding: 0;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  span {
    font-size: 0.8125rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.muted};
  }

  strong {
    display: block;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.dark};
  }
`;
