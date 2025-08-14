import { updateProfile } from "@/api/teachersMiddleware.api";
import { PrimaryButton } from "@/components/AppButton";
import AppText from "@/components/AppText";
import { LoadingView } from "@/components/LoadingView";
import { useTheme } from "@/context/ThemeContext";
import { useTranslationContext } from "@/context/TranslationContext";
import { useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";
import { TeacherProfileRequest } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const TeacherEditScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useTranslationContext();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { refreshUser } = useUser();

  const [formData, setFormData] = useState<TeacherProfileRequest>({
    name: "",
    password: "",
    password_confirmation: "",
    current_workplace: "",
    specialization: "",
    work_title: "",
    phone2: "",
    home_address: "",
    work_address: "",
    desc: "",
    years_of_experience: 0,
    national_id_egypt: "",
    residence_number_outside_egypt: "",
    is_online: false,
    is_offline: false,
    country: "",
    city: "",
    district: "",
    home_availability: false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof TeacherProfileRequest | "confirm_password", string>>
  >({});

  useEffect(() => {
    if (params.teacherData && !isInitialized) {
      try {
        const teacherData = JSON.parse(params.teacherData as string);

        setFormData({
          name: teacherData.name || "",
          password: "",
          password_confirmation: "",
          current_workplace: teacherData.profile?.workplace || "",
          specialization: teacherData.profile?.specialization || "",
          work_title: teacherData.profile?.title || "",
          phone2: teacherData.phone2 || "",
          home_address: teacherData.home_address || "",
          work_address: teacherData.work_address || "",
          desc: teacherData.profile?.description || "",
          years_of_experience: teacherData.profile?.experience_years || 0,
          national_id_egypt: teacherData.national_id_egypt || "",
          residence_number_outside_egypt:
            teacherData.residence_number_outside_egypt || "",
          is_online: teacherData.availability?.online || false,
          is_offline: teacherData.availability?.offline || false,
          country: teacherData.profile?.country || "",
          city: teacherData.profile?.city || "",
          district: teacherData.profile?.district || "",
          home_availability: teacherData.profile?.home_availability || false,
        });

        setIsInitialized(true);
      } catch (error) {
        console.error("Error parsing teacher data:", error);
        setIsInitialized(true);
      }
    } else {
      setIsInitialized(true);
    }
  }, [params.teacherData, isInitialized]);

  const handleInputChange = (
    field: keyof TeacherProfileRequest,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({
      ...prev,
      [field === "password_confirmation" ? "confirm_password" : field]:
        undefined,
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<
      Record<keyof TeacherProfileRequest | "confirm_password", string>
    > = {};

    if (formData.password?.trim()) {
      if (!formData.password_confirmation?.trim()) {
        newErrors.confirm_password = t("confirmPasswordRequiredError");
      } else if (formData.password !== formData.password_confirmation) {
        newErrors.confirm_password = t("passwordsDoNotMatchError");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return Alert.alert(t("dataError"), t("fixFields"));
    }

    setIsLoading(true);
    try {
      const submitData: Partial<TeacherProfileRequest> = {
        name: formData.name,
        current_workplace: formData.current_workplace,
        specialization: formData.specialization,
        country: formData.country,
        work_title: formData.work_title,
        phone2: formData.phone2,
        city: formData.city,
        district: formData.district,
        home_address: formData.home_address,
        work_address: formData.work_address,
        desc: formData.desc,
        years_of_experience: formData.years_of_experience
          ? formData.years_of_experience
          : 0,
        national_id_egypt: formData.national_id_egypt,
        residence_number_outside_egypt: formData.residence_number_outside_egypt,
        is_online: formData.is_online,
        is_offline: formData.is_offline,
        home_availability: formData.home_availability,
        ...(formData.password?.trim() && {
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        }),
      };

      await updateProfile(submitData as TeacherProfileRequest);
      await refreshUser();
      Alert.alert(t("updateSuccess"), t("teacherUpdatedSuccessfully"), [
        {
          text: t("ok"),
          onPress: () => {
            router.replace({
              pathname: "/",
              params: { refresh: "true" },
            });
          },
        },
      ]);
    } catch (error) {
      console.error("Error updating teacher:", error);
      Alert.alert(t("updateError"), t("updateFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <SafeAreaView style={styles.homeScreen.container}>
        <View style={styles.registerScreen.loading}>
          <LoadingView isLoading={true} />
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
            <AppText style={styles.homeScreen.welcomeText}>{t("edit")}</AppText>
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
          <AppText style={styles.registerScreen.label}>{t("phone2")}</AppText>
          <TextInput
            style={[
              styles.registerScreen.input,
              errors.phone2 && styles.registerScreen.inputError,
            ]}
            value={formData.phone2}
            onChangeText={(text) => handleInputChange("phone2", text)}
            keyboardType="phone-pad"
            textAlign={language === "ar" ? "right" : "left"}
            editable={!isLoading}
          />
          {errors.phone2 && (
            <AppText style={styles.registerScreen.errorText}>
              {errors.phone2}
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
            editable={!isLoading}
            placeholder={t("leaveEmptyToKeepCurrent")}
          />
          {errors.password && (
            <AppText style={styles.registerScreen.errorText}>
              {errors.password}
            </AppText>
          )}
        </View>

        <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>
            {t("password_confirmation")}
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
            editable={!isLoading}
          />
          {errors.specialization && (
            <AppText style={styles.registerScreen.errorText}>
              {errors.specialization}
            </AppText>
          )}
        </View>

        <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>
            {t("workTitle")} *
          </AppText>
          <TextInput
            style={[
              styles.registerScreen.input,
              errors.work_title && styles.registerScreen.inputError,
            ]}
            value={formData.work_title}
            onChangeText={(text) => handleInputChange("work_title", text)}
            textAlign={language === "ar" ? "right" : "left"}
            editable={!isLoading}
          />
          {errors.work_title && (
            <AppText style={styles.registerScreen.errorText}>
              {errors.work_title}
            </AppText>
          )}
        </View>

        <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>
            {t("currentWorkplace")}
          </AppText>
          <TextInput
            style={[
              styles.registerScreen.input,
              errors.current_workplace && styles.registerScreen.inputError,
            ]}
            value={formData.current_workplace}
            onChangeText={(text) =>
              handleInputChange("current_workplace", text)
            }
            textAlign={language === "ar" ? "right" : "left"}
            editable={!isLoading}
          />
          {errors.current_workplace && (
            <AppText style={styles.registerScreen.errorText}>
              {errors.current_workplace}
            </AppText>
          )}
        </View>

        <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>{t("city")}</AppText>
          <TextInput
            style={[
              styles.registerScreen.input,
              errors.city && styles.registerScreen.inputError,
            ]}
            value={formData.city}
            onChangeText={(text) => handleInputChange("city", text)}
            textAlign={language === "ar" ? "right" : "left"}
            editable={!isLoading}
          />
          {errors.city && (
            <AppText style={styles.registerScreen.errorText}>
              {errors.city}
            </AppText>
          )}
        </View>

        <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>{t("district")}</AppText>
          <TextInput
            style={[
              styles.registerScreen.input,
              errors.district && styles.registerScreen.inputError,
            ]}
            value={formData.district}
            onChangeText={(text) => handleInputChange("district", text)}
            textAlign={language === "ar" ? "right" : "left"}
            editable={!isLoading}
          />
          {errors.district && (
            <AppText style={styles.registerScreen.errorText}>
              {errors.district}
            </AppText>
          )}
        </View>

        <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>
            {t("yearsOfExperience")}
          </AppText>
          <TextInput
            style={[
              styles.registerScreen.input,
              errors.years_of_experience && styles.registerScreen.inputError,
            ]}
            value={String(formData.years_of_experience ?? "")}
            onChangeText={(text) =>
              handleInputChange("years_of_experience", text)
            }
            keyboardType="numeric"
            textAlign={language === "ar" ? "right" : "left"}
            editable={!isLoading}
          />
          {errors.years_of_experience && (
            <AppText style={styles.registerScreen.errorText}>
              {errors.years_of_experience}
            </AppText>
          )}
        </View>

        <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>
            {t("homeAddress")}
          </AppText>
          <TextInput
            style={[
              styles.registerScreen.input,
              errors.home_address && styles.registerScreen.inputError,
            ]}
            value={formData.home_address}
            onChangeText={(text) => handleInputChange("home_address", text)}
            textAlign={language === "ar" ? "right" : "left"}
            editable={!isLoading}
            multiline={true}
            numberOfLines={3}
          />
          {errors.home_address && (
            <AppText style={styles.registerScreen.errorText}>
              {errors.home_address}
            </AppText>
          )}
        </View>

        <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>
            {t("workAddress")}
          </AppText>
          <TextInput
            style={[
              styles.registerScreen.input,
              errors.work_address && styles.registerScreen.inputError,
            ]}
            value={formData.work_address}
            onChangeText={(text) => handleInputChange("work_address", text)}
            textAlign={language === "ar" ? "right" : "left"}
            editable={!isLoading}
            multiline={true}
            numberOfLines={3}
          />
          {errors.work_address && (
            <AppText style={styles.registerScreen.errorText}>
              {errors.work_address}
            </AppText>
          )}
        </View>

        <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>
            {t("description")}
          </AppText>
          <TextInput
            style={[
              styles.registerScreen.input,
              errors.desc && styles.registerScreen.inputError,
              { minHeight: 80 },
            ]}
            value={formData.desc}
            onChangeText={(text) => handleInputChange("desc", text)}
            textAlign={language === "ar" ? "right" : "left"}
            editable={!isLoading}
            multiline={true}
            numberOfLines={4}
          />
          {errors.desc && (
            <AppText style={styles.registerScreen.errorText}>
              {errors.desc}
            </AppText>
          )}
        </View>

        <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>
            {t("nationalIdEgypt")}
          </AppText>
          <TextInput
            style={[
              styles.registerScreen.input,
              errors.national_id_egypt && styles.registerScreen.inputError,
            ]}
            value={formData.national_id_egypt}
            onChangeText={(text) =>
              handleInputChange("national_id_egypt", text)
            }
            keyboardType="numeric"
            textAlign={language === "ar" ? "right" : "left"}
            editable={!isLoading}
          />
          {errors.national_id_egypt && (
            <AppText style={styles.registerScreen.errorText}>
              {errors.national_id_egypt}
            </AppText>
          )}
        </View>

        <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>
            {t("residenceNumberOutsideEgypt")}
          </AppText>
          <TextInput
            style={[
              styles.registerScreen.input,
              errors.residence_number_outside_egypt &&
                styles.registerScreen.inputError,
            ]}
            value={formData.residence_number_outside_egypt}
            onChangeText={(text) =>
              handleInputChange("residence_number_outside_egypt", text)
            }
            textAlign={language === "ar" ? "right" : "left"}
            editable={!isLoading}
          />
          {errors.residence_number_outside_egypt && (
            <AppText style={styles.registerScreen.errorText}>
              {errors.residence_number_outside_egypt}
            </AppText>
          )}
        </View>

        <View style={styles.homeScreen.signupContainer}>
          <AppText style={styles.registerScreen.label}>{t("online")}</AppText>
          <Switch
            value={formData.is_online}
            onValueChange={(value) => handleInputChange("is_online", value)}
            thumbColor={formData.is_online ? "#fff" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        <View style={styles.homeScreen.signupContainer}>
          <AppText style={styles.registerScreen.label}>{t("offline")}</AppText>
          <Switch
            value={formData.is_offline}
            onValueChange={(value) => handleInputChange("is_offline", value)}
            thumbColor={formData.is_offline ? "#fff" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        {formData.is_offline === true && (
          <View style={styles.homeScreen.signupContainer}>
            <AppText style={styles.registerScreen.label}>
              {t("homeAvaiability")}
            </AppText>
            <Switch
              value={formData.home_availability}
              onValueChange={(value) =>
                handleInputChange("home_availability", value)
              }
              thumbColor={formData.home_availability ? "#fff" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          </View>
        )}

        <View style={styles.registerScreen.buttonsContainer}>
          <PrimaryButton
            title={isLoading ? t("updating") : t("updateButton")}
            onPress={handleSubmit}
            theme={theme}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeacherEditScreen;
