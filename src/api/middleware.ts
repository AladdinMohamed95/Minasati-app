import {
  Booking,
  BookingRequest,
  BookingResponse,
  PaginatedResponse,
  StudentProfileRequest,
  StudentProfileResponse,
} from "@/types/api";
import api from ".";

export const getProfile = async (): Promise<StudentProfileResponse> => {
  const response = await api.get("/student/profile");

  const { data } = response.data;
  return data as StudentProfileResponse;
};

export const updateProfile = async (
  request: StudentProfileRequest
): Promise<StudentProfileResponse> => {
  const response = await api.put("/student/profile", request);

  const { data } = response.data;

  return data as StudentProfileResponse;
};

export const getBookings = async (
  page: number = 1
): Promise<PaginatedResponse<Booking>> => {
  const response = await api.get(`/student/bookings?page=${page}`);
  return response.data as PaginatedResponse<Booking>;
};

export const createBooking = async (
  bookingData: BookingRequest
): Promise<BookingResponse> => {
  const response = await api.post("/student/bookings", bookingData);
  return response.data as BookingResponse;
};
