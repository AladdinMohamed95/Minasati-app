import { Theme } from "@/types/style";
import { Platform, StyleSheet } from "react-native";

export const createContainerStyles = (theme: Theme, isRTL: boolean) =>
  StyleSheet.create({
    // Main container
    container: {
      flex: 1,
      backgroundColor: theme.background.primary,
      paddingHorizontal: 20,
    },

    // Scroll view
    scrollView: {
      flex: 1,
    },

    // Scroll content
    scrollContent: {
      flexDirection: "column",
      alignItems: isRTL ? "flex-end" : "flex-start",
    },

    // Scroll container
    scrollContainer: {
      flex: 1,
    },

    // Header container
    headerContainer: {
      flexDirection: "column",
      alignItems: isRTL ? "flex-start" : "flex-end",
      margin: theme.spacing.base,
    },

    // Description container
    descriptionContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      paddingHorizontal: 20,
    },

    // Footer container
    footerContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: 40,
    },

    // Contact container
    contactContainer: {
      paddingVertical: 8,
      alignItems: "center",
      justifyContent: "center",
    },

    // Preferences container
    preferencesContainer: {
      position: "absolute",
      top: Platform.OS === "ios" ? 50 : 40,
      [isRTL ? "right" : "left"]: 20,
      zIndex: 9999,
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: "transparent",
    },

    // Details container
    detailsContainer: {
      marginBottom: 20,
    },

    // Detail row
    detailRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },

    // Detail item
    detailItem: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
    },

    // Icon container
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      marginBottom: 0,
    },

    // Logo container
    logoContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 60,
      marginBottom: 40,
    },

    // Progress container
    progressContainer: {
      marginBottom: theme.spacing.base,
    },
  });
