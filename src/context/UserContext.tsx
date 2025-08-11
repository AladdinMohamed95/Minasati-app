import {
  studentLogin,
  studentLogout,
  teacherLogin,
  teacherLogout,
} from "@/api/auth";
import {
  getProfile as getStudentProfile,
  updateProfile as updateStudentProfile,
} from "@/api/studentsMiddleware.api";
import { getProfile as getTeacherProfile } from "@/api/teachersMiddleware.api";
import { LoadingView } from "@/components/LoadingView";
import { LoginResponse, RegisterRequest, UserType } from "@/types/api";
import { User } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isInitializing: boolean;
  login: (
    phone: string,
    password: string,
    userType: UserType
  ) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (request: RegisterRequest) => Promise<void>;
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
        const storedType = await AsyncStorage.getItem("userType");

        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            userData.type =
              storedType &&
              Object.values(UserType).includes(storedType as UserType)
                ? (storedType as UserType)
                : UserType.student;
            setUser(userData);
          } catch (parseError) {
            console.log("خطأ في تحليل بيانات المستخدم المحفوظة:", parseError);
            await AsyncStorage.multiRemove(["user", "userType"]);
          }
        }

        try {
          const userType = (storedType as UserType) || UserType.student;
          if (userType === UserType.student) {
            const profile = await getStudentProfile();

            const userData: User = {
              id: profile.id,
              name: profile.name,
              phone: profile.phone,
              registered_at: profile.registered_at,
              type: userType,
            };

            setUser(userData);
            await AsyncStorage.setItem("user", JSON.stringify(userData));
          } else {
            const profile = await getTeacherProfile();

            const userData: User = {
              id: profile.id,
              name: profile.name,
              phone: profile.phone,
              registered_at: profile.created_at,
              type: userType,
              updated_at: profile.updated_at,
            };

            setUser(userData);
            await AsyncStorage.setItem("user", JSON.stringify(userData));
          }
        } catch (apiError) {
          console.log("فشل تحميل الملف الشخصي:", apiError);
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
      await AsyncStorage.multiRemove(["access_token", "user", "userType"]); // تغيير من user_type إلى userType
    } catch (error) {
      console.log("خطأ في مسح البيانات المحفوظة:", error);
    }
  };

  const login = async (
    phone: string,
    password: string,
    userType: UserType
  ): Promise<LoginResponse> => {
    if (isLoading) {
      throw new Error("تسجيل الدخول قيد التقدم");
    }

    let response: LoginResponse;

    try {
      setIsLoading(true);

      if (userType === UserType.student) {
        response = await studentLogin({ phone, password });
      } else {
        response = await teacherLogin({ phone, password });
      }

      if (!response) {
        throw new Error("لم يتم استلام استجابة من الخادم");
      }

      if (!response?.access_token) {
        return {
          ...response,
          message: response.message || "بيانات تسجيل الدخول غير صحيحة",
        };
      }

      await AsyncStorage.setItem("access_token", response.access_token);
      await AsyncStorage.setItem("userType", userType);

      try {
        if (userType === UserType.student) {
          const profile = await getStudentProfile();
          const userData: User = {
            id: profile.id,
            name: profile.name,
            phone: profile.phone,
            registered_at: profile.registered_at,
            type: userType,
          };

          setUser(userData);
          await AsyncStorage.setItem("user", JSON.stringify(userData));
        } else {
          const profile = await getTeacherProfile();
          const userData: User = {
            id: profile.id,
            name: profile.name,
            phone: profile.phone,
            registered_at: profile.created_at,
            type: userType,
          };

          setUser(userData);
          await AsyncStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (profileError) {
        console.log("خطأ في جلب الملف الشخصي:", profileError);
        // مسح البيانات المحفوظة إذا فشل جلب الملف الشخصي
        await clearStorageAndUser();
        throw new Error("فشل في جلب بيانات المستخدم");
      }

      return response;
    } catch (error: any) {
      console.log("خطأ في تسجيل الدخول:", error);

      await clearStorageAndUser();

      if (error?.response?.status === 401) {
        throw new Error("بيانات تسجيل الدخول غير صحيحة");
      } else if (error?.response?.status === 422) {
        throw new Error("تنسيق البيانات غير صحيح");
      } else if (error?.response?.status >= 500) {
        throw new Error("خطأ في الخادم، حاول مرة أخرى لاحقاً");
      } else if (error?.message) {
        throw error;
      } else {
        throw new Error("حدث خطأ غير متوقع أثناء تسجيل الدخول");
      }
    } finally {
      setIsLoading(false);
      await refreshUser();
    }
  };

  const logout = async () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      try {
        // استخدام دالة تسجيل الخروج المناسبة حسب نوع المستخدم
        if (user?.type === UserType.student) {
          await studentLogout();
        } else {
          await teacherLogout();
        }
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
      if (user?.type === UserType.student) {
        const profile = await getStudentProfile();

        const userData: User = {
          id: profile.id,
          name: profile.name,
          phone: profile.phone,
          registered_at: profile.registered_at,
          type: user?.type,
        };

        setUser(userData);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
      } else {
        const profile = await getTeacherProfile();

        const userData: User = {
          id: profile.id,
          name: profile.name,
          phone: profile.phone,
          registered_at: profile.created_at,
          type: user?.type,
        };

        setUser(userData);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error) {
      console.log("فشل تحديث بيانات المستخدم:", error);
      // If refresh fails, might mean token is expired
      await clearStorageAndUser();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (request: RegisterRequest) => {
    if (isLoading || !user) {
      throw new Error("تسجيل الدخول قيد التقدم");
    }

    try {
      setIsLoading(true);

      // استخدام دالة التحديث المناسبة حسب نوع المستخدم
      if (user.type === UserType.student) {
        await updateStudentProfile(request);
      }
      // إضافة updateTeacherProfile لاحقاً إذا كان متوفر
      // else {
      //   await updateTeacherProfile(request);
      // }

      // جلب الملف الشخصي المحدث
      const profile =
        user.type === UserType.student
          ? await getStudentProfile()
          : await getTeacherProfile();

      const userData: User = {
        id: profile.id,
        name: profile.name,
        phone: profile.phone,
        type: user.type,
      };

      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return <LoadingView isLoading={isInitializing} />;
  }

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
