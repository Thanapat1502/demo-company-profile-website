"use client";

import { useState } from "react";
import { Shield, Award, Users, Wrench, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import MinimalCarousel from "@/components/ui/MinimalCarousel";
import ImageModal from "@/components/ui/ImageModal";
import { Content } from "@/store/zustand/contentStore";

interface OverviewProps {
  gallery: Content[];
  loading?: boolean;
  locale?: string;
}

export default function Overview({
  gallery,
  loading = false,
  locale = "th",
}: OverviewProps) {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const features = [
    {
      icon: Shield,
      title:
        locale === "th"
          ? "มาตรฐานความปลอดภัยสูงสุด"
          : "Highest Safety Standards",
      description:
        locale === "th"
          ? "ระบบความปลอดภัยที่ได้รับการรับรองมาตรฐานสากล UL และ STI-P3®"
          : "Safety systems certified to international UL and STI-P3® standards",
    },
    {
      icon: Award,
      title:
        locale === "th"
          ? "ความเชี่ยวชาญระดับมืออาชีพ"
          : "Professional Expertise",
      description:
        locale === "th"
          ? "ทีมงานผู้เชี่ยวชาญด้านวิศวกรรมและการก่อสร้างกว่า 50 ปี"
          : "Expert engineering and construction team with over 50 years of experience",
    },
    {
      icon: Users,
      title:
        locale === "th"
          ? "บริการหลังการขายตลอด 24 ชั่วโมง"
          : "24/7 After-Sales Service",
      description:
        locale === "th"
          ? "ทีมซัพพอร์ตพร้อมให้บริการตลอดเวลาเพื่อความปลอดภัยสูงสุด"
          : "Support team ready to serve around the clock for maximum safety",
    },
    {
      icon: Wrench,
      title:
        locale === "th"
          ? "เทคโนโลยี PERMATANK® ทันสมัย"
          : "Advanced PERMATANK® Technology",
      description:
        locale === "th"
          ? "ถังเก็บน้ำมันใต้ดินผนัง 2 ชั้นที่ได้มาตรฐานระหว่างประเทศ"
          : "Double-wall underground fuel storage tanks meeting international standards",
    },
  ];

  // Extract images from gallery content
  const companyImages = gallery.length > 0 ? gallery[0]?.images_url || [] : [];

  // const companyImages = [
  //   "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   "https://images.unsplash.com/photo-1565043666747-69f6646db940?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  // ];

  // Loading state
  if (loading) {
    return (
      <section className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {locale === "th" ? "กำลังโหลดข้อมูล..." : "Loading content..."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 flex flex-col justify-center">
            {/* Section Label - Matching ServicesSection style */}
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                {locale === "th" ? "เกี่ยวกับเรา" : "ABOUT US"}
              </span>
            </div>

            {/* Main Heading - Strong & Minimal Style */}
            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-0 tracking-[0.02em] !leading-normal drop-shadow-sm">
              {locale === "th" ? (
                <>
                  บริษัทผู้นำด้าน
                  <span className="block text-[var(--primary-blue)]">
                    การก่อสร้างสถานีบริการน้ำมัน
                  </span>
                </>
              ) : (
                <>
                  Leading Company in
                  <span className="block text-[var(--primary-blue)]">
                    Gas Station Construction
                  </span>
                </>
              )}
            </h2>

            {/* Enhanced Elegant Line with Glow - Matching ServicesSection */}
            <div className="relative flex items-start justify-start mb-4">
              <div className="w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            {/* Description - Clean Typography */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              {locale === "th"
                ? "เรามุ่งมั่นรักษามาตรฐานสูงสุดด้านคุณภาพสินค้าและบริการ พร้อมให้คำปรึกษาผู้เชี่ยวชาญเพื่อพัฒนาอย่างต่อเนื่อง และคำนึงถึงความปลอดภัยของพนักงานและลูกค้าทุกท่าน ภายใต้แนวคิด 'ถูกต้อง ถูกหลักดี ทันสมัย ปลอดภัย'"
                : "We are committed to maintaining the highest standards of product and service quality, providing expert consultation for continuous development, and prioritizing the safety of all employees and customers under the concept of 'Correct, Principled, Modern, Safe'"}
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

          {/* Right Content - Balanced Minimal Carousel */}
          <div className="relative flex items-center justify-center w-full">
            <MinimalCarousel
              images={companyImages}
              alt="Company Overview"
              aspectRatio="4/5"
              showNavigation={true}
              showIndicators={true}
              autoPlay={true}
              interval={5000}
              className="w-full shadow-2xl"
              enableModal={true}
              onImageClick={(index) => {
                setModalImageIndex(index);
                setIsModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        images={companyImages}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={modalImageIndex}
        alt="Company Overview"
      />
    </section>
  );
}
