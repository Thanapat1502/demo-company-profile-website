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
import MinimalButton from "@/components/ui/MinimalButton";

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
                  page.id === "history"
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

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              เส้นทางการเติบโต
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              ติดตามการพัฒนาและความก้าวหน้าของเราตลอด 5 ทศวรรษที่ผ่านมา
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}>
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="flex items-center mb-6">
                      <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-6">
                        {milestone.year}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          {milestone.title}
                        </h3>
                        <div className="w-20 h-1 bg-blue-600 rounded"></div>
                      </div>
                    </div>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                  <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                    <Image
                      src={milestone.image}
                      alt={milestone.title}
                      width={600}
                      height={400}
                      className="w-full h-80 object-cover rounded-3xl shadow-2xl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            ร่วมเป็นส่วนหนึ่งของประวัติศาสตร์
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            มาร่วมสร้างอนาคตที่ยั่งยืนไปกับเรา
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
