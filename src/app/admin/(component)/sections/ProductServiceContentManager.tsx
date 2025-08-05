import React, { useState, useEffect, useCallback } from "react";
import { Save, Upload, X, Image as ImageIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useContentStore } from "@/store/zustand/contentStore";
import { ServiceContentToggle } from "../ServiceContentToggle";

interface ProductServiceContentFormData {
  heroImages: File[];
}

interface ProductServiceContentManagerProps {
  onSave?: (data: { success: boolean; error?: string }) => void;
  loading?: boolean;
}

// Product & Service Upload Component WATCH
interface ProductServiceSlot {
  id: string;
  serviceId: string; // SERVICE_1, SERVICE_2, SERVICE_3, SERVICE_4
  images?: File[]; // Multiple images support
  imageUrls?: string[]; // Multiple image URLs
  existingImages?: string[];
  videoUrl?: string;
  type: "image" | "video";
  contentType: "gallery" | "video"; // For API
  instruction: string;
  order: number;
  updateMode: boolean; // Toggle for update functionality
  title: string;
}

// Hero Image Upload Component (simplified for single image)
interface HeroImageUploadProps {
  images: File[];
  maxImages: number;
  onChange: (images: File[]) => void;
  existingImages: string[];
  onRemoveExisting: (index: number) => void;
  loading: boolean;
}

