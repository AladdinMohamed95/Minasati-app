// import {
//   getTeacherClasses,
//   getTeacherRegistrations,
//   TeacherMultipleRegistrations,
//   TeacherSingleRegistration,
//   updateTeacherRegistrationPrice,
// } from "@/api/teachersMiddleware.api";
// import { PrimaryButton } from "@/components/AppButton";
// import AppText from "@/components/AppText";
// import { useTheme } from "@/context/ThemeContext";
// import { createStyles } from "@/styles";
// import {
//   ClassItem,
//   MultiRegistrationRequest,
//   PendingRegistration,
//   RegistrationItem,
//   SingleRegistrationRequest,
//   TeacherClassesResponse,
//   TeacherRegistrationsResponse,
// } from "@/types/api";
// import { Picker } from "@react-native-picker/picker";
// import React, { useEffect, useMemo, useState } from "react";
// import { useTranslation } from "react-i18next";
// import {
//   Alert,
//   Dimensions,
//   Modal,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const { width, height } = Dimensions.get("window");

// export default function TeacherBookingScreen() {
//   const { t } = useTranslation();
//   const { theme } = useTheme();
//   const styles = createStyles(theme);

//   const [availableClasses, setAvailableClasses] = useState<ClassItem[]>([]);
//   const [teacherRegistrations, setTeacherRegistrations] = useState<
//     RegistrationItem[]
//   >([]);
//   const [pendingRegistrations, setPendingRegistrations] = useState<
//     PendingRegistration[]
//   >([]);
//   const [responseMessage, setResponseMessage] = useState<string>("");

//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [selectedClassId, setSelectedClassId] = useState<number>(0);
//   const [classPrice, setClassPrice] = useState<string>("");

//   // حالات التحميل
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   // جلب البيانات عند تحميل الصفحة
//   useEffect(() => {
//     fetchAvailableClasses();
//     fetchTeacherRegistrations();
//   }, []);

//   // دوال جلب البيانات
//   const fetchAvailableClasses = async () => {
//     try {
//       const response: TeacherClassesResponse = await getTeacherClasses();
//       setAvailableClasses(response.data);
//     } catch (error) {
//       console.log("خطأ في جلب الفصول المتاحة:", error);
//       setResponseMessage("خطأ في جلب الفصول المتاحة");
//     }
//   };

//   const fetchTeacherRegistrations = async () => {
//     try {
//       const response: TeacherRegistrationsResponse =
//         await getTeacherRegistrations();
//       setTeacherRegistrations(response.data);
//     } catch (error) {
//       console.log("خطأ في جلب تسجيلات المدرس:", error);
//       setResponseMessage("خطأ في جلب التسجيلات");
//     }
//   };

//   // دالة إضافة مادة للقائمة المؤقتة
//   const addToPendingRegistrations = () => {
//     if (!selectedClassId || !classPrice) {
//       Alert.alert("خطأ", "يرجى اختيار المادة وإدخال السعر");
//       return;
//     }

//     const price = parseFloat(classPrice);
//     if (isNaN(price) || price <= 0) {
//       Alert.alert("خطأ", "يرجى إدخال سعر صحيح");
//       return;
//     }

//     // التحقق من عدم تكرار المادة
//     const isAlreadyAdded = pendingRegistrations.some(
//       (reg) => reg.class_id === selectedClassId
//     );

//     if (isAlreadyAdded) {
//       Alert.alert("تنبيه", "هذه المادة مضافة بالفعل");
//       return;
//     }

//     const selectedClass = availableClasses.find(
//       (cls) => cls.id === selectedClassId
//     );

//     const newRegistration: PendingRegistration = {
//       id: Date.now().toString(),
//       class_id: selectedClassId,
//       class_name: selectedClass?.name || `مادة ${selectedClassId}`,
//       class_price: classPrice,
//     };

//     setPendingRegistrations((prev) => [...prev, newRegistration]);

