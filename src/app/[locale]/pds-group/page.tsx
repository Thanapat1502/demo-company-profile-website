"use client";

import { useEffect } from "react";
import {
  Users,
  Award,
  Target,
  Heart,
  Building,
  History,
  Users2,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import DynamicHeroSection from "@/components/sections/DynamicHeroSection";
import HeroButtons from "@/components/ui/HeroButtons";
import { useContentStore } from "@/store/zustand/contentStore";
import ImageSkeleton from "@/components/ui/ImageSkeleton";
import MinimalCarousel from "@/components/ui/MinimalCarousel";

export default function CompanyProfilePage() {
  const t = useTranslations();
  const locale = useLocale();
  const { fetchContentById, contentDetail, loading } = useContentStore();
  const contentImage =
    Array.isArray(contentDetail?.images_url) &&
    contentDetail.images_url.length > 0
      ? contentDetail.images_url
      : undefined; // Content store state for ABOUT content image

  // Fetch content images on component mount
  useEffect(() => {
    const fetchContentImages = async () => {
      try {
        await fetchContentById("ABOUT");
      } catch (error) {
        console.error("Failed to fetch content images:", error);
      }
    };

    fetchContentImages();
  }, [fetchContentById]);

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

  return (
    <MainLayout>
      {/* Hero Section - Using DynamicHeroSection for consistency */}
      <DynamicHeroSection
        title={t("company.overview.title")}
        subtitle={t("company.overview.subtitle")}
        description={t("company.overview.description")}
        fallbackImages={[
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        ]}
        autoSlideDelay={6000}>
        <HeroButtons />
      </DynamicHeroSection>

      {/* Sub Navigation - Minimal design without rounded corners */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {subPages.map((page) => (
              <Link
                key={page.id}
                href={`/${locale}${page.href}`}
                className={`flex items-center px-8 py-4 transition-all duration-300 border ${
                  page.id === "overview"
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

      {/* Company Overview - Strong & Minimal Style */}
      <section className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Section Label - Matching ServicesSection style */}
              <div className="inline-flex items-center gap-3">
                <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
                <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                  {t("company.overview.aboutUs")}
                </span>
              </div>

              {/* Main Heading - Strong & Minimal Style */}
              <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-0 tracking-[0.02em] !leading-normal drop-shadow-sm">
                {t("company.overview.title")}
              </h2>

              {/* Enhanced Elegant Line with Glow */}
              <div className="relative flex items-start justify-start mb-4">
                <div className="w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
                <div className="absolute w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
              </div>

              {/* Description - Clean Typography */}
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>{t("company.overview.content.paragraph1")}</p>
                <p>{t("company.overview.content.paragraph2")}</p>
                <p>{t("company.overview.content.paragraph3")}</p>
              </div>
            </div>
            {/* About Image from ABOUT content */}
            <div>
              {loading || !contentImage || contentImage.length === 0 ? (
                <ImageSkeleton
                  width="100%"
                  height="384px"
                  rounded="lg"
                  animation="shimmer"
                  className="shadow-lg"
                />
              ) : (
                <div className="w-full max-w-full overflow-hidden">
                  <div className="w-full h-96 max-w-full overflow-hidden">
                    <MinimalCarousel
                      images={contentImage}
                      alt="Padungsilpa Group Office"
                      aspectRatio="16/9"
                      showNavigation={true}
                      showIndicators={true}
                      autoPlay={true}
                      interval={5000}
                      className="shadow-lg w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Company Values - Strong & Minimal Style */}
      <section className="section-minimal bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Main Heading - Strong & Minimal Style */}
            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              {t("company.values.title")}
            </h2>

            {/* Enhanced Elegant Line with Glow */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("company.values.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: t("company.values.excellence.title"),
                description: t("company.values.excellence.description"),
              },
              {
                icon: Users,
                title: t("company.values.teamwork.title"),
                description: t("company.values.teamwork.description"),
              },
              {
                icon: Heart,
                title: t("company.values.integrity.title"),
                description: t("company.values.integrity.description"),
              },
              {
                icon: Award,
                title: t("company.values.innovation.title"),
                description: t("company.values.innovation.description"),
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-8 card-minimal hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-20 h-20 bg-[var(--primary-blue)]/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon
                    size={40}
                    className="text-[var(--primary-blue)]"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  {value.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Using primary color and luxury buttons */}
      <section
        className="section-minimal"
        style={{ background: "var(--primary-blue)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
            {t("company.cta.title")}
          </h2>

          {/* Enhanced Elegant Line with Glow */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></div>
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"></div>
          </div>

          <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("company.cta.description")}
          </p>

          <div className="flex justify-center">
            <HeroButtons />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
