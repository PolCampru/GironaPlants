"use client";

import React from "react";
import { ButtonWrapper } from "./Button.style";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button = ({ onClick, children, disabled = false }: ButtonProps) => {
  return (
    <ButtonWrapper
      className="learn-more"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <span className="circle" aria-hidden="true">
        <span className="icon arrow"></span>
      </span>
      <span className="button-text">{children}</span>
    </ButtonWrapper>
  );
};

export default Button;
