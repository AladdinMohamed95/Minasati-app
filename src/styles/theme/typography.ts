export const typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    md: 18,
    lg: 20,
    xl: 24,
    "2xl": 28,
    "3xl": 32,
    "4xl": 36,
    "5xl": 48,
  },

  // Font weights
  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },

  // Line heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tighter: -0.05,
    tight: -0.025,
    normal: 0,
    wide: 0.025,
    wider: 0.05,
    widest: 0.1,
  },

  // Font families (if using custom fonts)
  fontFamily: {
    sans: "System",
    serif: "System",
    mono: "Menlo",
  },

  // Text styles presets
  textStyles: {
    // Headings
    h1: {
      fontSize: 32,
      fontWeight: "700",
      lineHeight: 1.25,
    },
    h2: {
      fontSize: 28,
      fontWeight: "600",
      lineHeight: 1.3,
    },
    h3: {
      fontSize: 24,
      fontWeight: "600",
      lineHeight: 1.35,
    },
    h4: {
      fontSize: 20,
      fontWeight: "600",
      lineHeight: 1.4,
    },
    h5: {
      fontSize: 18,
      fontWeight: "500",
      lineHeight: 1.45,
    },
    h6: {
      fontSize: 16,
      fontWeight: "500",
      lineHeight: 1.5,
    },

    // Body text
    body: {
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 1.5,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 1.4,
    },

    // UI text
    caption: {
      fontSize: 12,
      fontWeight: "400",
      lineHeight: 1.3,
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      lineHeight: 1.4,
    },
    button: {
      fontSize: 16,
      fontWeight: "500",
      lineHeight: 1.2,
    },

    // Display text
    display: {
      fontSize: 48,
      fontWeight: "700",
      lineHeight: 1.1,
    },

    // Link text
    link: {
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 1.5,
      textDecorationLine: "underline",
    },
  },

  // Text alignment utilities
  textAlign: {
    left: "left",
    center: "center",
    right: "right",
    justify: "justify",
  },

  // Text decoration
  textDecoration: {
    none: "none",
    underline: "underline",
    lineThrough: "line-through",
  },

  // Text transform
  textTransform: {
    none: "none",
    uppercase: "uppercase",
    lowercase: "lowercase",
    capitalize: "capitalize",
  },
};
