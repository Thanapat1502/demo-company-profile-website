"use client";

import { Calendar, User, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { News } from "@/store/zustand/newsStore";
import { getBilingualTitle, getBilingualExcerpt } from "@/utils/bilingual";

interface NewsCardProps {
  news: News;
  locale: string;
  index?: number;
  category?: string;
}

export default function NewsCard({ news, locale, index = 0, category }: NewsCardProps) {
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

  // Calculate read time (rough estimate)
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = locale === "th" ? 200 : 250;
    const wordCount = content.split(" ").length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return locale === "th" ? `${readTime} นาที` : `${readTime} min`;
  };

  const displayDate = news.publish_at || news.updated_at || news.created_at || "";
  const readTime = calculateReadTime(excerpt);

  return (
    <Link
      href={`/${locale}/news-events/${news.id}`}
      className="group block"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "scaleIn 0.6s ease-out forwards",
      }}
    >
      <article className="relative bg-white/70 backdrop-blur-sm border border-gray-100/50 hover:border-gray-200/70 transition-all duration-600 ease-out hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-2 overflow-hidden group-hover:bg-white/90 rounded-lg">
        {/* Minimal top accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-600 origin-left"></div>

        {/* Luxury background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/40 via-white/60 to-blue-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-600"></div>

        <div className="relative p-6">
          {/* Minimal header with category and number */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-xs text-gray-500 font-light tracking-widest uppercase">
              {category || (locale === "th" ? "ข่าวสาร" : "News")}
            </div>
            <div className="w-6 h-6 bg-gray-100/80 flex items-center justify-center text-xs font-light text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-500">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Elegant image container */}
          <div className="relative h-40 mb-6 overflow-hidden bg-gray-100/50 rounded-lg">
            <Image
              src={news.thumbnail || "/images/placeholder-news.jpg"}
              alt={title}
              fill
              className="object-cover transition-all duration-800 ease-out group-hover:scale-110 group-hover:brightness-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600"></div>
          </div>

          {/* Refined typography */}
          <div className="space-y-4">
            <h3 className="text-lg font-light text-gray-900 leading-snug tracking-wide line-clamp-2 group-hover:text-gray-800 transition-colors duration-500">
              {title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 font-light">
              {excerpt}
            </p>

            {/* Minimal metadata */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100/80 group-hover:border-gray-200/80 transition-colors duration-500">
              <div className="flex items-center space-x-4 text-xs text-gray-500 font-light">
                <div className="flex items-center">
                  <User size={12} className="mr-1.5" />
                  {locale === "th" ? "ผู้ดูแล" : "Admin"}
                </div>
                <div className="w-px h-3 bg-gray-300"></div>
                <div className="flex items-center">
                  <Calendar size={12} className="mr-1.5" />
                  {formatDate(displayDate)}
                </div>
              </div>

              {/* Elegant read indicator */}
              <div className="flex items-center text-xs text-gray-500 font-light">
                <Clock size={12} className="mr-1.5" />
                {readTime}
              </div>
            </div>

            {/* Minimal read more */}
            <div className="flex items-center justify-end pt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
              <div className="flex items-center text-blue-600 text-sm font-light">
                <span className="mr-2 tracking-wide">
                  {locale === "th" ? "อ่านต่อ" : "Read more"}
                </span>
                <div className="w-4 h-px bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle border effect */}
        <div className="absolute inset-0 border border-transparent group-hover:border-blue-100/40 transition-all duration-600 pointer-events-none"></div>
      </article>
    </Link>
  );
}
