import AppText from "@/components/AppText";
import { EducationStages, ModalProps } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";

export const ModalView = React.memo(
  ({
    modalVisible,
    handleCancel,
    selectedStage,
    styles,
    handleConfirm,
  }: ModalProps) => {
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCancel}
              >
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
              <View style={styles.headerContent}>
                <Ionicons name="school" size={24} color="#3b82f6" />
                <AppText style={styles.modalHeaderTitle}>
                  مرحلتك الدراسية
                </AppText>
              </View>
            </View>

            {/* Content */}
            <View style={styles.content}>
              <AppText style={styles.subtitle}>
                اختر المرحلة الدراسية المناسبة لك
              </AppText>

              <ScrollView
                style={styles.stagesList}
                showsVerticalScrollIndicator={true}
              >
                {stages.map((stage, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.stageItem,
                      selectedStage === stage && styles.stageItemSelected,
                    ]}
                    onPress={() => handleConfirm(stage)}
                  >
                    <AppText
                      style={[
                        styles.stageText,
                        selectedStage === stage && styles.stageTextSelected,
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