//     // إعادة تعيين النموذج
//     setSelectedClassId(0);
//     setClassPrice("");
//     setModalVisible(false);
//   };

//   // دالة حذف مادة من القائمة المؤقتة
//   const removePendingRegistration = (id: string) => {
//     setPendingRegistrations((prev) => prev.filter((reg) => reg.id !== id));
//   };

//   // دالة إرسال التسجيلات المتعددة
//   const submitMultipleRegistrations = async () => {
//     if (pendingRegistrations.length === 0) {
//       Alert.alert("تنبيه", "يرجى إضافة مادة واحدة على الأقل");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const registrations = pendingRegistrations.map((reg) => ({
//         class_id: reg.class_id,
//         class_price: parseFloat(reg.class_price),
//       }));

//       const requestData: MultiRegistrationRequest = { registrations };

//       const response = await TeacherMultipleRegistrations(requestData);

//       setResponseMessage("تم تسجيل المواد بنجاح");
//       setPendingRegistrations([]);
//       fetchTeacherRegistrations(); // إعادة جلب التسجيلات
//     } catch (error: any) {
//       setResponseMessage("فشل في تسجيل المواد: " + error.toString());
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const submitSingleRegistration = async (classId: number, price: number) => {
//     setIsLoading(true);
//     try {
//       const requestData: SingleRegistrationRequest = { class_price: price };

//       const response = await TeacherSingleRegistration(requestData, classId);

//       setResponseMessage("تم تسجيل المادة بنجاح");
//       fetchTeacherRegistrations();
//     } catch (error: any) {
//       setResponseMessage("فشل في تسجيل المادة: " + error.toString());
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // دالة تحديث سعر التسجيل
//   const handleUpdatePrice = async (registrationId: number) => {
//     Alert.prompt(
//       "تحديث السعر",
//       "أدخل السعر الجديد:",
//       [
//         { text: "إلغاء", style: "cancel" },
//         {
//           text: "تحديث",
//           onPress: async (newPrice) => {
//             if (!newPrice) return;

//             const price = parseFloat(newPrice);
//             if (isNaN(price) || price <= 0) {
//               Alert.alert("خطأ", "يرجى إدخال سعر صحيح");
//               return;
//             }

//             try {
//               await updateTeacherRegistrationPrice(registrationId, {
//                 class_price: price,
//               });
//               setResponseMessage("تم تحديث السعر بنجاح");
//               fetchTeacherRegistrations();
//             } catch (error) {
//               setResponseMessage("فشل في تحديث السعر");
//             }
//           },
//         },
//       ],
//       "plain-text"
//     );
//   };

//   // عرض قائمة المواد المؤقتة
//   const renderPendingRegistrations = useMemo(
//     () => (
//       <View style={{ marginTop: 20 }}>
//         <AppText style={{ fontSize: 18, marginBottom: 10 }}>
//           المواد المضافة ({pendingRegistrations.length})
//         </AppText>

//         {pendingRegistrations.length === 0 ? (
//           <View
//             style={{
//               paddingVertical: 20,
//               backgroundColor: "#f9f9f9",
//               borderRadius: 8,
//             }}
//           >
//             <AppText style={{ textAlign: "center", color: "#888" }}>
//               لم يتم إضافة أي مواد بعد
//             </AppText>
//           </View>
//         ) : (
//           <View>
//             {pendingRegistrations.map((registration) => (
//               <View
//                 key={registration.id}
//                 style={{
//                   flexDirection: "row",
//                   paddingVertical: 12,
//                   paddingHorizontal: 15,
//                   backgroundColor: "#f0f8ff",
//                   borderRadius: 8,
//                   marginBottom: 8,
//                   alignItems: "center",
//                   borderWidth: 1,
//                   borderColor: "#e0e0e0",
//                 }}
//               >
//                 <AppText style={{ flex: 2 }}>{registration.class_name}</AppText>
//                 <AppText style={{ flex: 1, textAlign: "center" }}>
//                   {registration.class_price} ج.م
//                 </AppText>
//                 <TouchableOpacity
//                   style={{
//                     backgroundColor: "#ff4444",
//                     paddingVertical: 6,
//                     paddingHorizontal: 12,
//                     borderRadius: 4,
//                   }}
//                   onPress={() => removePendingRegistration(registration.id)}
//                 >
//                   <AppText style={{ color: "white", fontSize: 12 }}>
//                     حذف
//                   </AppText>
//                 </TouchableOpacity>
//               </View>
//             ))}

//             <TouchableOpacity
//               style={{
//                 backgroundColor: theme.background.primary || "#007bff",
//                 paddingVertical: 15,
//                 borderRadius: 8,
//                 marginTop: 10,
//                 opacity: isLoading ? 0.6 : 1,
//               }}
//               onPress={submitMultipleRegistrations}
//               disabled={isLoading}
//             >
//               <AppText
//                 style={{ color: "white", textAlign: "center", fontSize: 16 }}
//               >
//                 {isLoading
//                   ? "جاري التسجيل..."
//                   : `تسجيل ${pendingRegistrations.length} مواد`}
//               </AppText>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     ),
//     []
//   );

//   // عرض جدول التسجيلات الحالية
//   const renderCurrentRegistrations = useMemo(
//     () => (
//       <View style={{ marginTop: 20 }}>
//         <AppText style={{ fontSize: 18, marginBottom: 10 }}>
//           المواد المسجلة ({teacherRegistrations.length})
//         </AppText>

//         {/* رأس الجدول */}
//         <View
//           style={{
//             flexDirection: "row",
//             paddingVertical: 12,
//             backgroundColor: "#f5f5f5",
//             borderRadius: 8,
//           }}
//         >
//           <AppText style={{ flex: 2, textAlign: "center" }}>المادة</AppText>
//           <AppText style={{ flex: 1, textAlign: "center" }}>السعر</AppText>
//           <AppText style={{ flex: 1, textAlign: "center" }}>الحالة</AppText>
//           <AppText style={{ flex: 1, textAlign: "center" }}>إجراء</AppText>
//         </View>

//         {/* صفوف الجدول */}
//         {teacherRegistrations.length === 0 ? (
//           <View style={{ paddingVertical: 20 }}>
//             <AppText style={{ textAlign: "center", color: "#888" }}>
//               لا يوجد تسجيلات
//             </AppText>
//           </View>
//         ) : (
//           teacherRegistrations.map((registration) => (
//             <View
//               key={registration.registration_id}
//               style={{
//                 flexDirection: "row",
//                 paddingVertical: 12,
//                 borderBottomWidth: 1,
//                 borderColor: "#eee",
//                 alignItems: "center",
//               }}
//             >
//               <AppText style={{ flex: 2, textAlign: "center", fontSize: 12 }}>
//                 {registration.class_name}
//               </AppText>
//               <AppText style={{ flex: 1, textAlign: "center" }}>
//                 {registration.class_price} ج.م
//               </AppText>
//               <AppText
//                 style={{
//                   flex: 1,
//                   textAlign: "center",
//                   fontSize: 10,
//                   color:
//                     registration.registration_status === "active"
//                       ? "green"
//                       : "orange",
//                 }}
//               >
//                 {registration.registration_status}
//               </AppText>
//               <TouchableOpacity
//                 style={{
//                   flex: 1,
//                   backgroundColor: "#28a745",
//                   paddingVertical: 6,
//                   paddingHorizontal: 8,
//                   borderRadius: 4,
//                   marginHorizontal: 4,
//                 }}
//                 onPress={() => handleUpdatePrice(registration.registration_id)}
//               >
//                 <AppText
//                   style={{ color: "white", textAlign: "center", fontSize: 10 }}
//                 >
//                   تحديث السعر
//                 </AppText>
//               </TouchableOpacity>
//             </View>
//           ))
//         )}
//       </View>
//     ),
//     []
//   );

//   // مودال إضافة مادة
//   const renderAddClassModal = useMemo(
//     () => (
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <View
//             style={{
//               backgroundColor: "white",
//               borderRadius: 15,
//               padding: 20,
//               width: width * 0.9,
//               maxHeight: height * 0.6,
//             }}
//           >
//             <AppText
//               style={{
//                 fontSize: 20,
//                 textAlign: "center",
//                 marginBottom: 20,
//               }}
//             >
//               إضافة مادة جديدة
//             </AppText>

//             <ScrollView showsVerticalScrollIndicator={false}>
//               {/* اختيار المادة */}
//               <View style={{ marginBottom: 15 }}>
//                 <AppText style={{ marginBottom: 8 }}>اختر المادة:</AppText>
//                 <View
//                   style={{
//                     borderWidth: 1,
//                     borderColor: "#ccc",
//                     borderRadius: 8,
//                   }}
//                 >
//                   <Picker
//                     selectedValue={selectedClassId}
//                     onValueChange={(value) => setSelectedClassId(value)}
//                     style={{ height: 50 }}
//                   >
//                     <Picker.Item label="اختر المادة" value={0} />
//                     {availableClasses.map((cls) => (
//                       <Picker.Item
//                         key={cls.id}
//                         label={cls.name}
//                         value={cls.id}
//                       />
//                     ))}
//                   </Picker>
//                 </View>
//               </View>

//               {/* إدخال السعر */}
//               <View style={{ marginBottom: 20 }}>
//                 <AppText style={{ marginBottom: 8 }}>السعر (ج.م):</AppText>
//                 <TextInput
//                   style={{
//                     borderWidth: 1,
//                     borderColor: "#ccc",
//                     borderRadius: 8,
//                     padding: 12,
//                     fontSize: 16,
//                     backgroundColor: "#fff",
//                   }}
//                   placeholder="أدخل سعر المادة"
//                   value={classPrice}
//                   onChangeText={setClassPrice}
//                   keyboardType="numeric"
//                 />
//               </View>

//               {/* أزرار التحكم */}
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <TouchableOpacity
//                   style={{
//                     flex: 1,
//                     backgroundColor: "#ccc",
//                     paddingVertical: 12,
//                     borderRadius: 8,
//                     marginRight: 10,
//                   }}
//                   onPress={() => {
//                     setModalVisible(false);
//                     setSelectedClassId(0);
//                     setClassPrice("");
//                   }}
//                 >
//                   <AppText style={{ textAlign: "center" }}>إلغاء</AppText>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={{
//                     flex: 1,
//                     backgroundColor: theme.background.primary || "#007bff",
//                     paddingVertical: 12,
//                     borderRadius: 8,
//                     marginLeft: 10,
//                   }}
//                   onPress={addToPendingRegistrations}
//                 >
//                   <AppText
//                     style={{
//                       textAlign: "center",
//                       color: "white",
//                     }}
//                   >
//                     إضافة المادة
//                   </AppText>
//                 </TouchableOpacity>
//               </View>
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     ),
//     []
//   );

