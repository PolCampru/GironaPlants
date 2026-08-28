"use client";

import styled from "styled-components";

/**
 * A stepper, not a bare number field.
 *
 * The old control was an `input[type=number]` with `border: none` on a white
 * card, so it read as static text: nothing said the quantity was editable and
 * there was no pointer-sized way to change it. The minimum-quantity error was
 * an absolutely positioned line rendered at `opacity: 0` at all times, which
 * overlapped the row below it whenever it did show.
 */
export const StepperShell = styled.div<{ $invalid: boolean; $compact: boolean }>`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;

  height: ${({ theme }) => theme.control.height};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid
    ${({ $invalid, theme }) =>
      $invalid ? theme.colors.danger : theme.colors.gray};
  border-radius: ${({ theme }) => theme.radii.pill};

  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:focus-within {
    border-color: ${({ $invalid, theme }) =>
      $invalid ? theme.colors.danger : theme.colors.brandGreen};
    box-shadow: ${({ $invalid, theme }) =>
      $invalid ? "0 0 0 3px rgba(194, 65, 12, 0.14)" : theme.shadow.ring};
  }

  input {
    width: ${({ $compact }) => ($compact ? "3rem" : "3.25rem")};
    height: 100%;
    padding: 0;

    background: transparent;
    border: 0;
    text-align: center;

    font-family: inherit;
    font-size: 0.9375rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.colors.dark};

    &:focus {
      outline: none;
    }

    /* The native spinners are 12px targets; the −/+ buttons replace them. */
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    appearance: textfield;
    -moz-appearance: textfield;
  }
`;

export const StepButton = styled.button<{ $compact: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  /* Full-height targets: 44px tall, and 44 wide unless the drawer is tight. */
  width: ${({ $compact, theme }) => ($compact ? "2.5rem" : theme.control.height)};
  height: 100%;

  background: transparent;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;

  transition: background-color 0.18s ease, color 0.18s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.hoverGreen};
    color: ${({ theme }) => theme.colors.greenDeep};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.mediumGray};
    cursor: not-allowed;
  }
`;
