export const shakeVariant = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  },
  initial: { x: 0 },
};

export const appearVariant = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
