import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Upload,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  Facebook,
  MessageCircle,
  Music,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { BilingualInput } from "./languageToggle";

type Company = {
  id: number;
  name: { th: string; en: string };
  address: { th: string; en: string };
  phone: string;
  email: string;
  businessHours: { th: string; en: string };
};

type CompanyFormValues = {
  name: { th: string; en: string };
  address: { th: string; en: string };
  phone: string;
  email: string;
  businessHours: { th: string; en: string };
};

// Contact Manager Component
export const ContactManager = () => {
  const [activeTab, setActiveTab] = useState("primary");
  const [primaryContact, setPrimaryContact] = useState({
    phone: "+66 2 123 4567",
    email: "info@company.com",
    facebook: "https://facebook.com/company",
    line: "@company",
    tiktok: "@company",
    businessHours: {
      th: "จันทร์-ศุกร์ 9:00-18:00",
      en: "Mon-Fri 9:00-18:00",
    },
    googleMaps: "https://maps.google.com/...",
  });

  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      name: { th: "บริษัท A", en: "Company A" },
      address: { th: "ที่อยู่ A", en: "Address A" },
      phone: "+66 2 111 1111",
      email: "companyA@email.com",
      businessHours: {
        th: "จันทร์-ศุกร์ 8:00-17:00",
        en: "Mon-Fri 8:00-17:00",
      },
    },
  ]);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "" | "add" | "edit" | "delete";
    selectedCompany: Company | null;
  }>({
    isOpen: false,
    type: "",
    selectedCompany: null,
  });

  // React Hook Form for company modal
  const { control, handleSubmit, reset, setValue } = useForm<CompanyFormValues>(
    {
      defaultValues: {
        name: { th: "", en: "" },
        address: { th: "", en: "" },
        phone: "",
        email: "",
        businessHours: { th: "", en: "" },
      },
    }
  );

  const openCompanyModal = (
    type: "" | "add" | "edit" | "delete",
    company: Company | null = null
  ) => {
    if (company) {
      reset({
        name: company.name,
        address: company.address,
        phone: company.phone,
        email: company.email,
        businessHours: company.businessHours,
      });
    } else {
      reset({
        name: { th: "", en: "" },
        address: { th: "", en: "" },
        phone: "",
        email: "",
        businessHours: { th: "", en: "" },
      });
    }
    setModalState({ isOpen: true, type, selectedCompany: company });
  };

  const closeCompanyModal = () => {
    setModalState({ isOpen: false, type: "", selectedCompany: null });
    reset();
  };

  const onCompanySubmit = (data: CompanyFormValues) => {
    if (modalState.type === "add") {
      const newCompany: Company = {
        id: Date.now(),
        ...data,
      };
      setCompanies((prev) => [...prev, newCompany]);
    } else if (modalState.type === "edit" && modalState.selectedCompany) {
      setCompanies((prev) =>
        prev.map((c) =>
          c.id === modalState.selectedCompany!.id
            ? { ...modalState.selectedCompany!, ...data }
            : c
        )
      );
    }
    closeCompanyModal();
  };

  const handleCompanyDelete = () => {
    if (modalState.selectedCompany) {
      setCompanies((prev) =>
        prev.filter((c) => c.id !== modalState.selectedCompany!.id)
      );
    }
    closeCompanyModal();
  };

  // Modal Component
  const CompanyModal = () => {
    if (!modalState.isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {modalState.type === "add" && "Add Partner Company"}
              {modalState.type === "edit" && "Edit Partner Company"}
              {modalState.type === "delete" && "Delete Partner Company"}
            </h3>
            <button
              onClick={closeCompanyModal}
              className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            {modalState.type === "delete" ? (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Are you sure you want to delete "
                  {modalState.selectedCompany?.name.en}"? This action cannot be
                  undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeCompanyModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button
                    onClick={handleCompanyDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onCompanySubmit)}
                className="space-y-6">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <BilingualInput
                      label="Company Name"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={{ th: "ชื่อบริษัท", en: "Company name" }}
                      required
                    />
                  )}
                />

                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <BilingualInput
                      label="Address"
                      type="textarea"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={{
                        th: "ที่อยู่บริษัท",
                        en: "Company address",
                      }}
                    />
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="+66 2 xxx xxxx"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </div>
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="company@email.com"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </div>
                    )}
                  />
                </div>

                <Controller
                  name="businessHours"
                  control={control}
                  render={({ field }) => (
                    <BilingualInput
                      label="Business Hours"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={{ th: "เวลาทำการ", en: "Business hours" }}
                    />
                  )}
                />

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeCompanyModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    {modalState.type === "add" ? "Add Company" : "Save Changes"}
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
        <h2 className="text-2xl font-bold text-gray-900">Contact Manager</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          Save Changes
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "primary"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("primary")}>
              Primary Contact
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "companies"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("companies")}>
              Partner Companies
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "primary" ? (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Primary Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline w-4 h-4 mr-1" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={primaryContact.phone}
                      onChange={(e) =>
                        setPrimaryContact({
                          ...primaryContact,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline w-4 h-4 mr-1" />
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={primaryContact.email}
                      onChange={(e) =>
                        setPrimaryContact({
                          ...primaryContact,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Facebook className="inline w-4 h-4 mr-1" />
                      Facebook
                    </label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={primaryContact.facebook}
                      onChange={(e) =>
                        setPrimaryContact({
                          ...primaryContact,
                          facebook: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageCircle className="inline w-4 h-4 mr-1" />
                      Line ID
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={primaryContact.line}
                      onChange={(e) =>
                        setPrimaryContact({
                          ...primaryContact,
                          line: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Music className="inline w-4 h-4 mr-1" />
                      TikTok
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={primaryContact.tiktok}
                      onChange={(e) =>
                        setPrimaryContact({
                          ...primaryContact,
                          tiktok: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Globe className="inline w-4 h-4 mr-1" />
                      Google Maps URL
                    </label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={primaryContact.googleMaps}
                      onChange={(e) =>
                        setPrimaryContact({
                          ...primaryContact,
                          googleMaps: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <BilingualInput
                label="Business Hours"
                value={primaryContact.businessHours}
                onChange={(value) =>
                  setPrimaryContact({ ...primaryContact, businessHours: value })
                }
                placeholder={{ th: "เวลาทำการ", en: "Business hours" }}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Partner Companies
                </h3>
                <button
                  onClick={() => openCompanyModal("add")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Plus size={16} />
                  Add Company
                </button>
              </div>

              <div className="grid gap-4">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <h4 className="font-medium text-gray-900">
                          {company.name.en}
                        </h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p className="flex items-center gap-2">
                            <MapPin size={14} />
                            {company.address.en}
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone size={14} />
                            {company.phone}
                          </p>
                          <p className="flex items-center gap-2">
                            <Mail size={14} />
                            {company.email}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock size={14} />
                            {company.businessHours.en}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => openCompanyModal("edit", company)}
                          className="text-blue-600 hover:text-blue-700 p-1">
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => openCompanyModal("delete", company)}
                          className="text-red-600 hover:text-red-700 p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <CompanyModal />
    </div>
  );
};
