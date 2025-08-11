import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "@/styles";
import { getFontWeight } from "@/theme";
import React from "react";
import { Modal, TextInput, TouchableOpacity, View } from "react-native";

interface ClassModalProps {
  visible: boolean;
  editingRegId: number | null;
  classNameInput: string;
  priceInput: string;
  loading: boolean;
  onClassNameChange: (text: string) => void;
  onPriceChange: (text: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export default function ClassModal({
  visible,
  editingRegId,
  classNameInput,
  priceInput,
  loading,
  onClassNameChange,
  onPriceChange,
  onCancel,
  onSubmit,
}: ClassModalProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.teacherRegisterationStyles.modalOverlay}>
        <View style={styles.teacherRegisterationStyles.modalContainer}>
          <AppText
            style={{
              fontSize: 18,
              fontWeight: getFontWeight(theme.fontWeight.bold),
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            {editingRegId ? "تحديث السعر" : "إضافة مادة جديدة"}
          </AppText>

          {/* إدخال اسم المادة (للإضافة فقط) */}
          {!editingRegId && (
            <View style={{ marginBottom: 15 }}>
              <AppText
                style={{
                  marginBottom: 8,
                  fontWeight: getFontWeight(theme.fontWeight.bold),
                }}
              >
                اسم المادة:
              </AppText>
              <TextInput
                style={styles.teacherRegisterationStyles.textInputStyle}
                placeholder="أدخل اسم المادة الجديدة"
                value={classNameInput}
                onChangeText={onClassNameChange}
                autoFocus={!editingRegId}
              />
            </View>
          )}

          {/* إدخال السعر */}
          <View style={{ marginBottom: 20 }}>
            <AppText
              style={{
                marginBottom: 8,
                fontWeight: getFontWeight(theme.fontWeight.bold),
              }}
            >
              السعر:
            </AppText>
            <TextInput
              style={styles.teacherRegisterationStyles.textInputStyle}
              placeholder="أدخل السعر"
              value={priceInput}
              onChangeText={onPriceChange}
              keyboardType="numeric"
              autoFocus={!!editingRegId}
            />
          </View>

          {/* الأزرار */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[
                styles.teacherRegisterationStyles.modalButton,
                { backgroundColor: "#6c757d", marginRight: 10 },
              ]}
              onPress={onCancel}
            >
              <AppText
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                إلغاء
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.teacherRegisterationStyles.modalButton,
                { backgroundColor: "#007bff", opacity: loading ? 0.6 : 1 },
              ]}
              onPress={onSubmit}
              disabled={loading}
            >
              <AppText
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: getFontWeight(theme.fontWeight.bold),
                }}
              >
                {loading ? "جاري العمل..." : editingRegId ? "تحديث" : "إضافة"}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
