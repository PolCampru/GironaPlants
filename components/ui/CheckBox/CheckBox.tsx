"use client";
import React from "react";
import { motion } from "framer-motion";

import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  LabelText,
} from "./CheckBox.style";
import { shakeVariant, appearVariant } from "@/animations/CheckBox";

interface CheckboxProps {
  className?: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  name: string;
  size?: "small" | "medium" | "large";
}

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
  <CheckboxContainer
    className={className}
    as={motion.label}
    variants={error ? shakeVariant : appearVariant}
    initial="initial"
    animate={error ? "shake" : "animate"}
  >
    <HiddenCheckbox
      name={name}
      checked={checked}
      onChange={onChange}
      aria-invalid={error}
      {...props}
    />
    <StyledCheckbox
      checked={checked}
      $error={error}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 1 }}
      animate={{ scale: checked ? 1.2 : 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      $size={size}
    />
    <LabelText $error={error} $size={size}>
      {label}
    </LabelText>
  </CheckboxContainer>
);

export default Checkbox;
