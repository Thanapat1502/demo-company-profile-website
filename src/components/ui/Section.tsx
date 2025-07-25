"use client";

import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  background?: "white" | "gray" | "dark" | "gradient" | "transparent";
  padding?: "sm" | "md" | "lg" | "xl" | "none";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  id?: string;
}

const backgroundClasses = {
  white: "bg-white dark:bg-gray-50",
  gray: "bg-gray-50 dark:bg-gray-800",
  dark: "bg-gray-900 dark:bg-gray-950",
  gradient: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800",
  transparent: "bg-transparent",
};

const paddingClasses = {
  none: "",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-20",
  xl: "py-20 md:py-24",
};

const maxWidthClasses = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-8xl",
  full: "max-w-full",
};

export default function Section({
  children,
  className = "",
  containerClassName = "",
  background = "transparent",
  padding = "lg",
  maxWidth = "xl",
  id,
}: SectionProps) {
  return (
    <section 
      id={id}
      className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}
    >
      <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
