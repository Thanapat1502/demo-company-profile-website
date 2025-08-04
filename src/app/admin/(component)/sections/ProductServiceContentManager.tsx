import React, { useState, useEffect } from "react";
import {
  Save,
  Upload,
  X,
  GripVertical,
  Image as ImageIcon,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";

interface ProductServiceContentFormData {
  heroImages: File[];
}

interface ProductServiceContentManagerProps {
  onSave?: (data: any) => void;
  loading?: boolean;
}

// Product & Service Upload Component
interface ProductServiceSlot {
  id: string;
  image?: File;
  imageUrl?: string;
  videoUrl?: string;
  type: "image" | "video";
  instruction: string;
  order: number;
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {existingImages.map((imageUrl, index) => (
              <div key={`existing-${index}`} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={`new-${index}`} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
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
}

const ProductServiceUpload: React.FC<ProductServiceUploadProps> = ({
  slots,
  onSlotsChange,
  loading,
}) => {
  const handleImageUpload = (slotIndex: number, file: File) => {
    const newSlots = [...slots];
    newSlots[slotIndex] = {
      ...newSlots[slotIndex],
      image: file,
      imageUrl: URL.createObjectURL(file),
      videoUrl: undefined,
      type: "image",
    };
    onSlotsChange(newSlots);
  };

  const handleVideoUrlChange = (slotIndex: number, videoUrl: string) => {
    const newSlots = [...slots];
    newSlots[slotIndex] = {
      ...newSlots[slotIndex],
      videoUrl,
      image: undefined,
      imageUrl: undefined,
      type: "video",
    };
    onSlotsChange(newSlots);
  };

  const removeContent = (slotIndex: number) => {
    const newSlots = [...slots];
    newSlots[slotIndex] = {
      ...newSlots[slotIndex],
      image: undefined,
      imageUrl: undefined,
      videoUrl: undefined,
      type: "image",
    };
    onSlotsChange(newSlots);
  };

  const moveSlot = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= slots.length) return;

    const newSlots = [...slots];
    const [movedSlot] = newSlots.splice(fromIndex, 1);
    newSlots.splice(toIndex, 0, movedSlot);

    // Update order numbers
    newSlots.forEach((slot, index) => {
      slot.order = index;
    });

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slots.map((slot, index) => (
          <div
            key={slot.id}
            className="border border-gray-200 rounded-lg p-4 space-y-4">
            {/* Slot Header */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Slot {index + 1}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => moveSlot(index, index - 1)}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                  <GripVertical size={16} className="rotate-90" />
                </button>
                <button
                  type="button"
                  onClick={() => moveSlot(index, index + 1)}
                  disabled={index === slots.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50">
                  <GripVertical size={16} className="-rotate-90" />
                </button>
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
                      image: undefined,
                      imageUrl: undefined,
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
            <div className="space-y-2">
              {slot.type === "image" ? (
                // Image Upload
                slot.imageUrl ? (
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
                      onClick={() => removeContent(index)}
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
                )
              ) : (
                // Video URL Input
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Video URL
                  </label>
                  <input
                    type="url"
                    value={slot.videoUrl || ""}
                    onChange={(e) =>
                      handleVideoUrlChange(index, e.target.value)
                    }
                    placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
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
      ];

      return Array.from({ length: 4 }, (_, index) => ({
        id: `products-services-slot-${index}`,
        type: "image" as const,
        instruction:
          instructions[index] || `Upload content for slot ${index + 1}`,
        order: index,
      }));
    }, []);

  // Load existing content
  useEffect(() => {
    loadHeroSection();
    setProductServiceSlots(initializeProductServiceSlots());
  }, [initializeProductServiceSlots]);

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

      const heroResponse = await fetch("/api/hero", {
        method: "PUT",
        body: heroFormData,
      });

      if (!heroResponse.ok) {
        const heroResult = await heroResponse.json();
        throw new Error(`Hero section error: ${heroResult.error}`);
      }

      // Product & Service slots are standalone - no API integration for now
      console.log("Product & Service slots (standalone):", productServiceSlots);
      // TODO: Add API integration later when needed

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
