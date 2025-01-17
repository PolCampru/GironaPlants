"use client";

import {
  NavbarWrapper,
  LogoContainer,
  MenuContainer,
  NavItem,
  RightContainer,
  SelectedBackground,
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

  if (!ready) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <motion.div
      variants={navbarVariants}
      initial="visible"
      animate={scrollDirection === "down" ? "hidden" : "visible"}
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
          <BudgetAndLanguage
            i18n={i18n}
            data={LanguageSelectorData}
            setHideModal={setHideModal}
          />
        </RightContainer>
      </NavbarWrapper>

      {modalState.value === "addPlant" && (
        <Modal closeModal={setHideModal}>
          <ModalAddPlant closeModal={setHideModal} />
        </Modal>
      )}
    </motion.div>
  );
};

export default Navbar;
