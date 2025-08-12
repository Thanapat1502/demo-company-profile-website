"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import MinimalCarousel from "@/components/ui/MinimalCarousel";
import ImageModal from "@/components/ui/ImageModal";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { Button } from "@heroui/react";
import PrimaryButton from "@/components/ui/PrimaryButton";

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
    <div className="space-y-8">
      {/* Luxury Carousel Container */}
      <div className="relative group">
        {/* Luxury Background Glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-primary-100/20 via-transparent to-blue-100/20
                      rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"></div>

        {/* Carousel Wrapper */}
        <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-xl overflow-hidden
                      shadow-lg hover:shadow-xl hover:shadow-primary-100/30 transition-all duration-500 ease-out">
          <MinimalCarousel
            images={companyImages}
            alt="Company Overview"
            aspectRatio="16/9"
            showNavigation={true}
            showIndicators={true}
            autoPlay={true}
            interval={5000}
            className="w-full"
            enableModal={true}
            onImageClick={(index: number) => {
              setModalImageIndex(index);
              setIsModalOpen(true);
            }}
          />

          {/* Luxury Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"></div>
        </div>
      </div>

      {/* Luxury Action Buttons */}
      <div className="flex flex-row gap-4 justify-center">
        {/* Primary Button */}
        <PrimaryButton
          onClick={handleLearnMoreClick}
          aria-label={t("home.overview.learnMore")}>

          {/* Button Content */}
          <span className="relative z-10 flex items-center justify-center gap-3">
            <span>{t("home.overview.learnMore")}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>

        </PrimaryButton>

        {/* Secondary Button */}
        <PrimaryButton
          className="group relative px-8 py-3 bg-white/90 backdrop-blur-sm border border-gray-200/60 text-gray-700
                   rounded-lg font-medium text-md tracking-wide overflow-hidden
                   hover:bg-white hover:border-primary-300/50 hover:text-primary-700
                   transition-all duration-500 ease-out hover:shadow-lg hover:shadow-primary-100/30 hover:-translate-y-0.5"
          onPress={handleViewProjectsClick}
          aria-label={t("home.overview.viewProjects")}>

          {/* Button Content */}
          <span className="relative z-10 flex items-center justify-center gap-3">
            <span>{t("home.overview.viewProjects")}</span>
            <div className="w-2 h-2 bg-current rounded-full opacity-0 group-hover:opacity-100
                          transition-all duration-300 group-hover:scale-125"></div>
          </span>

          {/* Luxury Border Glow */}
          <div className="absolute inset-0 rounded-lg border border-primary-400/0
                        group-hover:border-primary-400/30 transition-all duration-500 ease-out"></div>
        </PrimaryButton>
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
