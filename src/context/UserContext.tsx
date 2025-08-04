import { studentLogin, studentLogout } from "@/api/auth";
import { getProfile, updateProfile } from "@/api/middleware";
import { StudentProfileRequest } from "@/types/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type UserType = "guest" | "student" | "teacher" | "admin";

interface User {
  id: number;
  name: string;
  phone: string;
  registered_at: string;
  type: UserType;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isInitializing: boolean;
  login: (phone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (request: StudentProfileRequest) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        setIsInitializing(true);

        const token = await AsyncStorage.getItem("access_token");
        if (!token) {
          setIsInitializing(false);
          return;
        }

        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
          } catch (parseError) {
            console.log("خطأ في تحليل بيانات المستخدم المحفوظة:", parseError);
            await AsyncStorage.removeItem("user");
          }
        }

        try {
          const profile = await getProfile();
          const userData: User = {
            id: profile.id,
            name: profile.name,
            phone: profile.phone,
            registered_at: profile.registered_at,
            type: "student", // Use API response or default
          };

          setUser(userData);
          await AsyncStorage.setItem("user", JSON.stringify(userData));
        } catch (apiError) {
          console.log("فشل تحميل البروفايل:", apiError);
          // Token might be expired or invalid
          await clearStorageAndUser();
        }
      } catch (error) {
        console.log("خطأ في تحميل بيانات المستخدم:", error);
        await clearStorageAndUser();
      } finally {
        setIsInitializing(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const clearStorageAndUser = async () => {
    setUser(null);
    try {
      await AsyncStorage.multiRemove(["access_token", "user"]);
    } catch (error) {
      console.log("خطأ في مسح البيانات المحفوظة:", error);
    }
  };

  const login = async (phone: string, password: string) => {
    if (isLoading) {
      throw new Error("تسجيل الدخول قيد التقدم");
    }

    try {
      setIsLoading(true);

      const loginResponse = await studentLogin({ phone, password });
      console.log("loginResponse: " + JSON.stringify(loginResponse));

      const profile = await getProfile();
      const userData: User = {
        id: profile.id,
        name: profile.name,
        phone: profile.phone,
        registered_at: profile.registered_at,
        type: "student",
      };

      

      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      try {
        await studentLogout();
      } catch (apiError) {
        console.log("خطأ في استدعاء API تسجيل الخروج:", apiError);
      }
    } catch (error) {
      console.log("خطأ في تسجيل الخروج:", error);
    } finally {
      await clearStorageAndUser();
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    if (!user || isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      const profile = await getProfile();
      const userData: User = {
        id: profile.id,
        name: profile.name,
        phone: profile.phone,
        registered_at: profile.registered_at,
        type: user.type, // Fallback to current type
      };

      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.log("فشل تحديث بيانات المستخدم:", error);
      // If refresh fails, might mean token is expired
      await clearStorageAndUser();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (request: StudentProfileRequest) => {
    if (isLoading) {
      throw new Error("تسجيل الدخول قيد التقدم");
    }

    try {
      setIsLoading(true);

      const updateProfileResponse = await updateProfile(request);
      console.log("loginResponse: " + updateProfileResponse);

      const profile = await getProfile();
      const userData: User = {
        id: profile.id,
        name: profile.name,
        phone: profile.phone,
        registered_at: profile.registered_at,
        type: "student",
      };

      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: UserContextType = {
    user,
    isLoading,
    isInitializing,
    login,
    logout,
    refreshUser,
    updateUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
