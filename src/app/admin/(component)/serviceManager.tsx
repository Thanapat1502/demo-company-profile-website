import React, { useState } from "react";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import { BilingualInput } from "./languageToggle";

export const ServiceManager = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: { th: "บริการ A", en: "Service A" },
      displayMode: "parallax",
    },
    {
      id: 2,
      name: { th: "บริการ B", en: "Service B" },
      displayMode: "gallery",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Service Manager</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} />
          Add Service
        </button>
      </div>

      <div className="grid gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Service #{service.id}</h3>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-700">
                  <Edit size={16} />
                </button>
                <button className="text-red-600 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <BilingualInput
                  label="Service Name"
                  value={service.name}
                  placeholder={{ th: "ชื่อบริการ", en: "Service name" }}
                />
                <BilingualInput
                  label="Description"
                  type="textarea"
                  placeholder={{
                    th: "รายละเอียดบริการ",
                    en: "Service description",
                  }}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Mode
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="parallax">Parallax Image</option>
                    <option value="gallery">Image Gallery</option>
                    <option value="video">Video Embed</option>
                  </select>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500 mt-1">Upload media</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
