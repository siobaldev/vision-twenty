"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="size-16 sm:size-20 md:size-24" />;

  return (
    <Image
      className="size-16 sm:size-20 md:size-24"
      src={
        theme === "light"
          ? "/assets/vision-twenty-light-logo.svg"
          : "/assets/vision-twenty-dark-logo.svg"
      }
      height={100}
      width={100}
      alt="vision-twenty-logo"
    />
  );
}
