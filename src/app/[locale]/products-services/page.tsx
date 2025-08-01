"use client";

import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";
import ConstructionServiceSection from "@/components/sections/products-services/ConstructionServiceSection";
import PermatankSection from "@/components/sections/products-services/PermatankSection";
import PipeInstallationSection from "@/components/sections/products-services/PipeInstallationSection";
import ATGSystemSection from "@/components/sections/products-services/ATGSystemSection";
import TankServicesSection from "@/components/sections/products-services/TankServicesSection";
import ProductsSection from "@/components/sections/products-services/ProductsSection";

export default function ProductsServicesPage() {
  const locale = useLocale();

  const allProducts = [
    {
      name: "ถังน้ำมันใต้ดิน PERMATANK®",
      description:
        "ถังน้ำมันใต้ดินผนัง 2 ชั้น ทนทาน ปลอดภัย ได้มาตรฐานสากล UL 58 และ UL 1746 ออกแบบเพื่อความปลอดภัยสูงสุดและอายุการใช้งานยาวนาน",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "ท่อน้ำมันใต้ดินผนัง 2 ชั้น",
      description:
        "ระบบท่อน้ำมันใต้ดินที่ป้องกันการรั่วไหล มีระบบตรวจจับการรั่วไหลแบบเรียลไทม์ เหมาะสำหรับการติดตั้งในสถานีบริการน้ำมันทุกขนาด",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "ระบบวัดน้ำมันอัตโนมัติ (ATG)",
      description:
        "ระบบตรวจวัดระดับน้ำมันและการรั่วไหลแบบอัตโนมัติ เชื่อมต่อระบบคอมพิวเตอร์และ IoT สำหรับการจัดการที่มีประสิทธิภาพและทันสมัย",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "หัวจ่ายน้ำมันอัตโนมัติ",
      description:
        "หัวจ่ายน้ำมันที่ทันสมัย ปลอดภัย และมีประสิทธิภาพสูง พร้อมระบบควบคุมอัตโนมัติ ออกแบบเพื่อการใช้งานที่สะดวกและประหยัดพลังงาน",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "ระบบป้องกันการล้นถัง",
      description:
        "ระบบป้องกันการล้นถังน้ำมันที่ทันสมัย ช่วยป้องกันอุบัติเหตุและการสูญเสีย พร้อมระบบแจ้งเตือนอัตโนมัติและการติดตั้งที่ง่ายดาย",
      image:
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "ระบบดับเพลิงอัตโนมัติ",
      description:
        "ระบบดับเพลิงที่ทันสมัยและมีประสิทธิภาพสูง เพื่อความปลอดภัยสูงสุด ตรวจจับและดับเพลิงได้อย่างรวดเร็วและมีประสิทธิภาพ",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <ImageCarouselHero
        images={["/images/hero-sections/hero-banner-3.jpg"]}
        title={`ผลิตภัณฑ์และบริการ`}
        subtitle="บริการครบวงจร"
        description={`ผลิตภัณฑ์และบริการคุณภาพสูง\nสำหรับสถานีบริการน้ำมันและอุตสาหกรรมพลังงาน`}
        autoSlideDelay={6000}>
        {/* Luxury Hero Buttons */}
        <div className="luxury-hero-btn-container">
          <button
            className="luxury-hero-btn luxury-hero-btn-primary group"
            onClick={() => (window.location.href = `/${locale}/contact-us`)}>
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="font-semibold tracking-wide">ขอใบเสนอราคา</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
            </span>
            <div className="luxury-btn-shimmer"></div>
            <div className="luxury-btn-glow"></div>
          </button>

          <button
            className="luxury-hero-btn luxury-hero-btn-secondary group"
            onClick={() => (window.location.href = `/${locale}/reference`)}>
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="font-semibold tracking-wide">ดูผลงาน</span>
              <div className="w-2 h-2 bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
            </span>
            <div className="luxury-btn-border"></div>
            <div className="luxury-btn-glow-secondary"></div>
          </button>
        </div>
      </ImageCarouselHero>

      {/* Service Sections */}
      <ConstructionServiceSection />
      <PermatankSection />
      <PipeInstallationSection />
      <ATGSystemSection />
      <TankServicesSection />

      {/* Products Section */}
      <ProductsSection products={allProducts} />
    </MainLayout>
  );
}
