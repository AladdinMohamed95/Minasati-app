// @ts-ignore
import { PrimaryButton, SmallSecondaryButton } from "@/components/AppButton";
import AppText from "@/components/AppText";
import { HelloWave } from "@/components/HelloWave";
import { LanguageSwitcher } from "@/components/PreferencesSwitcher";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";

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
      pathname: "/StudentRegisterScreen",
      params: {
        mode: "edit",
        studentData: JSON.stringify(user),
      },
    });
  };

  const handleViewBooking = () => {
    router.push("/BookingsViewScreen");
  };

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <ScrollView
        contentContainerStyle={styles.profileViewStyles.scrollContainer}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <View style={styles.profileViewStyles.headerContainer}>
          <AppText style={styles.profileViewStyles.greetingText}>
            {t("Hello")}, {user?.name}
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
              {user?.phone}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              {t("type")}
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {user?.type}
            </AppText>
          </View>
          <View style={styles.profileViewStyles.row}>
            <AppText style={styles.profileViewStyles.label}>
              {t("registeredAt")}
            </AppText>
            <AppText style={styles.profileViewStyles.value}>
              {user?.registered_at}
            </AppText>
          </View>
        </View>
        <PrimaryButton title={t("edit")} onPress={editProfile} theme={theme} />

        <PrimaryButton
          title={t("viewBookings")}
          onPress={handleViewBooking}
          theme={theme}
        />

        <SmallSecondaryButton
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
