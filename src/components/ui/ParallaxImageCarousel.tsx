"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ParallaxImageCarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  aspectRatio?: string;
  showIndicators?: boolean;
  alt?: string;
}

export default function ParallaxImageCarousel({
  images,
  autoPlay = true,
  interval = 4000,
  className = "",
  aspectRatio = "4/5",
  showIndicators = true,
  alt = "Image",
}: ParallaxImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [images.length, autoPlay, interval]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div 
      className={`relative w-full overflow-hidden rounded-3xl shadow-2xl ${className}`}
      style={{ aspectRatio }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`${alt} ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      ))}

      {/* Image Indicators */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
