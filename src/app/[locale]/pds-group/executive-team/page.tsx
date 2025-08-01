"use client";

import {
  History,
  Calendar,
  Award,
  Building,
  ArrowRight,
  Users2,
  Target,
  Mail,
  Phone,
  Linkedin,
} from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";

export default function ExecutiveTeamPage() {
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

  const executives = [
    {
      name: "นายสมชาย ผดุงศิลป์",
      position: "ประธานกรรมการบริหาร",
      department: "บริหารทั่วไป",
      experience: "35+ ปี",
      education: "วิศวกรรมศาสตรบัณฑิต สาขาโยธา จุฬาลงกรณ์มหาวิทยาลัย",
      expertise: ["การบริหารจัดการองค์กร", "วิศวกรรมโยธา", "การพัฒนาธุรกิจ"],
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "นางสาวสุดา เจริญศิลป์",
      position: "กรรมการผู้จัดการ",
      department: "บริหารทั่วไป",
      experience: "25+ ปี",
      education: "บริหารธุรกิจมหาบัณฑิต มหาวิทยาลัยธรรมศาสตร์",
      expertise: ["การบริหารการเงิน", "การตลาด", "การพัฒนาทรัพยากรมนุษย์"],
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "นายวิชัย เทคโนโลยี",
      position: "ผู้อำนวยการฝ่ายวิศวกรรม",
      department: "วิศวกรรม",
      experience: "20+ ปี",
      education: "วิศวกรรมศาสตรมหาบัณฑิต สาขาเครื่องกล มหาวิทยาลัยเกษตรศาสตร์",
      expertise: ["ระบบ PERMATANK®", "ระบบ ATG", "วิศวกรรมปิโตรเลียม"],
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "นางสาวปิยะดา คุณภาพ",
      position: "ผู้อำนวยการฝ่ายควบคุมคุณภาพ",
      department: "ควบคุมคุณภาพ",
      experience: "15+ ปี",
      education:
        "วิศวกรรมศาสตรบัณฑิต สาขาอุตสาหการ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ",
      expertise: ["ระบบมาตรฐาน ISO", "ควบคุมคุณภาพ", "ความปลอดภัย"],
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "นายสมศักดิ์ บริการ",
      position: "ผู้อำนวยการฝ่ายบริการหลังการขาย",
      department: "บริการลูกค้า",
      experience: "12+ ปี",
      education:
        "วิศวกรรมศาสตรบัณฑิต สาขาเครื่องกล มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
      expertise: ["บำรุงรักษาระบบ", "บริการลูกค้า", "การฝึกอบรม"],
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <MainLayout>
      <ImageCarouselHero
        images={["/images/hero-sections/hero-banner-3.jpg"]}
        title="ทีมผู้บริหาร"
        subtitle="ผู้นำที่มีประสบการณ์"
        description="ทีมผู้บริหารมืออาชีพ ที่มีความเชี่ยวชาญในแต่ละสาขา"
        autoSlideDelay={6000}>
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
                สาส์นจากผู้บริหาร
              </span>
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            </div>

            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              สาส์นจากผู้บริหาร
            </h2>

            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 opacity-20 -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200 opacity-20 translate-y-12 -translate-x-12"></div>

                <div className="relative z-10">
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-blue)] to-indigo-600 rotate-6"></div>
                    <div className="relative bg-white p-1 shadow-lg">
                      <Image
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="คุณสุภรา สินสมุทรผดุง"
                        width={120}
                        height={120}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
                      คุณสุภรา สินสมุทรผดุง
                    </h3>
                    <p className="text-[var(--primary-blue)] font-semibold text-lg mb-4">
                      กรรมการผู้จัดการ
                    </p>
                    <div className="flex justify-center space-x-4">
                      <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
                      <div className="w-6 h-px bg-[var(--primary-blue)]/60"></div>
                      <div className="w-3 h-px bg-[var(--primary-blue)]/30"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  ในฐานะกรรมการผู้จัดการของบริษัท ผดุงศิลป์โยธาการ จำกัด
                  ผมรู้สึกภาคภูมิใจที่ได้เป็นส่วนหนึ่งของการพัฒนาอุตสาหกรรมพลังงานของประเทศไทย
                  มาเป็นเวลากว่า 30 ปี
                </p>

                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  เราได้สร้างสรรค์โครงการสถานีบริการน้ำมันที่มีคุณภาพและปลอดภัย
                  ด้วยเทคโนโลยี PERMATANK® ที่เป็นมาตรฐานสากล
                  และทีมงานมืออาชีพที่มีประสบการณ์และความเชี่ยวชาญ
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  เราจะยังคงมุ่งมั่นในการให้บริการที่เป็นเลิศ
                  และสร้างสรรค์นวัตกรรมเพื่อตอบสนองความต้องการของลูกค้า
                  และสังคมอย่างยั่งยืน
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-6">
                <div className="w-16 h-16 bg-[var(--primary-blue)]/10 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-[var(--primary-blue)]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">ติดต่อโดยตรง</p>
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
                ทีมงาน
              </span>
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            </div>

            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              ทีมผู้บริหาร
            </h2>

            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              ผู้นำที่มีประสบการณ์และความเชี่ยวชาญในการขับเคลื่อนองค์กรสู่ความสำเร็จ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executives.map((executive, index) => (
              <div
                key={index}
                className="group text-center card-minimal p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto overflow-hidden bg-gray-100 group-hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={executive.image}
                      alt={executive.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                    {executive.name}
                  </h3>
                  <p className="text-sm text-gray-600">{executive.position}</p>
                  <p className="text-xs text-[var(--primary-blue)] font-medium">
                    {executive.experience}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
