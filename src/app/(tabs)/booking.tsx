import { useUser } from "@/context/UserContext";
import { Text, View } from "react-native";

export default function BookingScreen() {
  const { user } = useUser();
  return (
    <View>
      <Text>Hello from BookingScreen Screen {user?.name}</Text>
    </View>
  );
}
