// @ts-ignore
import Logo from "@/assets/images/icon.png";
import { PrimaryButton, SecondaryButton } from "@/components/AppButton";
import AppText from "@/components/AppText";
import { LanguageSwitcher } from "@/components/PreferencesSwitcher";
import { useTheme } from "@/context/ThemeContext";
import { useTranslationContext } from "@/context/TranslationContext";
import { useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";

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
  const { login } = useUser();
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useTranslationContext();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handlePhoneRegister = () => {
    router.push("/studentRegisteration");
  };

  const handleGuestBrowse = () => {
    login({
      id: "guest",
      name: "guest",
      type: "guest",
    });
    router.push("/teacherScreen");
  };

  const handleTeacherSignup = () => {
    router.push("/teacherRegister");
  };

  const handleContactUs = () => {
    console.log("Contact us pressed");
    router.push("/materialScreen");
  };

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.preferenceContainer.preferencesContainer}>
        <LanguageSwitcher />
        {/* <ThemeToggle /> */}
      </View>
      <View style={styles.homeScreen.logoContainer}>
        <View style={styles.homeScreen.logoPlaceholder}>
          <Image
            source={Logo}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
            accessibilityLabel="App Logo"
          />
        </View>
      </View>

      <View style={styles.homeScreen.descriptionContainer}>
        <AppText style={styles.homeScreen.descriptionText}>{t("slug")}</AppText>
        <AppText style={styles.homeScreen.subDescriptionText}>
          {t("slugDesc")}
        </AppText>
      </View>

      <PrimaryButton
        title={t("register")}
        onPress={handlePhoneRegister}
        theme={theme}
        textStyle={styles.whiteAndBlackText.whiteText}
      />
      <SecondaryButton
        title={t("guest")}
        onPress={handleGuestBrowse}
        theme={theme}
        textStyle={styles.whiteAndBlackText.blackText}
      />

      <View style={styles.homeScreen.footerContainer}>
        <View
          style={[
            styles.otherViewStyle.teacherSignupContainer,
            { flexDirection: language === "ar" ? "row-reverse" : "row" },
          ]}
        >
          <AppText style={styles.otherViewStyle.teacherText}>
            {t("newTeacher")}
          </AppText>
          <TouchableOpacity onPress={handleTeacherSignup}>
            <AppText style={styles.otherViewStyle.teacherLink}>
              {t("teacherSignup")}
            </AppText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.homeScreen.contactContainer}
          onPress={handleContactUs}
        >
          <AppText style={styles.homeScreen.contactText}>
            {t("contactus")}
          </AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
