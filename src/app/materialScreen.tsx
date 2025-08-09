import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "@/styles";
import { Theme } from "@/types/style";
import { EducationStages, MaterialDataProps } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  I18nManager,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ModalView } from "./modals/modalView";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const MaterialsData: MaterialDataProps[] = [
  {
    id: 1,
    title: "الرياضيات",
    description:
      "مواد رياضية شاملة تغطي الجبر والهندسة والتفاضل والتكامل والإحصاء",
    icon: "📊",
    courses: 24,
    duration: "12 شهر",
    level: "كل المستويات",
  },
  {
    id: 2,
    title: "العلوم",
    description:
      "دورات في الفيزياء والكيمياء وعلم الأحياء مع تطبيقات عملية في المختبر",
    icon: "🔬",
    courses: 32,
    duration: "15 شهر",
    level: "متوسط إلى متقدم",
  },
  {
    id: 3,
    title: "اللغات",
    description:
      "دورات في اللغة الإنجليزية والعربية والفرنسية مع مدربين ناطقين أصليين",
    icon: "🗣️",
    courses: 28,
    duration: "18 شهر",
    level: "مبتدئ إلى متقدم",
  },
  {
    id: 4,
    title: "التاريخ",
    description: "تاريخ العالم، الحضارات القديمة، وتحليل تاريخي حديث",
    icon: "📚",
    courses: 20,
    duration: "10 شهر",
    level: "كل المستويات",
  },
  {
    id: 5,
    title: "الدراسات العربية",
    description:
      "دراسات في العربية الكلاسيكية والحديثة، الأدب، الشعر، والثقافة",
    icon: "✍️",
    courses: 16,
    duration: "14 شهر",
    level: "كل المستويات",
  },
  {
    id: 6,
    title: "الفيزياء",
    description:
      "مواد رياضية شاملة تغطي الجبر والهندسة والتفاضل والتكامل والإحصاء",
    icon: "📊",
    courses: 24,
    duration: "12 شهر",
    level: "كل المستويات",
  },
  {
    id: 7,
    title: "الكيمياء",
    description:
      "دورات في الفيزياء والكيمياء وعلم الأحياء مع تطبيقات عملية في المختبر",
    icon: "🔬",
    courses: 32,
    duration: "15 شهر",
    level: "متوسط إلى متقدم",
  },
  {
    id: 8,
    title: "الفلك",
    description:
      "دورات في اللغة الإنجليزية والعربية والفرنسية مع مدربين ناطقين أصليين",
    icon: "🗣️",
    courses: 28,
    duration: "18 شهر",
    level: "مبتدئ إلى متقدم",
  },
  {
    id: 9,
    title: "الدين",
    description: "تاريخ العالم، الحضارات القديمة، وتحليل تاريخي حديث",
    icon: "📚",
    courses: 20,
    duration: "10 شهر",
    level: "كل المستويات",
  },
  {
    id: 10,
    title: "علم النفس",
    description:
      "دراسات في العربية الكلاسيكية والحديثة، الأدب، الشعر، والثقافة",
    icon: "✍️",
    courses: 16,
    duration: "14 شهر",
    level: "كل المستويات",
  },
];

const MaterialCard = React.memo(
  ({ Material, theme }: { Material: MaterialDataProps; theme: Theme }) => {
    const styles = createStyles(theme);

    return (
      <View style={styles.materialScreen.cardContainer}>
        <TouchableOpacity
          style={styles.materialScreen.MaterialCard}
          activeOpacity={0.7}
        >
          <View style={styles.materialScreen.iconContainer}>
            <Text style={styles.materialScreen.MaterialIcon}>
              {Material.icon}
            </Text>
          </View>
        </TouchableOpacity>
        <AppText style={styles.materialScreen.MaterialTitle}>
          {Material.title}
        </AppText>
      </View>
    );
  }
);

const MaterialsScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedStage, setSelectedStage] = useState<EducationStages>({
    id: 0,
    name: "",
  });

  useEffect(() => {
    setModalVisible(true);
  }, []);

  const handleConfirm = (stage) => {
    setSelectedStage(stage);
    console.log("Selected stage:", stage);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.materialScreen.viewContainer}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.materialScreen.stageSelector}
        >
          <View style={styles.materialScreen.stageSelectorContent}>
            <Ionicons name="chevron-down" size={18} color="#1e293b" />
            <AppText style={styles.materialScreen.selectedStageText}>
              {selectedStage?.name || "اختر المرحلة"}
            </AppText>
          </View>
        </TouchableOpacity>

        <View style={styles.teacherScreen.headerContainer}>
          <AppText style={styles.teacherScreen.headerTitle}>
            {t("materialScreen.headerTitle")}
          </AppText>
        </View>
      </View>
      <AppText style={styles.teacherScreen.headerSubtitle}>
        {t("materialScreen.headerSubtitle")}
      </AppText>
      {/* Use flexWrap to display cards in rows */}
      <View
        style={[
          styles.materialScreen.cardsContainer,
          { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
        ]}
      >
        {MaterialsData.map((Material) => (
          <MaterialCard key={Material.id} Material={Material} theme={theme} />
        ))}
      </View>
      <ModalView
        modalVisible={modalVisible}
        handleCancel={handleCancel}
        selectedStage={selectedStage}
        handleConfirm={handleConfirm}
      />
    </SafeAreaView>
  );
};

export default MaterialsScreen;
