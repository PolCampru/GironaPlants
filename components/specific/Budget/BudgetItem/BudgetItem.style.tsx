"use client";

import styled from "styled-components";

/**
 * One line of the quote.
 *
 * The old row was a fixed 7rem flex row with the remove button positioned
 * absolutely over the price column, and it did not reflow on a phone. This is
 * a grid: thumbnail, information, stepper, remove — collapsing to two rows
 * under 640px, with the stepper on its own line.
 */
export const BudgetItemWrapper = styled.li<{ $compact: boolean }>`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  grid-template-areas: "thumb info qty remove";
  align-items: center;
  gap: ${({ $compact }) => ($compact ? "0.75rem" : "1rem")};

  padding-block: ${({ $compact }) => ($compact ? "0.75rem" : "1rem")};

  ${({ $compact }) =>
    $compact &&
    `
    padding-inline: 0.75rem;
  `}

  @media (max-width: 640px) {
    grid-template-columns: auto minmax(0, 1fr) auto;
    grid-template-areas:
      "thumb info remove"
      "qty qty qty";
    row-gap: 0.75rem;
    align-items: start;
  }
`;

export const Thumb = styled.div<{ $compact: boolean }>`
  grid-area: thumb;

  position: relative;
  width: ${({ $compact }) => ($compact ? "3.5rem" : "5.5rem")};
  height: ${({ $compact }) => ($compact ? "3.5rem" : "5.5rem")};
  flex-shrink: 0;

  overflow: hidden;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.colors.lineSoft};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Plants added by hand through the modal have no photograph. */
  span[data-initial] {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    background: ${({ theme }) => theme.colors.lightGreen};
    color: ${({ theme }) => theme.colors.greenDeep};
    font-family: ${({ theme }) => theme.font.display};
    font-size: ${({ $compact }) => ($compact ? "1.25rem" : "1.75rem")};
  }

  @media (max-width: 640px) {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

export const Info = styled.div<{ $compact: boolean }>`
  grid-area: info;

  display: flex;
  flex-direction: column;
  gap: ${({ $compact }) => ($compact ? "0.25rem" : "0.5rem")};
  min-width: 0;

  h3 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: ${({ $compact }) => ($compact ? "1rem" : "1.1875rem")};
    font-weight: 500;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.dark};
  }

  .description {
    font-size: ${({ $compact }) => ($compact ? "0.75rem" : "0.8125rem")};
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const Chips = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.375rem;

  span[data-chip] {
    display: inline-flex;
    align-items: center;
    height: 1.625rem;
    padding-inline: 0.625rem;

    background: ${({ theme }) => theme.colors.paper};
    border: 1px solid ${({ theme }) => theme.colors.line};
    border-radius: ${({ theme }) => theme.radii.pill};

    font-size: 0.75rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.dark};
    white-space: nowrap;
  }

  span[data-min] {
    display: inline-flex;
    align-items: center;
    height: 1.625rem;

    font-size: 0.75rem;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.colors.muted};
    white-space: nowrap;
  }

  /* The discount used to be a badge positioned absolutely against the row,
     which drifted over the thumbnail. It is a chip in the spec run now, so
     rows keep the same shape whether or not a line carries an offer price. */
  span[data-offer] {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    height: 1.625rem;
    padding-inline: 0.625rem;

    background: ${({ theme }) => theme.colors.lightGreen};
    border-radius: ${({ theme }) => theme.radii.pill};

    font-size: 0.75rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.greenDeep};
    white-space: nowrap;

    .new-price {
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      color: ${({ theme }) => theme.colors.dark};
    }

    .old-price {
      font-weight: 500;
      font-variant-numeric: tabular-nums;
      color: ${({ theme }) => theme.colors.muted};
      text-decoration: line-through;
    }
  }
`;

export const MinimumWarning = styled.p`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.625rem;

  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.danger};

  svg {
    flex-shrink: 0;
  }

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
  }
`;

export const QuantityCell = styled.div`
  grid-area: qty;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;

  .unit-label {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const CloseButton = styled.button`
  grid-area: remove;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  /* 28px before, and overlapping the price. */
  width: ${({ theme }) => theme.control.height};
  height: ${({ theme }) => theme.control.height};

  background: transparent;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;

  transition: background-color 0.18s ease, color 0.18s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.danger};
  }
`;
