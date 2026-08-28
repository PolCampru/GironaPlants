"use client";

import styled from "styled-components";

/**
 * The empty quote.
 *
 * Before: a 400×400 PNG stretched to 50–80% of a 68vh box with a bare <h3>
 * under it, and nothing to click — the one screen where the visitor most
 * needs a way out had no way out.
 */
export const EmptyWrapper = styled.div<{ $compact: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ $compact }) => ($compact ? "0.875rem" : "1.25rem")};

  padding: ${({ $compact }) => ($compact ? "3rem 1.5rem" : "3rem 2.5rem 2.75rem")};

  h3 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: ${({ $compact }) => ($compact ? "1.3125rem" : "1.75rem")};
    font-weight: ${({ $compact }) => ($compact ? 500 : 400)};
    line-height: 1.15;
    letter-spacing: -0.012em;
    color: ${({ theme }) => theme.colors.dark};
  }

  p {
    font-size: ${({ $compact }) => ($compact ? "0.875rem" : "1rem")};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.muted};
    max-width: 26rem;
    text-wrap: pretty;
  }

  svg[data-illustration] {
    height: auto;
    max-width: 100%;
  }

  @media (max-width: 640px) {
    padding: 2.5rem 1.25rem;
  }
`;

export const EmptyText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
`;

export const EmptyActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;

  .primary,
  .secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: ${({ theme }) => theme.control.heightLg};
    padding-inline: 1.5rem;
    border-radius: ${({ theme }) => theme.radii.pill};

    font-family: inherit;
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;

    transition: background-color 0.18s ease, color 0.18s ease,
      border-color 0.18s ease, box-shadow 0.18s ease;
  }

  .primary {
    background: ${({ theme }) => theme.colors.brandGreen};
    border: 0;
    color: ${({ theme }) => theme.colors.white};
    padding-inline: 1.625rem;

    &:hover {
      background: ${({ theme }) => theme.colors.greenDeep};
      box-shadow: ${({ theme }) => theme.shadow.md};
    }
  }

  .secondary {
    background: transparent;
    border: 1.5px solid ${({ theme }) => theme.colors.brandGreen};
    color: ${({ theme }) => theme.colors.brandGreen};

    &:hover {
      background: ${({ theme }) => theme.colors.hoverGreen};
      border-color: ${({ theme }) => theme.colors.greenDeep};
      color: ${({ theme }) => theme.colors.greenDeep};
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;

    .primary,
    .secondary {
      width: 100%;
    }
  }
`;
