"use client";

import { Shield, Award, Users, Wrench, ArrowRight } from "lucide-react";
import MinimalCarousel from "@/components/ui/MinimalCarousel";
import { Content } from "@/store/zustand/contentStore";

export default function Overview(props: { gallery: Content[] }) {
  const { gallery } = props;

  const features = [
    {
      icon: Shield,
      title: "มาตรฐานความปลอดภัยสูงสุด",
      description:
        "ระบบความปลอดภัยที่ได้รับการรับรองมาตรฐานสากล UL และ STI-P3®",
    },
    {
      icon: Award,
      title: "ความเชี่ยวชาญระดับมืออาชีพ",
      description: "ทีมงานผู้เชี่ยวชาญด้านวิศวกรรมและการก่อสร้างกว่า 50 ปี",
    },
    {
      icon: Users,
      title: "บริการหลังการขายตลอด 24 ชั่วโมง",
      description: "ทีมซัพพอร์ตพร้อมให้บริการตลอดเวลาเพื่อความปลอดภัยสูงสุด",
    },
    {
      icon: Wrench,
      title: "เทคโนโลยี PERMATANK® ทันสมัย",
      description: "ถังเก็บน้ำมันใต้ดินผนัง 2 ชั้นที่ได้มาตรฐานระหว่างประเทศ",
    },
  ];

  // const companyImages = [
  //   "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   "https://images.unsplash.com/photo-1565043666747-69f6646db940?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  // ];

  /*REPLACE "companyImages" with  "gallery"*/
  return (
    <section className="section-minimal bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 flex flex-col justify-center">
            {/* Section Label - Matching ServicesSection style */}
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                เกี่ยวกับเรา
              </span>
            </div>

            {/* Main Heading - Strong & Minimal Style */}
            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-0 tracking-[0.02em] !leading-normal drop-shadow-sm">
              บริษัทผู้นำด้าน
              <span className="block text-[var(--primary-blue)]">
                การก่อสร้างสถานีบริการน้ำมัน
              </span>
            </h2>

            {/* Enhanced Elegant Line with Glow - Matching ServicesSection */}
            <div className="relative flex items-start justify-start mb-4">
              <div className="w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            {/* Description - Clean Typography */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              เรามุ่งมั่นรักษามาตรฐานสูงสุดด้านคุณภาพสินค้าและบริการ
              พร้อมให้คำปรึกษาผู้เชี่ยวชาญเพื่อพัฒนาอย่างต่อเนื่อง
              และคำนึงถึงความปลอดภัยของพนักงานและลูกค้าทุกท่าน ภายใต้แนวคิด
              'ถูกต้อง ถูกหลักดี ทันสมัย ปลอดภัย'
            </p>

            {/* Features Grid - Minimal Cards without rounded corners */}
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="card-minimal p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-[var(--primary-blue)]/10 flex items-center justify-center">
                        <feature.icon className="w-8 h-8 text-[var(--primary-blue)]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-base text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Action Buttons - Using luxury hero button style */}
            <div className="pt-4">
              <div className="luxury-hero-btn-container">
                <button
                  className="luxury-hero-btn luxury-hero-btn-primary group"
                  onClick={() => (window.location.href = "/th/pds-group")}>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span className="font-semibold tracking-wide">
                      เรียนรู้เพิ่มเติม
                    </span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                  <div className="luxury-btn-shimmer"></div>
                  <div className="luxury-btn-glow"></div>
                </button>

                <button
                  className="luxury-hero-btn luxury-hero-btn-secondary group"
                  onClick={() => (window.location.href = "/th/reference")}>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span className="font-semibold tracking-wide text-black">
                      ดูผลงาน
                    </span>
                    <div className="w-2 h-2 bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
                  </span>
                  <div className="luxury-btn-border"></div>
                  <div className="luxury-btn-glow-secondary"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Minimal Carousel */}
          <div className="relative flex items-center">
            <MinimalCarousel
              images={companyImages}
              alt="Company Overview"
              aspectRatio="4/5"
              showNavigation={true}
              showIndicators={true}
              autoPlay={true}
              interval={5000}
              className="w-full max-w-lg mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
