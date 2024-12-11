"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import {
  NavbarWrapper,
  LogoContainer,
  MenuContainer,
  NavItem,
  RightContainer,
  LanguageSelector,
  CartIcon,
} from "./Navbar.style";

const Navbar = () => {
  const { t, i18n, ready } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
  };

  const navbarItems = t("navbar", {
    returnObjects: true,
  }) as { name: string; url: string }[];

  if (!ready) return <div>Loading...</div>;

  return (
    <NavbarWrapper>
      <LogoContainer>
        <h1>{t("logo")}</h1>
      </LogoContainer>

      <MenuContainer>
        {navbarItems.map((item, index) => (
          <NavItem key={index} href={item.url}>
            {item.name}
          </NavItem>
        ))}
      </MenuContainer>

      <RightContainer>
        <CartIcon>
          <Image
            src="/images/cart-icon.svg"
            alt={t("cart")}
            width={20}
            height={20}
          />
        </CartIcon>
        <LanguageSelector>
          <span>{selectedLanguage.toUpperCase()}</span>
          <ul>
            {["ca", "en", "es", "fr"].map((lang) => (
              <li key={lang} onClick={() => changeLanguage(lang)}>
                {lang.toUpperCase()}
              </li>
            ))}
          </ul>
        </LanguageSelector>
      </RightContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
