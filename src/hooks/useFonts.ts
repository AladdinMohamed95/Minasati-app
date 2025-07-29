import * as Font from "expo-font";

export const useFonts = () => {
  return Font.useFonts({
    "Cairo-Regular": require("@/assets/fonts/Cairo-Regular.ttf"),
    "Cairo-Bold": require("@/assets/fonts/Cairo-Bold.ttf"),
    "Cairo-Light": require("@/assets/fonts/Cairo-Light.ttf"),
    "Cairo-Medium": require("@/assets/fonts/Cairo-Medium.ttf"),
  });
};
