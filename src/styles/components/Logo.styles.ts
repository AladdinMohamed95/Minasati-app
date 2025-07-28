import { Theme } from "@/types/style";
import { StyleSheet } from "react-native";

export const createLogoStyles = (theme: Theme, isRTL: boolean) =>
  StyleSheet.create({
    // Logo container
    logoContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 60,
      marginBottom: 40,
    },

    // Logo placeholder
    logoPlaceholder: {
      width: 120,
      height: 120,
      backgroundColor: "#f0f0f0",
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#e0e0e0",
    },

    // Logo text
    logoText: {
      fontSize: 18,
      color: "#666",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
  });
