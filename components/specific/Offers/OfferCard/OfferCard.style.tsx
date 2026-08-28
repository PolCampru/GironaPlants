"use client";

import styled from "styled-components";

/**
 * A card in the offers grid.
 *
 * This used to be a full-width row with `min-width: 50rem`, only overridden
 * below 768px — so between 769px and ~830px it pushed the page sideways.
 * It is fluid now and sits in the same card system as the catalogue and
 * category cards.
 */
export const OfferCardWrapper = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.card};
  overflow: hidden;

  transition: transform 0.22s ease, box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

export const DiscountBadge = styled.span`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 2;

  display: inline-flex;
  align-items: center;
  height: 1.625rem;
  padding-inline: 0.625rem;

  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};

  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
`;

export const CardMedia = styled.div`
  height: 11.25rem;
  background: ${({ theme }) => theme.colors.lightGreen};
  overflow: hidden;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1.25rem;
  flex-grow: 1;

  h3 {
    font-family: ${({ theme }) => theme.font.body};
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.muted};
  }

  .description {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.dark};
  }

  .text {
    font-size: 0.875rem;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const AttributeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.25rem;
`;

export const Attribute = styled.span`
  display: inline-flex;
  align-items: center;
  height: 1.5rem;
  padding-inline: 0.5rem;

  border-radius: ${({ theme }) => theme.radii.field};
  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.line};

  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.muted};
  font-variant-numeric: tabular-nums;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  padding: 1rem 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.lineSoft};
`;

export const PriceBlock = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  min-width: 0;

  .new-price {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.dark};
    font-variant-numeric: tabular-nums;
  }

  .old-price {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.muted};
    text-decoration: line-through;
    font-variant-numeric: tabular-nums;
  }
`;
