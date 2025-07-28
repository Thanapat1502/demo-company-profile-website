"use client";

import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/sections/home/HeroSection";
// import StatsSection from "@/components/sections/home/StatsSection";
// import AboutSection from "@/components/sections/home/AboutSection";
import ServicesSection from "@/components/sections/home/ServicesSection";
// import CTASection from "@/components/sections/home/CTASection";


export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <ServicesSection />
      {/* <StatsSection />
      <AboutSection />
      <CTASection /> */}
    </MainLayout>
  );
}
