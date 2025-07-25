"use client";

import { Button } from "@heroui/react";
import { Sun, Moon } from "lucide-react";
import { useAdminTheme } from "@/components/providers/AdminThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAdminTheme();

  return (
    <Button
      isIconOnly
      variant="light"
      onPress={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon size={20} className="text-gray-600" />
      ) : (
        <Sun size={20} className="text-yellow-500" />
      )}
    </Button>
  );
}
