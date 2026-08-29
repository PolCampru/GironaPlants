"use client";

import styled from "styled-components";

export const HeroWrapper = styled.div`
  margin-top: 4rem;
  padding: 2.75rem;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.panel};

  display: grid;
  grid-template-columns: 0.86fr 1.14fr;
  gap: 3.5rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1.75rem;
    margin-top: 2.5rem;
  }
`;

export const CoverFrame = styled.div`
  border-radius: ${({ theme }) => theme.radii.card};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  aspect-ratio: 3 / 4;
  background: ${({ theme }) => theme.colors.lightGreen};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Stays portrait on mobile: the cover is a book cover, and a 4/3 frame
     cropped the wordmark clean off the middle of it. */
  @media (max-width: 900px) {
    max-width: 17rem;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.125rem;

  h1 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(2rem, 3.6vw, 3rem);
    font-weight: 400;
    line-height: 1.06;
    letter-spacing: -0.015em;
    color: ${({ theme }) => theme.colors.dark};
  }

  p {
    font-size: 1.0625rem;
    line-height: 1.62;
    color: #4a443e;
    max-width: 33rem;
  }
`;

export const Label = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
`;

export const MetaChip = styled.span<{ $accent?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4375rem;
  height: 2rem;
  padding-inline: 0.8125rem;
  border-radius: ${({ theme }) => theme.radii.pill};

  font-size: 0.8125rem;
  font-weight: ${({ $accent }) => ($accent ? 700 : 500)};

  background: ${({ $accent, theme }) =>
    $accent ? theme.colors.lime : theme.colors.paper};
  color: ${({ $accent, theme }) =>
    $accent ? theme.colors.moss : theme.colors.dark};
  border: 1px solid
    ${({ $accent, theme }) => ($accent ? theme.colors.lime : theme.colors.line)};

  svg {
    color: ${({ theme }) => theme.colors.brandGreen};
    flex-shrink: 0;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.375rem;
`;

export const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  height: ${({ theme }) => theme.control.heightLg};
  padding-inline: 1.625rem;
  border-radius: ${({ theme }) => theme.radii.pill};

  background: ${({ theme }) => theme.colors.brandGreen};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.9375rem;
  font-weight: 600;

  transition: background-color 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.greenDeep};
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;
