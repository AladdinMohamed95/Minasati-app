export type LoginRequest = {
  phone: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
};

export type RegisterRequest = {
  name: string;
  phone: string;
  password: string;
  password_confirmation: string;
};

export type RegisterResponse = {
  message: string;
  access_token: string;
  token_type: string;
};

export type StudentProfileRequest = RegisterRequest;

export type StudentProfileResponse = {
  id: number;
  name: string;
  phone: string;
  registered_at: string;
};

export type Booking = {
  id: number;
  teacher_id: number;
  class_id: number;
  booking_time: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
};

export type BookingRequest = {
  teacher_id: number;
  class_id: number;
  booking_time: string;
};

export type BookingResponse = {
  message: string;
  errors: {
    teacher_id?: string[];
    class_id?: string[];
    [key: string]: string[] | undefined;
  };
};
