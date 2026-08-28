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
