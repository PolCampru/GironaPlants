import { RootState } from "@/store";
import { hideModal, showModal } from "@/store/features/modalSlice";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const useModal = () => {
  const modalState = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const { t, i18n, ready } = useTranslation(["navbar", "common"]);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      if (scrollY === 0 || scrollY < 0) {
        setScrollDirection("up");
      } else if (scrollY > lastScrollY) {
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

  const navbarItems = t("paths", {
    returnObjects: true,
  }) as { name: string; url: string }[];

  const LanguageSelectorData = t("budgetAndLanguage", {
    returnObjects: true,
  }) as { [key: string]: string };

  const logo = t("logo", { ns: "common", returnObjects: true }) as {
    src: string;
    alt: string;
  };

  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

  return {
    modalState,
    pathname,
    navbarItems,
    LanguageSelectorData,
    scrollDirection,
    ready,
    logo,
    i18n,
    setShowModal,
    setHideModal,
  };
};

export default useModal;
