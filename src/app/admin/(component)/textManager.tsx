import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Search, Edit, X, Check, RotateCcw } from "lucide-react";
import { useWebLabelStore, WebLabels } from "@/store/zustand/useWebLabelStore";
import { LoadingOverlay } from "./LoadingOverlay";
import { AdminNotification, useAdminNotification } from "./AdminNotification";
import { TextContentEditor } from "./TextContentEditor";
interface FormValues {
  text: string;
}

export const TextManager = () => {
  const { webLabels, loading, error, fetchWebLabels, editWebLabel } =
    useWebLabelStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPage, setSelectedPage] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [originalValues, setOriginalValues] = useState<string | null>(null);
  const { notification, hideNotification, showSuccess, showError } =
    useAdminNotification();

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

  // Effect to update form when webLabels change and we're editing
  // Only runs when webLabels or editingId changes, not when user types
  useEffect(() => {
    if (editingId && webLabels.length > 0) {
      const currentLabel = webLabels.find((label) => label.id === editingId);
      if (currentLabel) {
        // Only update if we don't have original values set (initial load)
        if (originalValues === null) {
          setValue("text", currentLabel.text || "", {
            shouldValidate: false,
            shouldDirty: false,
          });
          setOriginalValues(currentLabel.text || "");
        }
      }
    }
  }, [webLabels, editingId, setValue, originalValues]);

  // Helper function to get current label being edited
  const getCurrentLabel = () => {
    if (!editingId) return null;
    return webLabels.find((label) => label.id === editingId) || null;
  };

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

  // Start editing a label with improved prefilling
  const startEditing = (label: WebLabels) => {
    // First cancel any existing editing to clean up state
    if (editingId) {
      cancelEditing();
    }

    // Set up new editing session
    setEditingId(label.id);
    setOriginalValues(label.text || ""); // Store original value for reset functionality

    // Prefill the form with current values from webLabels
    setValue("text", label.text || "", {
      shouldValidate: false,
      shouldDirty: false,
    });
  };

  // Cancel editing with proper cleanup
  const cancelEditing = () => {
    setEditingId(null);
    setOriginalValues(null);
    // Reset form to default values and clear any validation errors
    reset(
      { text: "" },
      {
        keepErrors: false,
        keepDirty: false,
        keepIsSubmitted: false,
      }
    );
  };

  // Check if values have changed
  const hasChanges = () => {
    if (!originalValues) return false;
    return watchedValues.text !== originalValues;
  };

  // Submit form with validation
  const onSubmit = async (data: FormValues) => {
    const currentLabel = getCurrentLabel();
    if (!editingId || !currentLabel) return;

    try {
      await editWebLabel(currentLabel.id, data.text.trim());
      cancelEditing();
      showSuccess("อัปเดตสำเร็จ", "ข้อความได้รับการอัปเดตเรียบร้อยแล้ว");
    } catch (error) {
      console.error("Error updating label:", error);
      showError("เกิดข้อผิดพลาด", "ไม่สามารถอัปเดตข้อความได้");
    }
  };

  // Reset to original values with fallback to current label
  const resetToOriginal = () => {
    const currentLabel = getCurrentLabel();
    const resetValue = originalValues || currentLabel?.text || "";
    setValue("text", resetValue, {
      shouldValidate: true,
      shouldDirty: false,
      shouldTouch: false,
    });
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
        {/* <div className="flex gap-3">
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
        </div> */}
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
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Key
                        </th>
                        <th className="w-1/2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Text Content
                        </th>
                        <th className="w-1/4 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {labels.map((label) => (
                        <tr
                          key={label.id}
                          className="hover:bg-gray-50 transition-colors">
                          {editingId === label.id ? (
                            /* Edit Mode - Full width form */
                            <>
                              <td colSpan={3} className="px-6 py-4">
                                <form
                                  onSubmit={handleSubmit(onSubmit)}
                                  className="space-y-4">
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {/* Key (Read-only) */}
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Key
                                      </label>
                                      <input
                                        type="text"
                                        value={label.key}
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm text-gray-600 font-mono"
                                        readOnly
                                      />
                                    </div>

                                    {/* Text Content */}
                                    <TextContentEditor
                                      control={control}
                                      name="text"
                                      label="Text Content"
                                      placeholder="Enter text content"
                                      rows={3}
                                      disabled={false}
                                      required={true}
                                      showActions={false}
                                    />
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
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
                              </td>
                            </>
                          ) : (
                            /* View Mode - Table cells */
                            <>
                              {/* Key Cell */}
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded border">
                                  {label.key}
                                </div>
                              </td>

                              {/* Text Content Cell */}
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900 max-w-md">
                                  {label.text ? (
                                    <div className="break-words">
                                      {label.text}
                                    </div>
                                  ) : (
                                    <span className="text-gray-400 italic">
                                      No text content
                                    </span>
                                  )}
                                </div>
                              </td>

                              {/* Actions Cell */}
                              <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button
                                  onClick={() => startEditing(label)}
                                  className="px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded text-sm flex items-center gap-1 transition-colors ml-auto">
                                  <Edit size={14} />
                                  Edit
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {loading && <LoadingOverlay message="กำลังโหลดข้อมูล..." />}

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
