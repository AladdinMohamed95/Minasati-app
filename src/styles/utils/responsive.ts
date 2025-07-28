import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Breakpoints
export const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

// Screen dimensions
export const screenData = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};

// Check if device is tablet
export const isTablet = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;

  return adjustedWidth >= 1000 || adjustedHeight >= 1000;
};

// Check if device is in landscape mode
export const isLandscape = () => SCREEN_WIDTH > SCREEN_HEIGHT;

// Responsive width
export const responsiveWidth = (percentage: number) => {
  return (SCREEN_WIDTH * percentage) / 100;
};

// Responsive height
export const responsiveHeight = (percentage: number) => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

// Responsive font size based on screen width
export const responsiveFontSize = (size: number) => {
  const scale = SCREEN_WIDTH / 375; // Base width (iPhone X)
  const newSize = size * scale;

  return Math.max(12, Math.min(newSize, 30)); // Min 12, max 30
};

// Get responsive spacing
export const responsiveSpacing = (size: number) => {
  const scale = SCREEN_WIDTH / 375;
  return size * scale;
};

// Media queries equivalent for React Native
export const mediaQuery = {
  sm: () => SCREEN_WIDTH >= breakpoints.sm,
  md: () => SCREEN_WIDTH >= breakpoints.md,
  lg: () => SCREEN_WIDTH >= breakpoints.lg,
  xl: () => SCREEN_WIDTH >= breakpoints.xl,
};

// Responsive container width
export const getContainerWidth = () => {
  if (SCREEN_WIDTH >= breakpoints.xl) return breakpoints.lg;
  if (SCREEN_WIDTH >= breakpoints.lg) return SCREEN_WIDTH * 0.9;
  if (SCREEN_WIDTH >= breakpoints.md) return SCREEN_WIDTH * 0.95;
  return SCREEN_WIDTH;
};

// Get responsive grid columns
export const getGridColumns = () => {
  if (isTablet()) return 4;
  if (SCREEN_WIDTH >= breakpoints.md) return 3;
  return 2;
};

// Responsive card width for grid layouts
export const getCardWidth = (
  columns: number = getGridColumns(),
  margin: number = 16
) => {
  const totalMargin = margin * (columns + 1);
  return (SCREEN_WIDTH - totalMargin) / columns;
};

// Safe area helpers for responsive design
export const getSafeAreaInsets = () => {
  // This is a basic implementation - in real apps use react-native-safe-area-context
  return {
    top: isLandscape() ? 0 : 44,
    bottom: 34,
    left: isLandscape() ? 44 : 0,
    right: isLandscape() ? 44 : 0,
  };
};
