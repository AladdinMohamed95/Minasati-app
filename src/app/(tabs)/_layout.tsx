// app/_layout.tsx
import { ErrorHandler } from "@/components/ErrorHandler";
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
import { ActivityIndicator, Platform, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// This component handles the status bar based on theme
const ThemedStatusBar: React.FC = () => {
  const { theme } = useTheme();

  return (
    <StatusBar
      style={theme.isDark ? "light" : "dark"}
      backgroundColor={
        Platform.OS === "android" ? theme.background.primary : "transparent"
      }
      translucent={Platform.OS === "android" ? false : true}
      animated={true}
      hideTransitionAnimation="fade"
    />
  );
};

// Root layout component
const RootLayoutNav: React.FC = () => {
  const [fontsLoaded] = useFonts();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  ConfigureRTL();

  if (!fontsLoaded) {
    return (
      <View
        style={[
          styles.loadingView.loadingContainer,
          { backgroundColor: theme.background.primary },
        ]}
      >
        <ThemedStatusBar />
        <ActivityIndicator size="large" />
      </View>
    );
  }
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
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaView>
    </>
  );
};

const ThemedLoading: React.FC = React.memo(() => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View
      style={[
        styles.loadingView.loadingWrapper,
        { backgroundColor: theme.background.primary },
      ]}
    >
      <ThemedStatusBar />
      <ActivityIndicator size="large" color={theme.text.primary} />
    </View>
  );
});

const FallBack: React.FC = React.memo(() => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.loadingView.suspenseContainer}>
      <StatusBar style="auto" />
      <ActivityIndicator size="large" />
    </View>
  );
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
