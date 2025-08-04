import React, { useState, useEffect } from "react";
import { Plus, Calendar, FolderOpen, X, Edit, Trash2 } from "lucide-react";
import { NewsEditorModal } from "./newsEditorModal";
import { LanguageToggle } from "./languageToggle";
import { NewsItem, type NewsItemData } from "./newsItem";
import { LanguageProvider, useLanguage } from "./languageContext";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import {
  useNewsStore,
  type News,
  type Category,
} from "@/store/zustand/newsStore";
import { LoadingOverlay } from "./LoadingOverlay";
import { AdminNotification, useAdminNotification } from "./AdminNotification";

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

// Main NewsManager component with language context
const NewsManagerContent = () => {
  const { currentLanguage } = useLanguage();
  const { notification, hideNotification, showSuccess, showError } =
    useAdminNotification();
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

  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type?: "danger" | "warning" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

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
    if (success && typeof success === "string") {
      showSuccess(
        currentLanguage === "th" ? "สำเร็จ" : "Success",
        currentLanguage === "th"
          ? success.includes("created")
            ? "สร้างบทความสำเร็จ"
            : success.includes("updated")
            ? "อัปเดตบทความสำเร็จ"
            : success.includes("deleted")
            ? "ลบบทความสำเร็จ"
            : "ดำเนินการเสร็จสิ้น"
          : success
      );
      // Clear success state after showing toast
      setTimeout(() => {
        useNewsStore.setState({ success: false });
      }, 100);
    }
    if (error) {
      showError(currentLanguage === "th" ? "เกิดข้อผิดพลาด" : "Error", error);
      // Clear error state after showing toast
      setTimeout(() => {
        useNewsStore.setState({ error: null });
      }, 100);
    }
  }, [success, error, showSuccess, showError, currentLanguage]);

  // Helper functions
  const handleAddNews = () => {
    setEditingNews(null);
    setShowEditor(true);
  };

  const handleEditNews = (newsItem: News | NewsItemData) => {
    // Convert to the format expected by NewsEditorModal
    const convertedNews: News = {
      ...newsItem,
      title: newsItem.title_th || newsItem.title_en || "",
      subtitle: newsItem.excerpt_th || newsItem.excerpt_en || "",
      tag: newsItem.tag_id || [],
    } as News;

    setEditingNews(convertedNews);
    setShowEditor(true);
  };

  const handleDeleteNews = async (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: currentLanguage === "th" ? "ยืนยันการลบ" : "Confirm Delete",
      message:
        currentLanguage === "th"
          ? "คุณแน่ใจหรือไม่ที่จะลบบทความนี้? การดำเนินการนี้ไม่สามารถยกเลิกได้"
          : "Are you sure you want to delete this news article? This action cannot be undone.",
      onConfirm: () => deleteNews(id),
      type: "danger",
    });
  };

  const handleToggleHighlight = async (newsItem: NewsItemData) => {
    try {
      // Create FormData with all required fields for the update
      const formData = new FormData();
      formData.append("id", newsItem.id);
      formData.append("title_th", newsItem.title_th || "");
      formData.append("title_en", newsItem.title_en || "");
      formData.append("excerpt_th", newsItem.excerpt_th || "");
      formData.append("excerpt_en", newsItem.excerpt_en || "");
      formData.append("body_th", JSON.stringify(newsItem.body_th || {}));
      formData.append("body_en", JSON.stringify(newsItem.body_en || {}));
      formData.append("tag", JSON.stringify(newsItem.tag_id || []));
      formData.append("category_id", newsItem.cat_id || "");
      formData.append("is_highlighted", (!newsItem.is_highlighted).toString());
      formData.append("status", newsItem.status || "draft");

      // Add thumbnail URL if exists
      if (newsItem.thumbnail) {
        formData.append("thumbnailUrl", newsItem.thumbnail);
      }

      await updateNews(newsItem.id, formData);
    } catch (error) {
      console.error("Error toggling highlight:", error);
    }
  };

  const handleToggleStatus = async (newsItem: NewsItemData) => {
    try {
      // Create FormData with all required fields for the update
      const formData = new FormData();
      formData.append("id", newsItem.id);
      formData.append("title_th", newsItem.title_th || "");
      formData.append("title_en", newsItem.title_en || "");
      formData.append("excerpt_th", newsItem.excerpt_th || "");
      formData.append("excerpt_en", newsItem.excerpt_en || "");
      formData.append("body_th", JSON.stringify(newsItem.body_th || {}));
      formData.append("body_en", JSON.stringify(newsItem.body_en || {}));
      formData.append("tag", JSON.stringify(newsItem.tag_id || []));
      formData.append("category_id", newsItem.cat_id || "");
      formData.append(
        "is_highlighted",
        newsItem.is_highlighted ? "true" : "false"
      );

      // Toggle status
      const newStatus = newsItem.status === "published" ? "draft" : "published";
      formData.append("status", newStatus);

      // Add thumbnail URL if exists
      if (newsItem.thumbnail) {
        formData.append("thumbnailUrl", newsItem.thumbnail);
      }

      await updateNews(newsItem.id, formData);
    } catch (error) {
      console.error("Error toggling status:", error);
    }
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
    setConfirmDialog({
      isOpen: true,
      title:
        currentLanguage === "th"
          ? "ยืนยันการลบหมวดหมู่"
          : "Confirm Delete Category",
      message:
        currentLanguage === "th"
          ? "คุณแน่ใจหรือไม่ที่จะลบหมวดหมู่นี้? การดำเนินการนี้ไม่สามารถยกเลิกได้"
          : "Are you sure you want to delete this category? This action cannot be undone.",
      onConfirm: async () => {
        try {
          const response = await fetch(`/api/categories?id=${categoryId}`, {
            method: "DELETE",
          });

          if (response.ok) {
            await fetchCategories(); // Refresh categories
            showSuccess(
              currentLanguage === "th"
                ? "ลบหมวดหมู่สำเร็จ"
                : "Category Deleted",
              currentLanguage === "th"
                ? "ลบหมวดหมู่เรียบร้อยแล้ว"
                : "Category has been deleted successfully"
            );
          } else {
            throw new Error("Failed to delete category");
          }
        } catch (error) {
          console.error("Error deleting category:", error);
          showError(
            currentLanguage === "th" ? "เกิดข้อผิดพลาด" : "Error",
            currentLanguage === "th"
              ? "ไม่สามารถลบหมวดหมู่ได้"
              : "Failed to delete category"
          );
        }
      },
      type: "danger",
    });
  };

  const closeCategoryManager = () => {
    setShowCategoryManager(false);
    setEditingCategory(null);
    setNewCategoryName({ th: "", en: "" });
    setNewCategoryDescription({ th: "", en: "" });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: () => {},
    });
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
      // Convert tag IDs from strings to numbers
      const tagIds = data.tags
        .map((tagId) => parseInt(tagId, 10))
        .filter((id) => !isNaN(id));
      formData.append("tag", JSON.stringify(tagIds));

      // Add category, highlight status, and publication status
      formData.append("category_id", data.category || "");
      formData.append("is_highlighted", data.isHighlighted ? "true" : "false");
      formData.append("status", data.status || "draft");

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

  return (
    <div className="space-y-6 relative">
      {loading && <LoadingOverlay />}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {currentLanguage === "th"
              ? "จัดการข่าวสาร/กิจกรรม"
              : "News/Event Manager"}
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCategoryManager(true)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2">
            <FolderOpen size={16} />
            {currentLanguage === "th" ? "จัดการหมวดหมู่" : "Manage Categories"}
          </button>
          <button
            onClick={handleAddNews}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus size={16} />
            {currentLanguage === "th" ? "เพิ่มบทความ" : "Add Article"}
          </button>
        </div>
      </div>

      {/* News List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {currentLanguage === "th"
              ? "บทความข่าวสารปัจจุบัน"
              : "Current News Articles"}
          </h3>

          {news.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar size={48} className="mx-auto" />
              </div>
              <p className="text-gray-500 mb-4">
                {currentLanguage === "th"
                  ? "ไม่พบบทความข่าวสาร"
                  : "No news articles found"}
              </p>
              <button
                onClick={handleAddNews}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto">
                <Plus size={16} />
                {currentLanguage === "th"
                  ? "สร้างบทความแรกของคุณ"
                  : "Create Your First Article"}
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {news.map((newsItem) => (
                <NewsItem
                  key={newsItem.id}
                  newsItem={newsItem as NewsItemData}
                  currentLanguage={currentLanguage}
                  onEdit={handleEditNews}
                  onDelete={handleDeleteNews}
                  onToggleHighlight={handleToggleHighlight}
                  onToggleStatus={handleToggleStatus}
                  categories={categories}
                  tags={tags}
                />
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
        editingNews={editingNews as News | null}
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

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={closeConfirmDialog}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
        confirmText={currentLanguage === "th" ? "ยืนยัน" : "Confirm"}
        cancelText={currentLanguage === "th" ? "ยกเลิก" : "Cancel"}
      />

      {/* Notification */}
      {notification && (
        <AdminNotification
          type={notification.type}
          title={notification.title}
          message={notification.message}
          isVisible={notification.isVisible}
          onDismiss={hideNotification}
        />
      )}
    </div>
  );
};

// Main NewsManager component with language provider
export const NewsManager = () => {
  return (
    <LanguageProvider defaultLanguage="th">
      <NewsManagerContent />
    </LanguageProvider>
  );
};
