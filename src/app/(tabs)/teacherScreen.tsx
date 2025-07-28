// TeachersScreen.js
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { useTranslationContext } from "@/context/TranslationContext";
import { createStyles } from "@/styles";
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

const teachersData = [
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
    <TouchableOpacity style={styles.teacherCard} activeOpacity={0.7}>
      <View style={styles.teacherHeader}>
        <Image source={{ uri: teacher.image }} style={styles.teacherImage} />
        <View style={styles.teacherInfo}>
          <View style={styles.nameRatingRow}>
            <AppText style={styles.teacherName}>
              {t("teachersScreen.teacherName")}: {teacher.name}
            </AppText>

            <View style={styles.ratingContainer}>
              <Text style={styles.starIcon}>⭐</Text>
              <AppText style={styles.rating}>{teacher.rating}</AppText>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.specializationContainer}>
              <Text style={styles.graduationIcon}>🎓</Text>
              <AppText style={styles.specialization}>
                {t("teachersScreen.teacherSpecialization")}:
                {teacher.specialization}
              </AppText>
            </View>
            <View style={styles.studentsContainer}>
              <Text style={styles.usersIcon}>👥</Text>
              <AppText style={styles.studentsText}>
                {teacher.students} {t("teachersScreen.students")}
              </AppText>
            </View>
          </View>
        </View>
      </View>

      <AppText style={styles.bio}>{teacher.bio}</AppText>

      <View style={styles.materialsSection}>
        <AppText style={styles.materialsTitle}>
          {t("teachersScreen.studyMaterials")}
        </AppText>
        <View style={styles.materialsContainer}>
          {teacher.studyMaterial.map((material, index) => (
            <View key={index} style={styles.materialTag}>
              <AppText style={styles.materialText}>{material}</AppText>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.viewProfileButton}>
        <AppText style={styles.viewProfileText}>
          {t("teachersScreen.viewProfile")}
        </AppText>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const TeachersScreen = () => {
  const { language } = useTranslationContext();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.headerContainer}>
        <AppText style={styles.headerTitle}>
          {t("teachersScreen.headerTitle")}
        </AppText>
        <AppText style={styles.headerSubtitle}>
          {t("teachersScreen.headerSubtitle")}
        </AppText>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
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
