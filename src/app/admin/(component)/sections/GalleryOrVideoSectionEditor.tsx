import React, { useState } from "react";
import {
  Image,
  Video,
  Upload,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

export const GalleryOrVideoSectionEditor: React.FC<
  GalleryOrVideoSectionEditorProps
> = ({ config, mode, onModeChange }) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");

  const maxImages = config.maxImages || 5;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const remainingSlots = maxImages - uploadedImages.length;
    const filesToAdd = files.slice(0, remainingSlots);

    setUploadedImages((prev) => [...prev, ...filesToAdd]);
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    if (currentImageIndex >= uploadedImages.length - 1) {
      setCurrentImageIndex(Math.max(0, uploadedImages.length - 2));
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % uploadedImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + uploadedImages.length) % uploadedImages.length
    );
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Content Type
        </label>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => onModeChange("gallery")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              mode === "gallery"
                ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                : "bg-gray-100 text-gray-600 border-2 border-gray-300 hover:bg-gray-200"
            }`}>
            <Image size={16} />
            <span>Image Gallery</span>
          </button>
          <button
            type="button"
            onClick={() => onModeChange("video")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              mode === "video"
                ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                : "bg-gray-100 text-gray-600 border-2 border-gray-300 hover:bg-gray-200"
            }`}>
            <Video size={16} />
            <span>Video URL</span>
          </button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Upload/Input */}
        <div className="space-y-4">
          {mode === "gallery" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload Images (Max {maxImages})
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                <div>
                  <label className="cursor-pointer">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block">
                      Choose Images
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadedImages.length >= maxImages}
                    />
                  </label>
                  <p className="text-gray-500 text-sm mt-2">
                    {uploadedImages.length}/{maxImages} images uploaded
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Video URL
              </label>
              <div className="space-y-3">
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-1">Supported platforms:</p>
                  <ul className="text-xs space-y-1 text-gray-500">
                    <li>• YouTube</li>
                    <li>• Vimeo</li>
                    <li>• Direct video links (.mp4, .webm)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Preview */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Preview
          </label>

          {mode === "gallery" ? (
            uploadedImages.length > 0 ? (
              <div className="space-y-4">
                {/* Carousel Preview */}
                <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
                  <img
                    src={URL.createObjectURL(uploadedImages[currentImageIndex])}
                    alt={`Preview ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {uploadedImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity">
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity">
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {uploadedImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white bg-opacity-50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-full aspect-square object-cover rounded cursor-pointer transition-opacity ${
                          index === currentImageIndex
                            ? "ring-2 ring-blue-500"
                            : "hover:opacity-80"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center aspect-video flex items-center justify-center">
                <div>
                  <Image className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                  <p className="text-gray-400 text-sm">
                    No images uploaded yet
                  </p>
                </div>
              </div>
            )
          ) : videoUrl ? (
            <div className="bg-gray-100 rounded-lg p-6 aspect-video flex items-center justify-center">
              <div className="text-center">
                <Video className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-600 font-medium">Video URL Set</p>
                <p className="text-gray-500 text-sm mt-1 break-all">
                  {videoUrl}
                </p>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center aspect-video flex items-center justify-center">
              <div>
                <Video className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                <p className="text-gray-400 text-sm">
                  Enter video URL to preview
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
