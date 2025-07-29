"use client";

import { useTranslations } from "next-intl";
import { Shield, Award, Users, Wrench, ArrowRight } from "lucide-react";
import MinimalButton from "@/components/ui/MinimalButton";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Overview() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const features = [
    {
      icon: Shield,
      title: "มาตรฐานความปลอดภัยสูงสุด",
      description:
        "ระบบความปลอดภัยที่ได้รับการรับรองมาตรฐานสากล UL และ STI-P3®",
    },
    {
      icon: Award,
      title: "ความเชี่ยวชาญระดับมืออาชีพ",
      description: "ทีมงานผู้เชี่ยวชาญด้านวิศวกรรมและการก่อสร้างกว่า 50 ปี",
    },
    {
      icon: Users,
      title: "บริการหลังการขายตลอด 24 ชั่วโมง",
      description: "ทีมซัพพอร์ตพร้อมให้บริการตลอดเวลาเพื่อความปลอดภัยสูงสุด",
    },
    {
      icon: Wrench,
      title: "เทคโนโลยี PERMATANK® ทันสมัย",
      description: "ถังเก็บน้ำมันใต้ดินผนัง 2 ชั้นที่ได้มาตรฐานระหว่างประเทศ",
    },
  ];

  const testimonialImages = [
    "/images/testimonial1.png",
    "/images/testimonial2.png",
    "/images/testimonial3.png",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % testimonialImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonialImages.length]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <div className="space-y-6 flex flex-col justify-center">
            <span className="inline-block w-fit px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-base font-medium mb-4">
              เกี่ยวกับเรา
            </span>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 leading-tight">
              บริษัทผู้นำด้าน
              <span className="text-blue-600 block">
                การก่อสร้างสถานีบริการน้ำมัน
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              {`เรามุ่งมั่นรักษามาตรฐานสูงสุดด้านคุณภาพสินค้าและบริการ
              พร้อมให้คำปรึกษาผู้เชี่ยวชาญเพื่อพัฒนาอย่างต่อเนื่อง
              และคำนึงถึงความปลอดภัยของพนักงานและลูกค้าทุกท่าน ภายใต้แนวคิด
              'ถูกต้อง ถูกหลักดี ทันสมัย ปลอดภัย'`}
            </p>

            {/* Features Grid */}
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <feature.icon className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-base text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <MinimalButton
                href="/th/pds-group"
                variant="primary"
                icon={<ArrowRight className="w-5 h-5" />}>
                เรียนรู้เพิ่มเติม
              </MinimalButton>
              <MinimalButton href="/th/reference" variant="secondary">
                ดูผลงาน
              </MinimalButton>
            </div>
          </div>

          {/* Right Content - Parallax Images & Features */}
          <div className="relative flex items-center">
            {/* Parallax Images Container */}
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
              {testimonialImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}>
                  <Image
                    src={image}
                    alt={`Testimonial ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              ))}

              {/* Image Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {testimonialImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
