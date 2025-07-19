import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

const AppText: React.FC<TextProps> = ({ style, children, ...rest }) => {
  const { theme } = useTheme();
  return (
    <Text
      style={[styles.text, { fontFamily: theme.fontFamily.regular }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Cairo-Regular",
  },
});

export default AppText;
