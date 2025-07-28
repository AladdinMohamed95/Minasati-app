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

const RegisterScreen = () => {
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.preferencesContainer}>
        <LanguageSwitcher />
        {/* <ThemeToggle /> */}
      </View>
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <Image
            source={Logo}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
            accessibilityLabel="App Logo"
          />
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <AppText style={styles.descriptionText}>{t("slug")}</AppText>
        <AppText style={styles.subDescriptionText}>{t("slugDesc")}</AppText>
      </View>

      <PrimaryButton
        title={t("register")}
        onPress={handlePhoneRegister}
        theme={theme}
        textStyle={styles.whiteText}
      />
      <SecondaryButton
        title={t("guest")}
        onPress={handleGuestBrowse}
        theme={theme}
        textStyle={styles.blackText}
      />

      <View style={styles.footerContainer}>
        <View
          style={[
            styles.teacherSignupContainer,
            { flexDirection: language === "ar" ? "row-reverse" : "row" },
          ]}
        >
          <AppText style={styles.teacherText}>{t("newTeacher")}</AppText>
          <TouchableOpacity onPress={handleTeacherSignup}>
            <AppText style={styles.teacherLink}>{t("teacherSignup")}</AppText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.contactContainer}
          onPress={handleContactUs}
        >
          <AppText style={styles.contactText}>{t("contactus")}</AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
