import React from "react";
import { Image } from "lucide-react";
import { Control } from "react-hook-form";

interface SectionConfig {
  id: string;
  type: string;
  title: { th: string; en: string };
  minImages?: number;
  maxImages?: number;
  required?: boolean;
}

interface ParallaxGallerySectionEditorProps {
  config: SectionConfig;
  control: Control<any>;
}

export const ParallaxGallerySectionEditor: React.FC<
  ParallaxGallerySectionEditorProps
> = ({ config }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gallery Images ({config.minImages}-{config.maxImages} images)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Image className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Upload Gallery Images
            </button>
            <p className="text-gray-500 text-sm mt-2">
              Upload {config.minImages} to {config.maxImages} images for
              parallax effect
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
