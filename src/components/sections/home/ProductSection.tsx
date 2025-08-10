"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/share/ProductCard";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ProductType } from "@/store/zustand/productStore";

// const products: Product[] = [
//   {
//     name: "PERMATANK ถังน้ำมันใต้ดิน",
//     description: "ถังน้ำมันใต้ดินแบบผนัง 2 ชั้น ผลิตตามมาตรฐาน UL 58 & UL 1746",
//     image:
//       "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     name: "ท่อน้ำมันผนัง 2 ชั้น",
//     description:
//       "ท่อน้ำมันใต้ดินยี่ห้อ NUPI รุ่น Smartflex และ Ecoflex จากอิตาลี",
//     image:
//       "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     name: "ระบบ ATG อัตโนมัติ",
//     description:
//       "ระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน สำหรับการตรวจสอบแบบ Real-Time",
//     image:
//       "https://images.unsplash.com/photo-1565043666747-69f6646db940?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     name: "อุปกรณ์สถานีบริการ",
//     description: "อุปกรณ์และเครื่องมือต่างๆ สำหรับสถานีบริการน้ำมันครบวงจร",
//     image:
//       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     name: "ระบบป้องกันการรั่วไหล",
//     description: "ระบบตรวจจับและป้องกันการรั่วไหลของน้ำมันด้วยเทคโนโลยีทันสมัย",
//     image:
//       "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     name: "บริการติดตั้งและบำรุงรักษา",
//     description: "บริการติดตั้ง ตรวจสอบ และบำรุงรักษาระบบสถานีบริการน้ำมัน",
//     image:
//       "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
// ];

interface ProductSectionProps {
  products: ProductType[];
  loading?: boolean;
  locale?: string;
}

export default function ProductSection({
  products,
  loading = false,
  locale: propLocale,
}: ProductSectionProps) {
  const hookLocale = useLocale();
  const locale = propLocale || hookLocale;
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const t = useTranslations();

  // Determine how many products to show
  const displayedProducts = showAllProducts ? products : products.slice(0, 6);

  // Sample products data - in real app this would come from props or API

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const handleProductClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Loading state
  if (loading) {
    return (
      <section className="section-minimal bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t("common.loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-minimal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          {/* Section Label - Matching ServicesSection style */}
          {/* <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
              {t("home.products.sectionLabel")}
            </span>
            <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
          </div> */}

          {/* Main Heading - Strong & Minimal Style */}
          <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
            {t("home.products.title")}
          </h2>

          {/* Enhanced Elegant Line with Glow */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
          </div>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("home.products.description")}
          </p>
        </div>

        {/* Products Grid - Display products based on showAllProducts state */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {displayedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              handleProductClick={() => handleProductClick(index)}
              locale={locale}
            />
          ))}
        </div>

        <div className="flex flex-col md:flex-row align-middle justify-center gap-6 mt-12">
          {/* Expand/Collapse Button - Only show if there are more than 6 products */}
          {products.length > 6 && (
            <div className="flex justify-center items-center">
              <button
                className="luxury-hero-btn luxury-hero-btn-primary group"
                onClick={() => setShowAllProducts(!showAllProducts)}>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="font-semibold tracking-wide">
                    {showAllProducts
                      ? t("home.products.showLess")
                      : t("home.products.viewAll")}
                  </span>
                  <ArrowRight
                    className={`w-5 h-5 transition-all duration-500 group-hover:translate-x-1 ${showAllProducts ? "rotate-90" : ""
                      }`}
                  />
                </span>
                <div className="luxury-btn-shimmer"></div>
                <div className="luxury-btn-glow"></div>
              </button>
            </div>
          )}
          {/* Navigate to Products Page Button */}
          <div className="flex justify-center items-center">
            <button
              className="luxury-hero-btn luxury-hero-btn-secondary"
              onClick={() => router.push(`/${locale}/products-services`)}>
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="font-semibold tracking-wide text-black">
                  {t("home.products.viewProductsPage")}
                </span>
                <ArrowRight className="w-5 h-5 text-black transition-transform duration-500 group-hover:translate-x-1" />
              </span>
              <div className="luxury-btn-border"></div>
              <div className="luxury-btn-glow-secondary"></div>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
