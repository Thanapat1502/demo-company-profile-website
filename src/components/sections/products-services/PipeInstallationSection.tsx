"use client";

import { Wrench, ArrowRight, Settings } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ServiceType } from "@/store/zustand/servicesStore";
import { Content } from "@/store/zustand/contentStore";
import { getBilingualName, getBilingualDescription } from "@/utils/bilingual";
import ServiceGallery from "@/components/gallery/ServiceGallery";
import ImageSkeleton from "@/components/ui/ImageSkeleton";
interface PipeInstallationSectionProps {
  service?: ServiceType;
  content?: Content[];
  locale?: string;
  loading?: boolean;
}

export default function PipeInstallationSection({
  service,
  content = [],
  locale: propLocale,
  loading = false,
}: PipeInstallationSectionProps) {
  const hookLocale = useLocale();
  const locale = propLocale || hookLocale;
  const t = useTranslations();

  // Loading state
  if (loading) {
    return (
      <section className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t("common.loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  // Get service data (fallback to default if not provided)
  const serviceName = service
    ? getBilingualName(service, locale)
    : t("services.pipeInstallation.title");

  const serviceDescription = service
    ? getBilingualDescription(service, locale)
    : t("services.pipeInstallation.description");

  // Get gallery images from content (SERVICE_3 should have gallery type)
  const galleryContent = content.find((c) => c.type === "gallery");
  const galleryImages = galleryContent?.images_url || [];

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-1">
            {/* Section Label - Matching ServicesSection style */}
            <div className="inline-flex items-center gap-2 sm:gap-3">
              <div className="w-8 sm:w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-xs sm:text-sm text-[var(--primary-blue)]">
                {t("services.pipeInstallation.sectionLabel")}
              </span>
            </div>

            {/* Main Heading - Strong & Minimal Style */}
            <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[var(--primary-blue)]/10 flex items-center justify-center flex-shrink-0">
                <Wrench
                  size={24}
                  className="sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[var(--primary-blue)]"
                />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-0 tracking-[0.02em] leading-tight break-words">
                {serviceName}
              </h2>
            </div>

            {/* Enhanced Elegant Line with Glow */}
            <div className="relative flex items-start justify-start mb-2 sm:mb-4">
              <div className="w-16 sm:w-20 lg:w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-16 sm:w-20 lg:w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
              <p>{serviceDescription}</p>
              <p>{t("services.pipeInstallation.detailedDescription")}</p>
            </div>

            {/* Action Button - Using luxury hero button style */}
            <div className="pt-4">
              <div className="luxury-hero-btn-container max-w-xs">
                <button
                  className="luxury-hero-btn luxury-hero-btn-primary group"
                  onClick={() =>
                    (window.location.href = `/${locale}/contact-us`)
                  }>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span className="font-semibold tracking-wide">
                      {t("services.pipeInstallation.contactButton")}
                    </span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                  <div className="luxury-btn-shimmer"></div>
                  <div className="luxury-btn-glow"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Content Display - Gallery */}
          <div className="relative order-2 lg:order-2 w-full max-w-full">
            {galleryImages.length > 0 ? (
              // Display image carousel gallery
              <div className="w-full max-w-full overflow-hidden">
                <div className="w-full h-[250px] sm:h-[300px] lg:h-[400px] max-w-full overflow-hidden">
                  <ServiceGallery
                    images={galleryImages}
                    alt={serviceName}
                    aspectRatio="16/9"
                    showNavigation={true}
                    showIndicators={true}
                    autoPlay={true}
                    interval={5000}
                    className="shadow-xl w-full h-full"
                  />
                </div>
              </div>
            ) : (
              // Fallback placeholder for pipe installation
              <ImageSkeleton />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
