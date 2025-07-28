import { getFontWeight } from "@/theme";
import { Theme } from "@/types/style";
import { StyleSheet } from "react-native";

export const createTextStyles = (theme: Theme, isRTL: boolean) =>
  StyleSheet.create({
    // Title text
    title: {
      fontSize: 24,
      textAlign: "center",
      marginBottom: 30,
      color: "#333",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // White text
    whiteText: {
      color: "white",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Black text
    blackText: {
      color: "black",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Language text
    langText: {
      fontSize: 14,
      color: "#333",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Logo text
    logoText: {
      fontSize: 18,
      color: "#666",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Description text
    descriptionText: {
      fontSize: 24,
      color: "#2c3e50",
      textAlign: "center",
      lineHeight: 36,
      marginBottom: 12,
      includeFontPadding: false,
    },

    // Sub description text
    subDescriptionText: {
      fontSize: 16,
      color: "#7f8c8d",
      textAlign: "center",
      lineHeight: 24,
      includeFontPadding: false,
    },

    // Contact text
    contactText: {
      fontSize: 16,
      color: "#e74c3c",
      fontWeight: "500",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Badge text
    badgeText: {
      fontSize: theme.fontSize.sm,
      fontWeight: getFontWeight(theme.fontWeight.medium),
      color: theme.text.inverse,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Progress text
    progressText: {
      fontSize: theme.fontSize.sm,
      color: theme.text.secondary,
      textAlign: isRTL ? "left" : "right",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Material title
    MaterialTitle: {
      fontSize: 12,
      color: "#1f2937",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Material description
    MaterialDescription: {
      fontSize: 14,
      color: "#4b5563",
      textAlign: "center",
      lineHeight: 20,
      marginBottom: 20,
      includeFontPadding: false,
    },

    // Detail label
    detailLabel: {
      fontSize: 14,
      color: "#6b7280",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Detail value
    detailValue: {
      fontSize: 14,
      fontWeight: "600",
      color: "#1f2937",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
  });
