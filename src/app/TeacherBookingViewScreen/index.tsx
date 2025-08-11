import { getTeacherBookings } from "@/api/teachersMiddleware.api";
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "@/styles";
import { BookingItem } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import TeacherBookingCard from "../modals/teacherBookingCard";

export default function TeacherBookingViewScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await getTeacherBookings();

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
          </View>
        ) : (
          <View style={styles.bookingViewStyles.bookingsContainer}>
            <AppText style={styles.bookingViewStyles.bookingsCount}>
              إجمالي الحجوزات: {bookings.length}
            </AppText>
            {bookings.map((booking, index) => (
              <TeacherBookingCard
                key={index}
                booking={booking}
                handleUpdateBookingStatus={(booking_id, status) => {
                  // handle status update
                }}
                handleDeleteBooking={(booking_id) => {
                  // handle delete
                }}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
