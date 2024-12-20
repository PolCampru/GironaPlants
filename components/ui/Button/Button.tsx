"use client";
import React, { ButtonHTMLAttributes } from "react";
import { ButtonText, Circle, Icon, StyledButton } from "./Button.style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <StyledButton
      className="learn-more"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Circle className="circle">
        <Icon className="icon arrow" />
      </Circle>
      <ButtonText className="button-text">{children}</ButtonText>
    </StyledButton>
  );
};

export default Button;
