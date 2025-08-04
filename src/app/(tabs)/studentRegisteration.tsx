// @ts-ignore
import { studentRegister } from "@/api/auth";
import { PrimaryButton } from "@/components/AppButton";
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { useTranslationContext } from "@/context/TranslationContext";
import { useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";
import { StudentProfileRequest } from "@/types/api";
import { formDataProps } from "@/types/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput,
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
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // حل أكتر فعالية: استخدم useEffect مرة واحدة فقط عند mount
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
      } as StudentProfileRequest;

      if (isEdit) {
        await updateUser(submitData);
        Alert.alert(t("updateSuccess"), t("studentUpdatedSuccessfully"), [
          { text: t("ok"), onPress: () => router.back() },
        ]);
      } else {
        await studentRegister({
          name: formData.name,
          phone: formData.phone,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        });
        Alert.alert(
          t("registrationSuccess"),
          t("studentRegisteredSuccessfully"),
          [{ text: t("ok"), onPress: () => router.push("/profile") }]
        );
      }
    } catch (error) {
      console.error(
        `Error ${isEdit ? "updating" : "registering"} student:`,
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

  // لا تعرض الشاشة حتى يتم التهيئة
  if (!isInitialized) {
    return (
      <SafeAreaView style={styles.homeScreen.container}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={theme.background.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <ScrollView style={styles.registerScreen.scrollContainer}>
        <View style={styles.registerScreen.formContainer}>
          <AppText style={styles.registerScreen.title}>
            {isEdit ? t("editStudentTitle") : t("studentRegisterationTitle")}
          </AppText>

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
            <AppText style={styles.registerScreen.label}>
              {t("phone")} *
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

          <View style={styles.registerScreen.buttonsContainer}>
            <PrimaryButton
              title={
                isLoading
                  ? isEdit
                    ? t("updating")
                    : t("registering")
                  : isEdit
                  ? t("updateButton")
                  : t("registerButton")
              }
              onPress={handleSubmit}
              theme={theme}
              disabled={isLoading}
            />
            {isLoading && (
              <ActivityIndicator
                size="small"
                color={theme.background.primary}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentFormScreen;
