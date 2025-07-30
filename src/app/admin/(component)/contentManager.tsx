import React, { useState } from "react";
import { Save, Upload } from "lucide-react";
import { BilingualInput } from "./languageToggle";

export const ContentManager = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const pages = ["home", "about", "referenc", "news", "contact"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Content Manager</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {pages.map((page) => (
              <button
                key={page}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  selectedPage === page
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setSelectedPage(page)}>
                {page} Page
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Hero Section
              </h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <button className="text-blue-600 hover:text-blue-500">
                    Upload hero image
                  </button>
                  <p className="text-gray-500 text-sm mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
              <BilingualInput
                label="Hero Title"
                placeholder={{ th: "หัวข้อหลัก", en: "Main heading" }}
              />
              <BilingualInput
                label="Hero Description"
                type="textarea"
                placeholder={{ th: "คำอธิบาย", en: "Description" }}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Section Images
              </h3>
              {[1, 2, 3].map((section) => (
                <div
                  key={section}
                  className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">Section {section}</span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      Replace
                    </button>
                  </div>
                  <div className="bg-gray-100 rounded h-20 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">
                      Image placeholder
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
