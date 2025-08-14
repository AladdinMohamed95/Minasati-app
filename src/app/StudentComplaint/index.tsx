import { createComplaint, showComplaints } from "@/api/studentsMiddleware.api";
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { useTranslationContext } from "@/context/TranslationContext";
import { useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";
import { ComplaintRequest, ComplaintResponse } from "@/types/api";
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

const ComplaintScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { language } = useTranslationContext();
  const { user } = useUser();

  const [formData, setFormData] = useState<ComplaintRequest>({
    subject: "",
    message: "",
  });

  // const [teachers, setTeachers] = useState<Teacher[]>([]);
  // const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);
  const [loading, setLoading] = useState({
    // teacher: false,
    submitting: false,
    complaints: false,
  });
  const [complaints, setComplaints] = useState<ComplaintResponse[]>([]);

  // // Load teachers on component mount
  // useEffect(() => {
  //   loadTeacher();
  // }, []);

  useEffect(() => {
    loadComplaints();
  }, []);

  // const loadTeacher = async () => {
  //   setLoading((prev) => ({ ...prev, teacher: true }));
  //   try {
  //     const teachers = await getTeachers();
  //     setTeachers(teachers);
  //   } catch (error) {
  //     console.error("Error loading teachers:", error);
  //     Alert.alert(t("error"), t("failedToLoadTeachers"));
  //   } finally {
  //     setLoading((prev) => ({ ...prev, teacher: false }));
  //   }
  // };

  const loadComplaints = async () => {
    setLoading((prev) => ({ ...prev, complaints: true }));
    try {
      const complaints = await showComplaints();
      console.log("complaints " + JSON.stringify(complaints));
      setComplaints(complaints);
    } catch (error) {
      console.error("Error loading teachers:", error);
      Alert.alert(t("error"), t("failedToLoadComplaints"));
    } finally {
      setLoading((prev) => ({ ...prev, complaints: false }));
    }
  };

  const handleInputChange = (
    field: keyof ComplaintRequest,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleComplaint = async () => {
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
            setLoading({ submitting: false, complaints: false });
            // setSelectedTeacher(null);
            router.push("/LoginScreen");
          },
        },
      ]);
      return;
    }
    try {
      const response = await createComplaint({
        message: formData.message,
        subject: formData.subject,
      });

      if (response?.message) {
        Alert.alert(t("complaintSuccess"), t("complaintsSendSuccessfully"), [
          {
            text: t("ok"),
            onPress: () => {
              // Reset form after successful submission
              setFormData({
                subject: "",
                message: "",
              });
              // setSelectedTeacher(null);
            },
          },
        ]);
      } else {
        Alert.alert(t("error"), t("complaintSubmissionFailed"));
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      Alert.alert(t("error"), t("complaintSubmissionFailed"));
    } finally {
      setLoading((prev) => ({ ...prev, submitting: false, complaints: false }));
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
                {t("register")} {t("complaint")}
              </AppText>
            </View>
            <TouchableOpacity
              onPress={handleComplaint}
              disabled={isSubmitDisabled}
              style={[
                styles.homeScreen.iconBorder,
                isSubmitDisabled && { opacity: 0.5 },
              ]}
            >
              {loading.submitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Ionicons name="alert-circle-outline" size={30} color="#fff" />
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
            {t("complaintsList")}
          </AppText>
          <View style={{ backgroundColor: "#fff", padding: 5 }}>
            {loading.complaints ? (
              <ActivityIndicator size="large" color="#7C3AED" />
            ) : complaints.length === 0 ? (
              <AppText style={{ textAlign: "center", color: "#888" }}>
                {t("noComplaints")}
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
                  {complaints.map((complaint) => (
                    <View
                      key={complaint.id}
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
                        {complaint.subject}
                      </AppText>
                      <AppText
                        style={{
                          fontSize: 12,
                          width: 250,
                          textAlign: "center",
                        }}
                      >
                        {complaint.message}
                      </AppText>
                      <AppText
                        style={{
                          fontSize: 12,
                          width: 120,
                          textAlign: "center",
                          color: getStatusColor(complaint.status),
                        }}
                      >
                        {complaint.status}
                      </AppText>
                      <AppText
                        style={{
                          fontSize: 12,
                          width: 150,
                          textAlign: "center",
                        }}
                      >
                        {complaint.submitted_at?.split(" ")[0]}
                      </AppText>
                      <AppText
                        style={{
                          fontSize: 12,
                          width: 200,
                          textAlign: "center",
                        }}
                      >
                        {complaint.complaint_about_teacher
                          ? complaint.complaint_about_teacher.name
                          : "-"}
                      </AppText>
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
        {/* <View style={styles.registerScreen.inputContainer}>
          <AppText style={styles.registerScreen.label}>{t("teacher")}</AppText>
          <View style={styles.studentBookingViewStyles.pickerContainer}>
            <Picker
              selectedValue={selectedTeacher}
              onValueChange={setSelectedTeacher}
              style={[styles.studentBookingViewStyles.picker]}
              enabled={!loading.teacher}
            >
              <Picker.Item label={t("teacher")} value={null} />
              {teachers?.map((teacher) => (
                <Picker.Item
                  key={teacher.id}
                  label={teacher.name}
                  value={teacher.id}
                />
              ))}
            </Picker>
            {loading.teacher && (
              <ActivityIndicator
                style={styles.studentBookingViewStyles.pickerLoader}
                size="small"
                color="#7C3AED"
              />
            )}
          </View>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ComplaintScreen;