//   return (
//     <SafeAreaView style={styles.homeScreen.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//       <View style={styles.homeScreen.logoContainer}>
//         <AppText style={styles.homeScreen.descriptionText}>
//           {t("teacherClassRegistration") || "تسجيل المواد"}
//         </AppText>
//       </View>

//       {/* زرار إضافة مادة */}
//       <View style={styles.homeScreen.contactContainer}>
//         <PrimaryButton
//           title="إضافة مادة"
//           onPress={() => setModalVisible(true)}
//           theme={theme}
//           textStyle={styles.whiteAndBlackText.whiteText}
//         />
//       </View>

//       {/* رسالة الاستجابة */}
//       {responseMessage !== "" && (
//         <View style={{ marginHorizontal: 16, marginVertical: 10 }}>
//           <AppText
//             style={{
//               textAlign: "center",
//               padding: 10,
//               backgroundColor: "#f0f8ff",
//               borderRadius: 8,
//               borderWidth: 1,
//               borderColor: "#007bff",
//             }}
//           >
//             {responseMessage}
//           </AppText>
//         </View>
//       )}

//       {/* محتوى الشاشة */}
//       <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
//         {renderPendingRegistrations}
//         {renderCurrentRegistrations}
//       </ScrollView>

//       {/* مودال إضافة مادة */}
//       {renderAddClassModal}
//     </SafeAreaView>
//   );
// }

