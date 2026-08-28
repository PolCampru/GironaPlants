"use client";

import { useEffect, useState } from "react";
import {
  Hamburger,
  LogoLink,
  MenuContainer,
  MobileItem,
  MobileMenu,
  MobileScrim,
  NavBackdrop,
  NavItem,
  NavShell,
  NavbarWrapper,
  RightContainer,
} from "./Navbar.style";
import BudgetAndLanguage from "@/components/specific/BudgetAndLanguageSelector/BudgetAndLanguage";
import { AnimatePresence } from "framer-motion";
import useModal from "@/hooks/useModal";
import Modal from "../Modal/Modal";
import ModalAddPlant from "../Modal/ModalAddPlant/ModalAddPlant";
import { FiMenu, FiX } from "react-icons/fi";
import useBudgetAndLanguage from "@/hooks/useBudgetAndLanguage";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LOGO, getNavigation, navHref } from "@/data/navigation";
import { getUiLabels } from "@/data/uiLabels";
import { getLanguages } from "@/lib/languages";

const Navbar = () => {
  const { modalState, setHideModal, scrollDirection, i18n } = useModal();

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
  const currentPath = usePathname();

  // The locale comes from the URL, so the navbar renders identically on the
  // server and on the client. It used to come from react-i18next, which
  // resolves nothing during SSR: the server emitted an empty nav, the client
  // emitted six links, and React discarded the whole page on hydration.
  const locales = getLanguages();
  const segment = currentPath?.split("/")[1] ?? "";
  const lng = locales.includes(segment) ? segment : "es";
  const { items: menuItems, budgetLabel } = getNavigation(lng);
  const labels = getUiLabels(lng);

  // Route changes must close the menu; otherwise it stays open over the new
  // page after a tap.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  // Lock the page behind the open menu and let Escape close it.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen]);

  const homeHref = `/${lng}`;

  return (
    <>
      <NavShell
        initial={false}
        animate={{
          y:
            scrollDirection === "down" && !isBudgetOpen && !isMobileMenuOpen
              ? "-100%"
              : "0%",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <NavBackdrop>
          <NavbarWrapper aria-label={labels.mainNav}>
            <LogoLink href={homeHref} aria-label={LOGO.alt}>
              <Image
                src={LOGO.src}
                alt={LOGO.alt}
                width={120}
                height={60}
                style={{
                  width: "auto",
                  height: "2.375rem",
                  maxWidth: "7.5rem",
                  objectFit: "contain",
                }}
                sizes="(max-width: 768px) 100px, 120px"
                priority
              />
            </LogoLink>

            {/* The nav used to be replaced by a full-page spinner until
                translations resolved, which shifted the whole layout on every
                first paint. */}
            <MenuContainer>
              {menuItems.map((item) => {
                const href = navHref(lng, item.slug);
                const isSelected = currentPath === href;
                return (
                  <NavItem
                    key={item.slug}
                    href={href}
                    $selected={isSelected}
                    aria-current={isSelected ? "page" : undefined}
                  >
                    {item.name}
                  </NavItem>
                );
              })}
            </MenuContainer>

            <RightContainer>
              <BudgetAndLanguage
                i18n={i18n}
                data={{ title: budgetLabel }}
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

              <Hamburger
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? labels.closeMenu : labels.openMenu}
              >
                {isMobileMenuOpen ? (
                  <FiX size={22} aria-hidden="true" />
                ) : (
                  <FiMenu size={22} aria-hidden="true" />
                )}
              </Hamburger>
            </RightContainer>
          </NavbarWrapper>
        </NavBackdrop>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenu
              id="mobile-menu"
              key="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.18 }}
              aria-label={labels.mobileNav}
            >
              {menuItems.map((item) => {
                const href = navHref(lng, item.slug);
                const isSelected = currentPath === href;
                return (
                  <MobileItem
                    key={item.slug}
                    href={href}
                    $selected={isSelected}
                    aria-current={isSelected ? "page" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </MobileItem>
                );
              })}
            </MobileMenu>
          )}
        </AnimatePresence>
      </NavShell>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileScrim
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {modalState.value === "addPlant" && (
        <Modal closeModal={setHideModal}>
          <ModalAddPlant closeModal={setHideModal} />
        </Modal>
      )}
    </>
  );
};

export default Navbar;
