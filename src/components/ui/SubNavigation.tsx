"use client";

import Link from "next/link";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

interface SubNavigationItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
}

interface SubNavigationProps {
  items: SubNavigationItem[];
  activeId: string;
  locale: string;
  backgroundImage?: string;
  title?: string;
  description?: string;
}

export default function SubNavigation({
  items,
  activeId,
  locale,
  backgroundImage = "/images/hero-sections/hero-banner-2.jpg",
  title,
  description
}: SubNavigationProps) {
  return (
    <section className="relative h-[60vh] min-h-[400px] max-h-[500px] overflow-hidden flex items-center">
      
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Navigation background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        
        {/* Refined Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/45 to-black/70"></div>
        
        {/* Subtle Glass Effects */}
        <div className="absolute inset-0">
          {/* Minimal Orbs */}
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-white/5 to-blue-300/8 rounded-full blur-xl opacity-60"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-primary-300/6 to-white/4 rounded-full blur-lg opacity-40"></div>
          
          {/* Clean Gradient Layer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/15"></div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Optional Header */}
        {(title || description) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[0.9] mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-white/85 font-light leading-relaxed max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Liquid Glass Navigation */}
        <div className="flex flex-wrap justify-center gap-4">
          {items.map((item) => {
            const isActive = item.id === activeId;
            
            return (
              <Link
                key={item.id}
                href={`/${locale}${item.href}`}
                className={`group relative flex items-center px-8 py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-white/15 backdrop-blur-sm border border-white/30 text-white shadow-md shadow-black/25"
                    : "bg-white/8 backdrop-blur-sm border border-white/15 text-white/85 hover:bg-white/12 hover:border-white/25 hover:text-white shadow-sm shadow-black/20"
                } rounded-lg`}
              >
                {/* Glass Morphism Background Effect */}
                <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-white/5 via-white/10 to-white/5"
                    : "bg-gradient-to-r from-white/0 via-white/0 to-white/0 group-hover:from-white/3 group-hover:via-white/6 group-hover:to-white/3"
                }`}></div>
                
                {/* Content */}
                <div className="relative z-10 flex items-center">
                  <item.icon className={`w-5 h-5 mr-3 transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/85 group-hover:text-white"
                  }`} />
                  <span className={`text-lg font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/85 group-hover:text-white"
                  }`}>
                    {item.title}
                  </span>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 
                                bg-gradient-to-r from-white/60 via-blue-300 to-white/60 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
