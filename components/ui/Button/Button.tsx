"use client";

import React, { ButtonHTMLAttributes } from "react";
import { ButtonText, Circle, Icon, StyledButton } from "./Button.style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const buttonVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const Button = ({ children }: ButtonProps) => {
  return (
    <StyledButton
      className="learn-more"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
    >
      <Circle className="circle">
        <Icon className="icon arrow" />
      </Circle>
      <ButtonText className="button-text">{children}</ButtonText>
    </StyledButton>
  );
};

export default Button;
