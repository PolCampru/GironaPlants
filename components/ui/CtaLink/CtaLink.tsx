"use client";

import Link from "next/link";
import styled, { css } from "styled-components";

type CtaVariant = "solid" | "outline" | "light";

// Pill-shaped call-to-action link. The main conversion element of the site:
// use "solid" for the primary action, "outline" for secondary actions and
// "light" on dark backgrounds.
const CtaLink = styled(Link)<{ $variant?: CtaVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  padding: 0.9rem 1.75rem;
  border-radius: 62.5rem;

  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;

  transition: transform 0.2s ease, background-color 0.2s ease,
    color 0.2s ease, box-shadow 0.2s ease;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    transform: translateY(-2px);

    svg {
      transform: translateX(4px);
    }
  }

  &:active {
    transform: translateY(0);
  }

  ${({ $variant = "solid", theme }) => {
    switch ($variant) {
      case "outline":
        return css`
          color: ${theme.colors.brandGreen};
          border: 2px solid ${theme.colors.brandGreen};
          background: transparent;

          &:hover {
            background: ${theme.colors.hoverGreen};
          }
        `;
      case "light":
        return css`
          color: ${theme.colors.moss};
          background: ${theme.colors.white};

          &:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          }
        `;
      default:
        return css`
          color: ${theme.colors.white};
          background: ${theme.colors.brandGreen};

          &:hover {
            background: ${theme.colors.hoverGreen2};
            box-shadow: 0 8px 24px rgba(17, 139, 80, 0.3);
          }
        `;
    }
  }}
`;

export default CtaLink;
