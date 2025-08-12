'use client';

import { useTranslations } from "next-intl";
import { useState } from "react";
import ClientServicesInteractions from "./ClientServicesInteractions";

interface CleanServicesCTAProps {
  locale: string;
  isVisible: boolean;
}

export default function CleanServicesCTA({
  locale,
  isVisible,
}: CleanServicesCTAProps) {
  const t = useTranslations();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`text-center transition-opacity duration-500 delay-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      
      {/* Clean CTA Container */}
      <div 
        className="bg-white border border-gray-200 rounded-lg p-8 md:p-12 max-w-2xl mx-auto transition-all duration-200 hover:border-primary-300 hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Content */}
        <div className="space-y-6">
          
          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            {t("home.services.cta.title")}
          </h3>
          
          {/* Description */}
          <p className="text-base text-gray-600 leading-relaxed max-w-lg mx-auto">
            {t("home.services.cta.description")}
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center">
            <div className="w-16 h-px bg-gray-300" />
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <ClientServicesInteractions locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
