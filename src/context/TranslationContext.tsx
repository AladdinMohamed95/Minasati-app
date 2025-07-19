import i18n from "@/i18n";
import { createContext, useContext, useState } from "react";

type TranslationContextType = {
  language: "en" | "ar";
  toggleLanguage: () => void;
};

const TranslationContext = createContext<TranslationContextType>({
  language: "ar",
  toggleLanguage: () => {},
});

export const TranslationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [language, setLanguage] = useState<"en" | "ar">(
    i18n.language as "en" | "ar"
  );

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  return (
    <TranslationContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => useContext(TranslationContext);
