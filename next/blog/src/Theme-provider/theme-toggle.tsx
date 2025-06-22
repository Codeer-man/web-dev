"use client";

import React, { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme-store";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === "light" && isDarkMode) {
      useThemeStore.setState({ isDarkMode: false });
    } else if (theme === "dark" && !isDarkMode) {
      useThemeStore.setState({ isDarkMode: true });
    }
  }, [theme, isDarkMode]);

  function handleToggle() {
    toggleTheme();
    setTheme(isDarkMode ? "light" : "dark");
  }
  return (
    <Button variant={"ghost"} size={"icon"} onClick={handleToggle}>
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
