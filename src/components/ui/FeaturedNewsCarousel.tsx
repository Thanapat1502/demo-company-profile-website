"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, Clock, User } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  author: string;
  slug: string;
  readTime: string;
}

interface FeaturedNewsCarouselProps {
  news: NewsItem[];
  autoSlideInterval?: number;
  locale: string;
  className?: string;
}

export default function FeaturedNewsCarousel({
  news,
  autoSlideInterval = 5000,
  locale,
  className = "",
}: FeaturedNewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered && news.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % news.length);
      }, autoSlideInterval);
      
      return () => clearInterval(timer);
    }
  }, [isHovered, news.length, autoSlideInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  if (!news || news.length === 0) {
    return null;
  }

  const currentNews = news[currentIndex];

  return (
    <section className={`section-minimal bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
              ข่าวเด่น
            </span>
            <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
          </div>

          <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
            ข่าวสารและกิจกรรม
          </h2>
          
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
          </div>
        </div>

        {/* Featured News Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <div className="relative">
              <div className="relative h-96 overflow-hidden shadow-lg">
                <Image
                  src={currentNews.image}
                  alt={currentNews.title}
                  fill
                  className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="bg-[var(--primary-blue)] text-white px-4 py-2 text-sm font-semibold tracking-wide">
                    {currentNews.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl lg:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 tracking-[0.02em] !leading-normal drop-shadow-sm">
                  {currentNews.title}
                </h3>

                <div className="relative flex items-start justify-start mb-4">
                  <div className="w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
                  <div className="absolute w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {currentNews.description}
                </p>

                {/* Meta Information */}
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{currentNews.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{currentNews.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{currentNews.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Read More Button */}
              <div className="pt-4">
                <div className="luxury-hero-btn-container max-w-xs">
                  <Link
                    href={`/${locale}/news-events/${currentNews.slug}`}
                    className="luxury-hero-btn luxury-hero-btn-primary group block text-center">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <span className="font-semibold tracking-wide">
                        อ่านต่อ
                      </span>
                      <ChevronRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                    <div className="luxury-btn-shimmer"></div>
                    <div className="luxury-btn-glow"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {news.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300 group z-10"
                aria-label="Previous news"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300 group z-10"
                aria-label="Next news"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}

          {/* Indicators */}
          {news.length > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              {news.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[var(--primary-blue)] scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to news ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
