import { useTranslationContext } from "@/context/TranslationContext";
import { I18nManager } from "react-native";

export const ConfigureRTL = () => {
  const { language } = useTranslationContext();
  const isRTL = language === "ar";
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
};
