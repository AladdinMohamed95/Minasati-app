import {
  getAcademicStages,
  getAcademicYears,
  getClasses,
  getEducationalSystems,
  getTeachers,
} from "@/api/public.api";
import { createBooking } from "@/api/studentsMiddleware.api";
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";
import {
  AcademicStage,
  AcademicYear,
  BookingRequest,
  ClassItem,
  EducationalSystem,
} from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import TeachersModal from "./TeacherModal";

const StudentBookingScreen = () => {
  const [systems, setSystems] = useState<EducationalSystem[]>([]);
  const [stages, setStages] = useState<AcademicStage[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);

  const [selectedSystem, setSelectedSystem] = useState<number | null>(null);
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<
    string | null
  >(null);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);

  const [attendanceMode, setAttendanceMode] = useState<
    "online" | "offline" | ""
  >("");

  const [bookingDate, setBookingDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [showTeachersModal, setShowTeachersModal] = useState(false);

  const [loading, setLoading] = useState({
    systems: false,
    stages: false,
    academicYears: false,
    classes: false,
    teachers: false,
    booking: false,
  });

  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user } = useUser();

  // Load systems on component mount
  useEffect(() => {
    loadSystems();
  }, []);

  // Load stages when systems changes
  useEffect(() => {
    if (selectedSystem) {
      loadStages();
    }
  }, [selectedSystem]);

  // Load academic years when stages changes
  useEffect(() => {
    if (selectedStage) {
      loadAcademicYears();
    }
  }, [selectedStage]);

  // Load classes when stage changes
  useEffect(() => {
    if (selectedAcademicYear) {
      loadClasses();
    }
  }, [selectedAcademicYear]);

  // Load teachers when class changes
  useEffect(() => {
    if (selectedClass) {
      loadTeachers();
    }
  }, [selectedClass]);

  const loadSystems = async () => {
    setLoading((prev) => ({ ...prev, systems: true }));
    try {
      const systems = await getEducationalSystems();
      setSystems(systems);
    } catch (error) {
    } finally {
      setLoading((prev) => ({ ...prev, systems: false }));
    }
  };

  const loadStages = async () => {
    setLoading((prev) => ({ ...prev, stages: true }));
    try {
      const stagesData = await getAcademicStages({
        educational_system_id: String(selectedSystem),
      });
      setStages(stagesData);
    } catch (error) {
    } finally {
      setLoading((prev) => ({ ...prev, stages: false }));
    }
  };

  const loadAcademicYears = async () => {
    setLoading((prev) => ({ ...prev, academicYears: true }));
    try {
      const academicYear = await getAcademicYears({
        academic_stage_id: String(selectedStage),
      });
      setAcademicYears(academicYear);
    } catch (error) {
    } finally {
      setLoading((prev) => ({ ...prev, academicYears: false }));
    }
  };

  const loadClasses = async () => {
    setLoading((prev) => ({ ...prev, classes: true }));
    try {
      const classesData = await getClasses({
        academic_year_id: String(selectedAcademicYear),
      });
      setClasses(classesData);
    } catch (error) {
    } finally {
      setLoading((prev) => ({ ...prev, classes: false }));
    }
  };

  const loadTeachers = async () => {
    setLoading((prev) => ({ ...prev, teachers: true }));
    try {
      const teachersData = await getTeachers({
        class_ids: String(selectedClass),
      });
      setTeachers(teachersData);
    } catch (error) {
    } finally {
      setLoading((prev) => ({ ...prev, teachers: false }));
    }
  };

  const handleTeacherSelect = (teacher: any) => {
    setSelectedTeacher(teacher.id);
    setShowTeachersModal(false);
    setAttendanceMode("");
  };

  const formatDateForMySQL = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBookingDate(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(bookingDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setBookingDate(newDate);
    }
  };

  const formatDateTime = (date: Date) => {
    return `${date.toLocaleDateString("ar-EG")} - ${date.toLocaleTimeString(
      "ar-EG",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )}`;
  };

  const selectedTeacherData = teachers.find((t) => t.id === selectedTeacher);

  const handleBooking = async () => {
    if (!user?.id) {
      Alert.alert("info", t("pleaseLogin"), [
        {
          text: "موافق",
          onPress: () => {
            router.push("/LoginScreen");
          },
        },
      ]);
      return;
    }

    if (!selectedTeacher || !selectedClass || !attendanceMode) {
      Alert.alert("خطأ", "يرجى اختيار جميع البيانات المطلوبة");
      return;
    }

    const selectedTeacherData = teachers.find((t) => t.id === selectedTeacher);
    if (!selectedTeacherData) return;

    if (
      attendanceMode === "online" &&
      !selectedTeacherData.availability.online
    ) {
      Alert.alert("خطأ", "هذا المعلم غير متاح للحصص الأونلاين");
      return;
    }

    if (
      attendanceMode === "offline" &&
      !selectedTeacherData.availability.offline
    ) {
      Alert.alert("خطأ", "هذا المعلم غير متاح للحصص الحضورية");
      return;
    }

    setLoading((prev) => ({ ...prev, booking: true }));

    try {
      const bookingData: BookingRequest = {
        teacher_id: selectedTeacher,
        class_id: selectedClass,
        booking_time: formatDateForMySQL(bookingDate),
        // Add attendance mode to booking data if API expects it
        // attendance_mode: attendanceMode,
      };

      console.log("Final Booking Data:", bookingData);

      await createBooking(bookingData);

      Alert.alert(
        "تم الحجز بنجاح",
        "تم حجز الحصة بنجاح. سيتم التواصل معك قريباً لتأكيد الموعد.",
        [
          {
            text: "موافق",
            onPress: () => {
              router.back();
              // Reset form or navigate back
              setSelectedStage(null);
              setSelectedClass(null);
              setSelectedTeacher(null);
              setAttendanceMode("");
              setBookingDate(new Date());
            },
          },
        ]
      );
    } catch (error: any) {
      console.log("Booking Error:", error);
      console.log("Error Response:", error?.response?.data);

      let errorMessage = "حدث خطأ أثناء الحجز. يرجى المحاولة مرة أخرى";

      // Handle specific error messages from API
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error?.response?.data?.errors) {
        // Handle validation errors
        const errors = error.response.data.errors;
        errorMessage = Object.values(errors).flat().join("\n");
      }

      Alert.alert("خطأ", errorMessage);
    } finally {
      setLoading((prev) => ({ ...prev, booking: false }));
    }
  };

  const isDisabled =
    !selectedTeacher ||
    !selectedClass ||
    !attendanceMode ||
    loading.booking ||
    !user?.id;

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
                حجز حصة دراسية
              </AppText>
            </View>
          </View>
        </LinearGradient>
        {/* System Selection */}
        <View style={styles.studentBookingViewStyles.inputContainer}>
          <AppText style={styles.studentBookingViewStyles.label}>
            {t("system")}
          </AppText>
          <View style={styles.studentBookingViewStyles.pickerContainer}>
            <Picker
              selectedValue={selectedSystem}
              onValueChange={setSelectedSystem}
              style={styles.studentBookingViewStyles.picker}
              enabled={!loading.systems}
            >
              <Picker.Item value={null} />
              {systems?.map((system) => (
                <Picker.Item
                  key={system.id}
                  label={system.name}
                  value={system.id}
                />
              ))}
            </Picker>
            {loading.systems && (
              <ActivityIndicator
                style={styles.studentBookingViewStyles.pickerLoader}
                size="small"
                color="#7C3AED"
              />
            )}
          </View>
        </View>
        {/* Stage Selection */}
        <View style={styles.studentBookingViewStyles.inputContainer}>
          <AppText style={styles.studentBookingViewStyles.label}>
            {t("stage")}
          </AppText>
          <View style={styles.studentBookingViewStyles.pickerContainer}>
            <Picker
              selectedValue={selectedStage}
              onValueChange={setSelectedStage}
              style={styles.studentBookingViewStyles.picker}
              enabled={!loading.stages && selectedSystem != null}
            >
              <Picker.Item value={null} />
              {stages.map((stage) => (
                <Picker.Item
                  key={stage.id}
                  label={stage.name}
                  value={stage.id}
                />
              ))}
            </Picker>
            {loading.stages && (
              <ActivityIndicator
                style={styles.studentBookingViewStyles.pickerLoader}
                size="small"
                color="#7C3AED"
              />
            )}
          </View>
        </View>
        {/* Academic Years Selection */}
        <View style={styles.studentBookingViewStyles.inputContainer}>
          <AppText style={styles.studentBookingViewStyles.label}>
            {t("class")}
          </AppText>
          <View style={styles.studentBookingViewStyles.pickerContainer}>
            <Picker
              selectedValue={selectedAcademicYear}
              onValueChange={setSelectedAcademicYear}
              style={styles.studentBookingViewStyles.picker}
              enabled={!loading.academicYears && selectedStage != null}
            >
              <Picker.Item label="اختر الصف الدراسي" value={null} />
              {academicYears.map((year) => (
                <Picker.Item key={year.id} label={year.name} value={year.id} />
              ))}
            </Picker>
            {loading.academicYears && (
              <ActivityIndicator
                style={styles.studentBookingViewStyles.pickerLoader}
                size="small"
                color="#7C3AED"
              />
            )}
          </View>
        </View>
        {/* Class Selection */}
        <View style={styles.studentBookingViewStyles.inputContainer}>
          <AppText style={styles.studentBookingViewStyles.label}>
            {t("classItem")}
          </AppText>
          <View style={styles.studentBookingViewStyles.pickerContainer}>
            <Picker
              selectedValue={selectedClass}
              onValueChange={setSelectedClass}
              style={styles.studentBookingViewStyles.picker}
              enabled={!loading.classes && selectedAcademicYear !== null}
            >
              <Picker.Item label="اختر المادة الدراسية" value={null} />
              {classes.map((cls) => (
                <Picker.Item key={cls.id} label={cls.name} value={cls.id} />
              ))}
            </Picker>
            {loading.classes && (
              <ActivityIndicator
                style={styles.studentBookingViewStyles.pickerLoader}
                size="small"
                color="#7C3AED"
              />
            )}
          </View>
        </View>
        {/* Teacher Selection Button */}
        {teachers.length > 0 && (
          <View style={styles.studentBookingViewStyles.inputContainer}>
            <AppText style={styles.studentBookingViewStyles.label}>
              {t("chooseTeacher")}
            </AppText>
            {loading.teachers ? (
              <ActivityIndicator
                size="large"
                color="#7C3AED"
                style={styles.studentBookingViewStyles.loader}
              />
            ) : (
              <TouchableOpacity
                style={styles.studentBookingViewStyles.selectTeacherButton}
                onPress={() => setShowTeachersModal(true)}
              >
                <View
                  style={styles.studentBookingViewStyles.selectTeacherContent}
                >
                  {selectedTeacherData ? (
                    <>
                      <Image
                        source={{ uri: selectedTeacherData.image_url }}
                        style={
                          styles.studentBookingViewStyles.selectedTeacherImage
                        }
                      />
                      <View
                        style={
                          styles.studentBookingViewStyles.selectedTeacherInfo
                        }
                      >
                        <AppText
                          style={
                            styles.studentBookingViewStyles.selectedTeacherName
                          }
                        >
                          {selectedTeacherData.name}
                        </AppText>
                        <AppText
                          style={
                            styles.studentBookingViewStyles
                              .selectedTeacherSpecialization
                          }
                        >
                          {selectedTeacherData.profile.specialization}
                        </AppText>
                      </View>
                    </>
                  ) : (
                    <AppText
                      style={styles.studentBookingViewStyles.selectTeacherText}
                    >
                      {t("chooseTeacher")}
                    </AppText>
                  )}
                  <Ionicons name="chevron-down" size={20} color="#7C3AED" />
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
        {/* Attendance Mode */}
        {selectedTeacher && selectedTeacherData && (
          <View style={styles.studentBookingViewStyles.inputContainer}>
            <AppText style={styles.studentBookingViewStyles.label}>
              طريقة الحضور
            </AppText>
            <View style={styles.studentBookingViewStyles.modeContainer}>
              {selectedTeacherData.availability.online && (
                <TouchableOpacity
                  style={[
                    styles.studentBookingViewStyles.modeButton,
                    attendanceMode === "online" &&
                      styles.studentBookingViewStyles.selectedModeButton,
                  ]}
                  onPress={() => setAttendanceMode("online")}
                >
                  <Ionicons
                    name="laptop-outline"
                    size={20}
                    color={attendanceMode === "online" ? "#FFF" : "#7C3AED"}
                  />
                  <AppText
                    style={[
                      styles.studentBookingViewStyles.modeText,
                      attendanceMode === "online" &&
                        styles.studentBookingViewStyles.selectedModeText,
                    ]}
                  >
                    {t("online")}
                  </AppText>
                </TouchableOpacity>
              )}
              {selectedTeacherData.availability.offline && (
                <TouchableOpacity
                  style={[
                    styles.studentBookingViewStyles.modeButton,
                    attendanceMode === "offline" &&
                      styles.studentBookingViewStyles.selectedModeButton,
                  ]}
                  onPress={() => setAttendanceMode("offline")}
                >
                  <Ionicons
                    name="school-outline"
                    size={20}
                    color={attendanceMode === "offline" ? "#FFF" : "#7C3AED"}
                  />
                  <AppText
                    style={[
                      styles.studentBookingViewStyles.modeText,
                      attendanceMode === "offline" &&
                        styles.studentBookingViewStyles.selectedModeText,
                    ]}
                  >
                    {t("offline")}
                  </AppText>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        {/* Date and Time Selection */}
        <View style={styles.studentBookingViewStyles.inputContainer}>
          <AppText style={styles.studentBookingViewStyles.label}>
            موعد الحصة
          </AppText>
          <TouchableOpacity
            style={styles.studentBookingViewStyles.dateTimeButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={20} color="#7C3AED" />
            <AppText style={styles.studentBookingViewStyles.dateTimeText}>
              {formatDateTime(bookingDate)}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.studentBookingViewStyles.dateTimeButton,
              { marginTop: 10 },
            ]}
            onPress={() => setShowTimePicker(true)}
          >
            <Ionicons name="time-outline" size={20} color="#7C3AED" />
            <AppText style={styles.studentBookingViewStyles.dateTimeText}>
              تغيير الوقت
            </AppText>
          </TouchableOpacity>
        </View>
        {/* Book Button */}

        <TouchableOpacity onPress={handleBooking} disabled={isDisabled}>
          {isDisabled ? (
            // زرار معطل
            <View
              style={[
                styles.studentBookingViewStyles.bookButton,
                {
                  backgroundColor: "#ccc", // لون باهت
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              {loading.booking ? (
                <ActivityIndicator color="#666" />
              ) : (
                <>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color="#666"
                    style={{ marginRight: 8 }}
                  />
                  <AppText
                    style={[
                      styles.studentBookingViewStyles.bookButtonText,
                      { color: "#666" },
                    ]}
                  >
                    {!user?.id ? t("pleaseLogin") : t("confirmBooking")}
                  </AppText>
                </>
              )}
            </View>
          ) : (
            // زرار شغال بالـgradient
            <LinearGradient
              colors={["#4F46E5", "#7C3AED"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.studentBookingViewStyles.bookButton,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              {loading.booking ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color="#FFF"
                    style={{ marginRight: 8 }}
                  />
                  <AppText
                    style={styles.studentBookingViewStyles.bookButtonText}
                  >
                    {!user?.id ? t("pleaseLogin") : t("confirmBooking")}
                  </AppText>
                </>
              )}
            </LinearGradient>
          )}
        </TouchableOpacity>
        {/* Date/Time Pickers */}
        {showDatePicker && (
          <DateTimePicker
            value={bookingDate}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={new Date()}
            style={{ backgroundColor: "#7C3AED" }}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={bookingDate}
            mode="time"
            display="default"
            onChange={onTimeChange}
            style={{ backgroundColor: "#7C3AED" }}
          />
        )}
      </ScrollView>

      {/* Teachers Modal */}
      <TeachersModal
        visible={showTeachersModal}
        onClose={() => setShowTeachersModal(false)}
        teachers={teachers}
        selectedTeacher={selectedTeacher}
        onSelect={handleTeacherSelect}
        styles={styles.studentBookingViewStyles}
        t={t}
      />
    </SafeAreaView>
  );
};

export default StudentBookingScreen;
