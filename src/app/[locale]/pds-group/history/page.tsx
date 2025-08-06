"use client";

import { useEffect } from "react";
import {
  History,
  Building,
  Users2,
  Target,
  Factory,
  Truck,
} from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import HeroButtons from "@/components/ui/HeroButtons";
import MinimalCarousel from "@/components/ui/MinimalCarousel";
import { useContentStore } from "@/store/zustand/contentStore";
import Image from "next/image";

export default function CompanyHistoryPage() {
  const locale = useLocale();
  const { content, fetchContent } = useContentStore();

  // Fetch content for HISTORY page
  useEffect(() => {
    fetchContent("HISTORY");
  }, [fetchContent]);

  // Get gallery images from content with HISTORY_1 and HISTORY_2 IDs
  const galleryContent1 = content.find((c) => c.id === "HISTORY_1");
  const galleryContent2 = content.find((c) => c.id === "HISTORY_2");

  const gallery1Images = galleryContent1?.images_url || [];
  const gallery2Images = galleryContent2?.images_url || [];

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
      {/* Hero Section */}
      <DynamicHeroSection
        pageId="ABOUT_HISTORY"
        title={locale === "th" ? "ประวัติความเป็นมา" : "Company History"}
        subtitle={
          locale === "th" ? "เส้นทางแห่งความสำเร็จ" : "Journey of Success"
        }
        description={
          locale === "th"
            ? "มากกว่า 50 ปีแห่งประสบการณ์\nในอุตสาหกรรมการก่อสร้างสถานีบริการน้ำมัน"
            : "Over 50 years of experience\nin fuel station construction industry"
        }
        fallbackImages={["/images/hero-sections/hero-banner-1.jpg"]}
        autoSlideDelay={6000}>
        <HeroButtons />
      </DynamicHeroSection>

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

      {/* Company Origin Section */}
      <section className="section-minimal bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Section Label */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                {locale === "th" ? "ประวัติศาสตร์" : "History"}
              </span>
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              {locale === "th" ? "ประวัติความเป็นมา" : "Company Origin"}
            </h2>

            {/* Enhanced Elegant Line */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {locale === "th"
                ? "ติดตามการพัฒนาและความก้าวหน้าของเราตลอด 5 ทศวรรษที่ผ่านมา"
                : "Follow our development and progress over the past 5 decades"}
            </p>
          </div>
          {/* Company Origin Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <div className="space-y-8">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-[var(--primary-blue)] text-white flex items-center justify-center font-bold text-xl mr-6">
                  2507
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
                    {locale === "th" ? "จุดเริ่มต้น" : "The Beginning"}
                  </h3>
                  <div className="w-20 h-px bg-[var(--primary-blue)]"></div>
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {locale === "th"
                    ? "กลุ่มบริษัทผดุงศิลป์ได้เริ่มต้นธุรกิจเกี่ยวกับสถานีบริการน้ำมันในปี 2507 ในชื่อ ห้างหุ้นส่วนจำกัด ผดุงศิลป์การช่าง ก่อตั้งโดยคุณอำนวย สินสมุทรผดุง ซึ่งเป็นผู้ที่มีประสบการณ์และความเชี่ยวชาญในงานก่อสร้าง"
                    : "Padungsilpa Group started its fuel station business in 1964 under the name Padungsilpa Engineering Limited Partnership, founded by Mr. Amnuay Sinsamutphadung, who had extensive experience and expertise in construction work."}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {locale === "th"
                    ? "ในช่วงแรกของการดำเนินธุรกิจ บริษัทมุ่งเน้นการให้บริการด้านการก่อสร้างและติดตั้งระบบต่างๆ ในสถานีบริการน้ำมัน โดยเฉพาะการติดตั้งถังน้ำมันและระบบท่อส่งน้ำมัน"
                    : "In the early days of business operations, the company focused on providing construction and installation services for various systems in fuel stations, particularly the installation of fuel tanks and fuel piping systems."}
                </p>
              </div>
            </div>

            {/* First Carousel Gallery */}
            <div className="relative">
              {gallery1Images.length > 0 ? (
                <MinimalCarousel
                  images={gallery1Images}
                  alt={locale === "th" ? "ประวัติบริษัท" : "Company History"}
                  aspectRatio="4/3"
                  showNavigation={true}
                  showIndicators={true}
                  autoPlay={true}
                  interval={5000}
                  className="shadow-lg"
                />
              ) : (
                <div className="w-full h-80 bg-gray-200 flex items-center justify-center shadow-lg">
                  <div className="text-center text-gray-500">
                    <Factory className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-sm">
                      {locale === "th"
                        ? "รูปภาพประวัติบริษัท"
                        : "Company History Images"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Expansion and Development Section */}
      <section className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            {/* Second Carousel Gallery */}
            <div className="relative">
              {gallery2Images.length > 0 ? (
                <MinimalCarousel
                  images={gallery2Images}
                  alt={locale === "th" ? "การขยายธุรกิจ" : "Business Expansion"}
                  aspectRatio="4/3"
                  showNavigation={true}
                  showIndicators={true}
                  autoPlay={true}
                  interval={5000}
                  className="shadow-lg"
                />
              ) : (
                <div className="w-full h-80 bg-gray-200 flex items-center justify-center shadow-lg">
                  <div className="text-center text-gray-500">
                    <Truck className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-sm">
                      {locale === "th"
                        ? "รูปภาพการขยายธุรกิจ"
                        : "Business Expansion Images"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-[var(--primary-blue)] text-white flex items-center justify-center font-bold text-xl mr-6">
                  2520
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
                    {locale === "th" ? "การขยายธุรกิจ" : "Business Expansion"}
                  </h3>
                  <div className="w-20 h-px bg-[var(--primary-blue)]"></div>
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {locale === "th"
                    ? "ในปี 2520 บริษัทได้ขยายขอบเขตการดำเนินงานและเปลี่ยนแปลงเป็น บริษัท ผดุงศิลป์โยธาการ จำกัด เพื่อรองรับการเติบโตของธุรกิจและการให้บริการที่หลากหลายมากขึ้น"
                    : "In 1977, the company expanded its scope of operations and transformed into Padungsilpa Engineering Co., Ltd. to accommodate business growth and more diverse services."}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {locale === "th"
                    ? "การขยายธุรกิจในช่วงนี้ทำให้บริษัทสามารถรับงานโครงการขนาดใหญ่มากขึ้น และเริ่มพัฒนาความเชี่ยวชาญในด้านเทคโนโลยีการจัดเก็บน้ำมันที่ทันสมัย"
                    : "The business expansion during this period enabled the company to take on larger projects and began developing expertise in modern fuel storage technology."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Development and Vision Section */}
      <section className="section-minimal bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-[var(--primary-blue)] text-white flex items-center justify-center font-bold text-xl mr-6">
                  2540
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
                    {locale === "th"
                      ? "นวัตกรรมและเทคโนโลยี"
                      : "Innovation & Technology"}
                  </h3>
                  <div className="w-20 h-px bg-[var(--primary-blue)]"></div>
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {locale === "th"
                    ? "บริษัทได้นำเข้าเทคโนโลยี PERMATANK® จากประเทศเยอรมนี ซึ่งเป็นระบบถังน้ำมันใต้ดินที่มีมาตรฐานสูงและปลอดภัย ทำให้บริษัทกลายเป็นผู้นำในด้านเทคโนโลยีการจัดเก็บน้ำมันในประเทศไทย"
                    : "The company imported PERMATANK® technology from Germany, which is a high-standard and safe underground fuel tank system, making the company a leader in fuel storage technology in Thailand."}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {locale === "th"
                    ? "ด้วยประสบการณ์กว่า 50 ปี เราพร้อมให้บริการครบวงจร ตั้งแต่การออกแบบ ก่อสร้าง ติดตั้งระบบ และบำรุงรักษา เพื่อตอบสนองความต้องการของลูกค้าอย่างครบถ้วน"
                    : "With over 50 years of experience, we are ready to provide comprehensive services from design, construction, system installation, and maintenance to fully meet customer needs."}
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center shadow-lg">
                <Image
                  src={
                    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  }
                  alt="Padungsilpa Group Office"
                  className="w-full h-96 object-cover shadow-lg"
                  width={600}
                  height={400}
                />
                {/* <div className="text-center text-[var(--primary-blue)]">
                  <Globe className="w-16 h-16 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">
                    {locale === "th" ? "วิสัยทัศน์" : "Vision"}
                  </h4>
                  <p className="text-sm max-w-xs">
                    {locale === "th"
                      ? "มุ่งมั่นเป็นผู้นำด้านเทคโนโลยีการจัดเก็บน้ำมันที่ปลอดภัยและเป็นมิตรต่อสิ่งแวดล้อม"
                      : "Committed to being a leader in safe and environmentally friendly fuel storage technology"}
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
