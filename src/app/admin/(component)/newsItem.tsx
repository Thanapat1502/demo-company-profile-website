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
  FileText,
  Users,
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
  publish_at?: string;
}

interface NewsItemProps {
  newsItem: NewsItemData;
  currentLanguage: "th" | "en";
  onEdit: (newsItem: NewsItemData) => void;
  onDelete: (id: string) => void;
  onToggleHighlight: (newsItem: NewsItemData) => void;
  onToggleStatus: (newsItem: NewsItemData) => void;
  categories?: Array<{ id: string; cat_th: string; cat_en: string }>;
  tags?: Array<{ id: number; tag_th: string; tag_en: string }>;
}

// Slide Toggle Component
const SlideToggle: React.FC<{
  checked: boolean;
  onChange: () => void;
  label: string;
  description: string;
  color?: "green" | "yellow";
}> = ({ checked, onChange, label, description, color = "green" }) => {
  const colorClasses = {
    green: checked 
      ? "bg-green-500 border-green-500" 
      : "bg-gray-200 border-gray-200",
    yellow: checked 
      ? "bg-yellow-500 border-yellow-500" 
      : "bg-gray-200 border-gray-200"
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">{label}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${colorClasses[color]}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export const NewsItem: React.FC<NewsItemProps> = ({
  newsItem,
  currentLanguage,
  onEdit,
  onDelete,
  onToggleHighlight,
  onToggleStatus,
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

  const displayTitle = getDisplayTitle();
  const displayExcerpt = getDisplayExcerpt();
  const categoryName = getCategoryName();
  const tagNames = getTagNames();

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-start justify-between">
          {/* Left: Title and Info */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {displayTitle}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 bg-white px-2 py-1 rounded-md border">
                <Globe size={12} />
                <span className="uppercase font-medium">{currentLanguage}</span>
              </div>
            </div>
            
            {/* Status and Date Info */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{formatDate(newsItem.created_at)}</span>
              </div>
              {newsItem.status === "published" && newsItem.publish_at && (
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{currentLanguage === "th" ? "เผยแพร่:" : "Published:"} {formatDate(newsItem.publish_at)}</span>
                </div>
              )}
              {newsItem.updated_at && newsItem.updated_at !== newsItem.created_at && (
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{currentLanguage === "th" ? "แก้ไข:" : "Updated:"} {formatDate(newsItem.updated_at)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(newsItem)}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors"
              title={currentLanguage === "th" ? "แก้ไขบทความ" : "Edit article"}>
              <Edit size={16} />
              <span className="text-sm font-medium">
                {currentLanguage === "th" ? "แก้ไข" : "Edit"}
              </span>
            </button>
            
            <button
              onClick={() => onDelete(newsItem.id)}
              className="flex items-center gap-2 px-4 py-2 text-red-600 bg-white hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
              title={currentLanguage === "th" ? "ลบบทความ" : "Delete article"}>
              <Trash2 size={16} />
              <span className="text-sm font-medium">
                {currentLanguage === "th" ? "ลบ" : "Delete"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Thumbnail and Content Preview */}
          <div className="lg:col-span-2">
            <div className="flex gap-4">
              {/* Thumbnail */}
              <div className="w-24 h-18 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                {newsItem.thumbnail ? (
                  <img
                    src={newsItem.thumbnail}
                    alt={displayTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText size={16} className="text-gray-400" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Excerpt */}
                {displayExcerpt && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {displayExcerpt}
                  </p>
                )}

                {/* Category and Tags */}
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  {categoryName && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                      <span>📁</span>
                      <span>{categoryName}</span>
                    </div>
                  )}

                  {tagNames.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag size={12} className="text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {tagNames.slice(0, 2).map((tagName, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                            {tagName}
                          </span>
                        ))}
                        {tagNames.length > 2 && (
                          <span className="text-xs text-gray-500 px-2 py-1">
                            +{tagNames.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Availability */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    {currentLanguage === "th" ? "เนื้อหา:" : "Content:"}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${newsItem.title_th ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      <span className="text-xs text-gray-600">TH</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${newsItem.title_en ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      <span className="text-xs text-gray-600">EN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Controls */}
          <div className="space-y-4">
            {/* Publication Status */}
            <SlideToggle
              checked={newsItem.status === "published"}
              onChange={() => onToggleStatus(newsItem)}
              label={currentLanguage === "th" ? "สถานะการเผยแพร่" : "Publication Status"}
              description={
                newsItem.status === "published"
                  ? currentLanguage === "th" ? "เผยแพร่แล้ว - ผู้อ่านสามารถเห็นได้" : "Published - Visible to readers"
                  : currentLanguage === "th" ? "ร่าง - ยังไม่เผยแพร่" : "Draft - Not visible to readers"
              }
              color="green"
            />

            {/* Featured Status */}
            <SlideToggle
              checked={newsItem.is_highlighted || false}
              onChange={() => onToggleHighlight(newsItem)}
              label={currentLanguage === "th" ? "บทความเด่น" : "Featured Article"}
              description={
                newsItem.is_highlighted
                  ? currentLanguage === "th" ? "แสดงในหน้าแรก" : "Shown on homepage"
                  : currentLanguage === "th" ? "บทความทั่วไป" : "Regular article"
              }
              color="yellow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
