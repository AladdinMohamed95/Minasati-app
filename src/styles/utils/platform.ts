import { Platform } from "react-native";

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";

// Platform-specific shadow generator
export const getPlatformShadow = (
  variant: "small" | "base" | "medium" | "large" | "modal" = "base"
) => {
  const shadowVariants = {
    small: Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
    base: Platform.select({
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
    medium: Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
    large: Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
    modal: Platform.select({
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
  };

  return shadowVariants[variant] || shadowVariants.base;
};

// Platform-specific text properties
export const getPlatformTextProps = () => ({
  includeFontPadding: false, // Android-specific, safe for iOS
  textAlignVertical: "center" as const, // Android-specific, safe for iOS
});

// Platform-specific input properties
export const getPlatformInputProps = () =>
  Platform.select({
    android: {
      paddingTop: 12,
      paddingBottom: 12,
    },
    ios: {},
  });

// Platform-specific safe area values
export const getSafeAreaTop = () =>
  Platform.select({
    ios: 50,
    android: 40,
  });

// Platform-specific status bar height
export const getStatusBarHeight = () =>
  Platform.select({
    ios: 44,
    android: 24,
  });

// Check if device has notch (simplified version)
export const hasNotch = () => {
  // This is a simplified check - in real apps you might use libraries like react-native-device-info
  return Platform.OS === "ios";
};

// Platform-specific border radius adjustments
export const getPlatformBorderRadius = (radius: number) => {
  // iOS typically handles larger border radius better
  return Platform.select({
    ios: radius,
    android: Math.min(radius, 20), // Cap Android border radius for better performance
  });
};
