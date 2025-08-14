import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Plus,
  Save,
  Eye,
  X,
  Tag,
  Upload,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useForm, Controller, Control, FieldErrors } from "react-hook-form";
import { LanguageToggle } from "./languageToggle";
import React18QuillEditor from "@/components/admin/React18QuillEditor";
import { generateSlug, previewSlug } from "@/utils/slugify";
// Types
interface QuillContent {
  html: string;
  text: string;
  length: number;
}

interface NewsArticleForm {
  title: {
    th: string;
    en: string;
  };
  slug: {
    th: string;
    en: string;
  };
  content: {
    th: QuillContent;
    en: QuillContent;
  };
  excerpt: {
    th: string;
    en: string;
  };
  category: string;
  tags: string[];
  featuredImage: File | null;
  isHighlighted: boolean;
  status: "draft" | "published";
  publishDate?: Date;
}

// Import the QuillContent type from newsStore
interface QuillContentFromStore {
  ops?: Array<{
    insert?: string | { image?: string };
    attributes?: Record<string, unknown>;
  }>;
  html?: string;
  text?: string;
  length?: number;
}

interface News {
  id: string;
  title_th: string;
  title_en: string;
  slug_th?: string;
  slug_en?: string;
  excerpt_th?: string;
  excerpt_en?: string;
  body_th?: QuillContentFromStore;
  body_en?: QuillContentFromStore;
  tag_id?: number[];
  cat_id?: string;
  is_highlighted?: boolean;
  status?: "draft" | "published";
  thumbnail?: string;
  // Legacy fields for backward compatibility
  title?: string;
  subtitle?: string;
  tag?: number[];
}

interface Category {
  id: string;
  cat_th: string;
  cat_en: string;
  description_th?: string;
  description_en?: string;
  created_at?: string;
  updated_at?: string;
}

interface NewsTag {
  id: number;
  tag_th: string;
  tag_en: string;
}

interface NewsEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingNews: News | null;
  categories: Category[];
  onSubmit: (data: NewsArticleForm) => Promise<void>;
  isSubmitting: boolean;
  suggestedTags: NewsTag[];
}

