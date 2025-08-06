"use client";

import { useState, useEffect } from "react";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";
import { useHeroStore } from "@/store/zustand/heroStore";

interface DynamicHeroSectionProps {
  pageId: string; // e.g., "HOME", "ABOUT_MAIN", "PRODUCTS_SERVICE", "NEWS", "CONTACT"
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  fallbackImages?: string[]; // Fallback images if no images from Supabase
  autoSlideDelay?: number;
  className?: string;
}

export default function DynamicHeroSection({
  pageId,
  title,
  subtitle,
  description,
  children,
  fallbackImages = ["/images/hero-sections/hero-banner-1.jpg"],
  autoSlideDelay = 6000,
  className = "",
}: DynamicHeroSectionProps) {
  // const [heroImages, setHeroImages] = useState<string[]>(fallbackImages);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const { fetchHeroImageById, pageHeroImage, loading } = useHeroStore();

  useEffect(() => {
    console.log("[DynamicHeroSection] pageId:", pageId);
    const fetchAndDebug = async () => {
      // try {
      //   console.log(
      //     `[DynamicHeroSection] Fetching /api/hero?id=${pageId.toUpperCase()}`
      //   );
      //   const res = await fetch(`/api/hero?id=${pageId.toUpperCase()}`);
      //   const result = await res.json();
      //   console.log("[DynamicHeroSection] API response:", result);
      // } catch (err) {
      //   console.error("[DynamicHeroSection] API error:", err);
      // }
      // Also call zustand fetch for normal operation
      try {
        await fetchHeroImageById(pageId.toUpperCase());
      } catch (err) {
        console.error("[DynamicHeroSection] zustand error:", err);
      }
      console.log("[DynamicHeroSection] zustand pageHeroImage:", pageHeroImage);
    };
    fetchAndDebug();
  }, [pageId]);
  // Show loading state with fallback images
  if (pageHeroImage && pageHeroImage.image_url.length > 0) {
    return (
      <ImageCarouselHero
        images={pageHeroImage.image_url}
        title={title}
        subtitle={subtitle}
        description={description}
        autoSlideDelay={autoSlideDelay}
        className={className}>
        {children}
      </ImageCarouselHero>
    );
  } else {
    return (
      <ImageCarouselHero
        images={fallbackImages}
        title={title}
        subtitle={subtitle}
        description={description}
        autoSlideDelay={autoSlideDelay}
        className={className}>
        {children}
      </ImageCarouselHero>
    );
  }
}
