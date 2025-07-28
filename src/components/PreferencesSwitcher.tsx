// components/LanguageSwitcher.tsx
import { useTheme } from "@/context/ThemeContext";
import { useTranslationContext } from "@/context/TranslationContext";
import { createStyles } from "@/styles/styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text } from "react-native";
import AppText from "./AppText";

export const LanguageSwitcher: React.FC = () => {
  const { toggleLanguage, language } = useTranslationContext();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Pressable onPress={toggleLanguage} style={styles.switcher}>
      <Ionicons name="globe-outline" size={12} color="#333" />
      <AppText style={styles.langText}>
        {language === "ar" ? "العربية" : "English"}
      </AppText>
    </Pressable>
  );
};

export const ThemeToggle: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  const styles = createStyles(theme);

  return (
    <Pressable onPress={toggleTheme} style={styles.switcher}>
      <Ionicons name={isDark ? "moon" : "sunny"} size={12} color="#333" />
      <Text style={styles.langText}>{isDark ? "Dark" : "Light"}</Text>
    </Pressable>
  );
};
