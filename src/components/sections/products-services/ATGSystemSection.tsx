"use client";

import { Cog, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

export default function ATGSystemSection() {
  const locale = useLocale();

  return (
    <section className="section-minimal bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Video Section - Minimal design without rounded corners */}
          <div className="relative">
            <div className="relative h-96 overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/udq5UVLwpds"
                title="ระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน"
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
                ระบบ ATG
              </span>
            </div>

            {/* Main Heading - Strong & Minimal Style */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-[var(--primary-blue)]/10 flex items-center justify-center flex-shrink-0">
                <Cog size={32} className="text-[var(--primary-blue)]" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-0 tracking-[0.02em] !leading-normal drop-shadow-sm">
                ระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน
              </h2>
            </div>

            {/* Enhanced Elegant Line with Glow */}
            <div className="relative flex items-start justify-start mb-4">
              <div className="w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                เป็นตัวแทนจำหน่ายและติดตั้งระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน
              </p>

              <p>
                อุปกรณ์วัดน้ำมันใต้ดิน เช่น เครื่องวัดระดับน้ำมันในถังอัตโนมัติ{" "}
                <strong className="text-[var(--primary-blue)]">(ATG)</strong>
                ช่วยให้คุณสามารถตรวจสอบระดับน้ำมันในถังได้แบบ{" "}
                <strong className="text-gray-900">Real-Time</strong>
                เหมาะสำหรับสถานีบริการน้ำมันในยุคที่ราคาน้ำมันมีความผันผวน
              </p>

              <p>
                ระบบนี้ช่วยให้ผู้ประกอบการสามารถจัดการสต็อกน้ำมันได้อย่างมีประสิทธิภาพ
                ลดความสูญเสียจากการรั่วไหล และเพิ่มความแม่นยำในการบริหารจัดการ
              </p>

              <p>
                สามารถใช้ได้กับสถานีบริการน้ำมันภายในองค์กร
                สถานีบริการน้ำมันทั่วไป และคลังน้ำมันที่มีถังสูงถึง{" "}
                <strong className="text-[var(--primary-blue)]">21 เมตร</strong>
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
