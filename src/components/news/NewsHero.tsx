"use client";

import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { News } from "@/store/zustand/newsStore";
import { getBilingualTitle, getBilingualExcerpt } from "@/utils/bilingual";

interface NewsHeroProps {
  news: News[];
  locale: string;
}

export default function NewsHero({ news, locale }: NewsHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Handle empty news array
  if (!news || news.length === 0) {
    return null;
  }

  const currentNews = news[currentIndex];
  const title = getBilingualTitle(currentNews, locale);
  const excerpt = getBilingualExcerpt(currentNews, locale);

  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return locale === "th" ? "ไม่ระบุวันที่" : "Date not specified";
    }
  };

  const displayDate =
    currentNews.publish_at ||
    currentNews.updated_at ||
    currentNews.created_at ||
    "";

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || news.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, news.length]);

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 mb-8">
      {/* Background Image with Transition */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          {news.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}>
              <Image
                src={
                  item.thumbnail || "/images/hero-sections/hero-banner-1.jpg"
                }
                alt={getBilingualTitle(item, locale)}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Navigation Controls */}
      {news.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-300 backdrop-blur-sm group"
            aria-label={locale === "th" ? "ข่าวก่อนหน้า" : "Previous news"}>
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-300 backdrop-blur-sm group"
            aria-label={locale === "th" ? "ข่าวถัดไป" : "Next news"}>
            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Auto-play Toggle */}
          <button
            onClick={toggleAutoPlay}
            className="absolute top-4 right-4 z-20 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label={
              locale === "th"
                ? isAutoPlaying
                  ? "หยุดเล่นอัตโนมัติ"
                  : "เล่นอัตโนมัติ"
                : isAutoPlaying
                ? "Pause autoplay"
                : "Start autoplay"
            }>
            {isAutoPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            {/* Category Badge with Counter */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              {locale === "th" ? "ข่าวเด่น" : "Featured News"}
              {news.length > 1 && (
                <span className="ml-2 px-2 py-1 bg-blue-400/20 rounded-full text-xs">
                  {currentIndex + 1}/{news.length}
                </span>
              )}
            </div>

            {/* Title with Animation */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight transition-all duration-500">
              {title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed max-w-3xl transition-all duration-500">
              {excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDate(displayDate)}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}/news-events/${currentNews.id}`}
                className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl group">
                <span>
                  {locale === "th" ? "อ่านข่าวเต็ม" : "Read Full Article"}
                </span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() =>
                  document
                    .getElementById("news-grid")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30">
                <span>
                  {locale === "th" ? "ดูข่าวสารทั้งหมด" : "View All News"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      {news.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center gap-2">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white scale-110"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`${
                  locale === "th" ? "ไปยังข่าวที่" : "Go to news"
                } ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Scroll Indicator - Only show when no carousel indicators */}
      {news.length <= 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      )}
    </section>
  );
}
