"use client";
import Image from "next/image";
import { useState } from "react";
import { useLocale } from "next-intl";
import { ServiceType } from "@/store/zustand/servicesStore";
import { ProductType } from "@/store/zustand/productStore";
import { getBilingualName, getBilingualDescription } from "@/utils/bilingual";

interface Props {
  product: ServiceType | ProductType;
  handleProductClick?: () => void; // Optional for SSR compatibility
  locale?: string; // Optional prop, will use useLocale if not provided
}

export const ProductCard: React.FC<Props> = ({
  product,
  handleProductClick,
  locale: propLocale,
}) => {
  const hookLocale = useLocale();
  const locale = propLocale || hookLocale;
  const [imageError, setImageError] = useState(false);

  // Get bilingual content
  const productName = getBilingualName(product, locale);
  const productDescription = getBilingualDescription(product, locale);

  // Debug: Log product data to check image URL
  console.log('Product data:', {
    id: product.id,
    name: productName,
    image_url: product.image_url,
    hasImage: !!product.image_url
  });

  return (
    <div
      className={`relative aspect-square overflow-hidden bg-gray-100 shadow-lg smooth-transition-slow hover:shadow-2xl hover:shadow-[var(--primary-blue)]/10 hover:-translate-y-1 transform-gpu ${handleProductClick ? 'cursor-pointer' : ''} group`}
      onClick={handleProductClick}>

      {/* Subtle Border Glow on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--primary-blue)]/20 smooth-transition pointer-events-none"></div>

      {/* Product Image with Enhanced Animation and Better Error Handling */}
      {product.image_url && product.image_url.trim() !== '' && !imageError ? (
        <Image
          src={product.image_url}
          alt={productName}
          fill
          className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110 transform-gpu"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          onError={() => {
            console.log('Image failed to load:', product.image_url);
            setImageError(true);
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center transition-all duration-700 ease-out group-hover:from-blue-200 group-hover:to-blue-300">
          <div className="text-[var(--primary-blue)] text-center">
            <div className="w-16 h-16 mx-auto mb-2 bg-white/50 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:bg-white/70">
              <svg className="w-8 h-8 text-[var(--primary-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-[var(--primary-blue)]">Construction Service</p>
          </div>
        </div>
      )}

      {/* Enhanced Gradient overlay with smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-all duration-700 ease-out group-hover:from-black/60 group-hover:via-black/20 group-hover:to-transparent"></div>

      {/* Subtle Blue Overlay on Hover */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-blue)]/0 via-[var(--primary-blue)]/0 to-[var(--primary-blue)]/0 transition-all duration-500 ease-out group-hover:from-[var(--primary-blue)]/10 group-hover:via-[var(--primary-blue)]/5 group-hover:to-transparent"></div> */}

      {/* Product content overlay with enhanced animations */}
      <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-2">
        {/* Content container with smooth animations */}
        <div className="transform-gpu transition-all duration-700 ease-out group-hover:-translate-y-1 group-hover:opacity-95">
          <div className="md:space-y-3">
            {/* Product Title with enhanced animation */}
            <h3 className="text-md lg:text-md font-normal text-white leading-relaxed transition-all duration-500 ease-out drop-shadow-lg">
              {productName}
            </h3>

            {/* Product Description with staggered animation */}
            <p className="hidden text-white/80 text-sm md:text-lg leading-relaxed line-clamp-2 transition-all duration-600 ease-out delay-75 group-hover:text-white/95">
              {productDescription}
            </p>
          </div>
        </div>


        {/* Corner Accent Animation */}
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/0 transition-all duration-500 ease-out group-hover:border-white/60 transform rotate-0 group-hover:rotate-12 origin-center"></div>
      </div>
    </div>
  );
};
