"use client";

import React from "react";
import { FiCheck } from "react-icons/fi";
import {
  CheckboxContainer,
  HiddenCheckbox,
  LabelText,
  StyledCheckbox,
} from "./CheckBox.style";

interface CheckboxProps {
  className?: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  name: string;
  size?: "small" | "medium" | "large";
}

/**
 * The styled box is a sibling <span> of a visually hidden real checkbox, so
 * the native control keeps the label association, keyboard behaviour and
 * focus ring. The previous version animated a scale(1.2) on tick, which
 * nudged the row's layout every time you filtered.
 */
const Checkbox = ({
  className,
  label,
  checked,
  onChange,
  error = false,
  name,
  size = "medium",
  ...props
}: CheckboxProps) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox
      name={name}
      checked={checked}
      onChange={onChange}
      aria-invalid={error || undefined}
      {...props}
    />
    <StyledCheckbox $checked={checked} $error={error} $size={size}>
      <FiCheck aria-hidden="true" size={13} strokeWidth={3} />
    </StyledCheckbox>
    <LabelText $error={error} $size={size}>
      {label}
    </LabelText>
  </CheckboxContainer>
);

export default Checkbox;
