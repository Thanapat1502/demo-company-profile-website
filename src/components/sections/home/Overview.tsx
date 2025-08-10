"use client";

import { useState } from "react";
import { Shield, Award, Users, Wrench, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import MinimalCarousel from "@/components/ui/MinimalCarousel";
import ImageModal from "@/components/ui/ImageModal";
import { Content } from "@/store/zustand/contentStore";

interface OverviewProps {
  gallery: Content[];
  loading?: boolean;
  locale?: string;
}

export default function Overview({
  gallery,
  loading = false,
  locale = "th",
}: OverviewProps) {
  const t = useTranslations();
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const features = [
    {
      icon: Shield,
      title: t("home.overview.features.safety.title"),
      description: t("home.overview.features.safety.description"),
    },
    {
      icon: Award,
      title: t("home.overview.features.expertise.title"),
      description: t("home.overview.features.expertise.description"),
    },
    {
      icon: Users,
      title: t("home.overview.features.support.title"),
      description: t("home.overview.features.support.description"),
    },
    {
      icon: Wrench,
      title: t("home.overview.features.technology.title"),
      description: t("home.overview.features.technology.description"),
    },
  ];

  // Extract images from gallery content
  const companyImages = gallery.length > 0 ? gallery[0]?.images_url || [] : [];

  // const companyImages = [
  //   "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   "https://images.unsplash.com/photo-1565043666747-69f6646db940?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  // ];

  // Loading state
  if (loading) {
    return (
      <section className="section-minimal bg-gradient-to-br from-gray-100 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t("common.loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-12 bg-white lg:mx-20">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 flex flex-col justify-center">
            {/* Section Label - Matching ServicesSection style */}
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                {t("home.overview.sectionLabel")}
              </span>
            </div>

            {/* Main Heading - Strong & Minimal Style */}
            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-0 tracking-[0.02em] !leading-normal drop-shadow-sm">
              {t("home.overview.title")}
              <span className="block text-[var(--primary-blue)]">
                {t("home.overview.titleHighlight")}
              </span>
            </h2>

            {/* Enhanced Elegant Line with Glow - Matching ServicesSection */}
            <div className="relative flex items-start justify-start mb-4">
              <div className="w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            {/* Description - Clean Typography */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              {t("home.overview.description")}
            </p>

            {/* Features Grid - Minimal Cards without rounded corners */}
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="card-minimal p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-[var(--primary-blue)]/10 flex items-center justify-center">
                        <feature.icon className="w-8 h-8 text-[var(--primary-blue)]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-base text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Action Buttons - Using luxury hero button style */}
            <div className="pt-4">
              <div className="luxury-hero-btn-container">
                <button
                  className="luxury-hero-btn luxury-hero-btn-primary group"
                  onClick={() => (window.location.href = "/th/pds-group")}>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span className="font-semibold tracking-wide">
                      {t("home.overview.learnMore")}
                    </span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                  <div className="luxury-btn-shimmer"></div>
                  <div className="luxury-btn-glow"></div>
                </button>

                <button
                  className="luxury-hero-btn luxury-hero-btn-secondary group"
                  onClick={() => (window.location.href = "/th/reference")}>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span className="font-semibold tracking-wide text-black">
                      {t("home.overview.viewProjects")}
                    </span>
                    <div className="w-2 h-2 bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
                  </span>
                  <div className="luxury-btn-border"></div>
                  <div className="luxury-btn-glow-secondary"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Balanced Minimal Carousel */}
          <div className="relative flex items-center justify-center w-full">
            <MinimalCarousel
              images={companyImages}
              alt="Company Overview"
              aspectRatio="16/9"
              showNavigation={true}
              showIndicators={true}
              autoPlay={true}
              interval={5000}
              className="w-full shadow-2xl"
              enableModal={true}
              onImageClick={(index) => {
                setModalImageIndex(index);
                setIsModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        images={companyImages}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={modalImageIndex}
        alt="Company Overview"
      />
    </section>
  );
}
