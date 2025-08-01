// Re-export the useToast hook for easier imports
export { useToast } from "../components/ui/ToastContainer";

// Additional utility functions for common toast patterns
export const createToastHelpers = () => {
  // This can be extended with more specific toast patterns
  return {
    // API response handlers
    handleApiSuccess: (message: string = "Operation completed successfully") => ({
      title: "Success",
      message,
      type: "success" as const,
    }),
    
    handleApiError: (error: unknown, fallbackMessage: string = "An error occurred") => ({
      title: "Error",
      message: error instanceof Error ? error.message : fallbackMessage,
      type: "error" as const,
    }),
    
    // Form validation
    handleValidationError: (message: string = "Please check your input") => ({
      title: "Validation Error",
      message,
      type: "warning" as const,
    }),
    
    // Loading states
    handleLoadingComplete: (message: string = "Data loaded successfully") => ({
      title: "Complete",
      message,
      type: "info" as const,
    }),
  };
};
