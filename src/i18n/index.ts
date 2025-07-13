import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "../locales/ar.json";
import en from "../locales/en.json";

const defaultLang = Localization.getLocales()[0]?.languageCode ?? "en";

i18n.use(initReactI18next).init({
  lng: defaultLang.includes("ar") ? "ar" : "en",
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
