import { getFontWeight } from "@/theme";
import { AppStyles, Theme, TypedStyleSheet } from "@/types/style";
import { StyleSheet } from "react-native";

export const createStyles = (theme: Theme): TypedStyleSheet<AppStyles> =>
  StyleSheet.create<AppStyles>({
    container: {
      flex: 1,
      backgroundColor: theme.background.primary,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing.base,
      backgroundColor: theme.background.secondary,
    },
    headerTitle: {
      fontSize: theme.fontSize["2xl"],
      fontWeight: getFontWeight(theme.fontWeight.bold),
      color: theme.text.primary,
    },
    card: {
      backgroundColor: theme.background.card,
      margin: theme.spacing.base,
      padding: theme.spacing.base,
      borderRadius: theme.borderRadius.lg,
      ...theme.shadow.base,
    },
    cardTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: getFontWeight(theme.fontWeight.semibold),
      color: theme.text.primary,
      marginBottom: theme.spacing.sm,
    },
    cardDescription: {
      fontSize: theme.fontSize.base,
      color: theme.text.secondary,
      marginBottom: theme.spacing.base,
      lineHeight: 22,
    },
    difficultyBadge: {
      backgroundColor: theme.learning.difficulty.easy,
      alignSelf: "flex-start",
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.base,
      marginBottom: theme.spacing.base,
    },
    mediumDifficulty: {
      backgroundColor: theme.learning.difficulty.medium,
    },
    badgeText: {
      fontSize: theme.fontSize.sm,
      fontWeight: getFontWeight(theme.fontWeight.medium),
      color: theme.text.inverse,
    },
    primaryButton: {
      backgroundColor: theme.brand.primary,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.base,
      borderRadius: theme.borderRadius.base,
      alignItems: "center",
    },
    secondaryButton: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.brand.primary,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.base,
      borderRadius: theme.borderRadius.base,
      alignItems: "center",
    },
    quizButton: {
      backgroundColor: theme.learning.quiz,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.base,
      borderRadius: theme.borderRadius.base,
      alignItems: "center",
    },
    buttonText: {
      color: theme.text.inverse,
      fontSize: theme.fontSize.base,
      fontWeight: getFontWeight(theme.fontWeight.medium),
    },
    secondaryButtonText: {
      color: theme.brand.primary,
      fontSize: theme.fontSize.base,
      fontWeight: getFontWeight(theme.fontWeight.medium),
    },
    progressContainer: {
      marginBottom: theme.spacing.base,
    },
    progressBar: {
      height: 8,
      backgroundColor: theme.ui.divider,
      borderRadius: theme.borderRadius.base,
      overflow: "hidden",
      marginBottom: theme.spacing.xs,
    },
    progressFill: {
      height: "100%",
      backgroundColor: theme.learning.progress,
    },
    progressText: {
      fontSize: theme.fontSize.sm,
      color: theme.text.secondary,
      textAlign: "right",
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: theme.background.card,
      margin: theme.spacing.base,
      padding: theme.spacing.base,
      borderRadius: theme.borderRadius.lg,
      ...theme.shadow.base,
    },
    statItem: {
      alignItems: "center",
    },
    statNumber: {
      fontSize: theme.fontSize["3xl"],
      fontWeight: getFontWeight(theme.fontWeight.bold),
      color: theme.brand.primary,
    },
    statLabel: {
      fontSize: theme.fontSize.sm,
      color: theme.text.secondary,
      marginTop: theme.spacing.xs,
    },
  });
