"use client";

import {
  Star,
  Building2,
  Factory,
  Fuel,
  Zap,
  Truck,
  Building,
  Wrench,
  Gauge,
} from "lucide-react";
import { PartnerType } from "@/store/zustand/partnerStore";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface PartnersSectionProps {
  partners: PartnerType[];
  loading?: boolean;
  locale?: string;
}

// Function to get icon for each partner
const getPartnerIcon = (partnerName: string) => {
  const name = partnerName.toLowerCase();
  if (name.includes("ptt")) return Fuel;
  if (name.includes("bangchak")) return Factory;
  if (name.includes("shell")) return Building2;
  if (name.includes("esso")) return Zap;
  if (name.includes("chevron")) return Truck;
  if (name.includes("irpc")) return Factory;
  if (name.includes("susco")) return Building;
  if (name.includes("pure")) return Fuel;
  if (name.includes("or")) return Gauge;
  if (name.includes("thaioil")) return Wrench;
  return Building2; // Default icon
};

export default function PartnersSection({
  partners,
  loading = false,
  locale = "th",
}: PartnersSectionProps) {
  const t = useTranslations();
  // Loading state
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t("common.loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-100 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-base font-medium mb-4">
            {t("home.partners.sectionLabel")}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 !leading-normal">
            {t("home.partners.title")}
            <span className="text-blue-600 block">
              {t("home.partners.titleHighlight")}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            {t("home.partners.description")}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="p-2 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 group rounded-lg">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 relative flex items-center justify-center">
                  <div className="w-full h-full rounded-lg flex items-center justify-center p-3 overflow-hidden">
                    {partner.logo_url ? (
                      <Image
                        src={partner.logo_url}
                        alt={partner.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        {(() => {
                          const IconComponent = getPartnerIcon(partner.name);
                          return (
                            <IconComponent className="w-8 h-8 text-blue-600 mb-2 transition-transform duration-300 group-hover:scale-110" />
                          );
                        })()}
                        <span className="text-xs font-bold text-gray-700 text-center leading-tight">
                          {partner.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Partner name as fallback/caption */}
                {/* <p className="text-sm text-gray-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {partner.name}
                </p> */}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
            </div>
            <p className="text-gray-700 font-semibold text-lg mb-2">
              {t("home.partners.trustMessage")}
            </p>
            <p className="text-gray-600">
              {t("home.partners.additionalMessage")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
