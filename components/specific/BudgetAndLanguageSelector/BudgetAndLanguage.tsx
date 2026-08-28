"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { FiChevronDown, FiFileText, FiX } from "react-icons/fi";
import {
  BudgetAndLanguageWrapper,
  BudgetButton,
  BudgetDrawer,
  CloseButton,
  CountBadge,
  DrawerBody,
  DrawerHeader,
  DropdownItem,
  DropdownMenu,
  LanguageButton,
  LanguageContainer,
  Overlay,
} from "./BudgetAndLanguage.style";
import BudgetNavbar from "./BudgetNavbar/BudgetNavbar";
import useUiLabels from "@/hooks/useUiLabels";

interface LanguageSelectorProps {
  i18n: unknown;
  data: { [key: string]: string };
  setHideModal: () => void;
  isLanguageOpen: boolean;
  isBudgetOpen: boolean;
  toggleLanguageMenu: () => void;
  setIsBudgetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLanguageSelect: (lng: string) => void;
  languages: string[];
  currentLanguage: string;
  items: unknown[];
}

const BudgetAndLanguage = ({
  data,
  isLanguageOpen,
  isBudgetOpen,
  toggleLanguageMenu,
  setIsBudgetOpen,
  handleLanguageSelect,
  languages,
  currentLanguage,
  items,
}: LanguageSelectorProps) => {
  // i18n.language is undefined during the server render, and this component
  // now renders on the server (the navbar no longer hides behind a spinner),
  // so the old `currentLanguage.toUpperCase()` threw and 500'd every page.
  const activeLanguage = currentLanguage || "es";
  const labels = useUiLabels();
  const budgetLabel = data?.title ?? "";

  return (
    <BudgetAndLanguageWrapper>
      <BudgetButton
        id="budget-container"
        type="button"
        onClick={() => setIsBudgetOpen(true)}
        aria-label={`${budgetLabel} (${items.length})`}
      >
        {/* Was an <img> of a list icon that had to be fetched and optimised
            for a 24px glyph. */}
        <FiFileText aria-hidden="true" size={17} />
        <span data-label>{budgetLabel}</span>
        <CountBadge>{items.length}</CountBadge>
      </BudgetButton>

      <LanguageContainer id="language-container">
        <LanguageButton
          type="button"
          $isOpen={isLanguageOpen}
          onClick={toggleLanguageMenu}
          aria-haspopup="menu"
          aria-expanded={isLanguageOpen}
          aria-label={`${labels.language}: ${activeLanguage.toUpperCase()}`}
        >
          {activeLanguage.toUpperCase()}
          <FiChevronDown aria-hidden="true" size={15} />
        </LanguageButton>

        <AnimatePresence>
          {isLanguageOpen && (
            <DropdownMenu
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              role="menu"
            >
              {languages.map((lng: string) => (
                <DropdownItem
                  key={lng}
                  $active={activeLanguage === lng}
                  onClick={() => handleLanguageSelect(lng)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleLanguageSelect(lng);
                    }
                  }}
                  role="menuitemradio"
                  aria-checked={activeLanguage === lng}
                  tabIndex={0}
                >
                  {lng.toUpperCase()}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </AnimatePresence>
      </LanguageContainer>

      <AnimatePresence>
        {isBudgetOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsBudgetOpen(false)}
            />
            <BudgetDrawer
              id="budget-drawer"
              role="dialog"
              aria-modal="true"
              aria-label={budgetLabel}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <DrawerHeader>
                <h2>{budgetLabel}</h2>
                <CloseButton
                  type="button"
                  onClick={() => setIsBudgetOpen(false)}
                  aria-label={labels.close}
                >
                  <FiX aria-hidden="true" size={20} />
                </CloseButton>
              </DrawerHeader>
              <DrawerBody>
                <BudgetNavbar setHideModal={setIsBudgetOpen} />
              </DrawerBody>
            </BudgetDrawer>
          </>
        )}
      </AnimatePresence>
    </BudgetAndLanguageWrapper>
  );
};

export default BudgetAndLanguage;
