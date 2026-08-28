"use client";

import React, { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./Button.style";
import type { CtaSize, CtaVariant } from "@/components/ui/CtaLink/CtaLink";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: CtaVariant;
  size?: CtaSize;
  fullWidth?: boolean;
}

/**
 * Button matches CtaLink exactly, so an action and a navigation sitting side
 * by side look like one control family. The previous implementation was a
 * bare label with an absolutely positioned circle that grew on hover; it
 * overlapped its own text at every width below the widest.
 */
const Button = ({
  children,
  variant = "solid",
  size = "lg",
  fullWidth = false,
  type = "button",
  ...rest
}: ButtonProps) => (
  <StyledButton
    type={type}
    $variant={variant}
    $size={size}
    $fullWidth={fullWidth}
    {...rest}
  >
    {children}
  </StyledButton>
);

export default Button;
