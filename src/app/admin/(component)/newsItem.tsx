import React from "react";
import {
  Edit,
  Trash2,
  Star,
  Clock,
  Tag,
  Eye,
  Calendar,
  Globe,
} from "lucide-react";

// Updated News interface with bilingual support
export interface NewsItemData {
  id: string;
  thumbnail?: string;
  title_th: string;
  title_en: string;
  excerpt_th?: string;
  excerpt_en?: string;
  tag_id?: number[];
  body_th?: any;
  body_en?: any;
  cat_id?: string;
  is_highlighted?: boolean;
  status?: "draft" | "published";
  created_at?: string;
  updated_at?: string;
}

interface NewsItemProps {
  newsItem: NewsItemData;
  currentLanguage: "th" | "en";
  onEdit: (newsItem: NewsItemData) => void;
  onDelete: (id: string) => void;
  onToggleHighlight: (newsItem: NewsItemData) => void;
  categories?: Array<{ id: string; cat_th: string; cat_en: string }>;
  tags?: Array<{ id: number; tag_th: string; tag_en: string }>;
}

export const NewsItem: React.FC<NewsItemProps> = ({
  newsItem,
  currentLanguage,
  onEdit,
  onDelete,
  onToggleHighlight,
  categories = [],
  tags = [],
}) => {
  // Get display title based on current language
  const getDisplayTitle = () => {
    if (currentLanguage === "th") {
      return newsItem.title_th || newsItem.title_en || "Untitled";
    }
    return newsItem.title_en || newsItem.title_th || "Untitled";
  };

  // Get display excerpt based on current language
  const getDisplayExcerpt = () => {
    if (currentLanguage === "th") {
      return newsItem.excerpt_th || newsItem.excerpt_en || "";
    }
    return newsItem.excerpt_en || newsItem.excerpt_th || "";
  };

  // Get category name based on current language
  const getCategoryName = () => {
    if (!newsItem.cat_id) return null;
    const category = categories.find((cat) => cat.id === newsItem.cat_id);
    if (!category) return null;
    
    if (currentLanguage === "th") {
      return category.cat_th || category.cat_en;
    }
    return category.cat_en || category.cat_th;
  };

  // Get tag names based on current language
  const getTagNames = () => {
    if (!newsItem.tag_id || newsItem.tag_id.length === 0) return [];
    
    return newsItem.tag_id
      .map((tagId) => {
        const tag = tags.find((t) => t.id === tagId);
        if (!tag) return null;
        
        if (currentLanguage === "th") {
          return tag.tag_th || tag.tag_en;
        }
        return tag.tag_en || tag.tag_th;
      })
      .filter(Boolean);
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    try {
      return new Date(dateString).toLocaleDateString(
        currentLanguage === "th" ? "th-TH" : "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );
    } catch {
      return "Invalid date";
    }
  };

  // Get status display
  const getStatusDisplay = () => {
    const status = newsItem.status || "draft";
    if (currentLanguage === "th") {
      return status === "published" ? "เผยแพร่แล้ว" : "ร่าง";
    }
    return status === "published" ? "Published" : "Draft";
  };

  // Get status color
  const getStatusColor = () => {
    const status = newsItem.status || "draft";
    return status === "published" 
      ? "bg-green-100 text-green-800" 
      : "bg-yellow-100 text-yellow-800";
  };

  const displayTitle = getDisplayTitle();
  const displayExcerpt = getDisplayExcerpt();
  const categoryName = getCategoryName();
  const tagNames = getTagNames();

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Title and Language Indicator */}
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium text-gray-900 text-lg flex-1">
              {displayTitle}
            </h4>
            
            {/* Language indicator */}
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Globe size={12} />
              <span className="uppercase">{currentLanguage}</span>
            </div>

            {/* Highlight indicator */}
            <button
              onClick={() => onToggleHighlight(newsItem)}
              className={`transition-colors ${
                newsItem.is_highlighted
                  ? "text-yellow-500 hover:text-yellow-600"
                  : "text-gray-300 hover:text-yellow-400"
              }`}
              title={
                newsItem.is_highlighted
                  ? currentLanguage === "th" ? "ยกเลิกไฮไลท์" : "Remove highlight"
                  : currentLanguage === "th" ? "เพิ่มไฮไลท์" : "Add highlight"
              }>
              <Star size={16} fill={newsItem.is_highlighted ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
              {getStatusDisplay()}
            </span>
            {newsItem.is_highlighted && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {currentLanguage === "th" ? "ไฮไลท์" : "Highlighted"}
              </span>
            )}
          </div>

          {/* Excerpt */}
          {displayExcerpt && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {displayExcerpt}
            </p>
          )}

          {/* Category */}
          {categoryName && (
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs text-gray-500">
                {currentLanguage === "th" ? "หมวดหมู่:" : "Category:"}
              </span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {categoryName}
              </span>
            </div>
          )}

          {/* Tags */}
          {tagNames.length > 0 && (
            <div className="flex items-center gap-1 mb-3">
              <Tag size={12} className="text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {tagNames.map((tagName, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {tagName}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>
                {currentLanguage === "th" ? "สร้าง:" : "Created:"} {formatDate(newsItem.created_at)}
              </span>
            </div>
            {newsItem.updated_at && newsItem.updated_at !== newsItem.created_at && (
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>
                  {currentLanguage === "th" ? "แก้ไข:" : "Updated:"} {formatDate(newsItem.updated_at)}
                </span>
              </div>
            )}
          </div>

          {/* Bilingual Content Indicator */}
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <span>{currentLanguage === "th" ? "เนื้อหา:" : "Content:"}</span>
            <div className="flex gap-1">
              <span className={`px-1 py-0.5 rounded ${newsItem.title_th ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                TH
              </span>
              <span className={`px-1 py-0.5 rounded ${newsItem.title_en ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                EN
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(newsItem)}
            className="text-blue-600 hover:text-blue-700 p-2 rounded-md hover:bg-blue-50"
            title={currentLanguage === "th" ? "แก้ไขบทความ" : "Edit article"}>
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(newsItem.id)}
            className="text-red-600 hover:text-red-700 p-2 rounded-md hover:bg-red-50"
            title={currentLanguage === "th" ? "ลบบทความ" : "Delete article"}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
