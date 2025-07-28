import { Theme } from "@/types/style";
import { StyleSheet } from "react-native";

export const createProgressBarStyles = (theme: Theme, isRTL: boolean) =>
  StyleSheet.create({
    // Progress container
    progressContainer: {
      marginBottom: theme.spacing.base,
    },

    // Progress bar
    progressBar: {
      height: 8,
      backgroundColor: theme.ui.divider,
      borderRadius: theme.borderRadius.base,
      overflow: "hidden",
      marginBottom: theme.spacing.xs,
    },

    // Progress fill
    progressFill: {
      height: "100%",
      backgroundColor: theme.learning.progress,
    },

    // Progress text
    progressText: {
      fontSize: theme.fontSize.sm,
      color: theme.text.secondary,
      textAlign: isRTL ? "left" : "right",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
  });
