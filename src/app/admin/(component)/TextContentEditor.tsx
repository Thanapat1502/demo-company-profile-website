import React from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import { X, Check, RotateCcw } from "lucide-react";

/**
 * TextContentEditor - A reusable component for editing text content with form validation
 *
 * Features:
 * - Integrates with react-hook-form
 * - Supports validation and error display
 * - Optional action buttons (save, cancel, reset)
 * - Configurable rows, placeholder, and styling
 * - Shows unsaved changes indicator
 *
 * @example
 * <TextContentEditor
 *   control={control}
 *   name="text"
 *   label="Description"
 *   required={true}
 *   onSubmit={handleSave}
 *   onCancel={handleCancel}
 *   hasChanges={isDirty}
 * />
 */

interface TextContentEditorProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  error?: FieldError;
  onCancel?: () => void;
  onReset?: () => void;
  onSubmit?: () => void;
  hasChanges?: boolean;
  loading?: boolean;
  showActions?: boolean;
  className?: string;
}

export const TextContentEditor: React.FC<TextContentEditorProps> = ({
  control,
  name,
  label = "Text Content",
  placeholder = "Enter text content",
  rows = 3,
  disabled = false,
  required = false,
  error,
  onCancel,
  onReset,
  onSubmit,
  hasChanges = false,
  loading = false,
  showActions = true,
  className = "",
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Text Content Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <Controller
          name={name}
          control={control}
          rules={required ? { required: `${label} is required` } : undefined}
          render={({ field, fieldState: { error: fieldError } }) => (
            <>
              <textarea
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={rows}
                placeholder={placeholder}
                disabled={disabled}
              />
              {(error || fieldError) && (
                <p className="text-red-600 text-xs mt-1">
                  {error?.message || fieldError?.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasChanges && (
              <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                Unsaved changes
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {hasChanges && onReset && (
              <button
                type="button"
                onClick={onReset}
                className="px-3 py-1.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded text-sm flex items-center gap-1 transition-colors">
                <RotateCcw size={14} />
                Reset
              </button>
            )}
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-3 py-1.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded text-sm flex items-center gap-1 transition-colors">
                <X size={14} />
                Cancel
              </button>
            )}
            {onSubmit && (
              <button
                type="button"
                onClick={onSubmit}
                disabled={loading || !hasChanges}
                className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-colors">
                <Check size={14} />
                {loading ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * TextContentDisplay - A read-only component for displaying text content
 *
 * Features:
 * - Consistent styling with TextContentEditor
 * - Handles empty/null values gracefully
 * - Customizable empty state message
 *
 * @example
 * <TextContentDisplay
 *   label="Description"
 *   value={content}
 *   emptyText="No description available"
 * />
 */
interface TextContentDisplayProps {
  label?: string;
  value: string;
  emptyText?: string;
  className?: string;
}

export const TextContentDisplay: React.FC<TextContentDisplayProps> = ({
  label = "Text Content",
  value,
  emptyText = "No text content",
  className = "",
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="text-sm text-gray-900 px-3 py-2 border border-gray-200 rounded bg-white min-h-[2.5rem] flex items-center">
        {value || <span className="text-gray-400 italic">{emptyText}</span>}
      </div>
    </div>
  );
};
