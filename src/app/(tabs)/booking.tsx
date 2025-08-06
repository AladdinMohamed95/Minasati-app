import {
  createBooking,
  deleteBooking,
  getBookings,
  getTeachers,
} from "@/api/studentsMiddleware";
import { getTeacherClasses } from "@/api/teachersMiddlewate";
import { PrimaryButton } from "@/components/AppButton";
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "@/styles";
import { Booking } from "@/types/api";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

// تعريف الأنواع
interface Teacher {
  id: number;
  name: string;
  phone: string;
}

interface Class {
  id: number;
  name: string;
  teacher_id: number;
}

interface BookingForm {
  teacher_id: number;
  class_id: number;
  booking_time: string;
}

export default function BookingScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // الحالات الأساسية
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [bookingResponse, setBookingResponse] = useState<string>("");

  // حالات المودال
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    teacher_id: 0,
    class_id: 0,
    booking_time: "",
  });

  // حالات التحميل
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    fetchBookings();
    fetchTeachers();
    fetchClasses();
  }, []);

  // تصفية الفصول حسب المدرس المختار
  useEffect(() => {
    if (bookingForm.teacher_id > 0) {
      const filtered = classes.filter(
        (cls) => cls.teacher_id === bookingForm.teacher_id
      );
      setFilteredClasses(filtered);
      setBookingForm((prev) => ({ ...prev, class_id: 0 }));
    } else {
      setFilteredClasses([]);
    }
  }, [bookingForm.teacher_id, classes]);

  // دوال جلب البيانات
  const fetchBookings = async () => {
    try {
      const response = await getBookings();
      setBookings(response);
    } catch (error) {
      console.log("خطأ في جلب الحجوزات:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await getTeachers(1, "online");
      setTeachers(response);
    } catch (error) {
      console.log("خطأ في جلب المدرسين:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await getTeacherClasses();
      setClasses(response as any);
    } catch (error) {
      console.log("خطأ في جلب الفصول:", error);
    }
  };

  // دالة إنشاء حجز جديد
  const handleCreateBooking = async () => {
    if (
      !bookingForm.teacher_id ||
      !bookingForm.class_id ||
      !bookingForm.booking_time
    ) {
      Alert.alert("خطأ", "يرجى ملء جميع الحقول");
      return;
    }

    setIsLoading(true);
    try {
      const response = await createBooking(bookingForm);
      setBookingResponse("تم إنشاء الحجز بنجاح");
      setModalVisible(false);
      resetForm();
      fetchBookings(); // إعادة جلب الحجوزات
    } catch (error: any) {
      setBookingResponse("فشل في إنشاء الحجز: " + error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  // دالة حذف الحجز
  const handleDeleteBooking = async (bookingId: number) => {
    Alert.alert("تأكيد الحذف", "هل أنت متأكد من حذف هذا الحجز؟", [
      { text: "إلغاء", style: "cancel" },
      {
        text: "حذف",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteBooking(bookingId);
            setBookingResponse("تم حذف الحجز بنجاح");
            fetchBookings();
          } catch (error) {
            setBookingResponse("فشل في حذف الحجز");
          }
        },
      },
    ]);
  };

  // إعادة تعيين النموذج
  const resetForm = () => {
    setBookingForm({
      teacher_id: 0,
      class_id: 0,
      booking_time: "",
    });
  };

  // الحصول على اسم المدرس
  const getTeacherName = (teacherId: number) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    return teacher ? teacher.name : `المدرس ${teacherId}`;
  };

  // عرض جدول الحجوزات
  const renderBookingsTable = () => (
    <View style={{ marginTop: 20 }}>
      <AppText style={{ fontSize: 18, marginBottom: 10 }}>
        الحجوزات الحالية
      </AppText>

      {/* رأس الجدول */}
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 12,
          backgroundColor: "#f5f5f5",
          borderRadius: 8,
        }}
      >
        <AppText style={{ flex: 1, textAlign: "center" }}>ID</AppText>
        <AppText style={{ flex: 2, textAlign: "center" }}>المدرس</AppText>
        <AppText style={{ flex: 1, textAlign: "center" }}>الفصل</AppText>
        <AppText style={{ flex: 2, textAlign: "center" }}>الوقت</AppText>
        <AppText style={{ flex: 1, textAlign: "center" }}>إجراء</AppText>
      </View>

      {/* صفوف الجدول */}
      {bookings.length === 0 ? (
        <View style={{ paddingVertical: 20 }}>
          <AppText style={{ textAlign: "center", color: "#888" }}>
            لا يوجد حجوزات
          </AppText>
        </View>
      ) : (
        bookings.map((booking) => (
          <View
            key={booking.id}
            style={{
              flexDirection: "row",
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderColor: "#eee",
              alignItems: "center",
            }}
          >
            <AppText style={{ flex: 1, textAlign: "center" }}>
              {booking.id}
            </AppText>
            <AppText style={{ flex: 2, textAlign: "center" }}>
              {getTeacherName(booking.teacher_id)}
            </AppText>
            <AppText style={{ flex: 1, textAlign: "center" }}>
              {booking.class_id}
            </AppText>
            <AppText style={{ flex: 2, textAlign: "center", fontSize: 12 }}>
              {booking.booking_time}
            </AppText>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#ff4444",
                paddingVertical: 6,
                paddingHorizontal: 8,
                borderRadius: 4,
                marginHorizontal: 4,
              }}
              onPress={() => handleDeleteBooking(booking.id)}
            >
              <AppText
                style={{ color: "white", textAlign: "center", fontSize: 12 }}
              >
                حذف
              </AppText>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  );

  // مودال الحجز
  const renderBookingModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 15,
            padding: 20,
            width: width * 0.9,
            maxHeight: height * 0.8,
          }}
        >
          <AppText
            style={{
              fontSize: 20,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            حجز جديد
          </AppText>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* اختيار المدرس */}
            <View style={{ marginBottom: 15 }}>
              <AppText style={{ marginBottom: 8 }}>اختر المدرس:</AppText>
              <View
                style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8 }}
              >
                <Picker
                  selectedValue={bookingForm.teacher_id}
                  onValueChange={(value) =>
                    setBookingForm((prev) => ({ ...prev, teacher_id: value }))
                  }
                  style={{ height: 50 }}
                >
                  <Picker.Item label="اختر المدرس" value={0} />
                  {teachers.map((teacher) => (
                    <Picker.Item
                      key={teacher.id}
                      label={teacher.name}
                      value={teacher.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* اختيار الفصل */}
            <View style={{ marginBottom: 15 }}>
              <AppText style={{ marginBottom: 8 }}>اختر الفصل:</AppText>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  opacity: bookingForm.teacher_id === 0 ? 0.5 : 1,
                }}
              >
                <Picker
                  selectedValue={bookingForm.class_id}
                  onValueChange={(value) =>
                    setBookingForm((prev) => ({ ...prev, class_id: value }))
                  }
                  enabled={bookingForm.teacher_id !== 0}
                  style={{ height: 50 }}
                >
                  <Picker.Item label="اختر الفصل" value={0} />
                  {filteredClasses.map((cls) => (
                    <Picker.Item key={cls.id} label={cls.name} value={cls.id} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* اختيار الوقت */}
            <View style={{ marginBottom: 20 }}>
              <AppText style={{ marginBottom: 8 }}>وقت الحجز:</AppText>
              <View
                style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8 }}
              >
                <Picker
                  selectedValue={bookingForm.booking_time}
                  onValueChange={(value) =>
                    setBookingForm((prev) => ({ ...prev, booking_time: value }))
                  }
                  style={{ height: 50 }}
                >
                  <Picker.Item label="اختر الوقت" value="" />
                  <Picker.Item
                    label="اليوم 6:00 مساءً"
                    value="2025-08-06 18:00:00"
                  />
                  <Picker.Item
                    label="غداً 6:00 مساءً"
                    value="2025-08-07 18:00:00"
                  />
                  <Picker.Item
                    label="غداً 8:00 مساءً"
                    value="2025-08-07 20:00:00"
                  />
                  <Picker.Item
                    label="بعد غد 6:00 مساءً"
                    value="2025-08-08 18:00:00"
                  />
                </Picker>
              </View>
            </View>

            {/* أزرار التحكم */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#ccc",
                  paddingVertical: 12,
                  borderRadius: 8,
                  marginRight: 10,
                }}
                onPress={() => {
                  setModalVisible(false);
                  resetForm();
                }}
              >
                <AppText style={{ textAlign: "center" }}>إلغاء</AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: theme.background.primary || "#007bff",
                  paddingVertical: 12,
                  borderRadius: 8,
                  marginLeft: 10,
                  opacity: isLoading ? 0.6 : 1,
                }}
                onPress={handleCreateBooking}
                disabled={isLoading}
              >
                <AppText
                  style={{
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {isLoading ? "جاري الحجز..." : "تأكيد الحجز"}
                </AppText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.homeScreen.logoContainer}>
        <AppText style={styles.homeScreen.descriptionText}>
          {t("viewBookings")}
        </AppText>
      </View>

      {/* زرار احجز الآن */}
      <View style={styles.homeScreen.contactContainer}>
        <PrimaryButton
          title={t("booknow")}
          onPress={() => setModalVisible(true)}
          theme={theme}
          textStyle={styles.whiteAndBlackText.whiteText}
        />
      </View>

      {/* رسالة الاستجابة */}
      {bookingResponse !== "" && (
        <View style={{ marginHorizontal: 16, marginVertical: 10 }}>
          <AppText
            style={{
              textAlign: "center",
              padding: 10,
              backgroundColor: "#f0f8ff",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#007bff",
            }}
          >
            {bookingResponse}
          </AppText>
        </View>
      )}

      {/* محتوى الشاشة */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        {renderBookingsTable()}
      </ScrollView>

      {/* مودال الحجز */}
      {renderBookingModal()}
    </SafeAreaView>
  );
}
