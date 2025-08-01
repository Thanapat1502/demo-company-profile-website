import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import { usePartnerStore } from "@/store/zustand/partnerStore";
import { PartnerModal } from "./partnerModal";

// Types for partner
interface Partner {
  id: string;
  name: string;
  logo_url: string;
  updated_at?: string;
}

interface FormValues {
  name: string;
  logo: File | string | null;
}

export const PartnerManager = () => {
  const {
    partners,
    loading,
    error,
    fetchPartners,
    addPartner,
    updatePartner,
    deletePartner,
  } = usePartnerStore();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "" | "add" | "edit" | "delete";
    selectedPartner: Partner | null;
  }>({
    isOpen: false,
    type: "",
    selectedPartner: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const openModal = (
    type: "" | "add" | "edit" | "delete",
    partner: Partner | null = null
  ) => {
    setModalState({ isOpen: true, type, selectedPartner: partner });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: "", selectedPartner: null });
  };

  const handleModalSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      if (modalState.type === "add") {
        await addPartner({
          name: data.name,
          logo: data.logo || undefined,
        });
      } else if (modalState.type === "edit" && modalState.selectedPartner) {
        await updatePartner(modalState.selectedPartner.id, {
          name: data.name,
          logo: data.logo || undefined,
        });
      }
      closeModal();
    } catch (error) {
      console.error("Error submitting partner:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalDelete = async () => {
    if (modalState.selectedPartner) {
      setIsSubmitting(true);
      try {
        await deletePartner(modalState.selectedPartner.id);
        closeModal();
      } catch (error) {
        console.error("Error deleting partner:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
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
      {loading ? (
        <div className="text-center py-12 text-blue-600">
          Loading partners...
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : partners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow overflow-hidden">
              {/* Partner Logo */}
              <div className="aspect-video bg-gray-50 flex items-center justify-center p-4">
                {partner.logo_url ? (
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
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
                    {partner.name}
                  </h3>
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
                {partners.filter((p) => p.logo_url).length} with logos,{" "}
                {partners.filter((p) => !p.logo_url).length} without logos
              </p>
            </div>
            <div className="text-2xl">🤝</div>
          </div>
        </div>
      )}
      <PartnerModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        selectedPartner={modalState.selectedPartner}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        onDelete={handleModalDelete}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
