import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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
