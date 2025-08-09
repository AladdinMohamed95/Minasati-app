// app/_layout.tsx
import { ErrorHandler } from "@/components/ErrorHandler";
import { LoadingView } from "@/components/LoadingView";
import { LoadinggProvider } from "@/context/LoadingContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { TranslationProvider } from "@/context/TranslationContext";
import { UserProvider } from "@/context/UserContext";
import { useFonts } from "@/hooks/useFonts";
import { createStyles } from "@/styles";
import { ConfigureRTL } from "@/utils";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StatusBar as RNStatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const ANDROID_STATUSBAR_HEIGHT = RNStatusBar.currentHeight ?? 24;
// This component handles the status bar based on theme
const ThemedStatusBar: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
      {/* Background under the status bar on Android (or on iOS if you want) */}
      {Platform.OS === "android" && (
        <View
          style={{
            height: ANDROID_STATUSBAR_HEIGHT,
            backgroundColor: theme.background.primary,
            width: "100%",
          }}
        />
      )}

      {/* Use expo StatusBar only for style / appearance */}
      <StatusBar style={theme.isDark ? "light" : "dark"} animated={true} />
    </>
  );
};

// Root layout component
const RootLayoutNav: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  useFonts();
  ConfigureRTL();

  // if (!fontsLoaded) {
  //   return <LoadingView isLoading />;
  // }

  return (
    <>
      <ThemedStatusBar />
      <SafeAreaView
        style={[
          styles.loadingView.safeArea,
          { backgroundColor: theme.background.primary },
        ]}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.background.primary },
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaView>
    </>
  );
};

const ThemedLoading: React.FC = React.memo(() => {
  return <LoadingView isLoading />;
});

const FallBack: React.FC = React.memo(() => {
  return <LoadingView isLoading />;
});

// Main layout wrapper with theme provider
const RootLayout: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ErrorHandler>
        <TranslationProvider>
          <React.Suspense fallback={<FallBack />}>
            <ThemeProvider>
              <UserProvider>
                <LoadinggProvider>
                  <React.Suspense fallback={<ThemedLoading />}>
                    <RootLayoutNav />
                  </React.Suspense>
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
