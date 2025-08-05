"use client";

import { useState } from "react";
import { ProductCard } from "@/components/share/ProductCard";
import { ProductType } from "@/store/zustand/productStore";

interface ProductsSectionProps {
  products: ProductType[];
  locale?: string;
  loading?: boolean;
}

export default function ProductsSection({
  products,
  locale = "th",
  loading = false,
}: ProductsSectionProps) {
  const [showAllProducts, setShowAllProducts] = useState(false);

  const displayedProducts = showAllProducts ? products : products.slice(0, 6);

  const handleProductClick = (index: number) => {
    // Handle product click - could navigate to product detail page
    console.log("Product clicked:", displayedProducts[index]);
  };

  // Loading state
  if (loading) {
    return (
      <section className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {locale === "th"
                ? "กำลังโหลดผลิตภัณฑ์..."
                : "Loading products..."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-minimal bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Section Label - Matching ServicesSection style */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
              {locale === "th" ? "ผลิตภัณฑ์" : "PRODUCTS"}
            </span>
            <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
          </div>

          {/* Main Heading - Strong & Minimal Style */}
          <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
            {locale === "th" ? "ผลิตภัณฑ์ของเรา" : "Our Products"}
          </h2>

          {/* Enhanced Elegant Line with Glow */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
          </div>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {locale === "th"
              ? "ผลิตภัณฑ์คุณภาพสูงสำหรับสถานีบริการน้ำมันและอุตสาหกรรมพลังงาน"
              : "High-quality products for gas stations and energy industry"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              handleProductClick={() => handleProductClick(index)}
              locale={locale}
            />
          ))}
        </div>

        {products.length > 6 && (
          <div className="text-center mt-12">
            <div className="luxury-hero-btn-container max-w-xs mx-auto">
              <button
                className="luxury-hero-btn luxury-hero-btn-secondary group"
                onClick={() => setShowAllProducts(!showAllProducts)}>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="font-semibold tracking-wide">
                    {showAllProducts
                      ? locale === "th"
                        ? "แสดงน้อยลง"
                        : "Show Less"
                      : locale === "th"
                      ? "ดูผลิตภัณฑ์ทั้งหมด"
                      : "View All Products"}
                  </span>
                  <div className="w-2 h-2 bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
                </span>
                <div className="luxury-btn-border"></div>
                <div className="luxury-btn-glow-secondary"></div>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
