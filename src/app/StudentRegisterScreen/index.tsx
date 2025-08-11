import { studentRegister, teacherRegister } from "@/api/auth";
import AppText from "@/components/AppText";
import { LoadingView } from "@/components/LoadingView";
import { useTheme } from "@/context/ThemeContext";
import { useTranslationContext } from "@/context/TranslationContext";
import { useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";
import { RegisterRequest, UserType } from "@/types/api"; // إضافة UserType
import { formDataProps } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const StudentFormScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useTranslationContext();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const params = useLocalSearchParams();
  const isEdit = params.mode === "edit";
  const { updateUser } = useUser();
  const [isStudent, setIsStudent] = useState(true); // true = طالب, false = معلم
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { login } = useUser();

  const [formData, setFormData] = useState<
    Pick<formDataProps, "name" | "phone" | "password" | "password_confirmation">
  >({
    name: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<"name" | "phone" | "password" | "confirm_password", string>>
  >({});

  useEffect(() => {
    if (isEdit && params.studentData && !isInitialized) {
      try {
        const studentData = JSON.parse(params.studentData as string);
        setFormData({
          name: studentData.name || "",
          phone: studentData.phone || "",
          password: "",
          password_confirmation: "",
        });
        setIsInitialized(true);
      } catch (error) {
        console.error("Error parsing student data:", error);
      }
    } else if (!isEdit) {
      setIsInitialized(true);
    }
  }, [isEdit, params.studentData, isInitialized]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({
      ...prev,
      [field === "password_confirmation" ? "confirm_password" : field]:
        undefined,
    }));
  };

  const validateForm = () => {
    const { name, phone, password, password_confirmation } = formData;

    const newErrors: Partial<
      Record<"name" | "phone" | "password" | "confirm_password", string>
    > = {};

    if (!name?.trim()) newErrors.name = t("nameError");
    if (!phone?.trim()) newErrors.phone = t("phoneNumberError");

    if (!isEdit) {
      if (!password?.trim()) {
        newErrors.password = t("passwordRequiredError");
      } else if (password.length < 6) {
        newErrors.password = t("passwordTooShortError");
      }

      if (!password_confirmation?.trim()) {
        newErrors.confirm_password = t("confirmPasswordRequiredError");
      } else if (password !== password_confirmation) {
        newErrors.confirm_password = t("passwordsDoNotMatchError");
      }
    } else {
      if (password?.trim()) {
        if (password.length < 6) {
          newErrors.password = t("passwordTooShortError");
        }
        if (!password_confirmation?.trim()) {
          newErrors.confirm_password = t("confirmPasswordRequiredError");
        } else if (password !== password_confirmation) {
          newErrors.confirm_password = t("passwordsDoNotMatchError");
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return Alert.alert(t("dataError"), t("fillAllRequiredFields"));
    }

    setIsLoading(true);
    try {
      const submitData = {
        name: formData.name,
        phone: formData.phone,
        ...(formData.password?.trim() && {
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        }),
      } as RegisterRequest;

      if (isEdit) {
        await updateUser(submitData);
        Alert.alert(t("updateSuccess"), t("studentUpdatedSuccessfully"), [
          { text: t("ok"), onPress: () => router.back() },
        ]);
      } else {
        if (isStudent) {
          await studentRegister(
            {
              name: formData.name,
              phone: formData.phone,
              password: formData.password,
              password_confirmation: formData.password_confirmation,
            },
            UserType.student
          );
          await login(formData.phone, formData.password, UserType.student);

          Alert.alert(
            t("registrationSuccess"),
            t("studentRegisteredSuccessfully"),
            [{ text: t("ok"), onPress: () => router.push("/") }]
          );
        } else {
          await teacherRegister(
            {
              name: formData.name,
              phone: formData.phone,
              password: formData.password,
              password_confirmation: formData.password_confirmation,
            },
            UserType.teacher
          );
          await login(formData.phone, formData.password, UserType.student);

          Alert.alert(
            t("registrationSuccess"),
            t("teacherRegisteredSuccessfully"),
            [
              {
                text: t("ok"),
                onPress: () => router.push("/"),
              },
            ]
          );
        }
      }
    } catch (error) {
      console.error(
        `Error ${isEdit ? "updating" : "registering"} ${
          isStudent ? "student" : "teacher"
        }:`,
        error
      );
      Alert.alert(
        isEdit ? t("updateError") : t("registrationError"),
        isEdit ? t("updateFailed") : t("registrationFailed")
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <SafeAreaView style={styles.homeScreen.container}>
        <View style={styles.registerScreen.loading}>
          <LoadingView isLoading={isLoading} />
        </View>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.homeScreen.container}>
        <View style={styles.registerScreen.loading}>
          <LoadingView isLoading={isLoading} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <LinearGradient
        colors={["#4F46E5", "#7C3AED"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.homeScreen.headerGradient}
      >
        <View style={styles.homeScreen.headerContent}>
          <View>
            <AppText style={styles.homeScreen.welcomeText}>
              {isEdit ? t("editUserTitle") : t("userRegisterationTitle")}
            </AppText>
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isInitialized}
            style={styles.homeScreen.iconBorder}
          >
            <Ionicons name={"person-add-outline"} size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.registerScreen.scrollContainer}>
        <View style={styles.homeScreen.signupContainer}>
          <View style={styles.registerScreen.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.registerScreen.toggleButton,
                isStudent && styles.registerScreen.toggleButtonActive,
              ]}
              onPress={() => setIsStudent(true)}
              disabled={isInitialized}
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
              disabled={isInitialized}
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
          <AppText style={styles.registerScreen.label}>{t("name")} *</AppText>
          <TextInput
            style={[
              styles.registerScreen.input,
              errors.name && styles.registerScreen.inputError,
            ]}
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
            textAlign={language === "ar" ? "right" : "left"}
            editable={!isLoading}
          />
          {errors.name && (
            <AppText style={styles.registerScreen.errorText}>
              {errors.name}
            </AppText>
          )}
        </View>

        <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>{t("phone")} *</AppText>
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
            {t("password")} {isEdit && "*"}
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

        <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>
            {t("password_confirmation")} {isEdit && "*"}
          </AppText>
          <TextInput
            style={[
              styles.registerScreen.input,
              errors.confirm_password && styles.registerScreen.inputError,
            ]}
            value={formData.password_confirmation}
            onChangeText={(text) =>
              handleInputChange("password_confirmation", text)
            }
            secureTextEntry={true}
            textAlign={language === "ar" ? "right" : "left"}
            editable={!isLoading}
          />
          {errors.confirm_password && (
            <AppText style={styles.registerScreen.errorText}>
              {errors.confirm_password}
            </AppText>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentFormScreen;
