"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Slide in animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Match animation duration
  };

  const getToastStyles = () => {
    const baseStyles = "flex items-start gap-3 p-4 rounded-lg shadow-lg border-l-4 bg-white min-w-80 max-w-md";
    
    switch (type) {
      case "success":
        return `${baseStyles} border-l-green-500`;
      case "error":
        return `${baseStyles} border-l-red-500`;
      case "warning":
        return `${baseStyles} border-l-yellow-500`;
      case "info":
        return `${baseStyles} border-l-blue-500`;
      default:
        return `${baseStyles} border-l-gray-500`;
    }
  };

  const getIcon = () => {
    const iconProps = { size: 20 };
    
    switch (type) {
      case "success":
        return <CheckCircle {...iconProps} className="text-green-500 flex-shrink-0 mt-0.5" />;
      case "error":
        return <XCircle {...iconProps} className="text-red-500 flex-shrink-0 mt-0.5" />;
      case "warning":
        return <AlertCircle {...iconProps} className="text-yellow-500 flex-shrink-0 mt-0.5" />;
      case "info":
        return <Info {...iconProps} className="text-blue-500 flex-shrink-0 mt-0.5" />;
      default:
        return <Info {...iconProps} className="text-gray-500 flex-shrink-0 mt-0.5" />;
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "warning":
        return "text-yellow-800";
      case "info":
        return "text-blue-800";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        isVisible && !isLeaving
          ? "translate-y-0 opacity-100"
          : "translate-y-[-100%] opacity-0"
      }`}
    >
      <div className={getToastStyles()}>
        {getIcon()}
        
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium text-sm ${getTitleColor()}`}>
            {title}
          </h4>
          {message && (
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              {message}
            </p>
          )}
        </div>

        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 mt-0.5"
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
