import {
  Booking,
  BookingRequest,
  BookingResponse,
  ComplaintRequest,
  ComplaintResponse,
  RegisterRequest,
  StudentProfileResponse,
  Teacher,
} from "@/types/api";
import api from ".";

export const getProfile = async (): Promise<StudentProfileResponse> => {
  const response = await api.get("/api/student/profile");

  const { data } = response.data;
  return data as StudentProfileResponse;
};

export const updateProfile = async (
  request: RegisterRequest
): Promise<StudentProfileResponse> => {
  const response = await api.put("/api/student/profile", request);

  const { data } = response.data;

  return data as StudentProfileResponse;
};

export const getBookings = async (): Promise<Booking[]> => {
  const response = await api.get("/api/student/bookings");
  return response.data.data as Booking[]; // <-- استخدم .data.data
};

export const createBooking = async (
  bookingData: BookingRequest
): Promise<BookingResponse> => {
  try {
    console.log("Booking Data:", bookingData);
    console.log("API Headers:", api.defaults.headers);

    const response = await api.post("/api/student/bookings", bookingData);
    console.log("Booking Success:", response.data);
    return response.data as BookingResponse;
  } catch (error: any) {
    console.error("API Error Details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      config: error.config,
    });
    throw error;
  }
};

export const updateBooking = async (bookingId, bookingData) => {
  try {
    const response = await api.put(
      `/student/bookings/${bookingId}`,
      bookingData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

export const deleteBooking = async (
  bookingId: number
): Promise<{ message: string }> => {
  const response = await api.delete(`/api/student/bookings/${bookingId}`);
  return response.data as { message: string };
};
// export const showComplaints = async (): Promise<ComplaintResponse[]> => {
//   const response = await api.get("/api/student/complaints");
//   return response.data;
// };
export const showComplaints = async (): Promise<ComplaintResponse[]> => {
  const response = await api.get("/api/student/complaints");
  const payload = response.data;
  return Array.isArray(payload) ? payload : payload?.data ?? [];
};

export const getComplaints = async (params?: any) => {
  const response = await api.get("/api/student/complaints", { params });
  return response.data;
};

export const createComplaint = async (
  request: ComplaintRequest
): Promise<{ message: string }> => {
  const response = await api.post("/api/student/complaints", { request });
  console.log("create complaint ", response);
  return response.data as { message: string };
};

export const getTeachers = async (
  classId: number,
  mode: string
): Promise<Teacher[]> => {
  const response = await api.get("/api/student/teachers", {
    params: {
      class_id: classId,
      mode: mode,
    },
  });

  return response.data.data as Teacher[];
};
