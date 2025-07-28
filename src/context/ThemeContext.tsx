// contexts/ThemeContext.tsx
import { Theme } from "@/types/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { getTheme } from "../theme";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const [isDark, setIsDark] = useState<boolean>(systemColorScheme === "light");

  // Load saved theme preference on app start
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Update theme when system color scheme changes
  useEffect(() => {
    if (themeMode === "system") {
      setIsDark(systemColorScheme === "light");
    }
  }, [systemColorScheme, themeMode]);

  const loadThemePreference = async (): Promise<void> => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme_preference");
      if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
        const theme = savedTheme as ThemeMode;
        setThemeMode(theme);
        if (theme === "light") {
          setIsDark(false);
        } else if (theme === "dark") {
          setIsDark(true);
        } else {
          setIsDark(systemColorScheme === "light");
        }
      }
    } catch (error) {
      console.error("Error loading theme preference:", error);
    }
  };

  const saveThemePreference = async (theme: ThemeMode): Promise<void> => {
    try {
      await AsyncStorage.setItem("theme_preference", theme);
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  const toggleTheme = (): void => {
    const newTheme: ThemeMode = isDark ? "dark" : "light";
    setThemeMode(newTheme);
    setIsDark(!isDark);
    saveThemePreference(newTheme);
  };

  const setTheme = (theme: ThemeMode): void => {
    setThemeMode(theme);
    if (theme === "light") {
      setIsDark(false);
    } else if (theme === "dark") {
      setIsDark(true);
    } else {
      setIsDark(systemColorScheme === "light");
    }
    saveThemePreference(theme);
  };

  const theme = getTheme(isDark);

  const value: ThemeContextType = {
    theme,
    isDark,
    themeMode,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
