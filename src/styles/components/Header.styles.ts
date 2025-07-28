import { getFontWeight } from "@/theme";
import { Theme } from "@/types/style";
import { StyleSheet } from "react-native";

export const createHeaderStyles = (theme: Theme, isRTL: boolean) =>
  StyleSheet.create({
    // Main header
    header: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing.base,
    },

    // Header title
    headerTitle: {
      fontSize: theme.fontSize["lg"],
      fontWeight: getFontWeight(theme.fontWeight.bold),
      color: theme.text.link,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Header subtitle
    headerSubtitle: {
      fontSize: theme.fontSize["md"],
      fontWeight: getFontWeight(theme.fontWeight.medium),
      color: theme.text.secondary,
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
  });
