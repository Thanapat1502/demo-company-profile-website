"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

export type NotificationType = "success" | "error" | "warning" | "info";

export interface NotificationProps {
  type: NotificationType;
  title: string;
  message?: string;
  isVisible: boolean;
  onDismiss: () => void;
  autoHide?: boolean;
  duration?: number;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colorMap = {
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "text-green-600",
    title: "text-green-800",
    message: "text-green-700",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "text-red-600",
    title: "text-red-800",
    message: "text-red-700",
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: "text-yellow-600",
    title: "text-yellow-800",
    message: "text-yellow-700",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-600",
    title: "text-blue-800",
    message: "text-blue-700",
  },
};

export const AdminNotification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  isVisible,
  onDismiss,
  autoHide = true,
  duration = 5000,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      if (autoHide) {
        const timer = setTimeout(() => {
          handleDismiss();
        }, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, autoHide, duration]);

  const handleDismiss = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onDismiss();
    }, 300);
  };

  if (!isVisible) return null;

  const Icon = iconMap[type];
  const colors = colorMap[type];

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md w-full transition-all duration-300 ease-in-out ${
        isAnimating
          ? "transform translate-x-0 opacity-100"
          : "transform translate-x-full opacity-0"
      }`}>
      <div
        className={`${colors.bg} ${colors.border} border rounded-lg shadow-lg p-4`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={`h-5 w-5 ${colors.icon}`} />
          </div>
          <div className="ml-3 flex-1">
            <h3 className={`text-sm font-medium ${colors.title}`}>{title}</h3>
            {message && (
              <p className={`mt-1 text-sm ${colors.message}`}>{message}</p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={handleDismiss}
              className={`inline-flex rounded-md ${colors.bg} ${colors.title} hover:${colors.message} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${colors.bg} focus:ring-${colors.icon}`}>
              <span className="sr-only">ปิด</span>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hook for managing notifications
export const useAdminNotification = () => {
  const [notification, setNotification] = useState<{
    type: NotificationType;
    title: string;
    message?: string;
    isVisible: boolean;
  } | null>(null);

  const showNotification = (
    type: NotificationType,
    title: string,
    message?: string
  ) => {
    setNotification({
      type,
      title,
      message,
      isVisible: true,
    });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const showSuccess = (title: string, message?: string) =>
    showNotification("success", title, message);
  const showError = (title: string, message?: string) =>
    showNotification("error", title, message);
  const showWarning = (title: string, message?: string) =>
    showNotification("warning", title, message);
  const showInfo = (title: string, message?: string) =>
    showNotification("info", title, message);

  return {
    notification,
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
