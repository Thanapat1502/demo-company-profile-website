"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/share/ProductCard";
import Image from "next/image";
import { ProductType } from "@/store/zustand/productStore";
import PrimaryButton from "@/components/ui/PrimaryButton";

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
    <div className="space-y-16">
      {/* Additional Products Grid - Only shown when expanded */}
      {showAllProducts && products.length > initialDisplayCount && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {products.slice(initialDisplayCount).map((product) => {
            const productName = locale === 'th' ? product.name_th : product.name_en;
            const productDescription = locale === 'th' ? product.description_th : product.description_en;

            return (
              <div
                key={product.id}
                className="group relative bg-white hover:bg-gray-50/50 transition-all duration-500 ease-out"
              >
                {/* Clean Product Image */}
                <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-gray-50">
                  <Image
                    src={product.image_url}
                    alt={productName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Minimal Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                </div>

                {/* Clean Product Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                    {productName}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {productDescription}
                  </p>
                </div>

                {/* Minimal Accent Line */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-500 ease-out"></div>
              </div>
            );
          })}
        </div>
      )}

      {/* Apple-inspired Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
        {/* Expand/Collapse Button - Only show if there are more than initialDisplayCount products */}
        {products.length > initialDisplayCount && (
          <PrimaryButton
            size="lg"
            className="group min-w-[200px] bg-gray-900 hover:bg-gray-800 text-white border-0"
            onClick={() => setShowAllProducts(!showAllProducts)}
          >
            <span className="flex items-center gap-3">
              <span className="font-medium">
                {showAllProducts
                  ? t("home.products.showLess")
                  : t("home.products.viewAll")}
              </span>
              <ArrowRight
                className={`w-4 h-4 transition-all duration-300 group-hover:translate-x-1 ${showAllProducts ? "rotate-90" : ""
                  }`}
              />
            </span>
          </PrimaryButton>
        )}

        {/* Navigate to Products Page Button */}
        <PrimaryButton
          size="lg"
          variant="bordered"
          className="group min-w-[200px] bg-white border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-gray-400"
          onClick={() => router.push(`/${locale}/products-services`)}
        >
          <span className="flex items-center gap-3">
            <span className="font-medium">
              {t("home.products.viewProductsPage")}
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </PrimaryButton>
      </div>
    </div>
  );
}
