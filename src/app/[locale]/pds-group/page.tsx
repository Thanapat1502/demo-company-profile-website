"use client";

import {
  Users,
  Award,
  Target,
  Heart,
  ArrowRight,
  Building,
  History,
  Users2,
} from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";

export default function CompanyProfilePage() {
  // const t = useTranslations();
  const locale = useLocale();

  const subPages = [
    {
      id: "overview",
      title: "ภาพรวมบริษัท",
      icon: Building,
      href: `/pds-group`,
    },
    {
      id: "history",
      title: "ประวัติความเป็นมา",
      icon: History,
      href: `/pds-group/history`,
    },
    {
      id: "team",
      title: "ทีมผู้บริหาร",
      icon: Users2,
      href: `/pds-group/executive-team`,
    },
    {
      id: "mission",
      title: "วิสัยทัศน์และพันธกิจ",
      icon: Target,
      href: `/pds-group/mission-commitment`,
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section - Using ImageCarouselHero for consistency */}
      <ImageCarouselHero
        images={[
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        ]}
        title="กลุ่มบริษัท ผดุงศิลป์"
        subtitle="ผู้นำด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมัน"
        description="ด้วยประสบการณ์กว่า 50 ปี เราให้บริการก่อสร้าง วิศวกรรม และบำรุงรักษาสถานีบริการน้ำมันครบวงจรทั่วประเทศไทย"
        autoSlideDelay={6000}>
        {/* Luxury Hero Buttons */}
        <div className="luxury-hero-btn-container">
          <button
            className="luxury-hero-btn luxury-hero-btn-primary group"
            onClick={() => (window.location.href = `/${locale}/contact-us`)}>
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="font-semibold tracking-wide">ติดต่อเรา</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
            </span>
            <div className="luxury-btn-shimmer"></div>
            <div className="luxury-btn-glow"></div>
          </button>

          <button
            className="luxury-hero-btn luxury-hero-btn-secondary group"
            onClick={() => (window.location.href = `/${locale}/reference`)}>
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="font-semibold tracking-wide">ผลงานของเรา</span>
              <div className="w-2 h-2 bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
            </span>
            <div className="luxury-btn-border"></div>
            <div className="luxury-btn-glow-secondary"></div>
          </button>
        </div>
      </ImageCarouselHero>

      {/* Sub Navigation - Minimal design without rounded corners */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {subPages.map((page) => (
              <Link
                key={page.id}
                href={`/${locale}${page.href}`}
                className={`flex items-center px-8 py-4 transition-all duration-300 border ${
                  page.id === "overview"
                    ? "bg-[var(--primary-blue)] text-white shadow-lg border-[var(--primary-blue)]"
                    : "bg-gray-100 text-gray-700 hover:bg-[var(--primary-blue)]/10 hover:text-[var(--primary-blue)] border-gray-200 hover:border-[var(--primary-blue)]/30"
                }`}>
                <page.icon className="w-5 h-5 mr-3" />
                <span className="text-lg font-medium tracking-wide">
                  {page.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview - Strong & Minimal Style */}
      <section className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Section Label - Matching ServicesSection style */}
              <div className="inline-flex items-center gap-3">
                <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
                <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                  เกี่ยวกับเรา
                </span>
              </div>

              {/* Main Heading - Strong & Minimal Style */}
              <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-0 tracking-[0.02em] !leading-normal drop-shadow-sm">
                กลุ่มบริษัท ผดุงศิลป์
              </h2>

              {/* Enhanced Elegant Line with Glow */}
              <div className="relative flex items-start justify-start mb-4">
                <div className="w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
                <div className="absolute w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
              </div>

              {/* Description - Clean Typography */}
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  กลุ่มบริษัท ผดุงศิลป์ ก่อตั้งขึ้นเมื่อปี พ.ศ. 2543
                  โดยมีจุดประสงค์เพื่อให้บริการด้านการก่อสร้าง วิศวกรรม
                  และบำรุงรักษาสถานีบริการน้ำมันอย่างครบวงจร
                </p>
                <p>
                  ด้วยประสบการณ์กว่า 50 ปี
                  เราได้พัฒนาความเชี่ยวชาญในการผลิตถังน้ำมันใต้ดินผนัง 2 ชั้น
                  PERMATANK® ระบบท่อน้ำมันใต้ดิน และระบบวัดน้ำมันอัตโนมัติ (ATG)
                  ที่ได้มาตรฐานสากล
                </p>
                <p>
                  เราภาคภูมิใจที่ได้ร่วมงานกับพันธมิตรชั้นนำในอุตสาหกรรมน้ำมันและพลังงาน
                  และได้รับความไว้วางใจจากลูกค้าทั่วประเทศไทย
                </p>
              </div>
            </div>
            <div>
              <Image
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Padungsilpa Group Office"
                className="w-full h-96 object-cover shadow-lg"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Values - Strong & Minimal Style */}
      <section className="section-minimal bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Main Heading - Strong & Minimal Style */}
            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              ค่านิยมองค์กร
            </h2>

            {/* Enhanced Elegant Line with Glow */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              หลักการและค่านิยมที่เรายึดถือในการดำเนินธุรกิจ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "ความเป็นเลิศ",
                description: "มุ่งมั่นสู่ความเป็นเลิศในทุกด้านของการดำเนินงาน",
              },
              {
                icon: Users,
                title: "การทำงานเป็นทีม",
                description: "ร่วมมือกันเพื่อบรรลุเป้าหมายร่วมกัน",
              },
              {
                icon: Heart,
                title: "ความซื่อสัตย์",
                description: "ดำเนินธุรกิจด้วยความโปร่งใสและจริงใจ",
              },
              {
                icon: Award,
                title: "นวัตกรรม",
                description: "พัฒนาเทคโนโลยีและนวัตกรรมอย่างต่อเนื่อง",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-8 card-minimal hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-20 h-20 bg-[var(--primary-blue)]/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon
                    size={40}
                    className="text-[var(--primary-blue)]"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  {value.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Using primary color and luxury buttons */}
      <section
        className="section-minimal"
        style={{ background: "var(--primary-blue)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
            พร้อมที่จะร่วมงานกับเรา?
          </h2>

          {/* Enhanced Elegant Line with Glow */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></div>
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"></div>
          </div>

          <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            ติดต่อเราวันนี้เพื่อปรึกษาโครงการของคุณ
          </p>

          <div className="flex justify-center">
            <div className="luxury-hero-btn-container">
              <button
                className="luxury-hero-btn luxury-hero-btn-primary group"
                onClick={() =>
                  (window.location.href = `/${locale}/contact-us`)
                }>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="font-semibold tracking-wide">ติดต่อเรา</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
                <div className="luxury-btn-shimmer"></div>
                <div className="luxury-btn-glow"></div>
              </button>

              <button
                className="luxury-hero-btn luxury-hero-btn-secondary group"
                onClick={() => (window.location.href = `/${locale}/reference`)}>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="font-semibold tracking-wide">
                    ดูผลงานของเรา
                  </span>
                  <div className="w-2 h-2 bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
                </span>
                <div className="luxury-btn-border"></div>
                <div className="luxury-btn-glow-secondary"></div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
