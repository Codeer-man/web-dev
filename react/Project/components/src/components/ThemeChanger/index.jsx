import React, { useEffect } from "react";
import useLocalStorage from "./UseLocalStorage";

export default function ThemeChanger() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  function handleThemeChanger() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition duration-300">
      <div className="text-center p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-white">
        <p className="text-xl font-semibold">Hello World</p>
        <button
          onClick={handleThemeChanger}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 transition duration-300"
        >
          Change Theme
        </button>
      </div>
    </div>
  );
}
