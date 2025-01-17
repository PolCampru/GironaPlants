import { RootState } from "@/store";
import { hideModal, showModal } from "@/store/features/modalSlice";
import { i } from "framer-motion/client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const useModal = () => {
  const modalState = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const { t, i18n, ready } = useTranslation();
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      if (scrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (scrollY < lastScrollY) {
        setScrollDirection("up");
      }
      lastScrollY = scrollY;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, []);

  const setShowModal = (modal: string) => {
    dispatch(showModal(modal));
  };

  const setHideModal = () => {
    dispatch(hideModal());
  };

  const navbarItems = t("navbar.paths", {
    returnObjects: true,
  }) as { name: string; url: string }[];

  const LanguageSelectorData = t("navbar.budgetAndLanguage", {
    returnObjects: true,
  }) as { [key: string]: string };

  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

  return {
    modalState,
    pathname,
    navbarItems,
    LanguageSelectorData,
    scrollDirection,
    ready,
    t,
    i18n,
    setShowModal,
    setHideModal,
  };
};

export default useModal;
