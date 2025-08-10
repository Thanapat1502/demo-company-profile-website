"use client";

import { useEffect } from "react";
import {
  History,
  Building,
  Users2,
  Target,
  Factory,
  Truck,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import MinimalCarousel from "@/components/ui/MinimalCarousel";
import { useContentStore } from "@/store/zustand/contentStore";
import Image from "next/image";
import ImageSkeleton from "@/components/ui/ImageSkeleton";

interface ClientCompanyHistoryPageProps {
  locale: string;
}

export default function ClientCompanyHistoryPage({
  locale,
}: ClientCompanyHistoryPageProps) {
  const t = useTranslations();
  const { content, fetchContent } = useContentStore();

  // Fetch content for HISTORY page
  useEffect(() => {
    fetchContent("HISTORY");
  }, [fetchContent]);

  // Get gallery images from content with HISTORY_1 and HISTORY_2 IDs
  const galleryContent1 = content.find((c) => c.id === "HISTORY_1");
  const galleryContent2 = content.find((c) => c.id === "HISTORY_2");
  const galleryContent3 = content.find((c) => c.id === "HISTORY_3");

  const gallery1Images = galleryContent1?.images_url || [];
  const gallery2Images = galleryContent2?.images_url || [];
  const gallery3Images = galleryContent3?.images_url || [];

  useEffect(() => {
    console.log("Content:", gallery3Images);
  }, [gallery3Images]);

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
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {subPages.map((page) => (
              <Link
                key={page.id}
                href={`/${locale}${page.href}`}
                className={`flex items-center px-8 py-4 transition-all duration-300 border ${page.id === "history"
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

      {/* Company Origin Section */}
      <section className="section-minimal bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            {/* Section Label */}
            {/* <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-md text-[var(--primary-blue)]">
                {t("company.history.sectionLabel")}
              </span>
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            </div> */}

            {/* Main Heading */}
            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              {t("company.history.title")}
            </h2>

            {/* Enhanced Elegant Line */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("company.history.subtitle")}
            </p>
          </div>
          {/* Company Origin Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-0">
            <div className="space-y-8">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-[var(--primary-blue)] text-white flex items-center justify-center font-bold text-xl mr-6">
                  2507
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
                    {t("company.history.beginning.title")}
                  </h3>
                  <div className="w-20 h-px bg-[var(--primary-blue)]"></div>
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {t("company.history.beginning.description1")}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("company.history.beginning.description2")}
                </p>
              </div>
            </div>

            {/* First Carousel Gallery */}
            <div className="relative">
              {gallery1Images.length > 0 ? (
                <MinimalCarousel
                  images={gallery1Images}
                  alt={t("company.history.imageAlt")}
                  aspectRatio="4/3"
                  showNavigation={true}
                  showIndicators={true}
                  autoPlay={true}
                  interval={5000}
                  className="shadow-lg"
                />
              ) : (
                <ImageSkeleton />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Expansion and Development Section */}
      <section className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-0">
            {/* Second Carousel Gallery */}
            <div className="relative order-2 lg:order-1">
              {gallery2Images.length > 0 ? (
                <MinimalCarousel
                  images={gallery2Images}
                  alt={t("company.history.expansion.imageAlt")}
                  aspectRatio="4/3"
                  showNavigation={true}
                  showIndicators={true}
                  autoPlay={true}
                  interval={5000}
                  className="shadow-lg"
                />
              ) : (
                <ImageSkeleton />
              )}
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-[var(--primary-blue)] text-white flex items-center justify-center font-bold text-xl mr-6">
                  2520
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
                    {t("company.history.expansion.title")}
                  </h3>
                  <div className="w-20 h-px bg-[var(--primary-blue)]"></div>
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {t("company.history.expansion.description1")}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("company.history.expansion.description2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Development and Vision Section */}
      <section className="section-minimal bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-[var(--primary-blue)] text-white flex items-center justify-center font-bold text-xl mr-6">
                  2540
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
                    {t("company.history.innovation.title")}
                  </h3>
                  <div className="w-20 h-px bg-[var(--primary-blue)]"></div>
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {t("company.history.innovation.description1")}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("company.history.innovation.description2")}
                </p>
              </div>
            </div>

            <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg">
              <div className="relative w-full h-80">
                {gallery3Images.length > 0 ? (
                  <MinimalCarousel
                    images={gallery3Images}
                    alt={t("company.history.innovation.imageAlt")}
                    height="320px"
                    showNavigation={true}
                    showIndicators={true}
                    autoPlay={true}
                    interval={5000}
                    className="shadow-lg"
                  />
                ) : (
                  <ImageSkeleton />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
