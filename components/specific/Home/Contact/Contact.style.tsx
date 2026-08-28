"use client";

import styled from "styled-components";

export const ContactPanel = styled.div`
  position: relative;
  overflow: hidden;

  padding: 3.5rem;
  border-radius: ${({ theme }) => theme.radii.panel};
  background-color: ${({ theme }) => theme.colors.moss};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;

  /* Decorative glow, behind the content. */
  &::before {
    content: "";
    position: absolute;
    top: -8.75rem;
    right: -7.5rem;
    width: 26.25rem;
    height: 26.25rem;
    border-radius: 50%;
    background-color: rgba(17, 139, 80, 0.3);
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    padding: 2.5rem 1.75rem;
  }
`;

export const ContainerText = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  max-width: 39rem;

  h2 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(1.875rem, 3vw, 2.5rem);
    font-weight: 400;
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.white};
  }

  p {
    font-size: 1.0625rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.78);
  }
`;

export const ContactMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.75rem;
  margin-top: 0.5rem;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5625rem;

    color: ${({ theme }) => theme.colors.white};
    font-size: 0.9375rem;
    font-weight: 600;
    overflow-wrap: anywhere;

    svg {
      flex-shrink: 0;
      color: ${({ theme }) => theme.colors.lime};
    }

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ContainerAction = styled.div`
  position: relative;
  z-index: 1;
  flex-shrink: 0;
`;
