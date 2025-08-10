"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { ExecutiveType } from "@/store/zustand/executiveStore";
import { getBilingualName, getBilingualPosition } from "@/utils/bilingual";

interface ExecutiveCardProps {
  executive: ExecutiveType;
  locale: string;
  index?: number;
  variant?: "minimal" | "detailed" | "compact";
}

export default function ExecutiveCard({
  executive,
  locale,
  index = 0,
  variant = "minimal",
}: ExecutiveCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const name = getBilingualName(executive, locale);
  const position = getBilingualPosition(executive, locale);

  // Fallback image
  const fallbackImage = "/images/placeholder-executive.jpg";
  const displayImage = imageError
    ? fallbackImage
    : executive.image_url || fallbackImage;

  if (variant === "compact") {
    return (
      <div className="border border-gray-100 hover:border-gray-200 transition-all duration-300 overflow-hidden">
        <div className="relative w-full h-24">
          <Image
            src={displayImage}
            alt={name}
            fill
            quality={100}
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <User className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {name}
          </h3>
          <p className="text-lg text-gray-600 truncate">{position}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 ease-out hover:-translate-y-2 "
      style={{
        animationDelay: `${index * 150}ms`,
        animation: "fadeInUp 0.8s ease-out forwards",
      }}>
      {/* Subtle background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      {/* Top accent line - single deep blue */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--primary-blue)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

      <div className="relative p-6">
        {/* Full-width image section */}
        <div className="relative mb-6 -mx-8">
          <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
            <Image
              src={displayImage}
              alt={name}
              fill
              quality={100}
              className={`object-cover transition-all duration-700 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
        </div>

        {/* Info section */}
        <div className="text-center space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight group-hover:text-blue-900 transition-colors duration-500">
              {name}
            </h3>
            <p className="text-blue-600 font-semibold text-md tracking-wide uppercase">
              {position}
            </p>
          </div>
        </div>
      </div>

      {/* Subtle border effect */}
      <div className="absolute inset-0 border border-transparent group-hover:border-[var(--primary-blue)]/20 transition-all duration-700 pointer-events-none"></div>
    </div>
  );
}
