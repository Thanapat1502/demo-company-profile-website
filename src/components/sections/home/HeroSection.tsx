"use client";

import ImageCarouselHero from "@/components/ui/ImageCarouselHero";
import MinimalButton from "@/components/ui/MinimalButton";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <ImageCarouselHero
      images={[
        "/images/hero-sections/hero-banner-2.jpg",
        "/images/hero-sections/hero-banner-3.jpg",
        "/images/hero-sections/hero-banner-4.jpg",
        "/images/hero-sections/hero-banner-1.jpg",
      ]}
      title={`กลุ่มบริษัท\nผดุงศิลป์`}
      subtitle="ก่อตั้งเมื่อปี 2003"
      description={`ผู้นำด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมัน\nด้วยประสบการณ์กว่า 20 ปี`}
      autoSlideDelay={6000}
    >
      <MinimalButton
        href="/#services"
        variant="white"
        icon={<ArrowRight className="w-5 h-5" />}
      >
        ดูบริการของเรา
      </MinimalButton>
      <MinimalButton
        href="/contact-us"
        variant="secondary"
        className="border-white text-white hover:bg-white hover:text-gray-900"
      >
        ติดต่อเรา
      </MinimalButton>
    </ImageCarouselHero>
  );
}
