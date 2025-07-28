// Export all utility functions
export * from "./platform";
export * from "./responsive";
export * from "./rtl";

// Convenience re-exports for commonly used utilities
export {
  configureRTL,
  getRTLFlexDirection,
  getRTLStyles,
  getRTLTextAlign,
} from "./rtl";

export {
  getPlatformShadow,
  getPlatformTextProps,
  isAndroid,
  isIOS,
} from "./platform";

export {
  getGridColumns,
  isTablet,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "./responsive";
