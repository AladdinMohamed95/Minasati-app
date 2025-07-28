import { AppStyles, TypedStyleSheet } from "./style";

export type ModalProps = {
  modalVisible: boolean;
  handleCancel: () => void;
  selectedStage: { id: number; name: string };
  styles: TypedStyleSheet<AppStyles>;
  handleConfirm: (stage: EducationStages) => void;
};

export type EducationStages = {
  id: number;
  name: string;
};
