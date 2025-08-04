import React, { useState } from "react";
import { ToggleLeft, ToggleRight } from "lucide-react";

interface ServiceContentToggleProps {
  serviceId: string;
  currentType: "gallery" | "video";
  onTypeChange?: (newType: "gallery" | "video") => void;
  disabled?: boolean;
}

export const ServiceContentToggle: React.FC<ServiceContentToggleProps> = ({
  serviceId,
  currentType,
  onTypeChange,
  disabled = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<"gallery" | "video">(currentType);

  const handleToggle = async () => {
    if (disabled || isLoading) return;

    const newType = type === "gallery" ? "video" : "gallery";
    setIsLoading(true);

    try {
      const response = await fetch("/api/service-content/toggle-type", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId,
          type: newType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update content type");
      }

      const result = await response.json();
      
      // Update local state
      setType(newType);
      
      // Call callback if provided
      if (onTypeChange) {
        onTypeChange(newType);
      }

      console.log(`${serviceId} type updated to ${newType}:`, result);
    } catch (error) {
      console.error("Failed to toggle content type:", error);
      alert(`Failed to update ${serviceId}: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={disabled || isLoading}
      className={`flex items-center space-x-1 px-3 py-1 rounded text-xs font-medium transition-colors ${
        disabled || isLoading
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : type === "gallery"
          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
          : "bg-purple-100 text-purple-700 hover:bg-purple-200"
      }`}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
          <span>Updating...</span>
        </>
      ) : type === "gallery" ? (
        <>
          <ToggleLeft size={14} />
          <span>📷 Gallery Mode</span>
        </>
      ) : (
        <>
          <ToggleRight size={14} />
          <span>🎥 Video Mode</span>
        </>
      )}
    </button>
  );
};
