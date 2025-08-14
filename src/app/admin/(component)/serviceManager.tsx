"use client";

import React, { useState, useEffect } from "react";
import { Edit, Trash2, Plus, AlertCircle } from "lucide-react";
import { useServiceStore, ServiceType } from "@/store/zustand/servicesStore";
import { LoadingOverlay } from "./LoadingOverlay";
import { AdminNotification, useAdminNotification } from "./AdminNotification";
import { ServiceModal } from "./ServiceModal";

// Types
interface FormValues {
  name_th: string;
  name_en: string;
  description_th: string;
  description_en: string;
  image: File | null;
}

interface UpdateServiceData {
  name_th: string;
  name_en: string;
  description_th: string;
  description_en: string;
  image?: File;
}

export const ServiceManager = () => {
  // Service Store
  const {
    services,
    loading,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notification, hideNotification, showSuccess, showError } =
    useAdminNotification();

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Form submission
  const handleFormSubmit = async (data: FormValues) => {
    try {
      if (editingService) {
        // For updates, only include changed values
        const submitData: UpdateServiceData = {
          name_th: data.name_th,
          name_en: data.name_en,
          description_th: data.description_th,
          description_en: data.description_en,
        };

        // Only include image if a new one was selected
        if (data.image) {
          submitData.image = data.image;
        }

        await updateService(editingService.id, submitData);
        setEditingService(null);
        showSuccess("อัปเดตสำเร็จ", "ข้อมูลบริการได้รับการอัปเดตเรียบร้อยแล้ว");
      } else {
        // For new services, include all data
        const submitData = {
          name_th: data.name_th,
          name_en: data.name_en,
          description_th: data.description_th,
          description_en: data.description_en,
          image: data.image || undefined,
        };

        await addService(submitData);
        showSuccess("เพิ่มสำเร็จ", "เพิ่มบริการใหม่เรียบร้อยแล้ว");
      }
      setIsModalOpen(false);
      setEditingService(null);
    } catch (error) {
      console.error("Error submitting service:", error);
      showError("เกิดข้อผิดพลาด", "ไม่สามารถบันทึกข้อมูลบริการได้");
    }
  };

  // Start editing a service
  const startEdit = (service: ServiceType) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  // Open add modal
  const openAddModal = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  // Delete service
  const handleDelete = async (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบบริการนี้?")) {
      try {
        await deleteService(id);
        showSuccess("ลบสำเร็จ", "ลบบริการเรียบร้อยแล้ว");
      } catch (error) {
        console.error("Error deleting service:", error);
        showError("เกิดข้อผิดพลาด", "ไม่สามารถลบบริการได้");
      }
    }
  };

  return (
    <div className="space-y-6">
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

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Service Manager</h2>
          <p className="text-gray-600 text-sm mt-1">
            Manage services with Thai and English content
          </p>
        </div>
        <button
          onClick={openAddModal}
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

      {/* Service Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        editingService={editingService}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        loading={loading}
      />

      {/* Loading Overlay */}
      {loading && <LoadingOverlay message="กำลังดำเนินการ..." />}

      {/* Notification */}
      {notification && (
        <AdminNotification
          type={notification.type}
          title={notification.title}
          message={notification.message}
          isVisible={notification.isVisible}
          onDismiss={hideNotification}
        />
      )}
    </div>
  );
};
