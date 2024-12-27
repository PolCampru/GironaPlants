"use client";

import styled, { keyframes, css } from "styled-components";

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const spin1 = keyframes`
  0% { transform: rotate(0deg); }
  30% { transform: rotate(0deg); }
  70% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const spin2 = keyframes`
  0% { transform: rotate(0deg); }
  30% { transform: rotate(270deg); }
  70% { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
`;

export const spin3 = keyframes`
  0% { transform: rotate(0deg); }
  30% { transform: rotate(180deg); }
  70% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
`;

export const spin4 = keyframes`
  0% { transform: rotate(0deg); }
  30% { transform: rotate(90deg); }
  70% { transform: rotate(90deg); }
  100% { transform: rotate(360deg); }
`;

interface CornersProps {
  $size: number;
  $duration: number;
}

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: transparent;
`;

export const Corners = styled.div<CornersProps>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  position: relative;
  transform-origin: center;
  animation: ${spin} ${(props) => props.$duration}s infinite linear;
`;

interface CornerProps {
  $variant: number;
  $color: string;
  $duration: number;
}

export const Corner = styled.div<CornerProps>`
  width: 100%;
  height: 100%;
  position: absolute;

  &::before {
    display: block;
    width: 48%;
    height: 48%;
    border-radius: 0 40% 0 40%;
    background-color: ${(props) => props.$color};
    content: "";
  }

  ${(props) =>
    props.$variant === 1 &&
    css`
      animation: ${spin1} ${props.$duration}s infinite
        cubic-bezier(0.785, 0.135, 0.15, 0.86);
    `}
  ${(props) =>
    props.$variant === 2 &&
    css`
      animation: ${spin2} ${props.$duration}s infinite
        cubic-bezier(0.785, 0.135, 0.15, 0.86);
    `}
  ${(props) =>
    props.$variant === 3 &&
    css`
      animation: ${spin3} ${props.$duration}s infinite
        cubic-bezier(0.785, 0.135, 0.15, 0.86);
    `}
  ${(props) =>
    props.$variant === 4 &&
    css`
      animation: ${spin4} ${props.$duration}s infinite
        cubic-bezier(0.785, 0.135, 0.15, 0.86);
    `}
`;
