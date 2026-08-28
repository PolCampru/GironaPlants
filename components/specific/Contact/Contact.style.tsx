"use client";

import styled from "styled-components";

export const ContactLayout = styled.div`
  padding-top: 3.5rem;
  padding-bottom: 1rem;

  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
  gap: 2.5rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding-top: 2.5rem;
  }
`;

export const Aside = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const AsidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.375rem;

  padding: 1.875rem;
  background: ${({ theme }) => theme.colors.moss};
  border-radius: ${({ theme }) => theme.radii.panel};

  h2 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 1.625rem;
    font-weight: 500;
    line-height: 1.15;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const ContactRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ContactRow = styled.a`
  display: flex;
  align-items: center;
  gap: 0.8125rem;
  min-width: 0;

  &[href]:hover strong {
    color: ${({ theme }) => theme.colors.lime};
  }
`;

export const RowIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 2.625rem;
  height: 2.625rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.lime};
`;

export const RowText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.0625rem;
  min-width: 0;

  span {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.55);
  }

  strong {
    font-size: 0.9375rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    overflow-wrap: anywhere;
    transition: color 0.18s ease;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.14);
`;

export const LanguageBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5625rem;

  > span {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.55);
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4375rem;
  }
`;

export const LanguageChip = styled.span`
  display: inline-flex;
  align-items: center;
  height: 1.875rem;
  padding-inline: 0.75rem;

  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.12);
  color: ${({ theme }) => theme.colors.white};

  font-size: 0.75rem;
  font-weight: 600;
`;

export const AsideImage = styled.div`
  border-radius: ${({ theme }) => theme.radii.panel};
  overflow: hidden;
  height: 13.75rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const CatalogueCallout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5625rem;

  padding: 1.625rem;
  background: ${({ theme }) => theme.colors.lightGreen};
  border-radius: ${({ theme }) => theme.radii.panel};

  h2 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 1.375rem;
    font-weight: 500;
    line-height: 1.18;
    color: ${({ theme }) => theme.colors.moss};
  }

  p {
    font-size: 0.875rem;
    line-height: 1.55;
    color: #3b4f45;
  }

  a {
    margin-top: 0.375rem;
  }
`;
