import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "@/styles";
import { EducationStages, ModalProps } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";

export const ModalView = React.memo(
  ({
    modalVisible,
    handleCancel,
    selectedStage,
    handleConfirm,
  }: ModalProps) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const stages: Array<EducationStages> = useMemo(
      () => [
        { id: 1, name: "أولى ابتدائي" },
        { id: 2, name: "ثانية ابتدائي" },
        { id: 3, name: "ثالثة ابتدائي" },
        { id: 4, name: "رابعة ابتدائي" },
        { id: 5, name: "خامسة ابتدائي" },
        { id: 6, name: "سادسة ابتدائي" },
        { id: 7, name: "أول متوسط" },
        { id: 8, name: "ثاني متوسط" },
        { id: 9, name: "ثالث متوسط" },
        { id: 10, name: "أول ثانوي" },
        { id: 11, name: "ثاني ثانوي" },
        { id: 12, name: "ثالث ثانوي" },
        { id: 13, name: "جامعي" },
      ],
      []
    );

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalView.modalOverlay}>
          <View style={styles.modalView.modalContainer}>
            {/* Header */}
            <View style={styles.teacherScreen.header}>
              <TouchableOpacity
                style={styles.modalView.closeButton}
                onPress={handleCancel}
              >
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
              <View style={styles.modalView.headerContent}>
                <Ionicons name="school" size={24} color="#3b82f6" />
                <AppText style={styles.modalView.modalHeaderTitle}>
                  مرحلتك الدراسية
                </AppText>
              </View>
            </View>

            {/* Content */}
            <View style={styles.modalView.content}>
              <AppText style={styles.modalView.subtitle}>
                اختر المرحلة الدراسية المناسبة لك
              </AppText>

              <ScrollView
                style={styles.modalView.stagesList}
                showsVerticalScrollIndicator={true}
              >
                {stages.map((stage, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.modalView.stageItem,
                      selectedStage === stage &&
                        styles.modalView.stageItemSelected,
                    ]}
                    onPress={() => handleConfirm(stage)}
                  >
                    <AppText
                      style={[
                        styles.modalView.stageText,
                        selectedStage === stage &&
                          styles.modalView.stageTextSelected,
                      ]}
                    >
                      {stage.name}
                    </AppText>
                    {selectedStage === stage && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#3b82f6"
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
);
