import { useTranslations } from "next-intl";
import { ProductType } from "@/store/zustand/productStore";
import ClientProductInteractions from "./ClientProductInteractions";
import Image from "next/image";

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
    <section className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Apple-inspired Clean Header */}
        <div className="text-center mb-20">

          {/* Minimal Badge */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-gray-300"></div>
            <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">
              Products
            </span>
            <div className="w-8 h-px bg-gray-300"></div>
          </div>

          {/* Clean Typography */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-8 tracking-tight">
            {t("home.products.title")}
          </h2>

          {/* Minimal Description */}
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 font-light leading-relaxed">
              {t("home.products.description")}
            </p>
          </div>
        </div>

        {/* Tesla-inspired Product Grid */}
        <div className="space-y-16">

          {/* Clean Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {displayedProducts.map((product) => {
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

          {/* Client Interactions */}
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
