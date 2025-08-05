"use client";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { ServiceType } from "@/store/zustand/servicesStore";
import { ProductType } from "@/store/zustand/productStore";
import { getBilingualName, getBilingualDescription } from "@/utils/bilingual";

interface Props {
  product: ServiceType | ProductType;
  handleProductClick: () => void;
  locale?: string; // Optional prop, will use useLocale if not provided
}

export const ProductCard: React.FC<Props> = ({
  product,
  handleProductClick,
  locale: propLocale,
}) => {
  const t = useTranslations();
  const hookLocale = useLocale();
  const locale = propLocale || hookLocale;

  // Get bilingual content
  const productName = getBilingualName(product, locale);
  const productDescription = getBilingualDescription(product, locale);

  return (
    <div
      className={`relative aspect-square overflow-hidden bg-gray-100 shadow-lg transition-all duration-500 cursor-pointer group`}
      onClick={handleProductClick}>
      {/* Product Image */}
      <Image
        src={product.image_url}
        alt={productName}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

      {/* Product content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-6">
        {/* Content container that moves up on hover to make room for learn more link */}
        <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-0 md:group-hover:-translate-y-12 ">
          <div className="md:space-y-3">
            {/* Product Title - Moves up on hover */}
            <h3 className="text-xl lg:text-xl font-black text-white line-clamp-2 md:line-clamp-1 leading-tight transform transition-all duration-500 ease-out">
              {productName}
            </h3>

            {/* Product Description - Moves up on hover */}
            <p className="text-white/80 text-sm md:text-lg leading-relaxed line-clamp-2 transform transition-all duration-500 ease-out">
              {productDescription}
            </p>
          </div>
        </div>

        {/* Learn More Link - Slides up from bottom */}
        <div className="hidden md:block absolute bottom-6 left-6 right-6 overflow-hidden">
          <div className="transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-150">
            <span className="inline-flex items-center gap-2 text-white/90 text-md font-medium group-hover:text-white transition-colors duration-300 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-black/30 hover:border-white/30">
              {t("common.learnMore")}
              <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
