// TeachersScreen.js
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { useTranslationContext } from "@/context/TranslationContext";
import { createStyles } from "@/styles";
import { TeacherDataProps } from "@/types/types";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const teachersData: TeacherDataProps[] = [
  {
    id: 1,
    name: "د. سارة جونسون",
    bio: "معلمة رياضيات ذات خبرة 15 سنة في التدريس. شغوفة بجعل المفاهيم المعقدة سهلة لجميع الطلاب.",
    specialization: "الرياضيات",
    studyMaterial: ["الجبر", "التفاضل والتكامل", "الإحصاء", "الهندسة"],
    rating: 4.9,
    students: 156,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "أ. أحمد حسن",
    bio: "أستاذ فيزياء متخصص في ميكانيكا الكم والفيزياء النظرية. باحث منشور وله عدة أوراق علمية.",
    specialization: "الفيزياء",
    studyMaterial: [
      "الميكانيكا",
      "الديناميكا الحرارية",
      "الكهرومغناطيسية",
      "فيزياء الكم",
    ],
    rating: 4.8,
    students: 132,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "أ. إميلي تشين",
    bio: "متحدثة أصلية للإنجليزية وحاصلة على شهادة TESOL. متخصصة في القواعد المتقدمة وتحليل الأدب والكتابة الإبداعية.",
    specialization: "اللغة الإنجليزية",
    studyMaterial: ["القواعد", "الأدب", "الكتابة الإبداعية", "مهارات التحدث"],
    rating: 4.9,
    students: 201,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "د. عمر الرشيد",
    bio: "خبير في اللغة العربية والأدب، لديه معرفة عميقة بالنصوص الكلاسيكية والحديثة. متخصص في التراث الثقافي.",
    specialization: "اللغة العربية",
    studyMaterial: ["العربية الكلاسيكية", "العربية الحديثة", "الشعر", "الأدب"],
    rating: 4.7,
    students: 98,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "د. ماريا رودريغيز",
    bio: "باحثة في الكيمياء الحيوية تحولت إلى التعليم. تجعل العلوم ممتعة من خلال التجارب العملية والتطبيقات الواقعية.",
    specialization: "الكيمياء",
    studyMaterial: [
      "الكيمياء العضوية",
      "الكيمياء غير العضوية",
      "الكيمياء الحيوية",
      "تقنيات المختبر",
    ],
    rating: 4.8,
    students: 143,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "أ. جيمس ويلسون",
    bio: "مهتم بالتاريخ وخبير في الحضارات العالمية والتاريخ الحديث. يحيي الأحداث التاريخية من خلال السرد القصصي.",
    specialization: "التاريخ",
    studyMaterial: [
      "تاريخ العالم",
      "الحضارات القديمة",
      "التاريخ الحديث",
      "تحليل تاريخي",
    ],
    rating: 4.6,
    students: 167,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 7,
    name: "د. ليزا تومسون",
    bio: "عالمة أحياء بحرية ذات خبرة ميدانية. شغوفة بالحفاظ على البيئة والتنوع البيولوجي.",
    specialization: "الأحياء",
    studyMaterial: ["علم الخلية", "الوراثة", "علم البيئة", "الأحياء البحرية"],
    rating: 4.9,
    students: 189,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 8,
    name: "أ. ديفيد كيم",
    bio: "معلم جغرافيا وعلوم بيئية. يستخدم الخرائط التفاعلية والدراسات الميدانية لتعليم الطلاب عن العالم.",
    specialization: "الجغرافيا",
    studyMaterial: [
      "الجغرافيا الطبيعية",
      "الجغرافيا البشرية",
      "علوم البيئة",
      "رسم الخرائط",
    ],
    rating: 4.7,
    students: 124,
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 9,
    name: "أ. صوفي دوبوا",
    bio: "متحدثة أصلية للفرنسية وحاصلة على درجات متقدمة في اللغويات. تدرس اللغة الفرنسية وثقافة الفرانكوفونية.",
    specialization: "اللغة الفرنسية",
    studyMaterial: [
      "قواعد اللغة الفرنسية",
      "المحادثة",
      "الأدب الفرنسي",
      "دراسات ثقافية",
    ],
    rating: 4.8,
    students: 156,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 10,
    name: "د. مايكل براون",
    bio: "أستاذ فلسفة متخصص في الأخلاق والمنطق والتفكير النقدي. يساعد الطلاب على تطوير مهارات التحليل المنطقي.",
    specialization: "الفلسفة",
    studyMaterial: ["الأخلاق", "المنطق", "التفكير النقدي", "فلسفة العقل"],
    rating: 4.6,
    students: 87,
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
  },
];

const TeacherCard = ({ teacher, theme, language }) => {
  const styles = createStyles(theme);
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={styles.teacherScreen.teacherCard}
      activeOpacity={0.7}
    >
      <View style={styles.teacherScreen.teacherHeader}>
        <Image
          source={{ uri: teacher.image }}
          style={styles.teacherScreen.teacherImage}
        />
        <View style={styles.teacherScreen.teacherInfo}>
          <View style={styles.teacherScreen.nameRatingRow}>
            <AppText style={styles.teacherScreen.teacherName}>
              {t("teachersScreen.teacherName")}: {teacher.name}
            </AppText>

            <View style={styles.teacherScreen.ratingContainer}>
              <Text style={styles.teacherScreen.starIcon}>⭐</Text>
              <AppText style={styles.teacherScreen.rating}>
                {teacher.rating}
              </AppText>
            </View>
          </View>

          <View style={styles.teacherScreen.metaRow}>
            <View style={styles.teacherScreen.specializationContainer}>
              <Text style={styles.teacherScreen.graduationIcon}>🎓</Text>
              <AppText style={styles.teacherScreen.specialization}>
                {t("teachersScreen.teacherSpecialization")}:
                {teacher.specialization}
              </AppText>
            </View>
            <View style={styles.teacherScreen.studentsContainer}>
              <Text style={styles.teacherScreen.usersIcon}>👥</Text>
              <AppText style={styles.teacherScreen.studentsText}>
                {teacher.students} {t("teachersScreen.students")}
              </AppText>
            </View>
          </View>
        </View>
      </View>

      <AppText style={styles.teacherScreen.bio}>{teacher.bio}</AppText>

      <View style={styles.teacherScreen.materialsSection}>
        <AppText style={styles.teacherScreen.materialsTitle}>
          {t("teachersScreen.studyMaterials")}
        </AppText>
        <View style={styles.teacherScreen.materialsContainer}>
          {teacher.studyMaterial.map((material, index) => (
            <View key={index} style={styles.teacherScreen.materialTag}>
              <AppText style={styles.teacherScreen.materialText}>
                {material}
              </AppText>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TeachersScreen = () => {
  const { language } = useTranslationContext();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.teacherScreen.headerContainer}>
        <AppText style={styles.teacherScreen.headerTitle}>
          {t("teachersScreen.headerTitle")}
        </AppText>
        <AppText style={styles.teacherScreen.headerSubtitle}>
          {t("teachersScreen.headerSubtitle")}
        </AppText>
      </View>

      <ScrollView
        style={styles.registerScreen.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.teacherScreen.scrollContent}
      >
        {teachersData.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            theme={theme}
            language={language}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeachersScreen;
