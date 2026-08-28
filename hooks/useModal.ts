import { RootState } from "@/store";
import { hideModal, showModal } from "@/store/features/modalSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

/**
 * Modal state plus the scroll direction the navbar hides on.
 *
 * The navbar's own copy (links, logo, quote label) no longer comes from here:
 * it is static per-locale data now, because resolving it through i18n meant
 * the server rendered an empty navbar. See data/navigation.ts.
 */
const useModal = () => {
  const modalState = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  // Only the i18n instance is needed here, for the language switcher.
  const { i18n } = useTranslation();

  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      // Ignore the first sliver of scroll so the navbar does not flicker on
      // small trackpad movements at the top of the page.
      if (scrollY <= 80) setScrollDirection("up");
      else if (scrollY > lastScrollY + 6) setScrollDirection("down");
      else if (scrollY < lastScrollY - 6) setScrollDirection("up");

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      // The old handler ran layout-reading work on every scroll event.
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setShowModal = (modal: string) => {
    dispatch(showModal(modal));
  };

  const setHideModal = () => {
    dispatch(hideModal());
  };

  return {
    modalState,
    scrollDirection,
    i18n,
    setShowModal,
    setHideModal,
  };
};

export default useModal;
