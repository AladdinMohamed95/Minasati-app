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
