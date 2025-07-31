import React, { useState, useEffect } from "react";
import { Plus, Save, Eye, X, Tag, Upload } from "lucide-react";
import { useForm, Controller, Control, FieldErrors } from "react-hook-form";
import { LanguageToggle } from "./languageToggle";
import React18QuillEditor from "@/components/admin/React18QuillEditor";
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

interface News {
  id: string;
  title: string;
  subtitle: string;
  body_th: string | object;
  body_en: string | object;
  tag: number[];
  thumbnail?: string;
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

  // Watch tags for real-time updates
  const currentTags = watch("tags");

  // Helper function to create QuillContent
  const createQuillContent = (html: string): QuillContent => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return {
      html,
      text,
      length: text.length,
    };
  };

  // Tag management functions
  const addTag = () => {
    if (newTag.trim() && !currentTags.includes(newTag.trim())) {
      const updatedTags = [...currentTags, newTag.trim()];
      setValue("tags", updatedTags);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = currentTags.filter((tag) => tag !== tagToRemove);
    setValue("tags", updatedTags);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const addSuggestedTag = (tag: string) => {
    if (!currentTags.includes(tag)) {
      const updatedTags = [...currentTags, tag];
      setValue("tags", updatedTags);
    }
  };

  // Get available suggested tags (not already added)
  const availableSuggestedTags = suggestedTags.filter((tag) => {
    const tagName = selectedLanguage === "th" ? tag.tag_th : tag.tag_en;
    return !currentTags.includes(tagName);
  });

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("featuredImage", file);
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
    }
  }, [isOpen, reset]);

  // Populate form when editing
  useEffect(() => {
    if (editingNews && isOpen) {
      setValue("title", {
        th: editingNews.title || "",
        en: editingNews.title || "",
      });
      setValue("excerpt", {
        th: editingNews.subtitle || "",
        en: editingNews.subtitle || "",
      });

      // Handle content - assuming it's stored as JSON
      try {
        const contentTh =
          typeof editingNews.body_th === "string"
            ? JSON.parse(editingNews.body_th)
            : editingNews.body_th;
        const contentEn =
          typeof editingNews.body_en === "string"
            ? JSON.parse(editingNews.body_en)
            : editingNews.body_en;

        setValue("content", {
          th: contentTh || { html: "", text: "", length: 0 },
          en: contentEn || { html: "", text: "", length: 0 },
        });
      } catch (error) {
        console.error("Error parsing content:", error);
        setValue("content", {
          th: { html: "", text: "", length: 0 },
          en: { html: "", text: "", length: 0 },
        });
      }

      // Handle tags - convert numbers to strings
      if (editingNews.tag && Array.isArray(editingNews.tag)) {
        setValue("tags", editingNews.tag.map(String));
      }
    }
  }, [editingNews, isOpen, setValue]);

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
                handleImageUpload={handleImageUpload}
                createQuillContent={createQuillContent}
                selectedLanguage={selectedLanguage}
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
                handleImageUpload={handleImageUpload}
                createQuillContent={createQuillContent}
                selectedLanguage={selectedLanguage}
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
  addSuggestedTag: (tag: string) => void;
  availableSuggestedTags: NewsTag[];
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  createQuillContent: (html: string) => QuillContent;
  selectedLanguage: string;
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
  handleImageUpload,
  createQuillContent,
  selectedLanguage,
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
            {currentTags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                <Tag size={12} />
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
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
                      onClick={() => addSuggestedTag(tagName)}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                      + {tagName}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Featured Image Upload - Shared */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            รูปภาพประกอบ
          </label>
          <Controller
            name="featuredImage"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file);
                    handleImageUpload(e);
                  }}
                  className="hidden"
                  id="featured-image-th"
                />
                <label htmlFor="featured-image-th" className="cursor-pointer">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500 mt-1">
                    คลิกเพื่ออัพโหลดรูปภาพ
                  </p>
                </label>
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
            const currentValue = field.value as QuillContent;
            return (
              <React18QuillEditor
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
  handleImageUpload,
  createQuillContent,
  selectedLanguage,
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
            {currentTags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                <Tag size={12} />
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
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
                      onClick={() => addSuggestedTag(tagName)}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                      + {tagName}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Featured Image Upload - Shared */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          <Controller
            name="featuredImage"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file);
                    handleImageUpload(e);
                  }}
                  className="hidden"
                  id="featured-image-en"
                />
                <label htmlFor="featured-image-en" className="cursor-pointer">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500 mt-1">
                    Click to upload featured image
                  </p>
                </label>
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
