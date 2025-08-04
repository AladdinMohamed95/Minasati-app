import { createStyles } from "@/styles";
import { Theme } from "@/types/style";
import { LinearGradient } from "expo-linear-gradient"; // Make sure expo-linear-gradient is installed
import React from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import AppText from "./AppText";

type Props = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: object;
  textStyle?: object;
  theme: Theme;
  disabled?: boolean;
};

export const PrimaryButton = ({
  title,
  onPress,
  style,
  textStyle,
  theme,
  disabled,
}: Props) => {
  const styles = createStyles(theme);
  return (
    <LinearGradient
      colors={["#4f8cff", "#1cb5e0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.appButton.gradient, style]}
    >
      <TouchableOpacity
        style={styles.appButton.primaryButton}
        onPress={onPress}
        activeOpacity={0.85}
        disabled={disabled}
      >
        <AppText style={[styles.appButton.primaryText, textStyle]}>
          {title}
        </AppText>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export const SecondaryButton = ({
  title,
  onPress,
  style,
  textStyle,
  theme,
}: Props) => {
  const styles = createStyles(theme);
  return (
    <TouchableOpacity
      style={[styles.appButton.secondaryButton, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <AppText style={[styles.appButton.secondaryText, textStyle]}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};
