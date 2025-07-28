
import { getFontWeight } from "@/theme";
import { Theme } from "@/types/style";
import { StyleSheet } from "react-native";

export const createButtonStyles = (theme: Theme, isRTL: boolean) =>
  StyleSheet.create({
    // Primary button styles
    primaryButton: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
    },

    primaryText: {
      color: "#fff",
      fontSize: 18,
      letterSpacing: 1,
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Secondary button styles
    secondaryButton: {
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      paddingHorizontal: 24,
    },

    secondaryText: {
      color: "#2c3e50",
      fontSize: 18,
      textDecorationLine: "underline",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Quiz button styles
    quizButton: {
      backgroundColor: theme.learning.quiz,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.base,
      borderRadius: theme.borderRadius.base,
      alignItems: "center",
      justifyContent: "center",
    },

    // Button text styles
    buttonText: {
      color: theme.text.inverse,
      fontSize: theme.fontSize.base,
      fontWeight: getFontWeight(theme.fontWeight.medium),
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    secondaryButtonText: {
      color: theme.brand.primary,
      fontSize: theme.fontSize.base,
      fontWeight: getFontWeight(theme.fontWeight.medium),
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // View profile button
    viewProfileButton: {
      backgroundColor: "#2563eb",
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },

    viewProfileText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Explore button
    exploreButton: {
      backgroundColor: "#7c3aed",
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },

    exploreButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Close button
    closeButton: {
      padding: 4,
      borderRadius: 16,
      backgroundColor: "#f3f4f6",
      alignItems: "center",
      justifyContent: "center",
    },

    // Buttons container
    buttonsContainer: {
      marginBottom: 10,
      flex: 1,
    },
  });
