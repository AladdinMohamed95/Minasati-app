import { PrimaryButton, SecondaryButton } from "@/components/AppButton";
import AppText from "@/components/AppText";
import { useTranslationContext } from "@/context/TranslationContext";
import { useUser } from "@/context/UserContext";
import { styles } from "@/styles/loginStyles";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StatusBar, TouchableOpacity, View } from "react-native";

const RegisterScreen = () => {
  const { login } = useUser();
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useTranslationContext();

  const handlePhoneRegister = () => {
    login({
      id: "001",
      name: "Aladdin",
      type: "student",
    });
    router.push("/profile");
  };

  const handleGuestBrowse = () => {
    login({
      id: "guest",
      name: "guest",
      type: "guest",
    });
    router.push("/home");
  };

  const handleTeacherSignup = () => {
    login({
      id: "new-teacher",
      name: "teacher",
      type: "teacher",
    });
    router.push("/home");
  };

  const handleContactUs = () => {
    // Handle contact us
    console.log("Contact us pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <AppText style={styles.logoText}>LOGO</AppText>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <AppText style={styles.descriptionText}>{t("slug")}</AppText>
        <AppText style={styles.subDescriptionText}>{t("slugDesc")}</AppText>
      </View>

      <View style={styles.buttonsContainer}>
        <PrimaryButton title={t("register")} onPress={handlePhoneRegister} />
        <SecondaryButton title={t("guest")} onPress={handleGuestBrowse} />
      </View>

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
