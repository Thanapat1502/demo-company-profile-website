import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/share/ProductCard";
import { ProductType } from "@/store/zustand/productStore";
import ClientProductInteractions from "./ClientProductInteractions";

interface ServerProductSectionProps {
  products: ProductType[];
  locale: string;
}

export default function ServerProductSection({
  products,
  locale,
}: ServerProductSectionProps) {
  const t = useTranslations();

  // Show first 6 products by default (SSR)
  const displayedProducts = products.slice(0, 6);

  return (
    <section className="section-minimal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
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

        {/* Products Grid Container */}
        <div className="space-y-6">
          {/* Initial Products Grid - Display first 6 products (SSR) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
            {displayedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                locale={locale}
              />
            ))}
          </div>

          {/* Client-side interactions for expand/collapse and navigation */}
          <ClientProductInteractions
            products={products}
            locale={locale}
            initialDisplayCount={6}
          />
        </div>
      </div>
    </section>
  );
}
