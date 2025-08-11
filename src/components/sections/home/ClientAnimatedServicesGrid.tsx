"use client";

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { ProductCard } from "@/components/share/ProductCard";
import { ServiceType } from "@/store/zustand/servicesStore";
import { getBilingualName, getBilingualDescription } from "@/utils/bilingual";
import Image from "next/image";

interface ClientAnimatedServicesGridProps {
  services: ServiceType[];
  locale: string;
}

export default function ClientAnimatedServicesGrid({
  services,
  locale,
}: ClientAnimatedServicesGridProps) {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Debug: Log services data
  console.log('ClientAnimatedServicesGrid - Services:', services.length, services);

  // Handle service selection with smooth animation
  const handleServiceClick = (service: ServiceType) => {
    if (selectedService?.id === service.id) {
      // Close if same service clicked
      handleCloseDetail();
      return;
    }

    setIsTransitioning(true);

    // Small delay to allow grid animation to start
    setTimeout(() => {
      setSelectedService(service);
      setIsTransitioning(false);
    }, 300);
  };

  // Handle closing detail panel
  const handleCloseDetail = () => {
    setIsTransitioning(true);
    setSelectedService(null);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  // Get bilingual content for selected service
  const selectedServiceName = selectedService ? getBilingualName(selectedService, locale) : '';
  const selectedServiceDescription = selectedService ? getBilingualDescription(selectedService, locale) : '';

  return (
    <div className="space-y-12">
      {/* Animated Services Layout Container */}
      <div className="space-y-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>

        {/* Flexible Layout Container with Enhanced Animations */}
        <div className={`layout-container-transform layout-transform-gpu ${selectedService ? 'flex gap-6 layout-container-mobile' : 'block'}`}>

          {/* Services Grid - Smooth Transform from 1x6 to 2x3 */}
          <div className={`services-grid-transform layout-transform-gpu ${selectedService
            ? 'md:w-2/3 opacity-100'
            : 'w-full opacity-100'
            }`}>
            <div className={`grid gap-1 lg:gap-1 services-grid-transform ${selectedService
              ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 services-grid-mobile'
              : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
              }`}>
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`opacity-0 animate-fade-in-scale service-card-interactive grid-item-reorder ${selectedService?.id === service.id
                    ? 'x-service-card-selected ring-2 ring-[var(--primary-blue)] ring-opacity-50'
                    : ''
                    }`}
                  style={{
                    animationDelay: `${1000 + index * 150}ms`,
                    animationFillMode: 'forwards'
                  }}
                  onClick={() => handleServiceClick(service)}>
                  <ProductCard
                    product={service}
                    locale={locale}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Service Detail Panel - Enhanced Slide Animation */}
          <div className={`detail-panel-slide layout-transform-gpu ${selectedService
            ? 'md:w-1/3 opacity-100 translate-x-0 detail-panel-mobile'
            : 'w-0 opacity-0 translate-x-full overflow-hidden'
            }`}>
            {selectedService && (
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl h-full min-h-[400px] relative overflow-hidden">

                {/* Enhanced Close Button */}
                <button
                  onClick={handleCloseDetail}
                  className="absolute top-4 right-4 w-8 h-8 bg-gray-100 border border-gray-300 flex items-center justify-center close-button-animated z-10">
                  <X className="w-4 h-4 text-gray-600" />
                </button>

                {/* Service Detail Content with Enhanced Animation */}
                <div className="space-y-6 service-detail-content">

                  {/* Service Image */}
                  <div className="relative h-48 lg:h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
                    {selectedService.image_url && selectedService.image_url.trim() !== '' ? (
                      <Image
                        src={selectedService.image_url}
                        alt={selectedServiceName}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-[var(--primary-blue)] text-center">
                          <div className="w-16 h-16 mx-auto mb-2 bg-white/50 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                            <svg className="w-8 h-8 text-[var(--primary-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <p className="text-sm font-semibold">Service Image</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Service Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight px-6 lg:px-8">
                    {selectedServiceName}
                  </h3>

                  {/* Service Description */}
                  <p className="text-gray-600 leading-relaxed text-base lg:text-lg px-6 lg:px-8">
                    {selectedServiceDescription}
                  </p>

                  {/* Enhanced Action Button */}
                  <div className="py-4 px-6 lg:px-8">
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary-blue)] text-white font-semibold detail-action-button">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
