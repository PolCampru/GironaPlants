"use client";

import styled from "styled-components";

export const CardWrapper = styled.article`
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

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

export const CardCover = styled.div`
  height: 13.125rem;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.lightGreen};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardInner = styled.div`
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
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FormatTag = styled.span`
  display: inline-flex;
  align-items: center;
  height: 1.5rem;
  padding-inline: 0.625rem;
  border-radius: ${({ theme }) => theme.radii.pill};

  background: ${({ theme }) => theme.colors.lime};
  color: ${({ theme }) => theme.colors.moss};

  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
`;

export const DownloadLink = styled.a`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  height: ${({ theme }) => theme.control.height};
  padding-inline: 1.25rem;
  margin-top: 0.5rem;

  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.brandGreen};
  color: ${({ theme }) => theme.colors.white};

  font-size: 0.875rem;
  font-weight: 600;

  transition: background-color 0.18s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.greenDeep};
  }
`;
