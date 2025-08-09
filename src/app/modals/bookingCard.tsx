import { DeleteButton, SmallSecondaryButton } from "@/components/AppButton";
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "@/styles";
import { Booking } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, View } from "react-native";
import TeacherInfoModal from "./teacherInfoModal";

type RenderBookingCardProps = {
  booking: Booking;
  handleDeleteBooking: (booking_id: number) => void;
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

const RenderBookingCard = React.memo(
  ({ booking, handleDeleteBooking }: RenderBookingCardProps) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleShowModal = (val: boolean) => {
      setShowModal(val);
    };

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
              {booking.status === "pending" ? "في الانتظار" : booking.status}
            </AppText>
          </View>
        </View>

        {/* Teacher Info */}
        <View style={styles.bookingViewStyles.teacherSection}>
          <View style={styles.bookingViewStyles.teacherInfo}>
            <AppText style={styles.bookingViewStyles.teacherName}>
              {booking.teacher?.name}
            </AppText>
            {booking.teacher?.profile?.specialization && (
              <AppText style={styles.bookingViewStyles.teacherSpecialization}>
                {booking.teacher.profile.specialization}
              </AppText>
            )}
            {booking.teacher?.profile?.experience_years && (
              <AppText style={styles.bookingViewStyles.teacherExperience}>
                خبرة {booking.teacher.profile.experience_years} سنوات
              </AppText>
            )}
            {/* {booking.teacher?.phone && (
              <AppText>📞 {booking.teacher.phone}</AppText>
            )} */}
          </View>
          <View style={styles.bookingViewStyles.teacherImageContainer}>
            {booking.teacher?.image_url ? (
              <Image
                source={{ uri: booking.teacher.image_url }}
                style={styles.bookingViewStyles.teacherImage}
              />
            ) : (
              <View
                style={[
                  styles.bookingViewStyles.teacherImage,
                  styles.bookingViewStyles.placeholderImage,
                ]}
              >
                <Ionicons name="person" size={30} color="#999" />
              </View>
            )}
          </View>
        </View>
        <View>
          <SmallSecondaryButton
            onPress={() => handleShowModal(true)}
            title="عرض الملف"
            theme={theme}
          />
        </View>
        {/* Booking Details */}
        <View style={styles.bookingViewStyles.detailsSection}>
          <View style={styles.bookingViewStyles.detailRow}>
            <Ionicons name="book-outline" size={18} color="#FF6B35" />
            <AppText style={styles.bookingViewStyles.detailLabel}>
              المادة:
            </AppText>
            <AppText style={styles.bookingViewStyles.detailValue}>
              {booking.class_details?.name ||
                `مادة رقم ${booking.class_details?.id}`}
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

          {booking.teacher?.availability && (
            <View style={styles.bookingViewStyles.detailRow}>
              <Ionicons
                name="checkmark-circle-outline"
                size={18}
                color="#4CAF50"
              />
              <AppText style={styles.bookingViewStyles.detailLabel}>
                متاح:
              </AppText>
              <View>
                {booking.teacher.availability.online && (
                  <View>
                    <AppText>أونلاين</AppText>
                  </View>
                )}
                {booking.teacher.availability.offline && (
                  <View>
                    <AppText>حضوري</AppText>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.bookingViewStyles.actionButtons}>
          <DeleteButton
            title="الغاء"
            theme={theme}
            onPress={() => handleDeleteBooking(booking.booking_id)}
          />
          {/* <TouchableOpacity
            style={[
              styles.bookingViewStyles.actionButton,
              styles.bookingViewStyles.deleteButton,
            ]}
            onPress={() => handleDeleteBooking(booking.booking_id)}
          >
            <Ionicons name="trash-outline" size={18} color="#FFF" />
            <AppText style={styles.bookingViewStyles.actionButtonText}>
              حذف
            </AppText>
          </TouchableOpacity> */}
        </View>

        <TeacherInfoModal
          teacher={booking.teacher}
          showModal={showModal}
          handleShowModal={handleShowModal}
        />
      </View>
    );
  }
);
export default RenderBookingCard;
