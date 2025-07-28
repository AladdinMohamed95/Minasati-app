import { getFontWeight } from "@/theme";
import { Theme } from "@/types/style";
import { Platform, StyleSheet } from "react-native";

export const createCardStyles = (theme: Theme, isRTL: boolean) =>
  StyleSheet.create({
    // Base card styles
    card: {
      backgroundColor: theme.background.card,
      margin: theme.spacing.base,
      padding: theme.spacing.base,
      borderRadius: theme.borderRadius.lg,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }),
    },

    cardTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: getFontWeight(theme.fontWeight.semibold),
      color: theme.text.primary,
      marginBottom: theme.spacing.sm,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    cardDescription: {
      fontSize: theme.fontSize.base,
      color: theme.text.secondary,
      marginBottom: theme.spacing.base,
      lineHeight: 22,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
    },

    // Card container for grid layouts
    cardContainer: {
      width: "30%",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 10,
    },

    // Material card styles
    MaterialCard: {
      width: 50,
      height: 50,
      backgroundColor: theme.background.secondary,
      borderRadius: 12,
      marginBottom: 16,
      margin: 5,
      borderWidth: 1,
      borderColor: "#e5e7eb",
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

    // Teacher card styles
    teacherCard: {
      backgroundColor: theme.background.secondary,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: "#e5e7eb",
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

    // Stats container (card-like)
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

    // Difficulty badge
    difficultyBadge: {
      backgroundColor: theme.learning.difficulty.easy,
      alignSelf: isRTL ? "flex-end" : "flex-start",
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.base,
      marginBottom: theme.spacing.base,
    },

    mediumDifficulty: {
      backgroundColor: theme.learning.difficulty.medium,
    },

    // Gradient card
    gradient: {
      borderRadius: 16,
      marginBottom: 10,
      ...Platform.select({
        ios: {
          shadowColor: "#1cb5e0",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
        },
        android: {
          elevation: 6,
        },
      }),
    },
  });
