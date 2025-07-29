"use client";

import { Building2, Users, Award, ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";
import MinimalButton from "@/components/ui/MinimalButton";

export default function ReferencePage() {
  const t = useTranslations();
  const locale = useLocale();

  const featuredProjects = [
    {
      slug: "ptt-station-bangkok",
      title: "สถานีบริการน้ำมัน PTT สาขาใหม่",
      client: "PTT Public Company Limited",
      location: "กรุงเทพมหานคร",
      completionDate: "ธันวาคม 2566",
      projectValue: "15,000,000",
      category: "สถานีบริการใหม่",
      description:
        "โครงการก่อสร้างสถานีบริการน้ำมัน PTT สาขาใหม่ พร้อมระบบ PERMATANK® และเทคโนโลยี ATG ที่ทันสมัย",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      features: [
        "หัวจ่ายน้ำมัน 8 หัว",
        "ร้านสะดวกซื้อ",
        "ระบบล้างรถอัตโนมัติ",
        "แผงโซลาร์เซลล์",
      ],
    },
    {
      slug: "shell-v-power-pattaya",
      title: "สถานีบริการน้ำมัน Shell V-Power",
      client: "Shell Thailand",
      location: "พัทยา ชลบุรี",
      completionDate: "สิงหาคม 2566",
      projectValue: "12,000,000",
      category: "สถานีบริการใหม่",
      description:
        "โครงการก่อสร้างสถานีบริการน้ำมัน Shell V-Power ด้วยแนวคิดเป็นมิตรต่อสิ่งแวดล้อม",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      features: [
        "ออกแบบเป็นมิตรต่อสิ่งแวดล้อม",
        "สถาปัตยกรรมทันสมัย",
        "ระบบเก็บน้ำฝน",
        "ระบบไฟ LED ประหยัดพลังงาน",
      ],
    },
    {
      slug: "bangchak-renovation-chiangmai",
      title: "ปรับปรุงสถานีบริการ Bangchak",
      client: "Bangchak Corporation",
      location: "เชียงใหม่",
      completionDate: "มิถุนายน 2566",
      projectValue: "8,000,000",
      category: "ปรับปรุงสถานี",
      description:
        "โครงการปรับปรุงและยกระดับสถานีบริการน้ำมัน Bangchak ให้ได้มาตรฐานสากล",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      features: [
        "อัพเกรดระบบถังน้ำมัน",
        "เพิ่มระบบความปลอดภัย",
        "ปรับปรุงประสิทธิภาพ",
        "ปฏิบัติตามมาตรฐานใหม่",
      ],
    },
    {
      slug: "esso-express-nakhon-ratchasima",
      title: "สถานีบริการ Esso Express",
      client: "Esso Thailand",
      location: "นครราชสีมา",
      completionDate: "เมษายน 2566",
      projectValue: "10,000,000",
      category: "สถานีบริการใหม่",
      description:
        "โครงการก่อสร้างสถานีบริการน้ำมัน Esso Express พร้อมระบบการจัดการที่ทันสมัย",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      features: [
        "ระบบ POS ทันสมัย",
        "พื้นที่จอดรถกว้างขวาง",
        "ระบบรักษาความปลอดภัย",
        "ห้องน้ำสะอาด",
      ],
    },
    {
      title: "สถานีบริการ Caltex StarMart",
      client: "Caltex Thailand",
      location: "หาดใหญ่ สงขลา",
      completionDate: "กุมภาพันธ์ 2566",
      projectValue: "9,500,000",
      category: "สถานีบริการใหม่",
      description:
        "โครงการก่อสร้างสถานีบริการน้ำมัน Caltex StarMart ในพื้นที่ภาคใต้",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      features: [
        "ร้านสะดวกซื้อขนาดใหญ่",
        "โซนอาหารและเครื่องดื่ม",
        "ที่จอดรถบรรทุก",
        "ระบบ Wi-Fi ฟรี",
      ],
    },
    {
      title: "สถานีบริการ Susco",
      client: "Susco Public Company Limited",
      location: "อุดรธานี",
      completionDate: "มกราคม 2566",
      projectValue: "7,800,000",
      category: "สถานีบริการใหม่",
      description:
        "โครงการก่อสร้างสถานีบริการน้ำมัน Susco ในภาคตะวันออกเฉียงเหนือ",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      features: [
        "ออกแบบเฉพาะพื้นที่",
        "ระบบระบายน้ำที่ดี",
        "พื้นที่พักผ่อน",
        "ระบบแสงสว่างเพียงพอ",
      ],
    },
  ];

  const projectStats = [
    { number: "150+", label: "โครงการที่เสร็จสิ้น" },
    { number: "80+", label: "ลูกค้าที่ไว้วางใจ" },
    { number: "25+", label: "จังหวัดทั่วประเทศ" },
    { number: "99%", label: "ความพึงพอใจ" },
  ];

  const projectTypes = [
    {
      icon: Building2,
      title: "สถานีบริการใหม่",
      description: "ก่อสร้างสถานีบริการน้ำมันใหม่ตั้งแต่เริ่มต้น",
      count: "100+",
    },
    {
      icon: Users,
      title: "ปรับปรุงสถานี",
      description: "ยกระดับและปรับปรุงสถานีบริการที่มีอยู่",
      count: "35+",
    },
    {
      icon: Award,
      title: "ให้คำปรึกษา",
      description: "บริการให้คำปรึกษาด้านวิศวกรรมและออกแบบ",
      count: "60+",
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <ImageCarouselHero
        images={["/images/hero-sections/hero-banner-1.jpg"]}
        title={`ผลงานของเรา`}
        subtitle="มากกว่า 150 โครงการ"
        description={`ผลงานการก่อสร้างสถานีบริการน้ำมัน\nที่ได้รับความไว้วางใจจากลูกค้าทั่วประเทศ`}>
        <MinimalButton
          href={`/${locale}/contact-us`}
          variant="white"
          icon={<ArrowRight className="w-5 h-5" />}>
          ติดต่อเรา
        </MinimalButton>
        <MinimalButton
          href={`/${locale}/products-services`}
          variant="secondary"
          className="border-white text-white hover:bg-white hover:text-gray-900">
          ดูบริการของเรา
        </MinimalButton>
      </ImageCarouselHero>

      {/* Project Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {projectStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-4">
                  {stat.number}
                </div>
                <div className="text-xl text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              โครงการที่เราภาคภูมิใจ
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              ผลงานที่เราภาคภูมิใจและได้รับการยอมรับจากลูกค้า
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {featuredProjects.map((project, index) => (
              <Link
                key={index}
                href={`/${locale}/reference/${project.slug}`}
                className="group cursor-pointer block">
                <article className="group cursor-pointer">
                  {/* Minimal image container */}
                  <div className="relative h-80 mb-8 overflow-hidden bg-gray-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Simple category label */}
                    <div className="absolute top-6 left-6">
                      <span className="text-xs font-medium text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 tracking-wider uppercase">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Clean content layout */}
                  <div className="space-y-6">
                    {/* Project title */}
                    <h3 className="text-2xl font-light text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Minimal project info */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <span className="w-16 text-gray-400 font-light">
                          ลูกค้า
                        </span>
                        <span className="font-medium">{project.client}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-16 text-gray-400 font-light">
                          สถานที่
                        </span>
                        <span className="font-medium">{project.location}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-16 text-gray-400 font-light">
                          เปิดให้บริการ
                        </span>
                        <span className="font-medium">
                          {project.completionDate}
                        </span>
                      </div>
                    </div>

                    {/* Project description */}
                    <p className="text-gray-600 leading-relaxed font-light">
                      {project.description}
                    </p>

                    {/* Minimal features list */}
                    <div className="space-y-2">
                      {project.features
                        .slice(0, 3)
                        .map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-start text-sm text-gray-600">
                            <span className="w-1 h-1 bg-blue-600 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                            <span className="font-light">{feature}</span>
                          </div>
                        ))}
                    </div>

                    {/* Minimal view more */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center text-blue-600 text-sm font-light opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="mr-2">ดูรายละเอียด</span>
                        <div className="w-4 h-px bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100"></div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              ประเภทโครงการ
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              บริการที่หลากหลายเพื่อตอบสนองความต้องการของลูกค้า
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projectTypes.map((type, index) => (
              <div
                key={index}
                className="text-center p-8 bg-gray-50 rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <type.icon size={40} className="text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  {type.count}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {type.title}
                </h3>
                <p className="text-base text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            เริ่มต้นโครงการของคุณ
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            ปรึกษาเราเพื่อรับคำแนะนำและข้อเสนอที่ดีที่สุดสำหรับโครงการของคุณ
          </p>

          <MinimalButton
            href={`/${locale}/contact-us`}
            variant="white"
            icon={<ArrowRight className="w-5 h-5" />}>
            เริ่มต้นโครงการ
          </MinimalButton>
        </div>
      </section>
    </MainLayout>
  );
}
