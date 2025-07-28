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
  subtitle,
  description,
  children,
  className = "",
  autoSlideDelay = 5000,
}: ImageCarouselHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTextMasks, setShowTextMasks] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide functionality
  useEffect(() => {
    if (images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoSlideDelay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, autoSlideDelay]);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle initial load and text mask timing
  useEffect(() => {
    // Simulate loading time
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);

      // After 3 seconds, hide text masks to show normal content
      setTimeout(() => {
        setShowTextMasks(false);
      }, 300);
    }, 300);

    return () => clearTimeout(loadTimer);
  }, []);

  return (
    <section className={`relative h-screen min-h-screen flex items-center justify-center overflow-hidden hero-section parallax-optimized ${className}`}>

      {/* Image Carousel Background */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              src={image}
              alt={`Hero image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
            />
          </div>
        ))}
      </div>

      {/* Text Masks - Show construction image through text for 3 seconds */}
      <div className={`absolute inset-0 z-30 transition-opacity duration-1000 ${showTextMasks ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
        {/* Semi-transparent white background for better text visibility */}
        <div className="absolute inset-0 bg-white/90"></div>

        {/* Container for text mask effect - EXACT same positioning as normal content with parallax */}
        <div
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex items-center justify-center min-h-screen hero-parallax-text"
          style={{
            transform: `translateY(${-scrollY * 0.1}px)`,
          }}
        >
          <div className="max-w-4xl mx-auto">
            {/* {subtitle && (
              <div className="mb-6 animate-[fadeIn_1s_ease-out_0.5s_both]">
                <span
                  className="inline-block px-6 py-3 font-medium tracking-wide uppercase text-md video-text-mask transition-all duration-500"
                  style={{
                    background: `url(${images[currentImageIndex]}) center/cover fixed`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'white', // Fallback to match normal text
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  {subtitle}
                </span>
              </div>
            )} */}

            <h1
              className="text-7xl sm:text-7xl whitespace-pre-wrap md:whitespace-nowrap md:text-6xl lg:text-7xl xl:text-8xl heading-construction-white mb-8 leading-tight video-text-mask transition-all duration-500 "
              style={{
                background: `url(${images[currentImageIndex]}) center/cover fixed`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'var(--primary-blue)' // Fallback
              }}
            >
              {title}
            </h1>

            {description && (
              <p
                className="text-xl md:text-2xl text-construction-white mb-12 max-w-3xl mx-auto video-text-mask whitespace-break-spaces transition-all duration-500 animate-[fadeIn_1s_ease-out_1.1s_both]"
                style={{
                  background: `url(${images[currentImageIndex]}) center/cover fixed`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'var(--primary-blue)' // Fallback
                }}
              >
                {description}
              </p>
            )}

            {children && (
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-[fadeIn_1s_ease-out_1.4s_both]">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dark Overlay for Text Readability when images are visible */}
      <div className={`absolute inset-0 bg-black/40 z-10 transition-opacity duration-1000 ${showTextMasks ? 'opacity-0' : 'opacity-100'
        }`}></div>

      {/* Content - Only visible when text masks are hidden - EXACT same positioning with parallax */}
      <div
        className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex items-center justify-center min-h-screen transition-all duration-1000 hero-parallax-text ${showTextMasks ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        style={{
          transform: `translateY(${-scrollY * 0.1}px)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          {/* {subtitle && (
            <div className="mb-6">
              <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 text-white font-medium tracking-wide uppercase text-sm">
                {subtitle}
              </span>
            </div>
          )} */}

          <h1 className="text-7xl sm:text-7xl whitespace-pre-wrap md:whitespace-nowrap md:text-6xl lg:text-7xl xl:text-8xl heading-construction-white mb-8 leading-tight animate-[fadeIn_1s_ease-out_0.8s_both]">
            {title}
          </h1>

          {description && (
            <p className="text-xl md:text-2xl text-construction-white mb-12 max-w-3xl mx-auto font-[900] whitespace-break-spaces animate-[fadeIn_1s_ease-out_1.1s_both]">
              {description}
            </p>
          )}

          {children && (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-[fadeIn_1s_ease-out_1.4s_both]">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator - Only visible when images are showing */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-1000 ${showTextMasks ? 'opacity-0' : 'opacity-100'
        }`}>
        <div className="w-px h-16 bg-white/60 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-transparent to-white/60"></div>
        </div>
      </div>

      {/* Carousel Indicators */}
      {images.length > 1 && (
        <div className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 transition-opacity duration-1000 ${showTextMasks ? 'opacity-0' : 'opacity-100'
          }`}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 transition-all duration-300 ${index === currentImageIndex
                ? 'bg-white'
                : 'bg-white/50 hover:bg-white/75'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
