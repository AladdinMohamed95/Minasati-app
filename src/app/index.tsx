// @ts-ignore
// @ts-ignore
import AppText from "@/components/AppText";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import { createStyles } from "@/styles";
import { UserType } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StatusBar, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { user } = useUser();

  const handleBooking = () => {
    router.push("/StudentBookingScreen");
  };
  const handleComplain = () => {
    router.push("/StudentComplaint");
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

  const handleViewRegistrations = () => {
    router.push("/TeacherBookingViewScreen");
  };

  const handleAddRegistrations = () => {
    router.push("/TeacherRegistrationsScreen");
  };

  const handleStudentInquery = () => {
    router.push("/StudentInqueries");
  };

  const handleTeacherInquery = () => {
    router.push("/TeacherInqueries");
  };

  return (
    <SafeAreaView style={styles.homeScreen.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <LinearGradient
        colors={["#4F46E5", "#7C3AED"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.homeScreen.headerGradient}
      >
        <View style={styles.homeScreen.headerContent}>
          <View>
            <AppText style={styles.homeScreen.welcomeText}>
              {t("Hello")} {user?.name || t("welcomeGuest")}
            </AppText>
            <AppText style={styles.homeScreen.subWelcomeText}>
              {t("welcome")}
            </AppText>
          </View>
          <TouchableOpacity
            onPress={handleIconPress}
            style={styles.homeScreen.iconBorder}
          >
            <Ionicons
              name={user ? "person-circle-outline" : "log-in-outline"}
              size={30}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.homeScreen.descriptionContainer}>
        <AppText style={styles.homeScreen.descriptionText}>
          {user?.type === undefined
            ? t("slugDesc")
            : user.type === UserType.student
            ? t("slugDesc")
            : t("slugDescTeacher")}
        </AppText>
      </View>
      {/* Cards Section */}
      <View style={styles.homeScreen.cardsContainer}>
        {user?.type !== UserType.teacher ? (
          <>
            <TouchableOpacity
              style={styles.homeScreen.card}
              onPress={handleBooking}
            >
              <Ionicons name="calendar-outline" size={30} color="#063159" />
              <AppText style={styles.homeScreen.cardText}>
                {t("booknow")}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homeScreen.card}
              onPress={handleComplain}
            >
              <Ionicons name="alert-circle-outline" size={30} color="#063159" />
              <AppText style={styles.homeScreen.cardText}>
                {t("complaint")}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homeScreen.card}
              onPress={handleStudentInquery}
            >
              <Ionicons name="help-circle-outline" size={30} color="#063159" />
              <AppText style={styles.homeScreen.cardText}>
                {t("inquery")}
              </AppText>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.homeScreen.card}
              onPress={handleViewRegistrations}
            >
              <Ionicons name="eye-outline" size={30} color="#063159" />
              <AppText style={styles.homeScreen.cardText}>
                {t("viewRegisterations")}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homeScreen.card}
              onPress={handleAddRegistrations}
            >
              <Ionicons name="add-circle-outline" size={30} color="#063159" />
              <AppText style={styles.homeScreen.cardText}>
                {t("addClass")}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homeScreen.card}
              onPress={handleTeacherInquery}
            >
              <Ionicons name="calendar-outline" size={30} color="#063159" />
              <AppText style={styles.homeScreen.cardText}>
                {t("inquery")}
              </AppText>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Footer logo */}
      <View style={styles.homeScreen.footer}>
        {/* <Image source={Logo} style={styles.homeScreen.logo} /> */}
        <AppText style={styles.homeScreen.footerText}>
          {user?.type === undefined
            ? t("slug")
            : user.type === UserType.student
            ? t("slug")
            : t("slugTeacher")}
        </AppText>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
