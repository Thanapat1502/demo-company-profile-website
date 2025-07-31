import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Star,
  Calendar,
  Clock,
  FolderOpen,
  X,
  Tag,
} from "lucide-react";
import { NewsEditorModal } from "./newsEditorModal";
import { LanguageToggle } from "./languageToggle";
import {
  useNewsStore,
  type News,
  type Category,
} from "@/store/zustand/newsStore";

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

// Interface for category management
interface CategoryForm {
  id: string;
  name: {
    th: string;
    en: string;
  };
  description?: {
    th: string;
    en: string;
  };
}

export const NewsManager = () => {
  const {
    news,
    loading,
    error,
    success,
    fetchNews,
    deleteNews,
    updateNews,
    addNews,
    fetchCategories,
    categories,
    fetchTags,
    tags,
  } = useNewsStore();
  const [showEditor, setShowEditor] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);

  // Category management state
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState({ th: "", en: "" });
  const [newCategoryDescription, setNewCategoryDescription] = useState({
    th: "",
    en: "",
  });
  const [categoryLanguage, setCategoryLanguage] = useState("th");

  // Fetch news, categories, and tags on component mount
  useEffect(() => {
    fetchNews();
    fetchCategories();
    fetchTags();
  }, [fetchNews, fetchCategories, fetchTags]);

  // Handle success/error messages
  useEffect(() => {
    if (success) {
      alert("Operation completed successfully!");
    }
    if (error) {
      alert(`Error: ${error}`);
    }
  }, [success, error]);

  // Helper functions
  const handleAddNews = () => {
    setEditingNews(null);
    setShowEditor(true);
  };

  const handleEditNews = (newsItem: News) => {
    setEditingNews(newsItem);
    setShowEditor(true);
  };

  const handleDeleteNews = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this news article?")) {
      await deleteNews(id);
    }
  };

  const handleToggleHighlight = async (newsItem: News) => {
    // This would need to be implemented based on your news structure
    // For now, we'll just show an alert
    alert(`Toggle highlight for: ${newsItem.title}`);
  };

  const closeEditor = () => {
    setShowEditor(false);
    setEditingNews(null);
  };

  // Category management functions
  const handleAddCategory = async () => {
    if (newCategoryName.th.trim() || newCategoryName.en.trim()) {
      try {
        const response = await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cat_th: newCategoryName.th.trim(),
            cat_en: newCategoryName.en.trim(),
            description_th: newCategoryDescription.th.trim() || null,
            description_en: newCategoryDescription.en.trim() || null,
          }),
        });

        if (response.ok) {
          await fetchCategories(); // Refresh categories
          setNewCategoryName({ th: "", en: "" });
          setNewCategoryDescription({ th: "", en: "" });
        }
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName({
      th: category.cat_th,
      en: category.cat_en,
    });
    setNewCategoryDescription({
      th: category.description_th || "",
      en: category.description_en || "",
    });
  };

  const handleUpdateCategory = async () => {
    if (
      editingCategory &&
      (newCategoryName.th.trim() || newCategoryName.en.trim())
    ) {
      try {
        const response = await fetch("/api/categories", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: editingCategory.id,
            cat_th: newCategoryName.th.trim(),
            cat_en: newCategoryName.en.trim(),
            description_th: newCategoryDescription.th.trim() || null,
            description_en: newCategoryDescription.en.trim() || null,
          }),
        });

        if (response.ok) {
          await fetchCategories(); // Refresh categories
          setEditingCategory(null);
          setNewCategoryName({ th: "", en: "" });
          setNewCategoryDescription({ th: "", en: "" });
        }
      } catch (error) {
        console.error("Error updating category:", error);
      }
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(`/api/categories?id=${categoryId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          await fetchCategories(); // Refresh categories
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const closeCategoryManager = () => {
    setShowCategoryManager(false);
    setEditingCategory(null);
    setNewCategoryName({ th: "", en: "" });
    setNewCategoryDescription({ th: "", en: "" });
  };

  // Modal submission handler
  const handleModalSubmit = async (data: NewsArticleForm) => {
    try {
      // Create FormData for API submission
      const formData = new FormData();

      // Add bilingual fields
      formData.append("title_th", data.title.th || "");
      formData.append("title_en", data.title.en || "");
      formData.append("excerpt_th", data.excerpt.th || "");
      formData.append("excerpt_en", data.excerpt.en || "");
      formData.append("body_th", JSON.stringify(data.content.th));
      formData.append("body_en", JSON.stringify(data.content.en));
      formData.append("tag", JSON.stringify(data.tags));

      // Add category and highlight status
      formData.append("category_id", data.category || "");
      formData.append("is_highlighted", data.isHighlighted ? "true" : "false");

      // Add featured image if present
      if (data.featuredImage) {
        formData.append("thumbnail", data.featuredImage);
      }

      if (editingNews) {
        // Update existing news
        await updateNews(editingNews.id, formData);
      } else {
        // Add new news
        await addNews(formData);
      }

      closeEditor();
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-700">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 relative">
      {loading && <LoadingOverlay />}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            News/Event Manager
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCategoryManager(true)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2">
            <FolderOpen size={16} />
            Manage Categories
          </button>
          <button
            onClick={handleAddNews}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus size={16} />
            Add Article
          </button>
        </div>
      </div>

      {/* News List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Current News Articles
          </h3>

          {news.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar size={48} className="mx-auto" />
              </div>
              <p className="text-gray-500 mb-4">No news articles found</p>
              <button
                onClick={handleAddNews}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto">
                <Plus size={16} />
                Create Your First Article
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {news.map((newsItem) => (
                <div
                  key={newsItem.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-gray-900 text-lg">
                          {newsItem.title}
                        </h4>
                        {/* Highlight indicator - you can customize this based on your data structure */}
                        <button
                          onClick={() => handleToggleHighlight(newsItem)}
                          className="text-yellow-500 hover:text-yellow-600"
                          title="Toggle highlight">
                          <Star size={16} />
                        </button>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {newsItem.subtitle}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>
                            Created: {new Date().toLocaleDateString()}
                          </span>
                        </div>
                        {newsItem.tag && newsItem.tag.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Tag size={12} />
                            <span>{newsItem.tag.length} tags</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEditNews(newsItem)}
                        className="text-blue-600 hover:text-blue-700 p-2 rounded-md hover:bg-blue-50"
                        title="Edit article">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteNews(newsItem.id)}
                        className="text-red-600 hover:text-red-700 p-2 rounded-md hover:bg-red-50"
                        title="Delete article">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* News Editor Modal */}
      <NewsEditorModal
        suggestedTags={tags}
        isOpen={showEditor}
        onClose={closeEditor}
        editingNews={editingNews}
        categories={categories}
        onSubmit={handleModalSubmit}
        isSubmitting={false}
      />

      {/* Category Management Modal */}
      {showCategoryManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Manage Categories
              </h3>
              <button
                onClick={closeCategoryManager}
                className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Add/Edit Category Form */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-medium text-gray-900">
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </h4>
                  <LanguageToggle
                    value={categoryLanguage}
                    onChange={setCategoryLanguage}
                    size="small"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category Name (
                      {categoryLanguage === "th" ? "ไทย" : "English"})
                    </label>
                    <input
                      type="text"
                      value={newCategoryName[categoryLanguage as "th" | "en"]}
                      onChange={(e) =>
                        setNewCategoryName((prev) => ({
                          ...prev,
                          [categoryLanguage]: e.target.value,
                        }))
                      }
                      placeholder={
                        categoryLanguage === "th"
                          ? "ชื่อหมวดหมู่"
                          : "Category name"
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (
                      {categoryLanguage === "th" ? "ไทย" : "English"}) -
                      Optional
                    </label>
                    <textarea
                      value={
                        newCategoryDescription[categoryLanguage as "th" | "en"]
                      }
                      onChange={(e) =>
                        setNewCategoryDescription((prev) => ({
                          ...prev,
                          [categoryLanguage]: e.target.value,
                        }))
                      }
                      placeholder={
                        categoryLanguage === "th"
                          ? "คำอธิบายหมวดหมู่"
                          : "Category description"
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex gap-3">
                    {editingCategory ? (
                      <>
                        <button
                          onClick={handleUpdateCategory}
                          disabled={
                            !(
                              newCategoryName.th.trim() ||
                              newCategoryName.en.trim()
                            )
                          }
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                          Update Category
                        </button>
                        <button
                          onClick={() => {
                            setEditingCategory(null);
                            setNewCategoryName({ th: "", en: "" });
                            setNewCategoryDescription({ th: "", en: "" });
                          }}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleAddCategory}
                        disabled={
                          !(
                            newCategoryName.th.trim() ||
                            newCategoryName.en.trim()
                          )
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                        <Plus size={16} />
                        Add Category
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Categories List */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  Existing Categories
                </h4>

                <div className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="border border-gray-200 rounded-lg p-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">
                          {categoryLanguage === "th"
                            ? category.cat_th
                            : category.cat_en}
                        </h5>
                        {(category.description_th ||
                          category.description_en) && (
                          <p className="text-sm text-gray-600 mt-1">
                            {categoryLanguage === "th"
                              ? category.description_th
                              : category.description_en}
                          </p>
                        )}
                        <div className="text-xs text-gray-500 mt-1 space-y-1">
                          <p>ID: {category.id}</p>
                          <p>TH: {category.cat_th || "Not set"}</p>
                          <p>EN: {category.cat_en || "Not set"}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="text-blue-600 hover:text-blue-700 p-2 rounded-md hover:bg-blue-50"
                          title="Edit category">
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-700 p-2 rounded-md hover:bg-red-50"
                          title="Delete category">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {categories.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No categories found. Add your first category above.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
