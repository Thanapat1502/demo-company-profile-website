"use client";

import { Building2, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function ConstructionServiceSection() {
  const locale = useLocale();

  return (
    <section className="section-minimal bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Section Label - Matching ServicesSection style */}
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                งานก่อสร้าง
              </span>
            </div>

            {/* Main Heading - Strong & Minimal Style */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-[var(--primary-blue)]/10 flex items-center justify-center flex-shrink-0">
                <Building2 size={32} className="text-[var(--primary-blue)]" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-0 tracking-[0.02em] !leading-normal drop-shadow-sm">
                งานก่อสร้างสถานีบริการน้ำมัน
              </h2>
            </div>

            {/* Enhanced Elegant Line with Glow */}
            <div className="relative flex items-start justify-start mb-4">
              <div className="w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            {/* Content - Clean Typography */}
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">
                  บริษัท ผดุงศิลป์โยธาการ จำกัด (PCW)
                </strong>
                เป็นบริษัทฯก่อสร้างชั้นนำที่เชี่ยวชาญและมากด้วยประสบการณ์ในงานก่อสร้างสถานีบริการน้ำมัน
                และก๊าซ ตลอดจนงานอื่นๆที่เกี่ยวข้อง
                เนื่องจากมีผลงานเป็นที่เชื่อถือ และได้รับความไว้วางใจ
                จากบริษัทน้ำมันชั้นนำ
              </p>

              <p>
                ด้วยประสบการณ์ในการก่อสร้างสถานีบริการน้ำมันมากกว่า{" "}
                <strong className="text-[var(--primary-blue)]">50 ปี</strong>
                ทำให้เราเข้าใจถึงความต้องการและข้อกำหนดเฉพาะของอุตสาหกรรมนี้เป็นอย่างดี
              </p>

              <div className="bg-[var(--primary-blue)]/10 p-6 border-l-4 border-[var(--primary-blue)]">
                <p className="font-semibold text-[var(--primary-blue)] text-xl tracking-wide">
                  ภายใต้นโยบาย &ldquo;ถูกต้อง ถูกตังค์ ทันเวลา ปลอดภัย&rdquo;
                </p>
              </div>

              <p>
                เราให้บริการครบวงจรตั้งแต่การออกแบบ การก่อสร้าง
                การติดตั้งอุปกรณ์ และการบำรุงรักษา
                เพื่อให้ลูกค้าได้รับบริการที่สมบูรณ์แบบและมีคุณภาพสูงสุด
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

          {/* Image Gallery - Minimal design without rounded corners */}
          <div className="relative">
            <div className="relative h-96 overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="งานก่อสร้างสถานีบริการน้ำมัน"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
