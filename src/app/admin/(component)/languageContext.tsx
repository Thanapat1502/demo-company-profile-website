"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "th" | "en";

interface LanguageContextType {
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  defaultLanguage = "th",
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLanguage);

  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === "th" ? "en" : "th"));
  };

  const value: LanguageContextType = {
    currentLanguage,
    setCurrentLanguage,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Language toggle component
interface LanguageToggleButtonProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

export const LanguageToggleButton: React.FC<LanguageToggleButtonProps> = ({
  className = "",
  size = "medium",
}) => {
  const { currentLanguage, toggleLanguage } = useLanguage();

  const sizeClasses = {
    small: "px-2 py-1 text-xs",
    medium: "px-3 py-2 text-sm",
    large: "px-4 py-3 text-base",
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`
        ${sizeClasses[size]}
        bg-gray-100 hover:bg-gray-200 
        border border-gray-300 rounded-md 
        font-medium transition-colors
        flex items-center gap-2
        ${className}
      `}
      title={`Switch to ${currentLanguage === "th" ? "English" : "Thai"}`}
    >
      <span className="text-gray-600">
        {currentLanguage === "th" ? "🇹🇭" : "🇺🇸"}
      </span>
      <span className="uppercase font-mono">
        {currentLanguage}
      </span>
    </button>
  );
};
