import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserType,
} from "@/types/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from ".";

//--------------------------------------------------student
export const studentRegister = async (
  request: RegisterRequest,
  userType: UserType
): Promise<RegisterResponse> => {
  const response = await api.post("/student/register", request);

  const data: RegisterResponse = response.data;
  if (data.access_token) {
    await AsyncStorage.setItem("access_token", data.access_token);
    await AsyncStorage.setItem("token_type", data.token_type);
    await AsyncStorage.setItem("userType", userType);
  }

  return data;
};

export const studentLogin = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post("/student/login", request);

  const data: LoginResponse = response.data;
  if (data.access_token) {
    await AsyncStorage.setItem("access_token", data.access_token);
    await AsyncStorage.setItem("token_type", data.token_type);
  }
  console.log("studentLogin data", JSON.stringify(data));

  return data;
};

export const studentLogout = async (): Promise<string> => {
  const message: string = await api.post("/student/logout");
  await AsyncStorage.multiRemove([
    "access_token",
    "token_type",
    "user",
    "userType",
  ]);
  return message;
};

//--------------------------------------------------teacher
export const teacherRegister = async (
  request: RegisterRequest,
  userType: UserType
): Promise<RegisterResponse> => {
  const response = await api.post("/teacher/register", request);
  console.log("teacher register");
  const data: RegisterResponse = response.data;
  if (data.access_token) {
    await AsyncStorage.setItem("access_token", data.access_token);
    await AsyncStorage.setItem("token_type", data.token_type);
    await AsyncStorage.setItem("userType", userType);
  }
  console.log("data" + JSON.stringify(data));

  return data;
};

export const teacherLogin = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post("/teacher/login", request);
  console.log("teacherLogin response", JSON.stringify(response));
  const data: LoginResponse = response.data;
  if (data.access_token) {
    await AsyncStorage.setItem("access_token", data.access_token);
    await AsyncStorage.setItem("token_type", data.token_type);
  }
  console.log("teacherLogin data", JSON.stringify(data));
  return data;
};

export const teacherLogout = async (): Promise<string> => {
  const message: string = await api.post("/teacher/logout");
  await AsyncStorage.multiRemove([
    "access_token",
    "token_type",
    "user",
    "userType",
  ]);
  return message;
};
