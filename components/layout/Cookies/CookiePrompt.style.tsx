"use client";

import styled from "styled-components";
import Link from "next/link";

export const PromptBar = styled.div`
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 1000;

  padding: 1rem var(--gutter);
  background-color: ${({ theme }) => theme.colors.moss};
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 -8px 24px rgba(10, 42, 53, 0.18);
`;

export const PromptInner = styled.div`
  width: 100%;
  max-width: var(--content-max);
  margin-inline: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;

  p {
    font-size: 0.875rem;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.85);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.875rem;
  }
`;

export const PromptActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  flex-shrink: 0;
`;

const control = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding-inline: 1.125rem;
  border-radius: 62.5rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease;
`;

export const AcceptButton = styled.button`
  ${control};
  border: 0;
  background-color: ${({ theme }) => theme.colors.lime};
  color: ${({ theme }) => theme.colors.moss};

  &:hover {
    background-color: #eefaad;
  }
`;

/* Reject is not a destructive action, so it is not red. */
export const RejectButton = styled.button`
  ${control};
  border: 1px solid rgba(255, 255, 255, 0.35);
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
`;

/* A link, not a <button> nested inside an <a>, which is invalid HTML. */
export const MoreInfoLink = styled(Link)`
  ${control};
  border: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;
