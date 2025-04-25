"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Sun from "/public/assets/light-mode.svg";
import Moon from "/public/assets/dark-mode.svg";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? (
        <Moon className="size-8 sm:size-12" />
      ) : (
        <Sun className="size-8 sm:size-12" />
      )}
    </button>
  );
}
