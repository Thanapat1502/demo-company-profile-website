"use client";

import { useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";
import { useContactStore } from "@/store/zustand/contactStore";
import { getBilingualName, getBilingualAddress, getBilingualBusinessHours, getLoadingText } from "@/utils/bilingual";
import PrimaryButton from "../ui/PrimaryButton";

interface CompanyListProps {
  locale: string;
  variant?: "grid" | "list";
  className?: string;
}

export default function CompanyList({
  locale,
  variant = "grid",
  className = ""
}: CompanyListProps) {
  const { companies, loading, error, fetchCompanies } = useContactStore();

  useEffect(() => {
    if (!companies) {
      fetchCompanies();
    }
  }, [companies, fetchCompanies]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {getLoadingText(locale, "companies")}
          </p>
        </div>
      </div>
    );
  }

  if (error || !companies) {
    return (
      <div className={`text-center p-8 ${className}`}>
        <p className="text-red-600 mb-4">
          {error || (locale === "th" ? "ไม่สามารถโหลดข้อมูลบริษัทได้" : "Failed to load company information")}
        </p>
        <PrimaryButton
          onClick={fetchCompanies}
        >
          {locale === "th" ? "ลองใหม่" : "Try again"}
        </PrimaryButton>
      </div>
    );
  }

  if (!companies.length) {
    return (
      <div className={`text-center p-8 ${className}`}>
        <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">
          {locale === "th" ? "ไม่มีข้อมูลบริษัท" : "No company information available"}
        </p>
      </div>
    );
  }

  const containerClass = variant === "grid"
    ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    : "space-y-6";

  return (
    <div className={`${containerClass} ${className}`}>
      {companies.map((company, index) => {
        const name = getBilingualName(company, locale);
        const address = getBilingualAddress(company, locale);
        const businessHours = getBilingualBusinessHours(company, locale);

        return (
          <div
            key={company.id || index}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* Company Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {name}
                </h3>
                <div className="w-8 h-0.5 bg-blue-600"></div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              {address && (
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {address}
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <a
                  href={`tel:${company.tel}`}
                  className="text-blue-600 hover:text-blue-700 transition-colors text-sm"
                >
                  {company.tel}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <a
                  href={`mailto:${company.email}`}
                  className="text-blue-600 hover:text-blue-700 transition-colors text-sm"
                >
                  {company.email}
                </a>
              </div>

              {businessHours && (
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm">
                    {businessHours}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
              <PrimaryButton
                as={'a'}
                href={`tel:${company.tel}`}
                className="flex-1 transition-colors text-sm font-medium"
              >
                {locale === "th" ? "โทร" : "Call"}
              </PrimaryButton>
              <PrimaryButton
                as={'a'}
                href={`mailto:${company.email}`}
                className="flex-1 bg-white text-primary-500 text-sm font-medium"
              >
                {locale === "th" ? "อีเมล" : "Email"}
              </PrimaryButton>
            </div>
          </div>
        );
      })}
    </div>
  );
}
