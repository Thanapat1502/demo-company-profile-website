import React, { useState } from "react";
import { Plus, Upload, Save, Eye, X, Tag } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { LanguageToggle } from "./languageToggle";
import React18QuillEditor from "@/components/admin/React18QuillEditor";

// Interface for Quill editor output
interface QuillContent {
  html: string;
  text: string;
  length: number;
}

// Interface for news article form data
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

export const NewsManager = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("th");
  const [newTag, setNewTag] = useState("");

  // Predefined tags for suggestions
  const suggestedTags = [
    "ข่าวสาร",
    "กิจกรรม",
    "โครงการ",
    "ประกาศ",
    "อัพเดท",
    "บริษัท",
    "ผลิตภัณฑ์",
    "บริการ",
    "เทคโนโลยี",
    "นวัตกรรม",
    "ความปลอดภัย",
    "สิ่งแวดล้อม",
    "CSR",
    "รางวัล",
    "ความสำเร็จ",
  ];

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
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

  // Helper function to create QuillContent from HTML
  const createQuillContent = (html: string): QuillContent => {
    // Create a temporary div to extract text content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";

    return {
      html,
      text,
      length: text.length,
    };
  };

  // Handle form submission
  const onSubmit = async (data: NewsArticleForm) => {
    try {
      console.log("Submitting article:", data);
      // Here you would typically send the data to your API
      // await newsEventsService.create(data);
      alert("Article saved successfully!");
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Error saving article. Please try again.");
    }
  };

  // Handle draft save
  const handleSaveDraft = () => {
    setValue("status", "draft");
    handleSubmit(onSubmit)();
  };

  // Handle publish
  const handlePublish = () => {
    setValue("status", "published");
    setValue("publishDate", new Date());
    handleSubmit(onSubmit)();
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("featuredImage", file);
    }
  };

  // Tags management functions
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

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
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
  const availableSuggestedTags = suggestedTags.filter(
    (tag) => !currentTags.includes(tag)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            News/Event Manager
          </h2>
          <LanguageToggle
            value={selectedLanguage}
            onChange={setSelectedLanguage}
            size="large"
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} />
          Add Article
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Article Details */}
              <div className="lg:col-span-1 space-y-4">
                {/* Title Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title ({selectedLanguage === "th" ? "ไทย" : "English"})
                  </label>
                  <Controller
                    name={selectedLanguage === "th" ? "title.th" : "title.en"}
                    control={control}
                    rules={{ required: "Title is required" }}
                    render={({ field }) => (
                      <input
                        value={field.value || ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={
                          selectedLanguage === "th"
                            ? "หัวข้อข่าว"
                            : "News title"
                        }
                      />
                    )}
                  />
                  {errors.title?.[selectedLanguage as "th" | "en"] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title[selectedLanguage as "th" | "en"]?.message}
                    </p>
                  )}
                </div>

                {/* Excerpt Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt ({selectedLanguage === "th" ? "ไทย" : "English"})
                  </label>
                  <Controller
                    name={
                      selectedLanguage === "th" ? "excerpt.th" : "excerpt.en"
                    }
                    control={control}
                    render={({ field }) => (
                      <textarea
                        value={field.value || ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={
                          selectedLanguage === "th"
                            ? "สรุปเนื้อหาสั้นๆ"
                            : "Brief summary"
                        }
                      />
                    )}
                  />
                </div>

                {/* Category Input */}
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
                        <option value="news">ข่าวสาร</option>
                        <option value="events">กิจกรรม</option>
                        <option value="announcements">ประกาศ</option>
                        <option value="projects">โครงการ</option>
                      </select>
                    )}
                  />
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Tags Management */}
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
                      disabled={!newTag.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                      <Tag size={16} />
                      Add
                    </button>
                  </div>

                  {/* Display Current Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {currentTags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    {currentTags.length === 0 && (
                      <span className="text-gray-500 text-sm italic">
                        No tags added yet
                      </span>
                    )}
                  </div>

                  {/* Suggested Tags */}
                  {availableSuggestedTags.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">
                        Suggested tags:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {availableSuggestedTags
                          .slice(0, 8)
                          .map((tag, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => addSuggestedTag(tag)}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                              + {tag}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Highlight Checkbox */}
                <div className="flex items-center gap-2">
                  <Controller
                    name="isHighlighted"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        id="highlight"
                        className="rounded"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        onBlur={field.onBlur}
                      />
                    )}
                  />
                  <label htmlFor="highlight" className="text-sm text-gray-700">
                    Highlight this article
                  </label>
                </div>

                {/* Featured Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="featured-image"
                    />
                    <label htmlFor="featured-image" className="cursor-pointer">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-500 mt-1">
                        Click to upload featured image
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column - Content Editor */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content ({selectedLanguage === "th" ? "ไทย" : "English"})
                </label>
                <Controller
                  name={selectedLanguage === "th" ? "content.th" : "content.en"}
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
                        placeholder={
                          selectedLanguage === "th"
                            ? "เริ่มเขียนเนื้อหาข่าว..."
                            : "Start writing your article..."
                        }
                        height={500}
                      />
                    );
                  }}
                />
                {errors.content?.[selectedLanguage as "th" | "en"] && (
                  <p className="text-red-500 text-sm mt-1">
                    Content is required
                  </p>
                )}
              </div>
            </div>

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
        </div>
      </form>
    </div>
  );
};
