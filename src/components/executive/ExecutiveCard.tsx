"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, Linkedin, User, Award, Calendar } from "lucide-react";
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
      <div className="bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 overflow-hidden">
        <div className="relative w-full h-24">
          <Image
            src={displayImage}
            alt={name}
            fill
            className={`object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
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
          <p className="text-xs text-gray-600 truncate">{position}</p>
        </div>
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <div
        className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 ease-out hover:-translate-y-2"
        style={{
          animationDelay: `${index * 150}ms`,
          animation: "fadeInUp 0.8s ease-out forwards",
        }}>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

        <div className="relative p-8">
          {/* Full-width image section */}
          <div className="relative mb-6 -mx-8">
            <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
              <Image
                src={displayImage}
                alt={name}
                fill
                className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
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

              {/* Status indicator */}
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="text-center space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight group-hover:text-blue-900 transition-colors duration-500">
                {name}
              </h3>
              <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase">
                {position}
              </p>
            </div>

            {/* Decorative line */}
            <div className="flex items-center justify-center space-x-2 py-2">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-300 group-hover:to-blue-500 transition-colors duration-500"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-blue-600 transition-colors duration-500"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue-300 group-hover:to-blue-500 transition-colors duration-500"></div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center space-x-3 pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
              <button className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center text-blue-600 hover:text-blue-700 transition-all duration-300 hover:scale-110">
                <Mail className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center text-green-600 hover:text-green-700 transition-all duration-300 hover:scale-110">
                <Phone className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 bg-indigo-100 hover:bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600 hover:text-indigo-700 transition-all duration-300 hover:scale-110">
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Subtle border effect */}
        <div className="absolute inset-0 border border-transparent group-hover:border-blue-100/50 rounded-2xl transition-all duration-700 pointer-events-none"></div>
      </div>
    );
  }

  // Default minimal variant
  return (
    <div
      className="group relative bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-100/50 hover:border-gray-200/70 transition-all duration-600 ease-out hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "scaleIn 0.6s ease-out forwards",
      }}>
      {/* Minimal top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-600 origin-left"></div>

      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/40 via-white/60 to-blue-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-600"></div>

      <div className="relative p-6">
        {/* Minimal header with index */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs text-gray-500 font-light tracking-widest uppercase">
            {locale === "th" ? "ผู้บริหาร" : "Executive"}
          </div>
          <div className="w-6 h-6 bg-gray-100/80 flex items-center justify-center text-xs font-light text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-500 rounded">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Full-width image container */}
        <div className="relative mb-4 -mx-6">
          <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
            <Image
              src={displayImage}
              alt={name}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-light text-gray-900 leading-snug tracking-wide group-hover:text-gray-800 transition-colors duration-500">
            {name}
          </h3>
          <p className="text-gray-600 text-sm font-light leading-relaxed">
            {position}
          </p>

          {/* Minimal metadata */}
          <div className="flex items-center justify-center pt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
            <div className="flex items-center text-blue-600 text-xs font-light">
              <span className="mr-2 tracking-wide">
                {locale === "th" ? "ดูรายละเอียด" : "View Details"}
              </span>
              <div className="w-4 h-px bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle border effect */}
      <div className="absolute inset-0 border border-transparent group-hover:border-blue-100/40 rounded-xl transition-all duration-600 pointer-events-none"></div>
    </div>
  );
}
