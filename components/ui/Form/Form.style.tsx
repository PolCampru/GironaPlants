"use client";

import styled from "styled-components";

export const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;

  padding: 2.5rem;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.panel};

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const FormHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.muted};
    max-width: 39rem;
  }
`;

export const FormTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.875rem, 3vw, 2.375rem);
  font-weight: 400;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.dark};
`;

export const Label = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

/** Two columns on desktop; textarea/file/checkbox span both. */
export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const SubmitRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.125rem;
  flex-wrap: wrap;

  p {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

/**
 * Shown when the visitor says they are a particular: the catalogue prices are
 * trade prices, so they are not the figure a private order is quoted at.
 *
 * lightGreen ground rather than a warning colour — nothing has gone wrong,
 * and the danger palette next to a price would read as a penalty.
 */
export const PriceNotice = styled.div`
  /* Always rendered so it can announce; takes no room until it has text. */
  &:empty {
    display: none;
  }

  display: flex;
  align-items: flex-start;
  gap: 0.625rem;

  margin-top: -0.5rem;
  padding: 0.875rem 1rem;
  background: ${({ theme }) => theme.colors.lightGreen};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.card};

  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.dark};

  svg {
    flex-shrink: 0;
    margin-top: 0.0625rem;
    color: ${({ theme }) => theme.colors.greenDeep};
  }
`;
