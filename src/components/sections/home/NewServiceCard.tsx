'use client';

import { ServiceType } from "@/store/zustand/servicesStore";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface NewServiceCardProps {
  service: ServiceType;
  locale: string;
  index: number;
  isActive: boolean;
  onHover: (id: string | null) => void;
}

export default function NewServiceCard({
  service,
  locale,
  index,
  isActive,
  onHover,
}: NewServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200 + (index * 100));
    return () => clearTimeout(timer);
  }, [index]);

  const serviceName = locale === 'th' ? service.name_th : service.name_en;
  const serviceDescription = locale === 'th' ? service.description_th : service.description_en;

  const handleMouseEnter = useCallback(() => onHover(service.id), [service.id, onHover]);
  const handleMouseLeave = useCallback(() => onHover(null), [onHover]);

  return (
    <div
      className={`group relative transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Clean Professional Card */}
      <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary-300 hover:shadow-lg will-change-transform">

        {/* Compact Image Container */}
        <div className="relative h-40 overflow-hidden">
          {service.image_url ? (
            <>
              <Image
                src={service.image_url}
                alt={serviceName}
                fill
                className={`object-cover transition-all duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

              {/* Loading Placeholder */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-blue-100 flex items-center justify-center">
              <div className="w-16 h-16 bg-primary-200/50 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          )}

          {/* Floating Badge */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
            <div className="bg-white-glass backdrop-blur-sm border border-white/40 rounded-full p-2 shadow-glass">
              <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Compact Content Container */}
        <div className="p-4">
          {/* Service Title */}
          <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors duration-300">
            {serviceName}
          </h3>

          {/* Service Description */}
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-3">
            {serviceDescription}
          </p>

          {/* Action Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors duration-300">
              <span>Learn More</span>
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

        {/* Border Highlight */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-300/30 transition-all duration-500 pointer-events-none" />
      </div>

      {/* Floating Shadow */}
      <div className="absolute inset-0 bg-primary-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500 transform translate-y-4 group-hover:translate-y-6 -z-10" />
    </div>
  );
}
