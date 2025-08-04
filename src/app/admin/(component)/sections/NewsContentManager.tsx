import React, { useState, useEffect } from "react";
import { Save, Upload, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

interface NewsContentFormData {
  heroImages: File[];
}

interface NewsContentManagerProps {
  onSave?: (data: any) => void;
  loading?: boolean;
}

// Hero Image Upload Component
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

export const NewsContentManager: React.FC<NewsContentManagerProps> = ({
  onSave,
  loading = false,
}) => {
  const [existingHeroImages, setExistingHeroImages] = useState<string[]>([]);

  const { control, handleSubmit, reset } = useForm<NewsContentFormData>({
    defaultValues: {
      heroImages: [],
    },
  });

  // Load existing content
  useEffect(() => {
    loadHeroSection();
  }, []);

  const loadHeroSection = async () => {
    try {
      const response = await fetch(`/api/hero?id=NEWS`);
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

  const onSubmit = async (data: NewsContentFormData) => {
    try {
      // Update hero section
      const heroFormData = new FormData();
      heroFormData.append("id", "NEWS");
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
            News Hero Section
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
