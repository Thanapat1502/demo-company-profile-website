import React, { useState } from "react";
import {
  Save,
  ChevronDown,
  ChevronRight,
  Upload,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import { useForm, Control } from "react-hook-form";
import {
  HeroSectionEditor,
  ParallaxGallerySectionEditor,
  IndividualImagesSectionEditor,
  GalleryOrVideoSectionEditor,
} from "./sections";

// Types and Interfaces
interface MultilingualText {
  th: string;
  en: string;
}

interface ImageAsset {
  id: string;
  url: string;
  alt: MultilingualText;
  order: number;
}

interface VideoAsset {
  id: string;
  url: string;
  title: MultilingualText;
  description?: MultilingualText;
}

interface SectionConfig {
  id: string;
  type: "hero" | "parallax_gallery" | "individual_images" | "gallery_or_video";
  title: MultilingualText;
  maxImages?: number;
  minImages?: number;
  allowVideo?: boolean;
  required?: boolean;
}

interface PageConfig {
  id: string;
  name: MultilingualText;
  sections: SectionConfig[];
  subpages?: PageConfig[];
}

interface SectionData {
  sectionId: string;
  mode?: "gallery" | "video"; // For gallery_or_video sections
  images: ImageAsset[];
  video?: VideoAsset;
  content?: MultilingualText;
}

interface PageContentData {
  pageId: string;
  sections: SectionData[];
  lastModified: Date;
}

// Page Configurations Schema
const PAGE_CONFIGURATIONS: PageConfig[] = [
  {
    id: "home",
    name: { th: "หน้าแรก", en: "Home" },
    sections: [
      {
        id: "hero",
        type: "hero",
        title: { th: "ส่วนหัวหน้าแรก", en: "Home Hero Section" },
        minImages: 1,
        maxImages: 5,
        required: true,
      },
      {
        id: "parallax_gallery",
        type: "parallax_gallery",
        title: { th: "แกลเลอรี่พาราแลกซ์", en: "Parallax Gallery" },
        minImages: 3,
        maxImages: 10,
        required: true,
      },
    ],
  },
  {
    id: "about",
    name: { th: "เกี่ยวกับเรา", en: "About" },
    sections: [
      {
        id: "hero",
        type: "hero",
        title: { th: "ส่วนหัวเกี่ยวกับเรา", en: "About Hero Section" },
        minImages: 1,
        maxImages: 3,
        required: true,
      },
    ],
    subpages: [
      {
        id: "about-main",
        name: { th: "เกี่ยวกับเรา - หลัก", en: "About - Main" },
        sections: [
          {
            id: "parallax_gallery",
            type: "parallax_gallery",
            title: { th: "แกลเลอรี่พาราแลกซ์", en: "Parallax Gallery" },
            minImages: 3,
            maxImages: 8,
          },
        ],
      },
      {
        id: "about-history",
        name: { th: "ประวัติความเป็นมา", en: "History" },
        sections: [
          {
            id: "history_images",
            type: "individual_images",
            title: { th: "รูปภาพประวัติ", en: "History Images" },
            maxImages: 6,
            minImages: 6,
          },
        ],
      },
      {
        id: "about-vision",
        name: { th: "วิสัยทัศน์", en: "Vision" },
        sections: [
          {
            id: "vision_images",
            type: "individual_images",
            title: { th: "รูปภาพวิสัยทัศน์", en: "Vision Images" },
            maxImages: 2,
            minImages: 2,
          },
        ],
      },
      {
        id: "about-executive",
        name: { th: "ผู้บริหาร", en: "Executive" },
        sections: [
          {
            id: "hero",
            type: "hero",
            title: { th: "ส่วนหัวผู้บริหาร", en: "Executive Hero Section" },
            minImages: 1,
            maxImages: 2,
          },
        ],
      },
    ],
  },
  {
    id: "products-services",
    name: { th: "ผลิตภัณฑ์และบริการ", en: "Products & Services" },
    sections: [
      {
        id: "hero",
        type: "hero",
        title: { th: "ส่วนหัวผลิตภัณฑ์", en: "Products Hero Section" },
        minImages: 1,
        maxImages: 3,
        required: true,
      },
      {
        id: "service-1",
        type: "gallery_or_video",
        title: { th: "บริการที่ 1", en: "Service 1" },
        allowVideo: true,
        maxImages: 8,
      },
      {
        id: "service-2",
        type: "gallery_or_video",
        title: { th: "บริการที่ 2", en: "Service 2" },
        allowVideo: true,
        maxImages: 8,
      },
      {
        id: "service-3",
        type: "gallery_or_video",
        title: { th: "บริการที่ 3", en: "Service 3" },
        allowVideo: true,
        maxImages: 8,
      },
      {
        id: "service-4",
        type: "gallery_or_video",
        title: { th: "บริการที่ 4", en: "Service 4" },
        allowVideo: true,
        maxImages: 8,
      },
    ],
  },
  {
    id: "news",
    name: { th: "ข่าวสาร", en: "News" },
    sections: [
      {
        id: "hero",
        type: "hero",
        title: { th: "ส่วนหัวข่าวสาร", en: "News Hero Section" },
        minImages: 1,
        maxImages: 3,
        required: true,
      },
    ],
  },
  {
    id: "contact",
    name: { th: "ติดต่อเรา", en: "Contact" },
    sections: [
      {
        id: "hero",
        type: "hero",
        title: { th: "ส่วนหัวติดต่อเรา", en: "Contact Hero Section" },
        minImages: 1,
        maxImages: 2,
        required: true,
      },
    ],
  },
];

export const ContentManager = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [expandedMenus, setExpandedMenus] = useState<{
    [key: string]: boolean;
  }>({
    about: false,
    "products-services": false,
  });

  // Get all pages including subpages for dropdown
  const getAllPages = (): {
    id: string;
    name: string;
    isSubpage?: boolean;
    parentId?: string;
  }[] => {
    const pages: {
      id: string;
      name: string;
      isSubpage?: boolean;
      parentId?: string;
    }[] = [];

    PAGE_CONFIGURATIONS.forEach((page) => {
      pages.push({
        id: page.id,
        name: page.name.en, // Always use English for admin interface
      });

      if (page.subpages) {
        page.subpages.forEach((subpage) => {
          pages.push({
            id: subpage.id,
            name: `${page.name.en} > ${subpage.name.en}`,
            isSubpage: true,
            parentId: page.id,
          });
        });
      }
    });

    return pages;
  };

  const pages = getAllPages();

  // Toggle dropdown menu
  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  // Get current page configuration
  const getCurrentPageConfig = (): PageConfig | null => {
    for (const page of PAGE_CONFIGURATIONS) {
      if (page.id === selectedPage) return page;
      if (page.subpages) {
        for (const subpage of page.subpages) {
          if (subpage.id === selectedPage) return subpage;
        }
      }
    }
    return null;
  };

  const currentPageConfig = getCurrentPageConfig();

  // React Hook Form setup
  const { control, handleSubmit } = useForm<PageContentData>({
    defaultValues: {
      pageId: selectedPage,
      sections: [],
      lastModified: new Date(),
    },
  });

  const onSubmit = (data: PageContentData) => {
    console.log("Saving page content:", data);
    // Here you would save to your backend/Supabase
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Content Manager</h2>
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200 relative">
          <nav className="flex space-x-4 px-6 overflow-x-auto relative">
            {/* Home */}
            <button
              className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                selectedPage === "home"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setSelectedPage("home")}>
              Home
            </button>

            {/* About Menu - Horizontal Expansion */}
            {expandedMenus.about ? (
              /* Expanded About Menu */
              <div className="flex items-center border-b-2 border-blue-500">
                <button
                  className="py-4 px-3 font-medium text-sm text-blue-600 flex items-center gap-1"
                  onClick={() => toggleMenu("about")}>
                  About
                  <ChevronDown size={14} />
                </button>
                <div className="flex items-center">
                  <button
                    className={`py-4 px-3 text-sm hover:text-blue-600 transition-colors ${
                      selectedPage === "about"
                        ? "text-blue-600 font-medium"
                        : "text-gray-600"
                    }`}
                    onClick={() => {
                      setSelectedPage("about");
                      setExpandedMenus((prev) => ({ ...prev, about: false }));
                    }}>
                    Main About
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    className={`py-4 px-3 text-sm hover:text-blue-600 transition-colors ${
                      selectedPage === "about-history"
                        ? "text-blue-600 font-medium"
                        : "text-gray-600"
                    }`}
                    onClick={() => {
                      setSelectedPage("about-history");
                      setExpandedMenus((prev) => ({ ...prev, about: false }));
                    }}>
                    History
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    className={`py-4 px-3 text-sm hover:text-blue-600 transition-colors ${
                      selectedPage === "about-vision"
                        ? "text-blue-600 font-medium"
                        : "text-gray-600"
                    }`}
                    onClick={() => {
                      setSelectedPage("about-vision");
                      setExpandedMenus((prev) => ({ ...prev, about: false }));
                    }}>
                    Vision
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    className={`py-4 px-3 text-sm hover:text-blue-600 transition-colors ${
                      selectedPage === "about-executive"
                        ? "text-blue-600 font-medium"
                        : "text-gray-600"
                    }`}
                    onClick={() => {
                      setSelectedPage("about-executive");
                      setExpandedMenus((prev) => ({ ...prev, about: false }));
                    }}>
                    Executive
                  </button>
                </div>
              </div>
            ) : (
              /* Collapsed About Menu */
              <button
                className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap flex items-center gap-1 ${
                  [
                    "about",
                    "about-main",
                    "about-history",
                    "about-vision",
                    "about-executive",
                  ].includes(selectedPage)
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => toggleMenu("about")}>
                About
                <ChevronRight size={14} />
              </button>
            )}

            {/* Products & Services */}
            <button
              className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                selectedPage === "products-services"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setSelectedPage("products-services")}>
              Products & Services
            </button>

            {/* News */}
            <button
              className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                selectedPage === "news"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setSelectedPage("news")}>
              News
            </button>

            {/* Contact */}
            <button
              className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                selectedPage === "contact"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setSelectedPage("contact")}>
              Contact
            </button>
          </nav>
        </div>

        <div className="p-6">
          {currentPageConfig ? (
            <div className="space-y-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {currentPageConfig.name.en}
                </h3>
                <p className="text-gray-600">
                  Configure content sections for this page
                </p>
              </div>

              {/* Render sections based on configuration */}
              {currentPageConfig.sections.map((sectionConfig) => (
                <SectionEditor
                  key={sectionConfig.id}
                  config={sectionConfig}
                  control={control}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Select a page to edit its content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Section Editor Component
interface SectionEditorProps {
  config: SectionConfig;
  control: Control<PageContentData>;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ config, control }) => {
  const [mode, setMode] = useState<"gallery" | "video">("gallery");

  const renderSectionContent = () => {
    switch (config.type) {
      case "hero":
        return <HeroSectionEditor config={config} control={control} />;
      case "parallax_gallery":
        return (
          <ParallaxGallerySectionEditor config={config} control={control} />
        );
      case "individual_images":
        return (
          <IndividualImagesSectionEditor config={config} control={control} />
        );
      case "gallery_or_video":
        return (
          <GalleryOrVideoSectionEditor
            config={config}
            control={control}
            mode={mode}
            onModeChange={setMode}
          />
        );
      default:
        return <div>Unknown section type</div>;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900">
          {config.title.en}
        </h4>
        {config.required && (
          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
            Required
          </span>
        )}
      </div>
      {renderSectionContent()}
    </div>
  );
};
