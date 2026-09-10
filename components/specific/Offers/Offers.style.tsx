"use client";

import styled from "styled-components";

export const OffersWrapper = styled.div`
  padding-top: 3.5rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding-top: 2.5rem;
  }
`;

export const OffersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17.5rem, 1fr));
  gap: 1.25rem;
  margin-top: 2.25rem;
`;

/**
 * Who the offer prices are for. Every figure on this page comes from the
 * trade catalogue, so a particular reading one is not reading their own.
 */
export const PriceAudienceNote = styled.p`
  margin-top: 1rem;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 38rem;
`;
