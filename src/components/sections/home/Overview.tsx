import { Content } from "@/store/zustand/contentStore";
import { Award, Shield, Users, Wrench } from "lucide-react";
import { useTranslations } from "next-intl";
import OverviewClient from "./OverviewClient";

interface OverviewProps {
  gallery: Content[];
  loading?: boolean;
  locale?: string;
}

export default function Overview({
  gallery,
  loading = false,
  locale = "th",
}: OverviewProps) {
  const t = useTranslations();

  const features = [
    {
      icon: Shield,
      title: t("home.overview.features.safety.title"),
      description: t("home.overview.features.safety.description"),
      schema: {
        "@type": "Service",
        "name": t("home.overview.features.safety.title"),
        "description": t("home.overview.features.safety.description")
      }
    },
    {
      icon: Award,
      title: t("home.overview.features.expertise.title"),
      description: t("home.overview.features.expertise.description"),
      schema: {
        "@type": "Service",
        "name": t("home.overview.features.expertise.title"),
        "description": t("home.overview.features.expertise.description")
      }
    },
    {
      icon: Users,
      title: t("home.overview.features.support.title"),
      description: t("home.overview.features.support.description"),
      schema: {
        "@type": "Service",
        "name": t("home.overview.features.support.title"),
        "description": t("home.overview.features.support.description")
      }
    },
    {
      icon: Wrench,
      title: t("home.overview.features.technology.title"),
      description: t("home.overview.features.technology.description"),
      schema: {
        "@type": "Service",
        "name": t("home.overview.features.technology.title"),
        "description": t("home.overview.features.technology.description")
      }
    },
  ];

  // Extract images from gallery content
  const companyImages = gallery && gallery.length > 0 ? gallery[0]?.images_url || [] : [];

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Padungsilpa Group",
    "description": t("home.overview.description"),
    "url": `https://padungsilpa.group/${locale}`,
    "logo": "https://padungsilpa.group/logo.png",
    "image": companyImages.length > 0 ? companyImages : undefined,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Construction Services",
      "itemListElement": features.map((feature, index) => ({
        "@type": "Offer",
        "itemOffered": feature.schema,
        "position": index + 1
      }))
    },
    "knowsAbout": features.map(feature => feature.title),
    "areaServed": {
      "@type": "Country",
      "name": "Thailand"
    }
  };

  // const companyImages = [
  //   "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   "https://images.unsplash.com/photo-1565043666747-69f6646db940?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  // ];

  // Loading state
  if (loading) {
    return (
      <section
        className="section-minimal bg-gradient-to-br from-gray-100 via-white to-gray-50"
        aria-label="Loading company overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" role="status" aria-label="Loading"></div>
            <p className="mt-4 text-gray-600">{t("common.loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <section
        className="py-12 lg:py-12 bg-white lg:mx-20"
        itemScope
        itemType="https://schema.org/Organization"
        aria-labelledby="overview-heading">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 flex flex-col justify-center">
              {/* Section Label - Matching ServicesSection style */}
              <div className="inline-flex items-center gap-3">
                <div className="w-12 h-px bg-[var(--primary-blue)]" aria-hidden="true"></div>
                <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                  {t("home.overview.sectionLabel")}
                </span>
              </div>

              {/* Main Heading - Strong & Minimal Style */}
              <h2
                id="overview-heading"
                className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-0 tracking-[0.02em] !leading-normal drop-shadow-sm"
                itemProp="name">
                {t("home.overview.title")}
                <span className="block text-[var(--primary-blue)]">
                  {t("home.overview.titleHighlight")}
                </span>
              </h2>

              {/* Enhanced Elegant Line with Glow - Matching ServicesSection */}
              <div className="relative flex items-start justify-start mb-4" aria-hidden="true">
                <div className="w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
                <div className="absolute w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
              </div>

              {/* Description - Clean Typography */}
              <p
                className="text-lg text-gray-600 leading-relaxed max-w-3xl"
                itemProp="description">
                {t("home.overview.description")}
              </p>

              {/* Features Grid - Minimal Cards without rounded corners */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
                <meta itemProp="name" content="Construction Services" />
                {features.map((feature, index) => (
                  <article
                    key={index}
                    className="card-minimal p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200"
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/Offer">
                    <meta itemProp="position" content={String(index + 1)} />
                    <div className="flex items-start space-x-4" itemProp="itemOffered" itemScope itemType="https://schema.org/Service">
                      {/* <div className="flex-shrink-0" aria-hidden="true">
                        <div className="w-8 h-8 bg-[var(--primary-blue)]/10 flex items-center justify-center">
                          <feature.icon className="w-8 h-8 text-[var(--primary-blue)]" />
                        </div>
                      </div> */}
                      <div>
                        <h3
                          className="text-xl font-bold text-gray-900 mb-3 tracking-tight"
                          itemProp="name">
                          {feature.title}
                        </h3>
                        <p
                          className="text-base text-gray-600 leading-relaxed"
                          itemProp="description">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              {/* Client-side interactive components */}
              {/* <OverviewClient companyImages={companyImages} locale={locale} /> */}
            </div>
            <OverviewClient companyImages={companyImages} locale={locale} />

            {/* Right Content - Server-side image display for SEO */}
          </div>
        </div>
      </section>
    </>
  );
}
