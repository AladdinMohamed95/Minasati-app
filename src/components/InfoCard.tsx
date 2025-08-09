import { useTheme } from "@/context/ThemeContext";
import { createStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import AppText from "./AppText";

export const InfoCard = ({ icon, title, value, iconColor = "#4F46E5" }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.teacherInfoModalStyles.infoCard}>
      <View
        style={[
          styles.teacherInfoModalStyles.iconContainer,
          { backgroundColor: iconColor + "20" },
        ]}
      >
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <View style={styles.teacherInfoModalStyles.infoContent}>
        <AppText style={styles.teacherInfoModalStyles.infoTitle}>
          {title}
        </AppText>
        <AppText style={styles.teacherInfoModalStyles.infoValue}>
          {value}
        </AppText>
      </View>
    </View>
  );
};
