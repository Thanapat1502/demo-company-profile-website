"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ImageCarouselHeroProps {
  images: string[];
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  autoSlideDelay?: number;
}

export default function ImageCarouselHero({
  images,
  title,
  description,
  children,
  className = "",
  autoSlideDelay = 5000,
}: ImageCarouselHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasShownImages, setHasShownImages] = useState<Set<number>>(new Set([0])); // Track which images have been shown
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide functionality with smooth transitions
  useEffect(() => {
    if (images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        // Mark the new image as shown for entrance animation
        setHasShownImages(prev => new Set(prev).add(nextIndex));
        return nextIndex;
      });
    }, autoSlideDelay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, autoSlideDelay]);

  // Handle component mount animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Function to handle manual image selection with entrance animation
  const handleImageSelect = (index: number) => {
    if (index !== currentImageIndex) {
      setHasShownImages(prev => new Set(prev).add(index));
      setCurrentImageIndex(index);
    }
  };

  return (
    <section className={`relative h-screen min-h-screen flex items-center justify-center overflow-hidden hero-section ${className}`}>

      {/* Luxury Image Carousel Background with Entrance Animations */}
      <div className="absolute inset-0">
        {images.map((image, index) => {
          const isActive = index === currentImageIndex;
          const isFirstTime = !hasShownImages.has(index);

          return (
            <div
              key={index}
              className={`absolute inset-0 ${isActive
                ? isFirstTime
                  ? 'luxury-image-entrance opacity-100 scale-105'
                  : 'opacity-100 scale-105 transition-all duration-2000 ease-out'
                : 'opacity-0 scale-100 transition-all duration-2000 ease-out'
                }`}
            >
              <Image
                src={image}
                alt={`Hero image ${index + 1}`}
                fill
                className={`object-cover ${isActive && isFirstTime
                  ? 'luxury-image-zoom-entrance'
                  : 'transition-transform duration-[8000ms] ease-out'
                  }`}
                priority={index === 0}
                quality={95}
                style={{
                  transform: isActive ? 'scale(1.1)' : 'scale(1.05)'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Elegant Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50 z-10"></div>

      {/* Luxury Content Container */}
      <div className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex items-center justify-center min-h-screen transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
        <div className="max-w-5xl mx-auto">

          {/* Main Title with Luxury Animation */}
          <h1 className="luxury-title-animation text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-8 leading-[0.85] tracking-tight">
            <span className="inline-block luxury-text-reveal" style={{ animationDelay: '0.2s' }}>
              {title.split(' ').map((word, index) => (
                <span
                  key={index}
                  className="inline-block luxury-word-animation mr-4 last:mr-0"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>

          {/* Description with Elegant Fade-in */}
          {description && (
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 max-w-4xl mx-auto font-light leading-relaxed luxury-description-animation whitespace-pre-wrap">
              {description}
            </p>
          )}

          {/* Action Buttons with Staggered Animation */}
          {children && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center luxury-buttons-animation">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 luxury-scroll-indicator">
        <div className="flex flex-col items-center">
          <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          </div>
          <div className="mt-2 text-white/60 text-xs uppercase tracking-widest font-light">Scroll</div>
        </div>
      </div>

      {/* Luxury Carousel Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex gap-3 luxury-indicators-animation">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleImageSelect(index)}
              className={`relative w-12 h-1 transition-all duration-500 ease-out ${index === currentImageIndex
                ? 'bg-white shadow-lg'
                : 'bg-white/30 hover:bg-white/60'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentImageIndex && (
                <div className="absolute inset-0 bg-white animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Luxury Decorative Elements */}
      <div className="absolute top-8 left-8 z-20 luxury-corner-decoration">
        <div className="w-16 h-16 border-l-2 border-t-2 border-white/20"></div>
      </div>
      <div className="absolute top-8 right-8 z-20 luxury-corner-decoration">
        <div className="w-16 h-16 border-r-2 border-t-2 border-white/20"></div>
      </div>
      <div className="absolute bottom-8 left-8 z-20 luxury-corner-decoration">
        <div className="w-16 h-16 border-l-2 border-b-2 border-white/20"></div>
      </div>
      <div className="absolute bottom-8 right-8 z-20 luxury-corner-decoration">
        <div className="w-16 h-16 border-r-2 border-b-2 border-white/20"></div>
      </div>
    </section>
  );
}
