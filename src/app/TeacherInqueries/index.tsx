import { createInquery, showInqueries } from "@/api/teachersMiddleware.api";
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { useTranslationContext } from "@/context/TranslationContext";
import { useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";
import { InqueryRequest, InqueryResponse } from "@/types/api";
import { getStatusColor } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const TeacherInqueryScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { language } = useTranslationContext();
  const { user } = useUser();

  const [formData, setFormData] = useState<InqueryRequest>({
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState({
    submitting: false,
    inqueries: false,
  });
  const [inqueries, setinqueries] = useState<InqueryResponse[]>([]);

  useEffect(() => {
    loadInqueries();
  }, []);

  const loadInqueries = async () => {
    setLoading((prev) => ({ ...prev, inqueries: true }));
    try {
      const inqueries = await showInqueries();
      console.log(" inqueries " + JSON.stringify(inqueries));
      setinqueries(inqueries);
    } catch (error) {
      console.error("Error loading teachers:", error);
    } finally {
      setLoading((prev) => ({ ...prev, inqueries: false }));
    }
  };

  const handleInputChange = (
    field: keyof InqueryRequest,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInquery = async () => {
    setLoading((prev) => ({ ...prev, submitting: true }));
    if (!user?.id) {
      Alert.alert(t("error"), t("pleaseLogin"), [
        {
          text: t("ok"),
          onPress: () => {
            setFormData({
              subject: "",
              message: "",
            });
            setLoading({ submitting: false, inqueries: false });
            router.push("/LoginScreen");
          },
        },
      ]);
      return;
    }
    try {
      const response = await createInquery({
        message: formData.message,
        subject: formData.subject,
      });

      if (response?.message) {
        Alert.alert(t(" inqueriesuccess"), t(" inqueriesSendSuccessfully"), [
          {
            text: t("ok"),
            onPress: () => {
              setFormData({
                subject: "",
                message: "",
              });
            },
          },
        ]);
      } else {
        Alert.alert(t("error"), t(" inqueriesubmissionFailed"));
      }
    } catch (error) {
      console.error("Error submitting  inquery:", error);
      Alert.alert(t("error"), t(" inqueriesubmissionFailed"));
    } finally {
      setLoading((prev) => ({ ...prev, submitting: false, inqueries: false }));
    }
  };

  const isSubmitDisabled =
    loading.submitting || !formData.subject.trim() || !formData.message.trim();
  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <ScrollView
        style={styles.studentBookingViewStyles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#4F46E5", "#7C3AED"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.homeScreen.headerGradient}
        >
          <View style={styles.homeScreen.headerContent}>
            <View>
              <AppText style={styles.homeScreen.welcomeText}>
                {t("inquery")}
              </AppText>
            </View>
            <TouchableOpacity
              onPress={handleInquery}
              disabled={isSubmitDisabled}
              style={[
                styles.homeScreen.iconBorder,
                isSubmitDisabled && { opacity: 0.5 },
              ]}
            >
              {loading.submitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Ionicons name="help-circle-outline" size={30} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>{t("subject")}</AppText>
          <TextInput
            style={[styles.registerScreen.input]}
            value={formData?.subject}
            onChangeText={(text) => handleInputChange("subject", text)}
            textAlign={language === "ar" ? "right" : "left"}
            multiline={true}
            numberOfLines={3}
            placeholder={t("enterSubject")}
            maxLength={200}
          />
        </View>

        <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>{t("message")}</AppText>
          <TextInput
            style={[styles.registerScreen.input, { minHeight: 80 }]}
            value={formData.message}
            onChangeText={(text) => handleInputChange("message", text)}
            textAlign={language === "ar" ? "right" : "left"}
            multiline={true}
            numberOfLines={4}
            placeholder={t("enterMessage")}
            maxLength={500}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 10,
          }}
        >
          <AppText style={{ fontSize: 18, marginBottom: 10 }}>
            {t("inqueriesList")}
          </AppText>
          <View style={{ backgroundColor: "#fff", padding: 5 }}>
            {loading.inqueries ? (
              <ActivityIndicator size="large" color="#7C3AED" />
            ) : inqueries.length === 0 ? (
              <AppText style={{ textAlign: "center", color: "#888" }}>
                {t("noInqueries")}
              </AppText>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  {/* رأس الجدول */}
                  <View
                    style={{
                      flexDirection: "row",
                      paddingVertical: 12,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 8,
                      minWidth: 900,
                      borderWidth: 1,
                      borderColor: "#aaa",
                    }}
                  >
                    <AppText
                      style={{ fontSize: 12, width: 150, textAlign: "center" }}
                    >
                      {t("subject")}
                    </AppText>
                    <AppText
                      style={{ fontSize: 12, width: 250, textAlign: "center" }}
                    >
                      {t("message")}
                    </AppText>
                    <AppText
                      style={{ fontSize: 12, width: 120, textAlign: "center" }}
                    >
                      {t("status")}
                    </AppText>
                    <AppText
                      style={{ fontSize: 12, width: 150, textAlign: "center" }}
                    >
                      {t("date")}
                    </AppText>
                    <AppText
                      style={{ fontSize: 12, width: 200, textAlign: "center" }}
                    >
                      {t("teacher")}
                    </AppText>
                  </View>

                  {/* صفوف الجدول */}
                  {inqueries.map((inquery) => (
                    <View
                      key={inquery.id}
                      style={{
                        flexDirection: "row",
                        paddingVertical: 12,
                        borderBottomWidth: 1,
                        borderColor: "#aaa",
                        alignItems: "center",
                        minWidth: 900,
                        backgroundColor: "#f0f8ff",
                      }}
                    >
                      <AppText
                        style={{
                          fontSize: 12,
                          width: 150,
                          textAlign: "center",
                        }}
                      >
                        {inquery.subject}
                      </AppText>
                      <AppText
                        style={{
                          fontSize: 12,
                          width: 250,
                          textAlign: "center",
                        }}
                      >
                        {inquery.message}
                      </AppText>
                      <AppText
                        style={{
                          fontSize: 12,
                          width: 120,
                          textAlign: "center",
                          color: getStatusColor(inquery.status),
                        }}
                      >
                        {inquery.status}
                      </AppText>
                      <AppText
                        style={{
                          fontSize: 12,
                          width: 150,
                          textAlign: "center",
                        }}
                      >
                        {inquery.submitted_at?.split(" ")[0]}
                      </AppText>
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeacherInqueryScreen;
