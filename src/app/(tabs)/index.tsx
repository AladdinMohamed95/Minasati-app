// @ts-ignore
import { PrimaryButton } from "@/components/AppButton";
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StatusBar, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user } = useUser();

  const handleBooking = () => {
    router.push("/booking");
  };

  const goToProfile = () => {
    router.push("/profile"); // تأكد أن صفحة البروفايل موجودة في هذا المسار
  };

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.homeScreen.logoContainer}>
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

        <TouchableOpacity
          onPress={goToProfile}
          style={styles.homeScreen.contactContainer}
        >
          <Ionicons
            name="person-circle-outline"
            size={40}
            color={theme.text.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Center content */}
      <View style={styles.homeScreen.contactContainer}>
        <PrimaryButton
          title={t("booknow")}
          onPress={handleBooking}
          theme={theme}
          textStyle={styles.whiteAndBlackText.whiteText}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
