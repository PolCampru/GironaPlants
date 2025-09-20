// Animaciones sutiles para scroll
export const fadeInUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  },
};

export const fadeInLeftVariants = {
  hidden: { 
    opacity: 0, 
    x: -40,
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

export const fadeInRightVariants = {
  hidden: { 
    opacity: 0, 
    x: 40,
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

export const scaleInVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.4, ease: "easeInOut" }
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const staggerItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 25,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};
