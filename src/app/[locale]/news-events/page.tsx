"use client";

import { useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import MainLayout from "@/components/layout/MainLayout";
import { useNewsStore } from "@/store/zustand/newsStore";
import NewsHero from "@/components/news/NewsHero";
import NewsCard from "@/components/news/NewsCard";
import CategoryFilter from "@/components/news/CategoryFilter";
import LoadingOverlay, {
  NewsGridSkeleton,
} from "@/components/news/LoadingOverlay";
import { getBilingualCategory } from "@/utils/bilingual";

export default function NewsEventsPage() {
  const locale = useLocale();
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
    const loadData = async () => {
      setIsInitialLoading(true);
      try {
        await Promise.all([
          fetchNews(),
          fetchHighlightedNews(),
          fetchCategories(),
        ]);
      } catch (error) {
        console.error("Error loading news data:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadData();
  }, [fetchNews, fetchHighlightedNews, fetchCategories]);

  // Filter news based on category and search term
  const filteredNews = news.filter((article) => {
    const matchesCategory =
      selectedCategory === "all" || article.cat_id === selectedCategory;

    const title = locale === "th" ? article.title_th : article.title_en;
    const excerpt = locale === "th" ? article.excerpt_th : article.excerpt_en;

    const matchesSearch =
      title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      excerpt?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Get the first highlighted news for hero section
  const heroNews = highlightedNews[0];

  // Show loading overlay during initial load
  if (isInitialLoading) {
    return (
      <MainLayout>
        <LoadingOverlay locale={locale} context="news" />
      </MainLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <MainLayout>
        <div className="min-h-[400px] flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {locale === "th" ? "ลองใหม่" : "Try Again"}
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section with Highlighted News */}
      {heroNews ? (
        <NewsHero news={heroNews} locale={locale} />
      ) : (
        <section className="relative h-[70vh] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-4xl text-center">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {locale === "th" ? "ข่าวสารและกิจกรรม" : "News & Events"}
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                  {locale === "th"
                    ? "อัพเดทข่าวสารและความเคลื่อนไหวของบริษัทอย่างต่อเนื่อง"
                    : "Stay updated with our latest news and company activities"}
                </p>
                <button
                  onClick={() =>
                    document
                      .getElementById("news-grid")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl group">
                  <span>
                    {locale === "th" ? "ดูข่าวสารทั้งหมด" : "View All News"}
                  </span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50" id="news-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder={
                    locale === "th" ? "ค้นหาข่าวสาร..." : "Search news..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              locale={locale}
            />
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {locale === "th" ? "ข่าวสารล่าสุด" : "Latest News"}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              {locale === "th"
                ? "อัพเดทข่าวสารและความเคลื่อนไหวของบริษัทอย่างต่อเนื่อง"
                : "Stay updated with our latest news and company activities"}
            </p>
          </div>

          {/* Loading state for news grid */}
          {loading ? (
            <NewsGridSkeleton />
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map((article, index) => {
                  // Find category name for display
                  const category = categories.find(
                    (cat) => cat.id === article.cat_id
                  );
                  const categoryName = category
                    ? getBilingualCategory(category, locale)
                    : "";

                  return (
                    <NewsCard
                      key={article.id}
                      news={article}
                      locale={locale}
                      index={index}
                      category={categoryName}
                    />
                  );
                })}
              </div>

              {/* Empty state */}
              {filteredNews.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-500">
                    {locale === "th"
                      ? "ไม่พบข่าวสารที่ตรงกับการค้นหา"
                      : "No news found matching your search"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Subscription - Using primary color and luxury buttons */}
      <section
        className="section-minimal"
        style={{ background: "var(--primary-blue)" }}
        id="newsletter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
            สมัครรับข่าวสาร
          </h2>

          {/* Enhanced Elegant Line with Glow */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></div>
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"></div>
          </div>

          <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            รับข่าวสารและอัพเดทล่าสุดจากเราก่อนใคร
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
            <input
              type="email"
              placeholder="กรอกอีเมลของคุณ"
              className="flex-1 px-6 py-3 border-0 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 backdrop-blur-sm text-white placeholder-white/70"
            />
            <div className="luxury-hero-btn-container max-w-xs">
              <button className="luxury-hero-btn luxury-hero-btn-primary group">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="font-semibold tracking-wide">
                    สมัครรับข่าวสาร
                  </span>
                </span>
                <div className="luxury-btn-shimmer"></div>
                <div className="luxury-btn-glow"></div>
              </button>
            </div>
          </div>

          <p className="text-sm text-white/70 leading-relaxed">
            เราจะไม่แชร์อีเมลของคุณกับบุคคลที่สาม และคุณสามารถยกเลิกได้ตลอดเวลา
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
