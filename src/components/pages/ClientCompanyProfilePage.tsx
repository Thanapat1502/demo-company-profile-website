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
import { useContentStore } from "@/store/zustand/contentStore";
import ImageSkeleton from "@/components/ui/ImageSkeleton";
import MinimalCarousel from "@/components/ui/MinimalCarousel";

interface ClientCompanyProfilePageProps {
  locale: string;
}

export default function ClientCompanyProfilePage({
  locale,
}: ClientCompanyProfilePageProps) {
  const t = useTranslations();
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
    <>
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
                    ? "bg-[var(--primary-blue)] text-white border-[var(--primary-blue)]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[var(--primary-blue)] hover:text-[var(--primary-blue)]"
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

      {/* Company Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
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

            {/* Image Gallery */}
            <div className="relative">
              {loading ? (
                <ImageSkeleton className="w-full h-96 rounded-lg" />
              ) : contentImage && contentImage.length > 0 ? (
                <MinimalCarousel
                  images={contentImage}
                  className="w-full h-96 rounded-lg shadow-xl"
                  showIndicators={true}
                  autoPlay={true}
                  interval={5000}
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">
                    {t("common.noImagesAvailable")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t("company.values.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("company.values.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[var(--primary-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-[var(--primary-blue)]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("company.values.excellence.title")}
              </h3>
              <p className="text-gray-600">
                {t("company.values.excellence.description")}
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[var(--primary-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-[var(--primary-blue)]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("company.values.integrity.title")}
              </h3>
              <p className="text-gray-600">
                {t("company.values.integrity.description")}
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[var(--primary-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-[var(--primary-blue)]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("company.values.innovation.title")}
              </h3>
              <p className="text-gray-600">
                {t("company.values.innovation.description")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
