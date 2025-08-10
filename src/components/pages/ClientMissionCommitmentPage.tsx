"use client";

import { useEffect, useState } from "react";
import {
  History,
  Award,
  Building,
  Users2,
  Target,
  Heart,
  Shield,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
} from "lucide-react";
import { useTranslations } from "next-intl";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch content for VISION page
  useEffect(() => {
    fetchContent("VISION");
  }, [fetchContent]);

  // Get gallery images from content with VISION_1, VISION_2, VISION_3 IDs
  const vision1 = content.find((c) => c.id === "VISION_1")?.images_url[0];
  const vision2 = content.find((c) => c.id === "VISION_2")?.images_url[0];
  const vision3 = content.find((c) => c.id === "VISION_3")?.images_url[0];

  // Carousel images for the mission section
  const carouselImages = [vision1, vision2, vision3].filter(Boolean);

  // Auto-rotate carousel
  useEffect(() => {
    if (carouselImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [carouselImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

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

  const commitments = [
    {
      icon: Shield,
      title: t("company.mission.commitments.safety.title"),
      description: t("company.mission.commitments.safety.description"),
      color: "bg-[var(--primary-blue)]/10 text-[var(--primary-blue)]",
    },
    {
      icon: Leaf,
      title: t("company.mission.commitments.sustainability.title"),
      description: t("company.mission.commitments.sustainability.description"),
      color: "bg-[var(--primary-blue)]/10 text-[var(--primary-blue)]",
    },
    {
      icon: Heart,
      title: t("company.mission.commitments.integrity.title"),
      description: t("company.mission.commitments.integrity.description"),
      color: "bg-[var(--primary-blue)]/10 text-[var(--primary-blue)]",
    },
    {
      icon: Lightbulb,
      title: t("company.mission.commitments.innovation.title"),
      description: t("company.mission.commitments.innovation.description"),
      color: "bg-[var(--primary-blue)]/10 text-[var(--primary-blue)]",
    },
    {
      icon: Users2,
      title: t("company.mission.commitments.teamwork.title"),
      description: t("company.mission.commitments.teamwork.description"),
      color: "bg-[var(--primary-blue)]/10 text-[var(--primary-blue)]",
    },
    {
      icon: Award,
      title: t("company.mission.commitments.excellence.title"),
      description: t("company.mission.commitments.excellence.description"),
      color: "bg-[var(--primary-blue)]/10 text-[var(--primary-blue)]",
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
                className={`flex items-center px-8 py-4 transition-all duration-300 border ${page.id === "mission"
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

      {/* Mission & Commitment Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-[var(--primary-blue)] mb-6 tracking-tight">
              {t("missionPage.heroTitle")}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              {t("missionPage.heroSubtitle")}
            </p>
            <div className="w-24 h-px bg-[var(--primary-blue)] mx-auto mt-8"></div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Mission Statement */}
            <div className="space-y-12">
              {/* Mission Statement */}
              <div>
                <div className="flex items-center mb-6">
                  <h2 className="text-3xl font-bold text-[var(--primary-blue)]">
                    {t("missionPage.missionTitle")}
                  </h2>
                </div>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>{t("missionPage.missionParagraph1")}</p>
                  <p>{t("missionPage.missionParagraph2")}</p>
                  <p>{t("missionPage.missionParagraph3")}</p>
                </div>
              </div>

              {/* Commitment */}
              <div>
                <div className="flex items-center mb-6">
                  <h2 className="text-3xl font-bold text-[var(--primary-blue)]">
                    {t("missionPage.commitmentTitle")}
                  </h2>
                </div>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>{t("missionPage.commitmentParagraph1")}</p>
                  <p>{t("missionPage.commitmentParagraph2")}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Image Carousel */}
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden shadow-2xl bg-gray-100">
                {loading || carouselImages.length === 0 ? (
                  <ImageSkeleton
                    width="100%"
                    height="100%"
                    animation="shimmer"
                    className="absolute inset-0"
                  />
                ) : (
                  <>
                    {carouselImages.map((image, index) => (
                      image && (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}>
                          <Image
                            src={image}
                            alt={`Mission image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority={index === 0}
                          />
                        </div>
                      )
                    ))}

                    {/* Carousel Controls */}
                    {carouselImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
                          <ChevronLeft size={24} className="text-gray-700" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
                          <ChevronRight size={24} className="text-gray-700" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                          {carouselImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-3 h-3 transition-all duration-300 ${index === currentImageIndex
                                ? 'bg-white scale-125'
                                : 'bg-white/60 hover:bg-white/80'
                                }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Section Label */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                {t("company.mission.commitments.sectionLabel")}
              </span>
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              {t("company.mission.commitments.title")}
            </h2>

            {/* Enhanced Elegant Line */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("company.mission.commitments.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commitments.map((commitment, index) => (
              <div
                key={index}
                className="text-center p-8 card-minimal hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div
                  className={`w-20 h-20 ${commitment.color} flex items-center justify-center mx-auto mb-6`}>
                  <commitment.icon size={40} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 tracking-tight">
                  {commitment.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {commitment.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Section - Company Operating Policy */}
      <PolicySection />
    </>
  );
}
