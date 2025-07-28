import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "@/styles/styles";
import React from "react";
import { Text, TextProps } from "react-native";

const AppText: React.FC<TextProps> = ({ style, children, ...rest }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <Text style={[{ fontFamily: theme.fontFamily.regular }, style]} {...rest}>
      {children}
    </Text>
  );
};

export default AppText;
