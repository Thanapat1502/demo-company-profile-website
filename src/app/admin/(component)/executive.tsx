import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Plus, Edit, Trash2, X, Upload } from "lucide-react";
import { BilingualInput } from "./languageToggle";
import {
  useExecutiveStore,
  ExecutiveType,
} from "@/store/zustand/executiveStore";
import { LoadingOverlay } from "./LoadingOverlay";
import { AdminNotification, useAdminNotification } from "./AdminNotification";

type FormValues = {
  image: File | string | null;
  name: { th: string; en: string };
  title: { th: string; en: string };
};

export const ExecutiveManager = () => {
  const {
    executiveMembers,
    loading,
    error,
    fetchExecutiveMembers,
    addExecutiveMember,
    updateExecutiveMember,
    deleteExecutiveMember,
  } = useExecutiveStore();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "" | "add" | "edit" | "delete";
    selectedExecutive: ExecutiveType | null;
  }>({
    isOpen: false,
    type: "",
    selectedExecutive: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { notification, hideNotification, showSuccess, showError } =
    useAdminNotification();

  const { control, handleSubmit, reset, setValue, watch } = useForm<FormValues>(
    {
      defaultValues: {
        image: null,
        name: { th: "", en: "" },
        title: { th: "", en: "" },
      },
    }
  );

  const image = watch("image");

  useEffect(() => {
    fetchExecutiveMembers();
  }, [fetchExecutiveMembers]);

  const openModal = (
    type: "" | "add" | "edit" | "delete",
    executive: ExecutiveType | null = null
  ) => {
    if (executive) {
      reset({
        image: executive.image_url || null,
        name: { th: executive.name_th, en: executive.name_en },
        title: { th: executive.position_th, en: executive.position_en },
      });
    } else {
      reset({
        image: null,
        name: { th: "", en: "" },
        title: { th: "", en: "" },
      });
    }
    setModalState({ isOpen: true, type, selectedExecutive: executive });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: "", selectedExecutive: null });
    reset();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert(
          "Invalid file type. Please select a JPEG, PNG, GIF, or WebP image."
        );
        return;
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("File size too large. Maximum size is 5MB.");
        return;
      }

      setValue("image", file);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (modalState.type === "add") {
        await addExecutiveMember({
          name_th: data.name.th,
          name_en: data.name.en,
          position_th: data.title.th,
          position_en: data.title.en,
          image: data.image || undefined,
        });
        showSuccess("เพิ่มสำเร็จ", "เพิ่มผู้บริหารใหม่เรียบร้อยแล้ว");
      } else if (modalState.type === "edit" && modalState.selectedExecutive) {
        await updateExecutiveMember(modalState.selectedExecutive.id, {
          name_th: data.name.th,
          name_en: data.name.en,
          position_th: data.title.th,
          position_en: data.title.en,
          image: data.image || undefined,
        });
        showSuccess(
          "อัปเดตสำเร็จ",
          "ข้อมูลผู้บริหารได้รับการอัปเดตเรียบร้อยแล้ว"
        );
      }
      closeModal();
    } catch (error) {
      console.error("Error submitting executive:", error);
      showError("เกิดข้อผิดพลาด", "ไม่สามารถบันทึกข้อมูลผู้บริหารได้");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (modalState.selectedExecutive) {
      setIsSubmitting(true);
      try {
        await deleteExecutiveMember(modalState.selectedExecutive.id);
        closeModal();
        showSuccess("ลบสำเร็จ", "ลบผู้บริหารเรียบร้อยแล้ว");
      } catch (error) {
        console.error("Error deleting executive:", error);
        showError("เกิดข้อผิดพลาด", "ไม่สามารถลบผู้บริหารได้");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getImagePreview = () => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    } else if (typeof image === "string" && image) {
      return image;
    }
    return null;
  };

  const ExecutiveModal = () => {
    if (!modalState.isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {modalState.type === "add" && "Add Executive Member"}
              {modalState.type === "edit" && "Edit Executive Member"}
              {modalState.type === "delete" && "Delete Executive Member"}
            </h3>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            {modalState.type === "delete" ? (
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Trash2 className="w-8 h-8 text-red-600" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Delete Executive Member
                  </h4>
                  <p className="text-gray-600">
                    {`Are you sure you want to delete "${modalState.selectedExecutive?.name_en}"? This action cannot be undone.`}
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    disabled={isSubmitting}>
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    disabled={isSubmitting}>
                    {isSubmitting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Profile Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Profile Picture
                  </label>

                  {/* Image Preview */}
                  {getImagePreview() && (
                    <div className="mb-4">
                      <div className="relative w-full h-48 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={getImagePreview()!}
                          alt="Executive preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setValue("image", null)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                          disabled={isSubmitting}>
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                      <Upload size={16} />
                      {image ? "Change Photo" : "Upload Photo"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={isSubmitting}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: JPEG, PNG, GIF, WebP (max 5MB)
                  </p>
                </div>

                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <BilingualInput
                      label="Full Name"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={{ th: "ชื่อ-นามสกุล", en: "Full name" }}
                    />
                  )}
                />

                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <BilingualInput
                      label="Position/Title"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={{ th: "ตำแหน่ง", en: "Position/Title" }}
                    />
                  )}
                />

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    disabled={isSubmitting}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    disabled={isSubmitting}>
                    {isSubmitting
                      ? modalState.type === "add"
                        ? "Adding..."
                        : "Updating..."
                      : modalState.type === "add"
                      ? "Add Executive"
                      : "Update Executive"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Executive Manager
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Manage executive team members and their profiles
          </p>
        </div>
        <button
          onClick={() => openModal("add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors">
          <Plus size={16} />
          Add Executive
        </button>
      </div>

      {/* Executive Grid */}
      {loading ? (
        <div className="text-center py-12 text-blue-600">
          Loading executives...
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : executiveMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {executiveMembers.map((executive) => (
            <div
              key={executive.id}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden">
              {/* Executive Photo */}
              <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                {executive.image_url ? (
                  <img
                    src={executive.image_url}
                    alt={executive.name_en}
                    className="max-w-full max-h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-2xl font-medium text-gray-500">
                        {executive.name_en?.charAt(0) || "?"}
                      </span>
                    </div>
                    <span className="text-sm">No Photo</span>
                  </div>
                )}
              </div>

              {/* Executive Info */}
              <div className="p-4 space-y-3">
                <div className="text-center space-y-1">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                    {executive.name_en}
                  </h3>
                  <p className="text-xs text-gray-600 leading-tight">
                    {executive.position_en}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal("edit", executive)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-1 transition-colors">
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => openModal("delete", executive)}
                    className="px-3 py-2 border border-red-300 text-red-700 rounded text-sm hover:bg-red-50 flex items-center justify-center transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Plus className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No executives yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start by adding your first executive team member
          </p>
          <button
            onClick={() => openModal("add")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto transition-colors">
            <Plus size={16} />
            Add Your First Executive
          </button>
        </div>
      )}

      {/* Statistics */}
      {executiveMembers.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">
                Total Executives: {executiveMembers.length}
              </p>
              <p className="text-xs text-blue-500">
                {executiveMembers.filter((e) => e.image_url).length} with
                photos, {executiveMembers.filter((e) => !e.image_url).length}{" "}
                without photos
              </p>
            </div>
            <div className="text-2xl">👥</div>
          </div>
        </div>
      )}

      <ExecutiveModal />

      {/* Loading Overlay */}
      {(loading || isSubmitting) && (
        <LoadingOverlay message="กำลังดำเนินการ..." />
      )}

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
