import React from "react";
import { BoxContainer } from "./Box.style";

interface MyBoxProps {
  width?: string;
  height?: string;
  color?: string;
  borderRadiusTopLeft?: string;
  borderRadiusTopRight?: string;
  borderRadiusBottomLeft?: string;
  borderRadiusBottomRight?: string;
  imageUrl?: string;
  altText?: string;
}

const MyBox = ({
  width,
  height,
  color,
  borderRadiusTopLeft = "0rem",
  borderRadiusTopRight = "0rem",
  borderRadiusBottomLeft = "0rem",
  borderRadiusBottomRight = "0rem",
  imageUrl,
  altText = "",
}: MyBoxProps) => {
  return (
    <BoxContainer
      $width={width}
      $height={height}
      $color={color}
      $borderRadiusTopLeft={borderRadiusTopLeft}
      $borderRadiusTopRight={borderRadiusTopRight}
      $borderRadiusBottomLeft={borderRadiusBottomLeft}
      $borderRadiusBottomRight={borderRadiusBottomRight}
      $imageUrl={imageUrl}
      $altText={altText}
      aria-label={altText}
      role={imageUrl ? "img" : "presentation"}
    />
  );
};

export default MyBox;
