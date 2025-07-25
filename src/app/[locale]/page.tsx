"use client";

import MainLayout from "@/components/layout/MainLayout";
import StatsSection from "@/components/sections/home/StatsSection";
import ServicesSection from "@/components/sections/home/ServicesSection";
import AboutSection from "@/components/sections/home/AboutSection";
import PartnersSection from "@/components/sections/home/PartnersSection";
import CTASection from "@/components/sections/home/CTASection";

export default function Home() {
  return (
    <MainLayout>
      {/* Video Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata">
          <source
            src="https://charindas19.github.io/my-videos/Padungsilpa-GroupTH.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Brand Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            กลุ่มบริษัท ผดุงศิลป์
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            ผู้นำด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมัน ด้วยประสบการณ์กว่า
            20 ปี เราให้บริการก่อสร้าง วิศวกรรม
            และบำรุงรักษาสถานีบริการน้ำมันครบวงจรทั่วประเทศไทย
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Services Section */}
      <ServicesSection />

      {/* About Section */}
      <AboutSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* CTA Section */}
      <CTASection />
    </MainLayout>
  );
}
