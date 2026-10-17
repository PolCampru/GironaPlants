"use client";

import styled, { css } from "styled-components";

/** `$featured` is the general catalogue: dark ground, lime accents, so it
 *  reads as the main document and the others as separate, smaller ranges. */
type Featured = { $featured?: boolean };

/** `$wide` is a card alone in its row (outside es/ca only the general
 *  catalogue is offered): cover beside the text instead of on top. */
type Wide = { $wide?: boolean };

const WIDE_FROM = "720px";

export const CardWrapper = styled.article<Featured & Wide>`
  display: flex;
  flex-direction: column;
  height: 100%;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.card};
  overflow: hidden;

  transition: transform 0.22s ease, box-shadow 0.22s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }

  ${({ $featured, theme }) =>
    $featured &&
    css`
      background: ${theme.colors.moss};
      border-color: ${theme.colors.moss};
      box-shadow: ${theme.shadow.lg};

      /* && outranks CardInner's own h3/p rules. */
      && h3 {
        color: ${theme.colors.white};
        font-size: 1.625rem;
      }

      && p {
        color: rgba(255, 255, 255, 0.78);
      }
    `}

  ${({ $wide }) =>
    $wide &&
    css`
      @media (min-width: ${WIDE_FROM}) {
        flex-direction: row;
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

export const CardCover = styled.div<Featured & Wide>`
  height: 13.125rem;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.lightGreen};

  ${({ $wide }) =>
    $wide &&
    css`
      @media (min-width: ${WIDE_FROM}) {
        flex: 0 0 38%;
        height: auto;
        min-height: 18rem;
      }
    `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* The general catalogue's cover is a portrait page: keep its title. */
    object-position: ${({ $featured }) => ($featured ? "top" : "center")};
  }
`;

export const CardInner = styled.div<Wide>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.375rem;
  flex-grow: 1;

  h3 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 1.375rem;
    font-weight: 500;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.dark};
  }

  p {
    font-size: 0.875rem;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors.muted};
    flex-grow: 1;
  }

  ${({ $wide }) =>
    $wide &&
    css`
      @media (min-width: ${WIDE_FROM}) {
        justify-content: center;
        gap: 0.75rem;
        padding: 2.25rem 2.5rem;

        p {
          flex-grow: 0;
          max-width: 34rem;
          font-size: 0.9375rem;
        }
      }
    `}
`;

export const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
`;

const pill = css`
  display: inline-flex;
  align-items: center;
  min-height: 1.5rem;
  padding: 0.125rem 0.625rem;
  border-radius: ${({ theme }) => theme.radii.pill};

  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
`;

export const FormatTag = styled.span`
  ${pill}
  background: ${({ theme }) => theme.colors.lime};
  color: ${({ theme }) => theme.colors.moss};
`;

export const KindTag = styled.span<Featured>`
  ${pill}
  background: ${({ theme, $featured }) =>
    $featured ? "rgba(228, 246, 142, 0.16)" : theme.colors.lightGreen};
  color: ${({ theme, $featured }) =>
    $featured ? theme.colors.lime : theme.colors.greenDeep};
  text-transform: uppercase;
`;

export const DownloadLink = styled.a<Featured>`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  height: ${({ theme }) => theme.control.height};
  padding-inline: 1.25rem;
  margin-top: 0.5rem;

  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $featured }) =>
    $featured ? theme.colors.lime : theme.colors.brandGreen};
  color: ${({ theme, $featured }) =>
    $featured ? theme.colors.moss : theme.colors.white};

  font-size: 0.875rem;
  font-weight: 600;

  transition: background-color 0.18s ease, filter 0.18s ease;

  &:hover {
    background: ${({ theme, $featured }) =>
      $featured ? theme.colors.lime : theme.colors.greenDeep};
    filter: ${({ $featured }) => ($featured ? "brightness(0.94)" : "none")};
  }
`;
