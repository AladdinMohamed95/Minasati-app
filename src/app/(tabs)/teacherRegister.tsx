// @ts-ignore
import { PrimaryButton, SecondaryButton } from "@/components/AppButton";
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { useTranslationContext } from "@/context/TranslationContext";
import { formDataProps, useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, SafeAreaView, ScrollView, TextInput, View } from "react-native";

const TeacherRegistrationScreen = () => {
  const { login } = useUser();
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useTranslationContext();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [formData, setFormData] = useState<
    Pick<
      formDataProps,
      | "fullName"
      | "specialization"
      | "qualification"
      | "yearsExperience"
      | "currentWorkplace"
      | "workAddress"
      | "homeAddress"
      | "phoneNumber"
      | "alternatePhone"
      | "nationalIdEgypt"
      | "residenceIdAbroad"
    >
  >({
    fullName: "",
    specialization: "",
    qualification: "",
    yearsExperience: "",
    currentWorkplace: "",
    workAddress: "",
    homeAddress: "",
    phoneNumber: "",
    alternatePhone: "",
    nationalIdEgypt: "",
    residenceIdAbroad: "",
  });

  const [errors, setErrors] = useState<Partial<formDataProps>>({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<formDataProps> = {};

    if (!formData.fullName.trim()) newErrors.fullName = t("fullNameError");
    if (!formData.specialization.trim())
      newErrors.specialization = t("specializationError");
    if (!formData.qualification.trim())
      newErrors.qualification = t("qualificationError");
    if (!formData.yearsExperience.trim())
      newErrors.yearsExperience = t("yearsExperienceError");
    if (!formData.currentWorkplace.trim())
      newErrors.currentWorkplace = t("currentWorkplaceError");
    if (!formData.workAddress.trim())
      newErrors.workAddress = t("workAddressError");
    if (!formData.homeAddress.trim())
      newErrors.homeAddress = t("homeAddressError");
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = t("phoneNumberError");

    // Either Egyptian national ID or abroad residence ID is required
    if (
      !formData?.nationalIdEgypt?.trim() &&
      !formData?.residenceIdAbroad?.trim()
    ) {
      newErrors.identification = t("identificationError");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Process registration
      login({
        id: `teacher_${Date.now()}`,
        name: formData.fullName,
        type: "teacher",
        data: formData,
      });

      Alert.alert("نجح التسجيل", "تم تسجيل المعلم بنجاح", [
        { text: "موافق", onPress: () => router.push("/home") },
      ]);
    } else {
      Alert.alert("خطأ في البيانات", "يرجى ملء جميع الحقول المطلوبة");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <ScrollView style={styles.registerScreen.scrollContainer}>
        <View style={styles.registerScreen.formContainer}>
          <AppText style={styles.registerScreen.title}>
            {t("teacherRegisterationTitle")}
          </AppText>

          <View style={styles.registerScreen.inputContainer}>
            <AppText style={styles.registerScreen.label}>
              {t("fullName")} *
            </AppText>
            <TextInput
              style={[
                styles.registerScreen.input,
                errors.fullName && styles.registerScreen.inputError,
              ]}
              value={formData.fullName}
              onChangeText={(text) => handleInputChange("fullName", text)}
              textAlign={language === "ar" ? "right" : "left"}
            />
            {errors.fullName && (
              <AppText style={styles.registerScreen.errorText}>
                {errors.fullName}
              </AppText>
            )}
          </View>

          <View style={styles.registerScreen.inputContainer}>
            <AppText style={styles.registerScreen.label}>
              {t("specialization")} *
            </AppText>
            <TextInput
              style={[
                styles.registerScreen.input,
                errors.specialization && styles.registerScreen.inputError,
              ]}
              value={formData.specialization}
              onChangeText={(text) => handleInputChange("specialization", text)}
              textAlign={language === "ar" ? "right" : "left"}
            />
            {errors.specialization && (
              <AppText style={styles.registerScreen.errorText}>
                {errors.specialization}
              </AppText>
            )}
          </View>

          <View style={styles.registerScreen.inputContainer}>
            <AppText style={styles.registerScreen.label}>
              {t("qualification")} *
            </AppText>
            <TextInput
              style={[
                styles.registerScreen.input,
                errors.qualification && styles.registerScreen.inputError,
              ]}
              value={formData.qualification}
              onChangeText={(text) => handleInputChange("qualification", text)}
              textAlign={language === "ar" ? "right" : "left"}
            />
            {errors.qualification && (
              <AppText style={styles.registerScreen.errorText}>
                {errors.qualification}
              </AppText>
            )}
          </View>

          <View style={styles.registerScreen.inputContainer}>
            <AppText style={styles.registerScreen.label}>
              {t("yearsExperience")} *
            </AppText>
            <TextInput
              style={[
                styles.registerScreen.input,
                errors.yearsExperience && styles.registerScreen.inputError,
              ]}
              value={formData.yearsExperience}
              onChangeText={(text) =>
                handleInputChange("yearsExperience", text)
              }
              keyboardType="numeric"
              textAlign={language === "ar" ? "right" : "left"}
            />
            {errors.yearsExperience && (
              <AppText style={styles.registerScreen.errorText}>
                {errors.yearsExperience}
              </AppText>
            )}
          </View>

          <View style={styles.registerScreen.inputContainer}>
            <AppText style={styles.registerScreen.label}>
              {t("currentWorkplace")} *
            </AppText>
            <TextInput
              style={[
                styles.registerScreen.input,
                errors.currentWorkplace && styles.registerScreen.inputError,
              ]}
              value={formData.currentWorkplace}
              onChangeText={(text) =>
                handleInputChange("currentWorkplace", text)
              }
              textAlign={language === "ar" ? "right" : "left"}
            />
            {errors.currentWorkplace && (
              <AppText style={styles.registerScreen.errorText}>
                {errors.currentWorkplace}
              </AppText>
            )}
          </View>

          <View style={styles.registerScreen.inputContainer}>
            <AppText style={styles.registerScreen.label}>
              {t("workAddress")} *
            </AppText>
            <TextInput
              style={[
                styles.registerScreen.input,
                errors.workAddress && styles.registerScreen.inputError,
              ]}
              value={formData.workAddress}
              onChangeText={(text) => handleInputChange("workAddress", text)}
              multiline={true}
              numberOfLines={3}
              textAlign={language === "ar" ? "right" : "left"}
              textAlignVertical="top"
            />
            {errors.workAddress && (
              <AppText style={styles.registerScreen.errorText}>
                {errors.workAddress}
              </AppText>
            )}
          </View>

          <View style={styles.registerScreen.inputContainer}>
            <AppText style={styles.registerScreen.label}>
              {t("homeAddress")} *
            </AppText>
            <TextInput
              style={[
                styles.registerScreen.input,
                errors.homeAddress && styles.registerScreen.inputError,
              ]}
              value={formData.homeAddress}
              onChangeText={(text) => handleInputChange("homeAddress", text)}
              multiline={true}
              numberOfLines={3}
              textAlign={language === "ar" ? "right" : "left"}
              textAlignVertical="top"
            />
            {errors.homeAddress && (
              <AppText style={styles.registerScreen.errorText}>
                {errors.homeAddress}
              </AppText>
            )}
          </View>

          <View style={styles.registerScreen.inputContainer}>
            <AppText style={styles.registerScreen.label}>
              {t("phoneNumber")} *
            </AppText>
            <TextInput
              style={[
                styles.registerScreen.input,
                errors.phoneNumber && styles.registerScreen.inputError,
              ]}
              value={formData.phoneNumber}
              onChangeText={(text) => handleInputChange("phoneNumber", text)}
              keyboardType="phone-pad"
              textAlign={language === "ar" ? "right" : "left"}
            />
            {errors.phoneNumber && (
              <AppText style={styles.registerScreen.errorText}>
                {errors.phoneNumber}
              </AppText>
            )}
          </View>

          <View style={styles.registerScreen.inputContainer}>
            <AppText style={styles.registerScreen.label}>
              {t("alternatePhone")}
            </AppText>
            <TextInput
              style={styles.registerScreen.input}
              value={formData.alternatePhone}
              onChangeText={(text) => handleInputChange("alternatePhone", text)}
              keyboardType="phone-pad"
              textAlign={language === "ar" ? "right" : "left"}
            />
          </View>

          <View style={styles.registerScreen.inputContainer}>
            <AppText style={styles.registerScreen.label}>
              {t("identificationNumber")}
            </AppText>
            <TextInput
              style={[
                styles.registerScreen.input,
                errors.identification && styles.registerScreen.inputError,
              ]}
              value={formData.nationalIdEgypt}
              onChangeText={(text) =>
                handleInputChange("nationalIdEgypt", text)
              }
              keyboardType="numeric"
              textAlign={language === "ar" ? "right" : "left"}
            />
          </View>

          <View style={styles.registerScreen.inputContainer}>
            <AppText style={styles.registerScreen.label}>
              {t("residenceIdAbroad")}
            </AppText>
            <TextInput
              style={[
                styles.registerScreen.input,
                errors.identification && styles.registerScreen.inputError,
              ]}
              value={formData.residenceIdAbroad}
              onChangeText={(text) =>
                handleInputChange("residenceIdAbroad", text)
              }
              textAlign={language === "ar" ? "right" : "left"}
            />
            {errors.identification && (
              <AppText style={styles.registerScreen.errorText}>
                {errors.identification}
              </AppText>
            )}
          </View>

          <View style={styles.registerScreen.buttonsContainer}>
            <PrimaryButton
              title={t("register")}
              onPress={handleSubmit}
              theme={theme}
            />
            <SecondaryButton
              title={t("cancel")}
              onPress={handleCancel}
              theme={theme}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeacherRegistrationScreen;
