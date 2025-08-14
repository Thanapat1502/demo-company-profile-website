"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useNewsStore } from "@/store/zustand/newsStore";
import NewsHero from "@/components/news/NewsHero";
import NewsCard from "@/components/news/NewsCard";
import CategoryFilter from "@/components/news/CategoryFilter";
import LoadingOverlay, {
  NewsGridSkeleton,
} from "@/components/news/LoadingOverlay";

interface ClientNewsEventsPageProps {
  locale: string;
}

export default function ClientNewsEventsPage({
  locale,
}: ClientNewsEventsPageProps) {
  const t = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const {
    news,
    highlightedNews,
    categories,
    loading,
    error,
    fetchNews,
    fetchHighlightedNews,
    fetchCategories,
  } = useNewsStore();

  // Fetch data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsInitialLoading(true);
        await Promise.all([
          fetchNews(),
          fetchHighlightedNews(),
          fetchCategories(),
        ]);
      } catch (error) {
        console.error("Failed to fetch news data:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchAllData();
  }, [fetchNews, fetchHighlightedNews, fetchCategories]);

  // Filter news based on category and search term
  const filteredNews = news.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.cat_id === selectedCategory;

    const matchesSearch =
      searchTerm === "" ||
      item.title_th.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.excerpt_th &&
        item.excerpt_th.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.excerpt_en &&
        item.excerpt_en.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Categories will be handled by CategoryFilter component
  const uniqueCategories = categories;

  const isLoading = isInitialLoading || loading;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("common.error.title")}
          </h2>
          <p className="text-gray-600">{t("common.error.description")}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* News Content Section */}
      <section id='news-events' className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t("news.hero.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("news.hero.subtitle")}
            </p>
          </div>

          {/* Hero Section with Highlighted News */}
          {/* {highlightedNews.length > 0 && (
            <NewsHero news={highlightedNews} locale={locale} />
          )} */}

          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            {/* Category Filter */}
            <div className="flex-1">
              <CategoryFilter
                categories={uniqueCategories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                locale={locale}
              />
            </div>

            {/* Search */}
            <div className="lg:w-80">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t("news.search.placeholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && <NewsGridSkeleton />}

          {/* News Grid */}
          {!isLoading && (
            <>
              {filteredNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredNews.map((item) => (
                    <NewsCard key={item.id} news={item} locale={locale} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {"No Results Found"}
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchTerm("");
                    }}
                    className="mt-6 px-6 py-3 bg-[var(--primary-blue)] text-white rounded-lg hover:bg-blue-700 transition-colors">
                    {"Clear Filters"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay locale={locale} />}
    </>
  );
}
