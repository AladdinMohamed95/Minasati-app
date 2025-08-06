// @ts-ignore
import Logo from "@/assets/images/icon.png";
import { PrimaryButton } from "@/components/AppButton";
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";
import { UserType } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";

const HomeScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user } = useUser();

  const handleBooking = () => {
    router.push("/(tabs)/booking");
  };

  const handleIconPress = () => {
    if (user) {
      if (user.type === UserType.student) {
        router.push("/(tabs)/profile");
      } else {
        router.push("/(tabs)/teacherProfile");
      }
    } else {
      router.push("/(tabs)/loginScreen");
    }
  };

  const handleRegistrations = () => {
    router.push("/(tabs)/teacherRegistrations");
  };

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <TouchableOpacity
        onPress={handleIconPress}
        style={styles.homeScreen.iconContainer}
      >
        <Ionicons
          name={user ? "person-circle-outline" : "log-in-outline"}
          size={36}
          color={theme.text.primary}
        />
      </TouchableOpacity>

      <View style={styles.homeScreen.logoContainer}>
        <View style={styles.homeScreen.logoPlaceholder}>
          <Image
            source={Logo}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
            accessibilityLabel="App Logo"
          />
        </View>

        <View>
          <AppText style={styles.homeScreen.descriptionText}>
            {t("Hello")} {user?.name || t("welcomeGuest")},
          </AppText>
          <AppText style={styles.registerScreen.title}>{t("welcome")}</AppText>
          <AppText style={styles.homeScreen.descriptionText}>
            {t("slug") || "احجز حصتك الآن بسهولة وسرعة"}
          </AppText>
          <AppText style={styles.homeScreen.subDescriptionText}>
            {t("slugDesc")}
          </AppText>
        </View>
      </View>

      <View style={styles.homeScreen.contactContainer}>
        <PrimaryButton
          title={t("booknow")}
          onPress={handleBooking}
          theme={theme}
          textStyle={styles.whiteAndBlackText.whiteText}
        />
        {user?.type === UserType.teacher && (
          <PrimaryButton
            title={t("viewRegisterations")}
            onPress={handleRegistrations}
            theme={theme}
            textStyle={styles.whiteAndBlackText.whiteText}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
