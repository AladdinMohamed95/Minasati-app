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
    primary: "#F9FAFB",
    secondary: "#F5E9DA",
    card: "#FFFFFF",
    surface: "#EDEFF1",
    modal: "#FFFFFF",
  },
  text: {
    primary: "#2D2F33",
    secondary: "#4B5563",
    muted: "#94A3B8",
    inverse: "#FFFFFF",
    link: "#1D4ED8", // deep learning blue
    success: "#22C55E", // vibrant green
    warning: "#FACC15", // golden yellow
    error: "#DC2626", // strong red
  },
  brand: {
    primary: "#2563EB", // blue focus
    secondary: "#7C3AED", // creative purple
    accent: "#14B8A6", // teal for attention
    success: "#22C55E",
    warning: "#FACC15",
    error: "#DC2626",
  },
  learning: {
    course: "#2563EB",
    lesson: "#7C3AED",
    quiz: "#14B8A6",
    progress: "#22C55E",
    bookmark: "#EAB308",
    difficulty: {
      easy: "#4ADE80",
      medium: "#FBBF24",
      hard: "#EF4444",
    },
  },
  ui: {
    border: "#E2E8F0",
    divider: "#E5E7EB",
    shadow: "#00000010",
    overlay: "#00000030",
    disabled: "#D1D5DB",
    placeholder: "#9CA3AF",
    focus: "#2563EB",
    hover: "#F1F5F9",
  },
  statusBar: "dark",
  ...commonTheme,
  isDark: false,
};

// export const darkTheme: Theme = {
//   background: {
//     primary: "#FAFAFA", //121826
//     secondary: "#1E2533",
//     card: "#20293A",
//     surface: "#2C3547",
//     modal: "#1E2533",
//   },
//   text: {
//     primary: "#F8FAFC",
//     secondary: "#CBD5E1",
//     muted: "#94A3AF",
//     inverse: "#121826",
//     link: "#60A5FA", // soft learning blue
//     success: "#34D399", // mint green
//     warning: "#FBBF24", // yellow
//     error: "#F87171", // soft red
//   },
//   brand: {
//     primary: "#60A5FA",
//     secondary: "#A78BFA",
//     accent: "#22D3EE",
//     success: "#34D399",
//     warning: "#FBBF24",
//     error: "#F87171",
//   },
//   learning: {
//     course: "#60A5FA",
//     lesson: "#A78BFA",
//     quiz: "#22D3EE",
//     progress: "#34D399",
//     bookmark: "#FACC15",
//     difficulty: {
//       easy: "#4ADE80",
//       medium: "#FACC15",
//       hard: "#F87171",
//     },
//   },
//   ui: {
//     border: "#374151",
//     divider: "#4B5563",
//     shadow: "#00000040",
//     overlay: "#00000080",
//     disabled: "#6B7280",
//     placeholder: "#94A3AF",
//     focus: "#60A5FA",
//     hover: "#374151",
//   },
//   statusBar: "light",
//   ...commonTheme,
//   isDark: true,
// };

export const getTheme = (isDark: boolean = false): Theme => {
  return isDark ? lightTheme : lightTheme;
};
