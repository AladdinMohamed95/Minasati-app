import { FontWeightValue, Theme } from "./types/style";

export const getFontWeight = (weight: string): FontWeightValue => {
  const mapping: { [key: string]: FontWeightValue } = {
    light: "light",
    normal: "normal",
    medium: "500",
    semibold: "600",
    bold: "bold",
    heavy: "800",
    black: "900",
  };
  return mapping[weight] || "normal";
};

// common shared properties
const commonTheme = {
  fontFamily: {
    regular: "Cairo-Regular",
    bold: "Cairo-Bold",
    medium: "Cairo-Medium",
    light: "Cairo-Light",
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },
  fontWeight: {
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  spacing: {
    xs: 4,
    sm: 8,
    base: 16,
    lg: 24,
    xl: 32,
    "2xl": 48,
    "3xl": 64,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    base: 8,
    lg: 12,
    xl: 16,
    full: 999,
  },
  shadow: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    base: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export const lightTheme: Theme = {
  background: {
    primary: "#FFFFFF",
    secondary: "#F8F9FA",
    card: "#FFFFFF",
    surface: "#F1F3F4",
    modal: "#FFFFFF",
  },
  text: {
    primary: "#1A1A1A",
    secondary: "#6B7280",
    muted: "#9CA3AF",
    inverse: "#FFFFFF",
    link: "#3B82F6",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
  },
  brand: {
    primary: "#6366F1",
    secondary: "#8B5CF6",
    accent: "#06B6D4",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
  },
  learning: {
    course: "#6366F1",
    lesson: "#8B5CF6",
    quiz: "#06B6D4",
    progress: "#10B981",
    bookmark: "#F59E0B",
    difficulty: {
      easy: "#10B981",
      medium: "#F59E0B",
      hard: "#EF4444",
    },
  },
  ui: {
    border: "#E5E7EB",
    divider: "#F3F4F6",
    shadow: "#00000010",
    overlay: "#00000050",
    disabled: "#D1D5DB",
    placeholder: "#9CA3AF",
    focus: "#3B82F6",
    hover: "#F3F4F6",
  },
  statusBar: "dark",
  ...commonTheme,
  isDark: false,
};

export const darkTheme: Theme = {
  background: {
    primary: "#0F172A",
    secondary: "#1E293B",
    card: "#334155",
    surface: "#475569",
    modal: "#1E293B",
  },
  text: {
    primary: "#F8FAFC",
    secondary: "#CBD5E1",
    muted: "#94A3B8",
    inverse: "#0F172A",
    link: "#60A5FA",
    success: "#34D399",
    warning: "#FBBF24",
    error: "#F87171",
  },
  brand: {
    primary: "#818CF8",
    secondary: "#A78BFA",
    accent: "#22D3EE",
    success: "#34D399",
    warning: "#FBBF24",
    error: "#F87171",
  },
  learning: {
    course: "#818CF8",
    lesson: "#A78BFA",
    quiz: "#22D3EE",
    progress: "#34D399",
    bookmark: "#FBBF24",
    difficulty: {
      easy: "#34D399",
      medium: "#FBBF24",
      hard: "#F87171",
    },
  },
  ui: {
    border: "#475569",
    divider: "#334155",
    shadow: "#00000030",
    overlay: "#00000070",
    disabled: "#64748B",
    placeholder: "#94A3B8",
    focus: "#60A5FA",
    hover: "#475569",
  },
  statusBar: "light",
  ...commonTheme,
  isDark: true,
};

export const getTheme = (isDark: boolean = false): Theme => {
  return isDark ? darkTheme : lightTheme;
};
