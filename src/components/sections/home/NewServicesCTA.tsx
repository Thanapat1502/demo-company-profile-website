'use client';

import { useTranslations } from "next-intl";
import { useState } from "react";
import ClientServicesInteractions from "./ClientServicesInteractions";

interface NewServicesCTAProps {
  locale: string;
  isVisible: boolean;
}

export default function NewServicesCTA({
  locale,
  isVisible,
}: NewServicesCTAProps) {
  const t = useTranslations();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`text-center transition-all duration-800 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>

      {/* Compact CTA Container */}
      <div
        className="relative bg-white-glass/60 backdrop-blur-2xl border border-white/30 shadow-glass-strong rounded-2xl p-6 md:p-8 max-w-3xl mx-auto overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {/* Background Atmosphere */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 w-64 h-64 -translate-x-1/2 bg-gradient-radial from-primary-300/30 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-radial from-blue-200/25 to-transparent rounded-full blur-xl" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary-400/60 rounded-full animate-float-particle"
              style={{
                left: `${20 + i * 12}%`,
                top: `${15 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + (i % 2)}s`
              }}
            />
          ))}
        </div>

        {/* Compact Content */}
        <div className="relative z-10 space-y-6">

          {/* Condensed CTA Title */}
          <div className="space-y-3">
            <h3 className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 tracking-tight transition-all duration-500 ${isHovered ? 'scale-105' : 'scale-100'
              }`}>
              {t("home.services.cta.title")}
            </h3>

            <p className="text-base text-gray-700 leading-relaxed max-w-xl mx-auto">
              {t("home.services.cta.description")}
            </p>
          </div>

          {/* Minimal Divider */}
          <div className="relative flex items-center justify-center">
            <div className={`h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent transition-all duration-500 ${isHovered ? 'w-24' : 'w-16'
              }`} />
            <div className="absolute w-1.5 h-1.5 bg-primary-300 rounded-full shadow-primary-glow" />
          </div>

          {/* Compact CTA Button Container */}
          <div className="relative">
            <div className={`bg-white-glass/80 backdrop-blur-sm border border-white/40 rounded-xl p-4 shadow-glass transition-all duration-500 ${isHovered ? 'shadow-glass-strong border-primary-200/50' : ''
              }`}>
              <div className={`transform transition-all duration-300 ${isHovered ? 'scale-105' : 'scale-100'
                }`}>
                <ClientServicesInteractions locale={locale} />
              </div>
            </div>
          </div>
        </div>

        {/* Hover Effects */}
        <div className={`absolute inset-0 bg-gradient-to-t from-primary-500/0 via-transparent to-primary-300/0 transition-all duration-700 pointer-events-none ${isHovered ? 'opacity-5' : 'opacity-0'
          }`} />

        {/* Shine Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out pointer-events-none ${isHovered ? 'translate-x-full' : '-translate-x-full'
          }`} />

        {/* Border Glow */}
        <div className={`absolute inset-0 rounded-3xl border-2 border-transparent transition-all duration-500 pointer-events-none ${isHovered ? 'border-primary-300/40' : ''
          }`} />
      </div>

      {/* Floating Shadow */}
      <div className={`absolute inset-0 bg-primary-400/15 rounded-3xl blur-2xl transition-all duration-500 transform translate-y-4 -z-10 ${isHovered ? 'opacity-60 translate-y-8' : 'opacity-0'
        }`} />
    </div>
  );
}
