"use client";

import { useEffect } from "react";
import {
  History,
  Award,
  Building,
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
import PolicySection from "@/components/sections/pds-group/PolicySection";
import { useContentStore } from "@/store/zustand/contentStore";
import ImageSkeleton from "@/components/ui/ImageSkeleton";

interface ClientMissionCommitmentPageProps {
  locale: string;
}

export default function ClientMissionCommitmentPage({
  locale,
}: ClientMissionCommitmentPageProps) {
  const t = useTranslations();
  const { fetchContent, content, loading } = useContentStore();

  // Fetch content for VISION page
  useEffect(() => {
    fetchContent("VISION");
  }, [fetchContent]);

  // Get gallery images from content with VISION_1, VISION_2, VISION_3 IDs
  const vision1 = content.find((c) => c.id === "VISION_1")?.images_url[0];
  const vision2 = content.find((c) => c.id === "VISION_2")?.images_url[0];

  const subPages = [
    {
      id: "overview",
      title: t("company.navigation.overview"),
      icon: Building,
      href: `/pds-group`,
    },
    {
      id: "history",
      title: t("company.navigation.history"),
      icon: History,
      href: `/pds-group/history`,
    },
    {
      id: "team",
      title: t("company.navigation.team"),
      icon: Users2,
      href: `/pds-group/executive-team`,
    },
    {
      id: "mission",
      title: t("company.navigation.mission"),
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
      color: "bg-[var(--primary-blue)]/10 text-[var(--primary-blue)]",
    },
    {
      icon: Leaf,
      title: "ความยั่งยืน",
      description:
        "ดำเนินธุรกิจอย่างรับผิดชอบต่อสิ่งแวดล้อม และสนับสนุนการพัฒนาที่ยั่งยืน",
      color: "bg-[var(--primary-blue)]/10 text-[var(--primary-blue)]",
    },
    {
      icon: Heart,
      title: "ความซื่อสัตย์",
      description:
        "ยึดมั่นในความโปร่งใส ความจริงใจ และการดำเนินธุรกิจด้วยจริยธรรม",
      color: "bg-[var(--primary-blue)]/10 text-[var(--primary-blue)]",
    },
    {
      icon: Lightbulb,
      title: "นวัตกรรม",
      description:
        "พัฒนาเทคโนโลยีและนวัตกรรมใหม่ๆ เพื่อตอบสนองความต้องการของลูกค้าอย่างต่อเนื่อง",
      color: "bg-[var(--primary-blue)]/10 text-[var(--primary-blue)]",
    },
    {
      icon: Users2,
      title: "การทำงานเป็นทีม",
      description:
        "ส่งเสริมการทำงานร่วมกันอย่างมีประสิทธิภาพ และการพัฒนาศักยภาพของทีมงาน",
      color: "bg-[var(--primary-blue)]/10 text-[var(--primary-blue)]",
    },
    {
      icon: Award,
      title: "ความเป็นเลิศ",
      description:
        "มุ่งมั่นสู่ความเป็นเลิศในทุกด้านของการดำเนินงาน และการให้บริการที่เหนือความคาดหมาย",
      color: "bg-[var(--primary-blue)]/10 text-[var(--primary-blue)]",
    },
  ];

  return (
    <>
      {/* Sub Navigation */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {subPages.map((page) => (
              <Link
                key={page.id}
                href={`/${locale}${page.href}`}
                className={`flex items-center px-8 py-4 transition-all duration-300 border ${
                  page.id === "mission"
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

      {/* Mission & Vision */}
      <section className="section-minimal bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Mission */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <div className="w-20 h-20 bg-[var(--primary-blue)]/10 flex items-center justify-center mr-6">
                  <Target size={40} className="text-[var(--primary-blue)]" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-2 tracking-tight">
                    พันธกิจ
                  </h2>
                  <div className="w-20 h-px bg-[var(--primary-blue)]"></div>
                </div>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                เป็นผู้นำในการให้บริการด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมันที่มีคุณภาพสูง
                ด้วยเทคโนโลยีที่ทันสมัย ทีมงานมืออาชีพ
                และการบริการที่เหนือความคาดหมาย
                เพื่อสร้างความพึงพอใจสูงสุดให้กับลูกค้าและผู้มีส่วนได้ส่วนเสีย
              </p>
              {/* Mission Image from VISION_1 content */}
              {loading || !vision1 ? (
                <ImageSkeleton
                  width="100%"
                  height="320px"
                  rounded="lg"
                  animation="shimmer"
                  className="shadow-lg"
                />
              ) : (
                <Image
                  src={vision1}
                  alt="Mission"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover shadow-lg"
                />
              )}
            </div>

            {/* Vision */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <div className="w-20 h-20 bg-[var(--primary-blue)]/10 flex items-center justify-center mr-6">
                  <Eye size={40} className="text-[var(--primary-blue)]" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-2 tracking-tight">
                    วิสัยทัศน์
                  </h2>
                  <div className="w-20 h-px bg-[var(--primary-blue)]"></div>
                </div>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                เป็นบริษัทชั้นนำในภูมิภาคเอเชียตะวันออกเฉียงใต้
                ด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมันและพลังงาน
                ที่ได้รับการยอมรับในด้านคุณภาพ ความปลอดภัย และความยั่งยืน
                พร้อมขยายธุรกิจสู่เทคโนโลยีพลังงานสะอาดในอนาคต
              </p>

              {/* Vision Image from VISION_2 content */}
              {loading || !vision2 ? (
                <ImageSkeleton
                  width="100%"
                  height="320px"
                  rounded="lg"
                  animation="shimmer"
                  className="shadow-lg"
                />
              ) : (
                <Image
                  src={vision2}
                  alt="Vision"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover shadow-lg"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Section Label */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                {t("company.mission.commitments.sectionLabel")}
              </span>
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              {t("company.mission.commitments.title")}
            </h2>

            {/* Enhanced Elegant Line */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              หลักการและค่านิยมที่เรายึดถือในการดำเนินธุรกิจอย่างยั่งยืน
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commitments.map((commitment, index) => (
              <div
                key={index}
                className="text-center p-8 card-minimal hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div
                  className={`w-20 h-20 ${commitment.color} flex items-center justify-center mx-auto mb-6`}>
                  <commitment.icon size={40} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 tracking-tight">
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

      {/* Policy Section - Company Operating Policy */}
      <PolicySection />
    </>
  );
}
