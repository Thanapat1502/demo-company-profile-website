"use client";

import { Cog, ArrowRight, Wrench } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ServiceType } from "@/store/zustand/servicesStore";
import { Content } from "@/store/zustand/contentStore";
import { getBilingualName, getBilingualDescription } from "@/utils/bilingual";
import ServiceGallery from "@/components/gallery/ServiceGallery";
import ImageSkeleton from "@/components/ui/ImageSkeleton";
interface TankServicesSectionProps {
  service?: ServiceType;
  content?: Content[];
  locale?: string;
  loading?: boolean;
}

export default function TankServicesSection({
  service,
  content = [],
  locale: propLocale,
  loading = false,
}: TankServicesSectionProps) {
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
    : t("services.tankServices.title");

  const serviceDescription = service
    ? getBilingualDescription(service, locale)
    : t("services.tankServices.description");

  // Get gallery images from content (SERVICE_5 should have gallery type)
  const galleryContent = content.find((c) => c.type === "gallery");
  const galleryImages = galleryContent?.images_url || [];

  // Debug logging
  console.log("🔍 TankServicesSection Debug:");
  console.log("- Content received (length):", content.length);
  console.log(
    "- Content items:",
    content.map((c) => ({
      id: c.id,
      type: c.type,
      hasImages: !!c.images_url?.length,
    }))
  );
  console.log(
    "- Gallery content found:",
    galleryContent
      ? {
          id: galleryContent.id,
          type: galleryContent.type,
          imageCount: galleryContent.images_url?.length,
        }
      : null
  );
  console.log("- Gallery images count:", galleryImages.length);

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Content Display - Gallery */}
          <div className="relative order-2 lg:order-1">
            {galleryImages.length > 0 ? (
              <div className="w-full max-w-full overflow-hidden">
                {/* Display image carousel gallery */}
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
              // Fallback placeholder for tank services
              <ImageSkeleton />
            )}
          </div>

          <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-2">
            {/* Section Label - Matching ServicesSection style */}
            <div className="inline-flex items-center gap-2 sm:gap-3">
              <div className="w-8 sm:w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-xs sm:text-sm text-[var(--primary-blue)]">
                บริการถังน้ำมัน
              </span>
            </div>

            {/* Main Heading - Strong & Minimal Style */}
            <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[var(--primary-blue)]/10 flex items-center justify-center flex-shrink-0">
                <Cog
                  size={24}
                  className="sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[var(--primary-blue)]"
                />
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-0 tracking-[0.02em] leading-tight break-words">
                บริการต่าง ๆ เกี่ยวกับถังน้ำมัน
              </h2>
            </div>

            {/* Enhanced Elegant Line with Glow */}
            <div className="relative flex items-start justify-start mb-2 sm:mb-4">
              <div className="w-16 sm:w-20 lg:w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-16 sm:w-20 lg:w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            {/* Content - Clean Typography */}
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
              <div className="bg-[var(--primary-blue)]/10 p-4 sm:p-6 border-l-4 border-[var(--primary-blue)]">
                <p className="font-semibold text-[var(--primary-blue)] text-base sm:text-lg lg:text-xl mb-3 sm:mb-4 tracking-wide break-words">
                  {t("services.tankServices.companyName")}
                </p>
                <ol className="space-y-2 text-gray-700 text-sm sm:text-base">
                  <li>1. งานตรวจสอบการติดตั้งถัง PERMATANK</li>
                  <li>2. งานติดตั้งระบบท่อ NUPI-UPP-KPS</li>
                  <li>3. งานติดตั้ง TANK SUMP</li>
                  <li>4. งานติดตั้ง NANO ATG & ProGauge</li>
                  <li>5. งาน 3D SCAN</li>
                </ol>
              </div>

              <p>
                กลุ่มบริษัท ผดุงศิลป์
                จะรักษาไว้ซึ่งพนักงานชั้นเยี่ยมในระดับปฏิบัติการ และบริหาร
                โดยที่ทุกคนมีเป้าหมายเดียวกันในการนำเสนอลูกค้าด้วยผลงานก่อสร้าง,
                สินค้า และบริการ ซึ่งไม่เพียงแต่ดีที่สุดเท่านั้น
                ยังรวมไปถึงบุคลากรที่มีความรู้ ความสามารถเป็นเยี่ยม
              </p>
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
                      ติดต่อสอบถาม
                    </span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                  <div className="luxury-btn-shimmer"></div>
                  <div className="luxury-btn-glow"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
