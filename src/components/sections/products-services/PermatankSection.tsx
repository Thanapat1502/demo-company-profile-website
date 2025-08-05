"use client";

import { Fuel, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { ServiceType } from "@/store/zustand/servicesStore";
import { Content } from "@/store/zustand/contentStore";
import { getBilingualName, getBilingualDescription } from "@/utils/bilingual";

interface PermatankSectionProps {
  service?: ServiceType;
  content?: Content[];
  locale?: string;
  loading?: boolean;
}

export default function PermatankSection({
  service,
  content = [],
  locale: propLocale,
  loading = false,
}: PermatankSectionProps) {
  const hookLocale = useLocale();
  const locale = propLocale || hookLocale;

  // Loading state
  if (loading) {
    return (
      <section className="section-minimal bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {locale === "th" ? "กำลังโหลดบริการ..." : "Loading service..."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Get service data (fallback to default if not provided)
  const serviceName = service
    ? getBilingualName(service, locale)
    : locale === "th"
    ? "ถังน้ำมันใต้ดิน PERMATANK®"
    : "PERMATANK® Underground Fuel Tanks";

  const serviceDescription = service
    ? getBilingualDescription(service, locale)
    : locale === "th"
    ? "ถังน้ำมันใต้ดินผนัง 2 ชั้น ทนทาน ปลอดภัย ได้มาตรฐานสากล"
    : "Double-wall underground fuel tanks, durable, safe, and internationally certified";

  // Get gallery images from content
  const galleryImages = content
    .filter((c) => c.type === "gallery")
    .flatMap((c) => c.images_url || []);

  // Get video URL from content
  const videoContent = content.find((c) => c.type === "video");
  const videoUrl =
    videoContent?.video_url || "https://www.youtube.com/embed/HTzu3zmGk80";

  return (
    <section className="section-minimal bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Video Section - Minimal design without rounded corners */}
          <div className="relative">
            <div className="relative h-96 overflow-hidden shadow-lg">
              <iframe
                src={videoUrl}
                title={serviceName}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="space-y-8">
            {/* Section Label - Matching ServicesSection style */}
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                {locale === "th" ? "ผลิตภัณฑ์" : "PRODUCTS"}
              </span>
            </div>

            {/* Main Heading - Strong & Minimal Style */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-[var(--primary-blue)]/10 flex items-center justify-center flex-shrink-0">
                <Fuel size={32} className="text-[var(--primary-blue)]" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-0 tracking-[0.02em] !leading-normal drop-shadow-sm">
                {serviceName}
              </h2>
            </div>

            {/* Enhanced Elegant Line with Glow */}
            <div className="relative flex items-start justify-start mb-4">
              <div className="w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>{serviceDescription}</p>

              {locale === "th" && (
                <>
                  <p>
                    ถังน้ำมันใต้ดินแบบผนัง 2 ชั้นของบริษัท ผดุงศิลป์วิศวการ
                    จำกัด ในชื่อผลิตภัณฑ์
                    <strong className="text-gray-900">
                      &apos;PERMATANK&apos;
                    </strong>{" "}
                    ได้รับการผลิตตามมาตรฐาน
                    <strong className="text-[var(--primary-blue)]">
                      UL 58 & UL 1746
                    </strong>{" "}
                    โดยใช้เทคโนโลยีจากสถาบัน Steel Tank Institute Technology,
                    USA
                  </p>

                  <div className="bg-[var(--primary-blue)]/10 p-6 border-l-4 border-[var(--primary-blue)]">
                    <p className="font-semibold text-[var(--primary-blue)] text-xl tracking-wide">
                      ภายใต้นโยบาย &ldquo;ถูกต้อง ถูกตังค์ ทันเวลา
                      ปลอดภัย&rdquo;
                    </p>
                  </div>
                </>
              )}

              {locale === "en" && (
                <>
                  <p>
                    Double-wall underground fuel tanks by Padung Sin Engineering
                    Co., Ltd. under the product name
                    <strong className="text-gray-900">
                      &apos;PERMATANK&apos;
                    </strong>{" "}
                    are manufactured according to
                    <strong className="text-[var(--primary-blue)]">
                      UL 58 & UL 1746
                    </strong>{" "}
                    standards using technology from Steel Tank Institute
                    Technology, USA
                  </p>

                  <div className="bg-[var(--primary-blue)]/10 p-6 border-l-4 border-[var(--primary-blue)]">
                    <p className="font-semibold text-[var(--primary-blue)] text-xl tracking-wide">
                      Under the policy &ldquo;Correct, Right Tank, On Time,
                      Safe&rdquo;
                    </p>
                  </div>
                </>
              )}

              <p>
                เราพัฒนาแบบถังน้ำมันใต้ดินและอุปกรณ์ที่เกี่ยวข้องอย่างต่อเนื่อง
                เพื่อประโยชน์สูงสุดของลูกค้า ผู้รับเหมา และผู้ค้าอื่น ๆ
                ที่เกี่ยวข้องกับงานสถานีบริการน้ำมัน
              </p>

              <p>
                เพื่อให้มั่นใจว่าลูกค้าได้รับสินค้าที่มีคุณภาพและมีอายุการใช้งานยาวนานกว่า
                <strong className="text-[var(--primary-blue)]">30 ปี</strong>{" "}
                ผดุงศิลป์ให้ความสำคัญกับทุกขั้นตอนของกระบวนการผลิตและจัดส่ง
                PERMATANK®
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
