// components/ThemeToggle.tsx
import { useTheme } from "@/context/ThemeContext";
import { Theme } from "@/types/style";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ThemeToggle: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleTheme} style={styles.langSwitcher}>
        <Ionicons name={isDark ? "moon" : "sunny"} size={12} color="#333" />
        <Text style={styles.langText}>{isDark ? "Dark" : "Light"}</Text>
      </Pressable>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      top: 10,
      left: 50,
      zIndex: 9999,
    },
    langSwitcher: {
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
      paddingVertical: 4,
      paddingHorizontal: 4,
      borderRadius: 8,
      backgroundColor: "#f2f2f2",
      borderWidth: 0.1,
      maxWidth: 45,
    },
    langText: {
      fontSize: 10,
      fontWeight: "bold",
      color: "#333",
    },
  });

export default ThemeToggle;
