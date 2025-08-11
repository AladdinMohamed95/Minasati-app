import {
  BookingItem,
  MultiRegistrationRequest,
  RegistrationItem,
  RegistrationRequest,
  SingleRegistrationRequest,
  TeacherClassesResponse,
  TeacherProfileRequest,
  TeacherProfileResponse,
  TeacherRegistrationsResponse,
} from "@/types/api";
import api from ".";

export const getProfile = async (): Promise<TeacherProfileResponse> => {
  const response = await api.get("/api/teacher/profile");

  const { data } = response.data;
  return data as TeacherProfileResponse;
};

export const updateProfile = async (
  request: TeacherProfileRequest
): Promise<TeacherProfileResponse> => {
  const response = await api.put("/api/teacher/profile", request);

  const { data } = response.data;

  return data as TeacherProfileResponse;
};

export const uploadTeacherProfileImage = async (
  imageUri: string
): Promise<{ image_url: string }> => {
  const formData = new FormData();

  formData.append("image", {
    uri: imageUri,
    name: "profile.jpg",
    type: "image/jpeg",
  } as any);

  const response = await api.post("/api/teacher/profile/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data; // وليكن { image_url: "..." }
};

export const getTeacherClasses = async (): Promise<TeacherClassesResponse> => {
  const response = await api.get("/api/teacher/classes");
  console.log("getTeacherClasses: " + response.data.data);
  return response.data as TeacherClassesResponse;
};

export const getTeacherRegistrations =
  async (): Promise<TeacherRegistrationsResponse> => {
    const response = await api.get("/api/teacher/registrations");
    console.log("getTeacherRegistrations: " + response.data);
    return response.data as TeacherRegistrationsResponse;
  };

export const updateTeacherRegistrationPrice = async (
  registrationId: number,
  request: RegistrationRequest
): Promise<RegistrationItem> => {
  const response = await api.put(
    `/api/teacher/registrations/${registrationId}`,
    request
  );

  const { data } = response.data;
  return data as RegistrationItem;
};

export const TeacherMultipleRegistrations = async (
  request: MultiRegistrationRequest
): Promise<string> => {
  const response = await api.post("/api/teacher/classes/register", request);
  console.log("TeacherMultipleRegistrations", response.data);
  const { data } = response.data;
  return data as string;
};

export const TeacherSingleRegistration = async (
  request: SingleRegistrationRequest,
  classId: number
): Promise<string> => {
  const response = await api.post(
    `/api/teacher/classes/${classId}/register`,
    request
  );

  const { data } = response.data;
  return data as string;
};

export const deleteTeacherRegistration = async (
  registrationId: number,
  request: RegistrationRequest
): Promise<{ message: string }> => {
  const response = await api.delete(
    `/api/teacher/registrations/${registrationId}`,
    {
      data: request, // axios يسمح بإرسال body في delete من خلال config.data
    }
  );

  return response.data as { message: string };
};

export const getTeacherBookings = async (): Promise<BookingItem[]> => {
  const response = await api.get("/api/teacher/bookings");
  return response.data.data as BookingItem[];
};
