"use client";

import React from "react";
import {
  BudgetContainer,
  BudgetAndLanguageWrapper,
  Line,
  LanguageContainer,
  LanguageButton,
  DropdownMenu,
  DropdownItem,
  BudgetDrawer,
  Overlay,
  CloseButton,
} from "./BudgetAndLanguage.style";
import { AnimatePresence } from "framer-motion";
import BudgetNavbar from "./BudgetNavbar/BudgetNavbar";

interface LanguageSelectorProps {
  i18n: any;
  data: { [key: string]: string };
  setHideModal: () => void;

  isLanguageOpen: boolean;
  isBudgetOpen: boolean;
  toggleLanguageMenu: () => void;
  setIsBudgetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLanguageSelect: (lng: string) => void;
  languages: string[];
  currentLanguage: string;
  items: any[];
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
  return (
    <BudgetAndLanguageWrapper>
      <BudgetContainer
        id="budget-container"
        onClick={() => setIsBudgetOpen(true)}
      >
        <img src={data.srcList} alt={data.altList} />
        <p>{data.title}</p>
        <span>{items.length}</span>
      </BudgetContainer>

      <Line />

      <LanguageContainer
        style={{ position: "relative" }}
        id="language-container"
      >
        <LanguageButton
          isOpen={isLanguageOpen}
          onClick={toggleLanguageMenu}
          initial={false}
          animate={{
            backgroundColor: isLanguageOpen
              ? "rgba(17, 139, 80, 1)"
              : "rgba(250, 247, 240, 1)",
          }}
          role="button"
          aria-haspopup="true"
          aria-expanded={isLanguageOpen}
        >
          {currentLanguage.toUpperCase()}
          <img src={data.srcVector} alt={data.altVector} />
        </LanguageButton>

        <AnimatePresence>
          {isLanguageOpen && (
            <DropdownMenu
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              role="menu"
            >
              {languages.map((lng: string) => (
                <DropdownItem
                  key={lng}
                  onClick={() => handleLanguageSelect(lng)}
                  role="menuitem"
                  tabIndex={0}
                  style={{
                    backgroundColor:
                      currentLanguage === lng
                        ? "rgba(17, 139, 80, 1)"
                        : undefined,
                    color:
                      currentLanguage === lng
                        ? "rgba(250, 247, 240, 1)"
                        : undefined,
                  }}
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
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBudgetOpen(false)}
            />
            <BudgetDrawer
              id="budget-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <CloseButton onClick={() => setIsBudgetOpen(false)}>
                <img src="/images/crossIcon.svg" alt="Close" />
              </CloseButton>
              <BudgetNavbar
                lng={currentLanguage}
                setHideModal={setIsBudgetOpen}
              />
            </BudgetDrawer>
          </>
        )}
      </AnimatePresence>
    </BudgetAndLanguageWrapper>
  );
};

export default BudgetAndLanguage;
