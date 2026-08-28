"use client";

import styled from "styled-components";

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FiltersTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.body};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 0.25rem;
`;

export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SeeAllButton = styled.button`
  align-self: flex-start;
  margin-top: 0.25rem;

  background: none;
  border: 0;
  padding: 0;

  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.brandGreen};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
