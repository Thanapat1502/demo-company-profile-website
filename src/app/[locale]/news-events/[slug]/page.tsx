import { Metadata } from "next";
import { notFound } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import QuillDisplay from "@/components/share/QuillDisplay";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ServerBadge from "@/components/ui/ServerBadge";
import { ServerCard, ServerCardBody } from "@/components/ui/ServerCard";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";

import ClientShareButton from "@/components/news/ClientShareButton";

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

interface Category {
  id: string;
  cat_th: string;
  cat_en: string;
}

interface NewsDetail {
  id: string;
  title_th: string;
  title_en: string;
  slug_th: string;
  slug_en: string;
  excerpt_th: string;
  excerpt_en: string;
  body_th: any;
  body_en: any;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  categories: Category;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  try {
    // Decode the slug to handle Thai characters properly
    const decodedSlug = decodeURIComponent(slug);

    // Call server-side API instead of direct Supabase call
    const encodedSlug = encodeURIComponent(decodedSlug);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/news/slug/${encodedSlug}?locale=${locale}`, {
      cache: 'force-cache',
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      return {
        title: "News Article Not Found | Padungsilpa Group",
        description: "The requested news article could not be found.",
      };
    }

    const { data: news } = await response.json();

    if (!news) {
      return {
        title: "News Article Not Found | Padungsilpa Group",
        description: "The requested news article could not be found.",
      };
    }

    const title = (locale === "en" ? news.title_en : news.title_th) as string;
    const description = (locale === "en" ? news.excerpt_en : news.excerpt_th) as string;
    const publishedTime = (news.published_at || news.created_at) as string;
    const modifiedTime = news.updated_at as string;

    // Generate alternate URLs for different locales
    const alternateUrls = {
      th: news.slug_th ? `/th/news-events/${news.slug_th}` : null,
      en: news.slug_en ? `/en/news-events/${news.slug_en}` : null,
    };

    return {
      title: `${title} | Padungsilpa Group`,
      description: description || `Read more about ${title}`,
      keywords: [
        title,
        "Padungsilpa Group",
        "Construction",
        "Engineering",
        "News",
        locale === "th" ? "ข่าวสาร" : "News",
        locale === "th" ? "ก่อสร้าง" : "Construction",
      ].filter(Boolean).join(", "),
      authors: [{ name: "Padungsilpa Group" }],
      publisher: "Padungsilpa Group",
      openGraph: {
        title,
        description: description || `Read more about ${title}`,
        images: news.thumbnail ? [
          {
            url: news.thumbnail as string,
            width: 1200,
            height: 630,
            alt: title,
          }
        ] : [],
        type: "article",
        publishedTime,
        modifiedTime,
        authors: ["Padungsilpa Group"],
        section: "News",
        locale: locale,
        alternateLocale: locale === "th" ? "en" : "th",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: description || `Read more about ${title}`,
        images: news.thumbnail ? [news.thumbnail as string] : [],
        creator: "@PadungsilpaGroup",
        site: "@PadungsilpaGroup",
      },
      alternates: {
        canonical: `https://padungsilpa.group/${locale}/news-events/${slug}`,
        languages: {
          ...(alternateUrls.th && { "th-TH": `https://padungsilpa.group${alternateUrls.th}` }),
          ...(alternateUrls.en && { "en-US": `https://padungsilpa.group${alternateUrls.en}` }),
          "x-default": `https://padungsilpa.group/${locale}/news-events/${slug}`,
        },
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "News Article | Padungsilpa Group",
      description: "Read the latest news and updates from Padungsilpa Group",
    };
  }
}

