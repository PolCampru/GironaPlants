"use client";

import styled from "styled-components";
import Link from "next/link";

/**
 * The drawer body.
 *
 * Before: `height: 100vh` inside a `100dvh` drawer, with `justify-content:
 * space-between` and a list that carried its own `68vh/…/50vh` scroll box —
 * two scrollbars, and a call to action that could sit below the fold. Now the
 * list scrolls and the footer is pinned outside it.
 */
export const DrawerLayout = styled.div`
  height: 100%;
  min-height: 0;

  display: flex;
  flex-direction: column;
`;

export const DrawerScroll = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 1.25rem 1.5rem 1.5rem;

  @media (max-width: 480px) {
    padding: 1rem 1.125rem 1.25rem;
  }
`;

export const DrawerFooter = styled.div`
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  gap: 0.875rem;

  padding: 1.125rem 1.5rem 1.5rem;
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.line};

  .totals {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;

    strong {
      font-size: 0.9375rem;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      color: ${({ theme }) => theme.colors.dark};
    }

    span {
      font-size: 0.8125rem;
      color: ${({ theme }) => theme.colors.muted};
    }
  }

  @media (max-width: 480px) {
    padding: 1rem 1.125rem 1.25rem;
  }
`;

const cta = `
  display: flex;
  width: 100%;
  height: 3.25rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border: 0;
  border-radius: 62.5rem;

  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 700;
`;

export const ContinueLink = styled(Link)`
  ${cta}

  background-color: ${({ theme }) => theme.colors.brandGreen};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  transition: background-color 0.18s ease, box-shadow 0.18s ease,
    transform 0.18s ease;

  svg {
    transition: transform 0.18s ease;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.greenDeep};
    box-shadow: ${({ theme }) => theme.shadow.md};
    color: ${({ theme }) => theme.colors.white};

    svg {
      transform: translateX(3px);
    }
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
`;

/** An empty quote can't go anywhere, so the action is genuinely disabled
 *  instead of filled grey — grey read as broken, not as unavailable. */
export const ContinueDisabled = styled.button`
  ${cta}

  background-color: ${({ theme }) => theme.colors.brandGreen};
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.45;
  cursor: not-allowed;
`;

export const AddManually = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted};

  button {
    background: none;
    border: 0;
    padding: 0;

    font-family: inherit;
    font-size: 0.8125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.greenDeep};
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.brandGreen};
    }
  }
`;
