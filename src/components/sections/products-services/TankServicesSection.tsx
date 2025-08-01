"use client";

import { Cog, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function TankServicesSection() {
  const locale = useLocale();

  return (
    <section className="section-minimal bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Gallery - Minimal design without rounded corners */}
          <div className="relative">
            <div className="relative h-96 overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="บริการต่าง ๆ เกี่ยวกับถังน้ำมัน"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            {/* Section Label - Matching ServicesSection style */}
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                บริการถังน้ำมัน
              </span>
            </div>

            {/* Main Heading - Strong & Minimal Style */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-[var(--primary-blue)]/10 flex items-center justify-center flex-shrink-0">
                <Cog size={32} className="text-[var(--primary-blue)]" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-0 tracking-[0.02em] !leading-normal drop-shadow-sm">
                บริการต่าง ๆ เกี่ยวกับถังน้ำมัน
              </h2>
            </div>

            {/* Enhanced Elegant Line with Glow */}
            <div className="relative flex items-start justify-start mb-4">
              <div className="w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            {/* Content - Clean Typography */}
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <div className="bg-[var(--primary-blue)]/10 p-6 border-l-4 border-[var(--primary-blue)]">
                <p className="font-semibold text-[var(--primary-blue)] text-xl mb-4 tracking-wide">
                  บริษัท ผดุงศิลป์วิศวการ จำกัด
                </p>
                <ol className="space-y-2 text-gray-700">
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
