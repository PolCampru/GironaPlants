"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  FooterWrapper,
  HorizontalLine,
  ContactContainer,
  Logo,
  InfoContainer,
  ImageFooter,
} from "./Footer.style";
import { useRouter, usePathname } from "next/navigation";

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

const logoVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const Footer = () => {
  const { t } = useTranslation(["footer", "common"]);
  const router = useRouter();
  const pathname = usePathname();
  const [currentLanguage, setCurrentLanguage] = React.useState("");

  React.useEffect(() => {
    if (pathname) {
      const lang = pathname.split("/")[1];
      setCurrentLanguage(lang);
    }
  }, [pathname]);

  const data = t("footer", { returnObjects: true }) as {
    contact?: {
      email?: string;
      phone?: string;
      title?: string;
      rights?: string;
      privacyPolicy?: string;
      termsOfService?: string;
    };
  };

  const logo = t("logo", { ns: "common", returnObjects: true }) as {
    src: string;
    alt: string;
  };

  const contact = data.contact || {};

  const mailTo = () => {
    if (contact.email) {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  const callPhone = () => {
    if (contact.phone) {
      window.location.href = `tel:${contact.phone}`;
    }
  };

  const handlePrivacyClick = () => {
    if (currentLanguage) {
      router.push(`/${currentLanguage}/privacy`);
    }
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      animate="visible"
      style={{ position: "relative" }}
    >
      <FooterWrapper>
        <ContactContainer>
          <Logo>
            {logo.src && (
              <motion.img
                variants={logoVariants}
                whileHover="hover"
                src={logo.src}
                alt={logo.alt || "Logo"}
                width="100%"
                height="100%"
              />
            )}
          </Logo>
          {contact.title && (
            <motion.p variants={itemVariants}>{contact.title}</motion.p>
          )}
          {contact.phone && (
            <motion.p
              onClick={callPhone}
              variants={itemVariants}
              style={{ cursor: "pointer" }}
            >
              {contact.phone}
            </motion.p>
          )}
          {contact.email && (
            <motion.p
              onClick={mailTo}
              variants={itemVariants}
              style={{ cursor: "pointer" }}
            >
              {contact.email}
            </motion.p>
          )}
        </ContactContainer>
        <HorizontalLine />
        <InfoContainer>
          {contact.rights && (
            <motion.p variants={itemVariants}>
              © {new Date().getFullYear()} {contact.rights}
            </motion.p>
          )}
          <div style={{ display: "flex", gap: "1rem" }}>
            {contact.privacyPolicy && (
              <motion.p
                style={{ cursor: "pointer" }}
                variants={itemVariants}
                onClick={handlePrivacyClick}
                role="button"
                tabIndex={0}
              >
                {contact.privacyPolicy}
              </motion.p>
            )}
          </div>
        </InfoContainer>
        <ImageFooter>
          <motion.img
            src="/images/imageFooter.png"
            alt="Footer"
            width="100%"
            height="100%"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </ImageFooter>
      </FooterWrapper>
    </motion.footer>
  );
};

export default Footer;
