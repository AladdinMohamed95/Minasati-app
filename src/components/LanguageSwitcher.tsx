import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  return (
    <Pressable onPress={toggleLanguage}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ fontSize: 16 }}>🌐</Text>
        <Text style={{ fontSize: 16 }}>
          {i18n.language === "ar" ? "العربية" : "English"}
        </Text>
      </View>
    </Pressable>
  );
}
