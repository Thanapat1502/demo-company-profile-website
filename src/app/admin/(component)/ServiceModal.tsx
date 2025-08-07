"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Save, X, Upload } from "lucide-react";
import { ServiceType } from "@/store/zustand/servicesStore";

// Types
interface FormValues {
  name_th: string;
  name_en: string;
  description_th: string;
  description_en: string;
  image: File | null;
}

interface ServiceModalProps {
  isOpen: boolean;
  editingService: ServiceType | null;
  onClose: () => void;
  onSubmit: (data: FormValues) => Promise<void>;
  loading?: boolean;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  editingService,
  onClose,
  onSubmit,
  loading = false,
}) => {
  // Form management
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name_th: "",
      name_en: "",
      description_th: "",
      description_en: "",
      image: null,
    },
  });

  // Reset form when modal opens/closes or service changes
  React.useEffect(() => {
    if (isOpen && editingService) {
      reset({
        name_th: editingService.name_th,
        name_en: editingService.name_en,
        description_th: editingService.description_th,
        description_en: editingService.description_en,
        image: null, // Reset image to null for editing
      });
    } else if (isOpen && !editingService) {
      reset({
        name_th: "",
        name_en: "",
        description_th: "",
        description_en: "",
        image: null,
      });
    }
  }, [isOpen, editingService, reset]);

  const handleFormSubmit = async (data: FormValues) => {
    await onSubmit(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] mx-4 bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h4 className="text-xl font-semibold text-gray-900">
            {editingService ? "Edit Service" : "Add New Service"}
          </h4>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* English Fields */}
              <div className="space-y-4">
                <h5 className="font-medium text-gray-700 text-lg border-b border-gray-200 pb-2">
                  English
                </h5>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name (EN) *
                  </label>
                  <Controller
                    name="name_en"
                    control={control}
                    rules={{ required: "English name is required" }}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter service name in English"
                        />
                        {errors.name_en && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors.name_en.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (EN) *
                  </label>
                  <Controller
                    name="description_en"
                    control={control}
                    rules={{ required: "English description is required" }}
                    render={({ field }) => (
                      <>
                        <textarea
                          {...field}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          placeholder="Enter service description in English"
                        />
                        {errors.description_en && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors.description_en.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              {/* Thai Fields */}
              <div className="space-y-4">
                <h5 className="font-medium text-gray-700 text-lg border-b border-gray-200 pb-2">
                  ไทย
                </h5>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อบริการ (TH) *
                  </label>
                  <Controller
                    name="name_th"
                    control={control}
                    rules={{ required: "Thai name is required" }}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="กรอกชื่อบริการเป็นภาษาไทย"
                        />
                        {errors.name_th && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors.name_th.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    รายละเอียด (TH) *
                  </label>
                  <Controller
                    name="description_th"
                    control={control}
                    rules={{ required: "Thai description is required" }}
                    render={({ field }) => (
                      <>
                        <textarea
                          {...field}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          placeholder="กรอกรายละเอียดบริการเป็นภาษาไทย"
                        />
                        {errors.description_th && (
                          <p className="text-red-600 text-xs mt-1">
                            {errors.description_th.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Image
              </label>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG (MAX. 5MB)
                          </p>
                        </div>
                        <input
                          {...field}
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              // Validate file size (5MB)
                              if (file.size > 5 * 1024 * 1024) {
                                alert("File size must be less than 5MB");
                                return;
                              }
                              onChange(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Display selected file */}
                    {value && (
                      <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <Upload className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-800 font-medium">
                          {value.name}
                        </span>
                        <span className="text-xs text-blue-600">
                          ({(value.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                        <button
                          type="button"
                          onClick={() => onChange(null)}
                          className="ml-auto text-blue-600 hover:text-blue-800">
                          <X size={16} />
                        </button>
                      </div>
                    )}

                    {/* Show current image for editing */}
                    {editingService && editingService.image_url && !value && (
                      <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                          <img
                            src={editingService.image_url}
                            alt="Current"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 font-medium">
                            Current Image
                          </p>
                          <p className="text-xs text-gray-500">
                            Upload a new image to replace
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2">
                <X size={16} />
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50">
                <Save size={16} />
                {editingService ? "Update Service" : "Add Service"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
