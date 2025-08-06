"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
} from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import MinimalButton from "@/components/ui/MinimalButton";
import { Badge } from "@heroui/react";
import { Card, CardBody } from "@heroui/react";
import { useNewsStore, News } from "@/store/zustand/newsStore";
import { getBilingualTitle, getBilingualExcerpt } from "@/utils/bilingual";

export default function NewsDetailPage() {
  const locale = useLocale();
  const params = useParams();
  const slug = params.slug as string;
  const { fetchNewsDetail, newsDetail, loading, error } = useNewsStore();
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
  const getBody = (news: News) => {
    return locale === "th" ? news.body_th : news.body_en;
  };

  // Calculate read time
  const calculateReadTime = (content: any) => {
    if (!content) return "5 นาที";

    let text = "";
    if (typeof content === "string") {
      text = content;
    } else if (content.ops) {
      // Quill Delta format
      text = content.ops
        .map((op: any) => (typeof op.insert === "string" ? op.insert : ""))
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
  const body = getBody(newsDetail);
  const readTime = calculateReadTime(body);
  const publishDate = newsDetail.publish_at || newsDetail.created_at;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40 z-10" />
        <div className="relative h-[60vh] min-h-[500px]">
          <Image
            src={
              newsDetail.thumbnail || "/images/hero-sections/hero-banner-1.jpg"
            }
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="mb-6">
                <Link
                  href={`/${locale}/news-events`}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  {locale === "th" ? "กลับไปหน้าข่าวสาร" : "Back to News"}
                </Link>
              </nav>

              {/* Category Badge */}
              {(newsDetail as any).categories && (
                <Badge
                  color="primary"
                  variant="flat"
                  className="mb-4 bg-blue-500/20 text-blue-100 border-blue-400/30">
                  {locale === "th"
                    ? (newsDetail as any).categories.name_th
                    : (newsDetail as any).categories.name_en}
                </Badge>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
                {excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
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
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>
                    {locale === "th" ? "ผดุงศิลป์กรุ๊ป" : "Padungsilp Group"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Content */}
            <Card className="mb-12">
              <CardBody className="p-8 md:p-12">
                {/* Tags */}
                {(newsDetail as any).tags &&
                  (newsDetail as any).tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(newsDetail as any).tags.map((tag: any) => (
                        <Badge
                          key={tag.id}
                          color="secondary"
                          variant="flat"
                          className="text-sm">
                          {locale === "th" ? tag.name_th : tag.name_en}
                        </Badge>
                      ))}
                    </div>
                  )}

                {/* Article Body */}
                <div className="prose prose-lg max-w-none">
                  {body && typeof body === "object" && body.ops ? (
                    // Render Quill Delta format
                    <div>
                      {body.ops.map((op: any, index: number) => {
                        if (typeof op.insert === "string") {
                          return (
                            <p key={index} className="mb-4">
                              {op.insert}
                            </p>
                          );
                        } else if (op.insert && op.insert.image) {
                          return (
                            <div key={index} className="my-8">
                              <Image
                                src={op.insert.image}
                                alt="Article image"
                                width={800}
                                height={400}
                                className="rounded-lg shadow-md w-full h-auto"
                              />
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ) : (
                    // Render HTML string
                    <div
                      dangerouslySetInnerHTML={{
                        __html: body || excerpt,
                      }}
                    />
                  )}
                </div>

                {/* Share Actions */}
                <div className="flex items-center gap-4 mt-12 pt-8 border-t border-slate-200">
                  <span className="text-slate-600 font-medium">
                    {locale === "th" ? "แชร์บทความ:" : "Share article:"}
                  </span>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                    <Share2 className="w-4 h-4" />
                    {locale === "th" ? "แชร์" : "Share"}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                    <Bookmark className="w-4 h-4" />
                    {locale === "th" ? "บันทึก" : "Save"}
                  </button>
                </div>
              </CardBody>
            </Card>

            {/* Back to News Button */}
            <div className="text-center">
              <Link href={`/${locale}/news-events`}>
                <MinimalButton className="bg-blue-600 hover:bg-blue-700 text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {locale === "th" ? "กลับไปหน้าข่าวสาร" : "Back to News"}
                </MinimalButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
