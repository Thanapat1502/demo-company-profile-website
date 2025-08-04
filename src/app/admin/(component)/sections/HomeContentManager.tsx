import React, { useState, useEffect } from "react";
import { Save, Upload, X, ChevronDown } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { HeroSectionId } from "@/app/api/hero/route";
import { useContentStore } from "@/store/zustand/contentStore";

interface HomeContentFormData {
  heroImages: File[];
  customImages: File[];
}

interface HomeContentManagerProps {
  onSave?: (data: any) => void;
  loading?: boolean;
}

// Home Carousel Upload Component
interface HomeCarouselUploadProps {
  images: File[];
  maxImages: number;
  onChange: (images: File[]) => void;
  existingImages: string[];
  onRemoveExisting: (index: number) => void;
  loading: boolean;
}

const HomeCarouselUpload: React.FC<HomeCarouselUploadProps> = ({
  images,
  maxImages,
  onChange,
  existingImages,
  onRemoveExisting,
  loading,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalImages = existingImages.length + images.length;
  const allImages = [
    ...existingImages,
    ...images.map((img) => URL.createObjectURL(img)),
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const remainingSlots = maxImages - totalImages;
    const filesToAdd = files.slice(0, remainingSlots);
    onChange([...images, ...filesToAdd]);
  };

  const removeImage = (index: number) => {
    if (index < existingImages.length) {
      onRemoveExisting(index);
    } else {
      const newImageIndex = index - existingImages.length;
      const newImages = images.filter((_, i) => i !== newImageIndex);
      onChange(newImages);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(allImages.length, 1));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.max(allImages.length, 1)) %
        Math.max(allImages.length, 1)
    );
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
      {/* Carousel Preview */}
      {allImages.length > 0 && (
        <div className="relative">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={allImages[currentSlide]}
              alt={`Carousel image ${currentSlide + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-between p-4">
              <button
                type="button"
                onClick={prevSlide}
                className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all">
                <ChevronDown className="rotate-90" size={20} />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all">
                <ChevronDown className="-rotate-90" size={20} />
              </button>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-white"
                      : "bg-white bg-opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => removeImage(currentSlide)}
              className="flex items-center justify-center">
              <X size={16} />
            </button>
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
                : "Add Carousel Images"}
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

      {/* Thumbnail Grid */}
      {allImages.length > 0 && (
        <div className="grid grid-cols-5 gap-2">
          {allImages.map((imageUrl, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer ${
                index === currentSlide ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setCurrentSlide(index)}>
              <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                <img
                  src={imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <X size={12} />
              </button>
              <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const HomeContentManager: React.FC<HomeContentManagerProps> = ({
  onSave,
  loading = false,
}) => {
  const [existingHeroImages, setExistingHeroImages] = useState<string[]>([]);
  const [existingCustomImages, setExistingCustomImages] = useState<string[]>(
    []
  );

  const { content, fetchContent, createContent, updateContent } =
    useContentStore();

  const { control, handleSubmit, reset } = useForm<HomeContentFormData>({
    defaultValues: {
      heroImages: [],
      customImages: [],
    },
  });

  // Load existing content
  useEffect(() => {
    loadHeroSection();
    loadCustomContent();
  }, []);

  const loadHeroSection = async () => {
    try {
      const response = await fetch(`/api/hero?id=HOME`);
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
    try {
      await fetchContent("home", "gallery");

      if (content && content.length > 0) {
        const contentData = content[0];
        setExistingCustomImages(contentData.images_url || []);
      } else {
        setExistingCustomImages([]);
      }
    } catch (error) {
      console.error("Failed to load custom content:", error);
      setExistingCustomImages([]);
    }
  };

  const onSubmit = async (data: HomeContentFormData) => {
    try {
      // Update hero section
      const heroFormData = new FormData();
      heroFormData.append("id", "HOME");
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
      if (data.customImages.length > 0) {
        const existingContent = content.find(
          (c) => c.page === "home" && c.type === "gallery"
        );

        if (existingContent) {
          await updateContent(existingContent.id, {
            page: "home",
            type: "gallery",
            images: data.customImages,
            existing_images: existingCustomImages,
          });
        } else {
          await createContent({
            page: "home",
            type: "gallery",
            images: data.customImages,
          });
        }
      }

      // Reload data
      await loadHeroSection();
      await loadCustomContent();

      // Reset form
      reset({
        heroImages: [],
        customImages: [],
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

  const removeExistingCustomImage = (index: number) => {
    const newImages = existingCustomImages.filter((_, i) => i !== index);
    setExistingCustomImages(newImages);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Home Hero Section
          </h2>
          <span className="text-sm text-gray-500">Max 5 images</span>
        </div>

        <Controller
          name="heroImages"
          control={control}
          render={({ field: { onChange, value } }) => (
            <HomeCarouselUpload
              images={value || []}
              maxImages={5}
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Home Carousel Gallery
          </h2>
          <span className="text-sm text-gray-500">Max 10 images</span>
        </div>

        <Controller
          name="customImages"
          control={control}
          render={({ field: { onChange, value } }) => (
            <HomeCarouselUpload
              images={value || []}
              maxImages={10}
              onChange={onChange}
              existingImages={existingCustomImages}
              onRemoveExisting={removeExistingCustomImage}
              loading={loading}
            />
          )}
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
