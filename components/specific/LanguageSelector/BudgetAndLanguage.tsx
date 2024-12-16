import React from "react";
import {
  BudgetContainer,
  BudgetAndLanguageWrapper,
} from "./BudgetAndLanguage.style";

interface LanguageSelectorProps {
  i18n: any;
  data: { [key: string]: string };
}

const BudgetAndLanguage = ({ i18n, data }: LanguageSelectorProps) => {
  console.log(data);
  const languages = i18n.options.supportedLngs;
  console.log(languages);
  return (
    <BudgetAndLanguageWrapper>
      <BudgetContainer>
        <img src={data.src} alt={data.alt} />
        <p>{data.title}</p>
      </BudgetContainer>
    </BudgetAndLanguageWrapper>
  );
};

export default BudgetAndLanguage;
