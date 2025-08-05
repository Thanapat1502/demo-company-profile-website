"use client";

import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { News } from "@/store/zustand/newsStore";
import { getBilingualTitle, getBilingualExcerpt } from "@/utils/bilingual";

interface NewsHeroProps {
  news: News;
  locale: string;
}

export default function NewsHero({ news, locale }: NewsHeroProps) {
  const title = getBilingualTitle(news, locale);
  const excerpt = getBilingualExcerpt(news, locale);
  
  // Format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(
        locale === "th" ? "th-TH" : "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
    } catch {
      return locale === "th" ? "ไม่ระบุวันที่" : "Date not specified";
    }
  };

  const displayDate = news.publish_at || news.updated_at || news.created_at || "";

  return (
    <section className="relative h-[70vh] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={news.thumbnail || "/images/hero-sections/hero-banner-1.jpg"}
          alt={title}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              {locale === "th" ? "ข่าวเด่น" : "Featured News"}
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
              {excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(displayDate)}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/news-events/${news.id}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <span>{locale === "th" ? "อ่านข่าวเต็ม" : "Read Full Article"}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() =>
                  document
                    .getElementById("news-grid")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30"
              >
                <span>{locale === "th" ? "ดูข่าวสารทั้งหมด" : "View All News"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
