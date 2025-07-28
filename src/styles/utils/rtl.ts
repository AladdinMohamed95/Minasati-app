import { I18nManager } from "react-native";

export const configureRTL = (isRTL: boolean) => {
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
};

export const getRTLFlexDirection = (isRTL: boolean) => ({
  flexDirection: isRTL ? "row-reverse" : ("row" as const),
});

export const getRTLTextAlign = (isRTL: boolean) => ({
  textAlign: isRTL ? "right" : ("left" as const),
});

export const getRTLMargin = (isRTL: boolean, margin: number) => ({
  [isRTL ? "marginLeft" : "marginRight"]: margin,
});

export const getRTLPadding = (isRTL: boolean, padding: number) => ({
  [isRTL ? "paddingLeft" : "paddingRight"]: padding,
});

export const getRTLAlignment = (isRTL: boolean) => ({
  alignItems: isRTL ? "flex-end" : ("flex-start" as const),
});

export const getRTLPosition = (isRTL: boolean, position: number) => ({
  [isRTL ? "right" : "left"]: position,
});

export const getWritingDirection = (isRTL: boolean) => ({
  writingDirection: isRTL ? "rtl" : ("ltr" as const),
});

export const getRTLStyles = (isRTL: boolean) => ({
  ...getRTLFlexDirection(isRTL),
  ...getRTLTextAlign(isRTL),
  ...getRTLAlignment(isRTL),
  ...getWritingDirection(isRTL),
});
