import React from "react";
import { LoaderContainer, Corners, Corner } from "./Loader.style";

const defaultPalette = ["#0F6C3F", "#118B50", "#13A461", "#16C772"];

interface LoaderProps {
  size?: number;
  duration?: number;
  colors?: string[];
}

const Loader = ({ size = 60, duration = 3, colors }: LoaderProps) => {
  const cornerColors = colors && colors.length === 4 ? colors : defaultPalette;

  return (
    <LoaderContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Corners $size={size} $duration={duration}>
        <Corner $variant={1} $color={cornerColors[0]} $duration={duration} />
        <Corner $variant={2} $color={cornerColors[1]} $duration={duration} />
        <Corner $variant={3} $color={cornerColors[2]} $duration={duration} />
        <Corner $variant={4} $color={cornerColors[3]} $duration={duration} />
      </Corners>
    </LoaderContainer>
  );
};

export default Loader;
