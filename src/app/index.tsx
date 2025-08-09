// @ts-ignore
import Logo from "@/assets/images/icon.webp";
// @ts-ignore
import { PrimaryButton } from "@/components/AppButton";
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";
import { UserType } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";

const HomeScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user } = useUser();

  const handleBooking = () => {
    router.push("/StudentBookingScreen");
  };

  const handleIconPress = useCallback(() => {
    if (user) {
      if (user.type === UserType.student) {
        router.push("/StudentProfileScreen");
      } else {
        router.push("/TeacherProfileScreen");
      }
    } else {
      router.push("/LoginScreen");
    }
  }, [user]);

  const handleRegistrations = () => {
    router.push("/TeacherBookingScreen");
  };

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      {/* <LinearGradient
        colors={["#4F46E5", "#7C3AED"]}
        style={[styles.teacherInfoModalStyles.scrollView]}
      > */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* <View
        style={{
          flex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.5)", // شفاف أبيض
          borderRadius: 20,
          padding: 10,
          margin: 10,
        }}
      > */}
      <TouchableOpacity
        onPress={handleIconPress}
        style={styles.homeScreen.iconContainer}
      >
        <Ionicons
          name={user ? "person-circle-outline" : "log-in-outline"}
          size={36}
          color={theme.text.primary}
        />
      </TouchableOpacity>

      <View style={styles.homeScreen.logoContainer}>
        <View style={styles.homeScreen.logoPlaceholder}>
          <Image
            source={Logo}
            style={styles.homeScreen.imageStyle}
            accessibilityLabel="App Logo"
          />
        </View>

        <View>
          <AppText style={styles.homeScreen.descriptionText}>
            {t("Hello")} {user?.name || t("welcomeGuest")},
          </AppText>
          <AppText style={styles.registerScreen.title}>{t("welcome")}</AppText>
          <AppText style={styles.homeScreen.subDescriptionText}>
            {t("slugDesc")}
          </AppText>
        </View>
      </View>

      <View style={styles.homeScreen.contactContainer}>
        {user?.type === UserType.student && (
          <PrimaryButton
            title={t("booknow")}
            onPress={handleBooking}
            theme={theme}
            textStyle={styles.whiteAndBlackText.whiteText}
          />
        )}
        {user?.type === UserType.teacher && (
          <PrimaryButton
            title={t("viewRegisterations")}
            onPress={handleRegistrations}
            theme={theme}
            textStyle={styles.whiteAndBlackText.whiteText}
          />
        )}
      </View>
      {/* </View> */}
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
