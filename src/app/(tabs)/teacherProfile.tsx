import {
  getProfile,
  uploadTeacherProfileImage,
} from "@/api/teachersMiddlewate";
import * as ImagePicker from "expo-image-picker";
// @ts-ignore
import Logo from "@/assets/images/icon.png";
import { SecondaryButton } from "@/components/AppButton";
import AppText from "@/components/AppText";
import { HelloWave } from "@/components/HelloWave";
import { LanguageSwitcher } from "@/components/PreferencesSwitcher";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";

const TeacherProfileScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [profile, setProfile] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const { logout } = useUser();

  useEffect(() => {
    const getTeacherProfile = async () => {
      const response = await getProfile();
      setProfile(response);
    };
    getTeacherProfile();
  }, []);

  const handleLogout = async () => {
    logout().then(() => {
      router.back();
    });
  };

  const editProfile = () => {
    router.push({
      pathname: "/(tabs)/teacherRegister",
      params: {
        mode: "edit",
        teacherData: JSON.stringify(profile),
      },
    });
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "You need to allow access to gallery");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      await uploadImage(imageUri);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      setUploading(true);
      const result = await uploadTeacherProfileImage(uri);

      const imageUrl = result.image_url; // ✅ موجود دلوقتي

      Alert.alert("Success", "Profile image updated successfully!");
      setProfile((prev: any) =>
        prev ? { ...prev, image_url: imageUrl } : prev
      );
    } catch (error) {
      console.log("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  if (!profile) {
    return (
      <SafeAreaView style={styles.homeScreen.container}>
        <AppText>جارٍ تحميل البيانات...</AppText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <ScrollView
        contentContainerStyle={styles.profileViewStyles.scrollContainer}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <View style={styles.profileViewStyles.imageContainer}>
          <TouchableOpacity onPress={pickImage} disabled={uploading}>
            <Image
              source={profile.image_url ? { uri: profile.image_url } : Logo}
              style={styles.profileViewStyles.profileImage}
              accessibilityLabel="Profile Avatar"
            />
          </TouchableOpacity>
          <AppText style={styles.profileViewStyles.changeImageText}>
            {uploading ? "جاري الرفع..." : "اضغط لتغيير الصورة"}
          </AppText>
        </View>

        {/* الترحيب */}
        <View style={styles.profileViewStyles.headerContainer}>
          <AppText style={styles.profileViewStyles.greetingText}>
            {t("Hello")}, {profile.name}
          </AppText>
          <HelloWave />
        </View>

        <View style={styles.profileViewStyles.languageContainer}>
          <LanguageSwitcher />
        </View>

        {/* معلومات الحساب */}
        <View style={styles.profileViewStyles.card}>
          <AppText style={styles.profileViewStyles.sectionTitle}>
            معلومات الحساب
          </AppText>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>الهاتف</AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.phone}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              تاريخ التسجيل
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.created_at}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>آخر تحديث</AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.updated_at}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>الحالة</AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.is_confirmed ? "مفعل" : "غير مفعل"}
            </AppText>
          </View>
        </View>

        {/* بيانات المدرس */}
        <View style={styles.profileViewStyles.card}>
          <AppText style={styles.profileViewStyles.sectionTitle}>
            بيانات المدرس
          </AppText>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>التخصص</AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.profile.specialization || "غير محدد"}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              العنوان الوظيفي
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.profile.title || "غير محدد"}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>الوصف</AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.profile.description || "لا يوجد"}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              عدد سنوات الخبرة
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.profile.experience_years}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>مكان العمل</AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.profile.workplace || "غير محدد"}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>التواجد</AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.availability.online
                ? "أونلاين"
                : profile.availability.offline
                ? "أوفلاين"
                : "غير محدد"}
            </AppText>
          </View>
        </View>

        {/* الأزرار */}
        <TouchableOpacity
          onPress={editProfile}
          style={styles.profileViewStyles.editButton}
        >
          <AppText style={styles.profileViewStyles.editButtonText}>
            تعديل البيانات
          </AppText>
        </TouchableOpacity>

        <SecondaryButton
          title="تسجيل الخروج"
          onPress={handleLogout}
          theme={theme}
          textStyle={styles.whiteAndBlackText.blackText}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeacherProfileScreen;
