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
import Image from "next/image";

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
      role="contentinfo"
      aria-label="Información de contacto y enlaces relacionados"
    >
      <FooterWrapper>
        <ContactContainer>
          <Logo>
            {logo.src && (
              <motion.div variants={logoVariants} whileHover="hover">
                <Image
                  src={logo.src}
                  alt={logo.alt || "Logo de Girona Plants"}
                  width={150}
                  height={80}
                  priority={false}
                  loading="lazy"
                />
              </motion.div>
            )}
          </Logo>
          {contact.title && (
            <motion.h2 variants={itemVariants}>{contact.title}</motion.h2>
          )}
          {contact.phone && (
            <motion.a
              href={`tel:${contact.phone}`}
              variants={itemVariants}
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
              }}
              aria-label={`Llamar a Girona Plants: ${contact.phone}`}
            >
              {contact.phone}
            </motion.a>
          )}
          {contact.email && (
            <motion.a
              href={`mailto:${contact.email}`}
              variants={itemVariants}
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
              }}
              aria-label={`Enviar email a Girona Plants: ${contact.email}`}
            >
              {contact.email}
            </motion.a>
          )}
        </ContactContainer>
        <HorizontalLine />
        <InfoContainer>
          {contact.rights && (
            <motion.p variants={itemVariants}>
              © {new Date().getFullYear()} {contact.rights}
            </motion.p>
          )}
          <nav aria-label="Enlaces legales">
            {contact.privacyPolicy && (
              <motion.a
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                }}
                variants={itemVariants}
                onClick={handlePrivacyClick}
                onKeyDown={(e) => e.key === "Enter" && handlePrivacyClick()}
                role="link"
                tabIndex={0}
                aria-label="Ir a la página de política de privacidad"
              >
                {contact.privacyPolicy}
              </motion.a>
            )}
          </nav>
        </InfoContainer>
        <ImageFooter>
          <Image
            src="/images/imageFooter.png"
            alt="Imagen decorativa de plantas en el vivero Girona Plants"
            width={500}
            height={300}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            loading="lazy"
          />
        </ImageFooter>
      </FooterWrapper>
    </motion.footer>
  );
};

export default Footer;
