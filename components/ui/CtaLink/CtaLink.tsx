"use client";

import Link from "next/link";
import styled, { css } from "styled-components";

export type CtaVariant = "solid" | "outline" | "light" | "ghost";
export type CtaSize = "md" | "lg";

/**
 * Pill-shaped call-to-action link — the main conversion element of the site.
 * "solid" for the primary action, "outline" for secondary, "light" on dark
 * backgrounds, "ghost" for low-emphasis actions on cards.
 */
const CtaLink = styled(Link)<{ $variant?: CtaVariant; $size?: CtaSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${({ $size = "lg", theme }) => css`
    height: ${$size === "lg" ? theme.control.heightLg : theme.control.height};
    padding-inline: ${$size === "lg" ? "1.625rem" : "1.25rem"};
    font-size: ${$size === "lg" ? "0.9375rem" : "0.875rem"};
  `}

  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;

  transition: background-color 0.18s ease, color 0.18s ease,
    border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;

  svg {
    flex-shrink: 0;
    transition: transform 0.18s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover svg,
    &:active {
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

          &:hover {
            background: ${theme.colors.hoverGreen};
            border-color: ${theme.colors.greenDeep};
            color: ${theme.colors.greenDeep};
          }
        `;
      case "light":
        return css`
          color: ${theme.colors.moss};
          background: ${theme.colors.white};

          &:hover {
            box-shadow: ${theme.shadow.lg};
          }
        `;
      case "ghost":
        return css`
          color: ${theme.colors.dark};
          background: ${theme.colors.white};
          border: 1px solid ${theme.colors.line};

          &:hover {
            border-color: ${theme.colors.brandGreen};
            color: ${theme.colors.brandGreen};
          }
        `;
      default:
        return css`
          color: ${theme.colors.white};
          background: ${theme.colors.brandGreen};

          /* Darkens on hover. The old token was translucent green, which made
             the button *lighter* than at rest and read as disabled. */
          &:hover {
            background: ${theme.colors.greenDeep};
            box-shadow: ${theme.shadow.md};
          }
        `;
    }
  }}
`;

export default CtaLink;
