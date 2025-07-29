"use client";

import {
  MapPin,
  Calendar,
  DollarSign,
  Building2,
  Users,
  Award,
  ArrowRight,
  ExternalLink,
  Star,
  CheckCircle,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";
import MinimalButton from "@/components/ui/MinimalButton";

export default function ReferencePage() {
  const t = useTranslations();
  const locale = useLocale();

  const featuredProjects = [
    {
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
        images={[
          "/images/hero-sections/hero-banner-1.jpg",
          "/images/hero-sections/hero-banner-2.jpg",
          "/images/hero-sections/hero-banner-3.jpg",
          "/images/hero-sections/hero-banner-4.jpg",
        ]}
        title={`ผลงานของเรา\nโครงการที่ภาคภูมิใจ`}
        subtitle="มากกว่า 150 โครงการ"
        description={`ผลงานการก่อสร้างสถานีบริการน้ำมัน\nที่ได้รับความไว้วางใจจากลูกค้าทั่วประเทศ`}
        autoSlideDelay={6000}>
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
              โครงการเด่น
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              ผลงานที่เราภาคภูมิใจและได้รับการยอมรับจากลูกค้า
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Building2 size={16} className="mr-2 text-blue-600" />
                      {project.client}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2 text-blue-600" />
                      {project.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2 text-blue-600" />
                      {project.completionDate}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign size={16} className="mr-2 text-blue-600" />฿
                      {parseInt(project.projectValue).toLocaleString()}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      จุดเด่นของโครงการ:
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {project.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-600">
                          <CheckCircle
                            size={16}
                            className="mr-3 text-green-600"
                          />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
                    <ExternalLink size={16} className="mr-2" />
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
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
