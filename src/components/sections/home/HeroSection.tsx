"use client";

import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

export default function HeroSection() {
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();

  return (
    <DynamicHeroSection
      pageId="HOME"
      title={t("home.hero.title")}
      subtitle={t("home.hero.subtitle")}
      description={t("home.hero.description")}
      fallbackImages={[
        "/images/hero-sections/hero-banner-2.jpg",
        "/images/hero-sections/hero-banner-3.jpg",
        "/images/hero-sections/hero-banner-5.jpg",
        "/images/hero-sections/hero-banner-4.jpg",
        "/images/hero-sections/hero-banner-1.jpg",
      ]}
      autoSlideDelay={6000}>
      {/* Luxury Hero Buttons */}
      <div className="luxury-hero-btn-container">
        <button
          className="luxury-hero-btn luxury-hero-btn-primary group"
          onClick={() => {
            const servicesSection = document.getElementById("services");
            servicesSection?.scrollIntoView({ behavior: "smooth" });
          }}>
          <span className="relative z-10 flex items-center justify-center gap-3">
            <span className="font-semibold tracking-wide">
              {t("home.hero.viewServices")}
            </span>
            <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
          </span>
          <div className="luxury-btn-shimmer"></div>
          <div className="luxury-btn-glow"></div>
        </button>

        <button
          className="luxury-hero-btn luxury-hero-btn-secondary group"
          onClick={() => router.push(`/${locale}/contact-us`)}>
          <span className="relative z-10 flex items-center justify-center gap-3">
            <span className="font-semibold tracking-wide">
              {t("home.hero.contactUs")}
            </span>
            <div className="w-2 h-2 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
          </span>
          <div className="luxury-btn-border"></div>
          <div className="luxury-btn-glow-secondary"></div>
        </button>
      </div>
    </DynamicHeroSection>
  );
}
