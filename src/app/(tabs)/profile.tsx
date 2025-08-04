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
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const { user, logout } = useUser();
  const router = useRouter();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handleLogout = () => {
    logout();
    router.push("/");
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
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.homeScreen.logoContainer}>
        <View style={styles.homeScreen.logoPlaceholder}>
          <Image
            source={Logo}
            style={{ width: 80, height: 80, resizeMode: "contain" }}
            accessibilityLabel="Profile Avatar"
          />
        </View>
      </View>

      <View style={styles.homeScreen.descriptionContainer}>
        <AppText style={styles.registerScreen.label}>
          {t("Hello")}, {user?.name}
        </AppText>
        <HelloWave />
      </View>

      {/* Language Switcher */}
      <View style={styles.preferenceContainer.preferencesContainer}>
        <LanguageSwitcher />
      </View>

      <View style={styles.registerScreen.inputContainer}>
        <View style={{ marginBottom: 16 }}>
          <AppText style={styles.registerScreen.label}>
            {t("phone")}: {user?.phone}
          </AppText>
          <AppText style={styles.registerScreen.label}>
            {t("type")}: {user?.type}
          </AppText>
          <AppText style={styles.registerScreen.label}>
            {t("registeredAt")}: {user?.registered_at}
          </AppText>
        </View>

        <TouchableOpacity onPress={editProfile}>
          <AppText
            style={[styles.otherViewStyle.teacherLink, { fontWeight: "bold" }]}
          >
            {t("edit")}
          </AppText>
        </TouchableOpacity>
      </View>

      <SecondaryButton
        title={t("logout")}
        onPress={handleLogout}
        theme={theme}
        textStyle={styles.whiteAndBlackText.blackText}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
