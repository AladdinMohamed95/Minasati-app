import {
  BookingItem,
  InqueryRequest,
  InqueryResponse,
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

// export const getTeacherClasses = async (): Promise<TeacherClassesResponse> => {
//   // داتا وهمية للفصول
//   const mockData: TeacherClassesResponse = {
//     data: [
//       {
//         id: 1,
//         name: "رياضيات - الصف الأول الثانوي",
//         academic_year: {
//           id: 1,
//           name: "2024/2025",
//           academic_stage: {
//             id: 1,
//             name: "الصف الأول الثانوي",
//             educational_system: {
//               id: 1,
//               name: "نظام ثانوي عام",
//               description: "تعليم ثانوي عام",
//             },
//           },
//         },
//       },
//       {
//         id: 2,
//         name: "لغة عربية - الصف الثاني الثانوي",
//         academic_year: {
//           id: 2,
//           name: "2024/2025",
//           academic_stage: {
//             id: 2,
//             name: "الصف الثاني الثانوي",
//             educational_system: {
//               id: 1,
//               name: "نظام ثانوي عام",
//               description: "تعليم ثانوي عام",
//             },
//           },
//         },
//       },
//     ],
//   };

//   console.log("Mock getTeacherClasses:", mockData);
//   return mockData;
// };

// export const getTeacherRegistrations =
//   async (): Promise<TeacherRegistrationsResponse> => {
//     // داتا وهمية للتسجيلات الحالية
//     const mockData: TeacherRegistrationsResponse = {
//       data: [
//         {
//           class_id: 1,
//           class_name: "رياضيات - الصف الأول الثانوي",
//           registration_status: "active",
//           class_price: 150,
//           registration_id: 101,
//           currency: "SAR",
//           academic_context: {
//             id: 1,
//             name: "2024/2025",
//             academic_stage: {
//               id: 1,
//               name: "الصف الأول الثانوي",
//               educational_system: {
//                 id: 1,
//                 name: "نظام ثانوي عام",
//                 description: "تعليم ثانوي عام",
//               },
//             },
//           },
//         },
//         {
//           class_id: 2,
//           class_name: "لغة عربية - الصف الثاني الثانوي",
//           registration_status: "pending",
//           class_price: 120,
//           registration_id: 102,
//           currency: "SAR",
//           academic_context: {
//             id: 2,
//             name: "2024/2025",
//             academic_stage: {
//               id: 2,
//               name: "الصف الثاني الثانوي",
//               educational_system: {
//                 id: 1,
//                 name: "نظام ثانوي عام",
//                 description: "تعليم ثانوي عام",
//               },
//             },
//           },
//         },
//       ],
//     };

//     console.log("Mock getTeacherRegistrations:", mockData);
//     return mockData;
//   };

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
  registrationId: number
): Promise<{ message: string }> => {
  const response = await api.delete(
    `/api/teacher/registrations/${registrationId}`
  );

  return response.data as { message: string };
};

export const getTeacherBookings = async (): Promise<BookingItem[]> => {
  const response = await api.get("/api/teacher/bookings");
  return response.data.data as BookingItem[];
};

export const showInqueries = async (): Promise<InqueryResponse[]> => {
  const response = await api.get("/api/teacher/inquiries");
  const payload = response.data;
  return Array.isArray(payload) ? payload : payload?.data ?? [];
};

export const getInqueries = async (params?: any) => {
  const response = await api.get("/api/teacher/inquiries", { params });
  return response.data;
};

export const createInquery = async (
  request: InqueryRequest
): Promise<{ message: string }> => {
  const response = await api.post("/api/teacher/inquiries", { request });
  console.log("create complaint ", response);
  return response.data as { message: string };
};
