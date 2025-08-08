"use client";

import { useEffect } from "react";
import {
  History,
  Award,
  Building,
  Users2,
  Target,
  Eye,
  Heart,
  Shield,
  Leaf,
  Lightbulb,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import PolicySection from "@/components/sections/pds-group/PolicySection";
import { useContentStore } from "@/store/zustand/contentStore";
import ImageSkeleton from "@/components/ui/ImageSkeleton";

interface ClientMissionCommitmentPageProps {
  locale: string;
}

export default function ClientMissionCommitmentPage({
  locale,
}: ClientMissionCommitmentPageProps) {
  const t = useTranslations();
  const { fetchContent, content, loading } = useContentStore();

  // Fetch content for VISION page
  useEffect(() => {
    fetchContent("VISION");
  }, [fetchContent]);

  // Get gallery images from content with VISION_1, VISION_2, VISION_3 IDs
  const visionContent1 = content.find((c) => c.id === "VISION_1");
  const visionContent2 = content.find((c) => c.id === "VISION_2");
  const visionContent3 = content.find((c) => c.id === "VISION_3");

  const vision1Images = visionContent1?.images_url || [];
  const vision2Images = visionContent2?.images_url || [];
  const vision3Images = visionContent3?.images_url || [];

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
                  page.id === "mission"
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

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Mission */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="w-16 h-16 bg-[var(--primary-blue)]/10 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                  <Target className="w-8 h-8 text-[var(--primary-blue)]" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {t("company.mission.section.title")}
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {t("company.mission.section.description")}
                </p>
              </div>

              {/* Mission Image */}
              <div className="relative">
                {loading ? (
                  <ImageSkeleton className="w-full h-64 rounded-lg" />
                ) : vision1Images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {vision1Images.slice(0, 4).map((image, index) => (
                      <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`Mission ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">
                      {t("common.noImagesAvailable")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Vision */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="w-16 h-16 bg-[var(--primary-blue)]/10 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                  <Eye className="w-8 h-8 text-[var(--primary-blue)]" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {t("company.vision.section.title")}
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {t("company.vision.section.description")}
                </p>
              </div>

              {/* Vision Image */}
              <div className="relative">
                {loading ? (
                  <ImageSkeleton className="w-full h-64 rounded-lg" />
                ) : vision2Images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {vision2Images.slice(0, 4).map((image, index) => (
                      <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`Vision ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">
                      {t("common.noImagesAvailable")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <Shield className="w-8 h-8 text-[var(--primary-blue)]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("company.values.safety.title")}
              </h3>
              <p className="text-gray-600">
                {t("company.values.safety.description")}
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[var(--primary-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-[var(--primary-blue)]" />
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

      {/* Policy Section */}
      <PolicySection />

      {/* Commitment Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t("company.commitment.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("company.commitment.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t("company.commitment.environment.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("company.commitment.environment.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t("company.commitment.safety.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("company.commitment.safety.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t("company.commitment.community.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("company.commitment.community.description")}
                  </p>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="relative">
              {loading ? (
                <ImageSkeleton className="w-full h-96 rounded-lg" />
              ) : vision3Images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {vision3Images.slice(0, 4).map((image, index) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Commitment ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
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
    </>
  );
}
