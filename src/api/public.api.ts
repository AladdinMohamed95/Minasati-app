import {
  AcademicStage,
  AcademicYear,
  ClassItem,
  EducationalSystem,
  Teacher,
} from "@/types/api";
import api from ".";

export const getEducationalSystems = async (params?: {
  ids?: string;
  names?: string;
}): Promise<EducationalSystem[]> => {
  const response = await api.get("/api/public/educational-systems", { params });
  console.log("getEducationalSystems: ", JSON.stringify(response.data.data));
  console.log("-----------------------------------------------------------");

  return response.data.data;
};

export const getAcademicStages = async (params: {
  ids?: string;
  educational_system_id?: string;
}): Promise<AcademicStage[]> => {
  const response = await api.get("/api/public/academic-stages", { params });
  console.log("getAcademicStages: ", JSON.stringify(response.data.data));
  console.log("-----------------------------------------------------------");

  return response.data.data;
};

export const getAcademicYears = async (params: {
  ids?: string;
  academic_stage_id?: string;
  names?: string;
}): Promise<AcademicYear[]> => {
  const response = await api.get("/api/public/academic-years", { params });
  console.log("getAcademicYears: ", JSON.stringify(response.data.data));
  console.log("-----------------------------------------------------------");

  return response.data.data;
};

export const getClasses = async (params: {
  ids?: string;
  academic_year_id?: string;
  names?: string;
}): Promise<ClassItem[]> => {
  const response = await api.get("/api/public/classes", { params });
  console.log("getClasses: ", JSON.stringify(response.data.data));
  console.log("-----------------------------------------------------------");

  return response.data.data;
};

export const getTeachers = async (params: {
  class_ids?: string;
  mode?: string;
  specialization?: string;
  teacher_name?: string;
}): Promise<Teacher[]> => {
  const response = await api.get("/api/public/teachers", { params });
  console.log("getTeachers: ", response.data.data);
  console.log("-----------------------------------------------------------");

  return response.data.data;
};
