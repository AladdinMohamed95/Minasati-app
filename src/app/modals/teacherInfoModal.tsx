import AppText from "@/components/AppText";
import { InfoCard } from "@/components/InfoCard";
import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "@/styles";
import { Teacher } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Modal, ScrollView, StatusBar, View } from "react-native";

const TeacherInfoModal = ({
  teacher,
  showModal,
  handleShowModal,
}: {
  teacher: Teacher;
  showModal: boolean;
  handleShowModal: (val: boolean) => void;
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const ClassCard = ({ classItem }) => (
    <View style={styles.teacherInfoModalStyles.classCard}>
      <View style={styles.teacherInfoModalStyles.classHeader}>
        <AppText style={styles.teacherInfoModalStyles.className}>
          {classItem.name}
        </AppText>
        <View style={styles.teacherInfoModalStyles.priceContainer}>
          <AppText style={styles.teacherInfoModalStyles.price}>
            {classItem.pivot.class_price}
          </AppText>
          <AppText style={styles.teacherInfoModalStyles.currency}>ج.م</AppText>
        </View>
      </View>

      <View style={styles.teacherInfoModalStyles.classDetails}>
        <View style={styles.teacherInfoModalStyles.detailRow}>
          <Ionicons name="school" size={16} color="#6B7280" />
          <AppText style={styles.teacherInfoModalStyles.detailText}>
            {classItem.academic_year.name}
          </AppText>
        </View>
        <View style={styles.teacherInfoModalStyles.detailRow}>
          <Ionicons name="library" size={16} color="#6B7280" />
          <AppText style={styles.teacherInfoModalStyles.detailText}>
            {classItem.academic_year.academic_stage.name}
          </AppText>
        </View>
        <View style={styles.teacherInfoModalStyles.detailRow}>
          <Ionicons name="globe" size={16} color="#6B7280" />
          <AppText style={styles.teacherInfoModalStyles.detailText}>
            {classItem.academic_year.academic_stage.educational_system.name}
          </AppText>
        </View>
      </View>

      <View style={styles.teacherInfoModalStyles.statusContainer}>
        <View
          style={[
            styles.teacherInfoModalStyles.statusBadge,
            classItem.pivot.status === "pending"
              ? styles.teacherInfoModalStyles.pendingStatus
              : styles.teacherInfoModalStyles.activeStatus,
          ]}
        >
          <AppText
            style={[
              styles.teacherInfoModalStyles.statusText,
              classItem.pivot.status === "pending"
                ? styles.teacherInfoModalStyles.pendingStatusText
                : styles.teacherInfoModalStyles.activeStatusText,
            ]}
          >
            {classItem.pivot.status === "pending" ? "في الانتظار" : "مؤكد"}
          </AppText>
        </View>
      </View>
    </View>
  );

  return (
    <Modal visible={showModal}>
      <View style={styles.teacherInfoModalStyles.container}>
        <StatusBar barStyle="light-content" />

        <ScrollView
          style={styles.teacherInfoModalStyles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <LinearGradient
            colors={["#4F46E5", "#7C3AED"]}
            style={styles.teacherInfoModalStyles.header}
          >
            <Ionicons
              name="close"
              size={28}
              color="white"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 10,
              }}
              onPress={() => handleShowModal(false)}
            />
            <View style={styles.teacherInfoModalStyles.profileSection}>
              <View style={styles.teacherInfoModalStyles.profileInfo}>
                <AppText style={styles.teacherInfoModalStyles.teacherName}>
                  {teacher.name}
                </AppText>
                <AppText style={styles.teacherInfoModalStyles.teacherTitle}>
                  {teacher.profile.title}
                </AppText>
                <View style={styles.teacherInfoModalStyles.locationRow}>
                  <Ionicons
                    name="location"
                    size={16}
                    color="rgba(255,255,255,0.8)"
                  />
                  <AppText style={styles.teacherInfoModalStyles.locationText}>
                    {teacher.profile.country}
                  </AppText>
                </View>
              </View>
              <View style={styles.teacherInfoModalStyles.imageContainer}>
                <Image
                  source={{
                    uri:
                      teacher.image_url ||
                      "https://via.placeholder.com/120x120?text=معلم",
                  }}
                  style={styles.teacherInfoModalStyles.profileImage}
                />
                {teacher.is_confirmed && (
                  <View style={styles.teacherInfoModalStyles.verifiedBadge}>
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                )}
              </View>
            </View>
          </LinearGradient>

          {/* Info Cards Section */}
          <View style={styles.teacherInfoModalStyles.infoSection}>
            <InfoCard
              icon="person-circle"
              title="التخصص"
              value={teacher.profile.specialization}
              iconColor="#10B981"
            />
            <InfoCard
              icon="time"
              title="سنوات الخبرة"
              value={`${teacher.profile.experience_years} سنوات`}
              iconColor="#F59E0B"
            />
            {/* <InfoCard
              icon="call"
              title="رقم الهاتف"
              value={teacher.phone}
              iconColor="#EF4444"
            /> */}
          </View>

          {/* Description Section */}
          {teacher.profile.description && (
            <View style={styles.teacherInfoModalStyles.section}>
              <AppText style={styles.teacherInfoModalStyles.sectionTitle}>
                وصف المعلم
              </AppText>
              <View style={styles.teacherInfoModalStyles.descriptionCard}>
                <AppText style={styles.teacherInfoModalStyles.descriptionText}>
                  {teacher.profile.description}
                </AppText>
              </View>
            </View>
          )}

          {/* Availability Section */}
          <View style={styles.teacherInfoModalStyles.section}>
            <AppText style={styles.teacherInfoModalStyles.sectionTitle}>
              طرق التدريس المتاحة
            </AppText>
            <View style={styles.teacherInfoModalStyles.availabilityContainer}>
              <View style={styles.teacherInfoModalStyles.availabilityItem}>
                <View style={styles.teacherInfoModalStyles.availabilityIcon}>
                  <Ionicons name="laptop" size={24} color="#4F46E5" />
                </View>
                <AppText style={styles.teacherInfoModalStyles.availabilityText}>
                  أونلاين
                </AppText>
                <View
                  style={[
                    styles.teacherInfoModalStyles.statusDot,
                    teacher.availability.online
                      ? styles.teacherInfoModalStyles.activeDot
                      : styles.teacherInfoModalStyles.inactiveDot,
                  ]}
                />
              </View>

              <View style={styles.teacherInfoModalStyles.availabilityItem}>
                <View style={styles.teacherInfoModalStyles.availabilityIcon}>
                  <Ionicons name="people" size={24} color="#F59E0B" />
                </View>
                <AppText style={styles.teacherInfoModalStyles.availabilityText}>
                  حضوري
                </AppText>
                <View
                  style={[
                    styles.teacherInfoModalStyles.statusDot,
                    teacher.availability.offline
                      ? styles.teacherInfoModalStyles.activeDot
                      : styles.teacherInfoModalStyles.inactiveDot,
                  ]}
                />
              </View>
            </View>
          </View>

          {/* Classes Section */}
          <View style={styles.teacherInfoModalStyles.section}>
            <AppText style={styles.teacherInfoModalStyles.sectionTitle}>
              المواد التي يدرسها
            </AppText>
            <View style={styles.teacherInfoModalStyles.classesContainer}>
              {teacher.classes.map((classItem) => (
                <ClassCard key={classItem.id} classItem={classItem} />
              ))}
            </View>
          </View>
          <View style={styles.teacherInfoModalStyles.bottomPadding} />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default TeacherInfoModal;
