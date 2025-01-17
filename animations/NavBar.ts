export const navbarVariants = {
  hidden: { y: -100, transition: { duration: 1 } },
  visible: { y: 0, transition: { duration: 0.4 } },
};

export const menuVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.2, staggerChildren: 0.1 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const navbarVariantsScroll = {
  hidden: { y: -100, transition: { duration: 1 } },
  visible: { y: 0, transition: { duration: 0.4 } },
};
