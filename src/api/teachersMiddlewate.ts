import {
  RegistrationItem,
  RegistrationRequest,
  TeacherBookingsResponse,
  TeacherClassesResponse,
  TeacherProfileRequest,
  TeacherProfileResponse,
  TeacherRegistrationsResponse,
} from "@/types/api";
import api from ".";

export const getProfile = async (): Promise<TeacherProfileResponse> => {
  const response = await api.get("/teacher/profile");

  const { data } = response.data;
  return data as TeacherProfileResponse;
};

export const updateProfile = async (
  request: TeacherProfileRequest
): Promise<TeacherProfileResponse> => {
  const response = await api.put("/teacher/profile", request);

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

  const response = await api.post("/teacher/profile/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data; // وليكن { image_url: "..." }
};

export const getTeacherClasses = async (): Promise<TeacherClassesResponse> => {
  const response = await api.get("/teacher/classes");

  return response.data as TeacherClassesResponse;
};

export const getTeacherRegistrations =
  async (): Promise<TeacherRegistrationsResponse> => {
    const response = await api.get("/teacher/registrations");

    return response.data as TeacherRegistrationsResponse;
  };

export const updateTeacherRegistrationPrice = async (
  registrationId: number,
  request: RegistrationRequest
): Promise<RegistrationItem> => {
  const response = await api.put(
    `/teacher/registrations/${registrationId}`,
    request
  );

  const { data } = response.data;
  return data as RegistrationItem;
};

export const deleteTeacherRegistration = async (
  registrationId: number,
  request: RegistrationRequest
): Promise<{ message: string }> => {
  const response = await api.delete(
    `/teacher/registrations/${registrationId}`,
    {
      data: request, // axios يسمح بإرسال body في delete من خلال config.data
    }
  );

  return response.data as { message: string };
};

export const getTeacherBookings =
  async (): Promise<TeacherBookingsResponse> => {
    const response = await api.get("/teacher/bookings");

    return response.data as TeacherBookingsResponse;
  };
