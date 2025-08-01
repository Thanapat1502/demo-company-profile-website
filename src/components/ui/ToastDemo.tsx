"use client";

import React from "react";
import { useToast } from "../../hooks/useToast";

const ToastDemo: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleSuccess = () => {
    showSuccess(
      "Success!",
      "Your operation completed successfully.",
      5000
    );
  };

  const handleError = () => {
    showError(
      "Error Occurred",
      "Something went wrong. Please try again.",
      7000
    );
  };

  const handleWarning = () => {
    showWarning(
      "Warning",
      "Please check your input before proceeding.",
      6000
    );
  };

  const handleInfo = () => {
    showInfo(
      "Information",
      "Here's some useful information for you.",
      4000
    );
  };

  const handleApiSuccess = () => {
    // Simulate API success
    setTimeout(() => {
      showSuccess(
        "Data Saved",
        "Your changes have been saved successfully to the database."
      );
    }, 1000);
  };

  const handleApiError = () => {
    // Simulate API error
    setTimeout(() => {
      showError(
        "Network Error",
        "Failed to connect to the server. Please check your internet connection and try again."
      );
    }, 1000);
  };

  const handleValidationError = () => {
    showWarning(
      "Validation Error",
      "Please fill in all required fields before submitting the form."
    );
  };

  const handleMultipleToasts = () => {
    showInfo("Step 1", "Starting process...");
    setTimeout(() => showInfo("Step 2", "Processing data..."), 500);
    setTimeout(() => showInfo("Step 3", "Finalizing..."), 1000);
    setTimeout(() => showSuccess("Complete", "All steps completed successfully!"), 1500);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Toast Notification Demo</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={handleSuccess}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Show Success Toast
        </button>
        
        <button
          onClick={handleError}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Show Error Toast
        </button>
        
        <button
          onClick={handleWarning}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Show Warning Toast
        </button>
        
        <button
          onClick={handleInfo}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Show Info Toast
        </button>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Common Use Cases</h3>
        
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={handleApiSuccess}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-left"
          >
            Simulate API Success (with delay)
          </button>
          
          <button
            onClick={handleApiError}
            className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors text-left"
          >
            Simulate API Error (with delay)
          </button>
          
          <button
            onClick={handleValidationError}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-left"
          >
            Show Validation Error
          </button>
          
          <button
            onClick={handleMultipleToasts}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-left"
          >
            Show Multiple Toasts (sequence)
          </button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Usage Example:</h4>
        <pre className="text-sm text-gray-600 overflow-x-auto">
{`import { useToast } from "@/hooks/useToast";

const MyComponent = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      showSuccess("Saved!", "Data saved successfully");
    } catch (error) {
      showError("Error", "Failed to save data");
    }
  };

  return <button onClick={handleSave}>Save</button>;
};`}
        </pre>
      </div>
    </div>
  );
};

export default ToastDemo;
