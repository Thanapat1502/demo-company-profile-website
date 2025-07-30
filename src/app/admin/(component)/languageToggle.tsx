import React, { useState } from "react";

export const LanguageToggle = ({ value, onChange, size = "default" }) => {
  const isLarge = size === "large";
  return (
    <div
      className={`inline-flex rounded-lg border bg-gray-50 p-1 ${
        isLarge ? "text-sm" : "text-xs"
      }`}>
      <button
        className={`px-3 py-1 rounded-md font-medium transition-colors ${
          value === "th"
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
        onClick={() => onChange("th")}>
        ไทย
      </button>
      <button
        className={`px-3 py-1 rounded-md font-medium transition-colors ${
          value === "en"
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
        onClick={() => onChange("en")}>
        EN
      </button>
    </div>
  );
};

export const BilingualInput = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}) => {
  const [activeTab, setActiveTab] = useState("th");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <LanguageToggle value={activeTab} onChange={setActiveTab} />
      </div>

      <div className="relative">
        {type === "textarea" ? (
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            placeholder={placeholder?.[activeTab]}
            value={value?.[activeTab] || ""}
            onChange={(e) =>
              onChange({ ...value, [activeTab]: e.target.value })
            }
          />
        ) : (
          <input
            type={type}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={placeholder?.[activeTab]}
            value={value?.[activeTab] || ""}
            onChange={(e) =>
              onChange({ ...value, [activeTab]: e.target.value })
            }
          />
        )}
        <div className="absolute -top-1 right-2 bg-white px-1 text-xs text-gray-500">
          {activeTab === "th" ? "ภาษาไทย" : "English"}
        </div>
      </div>
    </div>
  );
};
