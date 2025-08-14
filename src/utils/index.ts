import { useTranslationContext } from "@/context/TranslationContext";
import { I18nManager } from "react-native";

export const ConfigureRTL = () => {
  const { language } = useTranslationContext();
  const isRTL = language === "ar";
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
};

export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
    case "مؤكد":
      return "#4CAF50";
    case "pending":
    case "في الانتظار":
      return "#FF9800";
    case "in_progress":
    case "قيد التنفيذ":
      return "#2196F3";
    case "resolved":
    case "تم الحل":
      return "#4CAF50";
    case "closed":
    case "مغلق":
      return "#9E9E9E";
    case "cancelled":
    case "ملغي":
      return "#F44336";
    default:
      return "#757575";
  }
};
