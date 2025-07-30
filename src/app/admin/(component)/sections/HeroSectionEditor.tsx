import React from "react";
import { Upload } from "lucide-react";
import { Control } from "react-hook-form";

interface SectionConfig {
  id: string;
  type: string;
  title: { th: string; en: string };
  minImages?: number;
  maxImages?: number;
  required?: boolean;
}

interface HeroSectionEditorProps {
  config: SectionConfig;
  control: Control<any>;
}

export const HeroSectionEditor: React.FC<HeroSectionEditorProps> = ({ config }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hero Images ({config.minImages}-{config.maxImages} images)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <div className="mt-2">
            <button className="text-blue-600 hover:text-blue-500">
              Upload Images
            </button>
            <p className="text-gray-500 text-sm mt-1">
              PNG, JPG up to 10MB each
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
