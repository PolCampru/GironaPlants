import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { track } from "@/lib/analytics";

interface UseBudgetAndLanguageProps {
  i18n: any;
}

const useBudgetAndLanguage = ({ i18n }: UseBudgetAndLanguageProps) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState<boolean>(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState<boolean>(false);

  const { items } = useSelector((state: RootState) => state.cart);

  const router = useRouter();
  const pathname = usePathname();

  const languages = i18n.options.supportedLngs.filter(
    (lng: string) => lng !== "cimode"
  );

  // i18n.language is undefined on the server. The URL always carries the
  // locale, so prefer it and let i18n be the fallback.
  const localeFromPath = pathname?.split("/").filter(Boolean)[0];
  const currentLanguage: string =
    (localeFromPath && languages.includes(localeFromPath)
      ? localeFromPath
      : i18n.language) ?? "es";

  const toggleLanguageMenu = () => {
    setIsLanguageOpen((prev) => !prev);
  };

  const handleLanguageSelect = async (lng: string) => {
    if (lng === currentLanguage) {
      setIsLanguageOpen(false);
      return;
    }

    try {
      track("language_switch", { from: currentLanguage, to: lng });
      await i18n.changeLanguage(lng);
      updateURLWithLanguage(lng);
    } finally {
      setIsLanguageOpen(false);
    }
  };

  const updateURLWithLanguage = (lng: string) => {
    const pathSegments = pathname.split("/").filter(Boolean);

    if (pathSegments.length === 0) {
      router.push(`/${lng}`);
      return;
    }


    const firstSegment = pathSegments[0];
    const isFirstSegmentLanguage = languages.includes(firstSegment);


    let newPath;
    if (isFirstSegmentLanguage) {
      pathSegments[0] = lng;
      newPath = `/${pathSegments.join("/")}`;
    } else {
      newPath = `/${lng}/${pathSegments.join("/")}`;
    }


    router.push(newPath);
  };

  useEffect(() => {
    const handleClickOutsideLanguage = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("#language-container")) {
        setIsLanguageOpen(false);
      }
    };

    if (isLanguageOpen) {
      document.addEventListener("mousedown", handleClickOutsideLanguage);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideLanguage);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideLanguage);
    };
  }, [isLanguageOpen]);

  useEffect(() => {
    const handleClickOutsideBudget = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest("#budget-drawer") &&
        !target.closest("#budget-container")
      ) {
        setIsBudgetOpen(false);
      }
    };

    if (isBudgetOpen) {
      document.addEventListener("mousedown", handleClickOutsideBudget);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideBudget);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideBudget);
    };
  }, [isBudgetOpen]);

  return {
    isLanguageOpen,
    isBudgetOpen,
    toggleLanguageMenu,
    setIsBudgetOpen,
    handleLanguageSelect,
    languages,
    currentLanguage,
    items,
  };
};

export default useBudgetAndLanguage;
