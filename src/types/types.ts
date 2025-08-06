import { UserType } from "./api";

export interface User {
  id: number;
  name: string;
  phone: string;
  registered_at?: string;
  type: UserType;
  updated_at?: string;
}

export type formDataProps = {
  name: string;
  phone: string;
  password: string;
  password_confirmation: string;
  specialization: string;
  qualification: string;
  yearsExperience: string;
  currentWorkplace: string;
  workAddress: string;
  homeAddress: string;
  phoneNumber: string;
  alternatePhone: string;
  nationalIdEgypt: string;
  residenceIdAbroad: string;
  identification: string;
  dateOfBirth: string;
  parentPhone: string;
  email: string;
  address: string;
  educationLevel: string;
  school: string;
};

export type ModalProps = {
  modalVisible: boolean;
  handleCancel: () => void;
  selectedStage: { id: number; name: string };
  handleConfirm: (stage: EducationStages) => void;
};

export type EducationStages = {
  id: number;
  name: string;
};

export type TeacherDataProps = {
  id: number;
  name: string;
  bio: string;
  specialization: string;
  studyMaterial: string[];
  rating: number;
  students: number;
  image: string;
};

export type MaterialDataProps = {
  id: number;
  title: string;
  description: string;
  icon: string;
  courses: number;
  duration: string;
  level: string;
};
