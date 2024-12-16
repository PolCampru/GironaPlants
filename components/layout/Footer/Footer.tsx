"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FooterWrapper, Logo, FooterImage } from "./Footer.style";

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const logoVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const blurVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 0.3,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const Footer = () => {
  const { t } = useTranslation();
  const data = t("footer", { returnObjects: true }) as {
    [key: string]: any;
  };
  const logo = t("logo", { returnObjects: true }) as { [key: string]: string };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      style={{ position: "relative" }}
    >
      <FooterWrapper>
        <Logo as={motion.div} whileHover="hover" variants={logoVariants}>
          <img
            src={logo.src}
            alt={logo.alt}
            style={{ width: "100%", height: "100%" }}
          />
        </Logo>
        <motion.h2 variants={itemVariants}>{data.contact?.title}:</motion.h2>
        <motion.p variants={itemVariants}>{data.contact?.phone}</motion.p>
        <motion.p variants={itemVariants}>{data.contact?.email}</motion.p>

        <FooterImage
          as={motion.div}
          variants={imageVariants}
          whileHover="hover"
        >
          <img
            src={data.image?.src}
            alt={data.image?.alt}
            style={{ width: "100%", height: "100%" }}
          />
        </FooterImage>
      </FooterWrapper>
    </motion.footer>
  );
};

export default Footer;
