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
  Mail,
  Phone,
  Linkedin,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";
import MinimalButton from "@/components/ui/MinimalButton";

export default function ExecutiveTeamPage() {
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
      name: "นายประสิทธิ์ ก่อสร้าง",
      position: "ผู้อำนวยการฝ่ายโครงการ",
      department: "การก่อสร้าง",
      experience: "18+ ปี",
      education:
        "วิศวกรรมศาสตรบัณฑิต สาขาโยธา มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
      expertise: ["การจัดการโครงการ", "การก่อสร้างสถานีบริการ", "ควบคุมคุณภาพ"],
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "นางสาวอรุณี คุณภาพ",
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
      {/* Hero Section */}
      <ImageCarouselHero
        images={["/images/hero-sections/hero-banner-3.jpg"]}
        title={`ทีมผู้บริหาร`}
        subtitle="ผู้นำที่มีประสบการณ์"
        description={`ทีมผู้บริหารมืออาชีพ\nที่มีความเชี่ยวชาญในแต่ละสาขา`}
        autoSlideDelay={6000}>
        <MinimalButton
          href={`/${locale}/contact-us`}
          variant="white"
          icon={<ArrowRight className="w-5 h-5" />}>
          ติดต่อเรา
        </MinimalButton>
      </ImageCarouselHero>

      {/* Sub Navigation */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {subPages.map((page) => (
              <Link
                key={page.id}
                href={`/${locale}${page.href}`}
                className={`flex items-center px-8 py-4 rounded-2xl transition-all duration-300 ${
                  page.id === "team"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}>
                <page.icon className="w-5 h-5 mr-3" />
                <span className="text-lg font-medium">{page.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              ทีมผู้บริหาร
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              ผู้นำที่มีประสบการณ์และความเชี่ยวชาญในการขับเคลื่อนองค์กรสู่ความสำเร็จ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executives.map((executive, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-80">
                  <Image
                    src={executive.image}
                    alt={executive.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      {executive.name}
                    </h3>
                    <p className="text-blue-200 text-lg">
                      {executive.position}
                    </p>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-base text-gray-600">
                        ประสบการณ์
                      </span>
                      <span className="text-base font-semibold text-blue-600">
                        {executive.experience}
                      </span>
                    </div>
                    <div className="mb-4">
                      <span className="text-base text-gray-600 block mb-2">
                        การศึกษา
                      </span>
                      <p className="text-base text-gray-900">
                        {executive.education}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      ความเชี่ยวชาญ
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {executive.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            พร้อมที่จะร่วมงานกับทีมมืออาชีพ?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            ติดต่อเราเพื่อปรึกษาโครงการของคุณกับทีมผู้เชี่ยวชาญ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MinimalButton
              href={`/${locale}/contact-us`}
              variant="white"
              icon={<ArrowRight className="w-5 h-5" />}>
              ติดต่อเรา
            </MinimalButton>
            <MinimalButton
              href={`/${locale}/reference`}
              variant="secondary"
              className="border-white text-white hover:bg-white hover:text-blue-600">
              ดูผลงานของเรา
            </MinimalButton>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
