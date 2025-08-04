"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Save,
  X,
  Edit,
  Trash2,
  Plus,
  Upload,
  AlertCircle,
  CheckCircle,
  Home,
  ChevronRight,
} from "lucide-react";
import { useServiceStore, ServiceType } from "@/store/zustand/servicesStore";

// Types
interface FormValues {
  name_th: string;
  name_en: string;
  description_th: string;
  description_en: string;
  image: File | null;
}

export const ServiceManager = () => {
  // Service Store
  const {
    services,
    loading,
    success,
    error,
    fetchServices,
    addService,
    updateService,
    deleteService,
  } = useServiceStore();

  // State management
  const [editingService, setEditingService] = useState<ServiceType | null>(
    null
  );
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

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

  // Form submission
  const onSubmit = async (data: FormValues) => {
    try {
      const submitData = {
        name_th: data.name_th,
        name_en: data.name_en,
        description_th: data.description_th,
        description_en: data.description_en,
        image: data.image || undefined,
      };

      if (editingService) {
        await updateService(editingService.id, submitData);
        setEditingService(null);
      } else {
        await addService(submitData);
        setShowAddForm(false);
      }
      reset();
    } catch (error) {
      console.error("Error submitting service:", error);
    }
  };

  // Start editing a service
  const startEdit = (service: ServiceType) => {
    setEditingService(service);
    setShowAddForm(false);
    reset({
      name_th: service.name_th,
      name_en: service.name_en,
      description_th: service.description_th,
      description_en: service.description_en,
      image: null, // Reset image to null for editing
    });
  };

  // Cancel editing/adding
  const cancelForm = () => {
    setEditingService(null);
    setShowAddForm(false);
    reset();
  };

  // Delete service
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <Home size={16} />
        <ChevronRight size={14} />
        <span>Admin</span>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">Service Manager</span>
      </nav>

      {/* Status Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="text-red-600" size={20} />
          <div>
            <h4 className="text-red-800 font-medium">Error</h4>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      )}

      {success && !loading && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="text-green-600" size={20} />
          <div>
            <h4 className="text-green-800 font-medium">Success</h4>
            <p className="text-green-600 text-sm">
              Operation completed successfully!
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Service Manager</h2>
          <p className="text-gray-600 text-sm mt-1">
            Manage services with Thai and English content
          </p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingService(null);
            reset();
          }}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          <Plus size={16} />
          Add Service
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading services...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Services Grid */}
      {!loading && services && services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {/* Service Image */}
              {service.image_url && (
                <div className="aspect-video bg-gray-100">
                  <img
                    src={service.image_url}
                    alt={service.name_en}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Service Content */}
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {service.name_en}
                </h4>
                <p className="text-sm text-gray-600 mb-2">{service.name_th}</p>
                <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                  {service.description_en}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(service)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-1">
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center justify-center">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && services && services.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No services found
          </h3>
          <p className="text-gray-500">Start by adding your first service.</p>
        </div>
      )}

      {/* Service Form */}
      {(showAddForm || editingService) && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            {editingService ? "Edit Service" : "Add New Service"}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Fields */}
            <div className="space-y-4">
              <h5 className="font-medium text-gray-700">English</h5>

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
              <h5 className="font-medium text-gray-700">ไทย</h5>

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
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={cancelForm}
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
      )}
    </div>
  );
};
