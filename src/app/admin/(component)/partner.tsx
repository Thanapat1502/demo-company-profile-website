import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Plus, Edit, Trash2, X, Upload } from "lucide-react";
import { BilingualInput } from "./languageToggle";

type Partner = {
  id: number;
  image: string | null;
  name: { th: string; en: string };
};

type FormValues = {
  name: { th: string; en: string };
  image: string | null;
};

export const PartnerManager = () => {
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: 1,
      image: null,
      name: { th: "บริษัท พาร์ทเนอร์ A จำกัด", en: "Partner Company A Ltd." },
    },
    {
      id: 2,
      image: null,
      name: { th: "บริษัท พาร์ทเนอร์ B จำกัด", en: "Partner Company B Ltd." },
    },
    {
      id: 3,
      image: null,
      name: { th: "องค์กรพาร์ทเนอร์ C", en: "Partner Organization C" },
    },
  ]);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "" | "add" | "edit" | "delete";
    selectedPartner: Partner | null;
  }>({
    isOpen: false,
    type: "",
    selectedPartner: null,
  });

  const { control, handleSubmit, reset, setValue, watch } = useForm<FormValues>(
    {
      defaultValues: {
        name: { th: "", en: "" },
        image: null,
      },
    }
  );

  const image = watch("image");

  const openModal = (
    type: "" | "add" | "edit" | "delete",
    partner: Partner | null = null
  ) => {
    if (partner) {
      reset({
        name: partner.name,
        image: partner.image,
      });
    } else {
      reset({
        name: { th: "", en: "" },
        image: null,
      });
    }
    setModalState({ isOpen: true, type, selectedPartner: partner });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: "", selectedPartner: null });
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
      const newPartner: Partner = {
        id: Date.now(),
        ...data,
      };
      setPartners((prev) => [...prev, newPartner]);
    } else if (modalState.type === "edit" && modalState.selectedPartner) {
      setPartners((prev) =>
        prev.map((p) =>
          p.id === modalState.selectedPartner!.id
            ? { ...modalState.selectedPartner!, ...data }
            : p
        )
      );
    }
    closeModal();
  };

  const handleDelete = () => {
    if (modalState.selectedPartner) {
      setPartners((prev) =>
        prev.filter((p) => p.id !== modalState.selectedPartner!.id)
      );
    }
    closeModal();
  };

  // Modal Component
  const PartnerModal = () => {
    if (!modalState.isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {modalState.type === "add" && "Add New Partner"}
              {modalState.type === "edit" && "Edit Partner"}
              {modalState.type === "delete" && "Delete Partner"}
            </h3>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            {modalState.type === "delete" ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Trash2 className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-900">Delete Partner</h4>
                    <p className="text-red-700 text-sm">
                      {`Are you sure you want to delete "${modalState.selectedPartner?.name.en}"? This action cannotbe undone.`}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Delete Partner
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Partner Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Partner Logo
                  </label>
                  <div className="space-y-3">
                    {image ? (
                      <div className="relative inline-block">
                        <div className="w-full max-w-sm h-32 bg-gray-50 border-2 border-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={image}
                            alt="Partner logo preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setValue("image", null)}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors shadow-lg">
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4">
                          <label className="cursor-pointer">
                            <span className="text-blue-600 hover:text-blue-500 font-medium">
                              Upload partner logo
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </label>
                          <p className="text-gray-500 text-sm mt-2">
                            PNG, JPG up to 10MB. Recommended: Square or
                            landscape format
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Partner Name */}
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <BilingualInput
                      label="Partner Name"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={{ th: "ชื่อพาร์ทเนอร์", en: "Partner name" }}
                    />
                  )}
                />

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    {modalState.type === "add" ? "Add Partner" : "Save Changes"}
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
          <h2 className="text-2xl font-bold text-gray-900">Partner Manager</h2>
          <p className="text-gray-600 text-sm mt-1">
            Manage your business partners and their logos
          </p>
        </div>
        <button
          onClick={() => openModal("add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors">
          <Plus size={16} />
          Add Partner
        </button>
      </div>

      {/* Partners Grid */}
      {partners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden">
              {/* Partner Logo */}
              <div className="aspect-video bg-gray-50 flex items-center justify-center p-4">
                {partner.image ? (
                  <img
                    src={partner.image}
                    alt={partner.name.en}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Upload size={24} />
                    </div>
                    <span className="text-sm">No Logo</span>
                  </div>
                )}
              </div>

              {/* Partner Info */}
              <div className="p-4 space-y-3">
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                    {partner.name.en}
                  </h3>
                  <p className="text-xs text-gray-600">{partner.name.th}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal("edit", partner)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-1 transition-colors">
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => openModal("delete", partner)}
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
            No partners yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start by adding your first business partner
          </p>
          <button
            onClick={() => openModal("add")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto transition-colors">
            <Plus size={16} />
            Add Your First Partner
          </button>
        </div>
      )}

      {/* Statistics */}
      {partners.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">
                Total Partners: {partners.length}
              </p>
              <p className="text-xs text-blue-500">
                {partners.filter((p) => p.image).length} with logos,{" "}
                {partners.filter((p) => !p.image).length} without logos
              </p>
            </div>
            <div className="text-2xl">🤝</div>
          </div>
        </div>
      )}

      <PartnerModal />
    </div>
  );
};
