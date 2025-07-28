// app/_layout.tsx
import { ErrorHandler } from "@/components/ErrorHandler";
import { LoadinggProvider } from "@/context/LoadingContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import {
  TranslationProvider,
  useTranslationContext,
} from "@/context/TranslationContext";
import { UserProvider } from "@/context/UserContext";
import { createStyles } from "@/styles/styles";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, I18nManager, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// This component handles the status bar based on theme
const ThemedStatusBar: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return <StatusBar style={styles.statusBar} />;
};

// Root layout component
const RootLayoutNav: React.FC = () => {
  const [fontsLoaded] = Font.useFonts({
    "Cairo-Regular": require("@/assets/fonts/Cairo-Regular.ttf"),
    "Cairo-Bold": require("@/assets/fonts/Cairo-Bold.ttf"),
    "Cairo-Light": require("@/assets/fonts/Cairo-Light.ttf"),
    "Cairo-Medium": require("@/assets/fonts/Cairo-Medium.ttf"),
  });
  const { language } = useTranslationContext();
  const isRTL = language === "ar";
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <>
      <ThemedStatusBar />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
};

const loading = (
  <View
    style={{
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      height: "100%",
    }}
  >
    <ActivityIndicator />
  </View>
);

// Main layout wrapper with theme provider
const RootLayout: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ErrorHandler>
        <TranslationProvider>
          <React.Suspense fallback={loading}>
            <ThemeProvider>
              <UserProvider>
                <LoadinggProvider>
                  <RootLayoutNav />
                </LoadinggProvider>
              </UserProvider>
            </ThemeProvider>
          </React.Suspense>
        </TranslationProvider>
      </ErrorHandler>
    </SafeAreaProvider>
  );
};

export default RootLayout;
