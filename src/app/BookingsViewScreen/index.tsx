import { deleteBooking, getBookings } from "@/api/studentsMiddleware.api";
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "@/styles";
import { Booking } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import RenderBookingCard from "../modals/bookingCard";

export default function BookingScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await getBookings();
      console.log("bookings response:", JSON.stringify(response));

      // Handle response structure - extract data array
      const bookingsData = response;
      console.log("bookings data:", JSON.stringify(bookingsData));
      setBookings(bookingsData);
    } catch (error) {
      console.log("خطأ في جلب الحجوزات:", error);
      Alert.alert("خطأ", "حدث خطأ في تحميل الحجوزات");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId: number) => {
    Alert.alert("تأكيد الحذف", "هل أنت متأكد من حذف هذا الحجز؟", [
      { text: "إلغاء", style: "cancel" },
      {
        text: "حذف",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteBooking(bookingId);
            fetchBookings();
            Alert.alert("تم الحذف", "تم حذف الحجز بنجاح");
          } catch (error) {
            Alert.alert("خطأ", "حدث خطأ أثناء حذف الحجز");
          }
        },
      },
    ]);
  };

  const handleBookNow = () => {
    router.push("/StudentBookingScreen");
  };

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        style={styles.bookingViewStyles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.bookingViewStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B35" />
            <AppText style={styles.bookingViewStyles.loadingText}>
              جاري تحميل الحجوزات...
            </AppText>
          </View>
        ) : bookings.length === 0 ? (
          <View style={styles.bookingViewStyles.emptyContainer}>
            <Ionicons name="calendar-outline" size={80} color="#DDD" />
            <AppText style={styles.bookingViewStyles.emptyTitle}>
              لا توجد حجوزات
            </AppText>
            <AppText style={styles.bookingViewStyles.emptySubtitle}>
              لم تقم بحجز أي حصص دراسية بعد
            </AppText>
            <TouchableOpacity
              style={styles.bookingViewStyles.emptyButton}
              onPress={handleBookNow}
            >
              <AppText style={styles.bookingViewStyles.emptyButtonText}>
                احجز حصتك الأولى
              </AppText>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.bookingViewStyles.bookingsContainer}>
            <AppText style={styles.bookingViewStyles.bookingsCount}>
              إجمالي الحجوزات: {bookings.length}
            </AppText>
            {bookings.map((booking, index) => (
              <RenderBookingCard
                key={index}
                booking={booking}
                handleDeleteBooking={handleDeleteBooking}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