const HeroImageUpload: React.FC<HeroImageUploadProps> = ({
  images,
  maxImages,
  onChange,
  existingImages,
  onRemoveExisting,
  loading,
}) => {
  const totalImages = existingImages.length + images.length;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const remainingSlots = maxImages - totalImages;
    const filesToAdd = files.slice(0, remainingSlots);
    onChange([...images, ...filesToAdd]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading existing images...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Current Images
          </h4>
          <div className="gap-4">
            {existingImages.map((imageUrl, index) => (
              <div key={`existing-${index}`} className="relative ">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden w-1/2">
                  <img
                    src={imageUrl}
                    alt={`Existing hero image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveExisting(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={16} />
                </button>
                <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div className="space-y-2">
          <label className="cursor-pointer">
            <span
              className={`px-6 py-3 rounded-lg transition-colors inline-block ${
                totalImages >= maxImages
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}>
              {totalImages >= maxImages
                ? "Maximum Images Reached"
                : "Add More Images"}
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={totalImages >= maxImages}
            />
          </label>
          <p className="text-gray-500 text-sm">
            PNG, JPG up to 10MB each ({totalImages}/{maxImages} images)
          </p>
        </div>
      </div>

      {/* New Images Preview */}
      {images.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            New Images to Upload
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={`new-${index}`} className="relative group">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`New hero image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={16} />
                </button>
                <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  New {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface ProductServiceUploadProps {
  slots: ProductServiceSlot[];
  onSlotsChange: (slots: ProductServiceSlot[]) => void;
  loading: boolean;
  onReset?: () => void;
}

const ProductServiceUpload: React.FC<ProductServiceUploadProps> = ({
  slots,
  onSlotsChange,
  loading,
  onReset,
}) => {
  const [currentImages, setCurrentImages] = useState<Record<string, string[]>>(
    {}
  );
  const [currentVideos, setCurrentVideos] = useState<Record<string, string>>(
    {}
  );

  // Fetch current images and videos from database
  const fetchCurrentImages = async () => {
    try {
      console.log("🔄 Fetching current service content...");
      const response = await fetch("/api/service-content");
      if (response.ok) {
        const data = await response.json();
        console.log("📡 Raw service content response:", data);

        const imageMap: Record<string, string[]> = {};
        const videoMap: Record<string, string> = {};

        if (data.success && Array.isArray(data.data)) {
          console.log("📊 Processing content items:", data.data.length);

          data.data.forEach(
            (item: {
              id: string;
              images_url: string[];
              video_url: string;
              type: string;
            }) => {
              console.log(`📝 Processing item:`, {
                id: item.id,
                type: item.type,
                hasImages: !!item.images_url,
                imageCount: item.images_url?.length || 0,
                hasVideo: !!item.video_url,
              });

              if (item.id) {
                // Handle images
                if (item.images_url && Array.isArray(item.images_url)) {
                  imageMap[item.id] = item.images_url;

                  // Special logging for SERVICE_5
                  if (item.id === "SERVICE_5") {
                    console.log("🔍 SERVICE_5 Content Found:", {
                      id: item.id,
                      type: item.type,
                      imageCount: item.images_url.length,
                      images: item.images_url,
                      fullItem: item,
                    });
                  }
                }
                // Handle videos
                if (item.video_url && item.type === "video") {
                  videoMap[item.id] = item.video_url;
                }
              }
            }
          );
        } else {
          console.log("⚠️ No content found in response or invalid format");
        }

        console.log("📊 Final image map:", imageMap);
        console.log("📊 Final video map:", videoMap);

        // Special check for SERVICE_5
        if (imageMap["SERVICE_5"]) {
          console.log(
            "✅ SERVICE_5 images loaded successfully:",
            imageMap["SERVICE_5"]
          );
        } else {
          console.log("❌ SERVICE_5 images not found in imageMap");
        }

        setCurrentImages(imageMap);
        setCurrentVideos(videoMap);
      } else {
        console.error(
          "❌ Failed to fetch service content:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("❌ Error fetching current content:", error);
    }
  };

  // Delete current image from database
  const deleteCurrentImage = async (serviceId: string, imageUrl: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this image? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch("/api/service-content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: serviceId,
          page: "SERVICE",
          type: "gallery",
          action: "delete_image",
          image_url: imageUrl,
        }),
      });

      if (response.ok) {
        // Refresh current images after deletion
        await fetchCurrentImages();
        alert("Image deleted successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert(`Failed to delete image: ${(error as Error).message}`);
    }
  };

  // Fetch current images on component mount
  useEffect(() => {
    fetchCurrentImages();
  }, []);
  const handleImageUpload = (slotIndex: number, files: FileList | File[]) => {
    const newSlots = [...slots];
    const fileArray = Array.from(files);
    const currentImages = newSlots[slotIndex].images || [];
    const currentImageUrls = newSlots[slotIndex].imageUrls || [];

    // Limit to max 20 images total
    const totalImages = currentImages.length + fileArray.length;
    const filesToAdd =
      totalImages > 20
        ? fileArray.slice(0, 20 - currentImages.length)
        : fileArray;

    const newImageUrls = filesToAdd.map((file) => URL.createObjectURL(file));

    newSlots[slotIndex] = {
      ...newSlots[slotIndex],
      images: [...currentImages, ...filesToAdd],
      imageUrls: [...currentImageUrls, ...newImageUrls],
      videoUrl: undefined,
      type: "image",
      contentType: "gallery",
    };
    onSlotsChange(newSlots);
  };

  const handleVideoUrlChange = (slotIndex: number, videoUrl: string) => {
    const newSlots = [...slots];
    newSlots[slotIndex] = {
      ...newSlots[slotIndex],
      videoUrl,
      images: undefined,
      imageUrls: undefined,
      type: "video",
      contentType: "video",
    };
    onSlotsChange(newSlots);
  };

  const removeContent = (slotIndex: number) => {
    const newSlots = [...slots];
    newSlots[slotIndex] = {
      ...newSlots[slotIndex],
      images: undefined,
      imageUrls: undefined,
      videoUrl: undefined,
      type: "image",
    };
    onSlotsChange(newSlots);
  };

  const removeImage = (slotIndex: number, imageIndex: number) => {
    const newSlots = [...slots];
    const currentImages = newSlots[slotIndex].images || [];
    const currentImageUrls = newSlots[slotIndex].imageUrls || [];

    const newImages = currentImages.filter((_, index) => index !== imageIndex);
    const newImageUrls = currentImageUrls.filter(
      (_, index) => index !== imageIndex
    );

    newSlots[slotIndex] = {
      ...newSlots[slotIndex],
      images: newImages.length > 0 ? newImages : undefined,
      imageUrls: newImageUrls.length > 0 ? newImageUrls : undefined,
    };
    onSlotsChange(newSlots);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading existing content...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-gray-900">
        Products & Services Content
      </h4>

      <div className="flex flex-col gap-6">
        {slots.map((slot, index) => (
          <div
            key={slot.id}
            className="border border-gray-200 rounded-lg p-4 space-y-4">
            {/* Slot Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/**WATCH */}
                <span className="text-sm font-medium text-gray-700">
                  Slot {index + 1} ({slot.title})
                </span>

                {/* Independent Content Type Toggle */}
                <ServiceContentToggle
                  serviceId={slot.serviceId}
                  currentType={slot.contentType}
                  onTypeChange={(newType) => {
                    const newSlots = [...slots];
                    newSlots[index] = {
                      ...newSlots[index],
                      contentType: newType,
                      type: newType === "gallery" ? "image" : "video",
                    };
                    onSlotsChange(newSlots);
                  }}
                />
              </div>
            </div>

            {/* Content Type Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                type="button"
                onClick={() => {
                  if (slot.type !== "image") {
                    const newSlots = [...slots];
                    newSlots[index] = {
                      ...newSlots[index],
                      type: "image",
                      videoUrl: undefined,
                    };
                    onSlotsChange(newSlots);
                  }
                }}
                className={`px-4 py-2 text-sm font-medium border-b-2 ${
                  slot.type === "image"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}>
                Image
              </button>
              <button
                type="button"
                onClick={() => {
                  if (slot.type !== "video") {
                    const newSlots = [...slots];
                    newSlots[index] = {
                      ...newSlots[index],
                      type: "video",
                      contentType: "video",
                      images: undefined,
                      imageUrls: undefined,
                    };
                    onSlotsChange(newSlots);
                  }
                }}
                className={`px-4 py-2 text-sm font-medium border-b-2 ${
                  slot.type === "video"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}>
                Video
              </button>
            </div>

            {/* Content Upload Area */}
            <div className="space-y-6">
              {slot.type === "image" ? (
                // Image Upload
                <div className="space-y-6">
                  {/* Current Images from Database */}
                  {currentImages[slot.serviceId] &&
                    currentImages[slot.serviceId].length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-700">
                            📁 Current Images (
                            {currentImages[slot.serviceId].length})
                          </h4>
                          <button
                            type="button"
                            onClick={fetchCurrentImages}
                            className="text-xs text-blue-600 hover:text-blue-700 underline">
                            Refresh
                          </button>
                        </div>
                        <div className="flex flex-row flex-wrap gap-4">
                          {currentImages[slot.serviceId].map(
                            (imageUrl, imgIndex) => (
                              <div
                                key={imgIndex}
                                className="relative group w-80">
                                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-green-200">
                                  <img
                                    src={imageUrl}
                                    alt={`Current ${slot.serviceId} image ${
                                      imgIndex + 1
                                    }`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="absolute bottom-1 left-1 bg-green-600 text-white text-xs px-1 rounded">
                                  {imgIndex + 1}
                                </div>
                                <div className="absolute top-1 right-1 bg-green-600 text-white text-xs px-1 rounded">
                                  ✓
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    deleteCurrentImage(slot.serviceId, imageUrl)
                                  }
                                  className="absolute top-1 left-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100">
                                  <X size={10} />
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* New Images to Upload */}
                  {slot.imageUrls && slot.imageUrls.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-700">
                        📤 New Images to Upload ({slot.imageUrls.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {slot.imageUrls.map((imageUrl, imgIndex) => (
                          <div key={imgIndex} className="relative group">
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-blue-200">
                              <img
                                src={imageUrl}
                                alt={`New ${slot.serviceId} image ${
                                  imgIndex + 1
                                }`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index, imgIndex)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100">
                              <X size={10} />
                            </button>
                            <div className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-1 rounded">
                              {imgIndex + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <ImageIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <div className="space-y-2">
                      <label className="cursor-pointer">
                        <span className="text-sm text-blue-600 hover:text-blue-700">
                          Upload Images (Max 20)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                              handleImageUpload(index, files);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500">
                        New: {slot.imageUrls?.length || 0}/20 images
                        {currentImages[slot.serviceId] && (
                          <span className="ml-2 text-green-600">
                            | Current: {currentImages[slot.serviceId].length}{" "}
                            saved
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // Video URL Input
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Video URL
                  </label>
                  <input
                    type="url"
                    value={slot.videoUrl || currentVideos[slot.serviceId] || ""}
                    onChange={(e) =>
                      handleVideoUrlChange(index, e.target.value)
                    }
                    placeholder={
                      currentVideos[slot.serviceId]
                        ? `Current: ${currentVideos[slot.serviceId]}`
                        : "https://youtube.com/watch?v=... or https://vimeo.com/..."
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {currentVideos[slot.serviceId] && !slot.videoUrl && (
                    <p className="text-xs text-green-600 mt-1">
                      💾 Current video URL: {currentVideos[slot.serviceId]}
                    </p>
                  )}
                  {slot.videoUrl && (
                    <div className="mt-2">
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center relative">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                          </div>
                          <p className="text-sm text-gray-600">Video Preview</p>
                          <p className="text-xs text-gray-500 mt-1 break-all">
                            {slot.videoUrl}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeContent(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Instruction Display */}
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-sm text-green-800 font-medium">
                📝 {slot.instruction}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      {onReset && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <X size={16} />
            <span>Cancel Changes</span>
          </button>
        </div>
      )}
    </div>
  );
};

export const ProductServiceContentManager: React.FC<
  ProductServiceContentManagerProps
> = ({ onSave, loading = false }) => {
  const [existingHeroImages, setExistingHeroImages] = useState<string[]>([]);
  const [productServiceSlots, setProductServiceSlots] = useState<
    ProductServiceSlot[]
  >([]);
  const { updateServiceContent, content, fetchContent } = useContentStore();

  // Reset function to clear all unsaved changes
  const handleReset = () => {
    if (
      confirm(
        "Are you sure you want to cancel all changes? This will reset all unsaved data."
      )
    ) {
      setProductServiceSlots(initializeProductServiceSlots());
      reset(); // Reset form data
    }
  };

  const { control, handleSubmit, reset } =
    useForm<ProductServiceContentFormData>({
      defaultValues: {
        heroImages: [],
      },
    });

  // Initialize Product & Service slots
  const initializeProductServiceSlots =
    React.useCallback((): ProductServiceSlot[] => {
      const instructions = [
        "Upload main product/service showcase",
        "Upload secondary offering highlight",
        "Upload process or workflow demonstration",
        "Upload customer testimonial or result",
        "Upload additional service content",
      ];

      const serviceIds = [
        "SERVICE_1",
        "SERVICE_2",
        "SERVICE_3",
        "SERVICE_4",
        "SERVICE_5",
      ];

      const serviceTitles = [
        "งานก่อสร้างสถานีบริการน้ำมัน",
        "PERMATANK และถังน้ำมันแบบต่าง ๆ",
        "จำหน่ายและติดตั้งท่อน้ำมันใต้ดินผนัง 2 ชั้น",
        "ระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน",
        "บริการต่าง ๆ เกี่ยวกับถังน้ำมัน",
      ];

      return Array.from({ length: 5 }, (_, index) => ({
        id: `products-services-slot-${index}`,
        serviceId: serviceIds[index],
        title: serviceTitles[index],
        type: "image" as const,
        contentType: "gallery" as const,
        instruction:
          instructions[index] || `Upload content for slot ${index + 1}`,
        order: index,
        updateMode: false,
        existingImages: [],
      }));
    }, []);

  // Load existing service content
  const loadExistingServiceContent = useCallback(async () => {
    try {
      console.log("🔄 Loading existing service content...");

      const serviceIds = [
        "SERVICE_1",
        "SERVICE_2",
        "SERVICE_3",
        "SERVICE_4",
        "SERVICE_5",
      ];
      const slots = initializeProductServiceSlots();

      for (let i = 0; i < serviceIds.length; i++) {
        const serviceId = serviceIds[i];
        console.log(`📡 Fetching content for ${serviceId}...`);

        try {
          await fetchContent(serviceId);

          // Find content for this service
          const serviceContent = content.find(
            (c) => c.page === serviceId && c.type === "gallery"
          );

          if (serviceContent && serviceContent.images_url) {
            console.log(`✅ Found existing content for ${serviceId}:`, {
              imageCount: serviceContent.images_url.length,
              images: serviceContent.images_url,
            });

            slots[i].existingImages = serviceContent.images_url;

            // Special logging for SERVICE_5
            if (serviceId === "SERVICE_5") {
              console.log("🔍 SERVICE_5 Existing Content Debug:", {
                serviceId,
                contentFound: !!serviceContent,
                imageCount: serviceContent.images_url.length,
                imageUrls: serviceContent.images_url,
                contentData: serviceContent,
              });
            }
          } else {
            console.log(`ℹ️ No existing content found for ${serviceId}`);

            if (serviceId === "SERVICE_5") {
              console.log("🔍 SERVICE_5 No Content Debug:", {
                serviceId,
                contentFound: false,
                allContent: content,
                filteredContent: content.filter((c) => c.page === serviceId),
              });
            }
          }
        } catch (error) {
          console.error(`❌ Error fetching content for ${serviceId}:`, error);
        }
      }

      console.log("📊 Final slots with existing content:", slots);
      setProductServiceSlots(slots);
    } catch (error) {
      console.error("❌ Error loading existing service content:", error);
      setProductServiceSlots(initializeProductServiceSlots());
    }
  }, [content, fetchContent, initializeProductServiceSlots]);

  // Load existing content
  useEffect(() => {
    loadHeroSection();
    loadExistingServiceContent();
  }, [initializeProductServiceSlots, loadExistingServiceContent]);

  const loadHeroSection = async () => {
    try {
      const response = await fetch(`/api/hero?id=PRODUCTS_SERVICE`);
      const result = await response.json();

      if (result.data && result.data.hero_images) {
        setExistingHeroImages(result.data.hero_images);
      } else {
        setExistingHeroImages([]);
      }
    } catch (error) {
      console.error("Failed to load hero section:", error);
      setExistingHeroImages([]);
    }
  };

  const onSubmit = async (data: ProductServiceContentFormData) => {
    try {
      console.log("🚀 ProductServiceContentManager - Starting submission...");
      console.log("📊 Product Service Slots:", productServiceSlots);

      // Update hero section
      const heroFormData = new FormData();
      heroFormData.append("id", "PRODUCTS_SERVICE");
      heroFormData.append(
        "existing_images",
        JSON.stringify(existingHeroImages)
      );

      data.heroImages.forEach((file, index) => {
        heroFormData.append(`hero_image_${index}`, file);
      });

      console.log("🖼️ Updating hero section...");
      const heroResponse = await fetch("/api/hero", {
        method: "PUT",
        body: heroFormData,
      });

      if (!heroResponse.ok) {
        const heroResult = await heroResponse.json();
        throw new Error(`Hero section error: ${heroResult.error}`);
      }
      console.log("✅ Hero section updated successfully");

      // Handle Product & Service content updates
      console.log("🔄 Processing product service slots...");
      for (const slot of productServiceSlots) {
        console.log(`📝 Processing slot: ${slot.serviceId}`, {
          hasImages: !!(slot.images && slot.images.length > 0),
          imageCount: slot.images?.length || 0,
          hasVideoUrl: !!slot.videoUrl,
          contentType: slot.contentType,
          existingImagesCount: slot.existingImages?.length || 0,
        });

        if (slot.images && slot.images.length > 0) {
          // Update gallery content
          console.log(`🖼️ Updating gallery content for ${slot.serviceId}...`);
          const contentData = {
            page: "SERVICE",
            type: "gallery" as const,
            images: slot.images,
            existing_images: slot.existingImages || [],
          };

          console.log(`📤 Sending content data for ${slot.serviceId}:`, {
            page: contentData.page,
            type: contentData.type,
            imageCount: contentData.images.length,
            existingImageCount: contentData.existing_images.length,
          });

          await updateServiceContent(slot.serviceId, contentData);
          console.log(`✅ Gallery content updated for ${slot.serviceId}`);
        } else if (slot.videoUrl && slot.contentType === "video") {
          // Update video content
          console.log(`🎥 Updating video content for ${slot.serviceId}...`);
          const contentData = {
            page: "SERVICE",
            type: "video" as const,
            video_url: slot.videoUrl,
            existing_images: slot.existingImages || [],
          };

          console.log(`📤 Sending video data for ${slot.serviceId}:`, {
            page: contentData.page,
            type: contentData.type,
            video_url: contentData.video_url,
          });

          await updateServiceContent(slot.serviceId, contentData);
          console.log(`✅ Video content updated for ${slot.serviceId}`);
        } else {
          console.log(`⏭️ Skipping ${slot.serviceId} - no content to update`);
        }

        // Special logging for SERVICE_5
        if (slot.serviceId === "SERVICE_5") {
          console.log("🔍 SERVICE_5 Debug Info:", {
            serviceId: slot.serviceId,
            title: slot.title,
            hasImages: !!(slot.images && slot.images.length > 0),
            imageCount: slot.images?.length || 0,
            imageFiles:
              slot.images?.map((f) => ({
                name: f.name,
                size: f.size,
                type: f.type,
              })) || [],
            hasExistingImages: !!(
              slot.existingImages && slot.existingImages.length > 0
            ),
            existingImageCount: slot.existingImages?.length || 0,
            existingImageUrls: slot.existingImages || [],
            contentType: slot.contentType,
            updateMode: slot.updateMode,
          });
        }
      }

      // Reset slots after successful update
      setProductServiceSlots(initializeProductServiceSlots());

      // Reload data
      await loadHeroSection();

      // Reset form
      reset({
        heroImages: [],
      });

      if (onSave) {
        onSave({ success: true });
      }
    } catch (error) {
      console.error("Failed to update content:", error);
      if (onSave) {
        onSave({ success: false, error: (error as Error).message });
      }
    }
  };

  const removeExistingHeroImage = (index: number) => {
    const newImages = existingHeroImages.filter((_, i) => i !== index);
    setExistingHeroImages(newImages);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Products & Services Hero Section
          </h2>
          <span className="text-sm text-gray-500">Max 1 image</span>
        </div>

        <Controller
          name="heroImages"
          control={control}
          render={({ field: { onChange, value } }) => (
            <HeroImageUpload
              images={value || []}
              maxImages={1}
              onChange={onChange}
              existingImages={existingHeroImages}
              onRemoveExisting={removeExistingHeroImage}
              loading={loading}
            />
          )}
        />
      </div>

      {/* Custom Content Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <ProductServiceUpload
          slots={productServiceSlots}
          onSlotsChange={setProductServiceSlots}
          loading={loading}
          onReset={handleReset}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}>
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Saving...
            </>
          ) : (
            <>
              <Save size={20} />
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
};
