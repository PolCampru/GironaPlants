"use client";

import styled from "styled-components";

export const FilterToggleWrapper = styled.div`
  display: inline-flex;
  align-self: flex-start;
  padding: 0.25rem;

  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.pill};
`;

export const ToggleOption = styled.button<{ $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 2.5rem;
  padding-inline: 1.375rem;

  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};

  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;

  transition: background-color 0.18s ease, color 0.18s ease;

  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.moss : "transparent"};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.white : theme.colors.muted};

  &:hover {
    color: ${({ $selected, theme }) =>
      $selected ? theme.colors.white : theme.colors.dark};
  }
`;
