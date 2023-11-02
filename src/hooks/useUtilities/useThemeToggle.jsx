import { useState, useEffect } from "react";

export default function useThemeToggle() {
  const isPreferenceDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const savedTheme = localStorage.getItem("theme");
  const systemTheme = isPreferenceDarkMode ? "dark" : "light";

  const [mode, setMode] = useState(savedTheme || systemTheme);

  const toggleMode = (event) => {
    // event.target.checked = isPreferenceDarkMode;
    const newMode = event.target.checked ? "light" : "dark";
    setMode(newMode);

    localStorage.setItem("theme", newMode);
    localStorage.setItem("data-theme", newMode);
  };

  const htmlRef = document.documentElement.classList;

  useEffect(() => {
    localStorage.setItem("theme", mode);
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("data-theme"),
    );
  }, [mode]);

  htmlRef.toggle("dark", mode === "dark");

  return { mode, toggleMode };
}
