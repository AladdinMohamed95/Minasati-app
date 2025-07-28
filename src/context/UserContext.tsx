import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type UserType = "guest" | "student" | "teacher" | "admin";

export type formDataProps = {
  fullName: string;
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
interface User {
  id: string;
  name: string;
  type: UserType;
  token?: string;
  data?: Partial<formDataProps>;
}

interface UserConextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserConextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  const login = async (userData: User) => {
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  const data: UserConextType = {
    user: user,
    login: login,
    logout: logout,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
