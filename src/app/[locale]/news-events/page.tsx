"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import MainLayout from "@/components/layout/MainLayout";
import { useNewsStore } from "@/store/zustand/newsStore";
import NewsHero from "@/components/news/NewsHero";
import NewsCard from "@/components/news/NewsCard";
import CategoryFilter from "@/components/news/CategoryFilter";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import HeroButtons from "@/components/ui/HeroButtons";
import LoadingOverlay, {
  NewsGridSkeleton,
} from "@/components/news/LoadingOverlay";
import { getBilingualCategory } from "@/utils/bilingual";

export default function NewsEventsPage() {
  const t = useTranslations();
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

  return (
    <MainLayout>
      {/* Hero Section with Highlighted News */}
      {heroNews ? (
        <NewsHero news={heroNews} locale={locale} />
      ) : (
        <DynamicHeroSection
          pageId="NEWS"
          title={t("news.hero.title")}
          subtitle={t("news.hero.subtitle")}
          description={t("news.hero.description")}
          fallbackImages={["/images/hero-sections/hero-banner-1.jpg"]}
          autoSlideDelay={6000}>
          <HeroButtons />
        </DynamicHeroSection>
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
                  placeholder={t("news.search.placeholder")}
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
              {t("news.latest.title")}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              {t("news.latest.description")}
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
                    {locale === "th" ? "ไม่พบข่าวสาร" : "No News Found"}
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
            {t("news.newsletter.title")}
          </h2>

          {/* Enhanced Elegant Line with Glow */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></div>
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"></div>
          </div>

          <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("news.newsletter.description")}
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
                    {t("news.newsletter.subscribe")}
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
