import { Theme } from "@/types/style";
import { Platform, StyleSheet } from "react-native";

export const createStageSelectorStyles = (theme: Theme, isRTL: boolean) =>
  StyleSheet.create({
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
