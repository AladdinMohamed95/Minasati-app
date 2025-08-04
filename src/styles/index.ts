import { useTranslationContext } from "@/context/TranslationContext";
import { getFontWeight } from "@/theme";
import { Theme } from "@/types/style";
import {
  ImageStyle,
  Platform,
  StatusBar,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const getStatusBarHeight = () => {
  if (Platform.OS === "android") {
    return StatusBar.currentHeight || 0;
  }
  return 0;
};

export const createStyles = (theme: Theme) => {
  const { language } = useTranslationContext();
  const isRTL = language === "ar";
  const insets = useSafeAreaInsets();
  const statusBarHeight = getStatusBarHeight();

  const homeScreenStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background.primary,
      paddingHorizontal: 20,
      // paddingTop: Platform.OS === "ios" ? insets.top : statusBarHeight,
    } as ViewStyle,
    langText: {
      fontSize: 14,
      color: "#333",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    logoContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      marginBottom: 40,
    } as ViewStyle,
    logoPlaceholder: {
      width: 120,
      height: 120,
      backgroundColor: "#f0f0f0",
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#e0e0e0",
    } as ViewStyle,
    descriptionContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      paddingHorizontal: 20,
    } as ViewStyle,
    descriptionText: {
      fontSize: 24,
      color: "#2c3e50",
      textAlign: "center",
      lineHeight: 36,
      marginBottom: 12,
      includeFontPadding: false,
    } as TextStyle,
    subDescriptionText: {
      fontSize: 16,
      color: "#7f8c8d",
      textAlign: "center",
      lineHeight: 24,
      includeFontPadding: false,
    } as TextStyle,
    footerContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: 40,
    } as ViewStyle,
    signupContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    } as ViewStyle,
    signupText: {
      fontSize: 16,
      color: "#7f8c8d",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    signupLink: {
      fontSize: 16,
      color: "#3498db",
      textDecorationLine: "underline",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    contactContainer: {
      paddingVertical: 8,
      alignItems: "center",
      justifyContent: "center",
    } as ViewStyle,
    contactText: {
      fontSize: 16,
      color: "#e74c3c",
      fontWeight: "500",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
  });

  const appButtonStyles = StyleSheet.create({
    gradient: {
      borderRadius: 16,
      marginBottom: 10,
      ...Platform.select({
        ios: {
          shadowColor: "#1cb5e0",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          margin: 30,
        },
        android: {
          elevation: 6,
        },
      }),
    } as ViewStyle,
    primaryButton: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
    } as ViewStyle,
    primaryText: {
      color: "#fff",
      fontSize: 18,
      letterSpacing: 1,
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    secondaryButton: {
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      paddingHorizontal: 24,
    } as ViewStyle,
    secondaryText: {
      color: "#2c3e50",
      fontSize: 18,
      textDecorationLine: "underline",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
  });

  const whiteAndBlackTextStyles = StyleSheet.create({
    whiteText: {
      color: "white",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    blackText: {
      color: "black",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
  });

  const preferenceContainerStyles = StyleSheet.create({
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
    } as ViewStyle,
    preferencesContainer: {
      position: "absolute",
      top: statusBarHeight + 10,
      [isRTL ? "right" : "left"]: 20,
      zIndex: 9999,
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: "transparent",
    } as ViewStyle,
  });

  const registerScreenStyles = StyleSheet.create({
    scrollContainer: {
      flex: 1,
    } as ViewStyle,
    formContainer: {
      padding: 10,
      paddingTop:
        Platform.OS === "ios" ? 10 + insets.top : 10 + statusBarHeight,
    } as ViewStyle,
    title: {
      fontSize: 24,
      textAlign: "center",
      marginBottom: 30,
      color: "#333",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    inputContainer: {
      marginBottom: 20,
      textAlign: isRTL ? "right" : "left",
    } as ViewStyle,
    label: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 4,
      color: "#333",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: "#fff",
      minHeight: 40,
      textAlign: isRTL ? "right" : "left",
      writingDirection: isRTL ? "rtl" : "ltr",
      includeFontPadding: false,
      textAlignVertical: "center",
      ...Platform.select({
        android: {
          paddingTop: 8,
          paddingBottom: 8,
        },
      }),
    } as TextStyle,
    inputError: {
      borderColor: "#ff4444",
    } as TextStyle,
    errorText: {
      color: "#ff4444",
      fontSize: 10,
      // marginTop: 4,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    buttonsContainer: {
      marginBottom: 10,
      flex: 1,
    } as ViewStyle,
  });

  const teacherScreenStyles = StyleSheet.create({
    scrollContent: {
      flexDirection: "column",
      alignItems: isRTL ? "flex-end" : "flex-start",
      paddingTop: 0,
    } as ViewStyle,
    header: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing.base,
      paddingTop:
        Platform.OS === "ios" ? theme.spacing.base : theme.spacing.base + 10,
    } as ViewStyle,
    headerTitle: {
      fontSize: theme.fontSize["lg"],
      fontWeight: getFontWeight(theme.fontWeight.bold),
      color: theme.text.link,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    headerSubtitle: {
      fontSize: theme.fontSize["md"],
      fontWeight: getFontWeight(theme.fontWeight.medium),
      color: theme.text.secondary,
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    headerContainer: {
      flexDirection: "column",
      alignItems: isRTL ? "flex-start" : "flex-end",
      margin: theme.spacing.base,
      marginTop:
        Platform.OS === "ios"
          ? theme.spacing.base + insets.top
          : theme.spacing.base + statusBarHeight,
    } as ViewStyle,
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
    } as ViewStyle,
    teacherCard: {
      backgroundColor: theme.background.secondary,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      flex: 1,
      alignSelf: "stretch",
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
    } as ViewStyle,
    teacherHeader: {
      flexDirection: isRTL ? "row-reverse" : "row",
      marginBottom: 12,
      alignItems: "center",
    } as ViewStyle,
    teacherImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      [isRTL ? "marginLeft" : "marginRight"]: 12,
    } as ImageStyle,
    teacherInfo: {
      flex: 1,
      justifyContent: "center",
    } as ViewStyle,
    nameRatingRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    } as ViewStyle,
    teacherName: {
      fontSize: 18,
      color: "#1f2937",
      flex: 1,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    ratingContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
    } as ViewStyle,
    starIcon: {
      fontSize: 14,
      [isRTL ? "marginLeft" : "marginRight"]: 4,
    } as TextStyle,
    rating: {
      fontSize: 14,
      fontWeight: "600",
      color: "#6b7280",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    metaRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
    } as ViewStyle,
    specializationContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      flex: 1,
    } as ViewStyle,
    graduationIcon: {
      fontSize: 14,
      [isRTL ? "marginLeft" : "marginRight"]: 4,
    } as TextStyle,
    specialization: {
      fontSize: 14,
      color: "#2563eb",
      fontWeight: "500",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    studentsContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
    } as ViewStyle,
    usersIcon: {
      fontSize: 14,
      [isRTL ? "marginLeft" : "marginRight"]: 4,
    } as TextStyle,
    studentsText: {
      fontSize: 12,
      color: "#6b7280",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    bio: {
      fontSize: 14,
      color: "#4b5563",
      lineHeight: 20,
      marginBottom: 16,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
    } as TextStyle,
    materialsSection: {
      marginBottom: 16,
    } as ViewStyle,
    materialsTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: "#374151",
      marginBottom: 8,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    materialsContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      flexWrap: "wrap",
      gap: 8,
    } as ViewStyle,
    materialTag: {
      backgroundColor: "#dbeafe",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#bfdbfe",
      alignItems: "center",
      justifyContent: "center",
    } as ViewStyle,
    materialText: {
      fontSize: 12,
      color: "#1d4ed8",
      fontWeight: "500",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
  });

  const materialScreenStyles = StyleSheet.create({
    cardContainer: {
      width: "30%",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 10,
    } as ViewStyle,
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
    } as ViewStyle,
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      marginBottom: 0,
    } as ViewStyle,
    MaterialIcon: {
      fontSize: 25,
      marginBottom: 0,
    } as TextStyle,
    MaterialTitle: {
      fontSize: 12,
      color: "#1f2937",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    stageSelector: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      backgroundColor: theme.background.secondary,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#cbd5e1",
      alignItems: "center",
      justifyContent: "center",
    } as ViewStyle,
    stageSelectorContent: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      minWidth: 100,
    } as ViewStyle,
    selectedStageText: {
      fontSize: 12,
      color: "#1e293b",
      fontWeight: "500",
      [isRTL ? "marginLeft" : "marginRight"]: 8,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    viewContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10,
    } as ViewStyle,
    cardsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    } as ViewStyle,
  });

  const modalViewStyles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    } as ViewStyle,
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
    } as ViewStyle,
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
    } as ViewStyle,
    headerContent: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    } as ViewStyle,
    modalHeaderTitle: {
      fontSize: 22,
      color: "#1f2937",
      letterSpacing: 0.5,
      alignSelf: "center",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    closeButton: {
      padding: 4,
      borderRadius: 16,
      backgroundColor: "#f3f4f6",
      alignItems: "center",
      justifyContent: "center",
    } as ViewStyle,
    content: {
      padding: 20,
      backgroundColor: "#fff",
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
    } as ViewStyle,
    subtitle: {
      fontSize: 17,
      color: "#6b7280",
      textAlign: "center",
      marginBottom: 20,
      lineHeight: 24,
      fontWeight: "500",
      includeFontPadding: false,
    } as TextStyle,
    stagesList: {
      maxHeight: 300,
    } as ViewStyle,
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
    } as ViewStyle,
    stageItemSelected: {
      borderColor: "#3b82f6",
      backgroundColor: "#eff6ff",
    } as ViewStyle,
    stageText: {
      fontSize: 16,
      color: "#374151",
      textAlign: isRTL ? "right" : "left",
      flex: 1,
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    stageTextSelected: {
      color: "#1d4ed8",
      fontWeight: "700",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
  });

  const loadingViewStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
    } as ViewStyle,
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    } as ViewStyle,
    loadingWrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    } as ViewStyle,
    suspenseContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff",
    } as ViewStyle,
  });

  const otherViewStyles = StyleSheet.create({
    scrollView: {
      flex: 1,
    } as ViewStyle,
    cardTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: getFontWeight(theme.fontWeight.semibold),
      color: theme.text.primary,
      marginBottom: theme.spacing.sm,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    cardDescription: {
      fontSize: theme.fontSize.base,
      color: theme.text.secondary,
      marginBottom: theme.spacing.base,
      lineHeight: 22,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
    } as TextStyle,
    difficultyBadge: {
      backgroundColor: theme.learning.difficulty.easy,
      alignSelf: isRTL ? "flex-end" : "flex-start",
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.base,
      marginBottom: theme.spacing.base,
    } as ViewStyle,
    mediumDifficulty: {
      backgroundColor: theme.learning.difficulty.medium,
    } as ViewStyle,
    badgeText: {
      fontSize: theme.fontSize.sm,
      fontWeight: getFontWeight(theme.fontWeight.medium),
      color: theme.text.inverse,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    pickerContainer: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      backgroundColor: "#fff",
      overflow: "hidden",
    } as ViewStyle,
    pickerOption: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
      justifyContent: "center",
      alignItems: isRTL ? "flex-end" : "flex-start",
    } as ViewStyle,
    pickerOptionSelected: {
      backgroundColor: "#007AFF",
    } as ViewStyle,
    pickerOptionText: {
      fontSize: 16,
      textAlign: isRTL ? "right" : "left",
      color: "#333",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    pickerOptionTextSelected: {
      color: "#fff",
      fontWeight: "600",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    viewProfileButton: {
      backgroundColor: "#2563eb",
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    } as ViewStyle,
    viewProfileText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    MaterialDescription: {
      fontSize: 14,
      color: "#4b5563",
      textAlign: "center",
      lineHeight: 20,
      marginBottom: 20,
      includeFontPadding: false,
    } as TextStyle,
    detailsContainer: {
      marginBottom: 20,
    } as ViewStyle,
    detailRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    } as ViewStyle,
    detailItem: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
    } as ViewStyle,
    detailLabel: {
      fontSize: 14,
      color: "#6b7280",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as ViewStyle,
    detailValue: {
      fontSize: 14,
      fontWeight: "600",
      color: "#1f2937",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    exploreButton: {
      backgroundColor: "#7c3aed",
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    } as ViewStyle,
    exploreButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    teacherSignupContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    } as ViewStyle,
    teacherText: {
      fontSize: 16,
      color: "#7f8c8d",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
    teacherLink: {
      fontSize: 16,
      color: "#3498db",
      textDecorationLine: "underline",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    } as TextStyle,
  });

  return {
    //----------------------------------------------------------------------------------------------------------home screen
    homeScreen: homeScreenStyles,
    //----------------------------------------------------------------------------------------------------------App button
    appButton: appButtonStyles,
    //----------------------------------------------------------------------------------------------------------whiteAndBlackText
    whiteAndBlackText: whiteAndBlackTextStyles,
    //----------------------------------------------------------------------------------------------------------preferences container
    preferenceContainer: preferenceContainerStyles,
    //----------------------------------------------------------------------------------------------------------register screen
    registerScreen: registerScreenStyles,
    //----------------------------------------------------------------------------------------------------------teacher screen
    teacherScreen: teacherScreenStyles,
    //----------------------------------------------------------------------------------------------------------material screen
    materialScreen: materialScreenStyles,
    //----------------------------------------------------------------------------------------------------------modal view
    modalView: modalViewStyles,
    //----------------------------------------------------------------------------------------------------------loading view
    loadingView: loadingViewStyles,
    //----------------------------------------------------------------------------------------------------------other view
    otherViewStyle: otherViewStyles,
  };
};
