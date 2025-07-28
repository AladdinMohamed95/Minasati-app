export const spacing = {
  // Base spacing units
  xs: 4,
  sm: 8,
  base: 16,
  md: 20,
  lg: 24,
  xl: 32,
  "2xl": 40,
  "3xl": 48,
  "4xl": 64,
  "5xl": 80,

  // Border radius
  borderRadius: {
    none: 0,
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    "2xl": 24,
    "3xl": 32,
    full: 9999,
  },

  // Container spacing
  container: {
    padding: 20,
    margin: 16,
  },

  // Component-specific spacing
  component: {
    button: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    input: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    card: {
      padding: 16,
      margin: 16,
    },
    modal: {
      padding: 20,
      margin: 16,
    },
  },

  // Layout spacing
  layout: {
    headerHeight: 60,
    footerHeight: 80,
    sidebarWidth: 250,
    contentPadding: 20,
  },

  // Grid spacing
  grid: {
    gap: 16,
    columnGap: 16,
    rowGap: 16,
  },

  // Responsive breakpoints (for future use)
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
};
