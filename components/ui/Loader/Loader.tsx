import React from "react";
import { LoaderContainer, Corners, Corner } from "./Loader.style";

interface LoaderProps {
  size?: number;
  color?: string;
  duration?: number;
  colors?: string[];
}

const Loader = ({
  size = 60,
  color = "rgba(17, 139, 80, 1)",
  duration = 3,
  colors,
}: LoaderProps) => {
  const cornerColors =
    colors && colors.length === 4 ? colors : [color, color, color, color];

  return (
    <LoaderContainer>
      <Corners size={size} duration={duration}>
        <Corner variant={1} color={cornerColors[0]} duration={duration} />
        <Corner variant={2} color={cornerColors[1]} duration={duration} />
        <Corner variant={3} color={cornerColors[2]} duration={duration} />
        <Corner variant={4} color={cornerColors[3]} duration={duration} />
      </Corners>
    </LoaderContainer>
  );
};

export default Loader;
