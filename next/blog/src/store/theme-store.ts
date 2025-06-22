"use client";

interface ThemState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create<ThemState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "theme-storage",
    }
  )
);
