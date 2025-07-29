"use client";

import { useState } from "react";
import {
  Users,
  Award,
  Target,
  Eye,
  Heart,
  ArrowRight,
  Building,
  History,
  Users2,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";
import MinimalButton from "@/components/ui/MinimalButton";

export default function CompanyProfilePage() {
  const t = useTranslations();
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState("overview");

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
      {/* Hero Section */}
      <HeroSection
        title="กลุ่มบริษัท ผดุงศิลป์"
        subtitle="ผู้นำด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมัน"
        description="ด้วยประสบการณ์กว่า 50 ปี เราให้บริการก่อสร้าง วิศวกรรม และบำรุงรักษาสถานีบริการน้ำมันครบวงจรทั่วประเทศไทย"
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        primaryAction={{
          label: "ติดต่อเรา",
          href: "/contact-us",
        }}
        secondaryAction={{
          label: "ผลงานของเรา",
          href: "/reference",
        }}
        height="lg"
      />

      {/* Sub Navigation */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {subPages.map((page) => (
              <Link
                key={page.id}
                href={`/${locale}${page.href}`}
                className={`flex items-center px-8 py-4 rounded-2xl transition-all duration-300 ${
                  page.id === "overview"
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

      {/* Company Overview */}
      <Section background="white" padding="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              เกี่ยวกับเรา
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
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
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              ค่านิยมองค์กร
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
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
                className="text-center p-8 bg-gray-50 rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon size={40} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-base text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            พร้อมที่จะร่วมงานกับเรา?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            ติดต่อเราวันนี้เพื่อปรึกษาโครงการของคุณ
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
