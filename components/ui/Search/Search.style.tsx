"use client";

import styled from "styled-components";

export const SearchField = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  > svg {
    position: absolute;
    left: 0.875rem;
    color: ${({ theme }) => theme.colors.muted};
    pointer-events: none;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: ${({ theme }) => theme.control.height};
  padding: 0 2.25rem 0 2.375rem;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.pill};

  font-family: inherit;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.dark};

  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.mediumGray};
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandGreen};
    box-shadow: ${({ theme }) => theme.shadow.ring};
  }
`;

export const ResetButton = styled.button`
  position: absolute;
  right: 0.5rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 1.625rem;
  height: 1.625rem;

  background: ${({ theme }) => theme.colors.lightGray};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.line};
    color: ${({ theme }) => theme.colors.dark};
  }
`;
