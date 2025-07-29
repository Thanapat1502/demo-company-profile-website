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
  Eye,
  Heart,
  Shield,
  Leaf,
  Lightbulb,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";
import MinimalButton from "@/components/ui/MinimalButton";

export default function MissionCommitmentPage() {
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

  const commitments = [
    {
      icon: Shield,
      title: "ความปลอดภัย",
      description:
        "มุ่งมั่นในการรักษามาตรฐานความปลอดภัยสูงสุดในทุกโครงการ เพื่อปกป้องพนักงาน ลูกค้า และชุมชน",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Leaf,
      title: "ความยั่งยืน",
      description:
        "ดำเนินธุรกิจอย่างรับผิดชอบต่อสิ่งแวดล้อม และสนับสนุนการพัฒนาที่ยั่งยืน",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Heart,
      title: "ความซื่อสัตย์",
      description:
        "ยึดมั่นในความโปร่งใส ความจริงใจ และการดำเนินธุรกิจด้วยจริยธรรม",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: Lightbulb,
      title: "นวัตกรรม",
      description:
        "พัฒนาเทคโนโลยีและนวัตกรรมใหม่ๆ เพื่อตอบสนองความต้องการของลูกค้าอย่างต่อเนื่อง",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: Users2,
      title: "การทำงานเป็นทีม",
      description:
        "ส่งเสริมการทำงานร่วมกันอย่างมีประสิทธิภาพ และการพัฒนาศักยภาพของทีมงาน",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Award,
      title: "ความเป็นเลิศ",
      description:
        "มุ่งมั่นสู่ความเป็นเลิศในทุกด้านของการดำเนินงาน และการให้บริการที่เหนือความคาดหมาย",
      color: "bg-blue-100 text-blue-600",
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <ImageCarouselHero
        images={["/images/hero-sections/hero-banner-4.jpg"]}
        title={`วิสัยทัศน์และพันธกิจ`}
        subtitle="หลักการและค่านิยม"
        description={`มุ่งมั่นสู่ความเป็นเลิศ\nด้วยความรับผิดชอบต่อสังคม`}
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
                  page.id === "mission"
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

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Mission */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                  <Target size={40} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    พันธกิจ
                  </h2>
                  <div className="w-20 h-1 bg-blue-600 rounded"></div>
                </div>
              </div>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
                เป็นผู้นำในการให้บริการด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมันที่มีคุณภาพสูง
                ด้วยเทคโนโลยีที่ทันสมัย ทีมงานมืออาชีพ
                และการบริการที่เหนือความคาดหมาย
                เพื่อสร้างความพึงพอใจสูงสุดให้กับลูกค้าและผู้มีส่วนได้ส่วนเสีย
              </p>
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Mission"
                width={600}
                height={400}
                className="w-full h-80 object-cover rounded-3xl shadow-2xl"
              />
            </div>

            {/* Vision */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mr-6">
                  <Eye size={40} className="text-green-600" />
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    วิสัยทัศน์
                  </h2>
                  <div className="w-20 h-1 bg-green-600 rounded"></div>
                </div>
              </div>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
                เป็นบริษัทชั้นนำในภูมิภาคเอเชียตะวันออกเฉียงใต้
                ด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมันและพลังงาน
                ที่ได้รับการยอมรับในด้านคุณภาพ ความปลอดภัย และความยั่งยืน
                พร้อมขยายธุรกิจสู่เทคโนโลยีพลังงานสะอาดในอนาคต
              </p>
              <Image
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Vision"
                width={600}
                height={400}
                className="w-full h-80 object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              ความมุ่งมั่นของเรา
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              หลักการและค่านิยมที่เรายึดถือในการดำเนินธุรกิจอย่างยั่งยืน
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commitments.map((commitment, index) => (
              <div
                key={index}
                className="text-center p-8 bg-gray-50 rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div
                  className={`w-20 h-20 ${commitment.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <commitment.icon size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {commitment.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {commitment.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            ร่วมสร้างอนาคตที่ยั่งยืน
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            มาร่วมเป็นส่วนหนึ่งในการสร้างสรรค์โครงการที่มีคุณค่าไปกับเรา
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
