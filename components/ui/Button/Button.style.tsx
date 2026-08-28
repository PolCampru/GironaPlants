"use client";

import styled, { css } from "styled-components";
import type { CtaSize, CtaVariant } from "@/components/ui/CtaLink/CtaLink";

/** Same visual language as CtaLink, for real <button> actions. */
export const StyledButton = styled.button<{
  $variant?: CtaVariant;
  $size?: CtaSize;
  $fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  ${({ $size = "lg", theme }) => css`
    height: ${$size === "lg" ? theme.control.heightLg : theme.control.height};
    padding-inline: ${$size === "lg" ? "1.625rem" : "1.25rem"};
    font-size: ${$size === "lg" ? "0.9375rem" : "0.875rem"};
  `}

  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-family: inherit;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;

  transition: background-color 0.18s ease, color 0.18s ease,
    border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;

  svg {
    flex-shrink: 0;
    transition: transform 0.18s ease;
  }

  &:hover:not(:disabled) svg {
    transform: translateX(3px);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover:not(:disabled) svg,
    &:active:not(:disabled) {
      transform: none;
    }
  }

  ${({ $variant = "solid", theme }) => {
    switch ($variant) {
      case "outline":
        return css`
          color: ${theme.colors.brandGreen};
          border: 1.5px solid ${theme.colors.brandGreen};
          background: transparent;

          &:hover:not(:disabled) {
            background: ${theme.colors.hoverGreen};
            border-color: ${theme.colors.greenDeep};
            color: ${theme.colors.greenDeep};
          }
        `;
      case "light":
        return css`
          color: ${theme.colors.moss};
          background: ${theme.colors.white};

          &:hover:not(:disabled) {
            box-shadow: ${theme.shadow.lg};
          }
        `;
      case "ghost":
        return css`
          color: ${theme.colors.dark};
          background: ${theme.colors.white};
          border: 1px solid ${theme.colors.line};

          &:hover:not(:disabled) {
            border-color: ${theme.colors.brandGreen};
            color: ${theme.colors.brandGreen};
          }
        `;
      default:
        return css`
          color: ${theme.colors.white};
          background: ${theme.colors.brandGreen};

          &:hover:not(:disabled) {
            background: ${theme.colors.greenDeep};
            box-shadow: ${theme.shadow.md};
          }
        `;
    }
  }}
`;
