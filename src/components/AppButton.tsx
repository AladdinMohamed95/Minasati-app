import { createStyles } from "@/styles/styles";
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
};

export const PrimaryButton = ({
  title,
  onPress,
  style,
  textStyle,
  theme,
}: Props) => {
  const styles = createStyles(theme);
  return (
    <LinearGradient
      colors={["#4f8cff", "#1cb5e0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.gradient, style]}
    >
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <AppText style={[styles.primaryText, textStyle]}>{title}</AppText>
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
      style={[styles.secondaryButton, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <AppText style={[styles.secondaryText, textStyle]}>{title}</AppText>
    </TouchableOpacity>
  );
};

// const styles = StyleSheet.create({
//   gradient: {
//     borderRadius: 16,
//     marginBottom: 10,
//     shadowColor: "#1cb5e0",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.25,
//     shadowRadius: 12,
//     elevation: 6,
//   },
//   primaryButton: {
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     borderRadius: 16,
//     alignItems: "center",
//   },
//   primaryText: {
//     color: "#fff",
//     fontSize: 18,
//     letterSpacing: 1,
//   },
//   secondaryButton: {
//     backgroundColor: "transparent",
//     alignItems: "center",
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//   },
//   secondaryText: {
//     color: "#2c3e50",
//     fontSize: 18,
//     textDecorationLine: "underline",
//   },
// });
