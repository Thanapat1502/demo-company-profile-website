import React from "react";
import { Image, Video } from "lucide-react";
import { Control } from "react-hook-form";

interface SectionConfig {
  id: string;
  type: string;
  title: { th: string; en: string };
  minImages?: number;
  maxImages?: number;
  required?: boolean;
}

interface GalleryOrVideoSectionEditorProps {
  config: SectionConfig;
  control: Control<any>;
  mode: "gallery" | "video";
  onModeChange: (mode: "gallery" | "video") => void;
}

export const GalleryOrVideoSectionEditor: React.FC<GalleryOrVideoSectionEditorProps> = ({ 
  config, 
  mode, 
  onModeChange 
}) => {
  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Content Type
        </label>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => onModeChange("gallery")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
              mode === "gallery"
                ? "bg-blue-100 text-blue-700 border border-blue-300"
                : "bg-gray-100 text-gray-600 border border-gray-300"
            }`}>
            <Image size={16} alt="" />
            <span>Gallery</span>
          </button>
          <button
            type="button"
            onClick={() => onModeChange("video")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
              mode === "video"
                ? "bg-blue-100 text-blue-700 border border-blue-300"
                : "bg-gray-100 text-gray-600 border border-gray-300"
            }`}>
            <Video size={16} />
            <span>Video</span>
          </button>
        </div>
      </div>

      {/* Content based on mode */}
      {mode === "gallery" ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gallery Images (Up to {config.maxImages} images)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Image className="mx-auto h-12 w-12 text-gray-400" alt="" />
            <div className="mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Upload Gallery Images
              </button>
              <p className="text-gray-500 text-sm mt-2">
                Upload multiple images for this service section
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video URL
          </label>
          <input
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>
      )}
    </div>
  );
};