import {
  getTeacherRegistrations,
  TeacherMultipleRegistrations,
  updateTeacherRegistrationPrice,
} from "@/api/teachersMiddleware.api";
import { PrimaryButton } from "@/components/AppButton";
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "@/styles";
import { getFontWeight } from "@/theme";
import { PendingRegistration, RegistrationItem } from "@/types/api";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import ClassModal from "../modals/classModal";

export default function TeacherBookingScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [pendingClasses, setPendingClasses] = useState<PendingRegistration[]>(
    []
  );

  // حالات UI
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // نموذج إضافة/تحديث
  const [classNameInput, setClassNameInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [editingRegId, setEditingRegId] = useState<number | null>(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response = await getTeacherRegistrations();
      setRegistrations(response.data || []);
    } catch (error: any) {
      showMessage("خطأ في جلب البيانات: " + (error?.message || error), true);
    }
    setLoading(false);
  };

  const showMessage = (text: string, isError = false) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  const isDuplicateClass = (className: string) => {
    const normalizedName = className.trim().toLowerCase();
    return (
      registrations.some(
        (reg) => reg.class_name?.toLowerCase() === normalizedName
      ) ||
      pendingClasses.some(
        (pending) => pending.class_name.toLowerCase() === normalizedName
      )
    );
  };

  const addPendingClass = () => {
    const className = classNameInput.trim();
    const price = parseFloat(priceInput.trim());

    // التحقق من صحة البيانات
    if (!className) {
      showMessage("يرجى كتابة اسم المادة", true);
      return;
    }

    if (!priceInput.trim()) {
      showMessage("يرجى إدخال السعر", true);
      return;
    }

    if (isNaN(price) || price <= 0) {
      showMessage("يرجى إدخال سعر صحيح أكبر من صفر", true);
      return;
    }

    // التحقق من التكرار
    if (isDuplicateClass(className)) {
      showMessage("هذه المادة موجودة بالفعل", true);
      return;
    }

    const newPending: PendingRegistration = {
      id: Date.now().toString(),
      class_id: Date.now(), // استخدام timestamp كـ ID مؤقت
      class_name: className,
      class_price: price.toString(),
      academic_year: "",
      academic_stage: "",
    };

    setPendingClasses([...pendingClasses, newPending]);
    resetModal();
    showMessage(`تم إضافة "${className}" للقائمة`);
  };

  // حذف من القائمة المؤقتة
  const removePending = (id: string) => {
    const item = pendingClasses.find((p) => p.id === id);
    setPendingClasses(pendingClasses.filter((p) => p.id !== id));
    if (item) {
      showMessage(`تم حذف "${item.class_name}" من القائمة`);
    }
  };

  // تسجيل المواد
  const submitRegistrations = () => {
    if (pendingClasses.length === 0) {
      showMessage("لا توجد مواد للتسجيل", true);
      return;
    }

    Alert.alert(
      "تأكيد التسجيل",
      `هل أنت متأكد من تسجيل ${pendingClasses.length} مادة؟`,
      [
        { text: "إلغاء", style: "cancel" },
        { text: "تأكيد", onPress: processRegistrations },
      ]
    );
  };

  const processRegistrations = async () => {
    setLoading(true);
    try {
      const registrations = pendingClasses.map((p) => ({
        class_id: p.class_id,
        class_name: p.class_name, // إرسال اسم المادة الجديدة
        class_price: parseFloat(p.class_price),
      }));

      await TeacherMultipleRegistrations({ registrations });
      setPendingClasses([]);
      showMessage(`تم تسجيل ${registrations.length} مادة بنجاح`);
      fetchRegistrations();
    } catch (error: any) {
      showMessage("فشل في التسجيل: " + (error?.message || error), true);
    }
    setLoading(false);
  };

  // تحديث السعر
  const updatePrice = async () => {
    const price = parseFloat(priceInput.trim());

    if (!priceInput.trim()) {
      showMessage("يرجى إدخال السعر", true);
      return;
    }

    if (isNaN(price) || price <= 0) {
      showMessage("يرجى إدخال سعر صحيح أكبر من صفر", true);
      return;
    }

    setLoading(true);
    try {
      await updateTeacherRegistrationPrice(editingRegId!, {
        class_price: price,
      });
      showMessage("تم تحديث السعر بنجاح");
      fetchRegistrations();
      resetModal();
    } catch (error: any) {
      showMessage("فشل في التحديث: " + (error?.message || error), true);
    }
    setLoading(false);
  };

  // إعادة تعيين المودال
  const resetModal = () => {
    setShowModal(false);
    setClassNameInput("");
    setPriceInput("");
    setEditingRegId(null);
  };

  // فتح مودال التحديث
  const openUpdateModal = (regId: number, currentPrice: string) => {
    setEditingRegId(regId);
    setPriceInput(currentPrice);
    setShowModal(true);
  };

  // فتح مودال الإضافة
  const openAddModal = () => {
    setEditingRegId(null);
    setClassNameInput("");
    setPriceInput("");
    setShowModal(true);
  };

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* العنوان */}
      <View style={styles.homeScreen.contactContainer}>
        <AppText style={styles.homeScreen.descriptionText}>
          {t("teacherClassRegistration")}
        </AppText>
      </View>

      <View style={styles.homeScreen.contactContainer}>
        <PrimaryButton
          title="إضافة مادة جديدة"
          onPress={openAddModal}
          theme={theme}
          textStyle={styles.whiteAndBlackText.whiteText}
        />
      </View>

      {message && (
        <View style={{ margin: 16 }}>
          <AppText
            style={{
              textAlign: "center",
              padding: 15,
              backgroundColor:
                message.includes("فشل") || message.includes("خطأ")
                  ? "#f8d7da"
                  : "#d1ecf1",
              borderRadius: 8,
              color:
                message.includes("فشل") || message.includes("خطأ")
                  ? "#721c24"
                  : "#0c5460",
              fontSize: 14,
            }}
          >
            {message}
          </AppText>
        </View>
      )}

      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 20 }}>
          <AppText
            style={{
              fontSize: 18,
              fontWeight: getFontWeight(theme.fontWeight.bold),
              marginBottom: 10,
            }}
          >
            المواد المضافة ({pendingClasses.length})
          </AppText>

          {pendingClasses.length === 0 ? (
            <View style={styles.teacherRegisterationStyles.emptyContainer}>
              <AppText style={{ textAlign: "center", color: "#888" }}>
                لم يتم إضافة أي مواد بعد
              </AppText>
            </View>
          ) : (
            <>
              {pendingClasses.map((item) => (
                <View
                  key={item.id}
                  style={styles.teacherRegisterationStyles.pendingItemStyle}
                >
                  <View style={{ flex: 1 }}>
                    <AppText
                      style={{
                        fontWeight: getFontWeight(theme.fontWeight.bold),
                        fontSize: 16,
                      }}
                    >
                      {item.class_name}
                    </AppText>
                    <AppText
                      style={{
                        fontSize: 14,
                        color: "#7C3AED",
                        fontWeight: getFontWeight(theme.fontWeight.bold),
                        marginTop: 4,
                      }}
                    >
                      {item.class_price}
                    </AppText>
                  </View>
                  <TouchableOpacity
                    style={styles.teacherRegisterationStyles.deleteButton}
                    onPress={() => removePending(item.id)}
                  >
                    <AppText
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: getFontWeight(theme.fontWeight.bold),
                      }}
                    >
                      حذف
                    </AppText>
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                style={[
                  styles.teacherRegisterationStyles.submitButton,
                  { opacity: loading ? 0.6 : 1 },
                ]}
                onPress={submitRegistrations}
                disabled={loading}
              >
                <AppText
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: getFontWeight(theme.fontWeight.bold),
                    fontSize: 16,
                  }}
                >
                  {loading
                    ? "جاري التسجيل..."
                    : `تسجيل ${pendingClasses.length} مادة`}
                </AppText>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* المواد المسجلة */}
        <View
          style={{
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          <AppText
            style={{
              fontSize: 18,
              fontWeight: getFontWeight(theme.fontWeight.bold),
              marginBottom: 10,
            }}
          >
            المواد المسجلة ({registrations.length})
          </AppText>

          {loading && registrations.length === 0 ? (
            <View style={styles.teacherRegisterationStyles.emptyContainer}>
              <AppText style={{ textAlign: "center", color: "#888" }}>
                جاري تحميل التسجيلات...
              </AppText>
            </View>
          ) : registrations.length === 0 ? (
            <View style={styles.teacherRegisterationStyles.emptyContainer}>
              <AppText style={{ textAlign: "center", color: "#888" }}>
                لا يوجد تسجيلات
              </AppText>
            </View>
          ) : (
            registrations.map((reg, index) => (
              <View
                key={reg.registration_id || index}
                style={styles.teacherRegisterationStyles.registrationItemStyle}
              >
                <View style={{ flex: 1 }}>
                  <AppText
                    style={{
                      fontWeight: getFontWeight(theme.fontWeight.bold),
                      fontSize: 16,
                    }}
                  >
                    {reg.class_name}
                  </AppText>
                  <AppText
                    style={{
                      fontSize: 12,
                      color:
                        reg.registration_status === "active"
                          ? "#28a745"
                          : reg.registration_status === "pending"
                          ? "#ffc107"
                          : "#dc3545",
                      marginTop: 2,
                      fontWeight: getFontWeight(theme.fontWeight.bold),
                    }}
                  >
                    {reg.registration_status === "active"
                      ? "نشط"
                      : reg.registration_status === "pending"
                      ? "في الانتظار"
                      : reg.registration_status}
                  </AppText>
                </View>
                <AppText
                  style={{
                    fontSize: 16,
                    fontWeight: getFontWeight(theme.fontWeight.bold),
                    color: "#7C3AED",
                    marginHorizontal: 10,
                  }}
                >
                  {reg.class_price}
                </AppText>
                <TouchableOpacity
                  style={[
                    styles.teacherRegisterationStyles.updateButton,
                    { opacity: loading ? 0.6 : 1 },
                  ]}
                  onPress={() =>
                    openUpdateModal(
                      reg.registration_id,
                      reg.class_price?.toString() || "0"
                    )
                  }
                  disabled={loading}
                >
                  <AppText
                    style={{
                      color: "white",
                      fontSize: 10,
                      fontWeight: getFontWeight(theme.fontWeight.bold),
                    }}
                  >
                    تحديث السعر
                  </AppText>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* المودال الموحد */}
      <ClassModal
        visible={showModal}
        editingRegId={editingRegId}
        classNameInput={classNameInput}
        priceInput={priceInput}
        loading={loading}
        onClassNameChange={setClassNameInput}
        onPriceChange={setPriceInput}
        onCancel={resetModal}
        onSubmit={editingRegId ? updatePrice : addPendingClass}
      />
    </SafeAreaView>
  );
}
