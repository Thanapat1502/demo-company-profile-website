import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { HomeContentManager } from "./sections/HomeContentManager";
import { AboutContentManager } from "./sections/AboutContentManager";
import { ProductServiceContentManager } from "./sections/ProductServiceContentManager";
import { NewsContentManager } from "./sections/NewsContentManager";
import { ContactContentManager } from "./sections/ContactContentManager";

// Page configurations for navigation
interface PageConfig {
  id: string;
  name: string;
}

// Page Configurations for navigation
const PAGE_CONFIGURATIONS: PageConfig[] = [
  { id: "home", name: "Home" },
  { id: "about-main", name: "Main" },
  { id: "about-history", name: "History" },
  { id: "about-vision", name: "Vision" },
  { id: "about-executive", name: "Executive" },
  { id: "products-services", name: "Products & Services" },
  { id: "news", name: "News" },
  { id: "contact", name: "Contact" },
];

// Group configurations for navigation
const MAIN_PAGES = PAGE_CONFIGURATIONS.filter(
  (page) => !page.id.startsWith("about-") || page.id === "about-main"
).map((page) => (page.id === "about-main" ? { ...page, name: "About" } : page));

const ABOUT_SUBMENU = PAGE_CONFIGURATIONS.filter((page) =>
  page.id.startsWith("about-")
);

export const ContentManager = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [loading, setLoading] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleSave = (result: any) => {
    if (result.success) {
      alert("Content updated successfully!");
    } else {
      alert(`Error: ${result.error}`);
    }
    setLoading(false);
  };

  const renderCurrentPageContent = () => {
    switch (selectedPage) {
      case "home":
        return <HomeContentManager onSave={handleSave} loading={loading} />;

      case "about-main":
        return (
          <AboutContentManager
            pageId="about-main"
            onSave={handleSave}
            loading={loading}
          />
        );

      case "about-history":
        return (
          <AboutContentManager
            pageId="about-history"
            onSave={handleSave}
            loading={loading}
          />
        );

      case "about-vision":
        return (
          <AboutContentManager
            pageId="about-vision"
            onSave={handleSave}
            loading={loading}
          />
        );

      case "about-executive":
        return (
          <AboutContentManager
            pageId="about-executive"
            onSave={handleSave}
            loading={loading}
          />
        );

      case "products-services":
        return (
          <ProductServiceContentManager onSave={handleSave} loading={loading} />
        );

      case "news":
        return <NewsContentManager onSave={handleSave} loading={loading} />;

      case "contact":
        return <ContactContentManager onSave={handleSave} loading={loading} />;

      default:
        return <HomeContentManager onSave={handleSave} loading={loading} />;
    }
  };

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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 relative">
          <div className="border-b border-gray-200">
            <nav
              className="flex space-x-8 px-6 overflow-visible relative"
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
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-[9999] min-w-max">
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

        {/* Content Area */}
        <div className="space-y-8">{renderCurrentPageContent()}</div>
      </div>
    </div>
  );
};
