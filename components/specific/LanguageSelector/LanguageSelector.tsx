import React from "react";
import {
  BudgetContainer,
  LanguageSelectorWrapper,
} from "./LanguageSelector.style";

interface LanguageSelectorProps {
  i18n: any;
  data: { [key: string]: string };
}

const LanguageSelector = ({ i18n, data }: LanguageSelectorProps) => {
  console.log(data);
  const languages = i18n.options.supportedLngs;
  console.log(languages);
  return (
    <LanguageSelectorWrapper>
      <BudgetContainer>
        <img src={data.src} alt={data.alt} />
        <p>{data.title}</p>
      </BudgetContainer>
    </LanguageSelectorWrapper>
  );
};

export default LanguageSelector;
