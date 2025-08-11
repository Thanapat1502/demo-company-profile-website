import { useTranslations } from "next-intl";
import { ServiceType } from "@/store/zustand/servicesStore";
import ClientServicesInteractions from "@/components/sections/home/ClientServicesInteractions";
import ClientAnimatedServicesGrid from "@/components/sections/home/ClientAnimatedServicesGrid";

interface ServerServicesSectionProps {
  services: ServiceType[];
  locale: string;
}

export default function ServerServicesSection({
  services,
  locale,
}: ServerServicesSectionProps) {
  const t = useTranslations();

  return (
    <section
      id="services"
      className="relative services-elegant-texture overflow-hidden services-section-overlap bg-gradient-to-br from-gray-100 via-white to-gray-50">

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs with Smooth Animation */}
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-[var(--primary-blue)]/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-800/5 rounded-full blur-2xl animate-float-slow-reverse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-[var(--primary-blue)]/3 rounded-full blur-3xl animate-float-slow-delay"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header with Entrance Animation */}
          <div className="text-center mb-4 relative opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            {/* Clean Typography Focus */}
            <div className="relative z-10">
              {/* Luxury Title with Gradient and Animation */}
              <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-0 tracking-[0.02em] !leading-normal drop-shadow-sm transform-gpu">
                {t("home.services.title")}
              </h2>

              {/* Enhanced Elegant Line with Smooth Glow Animation */}
              <div className="relative flex items-center justify-center mb-4">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80 animate-line-expand"></div>
                <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm animate-glow-pulse"></div>
                <div className="absolute w-2 h-2 bg-[var(--primary-blue)] rounded-full animate-pulse-gentle"></div>
              </div>

              {/* Refined Description with Subtle Shadow */}
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto tracking-wide drop-shadow-sm opacity-0 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                {t("home.services.description")}
              </p>
            </div>
          </div>

          {/* Animated Services Grid - Client Component */}
          <ClientAnimatedServicesGrid services={services} locale={locale} />

          {/* Call to Action Section with Elegant Animation */}
          <div className="text-center space-y-6 pt-8 opacity-0 animate-fade-in-up transform-gpu" style={{ animationDelay: '1800ms', animationFillMode: 'forwards' }}>
            <div className="relative">
              {/* Subtle Background Glow */}
              <div className="absolute inset-0 -inset-x-8 -inset-y-4 bg-gradient-to-r from-transparent via-[var(--primary-blue)]/5 to-transparent rounded-2xl blur-xl opacity-0 animate-glow-in" style={{ animationDelay: '2000ms', animationFillMode: 'forwards' }}></div>

              <div className="relative z-10">
                <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '2200ms', animationFillMode: 'forwards' }}>
                  {t("home.services.cta.title")}
                </h4>
                <p className="text-gray-600 text-lg mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '2400ms', animationFillMode: 'forwards' }}>
                  {t("home.services.cta.description")}
                </p>
              </div>
            </div>

            <div className="luxury-hero-btn-container opacity-0 animate-fade-in-scale transform-gpu" style={{ animationDelay: '2600ms', animationFillMode: 'forwards' }}>
              <ClientServicesInteractions locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
