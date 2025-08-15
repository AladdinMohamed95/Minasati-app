import { LoadingView } from "@/components/LoadingView";
import { createContext, useContext, useState } from "react";
import { Modal } from "react-native";

type LoadingContextType = {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  showLoading: () => {},
  hideLoading: () => {},
});

export const LoadingProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      <>
        <Modal visible={isLoading} transparent={true} animationType="fade">
          <LoadingView isLoading={isLoading} />
        </Modal>
      </>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
