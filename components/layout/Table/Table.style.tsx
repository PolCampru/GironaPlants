"use client";

import styled from "styled-components";

export const TableCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.card};
  overflow: hidden;
`;

export const TableScroll = styled.div`
  max-height: 46rem;
  overflow-y: auto;
  /* Horizontal scroll lives here, so a wide table never widens the page. */
  overflow-x: auto;
  overscroll-behavior: contain;

  table {
    width: 100%;
    min-width: 44rem;
    border-collapse: collapse;
    text-align: left;
  }

  thead {
    position: sticky;
    top: 0;
    z-index: 1;

    th {
      background: ${({ theme }) => theme.colors.paper};
      border-bottom: 1px solid ${({ theme }) => theme.colors.line};

      height: 2.875rem;
      padding-inline: 1.375rem;

      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.muted};
      white-space: nowrap;
    }
  }

  tbody {
    td {
      height: 3.375rem;
      padding-inline: 1.375rem;
      border-bottom: 1px solid ${({ theme }) => theme.colors.lineSoft};

      font-size: 0.9375rem;
      color: ${({ theme }) => theme.colors.dark};
      vertical-align: middle;
    }

    tr:last-of-type td {
      border-bottom: 0;
    }

    tr {
      transition: background-color 0.15s ease;

      &:hover td {
        background-color: #f6fbf7;
      }
    }

    /* Keyed off the column id, not nth-of-type: the add-to-quote column
       moves to the front below 850px, which shifted every one of these onto
       the wrong column. */
    td[data-col="genus"] {
      font-weight: 700;
      letter-spacing: 0.02em;
      white-space: nowrap;
    }

    td[data-col="pot_size"],
    td[data-col="height"],
    td[data-col="price"] {
      font-variant-numeric: tabular-nums;
      color: ${({ theme }) => theme.colors.muted};
      white-space: nowrap;
    }

    td[data-col="price"] {
      font-weight: 700;
      color: ${({ theme }) => theme.colors.dark};
    }

    td[data-col="add"] {
      width: 1%;
      padding-inline: 0.875rem;
    }
  }
`;

export const LoadMoreRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 3.5rem;
  padding: 0.75rem;
`;

export const TableFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.875rem;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.paper};

  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted};
  font-variant-numeric: tabular-nums;
`;
