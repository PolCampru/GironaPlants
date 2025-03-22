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

  const handleLanguageSelect = async (lng: string) => {
    if (lng === currentLanguage) {
      setIsLanguageOpen(false);
      return;
    }

    try {
      await i18n.changeLanguage(lng);
      updateURLWithLanguage(lng);
    } finally {
      setIsLanguageOpen(false);
    }
  };

  const updateURLWithLanguage = (lng: string) => {
    console.log("updateURLWithLanguage", lng);
    const pathSegments = pathname.split("/").filter(Boolean);

    console.log("pathSegments", pathSegments);
    if (pathSegments.length === 0) {
      router.push(`/${lng}`);
      return;
    }

    console.log("pathSegments", pathSegments);

    const firstSegment = pathSegments[0];
    const isFirstSegmentLanguage = languages.includes(firstSegment);

    console.log("isFirstSegmentLanguage", isFirstSegmentLanguage);

    let newPath;
    if (isFirstSegmentLanguage) {
      pathSegments[0] = lng;
      newPath = `/${pathSegments.join("/")}`;
    } else {
      newPath = `/${lng}/${pathSegments.join("/")}`;
    }

    console.log("newPath", newPath);

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
