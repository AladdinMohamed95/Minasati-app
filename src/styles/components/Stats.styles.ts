import { getFontWeight } from "@/theme";
import { Theme } from "@/types/style";
import { Platform, StyleSheet } from "react-native";

export const createStatsStyles = (theme: Theme, isRTL: boolean) =>
  StyleSheet.create({
    // Stats container
    statsContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-around",
      backgroundColor: theme.background.card,
      margin: theme.spacing.base,
      padding: theme.spacing.base,
      borderRadius: theme.borderRadius.lg,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 2,
        },
      }),
    },

    // Stat item
    statItem: {
      alignItems: "center",
      justifyContent: "center",
    },

    // Stat number
    statNumber: {
      fontSize: theme.fontSize["3xl"],
      fontWeight: getFontWeight(theme.fontWeight.bold),
      color: theme.brand.primary,
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Stat label
    statLabel: {
      fontSize: theme.fontSize.sm,
      color: theme.text.secondary,
      marginTop: theme.spacing.xs,
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
  });
