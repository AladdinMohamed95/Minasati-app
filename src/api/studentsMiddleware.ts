import {
  Booking,
  BookingRequest,
  BookingResponse,
  RegisterRequest,
  StudentProfileResponse,
} from "@/types/api";
import api from ".";

export const getProfile = async (): Promise<StudentProfileResponse> => {
  const response = await api.get("/student/profile");

  const { data } = response.data;
  return data as StudentProfileResponse;
};

export const updateProfile = async (
  request: RegisterRequest
): Promise<StudentProfileResponse> => {
  const response = await api.put("/student/profile", request);

  const { data } = response.data;

  return data as StudentProfileResponse;
};

export const getBookings = async (): Promise<Booking[]> => {
  const response = await api.get("/student/bookings");
  console.log("bookings response:", response.data);
  return response.data.data as Booking[]; // <-- استخدم .data.data
};

export const createBooking = async (
  bookingData: BookingRequest
): Promise<BookingResponse> => {
  console.log("Booking Data:", bookingData);
  const response = await api.post("/student/bookings", bookingData);
  return response.data as BookingResponse;
};

export const deleteBooking = async (
  bookingId: number
): Promise<{ message: string }> => {
  const response = await api.delete(`/student/bookings/${bookingId}`);
  return response.data as { message: string };
};

export interface Teacher {
  id: number;
  name: string;
  phone: string;
  email?: string;
}

export const getTeachers = async (
  classId: number,
  mode: string
): Promise<Teacher[]> => {
  const response = await api.get("/student/teachers", {
    params: {
      class_id: classId,
      mode: mode,
    },
  });

  return response.data.data as Teacher[];
};
