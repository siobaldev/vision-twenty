"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="size-8 sm:size-12" />;

  return (
    <button
      aria-label="Theme-Switcher"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <IoMoon className="size-8 cursor-pointer sm:size-12" />
      ) : (
        <IoSunny className="size-8 cursor-pointer sm:size-12" />
      )}
    </button>
  );
}
