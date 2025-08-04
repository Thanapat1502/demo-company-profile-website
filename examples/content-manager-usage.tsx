// Example: Complete Content Manager Implementation
// This file shows how to use the Content Manager system in a real application

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useContentManager,
  useImageUpload,
  useSectionMode,
} from "@/hooks/useContentManager";
import { ContentManager } from "@/app/admin/(component)/heroContentManagerNew";

// Example 1: Basic Content Manager Usage
export const BasicContentManagerExample = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Website Content Manager
        </h1>

        {/* The main Content Manager component */}
        <ContentManager />
      </div>
    </div>
  );
};

// Example 2: Custom Content Manager with Hooks
export const CustomContentManagerExample = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [selectedLanguage, setSelectedLanguage] = useState<"th" | "en">("th");

  const {
    pages,
    currentPageData,
    sectionConfigs,
    isLoading,
    isSaving,
    error,
    loadPageData,
    savePageContent,
    clearError,
  } = useContentManager();

  const { uploadImage, getImageUrl, getUploadProgress } = useImageUpload();

  // Load page data when page selection changes
  useEffect(() => {
    if (selectedPage) {
      loadPageData(selectedPage, "draft");
    }
  }, [selectedPage, loadPageData]);

  // Form setup
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      status: "draft" as "draft" | "published",
      sections: [],
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await savePageContent(selectedPage, data);
      alert("Content saved successfully!");
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Custom Content Manager
          </h1>

          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <select
              value={selectedLanguage}
              onChange={(e) =>
                setSelectedLanguage(e.target.value as "th" | "en")
              }
              className="px-3 py-2 border border-gray-300 rounded-md">
              <option value="th">ไทย</option>
              <option value="en">English</option>
            </select>

            {/* Save Button */}
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSaving}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
                <button
                  onClick={clearError}
                  className="mt-2 text-sm text-red-600 hover:text-red-500">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Selection */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {pages.map((page) => (
                <button
                  key={page.page_id}
                  onClick={() => setSelectedPage(page.page_id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedPage === page.page_id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}>
                  {selectedLanguage === "th" ? page.name_th : page.name_en}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Sections */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {sectionConfigs.map((config) => (
              <CustomSectionEditor
                key={config.id}
                config={config}
                selectedLanguage={selectedLanguage}
                control={control}
                uploadImage={uploadImage}
                getImageUrl={getImageUrl}
                getUploadProgress={getUploadProgress}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

// Example 3: Custom Section Editor Component
interface CustomSectionEditorProps {
  config: any;
  selectedLanguage: "th" | "en";
  control: any;
  uploadImage: (
    file: File,
    sectionId: string,
    imageIndex: number
  ) => Promise<any>;
  getImageUrl: (sectionId: string, imageIndex: number) => string | undefined;
  getUploadProgress: (
    sectionId: string,
    imageIndex: number
  ) => number | undefined;
}

const CustomSectionEditor: React.FC<CustomSectionEditorProps> = ({
  config,
  selectedLanguage,
  control,
  uploadImage,
  getImageUrl,
  getUploadProgress,
}) => {
  const { mode, switchMode } = useSectionMode();
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = async (file: File, imageIndex: number) => {
    try {
      await uploadImage(file, config.section_id, imageIndex);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleDrop = (e: React.DragEvent, imageIndex: number) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      handleFileUpload(files[0], imageIndex);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {selectedLanguage === "th" ? config.title_th : config.title_en}
        </h3>

        {config.section_type === "gallery_or_video" && (
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => switchMode("gallery")}
              className={`px-3 py-1 rounded-md text-sm ${
                mode === "gallery"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600"
              }`}>
              Gallery
            </button>
            <button
              type="button"
              onClick={() => switchMode("video")}
              className={`px-3 py-1 rounded-md text-sm ${
                mode === "video"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600"
              }`}>
              Video
            </button>
          </div>
        )}
      </div>

      {/* Section Content */}
      <div className="space-y-4">
        {/* Title Input */}
        <Controller
          name={`sections.${config.section_id}.title_${selectedLanguage}`}
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title ({selectedLanguage === "th" ? "ไทย" : "English"})
              </label>
              <input
                {...field}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={selectedLanguage === "th" ? "หัวข้อ" : "Title"}
              />
            </div>
          )}
        />

        {/* Image Upload Areas */}
        {(config.section_type === "hero" ||
          config.section_type === "parallax_gallery" ||
          (config.section_type === "gallery_or_video" &&
            mode === "gallery")) && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: config.max_images || 3 }).map((_, index) => {
              const imageUrl = getImageUrl(config.section_id, index);
              const progress = getUploadProgress(config.section_id, index);

              return (
                <div
                  key={index}
                  className={`border-2 border-dashed rounded-lg p-4 text-center aspect-square flex flex-col items-center justify-center transition-colors ${
                    dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => handleDrop(e, index)}>
                  {imageUrl ? (
                    <div className="relative w-full h-full">
                      <img
                        src={imageUrl}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          /* Remove image logic */
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                        ×
                      </button>
                    </div>
                  ) : progress !== undefined ? (
                    <div className="w-full">
                      <div className="text-sm text-gray-600 mb-2">
                        Uploading...
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-gray-400 mb-2">📷</div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, index);
                        }}
                        className="hidden"
                        id={`upload-${config.section_id}-${index}`}
                      />
                      <label
                        htmlFor={`upload-${config.section_id}-${index}`}
                        className="cursor-pointer text-blue-600 hover:text-blue-500 text-sm">
                        Upload Image {index + 1}
                      </label>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Video URL Input */}
        {config.section_type === "gallery_or_video" && mode === "video" && (
          <Controller
            name={`sections.${config.section_id}.video_url`}
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL
                </label>
                <input
                  {...field}
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
};

// Example 4: Frontend Display Component
export const ContentDisplayExample = () => {
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load published content for display
    const loadContent = async () => {
      try {
        // This would typically come from your content service
        const data = await fetch("/api/content/home").then((res) => res.json());
        setPageData(data);
      } catch (error) {
        console.error("Failed to load content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      {pageData?.sections?.hero && (
        <section className="relative h-screen">
          <div className="absolute inset-0">
            <img
              src={pageData.sections.hero.images[0]?.url}
              alt={pageData.sections.hero.images[0]?.alt_text_en}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-40">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">
                {pageData.sections.hero.title_en}
              </h1>
              <p className="text-xl">{pageData.sections.hero.description_en}</p>
            </div>
          </div>
        </section>
      )}

      {/* Parallax Gallery */}
      {pageData?.sections?.parallax_gallery && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {pageData.sections.parallax_gallery.title_en}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pageData.sections.parallax_gallery.images.map(
                (image: any, index: number) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={image.url}
                      alt={image.alt_text_en}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
