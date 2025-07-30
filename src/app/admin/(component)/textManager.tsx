import React, { useState } from "react";
import { Download, Upload, Search } from "lucide-react";

export const TextManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("both");

  const mockI18nData = [
    { key: "home.title.th", value: "หน้าแรก", lang: "th" },
    { key: "home.title.en", value: "Home", lang: "en" },
    { key: "about.description.th", value: "เกี่ยวกับเรา", lang: "th" },
    { key: "about.description.en", value: "About Us", lang: "en" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Text Manager</h2>
        <div className="flex gap-3">
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Upload size={16} />
            Import
          </button>
        </div>
      </div>

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
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}>
              <option value="both">Both Languages</option>
              <option value="th">Thai Only</option>
              <option value="en">English Only</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {mockI18nData.map((item, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm font-mono text-gray-600">
                      {item.key}
                    </span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.value}
                      className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        item.lang === "th"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                      {item.lang === "th" ? "ไทย" : "EN"}
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
