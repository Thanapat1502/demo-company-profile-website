"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import Toast, { ToastType, ToastProps } from "./Toast";

interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastData, "id">) => void;
  showSuccess: (title: string, message?: string, duration?: number) => void;
  showError: (title: string, message?: string, duration?: number) => void;
  showWarning: (title: string, message?: string, duration?: number) => void;
  showInfo: (title: string, message?: string, duration?: number) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
  position?: "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 5,
  position = "top-right",
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const generateId = () => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const showToast = useCallback((toast: Omit<ToastData, "id">) => {
    const id = generateId();
    const newToast: ToastData = { ...toast, id };

    setToasts((prevToasts) => {
      const updatedToasts = [newToast, ...prevToasts];
      // Limit the number of toasts
      return updatedToasts.slice(0, maxToasts);
    });
  }, [maxToasts]);

  const showSuccess = useCallback((title: string, message?: string, duration?: number) => {
    showToast({ type: "success", title, message, duration });
  }, [showToast]);

  const showError = useCallback((title: string, message?: string, duration?: number) => {
    showToast({ type: "error", title, message, duration });
  }, [showToast]);

  const showWarning = useCallback((title: string, message?: string, duration?: number) => {
    showToast({ type: "warning", title, message, duration });
  }, [showToast]);

  const showInfo = useCallback((title: string, message?: string, duration?: number) => {
    showToast({ type: "info", title, message, duration });
  }, [showToast]);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case "top-right":
        return "fixed top-4 right-4 z-50";
      case "top-left":
        return "fixed top-4 left-4 z-50";
      case "top-center":
        return "fixed top-4 left-1/2 transform -translate-x-1/2 z-50";
      case "bottom-right":
        return "fixed bottom-4 right-4 z-50";
      case "bottom-left":
        return "fixed bottom-4 left-4 z-50";
      case "bottom-center":
        return "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50";
      default:
        return "fixed top-4 right-4 z-50";
    }
  };

  const contextValue: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeToast,
    clearAllToasts,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      
      {/* Toast Container */}
      <div className={getPositionClasses()}>
        <div className="flex flex-col gap-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              type={toast.type}
              title={toast.title}
              message={toast.message}
              duration={toast.duration}
              onClose={removeToast}
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
