"use client";

import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@heroui/react";
import PrimaryButton from "@/components/ui/PrimaryButton";

interface HeroSectionProps {
  heroImages?: string[];
}

export default function HeroSection({ heroImages }: HeroSectionProps) {
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();

  return (
    <DynamicHeroSection
      imageUrls={heroImages}
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
        <PrimaryButton
          onPress={() => {
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
        </PrimaryButton>

        <PrimaryButton
          size="lg"
          variant="light"
          className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:shadow-primary-glow"
          onPress={() => router.push(`/${locale}/contact-us`)}>
          <span className="relative z-10 flex items-center justify-center gap-3">
            <span className="font-semibold tracking-wide">
              {t("home.hero.contactUs")}
            </span>
            <div className="w-2 h-2 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
          </span>
          <div className="luxury-btn-border"></div>
          <div className="luxury-btn-glow-secondary"></div>
        </PrimaryButton>
      </div>
    </DynamicHeroSection>
  );
}
