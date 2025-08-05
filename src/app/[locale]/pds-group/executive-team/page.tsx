"use client";

import {
  History,
  Building,
  ArrowRight,
  Users2,
  Target,
  Mail,
} from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";
import ExecutiveGrid from "@/components/executive/ExecutiveGrid";

export default function ExecutiveTeamPage() {
  const locale = useLocale();

  const subPages = [
    {
      id: "overview",
      title: locale === "th" ? "ภาพรวมบริษัท" : "Company Overview",
      icon: Building,
      href: `/pds-group`,
    },
    {
      id: "history",
      title: locale === "th" ? "ประวัติความเป็นมา" : "Company History",
      icon: History,
      href: `/pds-group/history`,
    },
    {
      id: "team",
      title: locale === "th" ? "ทีมผู้บริหาร" : "Executive Team",
      icon: Users2,
      href: `/pds-group/executive-team`,
    },
    {
      id: "mission",
      title: locale === "th" ? "วิสัยทัศน์และพันธกิจ" : "Mission & Vision",
      icon: Target,
      href: `/pds-group/mission-commitment`,
    },
  ];

  return (
    <MainLayout>
      <ImageCarouselHero
        images={["/images/hero-sections/hero-banner-3.jpg"]}
        title={locale === "th" ? "ทีมผู้บริหาร" : "Executive Team"}
        subtitle={
          locale === "th" ? "ผู้นำที่มีประสบการณ์" : "Experienced Leadership"
        }
        description={
          locale === "th"
            ? "ทีมผู้บริหารมืออาชีพ ที่มีความเชี่ยวชาญในแต่ละสาขา"
            : "Professional executive team with expertise in each field"
        }
        autoSlideDelay={6000}>
        <div className="luxury-hero-btn-container">
          <button
            className="luxury-hero-btn luxury-hero-btn-primary group"
            onClick={() => (window.location.href = `/${locale}/contact-us`)}>
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="font-semibold tracking-wide">
                {locale === "th" ? "ติดต่อเรา" : "Contact Us"}
              </span>
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
            </span>
            <div className="luxury-btn-shimmer"></div>
            <div className="luxury-btn-glow"></div>
          </button>
        </div>
      </ImageCarouselHero>

      {/* Sub Navigation */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {subPages.map((page) => (
              <Link
                key={page.id}
                href={`/${locale}${page.href}`}
                className={`flex items-center px-8 py-4 transition-all duration-300 border ${
                  page.id === "team"
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

      {/* Message from Management Section */}
      <section className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                {locale === "th"
                  ? "สาส์นจากผู้บริหาร"
                  : "Message from Management"}
              </span>
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            </div>

            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              {locale === "th"
                ? "สาส์นจากผู้บริหาร"
                : "Message from Management"}
            </h2>

            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>
          </div>

          <div className="flex justify-center mb-16">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {locale === "th"
                    ? "ในฐานะกรรมการผู้จัดการของบริษัท ผดุงศิลป์โยธาการ จำกัด ผมรู้สึกภาคภูมิใจที่ได้เป็นส่วนหนึ่งของการพัฒนาอุตสาหกรรมพลังงานของประเทศไทย มาเป็นเวลากว่า 30 ปี"
                    : "As Managing Director of Padungsilpa Engineering Co., Ltd., I am proud to be part of Thailand's energy industry development for over 30 years."}
                </p>

                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {locale === "th"
                    ? "เราได้สร้างสรรค์โครงการสถานีบริการน้ำมันที่มีคุณภาพและปลอดภัย ด้วยเทคโนโลยี PERMATANK® ที่เป็นมาตรฐานสากล และทีมงานมืออาชีพที่มีประสบการณ์และความเชี่ยวชาญ"
                    : "We have created quality and safe fuel station projects with international standard PERMATANK® technology and professional teams with experience and expertise."}
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {locale === "th"
                    ? "เราจะยังคงมุ่งมั่นในการให้บริการที่เป็นเลิศ และสร้างสรรค์นวัตกรรมเพื่อตอบสนองความต้องการของลูกค้า และสังคมอย่างยั่งยืน"
                    : "We will continue to strive for excellent service and create innovations to meet customer and society needs sustainably."}
                </p>
              </div>

              <div className="flex items-center justify-center space-x-4 pt-6">
                <div className="w-16 h-16 bg-[var(--primary-blue)]/10 flex items-center justify-center rounded-lg">
                  <Mail className="w-8 h-8 text-[var(--primary-blue)]" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">
                    {locale === "th" ? "ติดต่อโดยตรง" : "Direct Contact"}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    md@padungsilpa.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Team Section */}
      <section className="section-minimal bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                {locale === "th" ? "ทีมงาน" : "Our Team"}
              </span>
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            </div>

            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              {locale === "th" ? "ทีมผู้บริหาร" : "Executive Team"}
            </h2>

            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {locale === "th"
                ? "ผู้นำที่มีประสบการณ์และความเชี่ยวชาญในการขับเคลื่อนองค์กรสู่ความสำเร็จ"
                : "Experienced leaders with expertise in driving organizational success"}
            </p>
          </div>

          <ExecutiveGrid locale={locale} variant="detailed" />
        </div>
      </section>
    </MainLayout>
  );
}
