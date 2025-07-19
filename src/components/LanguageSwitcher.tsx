// components/LanguageSwitcher.tsx
import { useTranslationContext } from "@/context/TranslationContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const LanguageSwitcher = () => {
  const { toggleLanguage, language } = useTranslationContext();

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleLanguage} style={styles.langSwitcher}>
        <Ionicons name="globe-outline" size={12} color="#333" />
        <Text style={styles.langText}>{language === "ar" ? "ع" : "En"}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 9999,
  },
  langSwitcher: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
    borderWidth: 0.1,
    maxWidth: 38,
  },
  langText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
  },
});

export default LanguageSwitcher;
