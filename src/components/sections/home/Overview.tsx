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
        name: t("home.overview.features.safety.title"),
        description: t("home.overview.features.safety.description"),
      },
    },
    {
      icon: Award,
      title: t("home.overview.features.expertise.title"),
      description: t("home.overview.features.expertise.description"),
      schema: {
        "@type": "Service",
        name: t("home.overview.features.expertise.title"),
        description: t("home.overview.features.expertise.description"),
      },
    },
    {
      icon: Users,
      title: t("home.overview.features.support.title"),
      description: t("home.overview.features.support.description"),
      schema: {
        "@type": "Service",
        name: t("home.overview.features.support.title"),
        description: t("home.overview.features.support.description"),
      },
    },
    {
      icon: Wrench,
      title: t("home.overview.features.technology.title"),
      description: t("home.overview.features.technology.description"),
      schema: {
        "@type": "Service",
        name: t("home.overview.features.technology.title"),
        description: t("home.overview.features.technology.description"),
      },
    },
  ];

  // Extract images from gallery content
  const companyImages =
    gallery && gallery.length > 0 ? gallery[0]?.images_url || [] : [];

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OIL DEVELOPMENT",
    description: t("home.overview.description"),
    url: `https://padungsilpa.group/${locale}`,
    logo: "https://padungsilpa.group/logo.png",
    image: companyImages.length > 0 ? companyImages : undefined,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction Services",
      itemListElement: features.map((feature, index) => ({
        "@type": "Offer",
        itemOffered: feature.schema,
        position: index + 1,
      })),
    },
    knowsAbout: features.map((feature) => feature.title),
    areaServed: {
      "@type": "Country",
      name: "Thailand",
    },
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
            <div
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
              role="status"
              aria-label="Loading"></div>
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
        className="relative py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50/80 overflow-hidden"
        itemScope
        itemType="https://schema.org/Organization"
        aria-labelledby="overview-heading">
        {/* Luxury Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-100/15 rounded-full blur-3xl opacity-60 animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-100/10 rounded-full blur-2xl opacity-40 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content - Professional Header */}
            <div className="space-y-8">
              {/* Condensed Professional Title */}
              <div className="relative">
                <h2
                  id="overview-heading"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-2
                           hover:text-primary-800 transition-colors duration-500 ease-out"
                  itemProp="name">
                  {t("home.overview.title")}
                  <span className="block text-primary-400 mt-2">
                    {t("home.overview.titleHighlight")}
                  </span>
                </h2>

                {/* Luxury Underline Animation */}
                <div
                  className="absolute -bottom-1 left-0 w-0 h-0.5
                              bg-gradient-to-r from-primary-500 to-primary-300
                              hover:w-24 transition-all duration-700 ease-out"></div>
              </div>

              {/* Condensed Description */}
              <div className="max-w-xl">
                <p
                  className="text-gray-600 text-base leading-relaxed font-normal
                           hover:text-gray-700 transition-colors duration-300 ease-out"
                  itemProp="description">
                  {t("home.overview.description")}
                </p>
              </div>

              {/* Luxury Features Grid */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
                itemProp="hasOfferCatalog"
                itemScope
                itemType="https://schema.org/OfferCatalog">
                <meta itemProp="name" content="Construction Services" />
                {features.map((feature, index) => (
                  <article
                    key={index}
                    className="group bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-lg p-5
                             shadow-sm hover:shadow-lg hover:shadow-primary-100/30 hover:-translate-y-1
                             transition-all duration-500 ease-out hover:border-primary-300/50"
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/Offer">
                    <meta itemProp="position" content={String(index + 1)} />
                    <div
                      className="flex items-start space-x-4"
                      itemProp="itemOffered"
                      itemScope
                      itemType="https://schema.org/Service">
                      {/* Luxury Icon */}
                      <div className="flex-shrink-0 mt-1" aria-hidden="true">
                        <div
                          className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg
                                      flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ease-out">
                          <feature.icon className="w-5 h-5 text-primary-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        {/* Luxury Accent Line */}
                        {/* <div className="w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-300 mb-3
                                      group-hover:w-8 transition-all duration-500 ease-out delay-100"></div> */}

                        <h3
                          className="text-lg font-semibold text-gray-900 mb-2 tracking-tight
                                   group-hover:text-primary-800 transition-colors duration-300 ease-out"
                          itemProp="name">
                          {feature.title}
                        </h3>
                        <p
                          className="text-sm text-gray-600 leading-relaxed
                                   group-hover:text-gray-700 transition-colors duration-300 ease-out"
                          itemProp="description">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right Content - Luxury Carousel */}
            <div className="relative">
              <OverviewClient companyImages={companyImages} locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
