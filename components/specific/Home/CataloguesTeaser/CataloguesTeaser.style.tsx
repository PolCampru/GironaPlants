"use client";

import styled from "styled-components";

/** The general catalogue goes first and gets the wider column. */
export const CardsGrid = styled.div<{ $count: number }>`
  display: grid;
  grid-template-columns: ${({ $count }) =>
    $count >= 3
      ? "minmax(0, 1.3fr) repeat(2, minmax(0, 1fr))"
      : `repeat(${Math.max($count, 1)}, minmax(0, 1fr))`};
  gap: 1.25rem;
  margin-top: 2.25rem;

  @media (max-width: 900px) {
    grid-template-columns: ${({ $count }) =>
      $count === 1 ? "1fr" : "repeat(2, minmax(0, 1fr))"};

    /* Three cards on two columns: the main one takes the full first row. */
    > div:first-child:nth-last-child(3) {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }

  > div {
    height: 100%;
  }
`;
