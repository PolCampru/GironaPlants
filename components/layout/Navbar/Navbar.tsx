"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import {
  NavbarWrapper,
  LogoContainer,
  MenuContainer,
  NavItem,
  RightContainer,
  SelectedBackground,
} from "./Navbar.style";
import BudgetAndLanguage from "@/components/specific/LanguageSelector/BudgetAndLanguage";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loader from "@/components/ui/Loader/Loader";

const Navbar = () => {
  const { t, i18n, ready } = useTranslation();
  const pathname = usePathname();

  const navbarItems = t("navbar.paths", {
    returnObjects: true,
  }) as { name: string; url: string }[];

  const LanguageSelectorData = t("navbar.budgetAndLanguage", {
    returnObjects: true,
  }) as { [key: string]: string };

  if (!ready)
    return (
      <div>
        <Loader />
      </div>
    );

  const navbarVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50 },
    },
  };

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.2, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      style={{ width: "100%" }}
    >
      <NavbarWrapper>
        <LogoContainer
          as={motion.div}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <img src={t("logo.src") as string} alt={t("logo.alt")} />
        </LogoContainer>

        <MenuContainer
          as={motion.div}
          variants={menuVariants}
          initial="hidden"
          animate="visible"
        >
          {navbarItems.map((item) => {
            const isSelected = pathname === item.url;
            return (
              <NavItem
                as={motion.div}
                key={item.name}
                variants={itemVariants}
                selected={isSelected}
              >
                <Link href={item.url}>
                  {item.name}
                  {isSelected && (
                    <SelectedBackground
                      layoutId="selectedBackground"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </NavItem>
            );
          })}
        </MenuContainer>

        <RightContainer
          as={motion.div}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <BudgetAndLanguage i18n={i18n} data={LanguageSelectorData} />
        </RightContainer>
      </NavbarWrapper>
    </motion.div>
  );
};

export default Navbar;
