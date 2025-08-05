"use client";

import { Star } from "lucide-react";
import { PartnerType } from "@/store/zustand/partnerStore";
import Image from "next/image";

interface PartnersSectionProps {
  partners: PartnerType[];
  loading?: boolean;
  locale?: string;
}

export default function PartnersSection({
  partners,
  loading = false,
  locale = "th",
}: PartnersSectionProps) {
  // Loading state
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {locale === "th"
                ? "กำลังโหลดพาร์ทเนอร์..."
                : "Loading partners..."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-base font-medium mb-4">
            {locale === "th" ? "พันธมิตรของเรา" : "Our Partners"}
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {locale === "th" ? (
              <>
                ความไว้วางใจจาก
                <span className="text-blue-600 block">ผู้นำด้านพลังงาน</span>
              </>
            ) : (
              <>
                Trusted by
                <span className="text-blue-600 block">Energy Leaders</span>
              </>
            )}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            {locale === "th"
              ? "เราภูมิใจที่ได้รับความไว้วางใจจากบริษัทน้ำมันชั้นนำของประเทศ ในการให้บริการก่อสร้างและติดตั้งระบบสถานีบริการน้ำมัน"
              : "We are proud to be trusted by leading oil companies in the country for construction and installation services of gas station systems"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-gray-50 p-6 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group rounded-lg">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 relative flex items-center justify-center">
                  <div className="w-full h-full bg-white rounded-lg shadow-sm flex items-center justify-center p-3 overflow-hidden">
                    {partner.logo_url ? (
                      <Image
                        src={partner.logo_url}
                        alt={partner.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      />
                    ) : (
                      <span className="text-lg font-bold text-gray-700 text-center">
                        {partner.name}
                      </span>
                    )}
                  </div>
                </div>
                {/* Partner name as fallback/caption */}
                <p className="text-sm text-gray-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {partner.name}
                </p>
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
              {locale === "th"
                ? "ความไว้วางใจจากพันธมิตรชั้นนำ"
                : "Trusted by Leading Partners"}
            </p>
            <p className="text-gray-600">
              {locale === "th"
                ? "และพันธมิตรอื่น ๆ อีกมากมาย ที่ไว้วางใจในคุณภาพงานของเรา"
                : "And many other partners who trust in the quality of our work"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
