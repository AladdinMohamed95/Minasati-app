import { StatusBarStyle } from "expo-status-bar";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export type FontWeightValue =
  | "light"
  | "bold"
  | "normal"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | "ultralight"
  | "thin"
  | "medium"
  | "semibold"
  | "heavy"
  | "black";

// Define specific style types for your components
export interface AppStyles
  extends Record<string, ViewStyle | TextStyle | ImageStyle | any> {
  container: ViewStyle;
  scrollView: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  card: ViewStyle;
  cardTitle: TextStyle;
  cardDescription: TextStyle;
  difficultyBadge: ViewStyle;
  mediumDifficulty: ViewStyle;
  badgeText: TextStyle;
  primaryButton: ViewStyle;
  secondaryButton: ViewStyle;
  quizButton: ViewStyle;
  buttonText: TextStyle;
  secondaryButtonText: TextStyle;
  progressContainer: ViewStyle;
  progressBar: ViewStyle;
  progressFill: ViewStyle;
  progressText: TextStyle;
  statsContainer: ViewStyle;
  statItem: ViewStyle;
  statNumber: TextStyle;
  statLabel: TextStyle;
  logoContainer: ViewStyle;
  logoPlaceholder: ViewStyle;
  logoText: TextStyle;
  descriptionContainer: ViewStyle;
  descriptionText: TextStyle;
  subDescriptionText: TextStyle;
  buttonsContainer: ViewStyle;
  footerContainer: ViewStyle;
  teacherSignupContainer: ViewStyle;
  teacherText: TextStyle;
  teacherLink: TextStyle;
  contactContainer: ViewStyle;
  contactText: TextStyle;
}

// Generic utility type for creating typed styles
export type TypedStyleSheet<
  T extends Record<string, ViewStyle | TextStyle | ImageStyle>
> = {
  [K in keyof T]: T[K];
};

export interface Theme {
  background: {
    primary: string;
    secondary: string;
    card: string;
    surface: string;
    modal: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
    link: string;
    success: string;
    warning: string;
    error: string;
  };
  brand: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
  };
  learning: {
    course: string;
    lesson: string;
    quiz: string;
    progress: string;
    bookmark: string;
    difficulty: {
      easy: string;
      medium: string;
      hard: string;
    };
  };
  ui: {
    border: string;
    divider: string;
    shadow: string;
    overlay: string;
    disabled: string;
    placeholder: string;
    focus: string;
    hover: string;
  };
  statusBar: StatusBarStyle;
  fontFamily: {
    regular: string;
    medium: string;
    light: string;
    bold: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    "2xl": number;
    "3xl": number;
    "4xl": number;
  };
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  spacing: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    "2xl": number;
    "3xl": number;
  };
  borderRadius: {
    none: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    full: number;
  };
  shadow: {
    sm: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    base: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    lg: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
  isDark: boolean;
}
