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
import {
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const StudentRegistrationScreen = () => {
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
      | "dateOfBirth"
      | "phoneNumber"
      | "parentPhone"
      | "email"
      | "address"
      | "educationLevel"
      | "school"
      | "nationalIdEgypt"
      | "residenceIdAbroad"
    >
  >({
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    parentPhone: "",
    email: "",
    address: "",
    educationLevel: "",
    school: "",
    nationalIdEgypt: "",
    residenceIdAbroad: "",
  });

  const [errors, setErrors] = useState<Partial<formDataProps>>({});

  const educationLevels = [
    "ابتدائي",
    "إعدادي",
    "ثانوي",
    "جامعي",
    "دراسات عليا",
  ];

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
    if (!formData.dateOfBirth.trim())
      newErrors.dateOfBirth = t("dateOfBirthError");
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = t("phoneNumberError");
    if (!formData.address.trim()) newErrors.address = t("homeAddressError");
    if (!formData.educationLevel.trim())
      newErrors.educationLevel = t("educationLevelError");

    // Email validation if provided
    if (formData.email.trim() && !formData.email.includes("@")) {
      newErrors.email = t("emailError");
    }

    // Either Egyptian national ID or abroad residence ID is required
    if (
      !formData.nationalIdEgypt.trim() &&
      !formData.residenceIdAbroad.trim()
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
        id: `student_${Date.now()}`,
        name: formData.fullName,
        type: "student",
        data: formData,
      });

      Alert.alert("نجح التسجيل", "تم تسجيل الطالب بنجاح", [
        { text: "موافق", onPress: () => router.push("/") },
      ]);
    } else {
      Alert.alert("خطأ في البيانات", "يرجى ملء جميع الحقول المطلوبة");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const EducationLevelPicker = () => (
    <View style={styles.otherViewStyle.pickerContainer}>
      {educationLevels.map((level, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.otherViewStyle.pickerOption,
            formData.educationLevel === level &&
              styles.otherViewStyle.pickerOptionSelected,
          ]}
          onPress={() => handleInputChange("educationLevel", level)}
        >
          <AppText
            style={[
              styles.otherViewStyle.pickerOptionText,
              formData.educationLevel === level &&
                styles.otherViewStyle.pickerOptionTextSelected,
            ]}
          >
            {level}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <ScrollView style={styles.registerScreen.scrollContainer}>
        <View style={styles.registerScreen.formContainer}>
          <AppText style={styles.registerScreen.title}>
            {t("studentRegisterationTitle")}
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
              {t("dateOfBirth")} *
            </AppText>
            <TextInput
              style={[
                styles.registerScreen.input,
                errors.dateOfBirth && styles.registerScreen.inputError,
              ]}
              value={formData.dateOfBirth}
              onChangeText={(text) => handleInputChange("dateOfBirth", text)}
              placeholder="dd/mm/yyyy"
              keyboardType="numeric"
              textAlign={language === "ar" ? "right" : "left"}
            />
            {errors.dateOfBirth && (
              <AppText style={styles.registerScreen.errorText}>
                {errors.dateOfBirth}
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
              {t("parentPhoneNumber")}
            </AppText>
            <TextInput
              style={styles.registerScreen.input}
              value={formData.parentPhone}
              onChangeText={(text) => handleInputChange("parentPhone", text)}
              keyboardType="phone-pad"
              textAlign={language === "ar" ? "right" : "left"}
            />
          </View>

          <View style={styles.registerScreen.inputContainer}>
            <AppText style={styles.registerScreen.label}>{t("email")}</AppText>
            <TextInput
              style={[
                styles.registerScreen.input,
                errors.email && styles.registerScreen.inputError,
              ]}
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              textAlign={language === "ar" ? "right" : "left"}
            />
            {errors.email && (
              <AppText style={styles.registerScreen.errorText}>
                {errors.email}
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
                errors.address && styles.registerScreen.inputError,
              ]}
              value={formData.address}
              onChangeText={(text) => handleInputChange("address", text)}
              multiline={true}
              numberOfLines={3}
              textAlign={language === "ar" ? "right" : "left"}
              textAlignVertical="top"
            />
            {errors.address && (
              <AppText style={styles.registerScreen.errorText}>
                {errors.address}
              </AppText>
            )}
          </View>

          <View style={styles.registerScreen.inputContainer}>
            <AppText style={styles.registerScreen.label}>
              {t("educationLevel")} *
            </AppText>
            <EducationLevelPicker />
            {errors.educationLevel && (
              <AppText style={styles.registerScreen.errorText}>
                {errors.educationLevel}
              </AppText>
            )}
          </View>

          <View style={styles.registerScreen.inputContainer}>
            <AppText style={styles.registerScreen.label}>
              {t("schoolName")}
            </AppText>
            <TextInput
              style={styles.registerScreen.input}
              value={formData.school}
              onChangeText={(text) => handleInputChange("school", text)}
              textAlign={language === "ar" ? "right" : "left"}
            />
          </View>

          <View style={styles.registerScreen.inputContainer}>
            <AppText style={styles.registerScreen.label}>
              {t("nationalIdEgypt")}
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
              title={t("registerButton")}
              onPress={handleSubmit}
              theme={theme}
            />
            <SecondaryButton
              title={t("cancleButton")}
              onPress={handleCancel}
              theme={theme}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentRegistrationScreen;
