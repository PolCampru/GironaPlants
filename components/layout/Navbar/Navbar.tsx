"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import {
  NavbarWrapper,
  LogoContainer,
  MenuContainer,
  NavItem,
  RightContainer,
} from "./Navbar.style";
import LanguageSelector from "@/components/specific/LanguageSelector/LanguageSelector";

const Navbar = () => {
  const { t, i18n, ready } = useTranslation();

  const navbarItems = t("navbar.paths", {
    returnObjects: true,
  }) as { name: string; url: string }[];

  const LanguageSelectorData = t("navbar.budget", {
    returnObjects: true,
  }) as { [key: string]: string };

  if (!ready) return <div>Loading...</div>;

  return (
    <NavbarWrapper>
      <LogoContainer>
        <img src={t("logo.src") as string} alt={t("logo.alt")} />
      </LogoContainer>

      <MenuContainer>
        {navbarItems.map((item) => (
          <NavItem
            key={item.name}
            href={item.url}
            selected={window.location.pathname === item.url}
          >
            {item.name}
          </NavItem>
        ))}
      </MenuContainer>

      <RightContainer>
        <LanguageSelector i18n={i18n} data={LanguageSelectorData} />
      </RightContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
