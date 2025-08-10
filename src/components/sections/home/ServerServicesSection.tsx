import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/share/ProductCard";
import { ServiceType } from "@/store/zustand/servicesStore";
import ClientServicesInteractions from "./ClientServicesInteractions";

interface ServerServicesSectionProps {
  services: ServiceType[];
  locale: string;
}

export default function ServerServicesSection({
  services,
  locale,
}: ServerServicesSectionProps) {
  const t = useTranslations();

  return (
    <section
      id="services"
      className="relative services-elegant-texture overflow-hidden services-section-overlap bg-gradient-to-br from-gray-100 via-white to-gray-50">
      {/* Main Content */}
      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header */}
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
              {/* Responsive Grid - 2 columns on mobile, 2 on medium, 3 on large */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
                {services.map((service, index) => (
                  <ProductCard
                    key={service.id}
                    product={service}
                    locale={locale}
                  />
                ))}
              </div>

              {/* Mobile Carousel - Hidden by default, will be handled by client component */}
              <div className="hidden">
                <div className="relative">
                  {/* Carousel Container */}
                  <div className="overflow-hidden">
                    <div className="flex transition-transform duration-500 ease-in-out">
                      {services.map((service, index) => (
                        <ProductCard
                          key={service.id}
                          product={service}
                          locale={locale}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Mobile Navigation Dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {services.map((_, index) => (
                      <button
                        key={index}
                        className="w-3 h-3 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.3)",
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
                <ClientServicesInteractions locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
