"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import MinimalCarousel from "@/components/ui/MinimalCarousel";
import ImageModal from "@/components/ui/ImageModal";
import { useScrollToSection } from "@/hooks/useScrollToSection";

interface OverviewClientProps {
  companyImages: string[];
  locale: string;
}

export default function OverviewClient({ companyImages, locale }: OverviewClientProps) {
  const t = useTranslations();
  const { navigateToSection } = useScrollToSection();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const handleLearnMoreClick = () => {
    navigateToSection(`/${locale}/pds-group`);
  };

  const handleViewProjectsClick = () => {
    navigateToSection(`/${locale}/reference`);
  };

  return (
    <div>
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
          onImageClick={(index: number) => {
            setModalImageIndex(index);
            setIsModalOpen(true);
          }}
        />
      </div>

      {/* Action Buttons - Using luxury hero button style */}
      <div className="pt-4">
        <div className="luxury-hero-btn-container">
          <button
            className="luxury-hero-btn luxury-hero-btn-primary group"
            onClick={handleLearnMoreClick}
            aria-label={t("home.overview.learnMore")}>
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
            onClick={handleViewProjectsClick}
            aria-label={t("home.overview.viewProjects")}>
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

      {/* Image Modal */}
      <ImageModal
        images={companyImages}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={modalImageIndex}
        alt="Company Overview"
      />
    </div>
  );
}
