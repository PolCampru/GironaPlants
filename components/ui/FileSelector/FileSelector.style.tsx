"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const DropZone = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;

  padding: 1.125rem 1.25rem;
  background: ${({ theme }) => theme.colors.paper};
  border: 1px dashed ${({ theme }) => theme.colors.gray};
  border-radius: 0.625rem;

  transition: border-color 0.18s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.brandGreen};
  }

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ClipIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 2.625rem;
  height: 2.625rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.lightGreen};
  color: ${({ theme }) => theme.colors.greenDeep};
`;

export const DropText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  flex-grow: 1;

  strong {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.dark};
  }

  span {
    font-size: 0.8125rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

/**
 * The real input is hidden and the <label> is the visible control, so the
 * button is keyboard reachable and announces itself. The previous version
 * rendered the browser's default "Choose file" widget under a decorative
 * label.
 */
export const PickerLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  height: ${({ theme }) => theme.control.height};
  padding-inline: 1.125rem;

  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.pill};

  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandGreen};
    color: ${({ theme }) => theme.colors.brandGreen};
  }
`;

export const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;

  &:focus-visible + label {
    outline: 2px solid ${({ theme }) => theme.colors.brandGreen};
    outline-offset: 2px;
  }
`;

export const FileList = styled(motion.ul)`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

export const FileItem = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  padding: 0.625rem 0.75rem 0.625rem 0.875rem;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: ${({ theme }) => theme.radii.field};

  span {
    flex-grow: 1;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.dark};
    overflow-wrap: anywhere;
  }

  small {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.muted};
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    width: 1.75rem;
    height: 1.75rem;

    background: transparent;
    border: 0;
    border-radius: ${({ theme }) => theme.radii.pill};
    color: ${({ theme }) => theme.colors.muted};
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.colors.lightGray};
      color: ${({ theme }) => theme.colors.danger};
    }
  }
`;
