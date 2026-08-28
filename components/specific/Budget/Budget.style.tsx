"use client";

import styled from "styled-components";

/**
 * The quote list, shared by /budget and the navbar drawer.
 *
 * What changed: the list no longer lives in a fixed 68vh/64vh/60vh/50vh box
 * with its own scrollbar (which left a half-empty panel with two lines in it
 * and a nested scroll with twenty). Rows flow; the page — or, in the drawer,
 * the single scroll region — does the scrolling.
 */
export const BudgetWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const PanelHead = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  .eyebrow {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.muted};
  }

  .counts {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.625rem;
  }

  /* Species is the line count; units is the figure we actually quote on.
     The old "Total: 4 articles" printed the number of *visible rows*, so it
     changed when you searched and never mentioned quantities at all. */
  .species {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 1.625rem;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.colors.dark};
  }

  .units {
    font-size: 0.9375rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.colors.greenDeep};
  }

  .dot {
    width: 0.25rem;
    height: 0.25rem;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme }) => theme.colors.gray};
  }
`;

export const HeadActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  > div:first-child {
    width: 14.5rem;
  }

  @media (max-width: 768px) {
    > div:first-child {
      width: 100%;
    }
  }

  /* On a phone the search field and "Clear the request" cannot share a row
     without squeezing the field to about 200px. */
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.625rem;
  }
`;

export const ClearButton = styled.button`
  flex-shrink: 0;

  background: none;
  border: 0;
  padding: 0;

  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted};
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;

  transition: color 0.18s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.line};
`;

export const ItemList = styled.ul<{ $variant: "page" | "drawer" }>`
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;

  ${({ $variant, theme }) =>
    $variant === "drawer"
      ? `
    gap: 0.625rem;

    > li {
      background: ${theme.colors.white};
      border: 1px solid ${theme.colors.line};
      border-radius: ${theme.radii.card};
    }
  `
      : `
    > li + li {
      border-top: 1px solid ${theme.colors.lineSoft};
    }
  `}
`;

export const NoMatches = styled.p`
  padding: 1.75rem 0 0.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const PanelFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding-top: 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.line};

  p {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.muted};
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;

    button {
      width: 100%;
    }
  }
`;

/** Was a clickable <span>: not focusable, not announced as an action. */
export const AddManuallyButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-shrink: 0;

  height: ${({ theme }) => theme.control.height};
  padding-inline: 1.25rem;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.pill};

  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;

  transition: border-color 0.18s ease, color 0.18s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandGreen};
    color: ${({ theme }) => theme.colors.brandGreen};
  }
`;

/**
 * Removing a line is now undoable — it used to be final and silent.
 *
 * Sticky, not in flow: the list is scrolled by the page (on /budget) or by the
 * drawer body, so on a twenty-line quote an in-flow bar at the end of the
 * panel sat far below the viewport and its window expired unseen.
 */
export const UndoBar = styled.div`
  position: sticky;
  bottom: 0.75rem;
  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  margin-top: 0.25rem;
  padding: 0.75rem 1rem 0.75rem 1.125rem;
  background: ${({ theme }) => theme.colors.moss};
  border-radius: ${({ theme }) => theme.radii.pill};
  box-shadow: ${({ theme }) => theme.shadow.lg};

  p {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.paper};
  }

  button {
    background: none;
    border: 0;
    padding: 0;

    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.lime};
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }
`;

export const KeptLocal = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted};

  svg {
    flex-shrink: 0;
  }
`;

/**
 * Stands in for the list until the browser's saved quote is adopted (one frame
 * after mount). Without it the empty state flashes on a page that is about to
 * show twenty lines.
 */
export const Skeleton = styled.div<{ $compact: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ $compact }) => ($compact ? "0.625rem" : "1rem")};

  padding-top: 0.5rem;

  .row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .block {
    width: ${({ $compact }) => ($compact ? "3.5rem" : "5.5rem")};
    height: ${({ $compact }) => ($compact ? "3.5rem" : "5.5rem")};
    flex-shrink: 0;
    border-radius: 0.75rem;
    background: ${({ theme }) => theme.colors.lineSoft};
  }

  .lines {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-grow: 1;
  }

  .line {
    height: 0.75rem;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme }) => theme.colors.lineSoft};

    &:first-child {
      width: 45%;
    }
    &:last-child {
      width: 28%;
    }
  }
`;
