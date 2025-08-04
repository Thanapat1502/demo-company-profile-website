import React, { useState, useEffect, useRef } from "react";
import {
  Save,
  Upload,
  X,
  ChevronDown,
  GripVertical,
  Image as ImageIcon,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { HeroSectionId } from "@/app/api/hero/route";
import { ContentType, ContentPage } from "@/app/api/contents/route";
import { useContentStore } from "@/store/zustand/contentStore";

// Types and Interfaces
interface HeroSection {
  id: HeroSectionId;
  title: string;
  maxImages: number;
}

interface PageConfig {
  id: string;
  name: string;
  heroSection: HeroSection;
}

interface ContentFormData {
  selectedPage: string;
  heroImages: File[];
  customImages: File[];
}

// Custom content interfaces
interface CustomImageSlot {
  id: string;
  image?: File;
  imageUrl?: string;
  instruction: string; // User instruction text
  order: number;
}

interface CustomContent {
  id?: string;
  page: ContentPage;
  type: ContentType;
  images_url: string[];
  slots?: CustomImageSlot[];
}

// Page Configurations with Hero Section IDs
const PAGE_CONFIGURATIONS: PageConfig[] = [
  {
    id: "home",
    name: "Home",
    heroSection: {
      id: "HOME",
      title: "Home Hero Section",
      maxImages: 5,
    },
  },
  {
    id: "about-main",
    name: "Main",
    heroSection: {
      id: "ABOUT_MAIN",
      title: "About Main Hero Section",
      maxImages: 3,
    },
  },
  {
    id: "about-history",
    name: "History",
    heroSection: {
      id: "ABOUT_HISTORY",
      title: "History Hero Section",
      maxImages: 6,
    },
  },
  {
    id: "about-vision",
    name: "Vision",
    heroSection: {
      id: "ABOUT_VISION",
      title: "Vision Hero Section",
      maxImages: 2,
    },
  },
  {
    id: "about-executive",
    name: "Executive",
    heroSection: {
      id: "ABOUT_EXECUTIVE",
      title: "Executive Hero Section",
      maxImages: 4,
    },
  },
  {
    id: "products-services",
    name: "Products & Services",
    heroSection: {
      id: "PRODUCTS_SERVICE",
      title: "Products & Services Hero Section",
      maxImages: 1,
    },
  },
  {
    id: "news",
    name: "News",
    heroSection: {
      id: "NEWS",
      title: "News Hero Section",
      maxImages: 1,
    },
  },
  {
    id: "contact",
    name: "Contact",
    heroSection: {
      id: "CONTACT",
      title: "Contact Hero Section",
      maxImages: 1,
    },
  },
];

// Group configurations for navigation
const MAIN_PAGES = PAGE_CONFIGURATIONS.filter(
  (page) => !page.id.startsWith("about-") || page.id === "about-main"
).map((page) => (page.id === "about-main" ? { ...page, name: "About" } : page));

const ABOUT_SUBMENU = PAGE_CONFIGURATIONS.filter((page) =>
  page.id.startsWith("about-")
);

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

// Individual Slots Upload Component
interface IndividualSlotsUploadProps {
  slots: CustomImageSlot[];
  onSlotsChange: (slots: CustomImageSlot[]) => void;
  loading: boolean;
  maxSlots: number;
  title: string;
}

const IndividualSlotsUpload: React.FC<IndividualSlotsUploadProps> = ({
  slots,
  onSlotsChange,
  loading,
  maxSlots,
  title,
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

  // Removed subtitle change handler as subtitle is now used for instructions

  const removeImage = (slotIndex: number) => {
    const newSlots = [...slots];
    newSlots[slotIndex] = {
      ...newSlots[slotIndex],
      image: undefined,
      imageUrl: undefined,
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
      <h4 className="text-lg font-medium text-gray-900">{title}</h4>

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

            {/* Image Upload Area */}
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

export const ContentManager = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [loading, setLoading] = useState(false);
  const [existingHeroImages, setExistingHeroImages] = useState<string[]>([]);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Custom content states
  const [customContent, setCustomContent] = useState<{
    [key: string]: CustomImageSlot[];
  }>({});
  const [existingCustomImages, setExistingCustomImages] = useState<string[]>(
    []
  );

  // Content store hooks
  const { content, fetchContent, createContent, updateContent } =
    useContentStore();

  const { control, handleSubmit, reset } = useForm<ContentFormData>({
    defaultValues: {
      selectedPage: "home",
      heroImages: [],
      customImages: [],
    },
  });

  const currentPageConfig = PAGE_CONFIGURATIONS.find(
    (page) => page.id === selectedPage
  );

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setAboutDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loadHeroSection = async (heroId: HeroSectionId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/hero?id=${heroId}`);
      const result = await response.json();

      if (result.data && result.data.hero_images) {
        setExistingHeroImages(result.data.hero_images);
      } else {
        setExistingHeroImages([]);
      }
    } catch (error) {
      console.error("Failed to load hero section:", error);
      setExistingHeroImages([]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ContentFormData) => {
    if (!currentPageConfig) return;

    try {
      setLoading(true);

      // Update hero section
      const heroFormData = new FormData();
      heroFormData.append("id", currentPageConfig.heroSection.id);
      heroFormData.append(
        "existing_images",
        JSON.stringify(existingHeroImages)
      );

      // Add new hero images
      data.heroImages.forEach((file, index) => {
        heroFormData.append(`hero_image_${index}`, file);
      });

      const heroResponse = await fetch("/api/hero", {
        method: "PUT",
        body: heroFormData,
      });

      const heroResult = await heroResponse.json();

      if (!heroResponse.ok) {
        alert(`Hero section error: ${heroResult.error}`);
        return;
      }

      // Handle custom content uploads
      if (needsCustomUpload) {
        if (isCarouselPage && data.customImages.length > 0) {
          // Home carousel upload
          const existingContent = content.find(
            (c) => c.page === selectedPage && c.type === "gallery"
          );

          if (existingContent) {
            await updateContent(existingContent.id, {
              page: selectedPage as ContentPage,
              type: "gallery",
              images: data.customImages,
              existing_images: existingCustomImages,
            });
          } else {
            await createContent({
              page: selectedPage as ContentPage,
              type: "gallery",
              images: data.customImages,
            });
          }
        } else if (isSlotBasedPage) {
          // Slot-based upload (history/vision)
          const slotsWithImages = currentSlots.filter((slot) => slot.image);
          if (slotsWithImages.length > 0) {
            const existingContent = content.find(
              (c) => c.page === selectedPage && c.type === "gallery"
            );
            const slotImages = slotsWithImages.map((slot) => slot.image!);

            if (existingContent) {
              await updateContent(existingContent.id, {
                page: selectedPage as ContentPage,
                type: "gallery",
                images: slotImages,
                existing_images: currentSlots
                  .filter((slot) => slot.imageUrl && !slot.image)
                  .map((slot) => slot.imageUrl!),
              });
            } else {
              await createContent({
                page: selectedPage as ContentPage,
                type: "gallery",
                images: slotImages,
              });
            }
          }
        }
      }

      alert("Content updated successfully!");

      // Reload data
      await loadHeroSection(currentPageConfig.heroSection.id);
      await loadCustomContent(selectedPage);

      // Reset form
      reset({
        selectedPage: selectedPage,
        heroImages: [],
        customImages: [],
      });
    } catch (error) {
      console.error("Failed to update content:", error);
      alert("Failed to update content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeExistingImage = (index: number) => {
    const newImages = existingHeroImages.filter((_, i) => i !== index);
    setExistingHeroImages(newImages);
  };

  // Initialize custom content slots based on page
  const initializeCustomSlots = React.useCallback(
    (pageId: string): CustomImageSlot[] => {
      const slotCounts: { [key: string]: number } = {
        "about-history": 6,
        "about-vision": 2,
      };

      const slotInstructions: { [key: string]: string[] } = {
        "about-history": [
          "Upload founding year image",
          "Upload early development image",
          "Upload expansion period image",
          "Upload milestone achievement image",
          "Upload recent development image",
          "Upload current status image",
        ],
        "about-vision": [
          "Upload vision statement image",
          "Upload mission statement image",
        ],
      };

      const count = slotCounts[pageId] || 0;
      const instructions = slotInstructions[pageId] || [];

      return Array.from({ length: count }, (_, index) => ({
        id: `${pageId}-slot-${index}`,
        instruction:
          instructions[index] || `Upload image for slot ${index + 1}`,
        order: index,
      }));
    },
    []
  );

  // Load custom content for pages that need it
  const loadCustomContent = React.useCallback(
    async (pageId: string) => {
      if (
        ![
          "home",
          "about-history",
          "about-vision",
          "products-services",
        ].includes(pageId)
      ) {
        return;
      }

      try {
        await fetchContent(pageId, "gallery");

        // Process the fetched content
        if (content && content.length > 0) {
          const contentData = content[0];
          if (pageId === "home") {
            setExistingCustomImages(contentData.images_url || []);
          } else if (pageId === "about-history" || pageId === "about-vision") {
            // Initialize slots with existing data
            const slots = initializeCustomSlots(pageId);
            if (contentData.images_url) {
              contentData.images_url.forEach((url: string, index: number) => {
                if (slots[index]) {
                  slots[index].imageUrl = url;
                }
              });
            }
            setCustomContent((prev) => ({
              ...prev,
              [pageId]: slots,
            }));
          }
        } else {
          // Initialize empty slots for slot-based pages
          if (pageId === "about-history" || pageId === "about-vision") {
            setCustomContent((prev) => ({
              ...prev,
              [pageId]: initializeCustomSlots(pageId),
            }));
          } else {
            setExistingCustomImages([]);
          }
        }
      } catch (error) {
        console.error("Failed to load custom content:", error);
        if (pageId === "about-history" || pageId === "about-vision") {
          setCustomContent((prev) => ({
            ...prev,
            [pageId]: initializeCustomSlots(pageId),
          }));
        } else {
          setExistingCustomImages([]);
        }
      }
    },
    [fetchContent, content, initializeCustomSlots]
  );

  // Load existing hero section data when page changes
  useEffect(() => {
    if (currentPageConfig) {
      loadHeroSection(currentPageConfig.heroSection.id);
      loadCustomContent(selectedPage);
    }
  }, [selectedPage, currentPageConfig, loadCustomContent]);

  const handlePageSelect = (pageId: string) => {
    setSelectedPage(pageId);
    setAboutDropdownOpen(false);
  };

  const toggleAboutDropdown = () => {
    setAboutDropdownOpen(!aboutDropdownOpen);
  };

  const isAboutPage = selectedPage.startsWith("about-");
  const selectedAboutPage = isAboutPage
    ? ABOUT_SUBMENU.find((page) => page.id === selectedPage)
    : null;

  // Helper functions for custom content
  const removeExistingCustomImage = (index: number) => {
    const newImages = existingCustomImages.filter((_, i) => i !== index);
    setExistingCustomImages(newImages);
  };

  const handleCustomSlotsChange = (
    pageId: string,
    slots: CustomImageSlot[]
  ) => {
    setCustomContent((prev) => ({
      ...prev,
      [pageId]: slots,
    }));
  };

  // Check if current page needs custom upload
  const needsCustomUpload = [
    "home",
    "about-history",
    "about-vision",
    "products-services",
  ].includes(selectedPage);
  const isSlotBasedPage = ["about-history", "about-vision"].includes(
    selectedPage
  );
  const isCarouselPage = selectedPage === "home";
  const currentSlots = customContent[selectedPage] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Hero Content Manager
          </h1>
          <p className="text-gray-600 mt-2">
            Manage hero section images for each page
          </p>
        </div>

        {/* Page Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav
              className="flex space-x-8 px-6 overflow-x-auto"
              aria-label="Tabs">
              {/* Home Tab */}
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  selectedPage === "home"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => handlePageSelect("home")}>
                Home
              </button>

              {/* About Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center gap-1 ${
                    isAboutPage
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={toggleAboutDropdown}>
                  About {selectedAboutPage && `- ${selectedAboutPage.name}`}
                  <ChevronDown
                    size={14}
                    className={`transform transition-transform ${
                      aboutDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu - Horizontal */}
                {aboutDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="flex">
                      {ABOUT_SUBMENU.map((page, index) => (
                        <button
                          key={page.id}
                          className={`px-4 py-2 text-sm hover:bg-gray-50 whitespace-nowrap ${
                            selectedPage === page.id
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-700"
                          } ${
                            index !== ABOUT_SUBMENU.length - 1
                              ? "border-r border-gray-200"
                              : ""
                          }`}
                          onClick={() => handlePageSelect(page.id)}>
                          {page.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Other Tabs */}
              {MAIN_PAGES.filter(
                (page) => page.id !== "home" && page.id !== "about-main"
              ).map((page) => (
                <button
                  key={page.id}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    selectedPage === page.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => handlePageSelect(page.id)}>
                  {page.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Form */}
        {currentPageConfig && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentPageConfig.heroSection.title}
                </h2>
                <span className="text-sm text-gray-500">
                  Max {currentPageConfig.heroSection.maxImages} image
                  {currentPageConfig.heroSection.maxImages > 1 ? "s" : ""}
                </span>
              </div>

              <Controller
                name="heroImages"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <HeroImageUpload
                    images={value || []}
                    maxImages={currentPageConfig.heroSection.maxImages}
                    onChange={onChange}
                    existingImages={existingHeroImages}
                    onRemoveExisting={removeExistingImage}
                    loading={loading}
                  />
                )}
              />
            </div>

            {/* Custom Content Sections */}
            {needsCustomUpload && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {isCarouselPage && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Home Carousel Gallery
                      </h2>
                      <span className="text-sm text-gray-500">
                        Max 10 images
                      </span>
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
                )}

                {isSlotBasedPage && (
                  <IndividualSlotsUpload
                    slots={currentSlots}
                    onSlotsChange={(slots) =>
                      handleCustomSlotsChange(selectedPage, slots)
                    }
                    loading={loading}
                    maxSlots={selectedPage === "about-history" ? 6 : 2}
                    title={
                      selectedPage === "about-history"
                        ? "History Timeline (6 slots)"
                        : "Vision Gallery (2 slots)"
                    }
                  />
                )}
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
        )}
      </div>
    </div>
  );
};
