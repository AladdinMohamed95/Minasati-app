import api from "@/api";
import {
  getTeacherClasses,
  getTeacherRegistrations,
  updateTeacherRegistrationPrice,
} from "@/api/teachersMiddlewate";
import { PrimaryButton } from "@/components/AppButton";
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "@/styles";
import {
  ClassItem,
  RegistrationItem,
  TeacherClassesResponse,
  TeacherRegistrationsResponse,
} from "@/types/api";
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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

// تعريف الأنواع
interface PendingRegistration {
  id: string;
  class_id: number;
  class_name: string;
  class_price: string;
}

interface MultiRegistrationRequest {
  registrations: {
    class_id: number;
    class_price: number;
  }[];
}

interface SingleRegistrationRequest {
  class_price: number;
}

export default function TeacherClassRegistrationScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // الحالات الأساسية
  const [availableClasses, setAvailableClasses] = useState<ClassItem[]>([]);
  const [teacherRegistrations, setTeacherRegistrations] = useState<
    RegistrationItem[]
  >([]);
  const [pendingRegistrations, setPendingRegistrations] = useState<
    PendingRegistration[]
  >([]);
  const [responseMessage, setResponseMessage] = useState<string>("");

  // حالات المودال
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedClassId, setSelectedClassId] = useState<number>(0);
  const [classPrice, setClassPrice] = useState<string>("");

  // حالات التحميل
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    fetchAvailableClasses();
    fetchTeacherRegistrations();
  }, []);

  // دوال جلب البيانات
  const fetchAvailableClasses = async () => {
    try {
      const response: TeacherClassesResponse = await getTeacherClasses();
      setAvailableClasses(response.data);
    } catch (error) {
      console.log("خطأ في جلب الفصول المتاحة:", error);
      setResponseMessage("خطأ في جلب الفصول المتاحة");
    }
  };

  const fetchTeacherRegistrations = async () => {
    try {
      const response: TeacherRegistrationsResponse =
        await getTeacherRegistrations();
      setTeacherRegistrations(response.data);
    } catch (error) {
      console.log("خطأ في جلب تسجيلات المدرس:", error);
      setResponseMessage("خطأ في جلب التسجيلات");
    }
  };

  // دالة إضافة مادة للقائمة المؤقتة
  const addToPendingRegistrations = () => {
    if (!selectedClassId || !classPrice) {
      Alert.alert("خطأ", "يرجى اختيار المادة وإدخال السعر");
      return;
    }

    const price = parseFloat(classPrice);
    if (isNaN(price) || price <= 0) {
      Alert.alert("خطأ", "يرجى إدخال سعر صحيح");
      return;
    }

    // التحقق من عدم تكرار المادة
    const isAlreadyAdded = pendingRegistrations.some(
      (reg) => reg.class_id === selectedClassId
    );

    if (isAlreadyAdded) {
      Alert.alert("تنبيه", "هذه المادة مضافة بالفعل");
      return;
    }

    const selectedClass = availableClasses.find(
      (cls) => cls.id === selectedClassId
    );

    const newRegistration: PendingRegistration = {
      id: Date.now().toString(),
      class_id: selectedClassId,
      class_name: selectedClass?.name || `مادة ${selectedClassId}`,
      class_price: classPrice,
    };

    setPendingRegistrations((prev) => [...prev, newRegistration]);

    // إعادة تعيين النموذج
    setSelectedClassId(0);
    setClassPrice("");
    setModalVisible(false);
  };

  // دالة حذف مادة من القائمة المؤقتة
  const removePendingRegistration = (id: string) => {
    setPendingRegistrations((prev) => prev.filter((reg) => reg.id !== id));
  };

  // دالة إرسال التسجيلات المتعددة
  const submitMultipleRegistrations = async () => {
    if (pendingRegistrations.length === 0) {
      Alert.alert("تنبيه", "يرجى إضافة مادة واحدة على الأقل");
      return;
    }

    setIsLoading(true);
    try {
      const registrations = pendingRegistrations.map((reg) => ({
        class_id: reg.class_id,
        class_price: parseFloat(reg.class_price),
      }));

      const requestData: MultiRegistrationRequest = { registrations };

      const response = await api.post("/teacher/classes/register", requestData);

      setResponseMessage("تم تسجيل المواد بنجاح");
      setPendingRegistrations([]);
      fetchTeacherRegistrations(); // إعادة جلب التسجيلات
    } catch (error: any) {
      setResponseMessage("فشل في تسجيل المواد: " + error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  // دالة تسجيل مادة واحدة مباشرة
  const submitSingleRegistration = async (classId: number, price: number) => {
    setIsLoading(true);
    try {
      const requestData: SingleRegistrationRequest = { class_price: price };

      const response = await api.post(
        `/teacher/classes/${classId}/register`,
        requestData
      );

      setResponseMessage("تم تسجيل المادة بنجاح");
      fetchTeacherRegistrations();
    } catch (error: any) {
      setResponseMessage("فشل في تسجيل المادة: " + error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  // دالة تحديث سعر التسجيل
  const handleUpdatePrice = async (registrationId: number) => {
    Alert.prompt(
      "تحديث السعر",
      "أدخل السعر الجديد:",
      [
        { text: "إلغاء", style: "cancel" },
        {
          text: "تحديث",
          onPress: async (newPrice) => {
            if (!newPrice) return;

            const price = parseFloat(newPrice);
            if (isNaN(price) || price <= 0) {
              Alert.alert("خطأ", "يرجى إدخال سعر صحيح");
              return;
            }

            try {
              await updateTeacherRegistrationPrice(registrationId, {
                class_price: price,
              });
              setResponseMessage("تم تحديث السعر بنجاح");
              fetchTeacherRegistrations();
            } catch (error) {
              setResponseMessage("فشل في تحديث السعر");
            }
          },
        },
      ],
      "plain-text"
    );
  };

  // عرض قائمة المواد المؤقتة
  const renderPendingRegistrations = () => (
    <View style={{ marginTop: 20 }}>
      <AppText style={{ fontSize: 18, marginBottom: 10 }}>
        المواد المضافة ({pendingRegistrations.length})
      </AppText>

      {pendingRegistrations.length === 0 ? (
        <View
          style={{
            paddingVertical: 20,
            backgroundColor: "#f9f9f9",
            borderRadius: 8,
          }}
        >
          <AppText style={{ textAlign: "center", color: "#888" }}>
            لم يتم إضافة أي مواد بعد
          </AppText>
        </View>
      ) : (
        <View>
          {pendingRegistrations.map((registration) => (
            <View
              key={registration.id}
              style={{
                flexDirection: "row",
                paddingVertical: 12,
                paddingHorizontal: 15,
                backgroundColor: "#f0f8ff",
                borderRadius: 8,
                marginBottom: 8,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#e0e0e0",
              }}
            >
              <AppText style={{ flex: 2 }}>{registration.class_name}</AppText>
              <AppText style={{ flex: 1, textAlign: "center" }}>
                {registration.class_price} ج.م
              </AppText>
              <TouchableOpacity
                style={{
                  backgroundColor: "#ff4444",
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 4,
                }}
                onPress={() => removePendingRegistration(registration.id)}
              >
                <AppText style={{ color: "white", fontSize: 12 }}>حذف</AppText>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={{
              backgroundColor: theme.background.primary || "#007bff",
              paddingVertical: 15,
              borderRadius: 8,
              marginTop: 10,
              opacity: isLoading ? 0.6 : 1,
            }}
            onPress={submitMultipleRegistrations}
            disabled={isLoading}
          >
            <AppText
              style={{ color: "white", textAlign: "center", fontSize: 16 }}
            >
              {isLoading
                ? "جاري التسجيل..."
                : `تسجيل ${pendingRegistrations.length} مواد`}
            </AppText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  // عرض جدول التسجيلات الحالية
  const renderCurrentRegistrations = () => (
    <View style={{ marginTop: 20 }}>
      <AppText style={{ fontSize: 18, marginBottom: 10 }}>
        المواد المسجلة ({teacherRegistrations.length})
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
        <AppText style={{ flex: 2, textAlign: "center" }}>المادة</AppText>
        <AppText style={{ flex: 1, textAlign: "center" }}>السعر</AppText>
        <AppText style={{ flex: 1, textAlign: "center" }}>الحالة</AppText>
        <AppText style={{ flex: 1, textAlign: "center" }}>إجراء</AppText>
      </View>

      {/* صفوف الجدول */}
      {teacherRegistrations.length === 0 ? (
        <View style={{ paddingVertical: 20 }}>
          <AppText style={{ textAlign: "center", color: "#888" }}>
            لا يوجد تسجيلات
          </AppText>
        </View>
      ) : (
        teacherRegistrations.map((registration) => (
          <View
            key={registration.registration_id}
            style={{
              flexDirection: "row",
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderColor: "#eee",
              alignItems: "center",
            }}
          >
            <AppText style={{ flex: 2, textAlign: "center", fontSize: 12 }}>
              {registration.class_name}
            </AppText>
            <AppText style={{ flex: 1, textAlign: "center" }}>
              {registration.class_price} ج.م
            </AppText>
            <AppText
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 10,
                color:
                  registration.registration_status === "active"
                    ? "green"
                    : "orange",
              }}
            >
              {registration.registration_status}
            </AppText>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#28a745",
                paddingVertical: 6,
                paddingHorizontal: 8,
                borderRadius: 4,
                marginHorizontal: 4,
              }}
              onPress={() => handleUpdatePrice(registration.registration_id)}
            >
              <AppText
                style={{ color: "white", textAlign: "center", fontSize: 10 }}
              >
                تحديث السعر
              </AppText>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  );

  // مودال إضافة مادة
  const renderAddClassModal = () => (
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
            maxHeight: height * 0.6,
          }}
        >
          <AppText
            style={{
              fontSize: 20,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            إضافة مادة جديدة
          </AppText>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* اختيار المادة */}
            <View style={{ marginBottom: 15 }}>
              <AppText style={{ marginBottom: 8 }}>اختر المادة:</AppText>
              <View
                style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8 }}
              >
                <Picker
                  selectedValue={selectedClassId}
                  onValueChange={(value) => setSelectedClassId(value)}
                  style={{ height: 50 }}
                >
                  <Picker.Item label="اختر المادة" value={0} />
                  {availableClasses.map((cls) => (
                    <Picker.Item key={cls.id} label={cls.name} value={cls.id} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* إدخال السعر */}
            <View style={{ marginBottom: 20 }}>
              <AppText style={{ marginBottom: 8 }}>السعر (ج.م):</AppText>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  backgroundColor: "#fff",
                }}
                placeholder="أدخل سعر المادة"
                value={classPrice}
                onChangeText={setClassPrice}
                keyboardType="numeric"
              />
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
                  setSelectedClassId(0);
                  setClassPrice("");
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
                }}
                onPress={addToPendingRegistrations}
              >
                <AppText
                  style={{
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  إضافة المادة
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
          {t("teacherClassRegistration") || "تسجيل المواد"}
        </AppText>
      </View>

      {/* زرار إضافة مادة */}
      <View style={styles.homeScreen.contactContainer}>
        <PrimaryButton
          title="إضافة مادة"
          onPress={() => setModalVisible(true)}
          theme={theme}
          textStyle={styles.whiteAndBlackText.whiteText}
        />
      </View>

      {/* رسالة الاستجابة */}
      {responseMessage !== "" && (
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
            {responseMessage}
          </AppText>
        </View>
      )}

      {/* محتوى الشاشة */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        {renderPendingRegistrations()}
        {renderCurrentRegistrations()}
      </ScrollView>

      {/* مودال إضافة مادة */}
      {renderAddClassModal()}
    </SafeAreaView>
  );
}
