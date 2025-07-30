import React, { useState } from "react";
import { Plus, Upload, Type } from "lucide-react";
import { LanguageToggle } from "./languageToggle";

export const NewsManager = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("th");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            News/Event Manager
          </h2>
          <LanguageToggle
            value={selectedLanguage}
            onChange={setSelectedLanguage}
            size="large"
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} />
          Add Article
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title ({selectedLanguage === "th" ? "ไทย" : "English"})
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={
                    selectedLanguage === "th" ? "หัวข้อข่าว" : "News title"
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="highlight" className="rounded" />
                <label htmlFor="highlight" className="text-sm text-gray-700">
                  Highlight this article
                </label>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-500 mt-1">Featured image</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content ({selectedLanguage === "th" ? "ไทย" : "English"})
              </label>
              <div className="border border-gray-300 rounded-md min-h-96 bg-gray-50 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Type size={32} className="mx-auto mb-2" />
                  <p>Rich text editor would be here</p>
                  <p className="text-sm">(React18QuillEditor)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Save as Draft
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
