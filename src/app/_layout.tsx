// app/_layout.tsx
import { ErrorHandler } from "@/components/ErrorHandler";
import { LoadingProvider } from "@/context/LoadingContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { TranslationProvider } from "@/context/TranslationContext";
import { UserProvider } from "@/context/UserContext";
import { useFonts } from "@/hooks/useFonts";
import { createStyles } from "@/styles";
import { ConfigureRTL } from "@/utils";
import { getApp } from "@react-native-firebase/app";
import {
  AuthorizationStatus,
  getInitialNotification,
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  requestPermission,
  setBackgroundMessageHandler,
} from "@react-native-firebase/messaging"; // هنا بنجيب الميثودز مباشرة
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React = require("react");

// const ANDROID_STATUSBAR_HEIGHT = RNStatusBar.currentHeight - 30 ?? 24;
// This component handles the status bar based on theme
const ThemedStatusBar: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
      {/* Background under the status bar on Android (or on iOS if you want) */}
      {Platform.OS === "android" && (
        <View
          style={{
            // height: ANDROID_STATUSBAR_HEIGHT,
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

// 🟢 دالة لطلب إذن الإشعارات
async function requestNotificationPermission() {
  if (Platform.OS === "android" && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: "Allow Notifications",
        message: "We need your permission to send you notifications",
        buttonPositive: "Allow",
        buttonNegative: "Deny",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } else if (Platform.OS === "ios") {
    const messagingInstance = getMessaging(getApp());
    const authStatus = await requestPermission(messagingInstance);
    return (
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL
    );
  }
  return true; // أندرويد أقل من 13 مش بيحتاج إذن
}

// Root layout component
const RootLayoutNav: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [fontsLoaded] = useFonts();

  ConfigureRTL();

  React.useEffect(() => {
    const initFCM = async () => {
      console.log("🔄 Initializing FCM...");

      const messagingInstance = getMessaging(getApp());

      // طلب الإذن
      const hasPermission = await requestNotificationPermission();
      console.log("📌 Notification permission:", hasPermission);

      if (hasPermission) {
        // الحصول على التوكن
        const token = await getToken(messagingInstance);
        console.log("📲 FCM Token:", token);
        Alert.alert("FCM Token", token);
      } else {
        console.log("❌ Notification permission denied");
        return;
      }

      // لما الاشعار يفتح التطبيق وهو مقفول (quit state)
      const initialMessage = await getInitialNotification(messagingInstance);
      if (initialMessage) {
        console.log(
          "🚀 App opened from quit state by notification:",
          initialMessage.notification
        );
      }

      // لما الاشعار يفتح التطبيق من الخلفية
      onNotificationOpenedApp(messagingInstance, async (remoteMessage) => {
        console.log(
          "📩 App opened from background by notification:",
          remoteMessage.notification
        );
      });

      // التعامل مع الرسائل في الخلفية
      setBackgroundMessageHandler(messagingInstance, async (remoteMessage) => {
        console.log("📥 Message handled in the background:", remoteMessage);
      });

      // التعامل مع الرسائل في foreground
      const unsubscribe = onMessage(
        messagingInstance,
        async (remoteMessage) => {
          Alert.alert("📩 New FCM message!", JSON.stringify(remoteMessage));
        }
      );

      return unsubscribe;
    };

    initFCM();
  }, []);

  const requestUserPermission = async () => {
    const messagingInstance = getMessaging(getApp());

    const authStatus = await requestPermission(messagingInstance);

    return (
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL
    );
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingView.safeArea}>
        <ActivityIndicator size="large" color={theme.text.primary} />
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
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaView>
    </>
  );
};

// Main layout wrapper with theme provider
const RootLayout: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ErrorHandler>
        <TranslationProvider>
          {/* <React.Suspense fallback={<FallBack />}> */}
          <ThemeProvider>
            <UserProvider>
              <LoadingProvider>
                {/* <React.Suspense fallback={<ThemedLoading />}> */}
                <RootLayoutNav />
                {/* </React.Suspense> */}
              </LoadingProvider>
            </UserProvider>
          </ThemeProvider>
          {/* </React.Suspense> */}
        </TranslationProvider>
      </ErrorHandler>
    </SafeAreaProvider>
  );
};

export default RootLayout;
