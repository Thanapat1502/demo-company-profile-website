import ImageCarouselHero from "@/components/ui/ImageCarouselHero";

interface DynamicHeroSectionProps {
  imageUrls?: string[]; // Hero images passed from server-side
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  fallbackImages?: string[]; // Fallback images if no images from server
  autoSlideDelay?: number;
  className?: string;
}

export default function DynamicHeroSection({
  imageUrls,
  title,
  subtitle,
  description,
  children,
  fallbackImages = ["/images/hero-sections/hero-banner-1.jpg"],
  autoSlideDelay = 6000,
  className = "",
}: DynamicHeroSectionProps) {
  // Use server-provided images if available, otherwise fallback
  const imagesToUse =
    imageUrls && imageUrls.length > 0 ? imageUrls : fallbackImages;

  if (!!imagesToUse) {
    return (
      <ImageCarouselHero
        images={imagesToUse}
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
