"use client";

import { Button, Card, CardBody, Image, Chip, Input } from "@heroui/react";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/ui/HeroSection";
import Section from "@/components/ui/Section";
import ContentCard from "@/components/ui/ContentCard";
import ParallaxSlider from "@/components/ui/ParallaxSlider";

export default function NewsEventsPage() {
  const t = useTranslations();

  const featuredNews = [
    {
      id: "1",
      title: "ผดุงศิลป์กรุ๊ป คว้าโครงการก่อสร้างสถานีบริการน้ำมันใหญ่",
      description:
        "บริษัทได้รับเลือกให้เป็นผู้รับเหมาหลักในโครงการก่อสร้างสถานีบริการน้ำมันขนาดใหญ่ มูลค่ากว่า 500 ล้านบาท",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "ข่าวบริษัท",
      date: "15 มกราคม 2024",
      href: "/news-events/padungsilpa-wins-major-project",
    },
    {
      id: "2",
      title: "เปิดตัวถังน้ำมัน PERMATANK® รุ่นใหม่",
      description:
        "นวัตกรรมถังน้ำมันใต้ดินผนัง 2 ชั้น ที่ปลอดภัยและทนทานยิ่งขึ้น พร้อมระบบตรวจจับการรั่วไหลล่าสุด",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "ผลิตภัณฑ์",
      date: "10 มกราคม 2024",
      href: "/news-events/new-permatank-launch",
    },
    {
      id: "3",
      title: "มาตรฐานความปลอดภัยใหม่ในการก่อสร้าง",
      description:
        "บริษัทนำมาตรฐานความปลอดภัยระดับสากลมาใช้ในทุกโครงการ เพื่อความปลอดภัยของพนักงานและสิ่งแวดล้อม",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "ความปลอดภัย",
      date: "8 มกราคม 2024",
      href: "/news-events/new-safety-standards",
    },
  ];

  const newsArticles = [
    {
      title: t("news.articles.safety.title"),
      excerpt: t("news.articles.safety.excerpt"),
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      category: t("news.categories.safety"),
      date: "2024-01-08",
      author: "Safety Team",
      slug: "new-safety-standards-implementation",
    },
    {
      title: t("news.articles.green.title"),
      excerpt: t("news.articles.green.excerpt"),
      image:
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      category: t("news.categories.sustainability"),
      date: "2024-01-01",
      author: "Engineering Team",
      slug: "green-technology-initiative",
    },
    {
      title: t("news.articles.expansion.title"),
      excerpt: t("news.articles.expansion.excerpt"),
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: t("news.categories.business"),
      date: "2023-12-20",
      author: "Management Team",
      slug: "regional-expansion-announcement",
    },
    {
      title: t("news.articles.technology.title"),
      excerpt: t("news.articles.technology.excerpt"),
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: t("news.categories.technology"),
      date: "2023-12-15",
      author: "Tech Team",
      slug: "smart-station-technology",
    },
    {
      title: t("news.articles.partnership.title"),
      excerpt: t("news.articles.partnership.excerpt"),
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80",
      category: t("news.categories.partnership"),
      date: "2023-12-10",
      author: "Business Development",
      slug: "strategic-partnership-announcement",
    },
    {
      title: t("news.articles.training.title"),
      excerpt: t("news.articles.training.excerpt"),
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: t("news.categories.training"),
      date: "2023-12-05",
      author: "HR Team",
      slug: "employee-training-program",
    },
  ];

  const categories = [
    { key: "all", label: t("news.categories.all") },
    { key: "company", label: t("news.categories.company") },
    { key: "safety", label: t("news.categories.safety") },
    { key: "sustainability", label: t("news.categories.sustainability") },
    { key: "technology", label: t("news.categories.technology") },
    { key: "business", label: t("news.categories.business") },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection
        title={t("news.hero.title")}
        subtitle={t("news.hero.subtitle")}
        description={t("news.hero.description")}
        backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        primaryAction={{
          label: t("news.hero.subscribe"),
          href: "#newsletter",
        }}
        secondaryAction={{
          label: t("common.contactUs"),
          href: "/contact-us",
        }}
        height="lg"
      />

      {/* Featured News */}
      <Section background="white" padding="xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("news.featured.sectionTitle")}
          </h2>
        </div>

        <ParallaxSlider
          slides={featuredNews}
          autoSlideDelay={10000}
          height="h-96"
          showControls={true}
          showIndicators={true}
        />
      </Section>

      {/* Search and Filter */}
      <Section background="gray" padding="md">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <Input
              placeholder={t("news.search.placeholder")}
              startContent={<Search size={20} />}
              variant="bordered"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={category.key === "all" ? "solid" : "bordered"}
                color={category.key === "all" ? "primary" : "default"}
                size="sm">
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </Section>

      {/* News Grid */}
      <Section background="white" padding="xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("news.latest.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("news.latest.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <ContentCard
              key={index}
              title={article.title}
              description={article.excerpt}
              image={article.image}
              imageAlt={article.title}
              date={formatDate(article.date)}
              author={article.author}
              category={article.category}
              href={`/news-events/${article.slug}`}
              className="h-full"
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="bordered"
            size="lg"
            endContent={<ArrowRight size={20} />}>
            {t("news.loadMore")}
          </Button>
        </div>
      </Section>

      {/* Newsletter Subscription */}
      <Section background="gradient" padding="xl" id="newsletter">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {t("news.newsletter.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t("news.newsletter.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              placeholder={t("news.newsletter.emailPlaceholder")}
              type="email"
              variant="bordered"
              className="flex-1"
            />
            <Button color="primary" size="lg">
              {t("news.newsletter.subscribe")}
            </Button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            {t("news.newsletter.privacy")}
          </p>
        </div>
      </Section>
    </MainLayout>
  );
}
