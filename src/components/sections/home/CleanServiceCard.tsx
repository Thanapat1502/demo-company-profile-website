'use client';

import { ServiceType } from "@/store/zustand/servicesStore";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface CleanServiceCardProps {
  service: ServiceType;
  locale: string;
  index: number;
  isActive: boolean;
  onHover: (id: string | null) => void;
}

export default function CleanServiceCard({
  service,
  locale,
  index,
  isActive,
  onHover,
}: CleanServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100 + (index * 50));
    return () => clearTimeout(timer);
  }, [index]);

  const serviceName = locale === 'th' ? service.name_th : service.name_en;
  const serviceDescription = locale === 'th' ? service.description_th : service.description_en;

  const handleMouseEnter = useCallback(() => onHover(service.id), [service.id, onHover]);
  const handleMouseLeave = useCallback(() => onHover(null), [onHover]);

  return (
    <article
      className={`group relative transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Clean Professional Card */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-500 ease-out hover:shadow-lg hover:-translate-y-1">

        {/* Image Container */}
        <div className="relative h-48 bg-gray-50 overflow-hidden">
          {service.image_url ? (
            <>
              <Image
                src={service.image_url}
                alt={serviceName}
                fill
                className={`object-cover transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Loading State */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="w-12 h-12 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors duration-500 ease-out">
            {serviceName}
          </h3>

          {/* Description with Smooth Expansion */}
          <div className="mb-4 relative overflow-hidden">
            <div className="transition-all duration-[2000ms] ease-out group-hover:max-h-40 md:max-h-24">
              <p className="text-md text-gray-600 leading-relaxed line-clamp-none md:line-clamp-3 group-hover:line-clamp-6">
                {serviceDescription}
              </p>
            </div>
            {/* Fade overlay for truncated text */}
            {/* <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white via-white/80 to-transparent opacity-100 group-hover:opacity-0 transition-all duration-500 ease-out pointer-events-none" /> */}
          </div>

          {/* Action Link */}
          <Link href={`/${locale}/products-services`} className="flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-400 transition-colors duration-500 ease-out">
            <span>{locale === 'th' ? 'ดูรายละเอียด' : 'Learn More'}</span>
            <svg className="w-4 h-4 ml-2 transition-transform duration-500 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
