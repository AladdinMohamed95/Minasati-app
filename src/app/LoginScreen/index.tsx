import AppText from "@/components/AppText";
import { LoadingView } from "@/components/LoadingView";
import { useTheme } from "@/context/ThemeContext";
import { useTranslationContext } from "@/context/TranslationContext";
import { useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";
import { LoginResponse, UserType } from "@/types/api";
import { formDataProps } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
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

      <LinearGradient
        colors={["#4F46E5", "#7C3AED"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.homeScreen.headerGradient}
      >
        <View style={styles.homeScreen.headerContent}>
          <View>
            <AppText style={styles.homeScreen.welcomeText}>
              {isLoginLoading ? t("loading") : t("login")}
            </AppText>
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoginLoading}
            style={styles.homeScreen.iconBorder}
          >
            <Ionicons name={"log-in-outline"} size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView>
        <View style={styles.homeScreen.signupContainer}>
          <View style={styles.registerScreen.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.registerScreen.toggleButton,
                isStudent && styles.registerScreen.toggleButtonActive,
              ]}
              onPress={() => setIsStudent(true)}
              disabled={isLoginLoading}
            >
              <AppText
                style={[
                  styles.registerScreen.toggleText,
                  isStudent && styles.registerScreen.toggleTextActive,
                ]}
              >
                {t("student")}
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.registerScreen.toggleButton,
                !isStudent && styles.registerScreen.toggleButtonActive,
              ]}
              onPress={() => setIsStudent(false)}
              disabled={isLoginLoading}
            >
              <AppText
                style={[
                  styles.registerScreen.toggleText,
                  !isStudent && styles.registerScreen.toggleTextActive,
                ]}
              >
                {t("teacher")}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>{t("phone")}</AppText>
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
          <AppText style={styles.registerScreen.label}>{t("password")}</AppText>
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

        {response && (
          <AppText style={styles.registerScreen.errorText}>{response}</AppText>
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

        {isLoginLoading && (
          <View style={styles.homeScreen.loadingView}>
            <LoadingView isLoading={true} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
