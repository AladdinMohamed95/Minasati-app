import AppText from "@/components/AppText";
import { Teacher } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { TFunction } from "i18next";
import React from "react";
import { Image, Modal, ScrollView, TouchableOpacity, View } from "react-native";

interface TeachersModalProps {
  visible: boolean;
  onClose: () => void;
  teachers: Teacher[];
  selectedTeacher: number | null;
  onSelect: (teacher: Teacher) => void;
  styles: any;
  t: TFunction<"translation", undefined>;
}

const TeachersModal: React.FC<TeachersModalProps> = React.memo(
  ({ visible, onClose, teachers, selectedTeacher, onSelect, styles, t }) => {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header}>
              <AppText style={styles.headerTitle}>اختر المدرس</AppText>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* List */}
            <ScrollView
              style={styles.teachersList}
              showsVerticalScrollIndicator={false}
            >
              {teachers.map((teacher) => (
                <TouchableOpacity
                  key={teacher.id}
                  style={[
                    styles.teacherCard,
                    selectedTeacher === teacher.id &&
                      styles.selectedTeacherCard,
                  ]}
                  onPress={() => onSelect(teacher)}
                >
                  <Image
                    source={{ uri: teacher.image_url }}
                    style={styles.teacherImage}
                  />
                  <View style={styles.teacherInfo}>
                    <AppText style={styles.teacherName}>{teacher.name}</AppText>
                    <AppText style={styles.teacherSpecialization}>
                      {teacher.profile.specialization}
                    </AppText>
                    {teacher.profile.experience_years && (
                      <AppText style={styles.experience}>
                        {teacher.profile.experience_years}
                        {t("yearsOfExperience")}
                      </AppText>
                    )}
                    {teacher.profile.description && (
                      <AppText style={styles.description}>
                        {teacher.profile.description}
                      </AppText>
                    )}
                  </View>

                  {/* Availability */}
                  <View style={styles.availabilityContainer}>
                    {teacher.availability.online && (
                      <View style={styles.availabilityBadge}>
                        <AppText style={styles.availabilityText}>
                          {t("online")}
                        </AppText>
                      </View>
                    )}
                    {teacher.availability.offline && (
                      <View
                        style={[styles.availabilityBadge, styles.offlineBadge]}
                      >
                        <AppText style={styles.availabilityText}>
                          {t("offline")}
                        </AppText>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
);

export default TeachersModal;
