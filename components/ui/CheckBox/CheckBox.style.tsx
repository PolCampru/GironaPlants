"use client";

import styled, { css } from "styled-components";

type Size = "small" | "medium" | "large";

const boxSize: Record<Size, string> = {
  small: "1rem",
  medium: "1.25rem",
  large: "1.5rem",
};

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  /* The whole row is the target, so it clears 44px even though the box
     itself is 20px. */
  min-height: 2.25rem;
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  margin: 0;

  /* Keyboard focus has to be visible on the styled box, not the hidden one. */
  &:focus-visible + span {
    outline: 2px solid ${({ theme }) => theme.colors.brandGreen};
    outline-offset: 2px;
  }
`;

export const StyledCheckbox = styled.span<{
  $checked: boolean;
  $error: boolean;
  $size: Size;
}>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: ${({ $size }) => boxSize[$size]};
  height: ${({ $size }) => boxSize[$size]};
  border-radius: ${({ theme }) => theme.radii.field};

  transition: background-color 0.15s ease, border-color 0.15s ease;

  ${({ $checked, $error, theme }) =>
    $checked
      ? css`
          background: ${theme.colors.brandGreen};
          border: 1.5px solid ${theme.colors.brandGreen};
          color: ${theme.colors.white};
        `
      : css`
          background: ${theme.colors.white};
          border: 1.5px solid
            ${$error ? theme.colors.danger : theme.colors.gray};
          color: transparent;
        `}
`;

export const LabelText = styled.span<{ $error: boolean; $size: Size }>`
  font-size: ${({ $size }) => ($size === "small" ? "0.8125rem" : "0.875rem")};
  line-height: 1.4;
  color: ${({ $error, theme }) =>
    $error ? theme.colors.danger : theme.colors.dark};
`;
