"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  LabelText,
} from "./CheckBox.style";

interface CheckboxProps {
  className?: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  id?: string;
}

const shakeVariant = {
  shake: {
    x: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.4 },
  },
};

const appearVariant = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Checkbox = ({
  className,
  label,
  checked,
  onChange,
  error = false,
  id,
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
      id={id}
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
    />
    <LabelText $error={error}>{label}</LabelText>
  </CheckboxContainer>
);

export default Checkbox;
