import { useTranslationContext } from "@/context/TranslationContext";
import { getFontWeight } from "@/theme";
import { Theme } from "@/types/style";
import {
  Dimensions,
  ImageStyle,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

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
    },
    langText: {
      fontSize: 14,
      color: "#333",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    logoContainer: {
      alignItems: "center",
      marginTop: 30,
      marginBottom: 40,
    },

    logoWrapper: {
      width: 160,
      height: 160,
      borderRadius: 80,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
      marginBottom: 20,
      overflow: "hidden",
    },

    imageStyle: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },

    textContainer: {
      alignItems: "center",
      paddingHorizontal: 20,
    },

    greetingText: {
      fontSize: 22,
      fontWeight: "600",
      color: "#34495e",
      marginBottom: 6,
    },

    titleText: {
      fontSize: 28,
      fontWeight: "700",
      color: "#063159",
      marginBottom: 8,
    },
    descriptionContainer: {
      marginVertical: 30,
    },
    descriptionText: {
      fontSize: 19,
      color: "#7f8c8d",
      textAlign: "center",
      lineHeight: 35,
    },

    subDescriptionText: {
      fontSize: 16,
      color: "#7f8c8d",
      textAlign: "center",
      lineHeight: 24,
    },
    footerContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: 40,
    },
    signupContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
    signupText: {
      fontSize: 16,
      color: "#7f8c8d",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    signupLink: {
      fontSize: 16,
      color: "#3498db",
      textDecorationLine: "underline",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    contactContainer: {
      paddingVertical: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    contactText: {
      fontSize: 16,
      color: "#e74c3c",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    profileIcon: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 10,
    },
    iconContainer: {
      position: "absolute",
      top: 15,
      right: 15,
      zIndex: 10,
    },
    langContainer: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 10,
    },
    imageStyle1: {
      width: 180,
      height: 180,
      resizeMode: "contain",
    },
    loadingView: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      backgroundColor: "#7c3aed",
      padding: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    headerGradient: {
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      overflow: "hidden", // مهم عشان البوردر يبان صح
      marginBottom: 10,
    },
    headerContent: {
      padding: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    welcomeText: {
      fontSize: 22,
      fontWeight: "600",
      color: "#fff",
    },
    subWelcomeText: {
      fontSize: 16,
      color: "#E0E0E0",
    },
    iconBorder: {
      borderWidth: 1,
      borderColor: "#fff",
      padding: 8,
      borderRadius: 50,
    },
    // welcomeText: {
    //   fontSize: 22,
    //   fontWeight: "600",
    //   color: "#fff",
    // },
    // subWelcomeText: {
    //   fontSize: 16,
    //   color: "#dfe6e9",
    // },
    cardsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: 20,
      paddingHorizontal: 10,
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 15,
      width: "45%",
      padding: 15,
      margin: 8,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 5,
      elevation: 4,
    },
    cardText: {
      marginTop: 8,
      fontSize: 16,
      color: "#063159",
      textAlign: "center",
    },
    footer: {
      alignItems: "center",
      marginTop: "auto",
      paddingBottom: 30,
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: "contain",
      marginBottom: 10,
      borderRadius: 8,
    },
    footerText: {
      textAlign: "center",
      fontSize: 14,
      color: "#636e72",
    },
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
    },
    primaryButton: {
      paddingVertical: 10, // كان 16
      paddingHorizontal: 16, // كان 24
      borderRadius: 12, // كان 16
      alignItems: "center",
      justifyContent: "center",
    },
    primaryText: {
      color: "#fff",
      fontSize: 14, // كان 18
      letterSpacing: 0.5, // كان 1
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    secondaryButton: {
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      paddingHorizontal: 24,
    },
    secondaryText: {
      color: "#2c3e50",
      fontSize: 18,
      textDecorationLine: "underline",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    smallSecondaryButton: {
      alignSelf: "center", // يثبت الزر أصغر على يسار/يمين حسب الـ layout
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: "transparent", // لو عايز خلفية بسيطة غيرها هنا
      minHeight: 32,
      justifyContent: "center",
      marginTop: 8,
    },
    smallSecondaryButtonText: {
      fontSize: 13,
      lineHeight: 16,
      color: "#333", // أو theme.colors.text
      fontWeight: "600",
      textAlign: "center",
    },
    deleteButtonGradient: {
      borderRadius: 12,
    },
    deleteButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    deleteButtonText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
      letterSpacing: 0.5,
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
  });

  const whiteAndBlackTextStyles = StyleSheet.create({
    whiteText: {
      color: "white",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    blackText: {
      color: "black",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
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
    },
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
    },
  });

  const registerScreenStyles = StyleSheet.create({
    scrollContainer: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      marginBottom: 30,
      color: "#333",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    inputContainer: {
      marginBottom: 20,
      textAlign: isRTL ? "right" : "left",
    },
    label: {
      fontSize: 14,
      marginBottom: 4,
      color: "#333",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
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
    },
    inputError: {
      borderColor: "#ff4444",
    },
    errorText: {
      color: "#ff4444",
      fontSize: 10,
      // marginTop: 4,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    buttonsContainer: {
      marginBottom: 10,
      flex: 1,
    },
    loading: { flex: 1, justifyContent: "center", alignItems: "center" },
    toggleContainer: {
      flexDirection: "row",
      backgroundColor: "#e5e7eb", // رمادي فاتح
      borderRadius: 25,
      padding: 4,
      marginVertical: 15,
    },
    toggleButton: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 20,
      alignItems: "center",
    },
    toggleButtonActive: {
      backgroundColor: "#4F46E5", // نفس لون الجرادينت
    },
    toggleText: {
      fontSize: 16,
      fontWeight: "500",
      color: "#374151", // رمادي غامق
    },
    toggleTextActive: {
      color: "#fff",
    },
  });

  const teacherScreenStyles = StyleSheet.create({
    scrollContent: {
      flexDirection: "column",
      alignItems: isRTL ? "flex-end" : "flex-start",
      paddingTop: 0,
    },
    header: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing.base,
      paddingTop:
        Platform.OS === "ios" ? theme.spacing.base : theme.spacing.base + 10,
    },
    headerTitle: {
      fontSize: theme.fontSize["lg"],
      fontWeight: getFontWeight(theme.fontWeight.bold),
      color: theme.text.link,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    headerSubtitle: {
      fontSize: theme.fontSize["md"],
      fontWeight: getFontWeight(theme.fontWeight.medium),
      color: theme.text.secondary,
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    headerContainer: {
      flexDirection: "column",
      alignItems: isRTL ? "flex-start" : "flex-end",
      margin: theme.spacing.base,
      marginTop:
        Platform.OS === "ios"
          ? theme.spacing.base + insets.top
          : theme.spacing.base + statusBarHeight,
    },
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
    },
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
    } as ImageStyle,
    teacherInfo: {
      flex: 1,
      justifyContent: "center",
    },
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
      color: "#6b7280",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    metaRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
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
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
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
    bio: {
      fontSize: 14,
      color: "#4b5563",
      lineHeight: 20,
      marginBottom: 16,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
    },
    materialsSection: {
      marginBottom: 16,
    },
    materialsTitle: {
      fontSize: 14,
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
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
  });

  const materialScreenStyles = StyleSheet.create({
    cardContainer: {
      width: "30%",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 10,
    },
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
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      marginBottom: 0,
    },
    MaterialIcon: {
      fontSize: 25,
      marginBottom: 0,
    },
    MaterialTitle: {
      fontSize: 12,
      color: "#1f2937",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
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
    stageSelectorContent: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      minWidth: 100,
    },
    selectedStageText: {
      fontSize: 12,
      color: "#1e293b",
      [isRTL ? "marginLeft" : "marginRight"]: 8,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    viewContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    cardsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
  });

  const modalViewStyles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
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
    headerContent: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    modalHeaderTitle: {
      fontSize: 22,
      color: "#1f2937",
      letterSpacing: 0.5,
      alignSelf: "center",
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    closeButton: {
      padding: 4,
      borderRadius: 16,
      backgroundColor: "#f3f4f6",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      padding: 20,
      backgroundColor: "#fff",
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
    },
    subtitle: {
      fontSize: 17,
      color: "#6b7280",
      textAlign: "center",
      marginBottom: 20,
      lineHeight: 24,
      includeFontPadding: false,
    },
    stagesList: {
      maxHeight: 300,
    },
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
    stageItemSelected: {
      borderColor: "#3b82f6",
      backgroundColor: "#eff6ff",
    },
    stageText: {
      fontSize: 16,
      color: "#374151",
      textAlign: isRTL ? "right" : "left",
      flex: 1,
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    stageTextSelected: {
      color: "#1d4ed8",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
  });

  const loadingViewStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingWrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    suspenseContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff",
    },
  });

  const otherViewStyles = StyleSheet.create({
    scrollView: {
      flex: 1,
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
    badgeText: {
      fontSize: theme.fontSize.sm,
      fontWeight: getFontWeight(theme.fontWeight.medium),
      color: theme.text.inverse,
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      backgroundColor: "#fff",
      overflow: "hidden",
    },
    pickerOption: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
      justifyContent: "center",
      alignItems: isRTL ? "flex-end" : "flex-start",
    },
    pickerOptionSelected: {
      backgroundColor: "#007AFF",
    },
    pickerOptionText: {
      fontSize: 16,
      textAlign: isRTL ? "right" : "left",
      color: "#333",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    pickerOptionTextSelected: {
      color: "#fff",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    viewProfileButton: {
      backgroundColor: "#2563eb",
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    viewProfileText: {
      color: "#fff",
      fontSize: 16,
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    MaterialDescription: {
      fontSize: 14,
      color: "#4b5563",
      textAlign: "center",
      lineHeight: 20,
      marginBottom: 20,
      includeFontPadding: false,
    },
    detailsContainer: {
      marginBottom: 20,
    },
    detailRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    detailItem: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
    },
    detailLabel: {
      fontSize: 14,
      color: "#6b7280",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    detailValue: {
      fontSize: 14,
      color: "#1f2937",
      textAlign: isRTL ? "right" : "left",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
    exploreButton: {
      backgroundColor: "#7c3aed",
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    exploreButtonText: {
      color: "#fff",
      fontSize: 16,
      textAlign: "center",
      includeFontPadding: false,
      textAlignVertical: "center",
    },
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

  const profileStyles = StyleSheet.create({
    scrollContainer: {
      padding: 16,
    },
    imageContainer: {
      alignItems: "center",
      marginBottom: 16,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 2,
      borderColor: "#ccc",
    },
    changeImageText: {
      marginTop: 8,
      color: "#666",
      fontSize: 14,
    },
    headerContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 24,
    },
    greetingText: {
      fontSize: 22,
      marginRight: 8,
    },
    languageContainer: {
      marginBottom: 16,
      alignItems: "flex-end",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
      borderLeftWidth: 4,
      borderLeftColor: "#7C3AED",
    },
    sectionTitle: {
      fontSize: 18,
      marginBottom: 12,
      color: "#333",
      textAlign: isRTL ? "right" : "left",
    },
    row: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
      paddingBottom: 4,
    },
    label: {
      fontSize: 14,
      color: "#666",
    },
    value: {
      fontSize: 14,
      color: "#333",
    },
  });

  const bookingViewStyles = StyleSheet.create({
    container: { marginTop: 20 },
    currentBookings: { fontSize: 18, marginBottom: 10 },
    tableHeader: {
      flexDirection: isRTL ? "row-reverse" : "row",
      paddingVertical: 12,
      backgroundColor: "#f5f5f5",
      borderRadius: 8,
    },
    tableRow: { flex: 1, textAlign: "center" },
    empty: { paddingVertical: 20 },
    emptyText: { textAlign: "center", color: "#888" },
    tableBody: {
      flexDirection: isRTL ? "row-reverse" : "row",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderColor: "#eee",
      alignItems: "center",
    },
    actionButton: {
      flex: 1,
      backgroundColor: "#ff4444",
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    actionButtonText: { color: "white", textAlign: "center", fontSize: 12 },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      backgroundColor: "white",
      borderRadius: 15,
      padding: 20,
      width: width * 0.9,
      maxHeight: height * 0.8,
    },
    modalTitle: {
      fontSize: 20,
      textAlign: "center",
      marginBottom: 20,
    },
    fieldWrapper: {
      marginBottom: 15,
    },
    fieldLabel: {
      marginBottom: 8,
    },
    pickerWrapper: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
    },
    picker: {
      height: 50,
    },
    buttonRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
    },
    cancelButton: {
      flex: 1,
      backgroundColor: "#ccc",
      paddingVertical: 12,
      borderRadius: 8,
      marginRight: 10,
    },
    confirmButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      marginLeft: 10,
    },
    cancelText: {
      textAlign: "center",
    },
    confirmText: {
      textAlign: "center",
      color: "white",
    },
    bookingResponseView: { marginHorizontal: 16, marginVertical: 10 },
    bookingResponseText: {
      textAlign: "center",
      padding: 10,
      backgroundColor: "#f0f8ff",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#007bff",
    },
    scrollView: { flex: 1, paddingHorizontal: 10 },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      backgroundColor: "#FFF",
      borderBottomWidth: 1,
      borderBottomColor: "#F0F0F0",
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: getFontWeight(theme.fontWeight.bold),
      color: "#333",
    },
    refreshButton: {
      padding: 8,
    },
    bookNowContainer: {
      paddingVertical: 5,
      backgroundColor: "#FFF",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 100,
    },
    loadingText: {
      marginTop: 15,
      fontSize: 16,
      color: "#666",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 40,
      paddingTop: 100,
    },
    emptyTitle: {
      fontSize: 22,
      fontWeight: getFontWeight(theme.fontWeight.bold),
      color: "#333",
      marginTop: 20,
      marginBottom: 10,
    },
    emptySubtitle: {
      fontSize: 16,
      color: "#666",
      textAlign: "center",
      lineHeight: 24,
      marginBottom: 30,
    },
    emptyButton: {
      backgroundColor: "#7C3AED",
      paddingHorizontal: 30,
      paddingVertical: 12,
      borderRadius: 25,
    },
    emptyButtonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: getFontWeight(theme.fontWeight.bold),
    },
    bookingsContainer: {
      padding: 15,
    },
    bookingsCount: {
      fontSize: 16,
      fontWeight: getFontWeight(theme.fontWeight.bold),
      color: "#666",
      marginBottom: 15,
      textAlign: "center",
    },
    bookingCard: {
      direction: isRTL ? "rtl" : "ltr",
      backgroundColor: "#FFF",
      borderRadius: 12,
      marginBottom: 15,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
      borderLeftWidth: 4,
      borderLeftColor: "#7C3AED",
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#F0F0F0",
    },
    bookingIdContainer: {
      flex: 1,
    },
    bookingIdText: {
      fontSize: 18,
      fontWeight: getFontWeight(theme.fontWeight.bold),
      color: "#333",
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
    },
    statusText: {
      color: "#FFF",
      fontSize: 12,
      fontWeight: getFontWeight(theme.fontWeight.bold),
    },
    teacherSection: {
      flexDirection: "row",
      marginBottom: 20,
    },
    teacherImageContainer: {
      marginRight: 15,
    },
    teacherImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    placeholderImage: {
      backgroundColor: "#F0F0F0",
      justifyContent: "center",
      alignItems: "center",
    },
    teacherInfo: {
      flex: 1,
      justifyContent: "center",
    },
    teacherName: {
      fontSize: 18,
      fontWeight: getFontWeight(theme.fontWeight.bold),
      color: "#333",
      marginBottom: 4,
    },
    teacherSpecialization: {
      fontSize: 14,
      color: "#7C3AED",
      marginBottom: 2,
    },
    teacherExperience: {
      fontSize: 12,
      color: "#666",
    },
    detailsSection: {
      marginBottom: 20,
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    detailLabel: {
      fontSize: 14,
      color: "#666",
      marginLeft: 8,
      marginRight: 8,
      minWidth: 70,
    },
    detailValue: {
      fontSize: 14,
      color: "#333",
      fontWeight: "500",
      flex: 1,
    },
    actionButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
    },
    editButton: {
      backgroundColor: "#4CAF50",
    },
    deleteButton: {
      backgroundColor: "#F44336",
    },
  });

  const studentBookingScreenStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F9FA",
    },
    scrollView: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      color: "#2C3E50",
      textAlign: "center",
      marginBottom: 30,
    },
    inputContainer: {
      marginBottom: 25,
    },
    label: {
      fontSize: 16,
      color: "#34495E",
      marginBottom: 10,
      textAlign: "right",
    },
    pickerContainer: {
      backgroundColor: "#FFF",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#E1E8ED",
      position: "relative",
    },
    picker: {
      height: 50,
    },
    pickerLoader: {
      position: "absolute",
      right: 15,
      top: 15,
    },
    teachersContainer: {
      gap: 15,
    },
    teacherCard: {
      backgroundColor: "#FFF",
      borderRadius: 15,
      padding: 20,
      borderWidth: 2,
      borderColor: "#E1E8ED",
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    selectedTeacherCard: {
      borderColor: "#7C3AED",
      backgroundColor: "#FFF5F2",
    },
    teacherInfo: {
      flex: 1,
      paddingHorizontal: 10,
    },
    teacherName: {
      fontSize: 18,
      fontWeight: "600",
      color: "#2C3E50",
      textAlign: isRTL ? "right" : "left",
      marginBottom: 5,
    },
    teacherSpecialization: {
      fontSize: 14,
      color: "#666",
      textAlign: isRTL ? "right" : "left",
      marginBottom: 5,
    },
    experience: {
      fontSize: 12,
      color: "#95A5A6",
      textAlign: isRTL ? "right" : "left",
      marginBottom: 5,
    },
    description: {
      fontSize: 12,
      color: "#666",
      textAlign: isRTL ? "right" : "left",
      marginTop: 5,
      lineHeight: 16,
    },
    availabilityContainer: {
      alignItems: "flex-end",
      gap: 5,
    },

    availabilityBadge: {
      backgroundColor: "#27AE60",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      minWidth: 50,
      alignItems: "center",
    },

    offlineBadge: {
      backgroundColor: "#3498DB",
    },

    availabilityText: {
      color: "#FFF",
      fontSize: 12,
      fontWeight: "500",
    },

    // Rating Section (if needed)
    ratingContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      marginBottom: 5,
    },

    rating: {
      marginRight: isRTL ? 0 : 5,
      marginLeft: isRTL ? 5 : 0,
      fontSize: 14,
      color: "#F39C12",
      fontWeight: "600",
    },

    // Empty State (optional)
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 40,
    },

    emptyText: {
      fontSize: 16,
      color: "#666",
      textAlign: "center",
    },

    // Loading State (optional)
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 40,
    },
    teacherSubject: {
      fontSize: 14,
      color: "#7F8C8D",
      textAlign: "right",
      marginBottom: 8,
    },
    modeContainer: {
      flexDirection: isRTL ? "row-reverse" : "row",
      gap: 15,
      justifyContent: "center",
    },
    modeButton: {
      flex: 1,
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 15,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: "#7C3AED",
      backgroundColor: "#FFF",
      gap: 10,
    },
    selectedModeButton: {
      backgroundColor: "#7C3AED",
    },
    modeText: {
      fontSize: 16,
      color: "#7C3AED",
    },
    selectedModeText: {
      color: "#FFF",
    },
    dateTimeButton: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      backgroundColor: "#FFF",
      paddingVertical: 15,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#E1E8ED",
      gap: 10,
    },
    dateTimeText: {
      fontSize: 16,
      color: "#2C3E50",
      flex: 1,
      textAlign: "right",
    },
    bookButton: {
      backgroundColor: "#7C3AED",
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 18,
      borderRadius: 15,
      marginTop: 20,
      marginBottom: 30,
      gap: 10,
      shadowColor: "#7C3AED",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    disabledButton: {
      backgroundColor: "#BDC3C7",
      shadowOpacity: 0,
      elevation: 0,
    },
    bookButtonText: {
      color: "#FFF",
      fontSize: 18,
    },
    loader: {
      marginVertical: 20,
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
    },
    modalContainer: {
      backgroundColor: "#FFF",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: height * 0.8,
      paddingTop: 20,
    },
    header: {
      flexDirection: isRTL ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#333",
    },
    closeButton: {
      padding: 5,
      borderRadius: 20,
    },
    teachersList: {
      paddingTop: 20,
      paddingBottom: 40,
    },
    teacherImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: isRTL ? 0 : 15,
      marginLeft: isRTL ? 15 : 0,
    },
    selectTeacherButton: {
      borderWidth: 1,
      borderColor: "#E0E0E0",
      borderRadius: 8,
      padding: 15,
      backgroundColor: "#FFF",
      marginTop: 5,
    },
    selectTeacherContent: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    selectTeacherText: {
      fontSize: 16,
      color: "#666",
      flex: 1,
    },
    selectedTeacherImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    selectedTeacherInfo: {
      flex: 1,
    },
    selectedTeacherName: {
      fontSize: 16,
      color: "#333",
    },
    selectedTeacherSpecialization: {
      fontSize: 14,
      color: "#666",
      marginTop: 2,
    },
  });

  const teacherInfoModalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8FAFC",
      direction: isRTL ? "rtl" : "ltr",
    },
    scrollView: {
      flex: 1,
    },
    header: {
      paddingTop: 60,
      paddingBottom: 30,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    profileSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    imageContainer: {
      position: "relative",
      marginRight: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 4,
      borderColor: "white",
    },
    verifiedBadge: {
      position: "absolute",
      bottom: -5,
      right: -5,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "#10B981",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "white",
    },
    profileInfo: {
      flex: 1,
    },
    teacherName: {
      fontSize: 24,
      fontWeight: getFontWeight(theme.fontWeight.bold),
      color: "white",
      marginBottom: 5,
    },
    teacherTitle: {
      fontSize: 16,
      color: "rgba(255,255,255,0.9)",
      marginBottom: 8,
    },
    locationRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    locationText: {
      fontSize: 14,
      color: "rgba(255,255,255,0.8)",
      marginLeft: 5,
    },
    infoSection: {
      paddingTop: 20,
    },
    infoCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
      padding: 16,
      marginBottom: 10,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderLeftWidth: 4,
      borderLeftColor: "#7C3AED",
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 15,
    },
    infoContent: {
      flex: 1,
    },
    infoTitle: {
      fontSize: 14,
      color: "#6B7280",
      marginBottom: 2,
    },
    infoValue: {
      fontSize: 16,
      fontWeight: "600",
      color: "#1F2937",
    },
    section: {
      paddingTop: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: getFontWeight(theme.fontWeight.bold),
      color: "#1F2937",
      marginBottom: 15,
    },
    descriptionCard: {
      backgroundColor: "white",
      padding: 16,
      borderRadius: 12,
      borderLeftWidth: 4,
      borderLeftColor: "#7C3AED",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    descriptionText: {
      fontSize: 16,
      color: "#374151",
      lineHeight: 24,
    },
    availabilityContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    availabilityItem: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 12,
      alignItems: "center",
      flex: 1,
      marginHorizontal: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderLeftWidth: 4,
      borderLeftColor: "#7C3AED",
    },
    availabilityIcon: {
      marginBottom: 10,
    },
    availabilityText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#1F2937",
      marginBottom: 10,
    },
    statusDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    activeDot: {
      backgroundColor: "#10B981",
    },
    inactiveDot: {
      backgroundColor: "#EF4444",
    },
    classesContainer: {
      gap: 15,
    },
    classCard: {
      backgroundColor: "white",
      borderRadius: 12,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderLeftWidth: 4,
      borderLeftColor: "#7C3AED",
    },
    classHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    className: {
      fontSize: 18,
      fontWeight: getFontWeight(theme.fontWeight.bold),
      color: "#1F2937",
      flex: 1,
    },
    priceContainer: {
      alignItems: "center",
    },
    price: {
      fontSize: 24,
      fontWeight: getFontWeight(theme.fontWeight.bold),
      color: "#10B981",
    },
    currency: {
      fontSize: 12,
      color: "#6B7280",
    },
    classDetails: {
      marginBottom: 12,
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },
    detailText: {
      fontSize: 14,
      color: "#6B7280",
      marginLeft: 8,
    },
    statusContainer: {
      alignItems: "flex-start",
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    pendingStatus: {
      backgroundColor: "#FEF3C7",
    },
    activeStatus: {
      backgroundColor: "#D1FAE5",
    },
    statusText: {
      fontSize: 12,
      fontWeight: "600",
    },
    pendingStatusText: {
      color: "#92400E",
    },
    activeStatusText: {
      color: "#065F46",
    },
    actionButtons: {
      paddingTop: 30,
      gap: 12,
    },
    primaryButton: {
      backgroundColor: "#7C3AED",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 16,
      borderRadius: 12,
      gap: 8,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    secondaryButton: {
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: "#7C3AED",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 16,
      borderRadius: 12,
      gap: 8,
    },
    secondaryButtonText: {
      color: "#7C3AED",
      fontSize: 16,
      fontWeight: "600",
    },
    bottomPadding: {
      height: 30,
    },
    teacherCard: {
      backgroundColor: "#FFF",
      borderRadius: 15,
      padding: 20,
      marginBottom: 15,
      borderWidth: 2,
      borderColor: "#E1E8ED",
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  });

  const teacherRegisterationStyles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center" as const,
      alignItems: "center" as const,
      padding: 20,
    },
    modalContainer: {
      backgroundColor: "white",
      borderRadius: 15,
      padding: 20,
      width: "100%",
      maxWidth: 400,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    textInputStyle: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: "#fff",
      textAlign: "right" as const,
    },
    modalButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
    },
    emptyContainer: {
      paddingVertical: 20,
      backgroundColor: "#f9f9f9",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#e0e0e0",
    },
    pendingItemStyle: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      padding: 15,
      backgroundColor: "#f0f8ff",
      borderRadius: 8,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: "#007bff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    registrationItemStyle: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      padding: 15,
      backgroundColor: "#fff",
      borderRadius: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: "#eee",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 1,
      elevation: 1,
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
      marginLeft: 10,
    },
    updateButton: {
      backgroundColor: "#28a745",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
      marginLeft: 10,
    },
    submitButton: {
      backgroundColor: "#7C3AED",
      paddingVertical: 15,
      borderRadius: 8,
      marginTop: 15,
    },
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
    //----------------------------------------------------------------------------------------------------------profile Styles
    profileViewStyles: profileStyles,
    //----------------------------------------------------------------------------------------------------------booking View Styles
    bookingViewStyles: bookingViewStyles,
    //----------------------------------------------------------------------------------------------------------student Booking Screen Styles
    studentBookingViewStyles: studentBookingScreenStyles,
    //----------------------------------------------------------------------------------------------------------teacher info modal Screen Styles
    teacherInfoModalStyles: teacherInfoModalStyles,
    //----------------------------------------------------------------------------------------------------------teacher Registeration modal Screen Styles
    teacherRegisterationStyles: teacherRegisterationStyles,
  };
};
