export enum UserType {
  "guest" = "GUEST",
  "student" = "STUDENT",
  "teacher" = "TEACHER",
  "admin" = "ADMIN",
}

export type LoginRequest = {
  phone: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
  message?: string;
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
//-----------------------------------
export type StudentProfileResponse = {
  id: number;
  name: string;
  phone: string;
  registered_at: string;
};

//-----------------------------------
export interface Booking {
  booking_id: number;
  status: string;
  booking_time: string;
  teacher: Teacher;
  class_details: ClassItem;
  created_at: string;
}

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

//-----------------------------------

export interface TeacherAvailableClasses {
  id: number;
  name: string;
  academic_year_id: number;
  created_at: string;
  updated_at: string;
  pivot: {
    teacher_id: number;
    class_id: number;
    id: number;
    status: string;
    class_price: number;
    created_at: string;
    updated_at: string;
  };
  academic_year: {
    id: number;
    name: string;
    academic_stage_id: number;
    created_at: string;
    updated_at: string;
    academic_stage: {
      id: number;
      name: string;
      educational_system_id: number;
      created_at: string;
      updated_at: string;
      educational_system: {
        id: number;
        name: string;
        description: string;
        created_at: string;
        updated_at: string;
      };
    };
  };
}
export interface TeacherProfileRequest {
  name: string;
  phone2: string;
  current_workplace: string;
  work_title: string;
  country: string;
  desc: string;
  years_of_experience: number;
  is_online: boolean; // 1 or 0
  is_offline: boolean; // 1 or 0
  specialization: string;
  national_id_egypt: string;
  residence_number_outside_egypt: string;
  home_address: string;
  work_address: string;
  password: string;
  password_confirmation: string;
}
export interface TeacherProfileResponse {
  id: number;
  name: string;
  phone: string;
  is_confirmed: boolean;
  image_url: string;
  profile: {
    workplace: string;
    title: string;
    specialization: string;
    experience_years: number;
    description: string;
    country: string;
  };
  availability: {
    online: boolean;
    offline: boolean;
  };
  classes: TeacherAvailableClasses[];
  created_at: string;
  updated_at: string;
}
export interface TeacherClassesResponse {
  data: ClassItem[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}
//-----------------------------------

export interface EducationalSystem {
  id: number;
  name: string;
  description: string;
}

export interface AcademicStage {
  id: number;
  name: string;
  educational_system: EducationalSystem;
}

export interface AcademicYear {
  id: number;
  name: string;
  academic_stage: AcademicStage;
}

export interface ClassItem {
  id: number;
  name: string;
  academic_year: AcademicYear;
}

export interface Teacher {
  id: number;
  name: string;
  phone: string;
  is_confirmed: boolean;
  image_url: string;
  profile: {
    workplace: string | null;
    title: string | null;
    specialization: string;
    experience_years: number;
    description: string | null;
    country: string;
  };
  availability: {
    online: boolean;
    offline: boolean;
  };
  classes: TeacherAvailableClasses[];
}
//-----------------------------------

export interface TeacherRegistrationsResponse {
  data: RegistrationItem[];
}

export interface RegistrationItem {
  class_id: number;
  class_name: string;
  registration_status: string;
  class_price: number;
  registration_id: number;
  academic_context: AcademicYear;
}

export interface RegistrationRequest {
  class_price: number;
}
//-----------------------------------

export interface TeacherBookingsResponse {
  data: BookingItem[];
}

export interface BookingItem {
  booking_id: number;
  status: string; // e.g. "confirmed", "pending"
  booking_time: string; // datetime
  student: Student;
  class_details: ClassItem;
  created_at: string;
}

export interface Student {
  id: number;
  name: string;
  phone: string;
  registered_at: string;
}

export interface PendingRegistration {
  id: string;
  class_id: number;
  class_name: string;
  class_price: string;
}

export interface MultiRegistrationRequest {
  registrations: {
    class_id: number;
    class_price: number;
  }[];
}

export interface SingleRegistrationRequest {
  class_price: number;
}
