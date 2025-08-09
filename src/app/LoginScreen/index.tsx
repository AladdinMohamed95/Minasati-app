import { PrimaryButton } from "@/components/AppButton";
import AppText from "@/components/AppText";
import { LoadingView } from "@/components/LoadingView";
import { useTheme } from "@/context/ThemeContext";
import { useTranslationContext } from "@/context/TranslationContext";
import { useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";
import { LoginResponse, UserType } from "@/types/api";
import { formDataProps } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const LoginScreen = () => {
  const { isInitializing, login } = useUser();
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

  const [isStudent, setIsStudent] = useState<boolean>(true);
  const [response, setResponse] = useState<string>("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

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
    router.push("/StudentRegisterScreen");
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
    setResponse("");
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

    setIsLoginLoading(true);
    setResponse("");

    try {
      const res: LoginResponse = await login(
        formData.phone,
        formData.password,
        isStudent ? UserType.student : UserType.teacher
      );

      if (res.access_token) {
        router.replace("/");
      } else {
        setResponse(t("loginError"));
      }
    } catch (error: any) {
      console.log("Login error:", error);

      if (error?.message) {
        setResponse(error.message);
      } else if (error?.response?.data?.message) {
        setResponse(error.response.data.message);
      } else {
        setResponse(t("loginError"));
      }
    } finally {
      setIsLoginLoading(false);
    }
  };

  if (isInitializing) {
    return <LoadingView isLoading={true} />;
  }

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, paddingHorizontal: 20 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.homeScreen.descriptionContainer} />

            <View style={styles.homeScreen.signupContainer}>
              <AppText style={styles.registerScreen.label}>
                {isStudent ? t("student") : t("teacher")}
              </AppText>
              <Switch
                value={isStudent}
                onValueChange={setIsStudent}
                thumbColor={isStudent ? "#fff" : "#f4f3f4"}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                disabled={isLoginLoading}
              />
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
                editable={!isLoginLoading}
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
                editable={!isLoginLoading}
              />
              {errors.password && (
                <AppText style={styles.registerScreen.errorText}>
                  {errors.password}
                </AppText>
              )}
            </View>

            <PrimaryButton
              title={isLoginLoading ? t("loading") : t("login")}
              onPress={handleLogin}
              theme={theme}
              textStyle={styles.whiteAndBlackText.whiteText}
              disabled={isLoginLoading}
            />

            {response && (
              <AppText style={styles.registerScreen.errorText}>
                {response}
              </AppText>
            )}

            <TouchableOpacity
              onPress={handlePhoneRegister}
              disabled={isLoginLoading}
            >
              <AppText
                style={[
                  styles.otherViewStyle.teacherLink,
                  isLoginLoading && { opacity: 0.5 },
                ]}
              >
                {t("newUser")}
              </AppText>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {isLoginLoading && (
        <View style={styles.homeScreen.loadingView}>
          <LoadingView isLoading={true} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;
