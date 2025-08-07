"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import MinimalButton from "@/components/ui/MinimalButton";
import { Badge } from "@heroui/react";
import { Card, CardBody } from "@heroui/react";
import { useNewsStore, News } from "@/store/zustand/newsStore";
import { getBilingualTitle, getBilingualExcerpt } from "@/utils/bilingual";
import QuillDisplay from "@/components/share/QuillDisplay";
import ImageSkeleton from "@/components/ui/ImageSkeleton";

export default function NewsDetailPage() {
  const locale = useLocale();
  const params = useParams();
  const slug = params.slug as string;
  const { fetchNewsDetail, newsDetail, loading, error } = useNewsStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Fetch news detail on component mount
  useEffect(() => {
    const loadNewsDetail = async () => {
      setIsInitialLoading(true);
      console.log("Loading news detail...>>>");
      try {
        console.log("Effect I");
        await fetchNewsDetail(slug);
      } catch (error) {
        console.log("Effect xI");
        console.error("Error loading news detail:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    if (slug) {
      loadNewsDetail();
    }
  }, [slug, fetchNewsDetail]);

  // Helper functions for bilingual content
  const getTitle = (news: News) => getBilingualTitle(news, locale);
  const getExcerpt = (news: News) => getBilingualExcerpt(news, locale);

  // Calculate read time
  const calculateReadTime = (content: string | object | null | undefined) => {
    if (!content) return locale === "th" ? "5 นาที" : "5 min";

    let text = "";
    if (typeof content === "string") {
      text = content;
    } else if (content && typeof content === "object" && "ops" in content) {
      // Quill Delta format
      const delta = content as { ops: Array<{ insert?: string }> };
      text = delta.ops
        .map((op) => (typeof op.insert === "string" ? op.insert : ""))
        .join("");
    }

    const wordsPerMinute = locale === "th" ? 200 : 250;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return locale === "th" ? `${minutes} นาที` : `${minutes} min`;
  };

  // Share functionality
  const handleShare = () => {
    if (navigator.share && newsDetail) {
      navigator.share({
        title: getTitle(newsDetail),
        text: getExcerpt(newsDetail),
        url: window.location.href,
      });
    }
  };

  // Loading state
  if (isInitialLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            {locale === "th" ? "กำลังโหลด..." : "Loading..."}
          </h2>
          <p className="text-slate-600">
            {locale === "th"
              ? "กำลังโหลดข้อมูลข่าวสาร..."
              : "Loading news article..."}
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            {locale === "th" ? "เกิดข้อผิดพลาด" : "Error"}
          </h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <Link
            href={`/${locale}/news-events`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft className="w-4 h-4" />
            {locale === "th" ? "กลับไปหน้าข่าวสาร" : "Back to News"}
          </Link>
        </div>
      </div>
    );
  }

  // Not found state
  if (!newsDetail) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-slate-400 text-6xl mb-4">📰</div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            {locale === "th" ? "ไม่พบข่าวสาร" : "News Not Found"}
          </h2>
          <p className="text-slate-600 mb-4">
            {locale === "th"
              ? "ไม่พบข่าวสารที่คุณกำลังมองหา"
              : "The news article you're looking for doesn't exist."}
          </p>
          <Link
            href={`/${locale}/news-events`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft className="w-4 h-4" />
            {locale === "th" ? "กลับไปหน้าข่าวสาร" : "Back to News"}
          </Link>
        </div>
      </div>
    );
  }

  const title = getTitle(newsDetail);
  const excerpt = getExcerpt(newsDetail);
  const body = locale === "th" ? newsDetail.body_th : newsDetail.body_en;
  const readTime = calculateReadTime(body);
  const publishDate = newsDetail.publish_at || newsDetail.created_at;

  return (
    <MainLayout>
      {/* Hero Section with Content Overlay */}
      <section className="relative bg-slate-50">
        {/* Background Image */}
        <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
          {isInitialLoading || !newsDetail.thumbnail ? (
            <ImageSkeleton
              width="100%"
              height="100%"
              rounded="none"
              animation="shimmer"
              showIcon={false}
              className="absolute inset-0"
            />
          ) : (
            <>
              <Image
                src={newsDetail.thumbnail}
                alt={title}
                fill
                className={`object-cover transition-opacity duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <ImageSkeleton
                  width="100%"
                  height="100%"
                  rounded="none"
                  animation="pulse"
                  showIcon={false}
                  className="absolute inset-0"
                />
              )}
            </>
          )}
          {/* Enhanced Gradient Overlay for Better Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/10 z-10" />
        </div>

        {/* Content Overlay - Positioned Absolutely */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between">
          {/* Top Section - Breadcrumb */}
          <div className="pt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>
          </div>

          {/* Bottom Section - Main Content */}
          <div className="pb-12 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="">
                {/* Category Badge */}
                {(newsDetail as any).categories && (
                  <div className="mb-6">
                    <Badge
                      color="primary"
                      variant="flat"
                      className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2">
                      {locale === "th"
                        ? (newsDetail as any).categories.name_th
                        : (newsDetail as any).categories.name_en}
                    </Badge>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-6 leading-tight drop-shadow-sm">
                  {title}
                </h1>

                {/* Excerpt */}
                <p className="text-lg md:text-xl text-gray-900 mb-8 leading-relaxed max-w-3xl drop-shadow-sm">
                  {excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 text-white/90 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {publishDate
                        ? new Date(publishDate).toLocaleDateString(
                            locale === "th" ? "th-TH" : "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="">
            {/* Article Content */}
            <Card className="mb-16 shadow-lg">
              <CardBody className="p-8 md:p-12 lg:p-16">
                {/* Tags */}
                {(newsDetail as any).tags &&
                  (newsDetail as any).tags.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-8">
                      {(newsDetail as any).tags.map((tag: any) => (
                        <Badge
                          key={tag.id}
                          color="secondary"
                          variant="flat"
                          className="text-sm px-3 py-1">
                          {locale === "th" ? tag.name_th : tag.name_en}
                        </Badge>
                      ))}
                    </div>
                  )}

                {/* Article Body */}
                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed">
                  {body ? (
                    <QuillDisplay
                      content={
                        typeof body === "string" ? JSON.parse(body) : body
                      }
                    />
                  ) : null}
                </div>

                {/* Share Actions */}
                <div className="flex items-center gap-4 mt-16 pt-8 border-t border-gray-200">
                  <span className="text-gray-600 font-medium">
                    {locale === "th" ? "แชร์บทความ:" : "Share article:"}
                  </span>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/20 transition-colors">
                    <Share2 className="w-4 h-4" />
                    {locale === "th" ? "แชร์" : "Share"}
                  </button>
                </div>
              </CardBody>
            </Card>

            {/* Back to News Button */}
            <div className="text-center">
              <Link href={`/${locale}/news-events`}>
                <MinimalButton className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/90 text-white px-8 py-4 text-lg">
                  <ArrowLeft className="w-5 h-5 mr-3" />
                  {locale === "th" ? "กลับไปหน้าข่าวสาร" : "Back to News"}
                </MinimalButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