// Generate static params for static generation
export async function generateStaticParams() {
  try {
    // Call server-side API instead of direct Supabase call
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/news`, {
      cache: 'force-cache',
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error("Error fetching news for static params:", response.status);
      return [];
    }

    const { data: news } = await response.json();

    if (!news || !Array.isArray(news)) return [];

    const params = [];

    // Generate params for both Thai and English slugs
    for (const article of news) {
      if (article.slug_th) {
        // Don't pre-encode - Next.js will handle URL encoding automatically
        params.push({ locale: "th", slug: article.slug_th });
      }
      if (article.slug_en) {
        params.push({ locale: "en", slug: article.slug_en });
      }
    }

    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  // Decode the slug to handle Thai characters properly
  const decodedSlug = decodeURIComponent(slug);

  // Call server-side API instead of direct Supabase call
  const encodedSlug = encodeURIComponent(decodedSlug);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/news/slug/${encodedSlug}?locale=${locale}`, {
      cache: 'force-cache',
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error("News article API error:", { slug, locale, status: response.status });
      notFound();
    }

    const { data: newsDetail, category } = await response.json();

    if (!newsDetail) {
      console.error("News article not found:", { slug, locale });
      notFound();
    }

    // Helper functions for bilingual content
    const getTitle = () => locale === "en" ? newsDetail.title_en : newsDetail.title_th;
    const getExcerpt = () => locale === "en" ? newsDetail.excerpt_en : newsDetail.excerpt_th;
    const getBody = () => locale === "en" ? newsDetail.body_en : newsDetail.body_th;

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

    // Get content for display
    const title = getTitle() as string;
    const excerpt = getExcerpt() as string;
    const body = getBody();
    const readTime = calculateReadTime(body as string | object);
    const publishDate = (newsDetail.published_at || newsDetail.created_at) as string;

    // Generate JSON-LD structured data for SEO
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": title,
      "description": excerpt,
      "image": newsDetail.thumbnail ? [newsDetail.thumbnail] : [],
      "datePublished": publishDate,
      "dateModified": newsDetail.updated_at,
      "author": {
        "@type": "Organization",
        "name": "Padungsilpa Group",
        "url": "https://padungsilpa.group"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Padungsilpa Group",
        "logo": {
          "@type": "ImageObject",
          "url": "https://padungsilpa.group/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://padungsilpa.group/${locale}/news-events/${slug}`
      },
      "articleSection": category ? (locale === "th" ? (category as Category).cat_th : (category as Category).cat_en) : "News",
      "inLanguage": locale,
      "url": `https://padungsilpa.group/${locale}/news-events/${slug}`
    };

    // Generate breadcrumb structured data
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `https://padungsilpa.group/${locale}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": locale === "th" ? "ข่าวสาร" : "News & Events",
          "item": `https://padungsilpa.group/${locale}/news-events`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": title,
          "item": `https://padungsilpa.group/${locale}/news-events/${slug}`
        }
      ]
    };

    return (
      <MainLayout forceSolidNavBar>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {/* Hero Section with Content Overlay */}
        <section className="relative bg-slate-50">
          {/* Background Image */}


          {/* Content Overlay - Positioned Absolutely */}
          <div className="mt-[80px] pt-12 inset-0 z-20 flex flex-col justify-between">

            {/* Bottom Section - Main Content */}
            <div className="pb-12 ">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="">
                  {/* Category Badge */}
                  {category && (
                    <div className="mb-6">
                      <ServerBadge
                        color="primary"
                        variant="flat"
                        className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2">
                        {locale === "th"
                          ? (category as Category).cat_th
                          : (category as Category).cat_en}
                      </ServerBadge>
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 mb-6 ">
                    {title}
                  </h1>

                  {/* Excerpt */}
                  <p className="text-lg md:text-xl text-gray-900 mb-8 leading-relaxed ">
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
        <section className="pb-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="">
              {/* Article Content */}
              <ServerCard className="mb-16" shadow="lg">
                <ServerCardBody className="p-8">
                  {/* Tags section removed for now */}

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
                    <ClientShareButton
                      title={title}
                      excerpt={excerpt}
                      locale={locale}
                    />
                  </div>
                </ServerCardBody>
              </ServerCard>

              {/* Back to News Button */}
              <div className="text-center">
                <Link href={`/${locale}/news-events`}>
                  <PrimaryButton >
                    <ArrowLeft className="w-5 h-5 mr-3" />
                    {locale === "th" ? "กลับไปหน้าข่าวสาร" : "Back to News"}
                  </PrimaryButton>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching news article:", { slug, locale, error });
    notFound();
  }
}
