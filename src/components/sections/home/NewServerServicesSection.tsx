'use client';

import { useTranslations } from "next-intl";
import { ServiceType } from "@/store/zustand/servicesStore";
import { useState, useEffect, useRef } from "react";
import CleanServiceCard from "./CleanServiceCard";

interface NewServerServicesSectionProps {
  services: ServiceType[];
  locale: string;
}

export default function NewServerServicesSection({
  services,
  locale,
}: NewServerServicesSectionProps) {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === sectionRef.current && entry.isIntersecting) {
            setGridVisible(true)
            setIsVisible(true);
          }
          if (entry.target === headerRef.current && entry.isIntersecting) {
            setGridVisible(true)
            setTimeout(() => setHeaderVisible(true), 200);
          }
          if (entry.target === gridRef.current && entry.isIntersecting) {
            setGridVisible(true)
            // setTimeout(() => setGridVisible(true), 2000);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (headerRef.current) observer.observe(headerRef.current);
    if (gridRef.current) observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-12 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-gray-50/80 overflow-hidden"
    >
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/4 right-1/4 w-72 h-72 bg-primary-100/20 rounded-full blur-3xl transition-all duration-[2000ms] ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
        />
        <div
          className={`absolute bottom-1/3 left-1/5 w-64 h-64 bg-blue-100/15 rounded-full blur-2xl transition-all duration-[2500ms] ease-out delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Professional Animated Header */}
        <div
          ref={headerRef}
          className={`text-center mb-8 transition-all duration-1200 ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >

          {/* Minimalist Badge */}
          <div className={`inline-flex items-center gap-3 mb-6 transition-all duration-800 delay-200 ${headerVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}>
            {/* <div className="relative">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary-700"></div>
            </div> */}
            <h2
              id="overview-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-2
                           hover:text-primary-800 transition-colors duration-500 ease-out"
              itemProp="name">
              <span className="block text-primary-400 mt-2">
                {t("home.services.title")}
              </span>
            </h2>
            {/* <div className="relative">
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary-700"></div>
            </div> */}
          </div>

          {/* Clean Professional Title */}


          {/* Professional Description */}
          <div className={`mx-auto transition-all duration-1000 delay-600 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
            <p className="text-lg text-gray-600 leading-relaxed font-normal">
              {t("home.services.description")}
            </p>
          </div>


        </div>

        {/* Elegant Animated Services Grid */}
        <div
          ref={gridRef}
          className={`mb-0 transition-all duration-1000 ease-out delay-1000 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >

          {/* Enhanced Grid Container */}
          <div className="relative">
            {/* Subtle Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-50/30 via-transparent to-blue-50/30 rounded-3xl blur-xl opacity-50" />

            {/* Grid Layout with Staggered Animation */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`transition-all duration-600 ease-out ${gridVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                    }`}
                  style={{
                    transitionDelay: `${1200 + (index * 150)}ms`
                  }}
                >
                  <CleanServiceCard
                    service={service}
                    locale={locale}
                    index={index}
                    isActive={activeService === service.id}
                    onHover={setActiveService}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
