import React, { useState, useEffect } from "react";
import { Save, Upload, X, Image as ImageIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { HeroSectionId } from "@/app/api/hero/route";
import { useContentStore } from "@/store/zustand/contentStore";

interface AboutContentFormData {
  heroImages: File[];
}

interface AboutContentManagerProps {
  pageId: "about-main" | "about-history" | "about-vision" | "about-executive";
  onSave?: (data: any) => void;
  loading?: boolean;
}

// Custom content interfaces
interface CustomImageSlot {
  id: string;
  image?: File;
  imageUrl?: string;
  images?: File[]; // For gallery mode (multiple images)
  imageUrls?: string[]; // For gallery mode (existing images)
  instruction: string;
  order: number;
  isGalleryMode?: boolean;
  maxImages?: number;
}

// Hero Image Upload Component (reused from main)
interface HeroImageUploadProps {
  images: File[];
  maxImages: number;
  onChange: (images: File[]) => void;
  existingImages: string[];
  onRemoveExisting: (index: number) => void;
  loading: boolean;
  className: string;
}

const HeroImageUpload: React.FC<HeroImageUploadProps> = ({
  images,
  maxImages,
  onChange,
  existingImages,
  onRemoveExisting,
  loading,
  className,
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
      <div className={`flex items-center justify-center p-8 ${className}`}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {existingImages.map((imageUrl, index) => (
              <div key={`existing-${index}`} className="relative group">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
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

// Individual Slots Upload Component
interface IndividualSlotsUploadProps {
  slots: CustomImageSlot[];
  onSlotsChange: (slots: CustomImageSlot[]) => void;
  loading: boolean;
  maxSlots: number;
  title: string;
  isGalleryMode?: boolean;
}

const IndividualSlotsUpload: React.FC<IndividualSlotsUploadProps> = ({
  slots,
  onSlotsChange,
  loading,
  title,
  isGalleryMode = false,
}) => {
  const handleImageUpload = (slotIndex: number, file: File) => {
    const newSlots = [...slots];
    newSlots[slotIndex] = {
      ...newSlots[slotIndex],
      image: file,
      imageUrl: URL.createObjectURL(file),
    };
    onSlotsChange(newSlots);
  };

  const handleMultipleImageUpload = (slotIndex: number, files: File[]) => {
    const newSlots = [...slots];
    const currentImages = newSlots[slotIndex].images || [];
    const currentUrls = newSlots[slotIndex].imageUrls || [];
    const maxImages = newSlots[slotIndex].maxImages || 20;

    // Calculate remaining slots
    const totalExisting = currentImages.length + currentUrls.length;
    const remainingSlots = maxImages - totalExisting;
    const filesToAdd = files.slice(0, remainingSlots);

    newSlots[slotIndex] = {
      ...newSlots[slotIndex],
      images: [...currentImages, ...filesToAdd],
    };
    onSlotsChange(newSlots);
  };

  const removeImage = (slotIndex: number) => {
    const newSlots = [...slots];
    newSlots[slotIndex] = {
      ...newSlots[slotIndex],
      image: undefined,
      imageUrl: undefined,
    };
    onSlotsChange(newSlots);
  };

  const removeGalleryImage = (
    slotIndex: number,
    imageIndex: number,
    isExisting: boolean
  ) => {
    const newSlots = [...slots];
    if (isExisting) {
      const newUrls = [...(newSlots[slotIndex].imageUrls || [])];
      newUrls.splice(imageIndex, 1);
      newSlots[slotIndex] = {
        ...newSlots[slotIndex],
        imageUrls: newUrls,
      };
    } else {
      const newImages = [...(newSlots[slotIndex].images || [])];
      newImages.splice(imageIndex, 1);
      newSlots[slotIndex] = {
        ...newSlots[slotIndex],
        images: newImages,
      };
    }
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
    <div className="space-y-6">
      <h4 className="text-lg font-medium text-gray-900">{title}</h4>

      <div className="space-y-8">
        {slots.map((slot, index) => (
          <div
            key={slot.id}
            className="border border-gray-200 rounded-lg p-6 space-y-6">
            {/* Slot Header */}
            <div className="border-b border-gray-200 pb-4">
              <h5 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                Gallery Slot {index + 1}
              </h5>
              {isGalleryMode && (
                <p className="text-sm text-gray-600 mt-1">
                  {(slot.imageUrls?.length || 0) + (slot.images?.length || 0)}/
                  {slot.maxImages || 20} images
                </p>
              )}
            </div>

            {isGalleryMode ? (
              // Gallery Mode - Multiple Images
              <div className="space-y-6">
                {/* Existing Images */}
                {slot.imageUrls && slot.imageUrls.length > 0 && (
                  <div>
                    <h6 className="text-sm font-medium text-gray-700 mb-3">
                      Current Images ({slot.imageUrls.length})
                    </h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {slot.imageUrls.map((imageUrl, imgIndex) => (
                        <div
                          key={`existing-${imgIndex}`}
                          className="relative group">
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={`Slot ${index + 1} image ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              removeGalleryImage(index, imgIndex, true)
                            }
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <X size={16} />
                          </button>
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
                      <span className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block">
                        Add Images
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length > 0)
                            handleMultipleImageUpload(index, files);
                        }}
                        className="hidden"
                      />
                    </label>
                    <p className="text-gray-500 text-sm">
                      PNG, JPG up to 10MB each (max {slot.maxImages || 20}{" "}
                      images)
                    </p>
                  </div>
                </div>

                {/* New Images Preview */}
                {slot.images && slot.images.length > 0 && (
                  <div>
                    <h6 className="text-sm font-medium text-gray-700 mb-3">
                      New Images to Upload ({slot.images.length})
                    </h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {slot.images.map((image, imgIndex) => (
                        <div key={`new-${imgIndex}`} className="relative group">
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`New slot ${index + 1} image ${
                                imgIndex + 1
                              }`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              removeGalleryImage(index, imgIndex, false)
                            }
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Single Image Mode
              <div className="space-y-2">
                {slot.imageUrl ? (
                  <div className="relative">
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={slot.imageUrl}
                        alt={`Slot ${index + 1} image`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <ImageIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <label className="cursor-pointer">
                      <span className="text-sm text-blue-600 hover:text-blue-700">
                        Upload Image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(index, file);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* Instruction Display */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <p className="text-sm text-blue-800 font-medium">
                📝 {slot.instruction}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AboutContentManager: React.FC<AboutContentManagerProps> = ({
  pageId,
  onSave,
  loading = false,
}) => {
  const [existingHeroImages, setExistingHeroImages] = useState<string[]>([]);
  const [customSlots, setCustomSlots] = useState<CustomImageSlot[]>([]);

  const { content, fetchContent, createContent, updateContent } =
    useContentStore();

  const { control, handleSubmit, reset } = useForm<AboutContentFormData>({
    defaultValues: {
      heroImages: [],
    },
  });

  // Page configurations
  const pageConfigs = {
    "about-main": {
      heroId: "ABOUT_MAIN" as HeroSectionId,
      title: "About Main",
      maxHeroImages: 1,
      hasCustomSlots: true,
      slotsCount: 1,
      slotsTitle: "About Main Content Gallery (max 20 images)",
      contentId: "ABOUT",
      maxImagesPerSlot: 20,
      isGalleryMode: true,
    },
    "about-history": {
      heroId: "ABOUT_HISTORY" as HeroSectionId,
      title: "About History",
      maxHeroImages: 1,
      hasCustomSlots: true,
      slotsCount: 2,
      slotsTitle: "History Gallery (2 slots, max 20 images each)",
      isGalleryMode: true,
      maxImagesPerSlot: 20,
    },
    "about-vision": {
      heroId: "ABOUT_VISION" as HeroSectionId,
      title: "About Vision",
      maxHeroImages: 1,
      hasCustomSlots: true,
      slotsCount: 2,
      slotsTitle: "Vision Images (2 slots, max 1 image each)",
      contentIds: ["VISION_1", "VISION_2"],
      maxImagesPerSlot: 1,
    },
    "about-executive": {
      heroId: "ABOUT_EXECUTIVE" as HeroSectionId,
      title: "About Executive",
      maxHeroImages: 1,
      hasCustomSlots: false,
    },
  };

  const currentConfig = pageConfigs[pageId];

  // Initialize custom slots
  const initializeCustomSlots = React.useCallback(
    (pageType: string): CustomImageSlot[] => {
      const slotInstructions: { [key: string]: string[] } = {
        "about-main": [
          "Upload main about content gallery (max 20 images) - POST to content ID 'ABOUT'. These images will be displayed in a carousel on the PDS Group main page.",
        ],
        "about-history": [
          "Company Origin Gallery (1964-1980): Upload up to 20 images showing the early days and founding of the company",
          "Business Expansion Gallery (1980-present): Upload up to 20 images showing business growth, technology adoption, and modern operations",
        ],
        "about-vision": [
          "Upload vision image (max 1 image) - POST to content ID 'VISION_1'",
          "Upload mission image (max 1 image) - POST to content ID 'VISION_2'",
        ],
      };

      const count = (currentConfig as any).slotsCount || 0;
      const instructions = slotInstructions[pageType] || [];
      const isGalleryMode = (currentConfig as any).isGalleryMode || false;
      const maxImagesPerSlot = (currentConfig as any).maxImagesPerSlot || 1;

      return Array.from({ length: count }, (_, index) => ({
        id: `${pageType}-slot-${index}`,
        instruction:
          instructions[index] || `Upload image for slot ${index + 1}`,
        order: index,
        isGalleryMode,
        maxImages: maxImagesPerSlot,
        images: [],
        imageUrls: [],
      }));
    },
    [currentConfig]
  );

  // Load existing content
  useEffect(() => {
    loadHeroSection();
    if (currentConfig.hasCustomSlots) {
      loadCustomContent();
    }
  }, [pageId]);

  const loadHeroSection = async () => {
    try {
      const response = await fetch(`/api/hero?id=${currentConfig.heroId}`);
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

  const loadCustomContent = async () => {
    if (!currentConfig.hasCustomSlots) return;

    try {
      const slots = initializeCustomSlots(pageId);

      if (pageId === "about-history") {
        // For about-history, load from contents table with HISTORY_1 and HISTORY_2 IDs
        console.log("🏛️ Loading history content from contents table...");

        // Load HISTORY_1 content
        const response1 = await fetch("/api/contents?id=HISTORY_1");
        if (response1.ok) {
          const data1 = await response1.json();
          if (data1.content && data1.content.images_url) {
            slots[0].imageUrls = data1.content.images_url;
            console.log(
              "✅ Loaded HISTORY_1 images:",
              data1.content.images_url.length
            );
          }
        }

        // Load HISTORY_2 content
        const response2 = await fetch("/api/contents?id=HISTORY_2");
        if (response2.ok) {
          const data2 = await response2.json();
          if (data2.content && data2.content.images_url) {
            slots[1].imageUrls = data2.content.images_url;
            console.log(
              "✅ Loaded HISTORY_2 images:",
              data2.content.images_url.length
            );
          }
        }
      } else if (pageId === "about-main") {
        // For about-main, load from contents table with ABOUT ID (gallery mode)
        console.log("📄 Loading about main content from contents table...");

        const response = await fetch("/api/contents?id=ABOUT");
        if (response.ok) {
          const data = await response.json();
          if (
            data.content &&
            data.content.images_url &&
            data.content.images_url.length > 0
          ) {
            slots[0].imageUrls = data.content.images_url;
            console.log(
              "✅ Loaded ABOUT images:",
              data.content.images_url.length
            );
          }
        }
      } else if (pageId === "about-vision") {
        // For about-vision, load from contents table with VISION_1 and VISION_2 IDs
        console.log("🎯 Loading vision content from contents table...");

        // Load VISION_1 content
        const response1 = await fetch("/api/contents?id=VISION_1");
        if (response1.ok) {
          const data1 = await response1.json();
          if (
            data1.content &&
            data1.content.images_url &&
            data1.content.images_url.length > 0
          ) {
            slots[0].imageUrl = data1.content.images_url[0];
            console.log(
              "✅ Loaded VISION_1 image:",
              data1.content.images_url[0]
            );
          }
        }

        // Load VISION_2 content
        const response2 = await fetch("/api/contents?id=VISION_2");
        if (response2.ok) {
          const data2 = await response2.json();
          if (
            data2.content &&
            data2.content.images_url &&
            data2.content.images_url.length > 0
          ) {
            slots[1].imageUrl = data2.content.images_url[0];
            console.log(
              "✅ Loaded VISION_2 image:",
              data2.content.images_url[0]
            );
          }
        }
      } else {
        // For other pages, use the existing logic
        await fetchContent(pageId, "gallery");

        if (content && content.length > 0) {
          const contentData = content[0];
          if (contentData.images_url) {
            contentData.images_url.forEach((url: string, index: number) => {
              if (slots[index]) {
                slots[index].imageUrl = url;
              }
            });
          }
        }
      }

      setCustomSlots(slots);
    } catch (error) {
      console.error("Failed to load custom content:", error);
      setCustomSlots(initializeCustomSlots(pageId));
    }
  };

  const onSubmit = async (data: AboutContentFormData) => {
    try {
      // Update hero section
      const heroFormData = new FormData();
      heroFormData.append("id", currentConfig.heroId);
      heroFormData.append(
        "existing_images",
        JSON.stringify(existingHeroImages)
      );

      data.heroImages.forEach((file, index) => {
        heroFormData.append(`hero_image_${index}`, file);
      });

      const heroResponse = await fetch("/api/hero", {
        method: "PUT",
        body: heroFormData,
      });

      if (!heroResponse.ok) {
        const heroResult = await heroResponse.json();
        throw new Error(`Hero section error: ${heroResult.error}`);
      }

      // Handle custom content uploads
      if (currentConfig.hasCustomSlots) {
        if (pageId === "about-history") {
          // Handle about-history page with HISTORY_1 and HISTORY_2 uploads
          console.log("🏛️ Updating history content...");

          // Update HISTORY_1 (slot 0)
          const slot1 = customSlots[0];
          if (slot1 && (slot1.images?.length || slot1.imageUrls?.length)) {
            const formData = new FormData();
            formData.append("id", "HISTORY_1");
            formData.append("page", "HISTORY");
            formData.append("type", "gallery");
            formData.append(
              "existing_images",
              JSON.stringify(slot1.imageUrls || [])
            );

            slot1.images?.forEach((file, index) => {
              formData.append(`image_${index}`, file);
            });

            const response1 = await fetch("/api/contents", {
              method: "PUT",
              body: formData,
            });

            if (!response1.ok) {
              throw new Error("Failed to update HISTORY_1 content");
            }
            console.log("✅ Updated HISTORY_1 content");
          }

          // Update HISTORY_2 (slot 1)
          const slot2 = customSlots[1];
          if (slot2 && (slot2.images?.length || slot2.imageUrls?.length)) {
            const formData = new FormData();
            formData.append("id", "HISTORY_2");
            formData.append("page", "HISTORY");
            formData.append("type", "gallery");
            formData.append(
              "existing_images",
              JSON.stringify(slot2.imageUrls || [])
            );

            slot2.images?.forEach((file, index) => {
              formData.append(`image_${index}`, file);
            });

            const response2 = await fetch("/api/contents", {
              method: "PUT",
              body: formData,
            });

            if (!response2.ok) {
              throw new Error("Failed to update HISTORY_2 content");
            }
            console.log("✅ Updated HISTORY_2 content");
          }
        } else if (pageId === "about-main") {
          // Handle about-main page with ABOUT content upload (gallery mode)
          console.log("📄 Updating about main content...");

          const slot = customSlots[0];
          if (slot && (slot.images?.length || slot.imageUrls?.length)) {
            const formData = new FormData();
            formData.append("id", "ABOUT");
            formData.append("page", "ABOUT");
            formData.append("type", "gallery");
            formData.append(
              "existing_images",
              JSON.stringify(slot.imageUrls || [])
            );

            slot.images?.forEach((file, index) => {
              formData.append(`image_${index}`, file);
            });

            const response = await fetch("/api/contents", {
              method: "PUT",
              body: formData,
            });

            if (!response.ok) {
              throw new Error("Failed to update ABOUT content");
            }
            console.log("✅ Updated ABOUT content");
          }
        } else if (pageId === "about-vision") {
          // Handle about-vision page with VISION_1 and VISION_2 uploads
          console.log("🎯 Updating vision content...");

          // Update VISION_1 (slot 0)
          const slot1 = customSlots[0];
          if (slot1 && slot1.image) {
            const formData = new FormData();
            formData.append("id", "VISION_1");
            formData.append("page", "VISION");
            formData.append("type", "gallery");
            formData.append(
              "existing_images",
              JSON.stringify(slot1.imageUrl ? [slot1.imageUrl] : [])
            );
            formData.append("image_0", slot1.image);

            const response1 = await fetch("/api/contents", {
              method: "PUT",
              body: formData,
            });

            if (!response1.ok) {
              throw new Error("Failed to update VISION_1 content");
            }
            console.log("✅ Updated VISION_1 content");
          }

          // Update VISION_2 (slot 1)
          const slot2 = customSlots[1];
          if (slot2 && slot2.image) {
            const formData = new FormData();
            formData.append("id", "VISION_2");
            formData.append("page", "VISION");
            formData.append("type", "gallery");
            formData.append(
              "existing_images",
              JSON.stringify(slot2.imageUrl ? [slot2.imageUrl] : [])
            );
            formData.append("image_0", slot2.image);

            const response2 = await fetch("/api/contents", {
              method: "PUT",
              body: formData,
            });

            if (!response2.ok) {
              throw new Error("Failed to update VISION_2 content");
            }
            console.log("✅ Updated VISION_2 content");
          }
        } else {
          // Handle other pages with existing logic
          const slotsWithImages = customSlots.filter((slot) => slot.image);
          if (slotsWithImages.length > 0) {
            const existingContent = content.find(
              (c) => c.page === pageId && c.type === "gallery"
            );
            const slotImages = slotsWithImages.map((slot) => slot.image!);

            if (existingContent) {
              await updateContent(existingContent.id, {
                page: pageId,
                type: "gallery",
                images: slotImages,
                existing_images: customSlots
                  .filter((slot) => slot.imageUrl && !slot.image)
                  .map((slot) => slot.imageUrl!),
              });
            } else {
              await createContent({
                page: pageId,
                type: "gallery",
                images: slotImages,
              });
            }
          }
        }
      }

      // Reload data
      await loadHeroSection();
      if (currentConfig.hasCustomSlots) {
        await loadCustomContent();
      }

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
            {currentConfig.title} Hero Section
          </h2>
          <span className="text-sm text-gray-500">
            Max {currentConfig.maxHeroImages} image
            {currentConfig.maxHeroImages > 1 ? "s" : ""}
          </span>
        </div>

        <Controller
          name="heroImages"
          control={control}
          render={({ field: { onChange, value } }) => (
            <HeroImageUpload
              images={value || []}
              maxImages={currentConfig.maxHeroImages}
              onChange={onChange}
              existingImages={existingHeroImages}
              onRemoveExisting={removeExistingHeroImage}
              loading={loading}
              className=""
            />
          )}
        />
      </div>

      {/* Custom Content Section */}
      {currentConfig.hasCustomSlots && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <IndividualSlotsUpload
            slots={customSlots}
            onSlotsChange={setCustomSlots}
            loading={loading}
            maxSlots={(currentConfig as any).slotsCount!}
            title={(currentConfig as any).slotsTitle!}
            isGalleryMode={(currentConfig as any).isGalleryMode || false}
          />
        </div>
      )}

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
