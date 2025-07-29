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

      {/* Message from Management Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                สาส์นจากผู้บริหาร
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>

            {/* Managing Director Card */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200 rounded-full opacity-20 translate-y-12 -translate-x-12"></div>

                  <div className="relative z-10">
                    <div className="w-32 h-32 mx-auto mb-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl rotate-6"></div>
                      <div className="relative bg-white rounded-2xl p-1 shadow-lg">
                        <Image
                          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                          alt="คุณสุภรา สินสมุทรผดุง"
                          width={120}
                          height={120}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        คุณสุภรา สินสมุทรผดุง
                      </h3>
                      <p className="text-blue-600 font-semibold text-lg mb-4">
                        กรรมการผู้จัดการ
                      </p>
                      <div className="flex justify-center space-x-4">
                        <div className="w-12 h-0.5 bg-blue-600"></div>
                        <div className="w-6 h-0.5 bg-blue-400"></div>
                        <div className="w-3 h-0.5 bg-blue-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    <span className="text-2xl font-bold text-blue-600">
                      เรียน
                    </span>{" "}
                    ท่านลูกค้าและผู้มีส่วนได้ส่วนเสียทุกท่าน
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    ในนามของกลุ่มบริษัท ผดุงศิลป์ฯ
                    ข้าพเจ้าขอแสดงความขอบคุณทุกท่านที่ได้ให้ความไว้วางใจและสนับสนุนบริษัทของเราเสมอมา
                    พวกเรามุ่งมั่นรักษาพนักงานระดับปฏิบัติการและบริหารที่มีความเป็นเลิศ
                    โดยทุกคนมีเป้าหมายเดียวกันในการนำเสนองานก่อสร้าง สินค้า
                    และบริการที่ดีที่สุด
                    รวมถึงบุคลากรที่มีความรู้ความสามารถเป็นเยี่ยม
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    ช่างเทคนิคและผู้จัดการโครงการของเราได้รับการฝึกฝนและรับรองอย่างดี
                    และมีประสบการณ์ในอุตสาหกรรมน้ำมันและพลังงานอื่นๆ
                    เป็นอย่างมาก
                    ซึ่งเป็นการรับรองว่าผลงานและบริการของเราจะมีคุณภาพและตอบสนองต่อความต้องการของอุตสาหกรรมได้อย่างฉับไว
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    กลุ่มบริษัทในเครือ ผดุงศิลป์ฯ พร้อมเผชิญกับอุปสรรคต่างๆ
                    ในอนาคต
                    ด้วยความมุ่งมั่นที่จะนำเสนอผลงานและบริการที่มีคุณภาพดีและโดดเด่น
                    สมกับที่ทุกท่านได้ให้ความไว้วางใจเรา
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    ขอขอบพระคุณอีกครั้งสำหรับการสนับสนุนและความไว้วางใจที่มีให้กับกลุ่มบริษัท
                    ผดุงศิลป์ฯ
                    พวกเราจะยังคงมุ่งมั่นพัฒนาต่อไปเพื่อสร้างสรรค์คุณค่าและตอบสนองต่อความต้องการของทุกท่านอย่างดีที่สุด
                  </p>

                  <p className="text-blue-600 font-semibold text-lg mt-8">
                    ขอแสดงความนับถือ
                  </p>
                </div>
              </div>
            </div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {executives.map((executive, index) => (
              <div key={index} className="group text-center">
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-100 group-hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={executive.image}
                      alt={executive.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Name and Position */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {executive.name}
                  </h3>
                  <p className="text-sm text-gray-600">{executive.position}</p>
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
