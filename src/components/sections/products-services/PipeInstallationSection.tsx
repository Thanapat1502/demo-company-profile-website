"use client";

import { Wrench, ArrowRight, Settings } from "lucide-react";
import { useLocale } from "next-intl";
import { ServiceType } from "@/store/zustand/servicesStore";
import { Content } from "@/store/zustand/contentStore";
import { getBilingualName, getBilingualDescription } from "@/utils/bilingual";
import MinimalCarousel from "@/components/ui/MinimalCarousel";

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

  // Loading state
  if (loading) {
    return (
      <section className="section-minimal bg-white">
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
    ? "ท่อน้ำมันใต้ดินผนัง 2 ชั้น"
    : "Double-Wall Underground Piping";

  const serviceDescription = service
    ? getBilingualDescription(service, locale)
    : locale === "th"
    ? "ระบบท่อน้ำมันใต้ดินที่ป้องกันการรั่วไหล มีระบบตรวจจับการรั่วไหลแบบเรียลไทม์"
    : "Underground fuel piping system that prevents leaks with real-time leak detection system";

  // Get gallery images from content (SERVICE_3 should have gallery type)
  const galleryContent = content.find((c) => c.type === "gallery");
  const galleryImages = galleryContent?.images_url || [];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 order-2 lg:order-1">
            {/* Section Label - Matching ServicesSection style */}
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                ติดตั้งท่อ
              </span>
            </div>

            {/* Main Heading - Strong & Minimal Style */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-[var(--primary-blue)]/10 flex items-center justify-center flex-shrink-0">
                <Wrench size={32} className="text-[var(--primary-blue)]" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-0 tracking-[0.02em] !leading-normal drop-shadow-sm">
                จำหน่ายและติดตั้งท่อน้ำมันใต้ดินผนัง 2 ชั้น
              </h2>
            </div>

            {/* Enhanced Elegant Line with Glow */}
            <div className="relative flex items-start justify-start mb-4">
              <div className="w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                ด้วยประสบการณ์การติดตั้งท่อน้ำมันแบบผนัง 2 ชั้นมากกว่า 20 ปี
                บริษัท ผดุงศิลป์วิศวการ จำกัด
                เป็นตัวแทนจำหน่ายและติดตั้งท่อน้ำมันยี่ห้อ NUPIGECO S.P.A. รุ่น
                Smartflex และ Ecoflex ซึ่งผลิตในประเทศอิตาลี
              </p>

              <p>
                ผลิตจากวัสดุ Polyethylene (PE) และ Polyamide (PA)
                ที่มีคุณสมบัติพิเศษในการป้องกันการรั่วไหลของน้ำมัน
                และสามารถตรวจจับการรั่วไหลได้แบบ Real-Time
              </p>

              <p>
                ระบบท่อนี้ได้รับการรับรองมาตรฐานจาก European Standard EN 14125
                และผ่านการทดสอบในสภาพแวดล้อมที่หลากหลาย
                รับประกันความทนทานและความปลอดภัยสูงสุด
              </p>

              <p>
                โดยมีทีมงานติดตั้งที่ได้รับการฝึกอบรมจากเจ้าของผลิตภัณฑ์โดยตรง
                ด้วยประสบการณ์มากกว่า 300 โครงการ
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

          {/* Content Display - Gallery */}
          <div className="relative order-1 lg:order-2">
            {galleryImages.length > 0 ? (
              // Display image carousel gallery
              <MinimalCarousel
                images={galleryImages}
                alt={serviceName}
                aspectRatio="3/2"
                showNavigation={true}
                showIndicators={true}
                autoPlay={true}
                interval={5000}
                className="shadow-xl w-full h-[400px] lg:h-[500px]"
              />
            ) : (
              // Fallback placeholder for pipe installation
              <div className="w-full h-[400px] lg:h-[500px] bg-gray-100 flex items-center justify-center shadow-xl">
                <div className="text-center text-gray-500">
                  <Settings className="w-20 h-20 mx-auto mb-4" />
                  <p className="text-lg">
                    {locale === "th"
                      ? "รูปภาพท่อน้ำมันใต้ดินผนัง 2 ชั้น"
                      : "Double-Wall Underground Piping Images"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
