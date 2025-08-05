"use client";

import { useState, useEffect } from "react";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";
import { supabase } from "@/lib/supabase";

interface DynamicHeroSectionProps {
  pageId: string; // e.g., "about", "products-services", "news", "contact"
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  fallbackImages?: string[]; // Fallback images if no images from Supabase
  autoSlideDelay?: number;
  className?: string;
}

interface HeroContent {
  id: string;
  page: string;
  type: "gallery" | "video";
  images_url?: string[];
  video_url?: string;
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
  const [heroImages, setHeroImages] = useState<string[]>(fallbackImages);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        // Fetch hero content for the specific page
        const { data, error } = await supabase
          .from("hero_section")
          .select("*")
          .eq("id", pageId.toUpperCase())
          .single();

        if (error) {
          console.log(
            `No hero content found for ${pageId}, using fallback images`
          );
          setHeroImages(fallbackImages);
        } else if (
          data &&
          data.images_url &&
          Array.isArray(data.images_url) &&
          data.images_url.length > 0
        ) {
          // Use images from Supabase
          setHeroImages(data.images_url);
          console.log(
            `Loaded ${data.images_url.length} hero images for ${pageId}`
          );
        } else {
          // No images in database, use fallback
          setHeroImages(fallbackImages);
        }
      } catch (error) {
        console.error("Error fetching hero content:", error);
        setHeroImages(fallbackImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroContent();
  }, [pageId, fallbackImages]);

  // Show loading state with fallback images
  if (isLoading) {
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

  return (
    <ImageCarouselHero
      images={heroImages}
      title={title}
      subtitle={subtitle}
      description={description}
      autoSlideDelay={autoSlideDelay}
      className={className}>
      {children}
    </ImageCarouselHero>
  );
}
