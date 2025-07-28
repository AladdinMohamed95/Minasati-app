import { useTranslationContext } from "@/context/TranslationContext";
import { AppStyles, Theme, TypedStyleSheet } from "@/types/style";
import { StyleSheet } from "react-native";

// Import all style creators from organized directories
import * as ComponentStyles from "./components";
import * as SharedStyles from "./shared";
import { configureRTL } from "./utils/rtl";

export const createStyles = (theme: Theme): TypedStyleSheet<AppStyles> => {
  const { language } = useTranslationContext();
  const isRTL = language === "ar";

  // Configure RTL
  configureRTL(isRTL);

  // Create all style objects using the organized structure
  const buttonStyles = SharedStyles.createButtonStyles(theme, isRTL);
  const cardStyles = SharedStyles.createCardStyles(theme, isRTL);
  const inputStyles = SharedStyles.createInputStyles(theme, isRTL);
  const modalStyles = SharedStyles.createModalStyles(theme, isRTL);
  const containerStyles = SharedStyles.createContainerStyles(theme, isRTL);
  const textStyles = SharedStyles.createTextStyles(theme, isRTL);

  const headerStyles = ComponentStyles.createHeaderStyles(theme, isRTL);
  const teacherCardStyles = ComponentStyles.createTeacherCardStyles(
    theme,
    isRTL
  );
  const materialCardStyles = ComponentStyles.createMaterialCardStyles(
    theme,
    isRTL
  );
  const stageSelectorStyles = ComponentStyles.createStageSelectorStyles(
    theme,
    isRTL
  );
  const progressBarStyles = ComponentStyles.createProgressBarStyles(
    theme,
    isRTL
  );
  const statsStyles = ComponentStyles.createStatsStyles(theme, isRTL);
  const logoStyles = ComponentStyles.createLogoStyles(theme, isRTL);

  // Combine all styles
  return StyleSheet.create<AppStyles>({
    ...buttonStyles,
    ...cardStyles,
    ...inputStyles,
    ...modalStyles,
    ...containerStyles,
    ...textStyles,
    ...headerStyles,
    ...teacherCardStyles,
    ...materialCardStyles,
    ...stageSelectorStyles,
    ...progressBarStyles,
    ...statsStyles,
    ...logoStyles,
  });
};

// Export organized style modules
export * as ComponentStyles from "./components";
export * as SharedStyles from "./shared";
export * as ThemeTokens from "./theme";
export * as StyleUtils from "./utils";

// Export individual style creators for direct use (backward compatibility)
export const {
  createButtonStyles,
  createCardStyles,
  createInputStyles,
  createModalStyles,
  createContainerStyles,
  createTextStyles,
} = SharedStyles;

export const {
  createHeaderStyles,
  createTeacherCardStyles,
  createMaterialCardStyles,
  createStageSelectorStyles,
  createProgressBarStyles,
  createStatsStyles,
  createLogoStyles,
} = ComponentStyles;

// Export utilities
export * from "./theme";
export * from "./utils/platform";
export * from "./utils/rtl";
