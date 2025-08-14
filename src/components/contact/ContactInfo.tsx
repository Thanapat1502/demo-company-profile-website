"use client";

import { useEffect } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useContactStore } from "@/store/zustand/contactStore";
import { Facebook, Youtube } from "lucide-react";
import { LineIcon } from "@/components/icons/LineIcon";
import { TikTokIcon } from "@/components/icons/TikTokIcon";

import {
  getBilingualAddress,
  getBilingualBusinessHours,
  getLoadingText,
} from "@/utils/bilingual";

interface ContactInfoProps {
  locale: string;
  variant?: "full" | "compact" | "footer";
  className?: string;
}

export default function ContactInfo({
  locale,
  variant = "full",
  className = "",
}: ContactInfoProps) {
  const { contactInfo, loading, error, fetchContactInfo } = useContactStore();

  useEffect(() => {
    if (!contactInfo) {
      fetchContactInfo();
    }
  }, [contactInfo, fetchContactInfo]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">
            {getLoadingText(locale, "contact")}
          </p>
        </div>
      </div>
    );
  }

  if (error || !contactInfo) {
    return (
      <div className={`text-center p-4 ${className}`}>
        <p className="text-red-600 text-sm mb-2">
          {error ||
            (locale === "th"
              ? "ไม่สามารถโหลดข้อมูลติดต่อได้"
              : "Failed to load contact information")}
        </p>
        <button
          onClick={fetchContactInfo}
          className="text-blue-600 hover:text-blue-700 text-sm underline">
          {locale === "th" ? "ลองใหม่" : "Try again"}
        </button>
      </div>
    );
  }

  const address = getBilingualAddress(contactInfo, locale);
  const businessHours = getBilingualBusinessHours(contactInfo, locale);

  // Social media links with fallbacks
  const socialLinks = [
    {
      icon: Facebook,
      href: contactInfo.facebook || "#",
      color: "hover:text-blue-600",
      name: "Facebook",
    },
    {
      icon: LineIcon,
      href: contactInfo.line || "#",
      color: "hover:text-green-600",
      name: "Line",
    },
    {
      icon: Youtube,
      href: contactInfo.youtube || "#",
      color: "hover:text-red-600",
      name: "YouTube",
    },
    {
      icon: TikTokIcon,
      href: contactInfo.tiktok || "#",
      color: "hover:text-black",
      name: "TikTok",
    },
  ];

  if (variant === "compact") {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center space-x-3">
          <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <a
            href={`tel:${contactInfo.tel}`}
            className="text-gray-700 hover:text-blue-600 transition-colors">
            {contactInfo.tel}
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <a
            href={`mailto:${contactInfo.email}`}
            className="text-gray-700 hover:text-blue-600 transition-colors">
            {contactInfo.email}
          </a>
        </div>
        {address && (
          <div className="flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm leading-relaxed">
              {address}
            </span>
          </div>
        )}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`space-y-3 ${className}`}>
        {address && (
          <div className="group flex items-start space-x-3 hover:bg-gray-800/30 transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition-colors duration-300">
              <MapPin size={14} className="text-blue-400" />
            </div>
            <div className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
              <p className="text-sm leading-relaxed">{address}</p>
            </div>
          </div>
        )}

        <div className="group flex items-center space-x-3 hover:bg-gray-800/30 transition-all duration-300">
          <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition-colors duration-300">
            <Phone size={14} className="text-blue-400" />
          </div>
          <a
            href={`tel:${contactInfo.tel}`}
            className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-sm">
            {contactInfo.tel}
          </a>
        </div>

        <div className="group flex items-center space-x-3 hover:bg-gray-800/30 transition-all duration-300">
          <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition-colors duration-300">
            <Mail size={14} className="text-blue-400" />
          </div>
          <a
            href={`mailto:${contactInfo.email}`}
            className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-sm">
            {contactInfo.email}
          </a>
        </div>

        {businessHours && (
          <div className="group hover:bg-gray-800/30 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/30 transition-colors duration-300">
                <Clock size={14} className="text-blue-400" />
              </div>
              <div className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                <p className="text-sm">{businessHours}</p>
              </div>
            </div>
          </div>
        )}

        {/* Social Media Links */}
        <div className="flex space-x-2 pt-2">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative flex items-center w-14 h-14 rounded-full border border-gray-600/50 text-gray-400 ${social.color} transition-all duration-500 hover:border-gray-400/50 hover:scale-110 hover:shadow-lg group overflow-hidden`}
              title={social.name}>
              <social.icon size={28} className="relative z-10 mx-auto" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid gap-4">
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {locale === "th" ? "โทรศัพท์" : "Phone"}
            </h3>
            <a
              href={`tel:${contactInfo.tel}`}
              className="text-blue-600 hover:text-blue-700 transition-colors">
              {contactInfo.tel}
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {locale === "th" ? "อีเมล" : "Email"}
            </h3>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-blue-600 hover:text-blue-700 transition-colors">
              {contactInfo.email}
            </a>
          </div>
        </div>

        {address && (
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {locale === "th" ? "ที่อยู่" : "Address"}
              </h3>
              <p className="text-gray-700 leading-relaxed">{address}</p>
              {contactInfo.google_map_url && (
                <a
                  href={contactInfo.google_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 hover:text-blue-700 text-sm underline">
                  {locale === "th" ? "ดูแผนที่" : "View on Map"}
                </a>
              )}
            </div>
          </div>
        )}

        {businessHours && (
          <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {locale === "th" ? "เวลาทำการ" : "Business Hours"}
              </h3>
              <p className="text-gray-700">{businessHours}</p>
            </div>
          </div>
        )}
      </div>

      {/* Social Media */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">
          {locale === "th" ? "ติดตามเรา" : "Follow Us"}
        </h3>
        <div className="flex space-x-3">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 ${social.color} transition-all duration-300 hover:scale-110`}
              title={social.name}>
              <social.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
