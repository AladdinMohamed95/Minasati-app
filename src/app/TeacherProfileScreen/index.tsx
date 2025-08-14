import {
  getProfile,
  uploadTeacherProfileImage,
} from "@/api/teachersMiddleware.api";
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
      pathname: "/TeacherRegisterScreen",
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

      const imageUrl = result.image_url;

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
        <AppText>{t("loadingData")}</AppText>
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
            {uploading ? t("uploading") : t("uploadImage")}
          </AppText>
        </View>

        <View style={styles.profileViewStyles.headerContainer}>
          <AppText style={styles.profileViewStyles.greetingText}>
            {t("Hello")}, {profile.name}
          </AppText>
          <HelloWave />
        </View>

        <View style={styles.profileViewStyles.languageContainer}>
          <LanguageSwitcher />
        </View>

        <View style={styles.profileViewStyles.card}>
          <AppText style={styles.profileViewStyles.sectionTitle}>
            {t("accountInfo")}
          </AppText>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              {t("phone")}
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.phone}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              {t("registeredAt")}
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.created_at}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              {t("updatedAt")}
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.updated_at}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              {t("status")}
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.is_confirmed ? t("active") : t("notActive")}
            </AppText>
          </View>
        </View>

        <View style={styles.profileViewStyles.card}>
          <AppText style={styles.profileViewStyles.sectionTitle}>
            {t("teacherInfo")}
          </AppText>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              {t("specialization")}
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.profile.specialization || t("notSpecified")}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              {t("profileTitle")}
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.profile.title || t("notSpecified")}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              {t("profileDescription")}
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.profile.description || t("notAvailable")}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              {t("yearsOfExperience")}
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.profile.experience_years}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              {t("city")}
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.profile.city || t("notSpecified")}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              {t("district")}
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.profile.district || t("notSpecified")}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              {t("workAddress")}
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.profile.workplace || t("notSpecified")}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              {t("availability")}
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.availability.online
                ? t("online")
                : profile.availability.offline
                ? t("offline")
                : t("notSpecified")}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              {t("homeAvailability")}
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {profile.home_availability || t("notSpecified")}
            </AppText>
          </View>
        </View>

        <TouchableOpacity
          onPress={editProfile}
          style={styles.appButton.smallSecondaryButton}
        >
          <AppText style={styles.appButton.smallSecondaryButtonText}>
            {t("updateButton")}
          </AppText>
        </TouchableOpacity>

        <SecondaryButton
          title={t("logout")}
          onPress={handleLogout}
          theme={theme}
          textStyle={styles.whiteAndBlackText.blackText}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeacherProfileScreen;
