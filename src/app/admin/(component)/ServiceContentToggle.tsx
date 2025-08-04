import React, { useState } from "react";

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
        console.log("Failed to toggle content type:", errorData);
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
    <div className="flex items-center space-x-3">
      {/* iPhone-style Toggle Switch */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled || isLoading}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          disabled || isLoading
            ? "bg-gray-300 cursor-not-allowed"
            : type === "gallery"
            ? "bg-blue-500"
            : "bg-purple-500"
        }`}>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
            type === "gallery" ? "translate-x-1" : "translate-x-6"
          }`}
        />
      </button>

      {/* Mode Labels */}
      <div className="flex items-center space-x-2 text-sm">
        <span
          className={`transition-colors ${
            type === "gallery" ? "text-blue-600 font-medium" : "text-gray-500"
          }`}>
          📷 Gallery
        </span>
        <span className="text-gray-300">|</span>
        <span
          className={`transition-colors ${
            type === "video" ? "text-purple-600 font-medium" : "text-gray-500"
          }`}>
          🎥 Video
        </span>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-400"></div>
          <span>Updating...</span>
        </div>
      )}
    </div>
  );
};
