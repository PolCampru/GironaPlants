"use client";

import styled, { css } from "styled-components";

export const Field = styled.div<{ $span?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.4375rem;
  grid-column: ${({ $span }) => ($span ? "1 / -1" : "auto")};
`;

export const FieldLabel = styled.label<{ $error: boolean }>`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ $error, theme }) =>
    $error ? theme.colors.danger : theme.colors.dark};

  span[data-required] {
    color: ${({ theme }) => theme.colors.danger};
    margin-left: 0.125rem;
  }
`;

const control = css<{ $error: boolean }>`
  width: 100%;
  padding: 0 1rem;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid
    ${({ $error, theme }) => ($error ? theme.colors.danger : theme.colors.line)};
  border-radius: ${({ theme }) => theme.radii.field};

  font-family: inherit;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.dark};

  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mediumGray};
  }

  &:focus {
    outline: none;
    border-color: ${({ $error, theme }) =>
      $error ? theme.colors.danger : theme.colors.brandGreen};
    box-shadow: ${({ $error, theme }) =>
      $error ? "0 0 0 3px rgba(194, 65, 12, 0.14)" : theme.shadow.ring};
  }
`;

export const Input = styled.input<{ $error: boolean }>`
  ${control};
  height: ${({ theme }) => theme.control.heightLg};
`;

export const TextArea = styled.textarea<{ $error: boolean }>`
  ${control};
  min-height: 8.25rem;
  padding-block: 0.875rem;
  line-height: 1.55;
  resize: vertical;
`;

export const ErrorText = styled.p`
  display: flex;
  align-items: center;
  gap: 0.375rem;

  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.danger};

  svg {
    flex-shrink: 0;
  }
`;
