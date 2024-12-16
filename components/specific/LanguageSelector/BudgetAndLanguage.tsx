"use client";

import React from "react";
import {
  BudgetContainer,
  BudgetAndLanguageWrapper,
  Line,
  LanguageContainer,
  DropdownMenu,
  DropdownItem,
  BudgetDrawer,
  Overlay,
  CloseButton,
} from "./BudgetAndLanguage.style";
import { AnimatePresence } from "framer-motion";
import useBudgetAndLanguage from "@/hooks/useBudgetAndLanguage";

interface LanguageSelectorProps {
  i18n: any;
  data: { [key: string]: string };
}

const BudgetAndLanguage = ({ i18n, data }: LanguageSelectorProps) => {
  const {
    isLanguageOpen,
    isBudgetOpen,
    toggleLanguageMenu,
    setIsBudgetOpen,
    handleLanguageSelect,
    languages,
    currentLanguage,
  } = useBudgetAndLanguage({ i18n });

  return (
    <BudgetAndLanguageWrapper>
      <BudgetContainer
        id="budget-container"
        onClick={() => setIsBudgetOpen(true)}
      >
        <img src={data.srcList} alt={data.altList} />
        <p>{data.title}</p>
      </BudgetContainer>

      <Line />

      {/* Language Selector */}
      <div style={{ position: "relative" }} id="language-container">
        <LanguageContainer
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
        </LanguageContainer>

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
                >
                  {lng.toUpperCase()}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </AnimatePresence>
      </div>

      {/* Budget Drawer */}
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
              <div>
                <h2>Budget Details</h2>
                <p>This is where your budget component will be displayed.</p>
              </div>
            </BudgetDrawer>
          </>
        )}
      </AnimatePresence>
    </BudgetAndLanguageWrapper>
  );
};

export default BudgetAndLanguage;
