"use client";
import styled from "styled-components";

interface BoxContainerProps {
  $width?: string;
  $height?: string;
  $borderRadiusTopLeft?: string;
  $borderRadiusTopRight?: string;
  $borderRadiusBottomLeft?: string;
  $borderRadiusBottomRight?: string;
  $imageUrl?: string;
  $color?: string;
}

export const BoxContainer = styled.div<BoxContainerProps>`
  width: ${({ $width }) => $width || "100px"};
  height: ${({ $height }) => $height || "100px"};

  border-top-left-radius: ${({ $borderRadiusTopLeft }) =>
    $borderRadiusTopLeft || "0"};
  border-top-right-radius: ${({ $borderRadiusTopRight }) =>
    $borderRadiusTopRight || "0"};
  border-bottom-left-radius: ${({ $borderRadiusBottomLeft }) =>
    $borderRadiusBottomLeft || "0"};
  border-bottom-right-radius: ${({ $borderRadiusBottomRight }) =>
    $borderRadiusBottomRight || "0"};

  ${({ $imageUrl, $color }) =>
    $imageUrl
      ? `
          background: url(${$imageUrl}) no-repeat center center;
          background-size: cover;
        `
      : `
          background-color: ${$color || "#fff"};
        `}
`;
