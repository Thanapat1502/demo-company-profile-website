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
      {/* Sub Navigation */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {subPages.map((page) => (
              <Link
                key={page.id}
                href={`/${locale}${page.href}`}
                className={`flex items-center px-8 py-4 transition-all duration-300 border ${
                  page.id === "history"
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

      {/* Company History Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t("company.history.timeline.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("company.history.timeline.description")}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[var(--primary-blue)]/20"></div>

            {/* Timeline items */}
            <div className="space-y-16">
              {/* 2003 - Foundation */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h3 className="text-2xl font-bold text-[var(--primary-blue)] mb-2">
                      2003
                    </h3>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      {t("company.history.milestones.foundation.title")}
                    </h4>
                    <p className="text-gray-600">
                      {t("company.history.milestones.foundation.description")}
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[var(--primary-blue)] rounded-full border-4 border-white shadow-lg"></div>
                <div className="flex-1 pl-8">
                  {gallery1Images.length > 0 ? (
                    <MinimalCarousel
                      images={gallery1Images}
                      className="w-full h-48 rounded-lg shadow-lg"
                      showIndicators={true}
                      autoPlay={true}
                      interval={4000}
                    />
                  ) : (
                    <ImageSkeleton className="w-full h-48 rounded-lg" />
                  )}
                </div>
              </div>

              {/* 2010 - Expansion */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8">
                  {gallery2Images.length > 0 ? (
                    <MinimalCarousel
                      images={gallery2Images}
                      className="w-full h-48 rounded-lg shadow-lg"
                      showIndicators={true}
                      autoPlay={true}
                      interval={4000}
                    />
                  ) : (
                    <ImageSkeleton className="w-full h-48 rounded-lg" />
                  )}
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[var(--primary-blue)] rounded-full border-4 border-white shadow-lg"></div>
                <div className="flex-1 pl-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h3 className="text-2xl font-bold text-[var(--primary-blue)] mb-2">
                      2010
                    </h3>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      {t("company.history.milestones.expansion.title")}
                    </h4>
                    <p className="text-gray-600">
                      {t("company.history.milestones.expansion.description")}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2020 - Innovation */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h3 className="text-2xl font-bold text-[var(--primary-blue)] mb-2">
                      2020
                    </h3>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      {t("company.history.milestones.innovation.title")}
                    </h4>
                    <p className="text-gray-600">
                      {t("company.history.milestones.innovation.description")}
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[var(--primary-blue)] rounded-full border-4 border-white shadow-lg"></div>
                <div className="flex-1 pl-8">
                  {gallery3Images.length > 0 ? (
                    <MinimalCarousel
                      images={gallery3Images}
                      className="w-full h-48 rounded-lg shadow-lg"
                      showIndicators={true}
                      autoPlay={true}
                      interval={4000}
                    />
                  ) : (
                    <ImageSkeleton className="w-full h-48 rounded-lg" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t("company.history.achievements.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("company.history.achievements.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[var(--primary-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Factory className="w-8 h-8 text-[var(--primary-blue)]" />
              </div>
              <h3 className="text-3xl font-bold text-[var(--primary-blue)] mb-2">
                500+
              </h3>
              <p className="text-gray-600">
                {t("company.history.achievements.projects")}
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[var(--primary-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users2 className="w-8 h-8 text-[var(--primary-blue)]" />
              </div>
              <h3 className="text-3xl font-bold text-[var(--primary-blue)] mb-2">
                50+
              </h3>
              <p className="text-gray-600">
                {t("company.history.achievements.employees")}
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[var(--primary-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-[var(--primary-blue)]" />
              </div>
              <h3 className="text-3xl font-bold text-[var(--primary-blue)] mb-2">
                20+
              </h3>
              <p className="text-gray-600">
                {t("company.history.achievements.years")}
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[var(--primary-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-[var(--primary-blue)]" />
              </div>
              <h3 className="text-3xl font-bold text-[var(--primary-blue)] mb-2">
                100%
              </h3>
              <p className="text-gray-600">
                {t("company.history.achievements.satisfaction")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
