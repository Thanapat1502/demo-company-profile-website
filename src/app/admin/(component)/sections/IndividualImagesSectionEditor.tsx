import React, { useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { Control } from "react-hook-form";
import Image from "next/image";

interface SectionConfig {
  id: string;
  type: string;
  title: { th: string; en: string };
  minImages?: number;
  maxImages?: number;
  required?: boolean;
}

interface IndividualImagesSectionEditorProps {
  config: SectionConfig;
  control: Control<any>;
}

export const IndividualImagesSectionEditor: React.FC<IndividualImagesSectionEditorProps> = ({ config }) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Individual Images (Exactly {config.maxImages} images required)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: config.maxImages || 6 }).map((_, index) => (
            <div
              key={index}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center aspect-square flex flex-col items-center justify-center">
              {uploadedImages[index] ? (
                <div className="relative w-full h-full">
                  <Image
                    src={uploadedImages[index]}
                    alt={`Upload ${index + 1}`}
                    fill
                    className="object-cover rounded"
                  />
                  <button
                    onClick={() => {
                      const newImages = [...uploadedImages];
                      newImages[index] = "";
                      setUploadedImages(newImages);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                    <Trash2 size={12} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-400" />
                  <button className="text-blue-600 hover:text-blue-500 text-sm mt-2">
                    Upload Image {index + 1}
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
