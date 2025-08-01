"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { X, Upload } from "lucide-react";

// Types for form and partner
interface FormValues {
  name: string;
  logo: File | string | null;
}

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  updated_at?: string;
}

interface PartnerModalProps {
  isOpen: boolean;
  type: "" | "add" | "edit" | "delete";
  selectedPartner: Partner | null;
  onClose: () => void;
  onSubmit: (data: FormValues) => Promise<void>;
  onDelete: () => Promise<void>;
  isSubmitting?: boolean;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({
  isOpen,
  type,
  selectedPartner,
  onClose,
  onSubmit,
  onDelete,
  isSubmitting = false,
}) => {
  // React Hook Form for modal
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      logo: null,
    },
  });

  const logo = watch("logo");

  // Reset form when modal opens/closes or partner changes
  React.useEffect(() => {
    if (isOpen && selectedPartner && type === "edit") {
      reset({
        name: selectedPartner.name,
        logo: selectedPartner.logo_url || null,
      });
    } else if (isOpen && type === "add") {
      reset({ name: "", logo: null });
    }
  }, [isOpen, selectedPartner, type, reset]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Please select a JPEG, PNG, GIF, or WebP image.");
        return;
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("File size too large. Maximum size is 5MB.");
        return;
      }

      setValue("logo", file);
    }
  };

  const getLogoPreview = () => {
    if (logo instanceof File) {
      return URL.createObjectURL(logo);
    } else if (typeof logo === "string" && logo) {
      return logo;
    }
    return null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {type === "add" && "Add New Partner"}
            {type === "edit" && "Edit Partner"}
            {type === "delete" && "Delete Partner"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {type === "delete" ? (
            // Delete Confirmation
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Delete Partner
                </h4>
                <p className="text-gray-600">
                  Are you sure you want to delete "{selectedPartner?.name}"? This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={onDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ) : (
            // Add/Edit Form
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Partner Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner Name *
                </label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Partner name is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter partner name"
                      disabled={isSubmitting}
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner Logo
                </label>
                
                {/* Logo Preview */}
                {getLogoPreview() && (
                  <div className="mb-4">
                    <div className="w-32 h-20 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={getLogoPreview()!}
                        alt="Logo preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                    <Upload size={16} />
                    {logo ? "Change Logo" : "Upload Logo"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isSubmitting}
                    />
                  </label>
                  {logo && (
                    <button
                      type="button"
                      onClick={() => setValue("logo", null)}
                      className="text-red-600 hover:text-red-700 text-sm"
                      disabled={isSubmitting}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: JPEG, PNG, GIF, WebP (max 5MB)
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? (type === "add" ? "Adding..." : "Updating...")
                    : (type === "add" ? "Add Partner" : "Update Partner")
                  }
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
