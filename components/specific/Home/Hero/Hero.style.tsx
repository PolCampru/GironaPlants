"use client";

import styled from "styled-components";

export const HeroWrapper = styled.div`
  padding-top: 4.5rem;
  padding-bottom: 5rem;

  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
`;

export const ContainerData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.375rem;

  h1 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(2.375rem, 4.6vw, 3.875rem);
    font-weight: 400;
    line-height: 1.04;
    letter-spacing: -0.018em;
    color: ${({ theme }) => theme.colors.dark};
    max-width: 40rem;

    em {
      font-style: italic;
      color: ${({ theme }) => theme.colors.brandGreen};
    }
  }
`;

export const Lead = styled.p`
  font-size: 1.125rem;
  line-height: 1.62;
  color: #4a443e;
  max-width: 34rem;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  height: 2rem;
  padding-inline: 0.875rem;
  border-radius: ${({ theme }) => theme.radii.pill};

  background-color: ${({ theme }) => theme.colors.lightGreen};
  color: ${({ theme }) => theme.colors.greenDeep};

  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;

  svg {
    flex-shrink: 0;
  }
`;

export const SearchBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  margin-top: 0.25rem;
`;

export const SecondaryAction = styled.div`
  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    font-size: 0.9375rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.brandGreen};

    svg {
      transition: transform 0.18s ease;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.greenDeep};

      svg {
        transform: translateX(3px);
      }
    }
  }
`;

export const HeroMedia = styled.div`
  position: relative;
  height: 32.5rem;

  @media (max-width: 1440px) {
    height: 29rem;
  }

  @media (max-width: 1024px) {
    height: 24rem;
  }

  @media (max-width: 560px) {
    height: 18rem;
  }
`;

export const MediaFrame = styled.div`
  position: absolute;
  inset: 0;
  border-radius: ${({ theme }) => theme.radii.panel};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.lightGreen};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StatCard = styled.div`
  position: absolute;
  left: -2.25rem;
  bottom: 2.125rem;
  width: 15.75rem;

  padding: 1.25rem 1.375rem;
  border-radius: 0.875rem;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.lg};

  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  strong {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 2.5rem;
    font-weight: 500;
    line-height: 1;
    color: ${({ theme }) => theme.colors.brandGreen};
    font-variant-numeric: tabular-nums;
  }

  span {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.dark};
  }

  small {
    font-size: 0.8125rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.muted};
  }

  @media (max-width: 1024px) {
    left: 1rem;
    bottom: 1rem;
    width: 14rem;
    padding: 1rem 1.125rem;

    strong {
      font-size: 2rem;
    }
  }

  @media (max-width: 560px) {
    display: none;
  }
`;

export const MediaTag = styled.span`
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;

  display: inline-flex;
  align-items: center;
  gap: 0.4375rem;
  height: 2rem;
  padding-inline: 0.875rem;
  border-radius: ${({ theme }) => theme.radii.pill};

  background: rgba(10, 42, 53, 0.72);
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.75rem;
  font-weight: 600;

  svg {
    color: ${({ theme }) => theme.colors.lime};
    flex-shrink: 0;
  }
`;
