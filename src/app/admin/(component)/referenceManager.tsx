import React, { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Building,
  Globe,
  X,
  Upload,
  AlertCircle,
} from "lucide-react";
import ReferenceList from "@/components/admin/ReferenceList";
import { useForm, Controller } from "react-hook-form";
import {
  useReferenceStore,
  Reference,
  OverseaProject,
} from "@/store/zustand/referenceStore";
import { LoadingOverlay } from "./LoadingOverlay";
import { AdminNotification, useAdminNotification } from "./AdminNotification";

// Types
interface ReferenceFormData {
  name_th: string;
  name_en: string;
  location_th: string;
  location_en: string;
  type_th: string;
  type_en: string;
  open_at: string;
  thumbnail: File | string | null;
  galleries: (File | string)[];
}

interface OverseaFormData {
  brand: string;
  type_th: string;
  type_en: string;
  project_name_th: string;
  project_name_en: string;
  country_th: string;
  country_en: string;
}

export const ReferenceManager = () => {
  // Store
  const {
    references,
    overseaProjects,
    loading,
    error,
    fetchReference,
    addReference,
    updateReference,
    deleteReference,
    fetchOverseaProjects,
    addOverseaProject,
    updateOverseaProject,
    deleteOverseaProject,
  } = useReferenceStore();

  // State
  const [activeTab, setActiveTab] = useState<"reference" | "oversea">(
    "reference"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const [showOverseaModal, setShowOverseaModal] = useState(false);

  const { notification, hideNotification, showSuccess, showError } =
    useAdminNotification();
  useEffect(() => {
    console.log("referenc =>", references);
  }, [references]);

  // Fetch data on mount
  useEffect(() => {
    if (activeTab === "reference") {
      fetchReference();
    } else {
      fetchOverseaProjects();
    }
  }, [activeTab, fetchReference, fetchOverseaProjects]);

  // Form setup for Reference
  const referenceForm = useForm<ReferenceFormData>({
    defaultValues: {
      name_th: "",
      name_en: "",
      location_th: "",
      location_en: "",
      type_th: "",
      type_en: "",
      open_at: "",
      thumbnail: null,
      galleries: [],
    },
  });

  // Form setup for Oversea
  const overseaForm = useForm<OverseaFormData>({
    defaultValues: {
      brand: "",
      type_th: "",
      type_en: "",
      project_name_th: "",
      project_name_en: "",
      country_th: "",
      country_en: "",
    },
  });

  // Reference handlers
  const onSubmitReference = async (data: ReferenceFormData) => {
    try {
      // Create FormData for file uploads
      const formData = new FormData();
      formData.append("name_th", data.name_th);
      formData.append("name_en", data.name_en);
      formData.append("type_th", data.type_th);
      formData.append("type_en", data.type_en);
      formData.append("location_th", data.location_th);
      formData.append("location_en", data.location_en);
      formData.append("opened_at", data.open_at);

      // Handle thumbnail upload
      if (data.thumbnail && typeof data.thumbnail === "object") {
        formData.append("thumbnail_file", data.thumbnail);
      }

      // Handle gallery uploads
      if (data.galleries && data.galleries.length > 0) {
        data.galleries.forEach((file) => {
          if (typeof file === "object") {
            formData.append("galleries", file);
          }
        });
      }

      if (editingId) {
        formData.append("id", editingId);
        await updateReference(editingId, formData);
        showSuccess("อัปเดตสำเร็จ", "ข้อมูลผลงานได้รับการอัปเดตเรียบร้อยแล้ว");
      } else {
        await addReference(formData);
        showSuccess("เพิ่มสำเร็จ", "เพิ่มผลงานใหม่เรียบร้อยแล้ว");
      }
      resetReferenceForm();
    } catch (error) {
      console.error("Error submitting reference:", error);
      showError("เกิดข้อผิดพลาด", "ไม่สามารถบันทึกข้อมูลผลงานได้");
    }
  };

  const onSubmitOversea = async (data: OverseaFormData) => {
    try {
      if (editingId) {
        await updateOverseaProject(editingId, data);
        showSuccess(
          "อัปเดตสำเร็จ",
          "ข้อมูลโครงการต่างประเทศได้รับการอัปเดตเรียบร้อยแล้ว"
        );
      } else {
        await addOverseaProject(data);
        showSuccess("เพิ่มสำเร็จ", "เพิ่มโครงการต่างประเทศใหม่เรียบร้อยแล้ว");
      }
      resetOverseaForm();
    } catch (error) {
      console.error("Error submitting oversea project:", error);
      showError("เกิดข้อผิดพลาด", "ไม่สามารถบันทึกข้อมูลโครงการต่างประเทศได้");
    }
  };

  const resetReferenceForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setShowReferenceModal(false);
    referenceForm.reset();
  };

  const resetOverseaForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setShowOverseaModal(false);
    overseaForm.reset();
  };

  const startEditingReference = (item: Reference) => {
    setIsEditing(true);
    setEditingId(item.id);
    setShowReferenceModal(true);
    referenceForm.reset({
      name_th: item.name_th,
      name_en: item.name_en,
      location_th: item.location_th,
      location_en: item.location_en,
      type_th: item.type_th,
      type_en: item.type_en,
      open_at: item.open_at.split("T")[0], // Convert to date input format
      thumbnail: null, // Reset for new upload
      galleries: item.galleries || [],
    });
  };

  const startEditingOversea = (item: OverseaProject) => {
    setIsEditing(true);
    setEditingId(item.id);
    setShowOverseaModal(true);
    overseaForm.reset(item);
  };

  const handleDeleteReference = async (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบผลงานนี้?")) {
      try {
        await deleteReference(id);
        showSuccess("ลบสำเร็จ", "ลบผลงานเรียบร้อยแล้ว");
      } catch (error) {
        console.error("Error deleting reference:", error);
        showError("เกิดข้อผิดพลาด", "ไม่สามารถลบผลงานได้");
      }
    }
  };

  const handleDeleteOversea = async (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบโครงการต่างประเทศนี้?")) {
      try {
        await deleteOverseaProject(id);
        showSuccess("ลบสำเร็จ", "ลบโครงการต่างประเทศเรียบร้อยแล้ว");
      } catch (error) {
        console.error("Error deleting oversea project:", error);
        showError("เกิดข้อผิดพลาด", "ไม่สามารถลบโครงการต่างประเทศได้");
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

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Reference Manager</h2>
        <button
          onClick={() => {
            if (activeTab === "reference") {
              setShowReferenceModal(true);
            } else {
              setShowOverseaModal(true);
            }
          }}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          <Plus size={16} />
          Add New {activeTab === "reference" ? "Reference" : "Oversea Project"}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => {
                setActiveTab("reference");
                resetReferenceForm();
                resetOverseaForm();
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "reference"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}>
              <div className="flex items-center gap-2">
                <Building size={16} />
                Reference Projects
              </div>
            </button>
            <button
              onClick={() => {
                setActiveTab("oversea");
                resetReferenceForm();
                resetOverseaForm();
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "oversea"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}>
              <div className="flex items-center gap-2">
                <Globe size={16} />
                Oversea Projects
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "reference" ? (
            /* Reference Tab */
            <ReferenceList
              references={references || []}
              loading={loading}
              onEdit={startEditingReference}
              onDelete={handleDeleteReference}
            />
          ) : (
            /* Oversea Tab */
            <div className="space-y-6">
              {/* Oversea Items Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Brand
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Project Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Country
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loading && (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center">
                            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600">
                              Loading oversea projects...
                            </p>
                          </td>
                        </tr>
                      )}

                      {!loading &&
                        overseaProjects &&
                        overseaProjects.length > 0 &&
                        overseaProjects.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.brand}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.type_en}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.project_name_en}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.country_en}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => startEditingOversea(item)}
                                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors flex items-center gap-1">
                                  <Edit size={12} />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteOversea(item.id)}
                                  className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors flex items-center gap-1">
                                  <Trash2 size={12} />
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}

                      {!loading &&
                        overseaProjects &&
                        overseaProjects.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center">
                              <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No oversea projects found
                              </h3>
                              <p className="text-gray-500">
                                Start by adding your first oversea project.
                              </p>
                            </td>
                          </tr>
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {loading && <LoadingOverlay message="กำลังดำเนินการ..." />}

      {/* Reference Modal */}
      {showReferenceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {isEditing ? "Edit Reference" : "Add New Reference"}
              </h3>
              <button
                onClick={resetReferenceForm}
                className="text-gray-500 hover:text-gray-700 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={referenceForm.handleSubmit(onSubmitReference)}
              className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Thai Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title (Thai)
                  </label>
                  <Controller
                    name="name_th"
                    control={referenceForm.control}
                    rules={{ required: "Thai title is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="ชื่อโครงการภาษาไทย"
                        />
                        {error && (
                          <p className="text-red-600 text-xs mt-1">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* English Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title (English)
                  </label>
                  <Controller
                    name="name_en"
                    control={referenceForm.control}
                    rules={{ required: "English title is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Project Title in English"
                        />
                        {error && (
                          <p className="text-red-600 text-xs mt-1">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Type Dropdown */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <Controller
                    name="type_th"
                    control={referenceForm.control}
                    rules={{ required: "Type is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={field.value}
                          onChange={(e) => {
                            const selected = e.target.value;
                            field.onChange(selected);
                            if (selected === "สถานีบริการน้ำมัน") {
                              referenceForm.setValue(
                                "type_en",
                                "Service Station"
                              );
                            } else if (selected === "PERMATANK") {
                              referenceForm.setValue("type_en", "PERMATANK");
                            } else {
                              referenceForm.setValue("type_en", "");
                            }
                          }}>
                          <option value="">Select type</option>
                          <option value="สถานีบริการน้ำมัน">
                            Service Station
                          </option>
                          <option value="PERMATANK">PERMATANK</option>
                        </select>
                        {error && (
                          <p className="text-red-600 text-xs mt-1">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Location Thai */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location (Thai)
                  </label>
                  <Controller
                    name="location_th"
                    control={referenceForm.control}
                    rules={{ required: "Thai location is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="ที่ตั้งโครงการภาษาไทย"
                        />
                        {error && (
                          <p className="text-red-600 text-xs mt-1">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Location English */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location (English)
                  </label>
                  <Controller
                    name="location_en"
                    control={referenceForm.control}
                    rules={{ required: "English location is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Project Location in English"
                        />
                        {error && (
                          <p className="text-red-600 text-xs mt-1">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Opened Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opened Date
                  </label>
                  <Controller
                    name="open_at"
                    control={referenceForm.control}
                    rules={{ required: "Opened date is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input
                          {...field}
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {error && (
                          <p className="text-red-600 text-xs mt-1">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail Image
                </label>
                <Controller
                  name="thumbnail"
                  control={referenceForm.control}
                  render={({ field: { onChange, value } }) => (
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <label className="cursor-pointer">
                          <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block">
                            Choose Thumbnail
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              onChange(e.target.files?.[0] || null)
                            }
                            className="hidden"
                          />
                        </label>
                        <p className="text-gray-500 text-sm mt-1">
                          PNG, JPG up to 10MB
                        </p>
                      </div>

                      {/* Thumbnail Preview */}
                      {value && typeof value === "object" && (
                        <div className="space-y-3">
                          <div className="relative">
                            <img
                              src={URL.createObjectURL(value)}
                              alt="Thumbnail preview"
                              className="w-full h-48 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => onChange(null)}
                              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700">
                              <X size={16} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex-1">
                              <p className="text-sm text-blue-800 font-medium">
                                {value.name}
                              </p>
                              <p className="text-xs text-blue-600">
                                {(value.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Gallery Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Images (Optional)
                </label>
                <Controller
                  name="galleries"
                  control={referenceForm.control}
                  render={({ field: { onChange, value } }) => (
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <ImageIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <label className="cursor-pointer">
                          <span className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors inline-block">
                            Choose Gallery Images
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) =>
                              onChange(Array.from(e.target.files || []))
                            }
                            className="hidden"
                          />
                        </label>
                        <p className="text-gray-500 text-sm mt-1">
                          Multiple images for gallery
                        </p>
                      </div>

                      {/* Gallery Preview */}
                      {value && value.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {value.map((file, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                  src={
                                    typeof file === "object"
                                      ? URL.createObjectURL(file)
                                      : file
                                  }
                                  alt={`Gallery ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const newFiles = value.filter(
                                    (_, i) => i !== index
                                  );
                                  onChange(newFiles);
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <X size={12} />
                              </button>
                              {typeof file === "object" && (
                                <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                                  {(file.size / 1024 / 1024).toFixed(1)}MB
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetReferenceForm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Save size={16} />
                  {isEditing ? "Update" : "Create"} Reference
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Oversea Modal */}
      {showOverseaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {isEditing ? "Edit Oversea Project" : "Add New Oversea Project"}
              </h3>
              <button
                onClick={resetOverseaForm}
                className="text-gray-500 hover:text-gray-700 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={overseaForm.handleSubmit(onSubmitOversea)}
              className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <Controller
                    name="brand"
                    control={overseaForm.control}
                    rules={{ required: "Brand is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Shell, Chevron, etc."
                        />
                        {error && (
                          <p className="text-red-600 text-xs mt-1">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Type Thai */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type (Thai)
                  </label>
                  <Controller
                    name="type_th"
                    control={overseaForm.control}
                    rules={{ required: "Thai type is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="ประเภทโครงการภาษาไทย"
                        />
                        {error && (
                          <p className="text-red-600 text-xs mt-1">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Type English */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type (English)
                  </label>
                  <Controller
                    name="type_en"
                    control={overseaForm.control}
                    rules={{ required: "English type is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Gas Station, Refinery, etc."
                        />
                        {error && (
                          <p className="text-red-600 text-xs mt-1">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Project Name Thai */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name (Thai)
                  </label>
                  <Controller
                    name="project_name_th"
                    control={overseaForm.control}
                    rules={{ required: "Thai project name is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="ชื่อโครงการภาษาไทย"
                        />
                        {error && (
                          <p className="text-red-600 text-xs mt-1">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Project Name English */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name (English)
                  </label>
                  <Controller
                    name="project_name_en"
                    control={overseaForm.control}
                    rules={{ required: "English project name is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Project name in English"
                        />
                        {error && (
                          <p className="text-red-600 text-xs mt-1">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Country Thai */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country (Thai)
                  </label>
                  <Controller
                    name="country_th"
                    control={overseaForm.control}
                    rules={{ required: "Thai country is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="ประเทศภาษาไทย"
                        />
                        {error && (
                          <p className="text-red-600 text-xs mt-1">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                {/* Country English */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country (English)
                  </label>
                  <Controller
                    name="country_en"
                    control={overseaForm.control}
                    rules={{ required: "English country is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Country name in English"
                        />
                        {error && (
                          <p className="text-red-600 text-xs mt-1">
                            {error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={resetOverseaForm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Save size={16} />
                  {isEditing ? "Update" : "Create"} Project
                </button>
              </div>
            </form>
          </div>
        </div>
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
