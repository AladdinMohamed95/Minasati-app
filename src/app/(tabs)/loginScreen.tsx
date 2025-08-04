// @ts-ignore
import Logo from "@/assets/images/icon.png";
import { PrimaryButton, SecondaryButton } from "@/components/AppButton";
import AppText from "@/components/AppText";
import { LoadingView } from "@/components/LoadingView";
import { useTheme } from "@/context/ThemeContext";
import { useTranslationContext } from "@/context/TranslationContext";
import { useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";
import { formDataProps } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const LoginScreen = () => {
  const { isLoading, isInitializing, login } = useUser();
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useTranslationContext();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [formData, setFormData] = useState<
    Pick<formDataProps, "phone" | "password">
  >({
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<"name" | "phone" | "password" | "confirm_password", string>>
  >({});

  useEffect(() => {
    const debugToken = async () => {
      const token = await AsyncStorage.getItem("access_token");
      const tokenType = await AsyncStorage.getItem("token_type");

      console.log("Token:", token);
      console.log("Token Type:", tokenType);
    };
    debugToken();
  }, []);

  const handlePhoneRegister = () => {
    router.push("/studentRegisteration");
  };

  const handleGuestBrowse = () => {
    router.push("/booking");
  };

  const handleTeacherSignup = () => {
    router.push("/teacherRegister");
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const validateForm = () => {
    const { phone, password } = formData;

    const newErrors: Partial<Record<"phone" | "password", string>> = {};

    if (!phone?.trim()) newErrors.phone = t("phoneNumberError");

    if (!password?.trim()) {
      newErrors.password = t("passwordRequiredError");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    try {
      await login(formData.phone, formData.password);
      router.push("/(tabs)/profile");
    } catch (error) {
      setErrors({ password: t("loginError") || "Login failed" });
    }
  };

  if (isInitializing) {
    return <LoadingView isLoading={isLoading} />;
  }

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
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
              <AppText style={styles.homeScreen.descriptionText}>
                {t("slug")}
              </AppText>
              {/* <AppText style={styles.homeScreen.subDescriptionText}>
                {t("slugDesc")}
              </AppText> */}
            </View>

            <View style={styles.registerScreen.inputContainer}>
              <AppText style={styles.registerScreen.label}>
                {t("phone")}
              </AppText>
              <TextInput
                style={[
                  styles.registerScreen.input,
                  errors.phone && styles.registerScreen.inputError,
                ]}
                value={formData.phone}
                onChangeText={(text) => handleInputChange("phone", text)}
                keyboardType="phone-pad"
                textAlign={language === "ar" ? "right" : "left"}
                editable={!isLoading}
              />
              {errors.phone && (
                <AppText style={styles.registerScreen.errorText}>
                  {errors.phone}
                </AppText>
              )}
            </View>

            <View style={styles.registerScreen.inputContainer}>
              <AppText style={styles.registerScreen.label}>
                {t("password")}
              </AppText>
              <TextInput
                style={[
                  styles.registerScreen.input,
                  errors.password && styles.registerScreen.inputError,
                ]}
                value={formData.password}
                onChangeText={(text) => handleInputChange("password", text)}
                secureTextEntry={true}
                textAlign={language === "ar" ? "right" : "left"}
                editable={!isLoading}
              />
              {errors.password && (
                <AppText style={styles.registerScreen.errorText}>
                  {errors.password}
                </AppText>
              )}
            </View>
            <PrimaryButton
              title={t("login")}
              onPress={handleLogin}
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
                  {
                    flexDirection: language === "ar" ? "row-reverse" : "row",
                  },
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
              <View
                style={[
                  styles.otherViewStyle.teacherSignupContainer,
                  {
                    flexDirection: language === "ar" ? "row-reverse" : "row",
                  },
                ]}
              >
                <AppText style={styles.otherViewStyle.teacherText}>
                  {t("newStudent")}
                </AppText>
                <TouchableOpacity onPress={handlePhoneRegister}>
                  <AppText style={styles.otherViewStyle.teacherLink}>
                    {t("teacherSignup")}
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
