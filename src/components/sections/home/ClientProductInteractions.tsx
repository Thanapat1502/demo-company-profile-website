"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/share/ProductCard";
import { ProductType } from "@/store/zustand/productStore";

interface ClientProductInteractionsProps {
  products: ProductType[];
  locale: string;
  initialDisplayCount: number;
}

export default function ClientProductInteractions({
  products,
  locale,
  initialDisplayCount,
}: ClientProductInteractionsProps) {
  const router = useRouter();
  const t = useTranslations();
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Determine how many products to show
  const displayedProducts = showAllProducts ? products : products.slice(0, initialDisplayCount);

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

  return (
    <div className="space-y-6">
      {/* Additional Products Grid - Only shown when expanded */}
      {showAllProducts && products.length > initialDisplayCount && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
          {products.slice(initialDisplayCount).map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
            />
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row align-middle justify-center gap-6">
        {/* Expand/Collapse Button - Only show if there are more than initialDisplayCount products */}
        {products.length > initialDisplayCount && (
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
  );
}
