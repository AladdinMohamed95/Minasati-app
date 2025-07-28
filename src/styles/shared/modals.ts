import { Theme } from "@/types/style";
import { Platform, StyleSheet } from "react-native";

export const createModalStyles = (theme: Theme, isRTL: boolean) =>
  StyleSheet.create({
    // Modal overlay
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },

    // Modal container
    modalContainer: {
      backgroundColor: "white",
      borderRadius: 32,
      width: "100%",
      maxWidth: 400,
      maxHeight: "80%",
      padding: 8,
      borderWidth: 1,
      borderColor: "#e0e7ef",
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.18,
          shadowRadius: 16,
        },
        android: {
          elevation: 12,
        },
      }),
    },

    // Modal header
    modalHeader: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#f3f4f6",
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      backgroundColor: "#f8fafc",
    },

    // Header content
    headerContent: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },

    // Modal header title
    modalHeaderTitle: {
      fontSize: 22,
      color: "#1f2937",
      letterSpacing: 0.5,
      alignSelf: "center",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Modal content
    content: {
      padding: 20,
      backgroundColor: "#fff",
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
    },

    // Modal subtitle
    subtitle: {
      fontSize: 17,
      color: "#6b7280",
      textAlign: "center",
      marginBottom: 20,
      lineHeight: 24,
      fontWeight: "500",
      includeFontPadding: false,
    },

    // Stages list
    stagesList: {
      maxHeight: 300,
    },

    // Stage item
    stageItem: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      marginBottom: 8,
      borderWidth: 2,
      borderColor: "#e5e7eb",
      borderRadius: 16,
      backgroundColor: "white",
      ...Platform.select({
        ios: {
          shadowColor: "#e0e7ef",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.08,
          shadowRadius: 2,
        },
        android: {
          elevation: 1,
        },
      }),
    },

    // Selected stage item
    stageItemSelected: {
      borderColor: "#3b82f6",
      backgroundColor: "#eff6ff",
    },

    // Stage text
    stageText: {
      fontSize: 16,
      color: "#374151",
      textAlign: isRTL ? "right" : "left",
      flex: 1,
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Selected stage text
    stageTextSelected: {
      color: "#1d4ed8",
      fontWeight: "700",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
  });
