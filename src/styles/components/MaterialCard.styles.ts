import { Theme } from "@/types/style";
import { Platform, StyleSheet } from "react-native";

export const createMaterialCardStyles = (theme: Theme, isRTL: boolean) =>
  StyleSheet.create({
    // Material card
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

    // Material icon
    MaterialIcon: {
      fontSize: 25,
      marginBottom: 0,
    },

    // Detail icon
    detailIcon: {
      fontSize: 16,
      [isRTL ? "marginLeft" : "marginRight"]: 8,
    },

    // Star icon
    starIcon: {
      fontSize: 14,
      [isRTL ? "marginLeft" : "marginRight"]: 4,
    },

    // Graduation icon
    graduationIcon: {
      fontSize: 14,
      [isRTL ? "marginLeft" : "marginRight"]: 4,
    },

    // Users icon
    usersIcon: {
      fontSize: 14,
      [isRTL ? "marginLeft" : "marginRight"]: 4,
    },
  });
