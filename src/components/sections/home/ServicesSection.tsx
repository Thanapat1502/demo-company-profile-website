"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ProductCard } from "@/components/share/ProductCard";
import { ServiceType } from "@/store/zustand/servicesStore";

interface ServicesSectionProps {
  services: ServiceType[];
  loading?: boolean;
  locale?: string;
}

export default function ServicesSection({
  services: products,
  loading = false,
  locale: propLocale,
}: ServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const t = useTranslations();
  const hookLocale = useLocale();
  const locale = propLocale || hookLocale;
  const router = useRouter();

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
      <section
        id="services"
        className="relative min-h-screen bg-white services-elegant-texture overflow-hidden services-section-overlap">
        <div className="relative z-10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">
                {locale === "th" ? "กำลังโหลดบริการ..." : "Loading services..."}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="services"
      className="relative min-h-screen bg-white services-elegant-texture overflow-hidden services-section-overlap "
      style={{
        transform: `translateY(${-scrollY * 0.3}px)`,
      }}>
      {/* Elegant texture background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${`#059669`}08 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, ${`#059669`}05 0%, transparent 50%)`,
            transition: "background-image 1s ease-in-out",
          }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header */}
          {/* Ultra Minimal Luxury Header */}
          <div className="text-center mb-4 relative">
            {/* Subtle Background Effects */}
            <div className="absolute inset-0 -top-8 -bottom-8 opacity-30">
              <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[var(--primary-blue)]/5 rounded-full blur-3xl"></div>
              <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-800/5 rounded-full blur-2xl"></div>
            </div>

            {/* Clean Typography Focus */}
            <div className="relative z-10">
              {/* Luxury Title with Gradient */}
              <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-0 tracking-[0.02em] !leading-normal drop-shadow-sm">
                {t("home.services.title")}
              </h2>

              {/* Enhanced Elegant Line with Glow */}
              <div className="relative flex items-center justify-center mb-4">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
                <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
              </div>

              {/* Refined Description with Subtle Shadow */}
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto tracking-wide drop-shadow-sm">
                {t("home.services.description")}
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="space-y-12">
            {/* Featured Products Grid - Desktop / Carousel - Mobile */}
            <div className="space-y-8">
              {/* Desktop Grid - Enhanced spacing and sizing */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    handleProductClick={() => handleProductClick(index)}
                    locale={locale}
                  />
                ))}
              </div>

              {/* Mobile Carousel */}
              <div className="hidden">
                <div className="relative">
                  {/* Carousel Container */}
                  <div className="overflow-hidden">
                    <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateX(-${activeIndex * 100} %)`,
                      }}>
                      {products.map((product, index) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          handleProductClick={() => handleProductClick(index)}
                          locale={locale}
                        />
                        // <div
                        //   key={product.id}
                        //   className="w-full flex-shrink-0 relative h-[500px] bg-gray-100">
                        //   {/* Product Image */}
                        //   <Image
                        //     src={product.image}
                        //     alt={product.title}
                        //     fill
                        //     className="object-cover"
                        //   />

                        //   {/* Gradient overlay */}
                        //   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                        //   {/* Product content overlay */}
                        //   <div className="absolute inset-0 flex flex-col justify-end p-6">
                        //     <div className="space-y-4">
                        //       {/* Product Title */}
                        //       <h3 className="text-2xl font-black text-white leading-tight">
                        //         {product.title}
                        //       </h3>

                        //       {/* Product Description */}
                        //       <p className="text-white/90 leading-relaxed text-base">
                        //         {product.description}
                        //       </p>

                        //       {/* Action Button */}
                        //       <div className="pt-2">
                        //         <button
                        //           className="luxury-hero-btn luxury-hero-btn-primary group"
                        //           onClick={() =>
                        //             router.push(`/${locale}/products-services`)
                        //           }>
                        //           <span className="relative z-10 flex items-center justify-center gap-3">
                        //             <span className="font-semibold tracking-wide">
                        //               {t("common.learnMore")}
                        //             </span>
                        //             <ExternalLink className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                        //           </span>
                        //           <div className="luxury-btn-shimmer"></div>
                        //           <div className="luxury-btn-glow"></div>
                        //         </button>
                        //       </div>
                        //     </div>
                        //   </div>
                        // </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Navigation Dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {products.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleProductClick(index)}
                        className={`w - 3 h - 3 rounded - full transition - all duration - 300 ${
                          index === activeIndex
                            ? "scale-125"
                            : "hover:scale-110"
                        }`}
                        style={{
                          backgroundColor:
                            index === activeIndex
                              ? `#059669`
                              : "rgba(0,0,0,0.3)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="text-center space-y-6 pt-8">
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {t("home.services.cta.title")}
                </h4>
                <p className="text-gray-600 text-lg mx-auto">
                  {t("home.services.cta.description")}
                </p>
              </div>

              <div className="luxury-hero-btn-container">
                <button
                  className="luxury-hero-btn luxury-hero-btn-primary group overflow-hidden"
                  onClick={() => router.push(`/${locale}/products-services`)}>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span className="font-semibold tracking-wide">
                      {t("home.services.viewAll")}
                    </span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                  <div className="luxury-btn-shimmer"></div>
                  <div className="luxury-btn-glow"></div>
                  {/* NavBar-style hover animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </button>

                <button
                  className="luxury-hero-btn luxury-hero-btn-primary group overflow-hidden"
                  onClick={() => router.push(`/${locale}/contact-us`)}>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span className="font-semibold tracking-wide">
                      {t("common.contactUs")}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
                  </span>
                  <div className="luxury-btn-shimmer"></div>
                  <div className="luxury-btn-glow"></div>
                  {/* NavBar-style hover animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
