"use client";

import React, { useEffect } from "react";
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
import { useRouter, usePathname } from "next/navigation";

interface LanguageSelectorProps {
  i18n: any;
  data: { [key: string]: string };
}

const BudgetAndLanguage = ({ i18n, data }: LanguageSelectorProps) => {
  const [isLanguageOpen, setIsLanguageOpen] = React.useState<boolean>(false);
  const [isBudgetOpen, setIsBudgetOpen] = React.useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const languages = i18n.options.supportedLngs.filter(
    (lng: string) => lng !== "cimode"
  );
  const currentLanguage = i18n.language;

  const toggleLanguageMenu = () => {
    setIsLanguageOpen((prev) => !prev);
  };

  const handleLanguageSelect = (lng: string) => {
    if (lng === currentLanguage) {
      setIsLanguageOpen(false);
      return;
    }

    i18n.changeLanguage(lng);

    updateURLWithLanguage(lng);

    setIsLanguageOpen(false);
  };

  const updateURLWithLanguage = (lng: string) => {
    const pathSegments = pathname.split("/").filter(Boolean);

    if (pathSegments.length === 0) {
      router.push(`/${lng}`);
      return;
    }

    const firstSegment = pathSegments[0];

    const isFirstSegmentLanguage =
      i18n.options.supportedLngs.includes(firstSegment);

    if (isFirstSegmentLanguage) {
      pathSegments[0] = lng;
    } else {
      pathSegments.unshift(lng);
    }

    const newPath = `/${pathSegments.join("/")}`;
    router.push(newPath);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("#language-container")) {
        setIsLanguageOpen(false);
      }
    };

    if (isLanguageOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLanguageOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest("#budget-drawer") &&
        !target.closest("#budget-container")
      ) {
        setIsBudgetOpen(false);
      }
    };

    if (isBudgetOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBudgetOpen]);

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
                <img src="/images/crossIcon.svg" alt="Cross" />
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
