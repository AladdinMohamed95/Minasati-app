import { Theme } from "@/types/style";
import { Platform, StyleSheet } from "react-native";

export const createInputStyles = (theme: Theme, isRTL: boolean) =>
  StyleSheet.create({
    // Form container
    formContainer: {
      padding: 10,
    },

    // Input container
    inputContainer: {
      marginBottom: 20,
    },

    // Input label
    label: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 8,
      color: "#333",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Text input
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: "#fff",
      minHeight: 48,
      textAlign: isRTL ? "right" : "left",
      writingDirection: isRTL ? "rtl" : "ltr",
      includeFontPadding: false,
      textAlignVertical: "center",
      ...Platform.select({
        android: {
          paddingTop: 12,
          paddingBottom: 12,
        },
      }),
    },

    // Input error state
    inputError: {
      borderColor: "#ff4444",
    },

    // Error text
    errorText: {
      color: "#ff4444",
      fontSize: 12,
      marginTop: 4,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Picker container
    pickerContainer: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      backgroundColor: "#fff",
      overflow: "hidden",
    },

    // Picker option
    pickerOption: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
      justifyContent: "center",
      alignItems: isRTL ? "flex-end" : "flex-start",
    },

    // Selected picker option
    pickerOptionSelected: {
      backgroundColor: "#007AFF",
    },

    // Picker option text
    pickerOptionText: {
      fontSize: 16,
      textAlign: isRTL ? "right" : "left",
      color: "#333",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Selected picker option text
    pickerOptionTextSelected: {
      color: "#fff",
      fontWeight: "600",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Switcher component
    switcher: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 8,
      backgroundColor: theme.background.secondary,
      borderWidth: 1,
      borderColor: "#cbd5e1",
      minWidth: 55,
      marginRight: 0,
      marginLeft: 0,
    },

    // Stage selector
    stageSelector: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      backgroundColor: theme.background.secondary,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#cbd5e1",
      alignItems: "center",
      justifyContent: "center",
    },

    // Stage selector content
    stageSelectorContent: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      minWidth: 100,
    },

    // Selected stage text
    selectedStageText: {
      fontSize: 12,
      color: "#1e293b",
      fontWeight: "500",
      [isRTL ? "marginLeft" : "marginRight"]: 8,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
  });
