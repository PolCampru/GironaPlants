"use client";

import { useState } from "react";
import {
  NavbarWrapper,
  LogoContainer,
  MenuContainer,
  NavItem,
  RightContainer,
  SelectedBackground,
  Hamburger,
  MobileMenu,
} from "./Navbar.style";
import BudgetAndLanguage from "@/components/specific/BudgetAndLanguageSelector/BudgetAndLanguage";
import { motion } from "framer-motion";
import Link from "next/link";
import Loader from "@/components/ui/Loader/Loader";
import {
  itemVariants,
  menuVariants,
  navbarVariants,
} from "@/animations/NavBar";
import useModal from "@/hooks/useModal";
import Modal from "../Modal/Modal";
import ModalAddPlant from "../Modal/ModalAddPlant/ModalAddPlant";
import { FiMenu, FiX } from "react-icons/fi";
import useBudgetAndLanguage from "@/hooks/useBudgetAndLanguage";

const Navbar = () => {
  const {
    modalState,
    setHideModal,
    ready,
    scrollDirection,
    logo,
    navbarItems,
    pathname,
    LanguageSelectorData,
    i18n,
  } = useModal();

  const {
    isLanguageOpen,
    isBudgetOpen,
    toggleLanguageMenu,
    setIsBudgetOpen,
    handleLanguageSelect,
    languages,
    currentLanguage,
    items,
  } = useBudgetAndLanguage({ i18n });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  if (!ready) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <motion.div
        variants={navbarVariants}
        initial="visible"
        animate={
          scrollDirection === "down" && !isBudgetOpen ? "hidden" : "visible"
        }
        style={{ width: "100%", position: "fixed", top: 0, zIndex: 999 }}
      >
        <NavbarWrapper>
          <LogoContainer
            as={motion.div}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <img src={logo.src} alt={logo.alt} />
          </LogoContainer>

          <MenuContainer
            as={motion.div}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
          >
            {Array.isArray(navbarItems) &&
              navbarItems.map((item) => {
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
            <BudgetAndLanguage
              i18n={i18n}
              data={LanguageSelectorData}
              setHideModal={setHideModal}
              isLanguageOpen={isLanguageOpen}
              isBudgetOpen={isBudgetOpen}
              toggleLanguageMenu={toggleLanguageMenu}
              setIsBudgetOpen={setIsBudgetOpen}
              handleLanguageSelect={handleLanguageSelect}
              languages={languages}
              currentLanguage={currentLanguage}
              items={items}
            />

            <Hamburger onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </Hamburger>
          </RightContainer>
        </NavbarWrapper>

        {modalState.value === "addPlant" && (
          <Modal closeModal={setHideModal}>
            <ModalAddPlant closeModal={setHideModal} />
          </Modal>
        )}
      </motion.div>

      {isMobileMenuOpen && (
        <MobileMenu
          as={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {Array.isArray(navbarItems) &&
            navbarItems.map((item) => {
              const isSelected = pathname === item.url;
              return (
                <NavItem
                  key={item.name}
                  selected={isSelected}
                  onClick={toggleMobileMenu}
                >
                  <Link href={item.url}>
                    {item.name}
                    {isSelected && (
                      <SelectedBackground
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
        </MobileMenu>
      )}
    </>
  );
};

export default Navbar;
