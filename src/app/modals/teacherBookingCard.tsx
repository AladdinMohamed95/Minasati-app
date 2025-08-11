import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

type TeacherBooking = {
  booking_id: number;
  status: string;
  booking_time: string;
  student: {
    id: number;
    name: string;
    phone: string;
    registered_at: string;
  };
  class_details: {
    id: number;
    name: string;
    academic_year: {
      id: number;
      name: string;
      academic_stage: {
        id: number;
        name: string;
        educational_system: {
          id: number;
          name: string;
          description: string;
        };
      };
    };
  };
  created_at: string;
};

type TeacherBookingCardProps = {
  booking: TeacherBooking;
  handleUpdateBookingStatus?: (booking_id: number, status: string) => void;
  handleDeleteBooking?: (booking_id: number) => void;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
    case "مؤكد":
      return "#4CAF50";
    case "pending":
    case "في الانتظار":
      return "#FF9800";
    case "cancelled":
    case "ملغي":
      return "#F44336";
    default:
      return "#757575";
  }
};

const getStatusText = (status: string) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return "مؤكد";
    case "pending":
      return "في الانتظار";
    case "cancelled":
      return "ملغي";
    default:
      return status;
  }
};

const TeacherBookingCard = React.memo(
  ({ booking }: TeacherBookingCardProps) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
      <View
        key={booking.booking_id}
        style={styles.bookingViewStyles.bookingCard}
      >
        <View style={styles.bookingViewStyles.cardHeader}>
          <View style={styles.bookingViewStyles.bookingIdContainer}>
            <AppText style={styles.bookingViewStyles.bookingIdText}>
              حجز رقم #{booking.booking_id}
            </AppText>
          </View>
          <View
            style={[
              styles.bookingViewStyles.statusBadge,
              { backgroundColor: getStatusColor(booking.status || "pending") },
            ]}
          >
            <AppText style={styles.bookingViewStyles.statusText}>
              {getStatusText(booking.status)}
            </AppText>
          </View>
        </View>

        {/* Student Info */}
        <View style={styles.bookingViewStyles.teacherSection}>
          <View style={styles.bookingViewStyles.teacherInfo}>
            <AppText style={styles.bookingViewStyles.teacherName}>
              الطالب: {booking.student?.name}
            </AppText>
            <AppText style={styles.bookingViewStyles.teacherSpecialization}>
              📞 {booking.student?.phone}
            </AppText>
            <AppText style={styles.bookingViewStyles.teacherExperience}>
              مسجل منذ: {formatDate(booking.student?.registered_at)}
            </AppText>
          </View>
        </View>

        {/* Booking Details */}
        <View style={styles.bookingViewStyles.detailsSection}>
          <View style={styles.bookingViewStyles.detailRow}>
            <Ionicons name="book-outline" size={18} color="#FF6B35" />
            <AppText style={styles.bookingViewStyles.detailLabel}>
              المادة:
            </AppText>
            <AppText style={styles.bookingViewStyles.detailValue}>
              {booking.class_details?.name}
            </AppText>
          </View>

          {booking.class_details?.academic_year?.name && (
            <View style={styles.bookingViewStyles.detailRow}>
              <Ionicons name="school-outline" size={18} color="#FF6B35" />
              <AppText style={styles.bookingViewStyles.detailLabel}>
                الصف:
              </AppText>
              <AppText style={styles.bookingViewStyles.detailValue}>
                {booking.class_details.academic_year.name}
              </AppText>
            </View>
          )}

          {booking.class_details?.academic_year?.academic_stage?.name && (
            <View style={styles.bookingViewStyles.detailRow}>
              <Ionicons name="library-outline" size={18} color="#FF6B35" />
              <AppText style={styles.bookingViewStyles.detailLabel}>
                المرحلة:
              </AppText>
              <AppText style={styles.bookingViewStyles.detailValue}>
                {booking.class_details.academic_year.academic_stage.name}
              </AppText>
            </View>
          )}

          {booking.class_details?.academic_year?.academic_stage
            ?.educational_system?.name && (
            <View style={styles.bookingViewStyles.detailRow}>
              <Ionicons name="flag-outline" size={18} color="#FF6B35" />
              <AppText style={styles.bookingViewStyles.detailLabel}>
                النظام:
              </AppText>
              <AppText style={styles.bookingViewStyles.detailValue}>
                {
                  booking.class_details.academic_year.academic_stage
                    .educational_system.name
                }
              </AppText>
            </View>
          )}

          <View style={styles.bookingViewStyles.detailRow}>
            <Ionicons name="calendar-outline" size={18} color="#FF6B35" />
            <AppText style={styles.bookingViewStyles.detailLabel}>
              التاريخ:
            </AppText>
            <AppText style={styles.bookingViewStyles.detailValue}>
              {formatDate(booking.booking_time)}
            </AppText>
          </View>

          <View style={styles.bookingViewStyles.detailRow}>
            <Ionicons name="time-outline" size={18} color="#FF6B35" />
            <AppText style={styles.bookingViewStyles.detailLabel}>
              الوقت:
            </AppText>
            <AppText style={styles.bookingViewStyles.detailValue}>
              {formatTime(booking.booking_time)}
            </AppText>
          </View>

          <View style={styles.bookingViewStyles.detailRow}>
            <Ionicons name="create-outline" size={18} color="#FF6B35" />
            <AppText style={styles.bookingViewStyles.detailLabel}>
              تم الحجز:
            </AppText>
            <AppText style={styles.bookingViewStyles.detailValue}>
              {formatDate(booking.created_at)}
            </AppText>
          </View>
        </View>
      </View>
    );
  }
);

export default TeacherBookingCard;
