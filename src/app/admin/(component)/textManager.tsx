import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Download,
  Upload,
  Search,
  Edit,
  X,
  Check,
  RotateCcw,
} from "lucide-react";
import { useWebLabelStore, WebLabels } from "@/store/zustand/useWebLabelStore";

interface FormValues {
  text: string;
}

export const TextManager = () => {
  const { webLabels, loading, error, fetchWebLabels, editWebLabel } =
    useWebLabelStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPage, setSelectedPage] = useState("all");
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [originalValues, setOriginalValues] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const { control, handleSubmit, reset, watch, setValue } = useForm<FormValues>(
    {
      defaultValues: {
        text: "",
      },
    }
  );

  const watchedValues = watch();

  useEffect(() => {
    fetchWebLabels();
  }, [fetchWebLabels]);

  // Extract unique page names from keys
  const getPageNames = () => {
    const pages = new Set<string>();
    webLabels.forEach((label) => {
      const pageName = label.key.split(".")[0];
      pages.add(pageName);
    });
    return Array.from(pages).sort();
  };

  // Filter labels based on search and page selection
  const filteredLabels = webLabels.filter((label) => {
    const matchesSearch =
      label.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      label.text.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPage =
      selectedPage === "all" || label.key.startsWith(selectedPage + ".");

    return matchesSearch && matchesPage;
  });

  // Group labels by page
  const groupedLabels = filteredLabels.reduce((acc, label) => {
    const pageName = label.key.split(".")[0];
    if (!acc[pageName]) {
      acc[pageName] = [];
    }
    acc[pageName].push(label);
    return acc;
  }, {} as Record<string, WebLabels[]>);

  // Start editing a label
  const startEditing = (label: WebLabels) => {
    setEditingKey(label.key);
    setOriginalValues(label.text);
    setValue("text", label.text);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingKey(null);
    setOriginalValues(null);
    reset();
  };

  // Check if values have changed
  const hasChanges = () => {
    if (!originalValues) return false;
    return watchedValues.text !== originalValues;
  };

  // Submit form
  const onSubmit = async (data: FormValues) => {
    if (!editingKey) return;

    try {
      await editWebLabel(editingKey, data.text.trim());
      cancelEditing();
    } catch (error) {
      console.error("Error updating label:", error);
    }
  };

  // Reset to original values
  const resetToOriginal = () => {
    if (originalValues) {
      setValue("text", originalValues);
    }
  };

  // Toggle edit mode for all labels
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (editingKey) {
      cancelEditing();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Text Manager</h2>
          <p className="text-gray-600 text-sm mt-1">
            Manage website text labels and content
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={toggleEditMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isEditMode
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}>
            <Edit size={16} />
            {isEditMode ? "Exit Edit Mode" : "Edit Mode"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download size={16} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Upload size={16} />
            Import
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search by key or value..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}>
              <option value="all">All Pages</option>
              {getPageNames().map((pageName) => (
                <option key={pageName} value={pageName}>
                  {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="p-8 text-center text-blue-600">Loading labels...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">Error: {error}</div>
        ) : Object.keys(groupedLabels).length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No labels found matching your criteria.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {Object.entries(groupedLabels).map(([pageName, labels]) => (
              <div key={pageName} className="p-4">
                {/* Page Header */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">
                    {pageName} Page
                  </h3>
                  <p className="text-sm text-gray-500">
                    {labels.length} label{labels.length !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Labels for this page */}
                <div className="space-y-3">
                  {labels.map((label) => (
                    <div
                      key={label.key}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      {editingKey === label.key ? (
                        /* Edit Mode */
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Key (Read-only) */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Key
                              </label>
                              <input
                                type="text"
                                value={label.key}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm text-gray-600"
                                readOnly
                              />
                            </div>

                            {/* Text Content */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Text Content
                              </label>
                              <Controller
                                name="text"
                                control={control}
                                rules={{ required: "Text content is required" }}
                                render={({ field, fieldState: { error } }) => (
                                  <>
                                    <textarea
                                      {...field}
                                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                      rows={3}
                                      placeholder="Enter text content"
                                      disabled={!isEditMode}
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

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {hasChanges() && (
                                <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                                  Unsaved changes
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              {hasChanges() && (
                                <button
                                  type="button"
                                  onClick={resetToOriginal}
                                  className="px-3 py-1.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded text-sm flex items-center gap-1 transition-colors">
                                  <RotateCcw size={14} />
                                  Reset
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={cancelEditing}
                                className="px-3 py-1.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded text-sm flex items-center gap-1 transition-colors">
                                <X size={14} />
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={loading || !hasChanges()}
                                className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-colors">
                                <Check size={14} />
                                {loading ? "Saving..." : "Save"}
                              </button>
                            </div>
                          </div>
                        </form>
                      ) : (
                        /* View Mode */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Key */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Key
                            </label>
                            <div className="text-sm text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded border">
                              {label.key}
                            </div>
                          </div>

                          {/* Text Content */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Text Content
                            </label>
                            <div className="text-sm text-gray-900 px-3 py-2 border border-gray-200 rounded bg-white min-h-[2.5rem] flex items-center">
                              {label.text || (
                                <span className="text-gray-400 italic">
                                  No text content
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Edit Button (only show in view mode and when edit mode is enabled) */}
                      {editingKey !== label.key && isEditMode && (
                        <div className="mt-3 flex justify-end">
                          <button
                            onClick={() => startEditing(label)}
                            className="px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded text-sm flex items-center gap-1 transition-colors">
                            <Edit size={14} />
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
