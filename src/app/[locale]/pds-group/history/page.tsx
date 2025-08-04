"use client";

import { useState } from "react";
import {
  History,
  Calendar,
  Award,
  Building,
  ArrowRight,
  Users2,
  Target,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";

export default function CompanyHistoryPage() {
  const t = useTranslations();
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

  const milestones = [
    {
      year: "2517",
      title: "ก่อตั้งบริษัท",
      description:
        "ก่อตั้งบริษัท ผดุงศิลป์ จำกัด โดยมีจุดประสงค์เพื่อให้บริการด้านการก่อสร้างและวิศวกรรม",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "2530",
      title: "ขยายธุรกิจ",
      description:
        "เริ่มให้บริการด้านการก่อสร้างสถานีบริการน้ำมันและพัฒนาเทคโนโลยีถังน้ำมันใต้ดิน",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "2540",
      title: "นำเข้าเทคโนโลยี PERMATANK®",
      description:
        "เป็นผู้นำเข้าและติดตั้งระบบถังน้ำมันใต้ดิน PERMATANK® ที่ได้มาตรฐานสากลเป็นรายแรกในประเทศไทย",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "2550",
      title: "ได้รับการรับรองมาตรฐาน",
      description:
        "ได้รับการรับรองมาตรฐาน ISO 9001:2000 และเป็นผู้ให้บริการที่ได้รับความไว้วางใจจากบริษัทน้ำมันชั้นนำ",
      image:
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "2560",
      title: "ขยายการให้บริการ",
      description:
        "ขยายการให้บริการครอบคลุมทั่วประเทศไทย และเริ่มให้บริการระบบ ATG (Automatic Tank Gauging)",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "2567",
      title: "ปัจจุบัน",
      description:
        "เป็นผู้นำด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมัน ด้วยประสบการณ์กว่า 50 ปี",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <ImageCarouselHero
        images={["/images/hero-sections/hero-banner-1.jpg"]}
        title={`ประวัติความเป็นมา`}
        subtitle="เส้นทางแห่งความสำเร็จ"
        description={`มากกว่า 50 ปีแห่งประสบการณ์\nในอุตสาหกรรมการก่อสร้างสถานีบริการน้ำมัน`}
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
                  page.id === "history"
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

      {/* Timeline Section */}
      <section className="section-minimal bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Section Label */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                ประวัติศาสตร์
              </span>
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              เส้นทางการเติบโต
            </h2>

            {/* Enhanced Elegant Line */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              ติดตามการพัฒนาและความก้าวหน้าของเราตลอด 5 ทศวรรษที่ผ่านมา
            </p>
          </div>
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}>
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center mb-6">
                    <div className="w-20 h-20 bg-[var(--primary-blue)] text-white flex items-center justify-center font-bold text-xl mr-6">
                      {milestone.year}
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
                        {milestone.title}
                      </h3>
                      <div className="w-20 h-px bg-[var(--primary-blue)]"></div>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <Image
                    src={milestone.image}
                    alt={milestone.title}
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover shadow-lg"
                  />
                </div>
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
            ร่วมเป็นส่วนหนึ่งของประวัติศาสตร์
          </h2>

          {/* Enhanced Elegant Line with Glow */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></div>
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"></div>
          </div>

          <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            มาร่วมสร้างอนาคตที่ยั่งยืนไปกับเรา
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
