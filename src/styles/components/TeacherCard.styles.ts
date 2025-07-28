import { Theme } from "@/types/style";
import { StyleSheet } from "react-native";

export const createTeacherCardStyles = (theme: Theme, isRTL: boolean) =>
  StyleSheet.create({
    // Teacher card header
    teacherHeader: {
      flexDirection: isRTL ? "row-reverse" : "row",
      marginBottom: 12,
      alignItems: "center",
    },

    teacherImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      [isRTL ? "marginLeft" : "marginRight"]: 12,
    },

    teacherInfo: {
      flex: 1,
      justifyContent: "center",
    },

    // Name and rating row
    nameRatingRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },

    teacherName: {
      fontSize: 18,
      color: "#1f2937",
      flex: 1,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Rating container
    ratingContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
    },

    starIcon: {
      fontSize: 14,
      [isRTL ? "marginLeft" : "marginRight"]: 4,
    },

    rating: {
      fontSize: 14,
      fontWeight: "600",
      color: "#6b7280",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Meta information row
    metaRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    // Specialization container
    specializationContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      flex: 1,
    },

    graduationIcon: {
      fontSize: 14,
      [isRTL ? "marginLeft" : "marginRight"]: 4,
    },

    specialization: {
      fontSize: 14,
      color: "#2563eb",
      fontWeight: "500",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Students container
    studentsContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
    },

    usersIcon: {
      fontSize: 14,
      [isRTL ? "marginLeft" : "marginRight"]: 4,
    },

    studentsText: {
      fontSize: 12,
      color: "#6b7280",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Bio text
    bio: {
      fontSize: 14,
      color: "#4b5563",
      lineHeight: 20,
      marginBottom: 16,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
    },

    // Materials section
    materialsSection: {
      marginBottom: 16,
    },

    materialsTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: "#374151",
      marginBottom: 8,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    materialsContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 8,
    },

    materialTag: {
      backgroundColor: "#dbeafe",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#bfdbfe",
      alignItems: "center",
      justifyContent: "center",
    },

    materialText: {
      fontSize: 12,
      color: "#1d4ed8",
      fontWeight: "500",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    // Teacher signup container
    teacherSignupContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },

    teacherText: {
      fontSize: 16,
      color: "#7f8c8d",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },

    teacherLink: {
      fontSize: 16,
      color: "#3498db",
      textDecorationLine: "underline",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
  });
