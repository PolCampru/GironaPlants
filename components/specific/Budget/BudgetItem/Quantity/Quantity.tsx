"use client";

import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { StepButton, StepperShell } from "./Quantity.style";

interface QuantityProps {
  value: number;
  minQuantity: number;
  /** How much one −/+ press moves. */
  step: number;
  /** Accessible names, since the buttons are icon-only. */
  fewerLabel: string;
  moreLabel: string;
  inputLabel: string;
  /** Below the minimum — computed from the cart, not tracked here. */
  invalid: boolean;
  compact?: boolean;
  onChange: (newValue: number) => void;
}

const Quantity = ({
  value,
  minQuantity,
  step,
  fewerLabel,
  moreLabel,
  inputLabel,
  invalid,
  compact = false,
  onChange,
}: QuantityProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/^0+/, "");

    if (inputValue === "") {
      onChange(0);
      return;
    }

    const newValue = parseInt(inputValue, 10);
    if (Number.isNaN(newValue)) return;

    onChange(newValue);
  };

  /* The floor is the minimum order, not zero: with quantity === min_quantity
     === step (how a line arrives from the catalogue), one press of "−" used to
     leave a 0-unit line in the request, which still got emailed. Removing a
     line is what the × is for. */
  const floor = minQuantity > 0 ? minQuantity : 1;
  const atFloor = value <= floor;

  /** Typing is free; leaving the field snaps a short line back up to the floor. */
  const handleBlur = () => {
    if (value < floor) onChange(floor);
  };

  return (
    <StepperShell $invalid={invalid} $compact={compact}>
      <StepButton
        type="button"
        $compact={compact}
        onClick={() => onChange(Math.max(floor, value - step))}
        disabled={atFloor}
        aria-label={fewerLabel}
      >
        <FiMinus aria-hidden="true" size={17} />
      </StepButton>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        step={step}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-label={inputLabel}
        aria-invalid={invalid}
      />
      <StepButton
        type="button"
        $compact={compact}
        onClick={() => onChange(value + step)}
        aria-label={moreLabel}
      >
        <FiPlus aria-hidden="true" size={17} />
      </StepButton>
    </StepperShell>
  );
};

export default Quantity;
