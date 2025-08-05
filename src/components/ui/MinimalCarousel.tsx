"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MinimalCarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  aspectRatio?: string;
  showIndicators?: boolean;
  showNavigation?: boolean;
  alt?: string;
  height?: string;
}

export default function MinimalCarousel({
  images,
  autoPlay = true,
  interval = 4000,
  className = "",
  aspectRatio = "4/5",
  showIndicators = true,
  showNavigation = false,
  alt = "Image",
  height,
}: MinimalCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [hasShownImages, setHasShownImages] = useState<Set<number>>(
    new Set([0])
  );
  const handleImageSelect = (index: number) => {
    if (index !== currentImageIndex) {
      setHasShownImages((prev) => new Set(prev).add(index));
      setCurrentImageIndex(index);
    }
  };
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, autoPlay, interval]);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative w-full overflow-hidden shadow-lg ${className}`}
      style={{
        aspectRatio: height ? undefined : aspectRatio,
        height: height || undefined,
      }}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}>
          <Image
            src={image}
            alt={`${alt} ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {showNavigation && images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
            aria-label="Previous image">
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
            aria-label="Next image">
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Image Indicators */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex gap-3 luxury-indicators-animation">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleImageSelect(index)}
              className={`relative w-12 h-1 transition-all duration-500 ease-out ${
                index === currentImageIndex
                  ? "bg-white shadow-lg"
                  : "bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}>
              {index === currentImageIndex && (
                <div className="absolute inset-0 bg-white animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
