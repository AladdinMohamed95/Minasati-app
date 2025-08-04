import {
  LoginRequest,
  LoginResponse,
  RegisterResponse,
  StudentProfileRequest,
} from "@/types/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from ".";

export const studentRegister = async (
  request: StudentProfileRequest
): Promise<RegisterResponse> => {
  const response = await api.post("/student/register", request);

  const data: RegisterResponse = response.data;
  if (data.access_token) {
    await AsyncStorage.setItem("access_token", data.access_token);
    await AsyncStorage.setItem("token_type", data.token_type);
  }

  return data;
};

export const studentLogin = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post("/student/login", request);

  const data: LoginResponse = response.data;
  console.log("from login", JSON.stringify(data));
  if (data.access_token) {
    await AsyncStorage.setItem("access_token", data.access_token);
    await AsyncStorage.setItem("token_type", data.token_type);
  }

  return data;
};

export const studentLogout = async (): Promise<string> => {
  const message: string = await api.post("/student/logout");
  await AsyncStorage.multiRemove(["access_token", "token_type", "user"]);
  return message;
};
