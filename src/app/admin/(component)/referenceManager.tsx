import React, { useState } from "react";
import {
  Save,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Image as ImageIcon,
  Building,
  Globe,
  X,
  Upload,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";

// Types
interface ReferenceItem {
  id: string;
  title_th: string;
  title_en: string;
  location: string; // Google URL
  type_th: string;
  type_en: string;
  opened_at: string; // ISO date string with timezone
  thumbnail: string; // Image URL
  gallery: string[]; // Array of image URLs
}

interface OverseaItem {
  id: string;
  brand: string;
  type: string;
  project_name: string;
  country: string;
}

interface ReferenceFormData {
  title_th: string;
  title_en: string;
  location: string;
  type_th: string;
  type_en: string;
  opened_at: string;
  thumbnail: File | string | null;
  gallery: (File | string)[];
}

interface OverseaFormData {
  brand: string;
  type: string;
  project_name: string;
  country: string;
}

export const ReferenceManager = () => {
  const [activeTab, setActiveTab] = useState<"reference" | "oversea">(
    "reference"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data
  const [referenceItems, setReferenceItems] = useState<ReferenceItem[]>([
    {
      id: "1",
      title_th: "สถานีบริการน้ำมัน ปตท. สาขาลาดพร้าว",
      title_en: "PTT Gas Station Ladprao Branch",
      location: "https://maps.google.com/example1",
      type_th: "สถานีบริการน้ำมัน",
      type_en: "Gas Station",
      opened_at: "2023-06-15T10:00:00+07:00",
      thumbnail:
        "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400",
      gallery: [
        "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
      ],
    },
    {
      id: "2",
      title_th: "โรงงานผลิตน้ำมัน บางจาก",
      title_en: "Bangchak Oil Refinery",
      location: "https://maps.google.com/example2",
      type_th: "โรงงานอุตสาหกรรม",
      type_en: "Industrial Plant",
      opened_at: "2023-08-20T14:30:00+07:00",
      thumbnail:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
      gallery: [
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
      ],
    },
  ]);

  const [overseaItems, setOverseaItems] = useState<OverseaItem[]>([
    {
      id: "1",
      brand: "Shell",
      type: "Gas Station",
      project_name: "Shell Station Bangkok International",
      country: "Thailand",
    },
    {
      id: "2",
      brand: "Chevron",
      type: "Fuel Terminal",
      project_name: "Chevron Fuel Distribution Center",
      country: "Singapore",
    },
    {
      id: "3",
      brand: "ExxonMobil",
      type: "Refinery",
      project_name: "ExxonMobil Refinery Complex",
      country: "Malaysia",
    },
  ]);

  // Form setup for Reference
  const referenceForm = useForm<ReferenceFormData>({
    defaultValues: {
      title_th: "",
      title_en: "",
      location: "",
      type_th: "",
      type_en: "",
      opened_at: "",
      thumbnail: null,
      gallery: [],
    },
  });

  // Form setup for Oversea
  const overseaForm = useForm<OverseaFormData>({
    defaultValues: {
      brand: "",
      type: "",
      project_name: "",
      country: "",
    },
  });

  // Reference handlers
  const onSubmitReference = (data: ReferenceFormData) => {
    if (editingId) {
      // Update existing
      setReferenceItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...data,
                thumbnail:
                  typeof data.thumbnail === "string"
                    ? data.thumbnail
                    : item.thumbnail,
                gallery: data.gallery.map((img) =>
                  typeof img === "string" ? img : URL.createObjectURL(img)
                ),
              }
            : item
        )
      );
    } else {
      // Add new
      const newItem: ReferenceItem = {
        id: Date.now().toString(),
        ...data,
        thumbnail: data.thumbnail
          ? typeof data.thumbnail === "string"
            ? data.thumbnail
            : URL.createObjectURL(data.thumbnail)
          : "",
        gallery: data.gallery.map((img) =>
          typeof img === "string" ? img : URL.createObjectURL(img)
        ),
      };
      setReferenceItems((prev) => [...prev, newItem]);
    }

    resetReferenceForm();
  };

  const onSubmitOversea = (data: OverseaFormData) => {
    if (editingId) {
      // Update existing
      setOverseaItems((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...data } : item
        )
      );
    } else {
      // Add new
      const newItem: OverseaItem = {
        id: Date.now().toString(),
        ...data,
      };
      setOverseaItems((prev) => [...prev, newItem]);
    }

    resetOverseaForm();
  };

  const resetReferenceForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setShowAddForm(false);
    referenceForm.reset();
  };

  const resetOverseaForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setShowAddForm(false);
    overseaForm.reset();
  };

  const startEditingReference = (item: ReferenceItem) => {
    setIsEditing(true);
    setEditingId(item.id);
    setShowAddForm(true);
    referenceForm.reset({
      title_th: item.title_th,
      title_en: item.title_en,
      location: item.location,
      type_th: item.type_th,
      type_en: item.type_en,
      opened_at: item.opened_at.split("T")[0], // Convert to date input format
      thumbnail: item.thumbnail,
      gallery: item.gallery,
    });
  };

  const startEditingOversea = (item: OverseaItem) => {
    setIsEditing(true);
    setEditingId(item.id);
    setShowAddForm(true);
    overseaForm.reset(item);
  };

  const deleteReferenceItem = (id: string) => {
    setReferenceItems((prev) => prev.filter((item) => item.id !== id));
  };

  const deleteOverseaItem = (id: string) => {
    setOverseaItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Reference Manager</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} />
          Add New {activeTab === "reference" ? "Reference" : "Oversea Project"}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
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
            <div className="space-y-6">
              {showAddForm && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {isEditing ? "Edit Reference" : "Add New Reference"}
                    </h3>
                    <button
                      onClick={resetReferenceForm}
                      className="text-gray-500 hover:text-gray-700">
                      <X size={20} />
                    </button>
                  </div>

                  <form
                    onSubmit={referenceForm.handleSubmit(onSubmitReference)}
                    className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Thai Title */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title (Thai)
                        </label>
                        <Controller
                          name="title_th"
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
                          name="title_en"
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

                      {/* Thai Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type (Thai)
                        </label>
                        <Controller
                          name="type_th"
                          control={referenceForm.control}
                          rules={{ required: "Thai type is required" }}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <input
                                {...field}
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                      {/* English Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type (English)
                        </label>
                        <Controller
                          name="type_en"
                          control={referenceForm.control}
                          rules={{ required: "English type is required" }}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <input
                                {...field}
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Project Type in English"
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

                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location (Google Maps URL)
                        </label>
                        <Controller
                          name="location"
                          control={referenceForm.control}
                          rules={{ required: "Location URL is required" }}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <input
                                {...field}
                                type="url"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://maps.google.com/..."
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
                          name="opened_at"
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
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <label className="cursor-pointer">
                          <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block">
                            Choose Thumbnail
                          </span>
                          <Controller
                            name="thumbnail"
                            control={referenceForm.control}
                            render={({ field: { onChange } }) => (
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  onChange(e.target.files?.[0] || null)
                                }
                                className="hidden"
                              />
                            )}
                          />
                        </label>
                        <p className="text-gray-500 text-sm mt-1">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>

                    {/* Gallery Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gallery Images (Optional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <ImageIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <label className="cursor-pointer">
                          <span className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors inline-block">
                            Choose Gallery Images
                          </span>
                          <Controller
                            name="gallery"
                            control={referenceForm.control}
                            render={({ field: { onChange } }) => (
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) =>
                                  onChange(Array.from(e.target.files || []))
                                }
                                className="hidden"
                              />
                            )}
                          />
                        </label>
                        <p className="text-gray-500 text-sm mt-1">
                          Multiple images for gallery
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
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
              )}

              {/* Reference Items List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {referenceItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-100">
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail}
                          alt={item.title_en}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.title_en}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {item.title_th}
                      </p>
                      <div className="flex items-center text-gray-500 text-xs mb-2">
                        <MapPin size={12} className="mr-1" />
                        <span className="truncate">{item.type_en}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-xs mb-3">
                        <Calendar size={12} className="mr-1" />
                        <span>
                          {new Date(item.opened_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditingReference(item)}
                          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1">
                          <Edit size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteReferenceItem(item.id)}
                          className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Oversea Tab */
            <div className="space-y-6">
              {showAddForm && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {isEditing
                        ? "Edit Oversea Project"
                        : "Add New Oversea Project"}
                    </h3>
                    <button
                      onClick={resetOverseaForm}
                      className="text-gray-500 hover:text-gray-700">
                      <X size={20} />
                    </button>
                  </div>

                  <form
                    onSubmit={overseaForm.handleSubmit(onSubmitOversea)}
                    className="space-y-4">
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

                      {/* Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type
                        </label>
                        <Controller
                          name="type"
                          control={overseaForm.control}
                          rules={{ required: "Type is required" }}
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

                      {/* Project Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Name
                        </label>
                        <Controller
                          name="project_name"
                          control={overseaForm.control}
                          rules={{ required: "Project name is required" }}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <input
                                {...field}
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Full project name"
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

                      {/* Country */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <Controller
                          name="country"
                          control={overseaForm.control}
                          rules={{ required: "Country is required" }}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <input
                                {...field}
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Thailand, Singapore, etc."
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

                    <div className="flex gap-3 pt-4">
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
              )}

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
                      {overseaItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.brand}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.project_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.country}
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
                                onClick={() => deleteOverseaItem(item.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors flex items-center gap-1">
                                <Trash2 size={12} />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