export const NewsEditorModal: React.FC<NewsEditorModalProps> = ({
  isOpen,
  onClose,
  editingNews,
  categories,
  onSubmit,
  isSubmitting,
  suggestedTags,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState("th");
  const [newTag, setNewTag] = useState("");

  // Image selection state (not upload state)
  const [imageState, setImageState] = useState<{
    selectedFile: File | null;
    previewUrl: string | null;
    validationError: string | null;
  }>({
    selectedFile: null,
    previewUrl: null,
    validationError: null,
  });

  // Form setup
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<NewsArticleForm>({
    defaultValues: {
      title: { th: "", en: "" },
      slug: { th: "", en: "" },
      content: {
        th: { html: "", text: "", length: 0 },
        en: { html: "", text: "", length: 0 },
      },
      excerpt: { th: "", en: "" },
      category: "",
      tags: [],
      featuredImage: null,
      isHighlighted: false,
      status: "draft",
    },
  });

  // Watch tags, content, and titles for real-time updates
  const currentTags = watch("tags");
  const watchedContent = watch("content");
  const watchedTitle = watch("title");

  // Helper function to create QuillContent - memoized to prevent re-creation
  const createQuillContent = useCallback((html: string): QuillContent => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return {
      html,
      text,
      length: text.length,
    };
  }, []);

  // Tag management functions - now working with tag IDs (numbers)
  const addTag = () => {
    if (newTag.trim()) {
      // Check if it's a new tag or existing tag
      const existingTag = suggestedTags.find(
        (tag) => tag.tag_th === newTag.trim() || tag.tag_en === newTag.trim()
      );

      if (existingTag && !currentTags.includes(existingTag.id.toString())) {
        // Add existing tag by ID
        const updatedTags = [...currentTags, existingTag.id.toString()];
        setValue("tags", updatedTags);
        setNewTag("");
      } else if (!existingTag) {
        // For new tags, we'll need to create them first
        // For now, just show a message that the tag needs to be created
        alert(
          selectedLanguage === "th"
            ? "กรุณาสร้างแท็กใหม่ในระบบก่อน"
            : "Please create this tag in the system first"
        );
      }
    }
  };

  const removeTag = (tagIdToRemove: string) => {
    const updatedTags = currentTags.filter((tagId) => tagId !== tagIdToRemove);
    setValue("tags", updatedTags);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const addSuggestedTag = (tagId: number) => {
    const tagIdStr = tagId.toString();
    if (!currentTags.includes(tagIdStr)) {
      const updatedTags = [...currentTags, tagIdStr];
      setValue("tags", updatedTags);
    }
  };

  // Get available suggested tags (not already added)
  const availableSuggestedTags = suggestedTags.filter((tag) => {
    return !currentTags.includes(tag.id.toString());
  });

  // Helper function to get tag name by ID
  const getTagNameById = (tagId: string) => {
    const tag = suggestedTags.find((t) => t.id.toString() === tagId);
    if (!tag) return tagId; // fallback to ID if tag not found
    return selectedLanguage === "th" ? tag.tag_th : tag.tag_en;
  };

  // Handle image selection with validation (no upload yet)
  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          "Invalid file type. Please upload JPEG, PNG, GIF, or WebP images only."
        );
      }

      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        throw new Error("File size too large. Maximum size is 10MB.");
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);

      // Set the file in form and update image state
      setValue("featuredImage", file);
      setImageState({
        selectedFile: file,
        previewUrl: previewUrl,
        validationError: null,
      });
    } catch (error) {
      // Handle validation error
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Invalid file. Please try again.";

      setImageState({
        selectedFile: null,
        previewUrl: null,
        validationError: errorMessage,
      });

      // Clear form value
      setValue("featuredImage", null);

      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setImageState((prev) => ({
          ...prev,
          validationError: null,
        }));
      }, 5000);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (data: NewsArticleForm) => {
    await onSubmit(data);
  };

  // Handle save as draft
  const handleSaveDraft = () => {
    setValue("status", "draft");
    handleSubmit(handleFormSubmit)();
  };

  // Handle publish
  const handlePublish = () => {
    setValue("status", "published");
    handleSubmit(handleFormSubmit)();
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset();
      setSelectedLanguage("th");
      setNewTag("");
      // Reset image state
      setImageState({
        selectedFile: null,
        previewUrl: null,
        validationError: null,
      });
    }
  }, [isOpen, reset]);

  // Populate form when editing
  useEffect(() => {
    if (editingNews && isOpen) {
      setValue("title", {
        th: editingNews.title_th || editingNews.title || "",
        en: editingNews.title_en || editingNews.title || "",
      });

      // Set slugs if they exist, otherwise generate from titles
      setValue("slug", {
        th: editingNews.slug_th || generateSlug(editingNews.title_th || editingNews.title || ""),
        en: editingNews.slug_en || generateSlug(editingNews.title_en || editingNews.title || ""),
      });

      setValue("excerpt", {
        th: editingNews.excerpt_th || editingNews.subtitle || "",
        en: editingNews.excerpt_en || editingNews.subtitle || "",
      });

      // Handle content - convert from stored format to QuillContent format
      try {
        let contentTh: QuillContent = { html: "", text: "", length: 0 };
        let contentEn: QuillContent = { html: "", text: "", length: 0 };

        // Handle Thai content
        if (editingNews.body_th) {
          if (typeof editingNews.body_th === "string") {
            // If it's a string, try to parse as JSON first, then treat as HTML
            try {
              const parsed = JSON.parse(editingNews.body_th);
              if (parsed && typeof parsed === 'object' && parsed.html) {
                // It's already in QuillContent format
                contentTh = {
                  html: parsed.html,
                  text: parsed.text || "",
                  length: parsed.length || 0
                };
              } else {
                // It's HTML string stored as JSON string, use the original string
                contentTh = createQuillContent(editingNews.body_th);
              }
            } catch {
              // It's plain HTML string
              contentTh = createQuillContent(editingNews.body_th);
            }
          } else if (typeof editingNews.body_th === 'object' && editingNews.body_th.html) {
            // It's already in QuillContent format
            contentTh = {
              html: editingNews.body_th.html,
              text: editingNews.body_th.text || "",
              length: editingNews.body_th.length || 0
            };
          } else if (typeof editingNews.body_th === 'object') {
            // It might be in Quill Delta format or other object format
            // For now, create empty content
            contentTh = createQuillContent("");
          }
        }

        // Handle English content
        if (editingNews.body_en) {
          if (typeof editingNews.body_en === "string") {
            // If it's a string, try to parse as JSON first, then treat as HTML
            try {
              const parsed = JSON.parse(editingNews.body_en);
              if (parsed && typeof parsed === 'object' && parsed.html) {
                // It's already in QuillContent format
                contentEn = {
                  html: parsed.html,
                  text: parsed.text || "",
                  length: parsed.length || 0
                };
              } else {
                // It's HTML string stored as JSON string, use the original string
                contentEn = createQuillContent(editingNews.body_en);
              }
            } catch {
              // It's plain HTML string
              contentEn = createQuillContent(editingNews.body_en);
            }
          } else if (typeof editingNews.body_en === 'object' && editingNews.body_en.html) {
            // It's already in QuillContent format
            contentEn = {
              html: editingNews.body_en.html,
              text: editingNews.body_en.text || "",
              length: editingNews.body_en.length || 0
            };
          } else if (typeof editingNews.body_en === 'object') {
            // It might be in Quill Delta format or other object format
            // For now, create empty content
            contentEn = createQuillContent("");
          }
        }

        // Set content immediately
        setValue("content", {
          th: contentTh,
          en: contentEn,
        });
      } catch (error) {
        console.error("Error parsing content:", error);
        setValue("content", {
          th: { html: "", text: "", length: 0 },
          en: { html: "", text: "", length: 0 },
        });
      }

      // Handle tags - convert numbers to strings
      const tags = editingNews.tag_id || editingNews.tag || [];
      if (Array.isArray(tags)) {
        setValue("tags", tags.map(String));
      }

      // Handle category
      if (editingNews.cat_id) {
        setValue("category", editingNews.cat_id);
      }

      // Handle highlight status
      if (editingNews.is_highlighted !== undefined) {
        setValue("isHighlighted", editingNews.is_highlighted);
      }

      // Handle status
      if (editingNews.status) {
        setValue("status", editingNews.status);
      }
    }
  }, [editingNews, isOpen, setValue, createQuillContent]);

  // Auto-generate slugs when titles change (only for new articles)
  useEffect(() => {
    if (!editingNews && watchedTitle) {
      const currentSlug = watch("slug");

      // Only auto-generate if slug is empty or matches the previous title
      if (watchedTitle.th && (!currentSlug.th || currentSlug.th === generateSlug(watchedTitle.th))) {
        setValue("slug.th", generateSlug(watchedTitle.th));
      }

      if (watchedTitle.en && (!currentSlug.en || currentSlug.en === generateSlug(watchedTitle.en))) {
        setValue("slug.en", generateSlug(watchedTitle.en));
      }
    }
  }, [watchedTitle, editingNews, setValue, watch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingNews ? "Edit Article" : "Add New Article"}
            </h3>
            <LanguageToggle
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              size="small"
            />
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="p-6 space-y-6">
            {/* Language-specific content pages */}
            {selectedLanguage === "th" ? (
              // Thai Content Page
              <ThaiContentPage
                control={control}
                errors={errors}
                categories={categories}
                currentTags={currentTags}
                newTag={newTag}
                setNewTag={setNewTag}
                addTag={addTag}
                removeTag={removeTag}
                handleTagKeyDown={handleTagKeyDown}
                addSuggestedTag={addSuggestedTag}
                availableSuggestedTags={availableSuggestedTags}
                handleImageSelection={handleImageSelection}
                createQuillContent={createQuillContent}
                selectedLanguage={selectedLanguage}
                getTagNameById={getTagNameById}
                imageState={imageState}
                setImageState={setImageState}
                watchedContent={watchedContent}
              />
            ) : (
              // English Content Page
              <EnglishContentPage
                control={control}
                errors={errors}
                categories={categories}
                currentTags={currentTags}
                newTag={newTag}
                setNewTag={setNewTag}
                addTag={addTag}
                removeTag={removeTag}
                handleTagKeyDown={handleTagKeyDown}
                addSuggestedTag={addSuggestedTag}
                availableSuggestedTags={availableSuggestedTags}
                handleImageSelection={handleImageSelection}
                createQuillContent={createQuillContent}
                selectedLanguage={selectedLanguage}
                getTagNameById={getTagNameById}
                imageState={imageState}
                setImageState={setImageState}
              />
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSubmitting}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 flex items-center gap-2">
                <Save size={16} />
                Save as Draft
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
                <Eye size={16} />
                Publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Thai Content Page Component
interface ContentPageProps {
  control: Control<NewsArticleForm>;
  errors: FieldErrors<NewsArticleForm>;
  categories: Category[];
  currentTags: string[];
  newTag: string;
  setNewTag: (value: string) => void;
  addTag: () => void;
  removeTag: (tag: string) => void;
  handleTagKeyDown: (e: React.KeyboardEvent) => void;
  addSuggestedTag: (tagId: number) => void;
  availableSuggestedTags: NewsTag[];
  handleImageSelection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  createQuillContent: (html: string) => QuillContent;
  selectedLanguage: string;
  getTagNameById: (tagId: string) => string;
  watchedContent?: { th?: QuillContent; en?: QuillContent };
  imageState: {
    selectedFile: File | null;
    previewUrl: string | null;
    validationError: string | null;
  };
  setImageState: React.Dispatch<
    React.SetStateAction<{
      selectedFile: File | null;
      previewUrl: string | null;
      validationError: string | null;
    }>
  >;
}

const ThaiContentPage: React.FC<ContentPageProps> = ({
  control,
  errors,
  categories,
  currentTags,
  newTag,
  setNewTag,
  addTag,
  removeTag,
  handleTagKeyDown,
  addSuggestedTag,
  availableSuggestedTags,
  handleImageSelection,
  createQuillContent,
  selectedLanguage,
  getTagNameById,
  watchedContent,
  imageState,
  setImageState,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Thai Article Details */}
      <div className="lg:col-span-1 space-y-4">
        {/* Thai Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            หัวข้อข่าว (ไทย)
          </label>
          <Controller
            name="title.th"
            control={control}
            rules={{ required: "กรุณากรอกหัวข้อข่าว" }}
            render={({ field }) => (
              <input
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="หัวข้อข่าว"
              />
            )}
          />
          {errors.title?.th && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.th?.message}
            </p>
          )}
        </div>

        {/* Thai Slug Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL Slug (ไทย)
          </label>
          <Controller
            name="slug.th"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <input
                  value={field.value || ""}
                  onChange={(e) => {
                    const cleanedSlug = generateSlug(e.target.value);
                    field.onChange(cleanedSlug);
                  }}
                  onBlur={field.onBlur}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="url-slug-thai"
                />
                <div className="text-xs text-gray-500">
                  URL: /news-events/{field.value || "url-slug-thai"}
                </div>
              </div>
            )}
          />
          {errors.slug?.th && (
            <p className="text-red-500 text-sm mt-1">
              {errors.slug.th?.message}
            </p>
          )}
        </div>

        {/* Thai Excerpt Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            สรุปเนื้อหา (ไทย)
          </label>
          <Controller
            name="excerpt.th"
            control={control}
            render={({ field }) => (
              <textarea
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="สรุปเนื้อหาสั้นๆ"
              />
            )}
          />
        </div>

        {/* Category Input - Shared */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            หมวดหมู่
          </label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "กรุณาเลือกหมวดหมู่" }}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">เลือกหมวดหมู่</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.cat_th || category.cat_en || "ไม่มีชื่อ"}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Tags Management - Shared */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            แท็ก
          </label>

          {/* Add Tag Input */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="เพิ่มแท็ก..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Plus size={16} />
            </button>
          </div>

          {/* Tags Display */}
          <div className="flex flex-wrap gap-2 mb-3">
            {currentTags.map((tagId, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                <Tag size={12} />
                {getTagNameById(tagId)}
                <button
                  type="button"
                  onClick={() => removeTag(tagId)}
                  className="text-blue-600 hover:text-blue-800">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>

          {/* Suggested Tags */}
          {availableSuggestedTags.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">แท็กที่แนะนำ:</p>
              <div className="flex flex-wrap gap-2">
                {availableSuggestedTags.slice(0, 6).map((tag, index) => {
                  const tagName =
                    selectedLanguage === "th" ? tag.tag_th : tag.tag_en;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => addSuggestedTag(tag.id)}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                      + {tagName}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Featured Image Upload - Enhanced with UX feedback */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            รูปภาพประกอบ
          </label>
          <Controller
            name="featuredImage"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="space-y-3">
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${imageState.validationError
                    ? "border-red-300 bg-red-50"
                    : value
                      ? "border-green-300 bg-green-50"
                      : "border-gray-300 hover:border-gray-400"
                    }`}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelection}
                    className="hidden"
                    id="featured-image-th"
                  />
                  <label htmlFor="featured-image-th" className="cursor-pointer">
                    {value ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle className="mx-auto h-8 w-8 text-green-600" />
                        <p className="text-sm text-green-600 mt-1">
                          เลือกรูปภาพแล้ว
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {imageState.selectedFile?.name}
                        </p>
                      </div>
                    ) : imageState.validationError ? (
                      <div className="flex flex-col items-center">
                        <AlertCircle className="mx-auto h-8 w-8 text-red-600" />
                        <p className="text-sm text-red-600 mt-1">
                          เกิดข้อผิดพลาด
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="text-sm text-gray-500 mt-1">
                          คลิกเพื่อเลือกรูปภาพ
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          รองรับ JPEG, PNG, GIF, WebP (สูงสุด 10MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>

                {/* Validation Error Message */}
                {imageState.validationError && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
                    <AlertCircle size={16} className="text-red-600" />
                    <span className="text-sm text-red-700">
                      {imageState.validationError}
                    </span>
                  </div>
                )}

                {/* Image Preview */}
                {value && imageState.previewUrl && (
                  <div className="relative">
                    <img
                      src={imageState.previewUrl}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        onChange(null);
                        if (imageState.previewUrl) {
                          URL.revokeObjectURL(imageState.previewUrl);
                        }
                        setImageState({
                          selectedFile: null,
                          previewUrl: null,
                          validationError: null,
                        });
                      }}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700">
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
            )}
          />
        </div>

        {/* Highlight Toggle */}
        <div className="flex items-center gap-2">
          <Controller
            name="isHighlighted"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="highlight-th"
                className="rounded"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
              />
            )}
          />
          <label htmlFor="highlight-th" className="text-sm text-gray-700">
            ไฮไลท์บทความนี้
          </label>
        </div>
      </div>

      {/* Right Column - Thai Content Editor */}
      <div className="lg:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          เนื้อหาข่าว (ไทย)
        </label>
        <Controller
          name="content.th"
          control={control}
          rules={{ required: "กรุณากรอกเนื้อหา" }}
          render={({ field }) => {
            // Use watched content to ensure we get the latest value
            const currentValue = (watchedContent?.th || field.value) as QuillContent;
            return (
              <React18QuillEditor
                key="th-editor-stable"
                value={currentValue?.html || ""}
                onChange={(html) => {
                  const quillContent = createQuillContent(html);
                  field.onChange(quillContent);
                }}
                placeholder="เริ่มเขียนเนื้อหาข่าว..."
                height={500}
              />
            );
          }}
        />
        {errors.content?.th && (
          <p className="text-red-500 text-sm mt-1">เนื้อหาจำเป็นต้องกรอก</p>
        )}
      </div>
    </div>
  );
};

// English Content Page Component
const EnglishContentPage: React.FC<ContentPageProps> = ({
  control,
  errors,
  categories,
  currentTags,
  newTag,
  setNewTag,
  addTag,
  removeTag,
  handleTagKeyDown,
  addSuggestedTag,
  availableSuggestedTags,
  handleImageSelection,
  createQuillContent,
  selectedLanguage,
  getTagNameById,
  imageState,
  setImageState,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - English Article Details */}
      <div className="lg:col-span-1 space-y-4">
        {/* English Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title (English)
          </label>
          <Controller
            name="title.en"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <input
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="News title"
              />
            )}
          />
          {errors.title?.en && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.en?.message}
            </p>
          )}
        </div>

        {/* English Slug Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL Slug (English)
          </label>
          <Controller
            name="slug.en"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <input
                  value={field.value || ""}
                  onChange={(e) => {
                    const cleanedSlug = generateSlug(e.target.value);
                    field.onChange(cleanedSlug);
                  }}
                  onBlur={field.onBlur}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="url-slug-english"
                />
                <div className="text-xs text-gray-500">
                  URL: /news-events/{field.value || "url-slug-english"}
                </div>
              </div>
            )}
          />
          {errors.slug?.en && (
            <p className="text-red-500 text-sm mt-1">
              {errors.slug.en?.message}
            </p>
          )}
        </div>

        {/* English Excerpt Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt (English)
          </label>
          <Controller
            name="excerpt.en"
            control={control}
            render={({ field }) => (
              <textarea
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief summary"
              />
            )}
          />
        </div>

        {/* Category Input - Shared */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <select
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.cat_en || category.cat_th || "No name"}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Tags Management - Shared */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>

          {/* Add Tag Input */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Add a tag..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Plus size={16} />
            </button>
          </div>

          {/* Tags Display */}
          <div className="flex flex-wrap gap-2 mb-3">
            {currentTags.map((tagId, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                <Tag size={12} />
                {getTagNameById(tagId)}
                <button
                  type="button"
                  onClick={() => removeTag(tagId)}
                  className="text-blue-600 hover:text-blue-800">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>

          {/* Suggested Tags */}
          {availableSuggestedTags.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">Suggested tags:</p>
              <div className="flex flex-wrap gap-2">
                {availableSuggestedTags.slice(0, 6).map((tag, index) => {
                  const tagName =
                    selectedLanguage === "th" ? tag.tag_th : tag.tag_en;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => addSuggestedTag(tag.id)}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                      + {tagName}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Featured Image Upload - Enhanced with UX feedback */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          <Controller
            name="featuredImage"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="space-y-3">
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${imageState.validationError
                    ? "border-red-300 bg-red-50"
                    : value
                      ? "border-green-300 bg-green-50"
                      : "border-gray-300 hover:border-gray-400"
                    }`}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelection}
                    className="hidden"
                    id="featured-image-en"
                  />
                  <label htmlFor="featured-image-en" className="cursor-pointer">
                    {value ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle className="mx-auto h-8 w-8 text-green-600" />
                        <p className="text-sm text-green-600 mt-1">
                          Image selected
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {imageState.selectedFile?.name}
                        </p>
                      </div>
                    ) : imageState.validationError ? (
                      <div className="flex flex-col items-center">
                        <AlertCircle className="mx-auto h-8 w-8 text-red-600" />
                        <p className="text-sm text-red-600 mt-1">
                          Error occurred
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="text-sm text-gray-500 mt-1">
                          Click to select featured image
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Supports JPEG, PNG, GIF, WebP (max 10MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>

                {/* Validation Error Message */}
                {imageState.validationError && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
                    <AlertCircle size={16} className="text-red-600" />
                    <span className="text-sm text-red-700">
                      {imageState.validationError}
                    </span>
                  </div>
                )}

                {/* Image Preview */}
                {value && imageState.previewUrl && (
                  <div className="relative">
                    <img
                      src={imageState.previewUrl}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        onChange(null);
                        if (imageState.previewUrl) {
                          URL.revokeObjectURL(imageState.previewUrl);
                        }
                        setImageState({
                          selectedFile: null,
                          previewUrl: null,
                          validationError: null,
                        });
                      }}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700">
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
            )}
          />
        </div>

        {/* Highlight Toggle */}
        <div className="flex items-center gap-2">
          <Controller
            name="isHighlighted"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="highlight-en"
                className="rounded"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
              />
            )}
          />
          <label htmlFor="highlight-en" className="text-sm text-gray-700">
            Highlight this article
          </label>
        </div>
      </div>

      {/* Right Column - English Content Editor */}
      <div className="lg:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content (English)
        </label>
        <Controller
          name="content.en"
          control={control}
          rules={{ required: "Content is required" }}
          render={({ field }) => {
            const currentValue = field.value as QuillContent;
            return (
              <React18QuillEditor
                key="en-editor-stable"
                value={currentValue?.html || ""}
                onChange={(html) => {
                  const quillContent = createQuillContent(html);
                  field.onChange(quillContent);
                }}
                placeholder="Start writing your article..."
                height={500}
              />
            );
          }}
        />
        {errors.content?.en && (
          <p className="text-red-500 text-sm mt-1">Content is required</p>
        )}
      </div>
    </div>
  );
};
