import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { BilingualInput } from "./languageToggle";

type Executive = {
  id: number;
  image: string | null;
  name: { th: string; en: string };
  title: { th: string; en: string };
};

type FormValues = {
  image: string | null;
  name: { th: string; en: string };
  title: { th: string; en: string };
};

export const ExecutiveManager = () => {
  const [executives, setExecutives] = useState<Executive[]>([
    {
      id: 1,
      image: null,
      name: { th: "นายจอห์น โด", en: "John Doe" },
      title: { th: "ประธานบริหาร", en: "Chief Executive Officer" },
    },
    {
      id: 2,
      image: null,
      name: { th: "นางสาวเจน สมิธ", en: "Jane Smith" },
      title: { th: "ผู้อำนวยการฝ่ายการตลาด", en: "Marketing Director" },
    },
  ]);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "" | "add" | "edit" | "delete";
    selectedExecutive: Executive | null;
  }>({
    isOpen: false,
    type: "",
    selectedExecutive: null,
  });

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

  const openModal = (
    type: "" | "add" | "edit" | "delete",
    executive: Executive | null = null
  ) => {
    if (executive) {
      reset({
        image: executive.image,
        name: executive.name,
        title: executive.title,
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
      const reader = new FileReader();
      reader.onload = (ev) => {
        setValue("image", ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    if (modalState.type === "add") {
      const newExecutive: Executive = {
        id: Date.now(),
        ...data,
      };
      setExecutives((prev) => [...prev, newExecutive]);
    } else if (modalState.type === "edit" && modalState.selectedExecutive) {
      setExecutives((prev) =>
        prev.map((e) =>
          e.id === modalState.selectedExecutive!.id
            ? { ...modalState.selectedExecutive!, ...data }
            : e
        )
      );
    }
    closeModal();
  };

  const handleDelete = () => {
    if (modalState.selectedExecutive) {
      setExecutives((prev) =>
        prev.filter((e) => e.id !== modalState.selectedExecutive!.id)
      );
    }
    closeModal();
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
              <div className="space-y-4">
                <p className="text-gray-600">
                  Are you sure you want to delete "
                  {modalState.selectedExecutive?.name.en}"? This action cannot
                  be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Profile Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className="shrink-0">
                      <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        {image ? (
                          <img
                            src={image}
                            alt="Executive"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs text-center">
                            No Image
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <span>Change photo</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                      {image && (
                        <button
                          type="button"
                          onClick={() => setValue("image", null)}
                          className="ml-3 text-sm text-red-600 hover:text-red-700">
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
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

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    {modalState.type === "add"
                      ? "Add Executive"
                      : "Save Changes"}
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Executive Manager</h2>
        <button
          onClick={() => openModal("add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} />
          Add Executive
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {executives.map((executive) => (
          <div
            key={executive.id}
            className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
              {executive.image ? (
                <img
                  src={executive.image}
                  alt={executive.name.en}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center">
                    <span className="text-2xl font-medium text-gray-400">
                      {executive.name.en?.charAt(0) || "?"}
                    </span>
                  </div>
                  <span className="text-sm">No Photo</span>
                </div>
              )}
            </div>

            <div className="p-4 space-y-3">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">
                  {executive.name.en}
                </h3>
                <p className="text-sm text-gray-600">{executive.title.en}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openModal("edit", executive)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-1">
                  <Edit size={14} />
                  Edit
                </button>
                <button
                  onClick={() => openModal("delete", executive)}
                  className="px-3 py-2 border border-red-300 text-red-700 rounded text-sm hover:bg-red-50 flex items-center justify-center">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ExecutiveModal />
    </div>
  );
};
