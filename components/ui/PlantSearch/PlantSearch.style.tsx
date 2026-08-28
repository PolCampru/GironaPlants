"use client";

import styled from "styled-components";

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  width: 100%;
  max-width: 35rem;
  padding: 0.4375rem 0.4375rem 0.4375rem 1.25rem;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.pill};
  box-shadow: ${({ theme }) => theme.shadow.md};

  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.brandGreen};
    box-shadow: ${({ theme }) => theme.shadow.ring};
  }

  > svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 1.1875rem;
  }

  @media (max-width: 480px) {
    flex-wrap: wrap;
    border-radius: ${({ theme }) => theme.radii.panel};
    padding: 0.75rem;
    gap: 0.75rem;

    > svg {
      display: none;
    }
  }
`;

export const SearchInput = styled.input`
  flex: 1 1 8rem;
  min-width: 0;
  border: 0;
  background: transparent;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.dark};

  &::placeholder {
    color: ${({ theme }) => theme.colors.mediumGray};
  }

  /* The clear button browsers add to type=search collides with the pill. */
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 480px) {
    flex-basis: 100%;
    padding: 0.5rem 0.5rem 0;
  }
`;

export const SearchSubmit = styled.button`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: ${({ theme }) => theme.control.height};
  padding-inline: 1.5rem;

  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.brandGreen};
  color: ${({ theme }) => theme.colors.white};

  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;

  transition: background-color 0.18s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.greenDeep};
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const SuggestionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  max-width: 35rem;
`;

export const SuggestionsLabel = styled.span`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Suggestion = styled.button`
  display: inline-flex;
  align-items: center;
  height: 1.875rem;
  padding-inline: 0.8125rem;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.pill};

  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;

  transition: border-color 0.18s ease, color 0.18s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandGreen};
    color: ${({ theme }) => theme.colors.brandGreen};
  }
`;
