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
import { useTranslation } from "react-i18next";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const { user, logout } = useUser();
  const router = useRouter();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handleLogout = async () => {
    logout().then(() => {
      router.push("/");
    });
  };

  const editProfile = () => {
    router.push({
      pathname: "/studentRegisteration",
      params: {
        mode: "edit",
        studentData: JSON.stringify(user),
      },
    });
  };

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <ScrollView contentContainerStyle={styles.profileViewStyles.scrollContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* صورة البروفايل */}
        <View style={styles.profileViewStyles.imageContainer}>
          <Image
            source={Logo}
            style={styles.profileViewStyles.profileImage}
            accessibilityLabel="Profile Avatar"
          />
        </View>

        {/* الترحيب */}
        <View style={styles.profileViewStyles.headerContainer}>
          <AppText style={styles.profileViewStyles.greetingText}>
            {t("Hello")}, {user?.name}
          </AppText>
          <HelloWave />
        </View>

        {/* تبديل اللغة */}
        <View style={styles.profileViewStyles.languageContainer}>
          <LanguageSwitcher />
        </View>

        {/* بيانات الطالب */}
        <View style={styles.profileViewStyles.card}>
          <AppText style={styles.profileViewStyles.sectionTitle}>معلومات الحساب</AppText>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>{t("phone")}</AppText>
            <AppText style={styles.profileViewStyles.value}>{user?.phone}</AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>{t("type")}</AppText>
            <AppText style={styles.profileViewStyles.value}>{user?.type}</AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>{t("registeredAt")}</AppText>
            <AppText style={styles.profileViewStyles.value}>{user?.registered_at}</AppText>
          </View>
        </View>

        {/* زر تعديل */}
        <TouchableOpacity onPress={editProfile} style={styles.profileViewStyles.editButton}>
          <AppText style={styles.profileViewStyles.editButtonText}>{t("edit")}</AppText>
        </TouchableOpacity>

        {/* زر تسجيل الخروج */}
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

export default ProfileScreen;
