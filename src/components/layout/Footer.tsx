"use client";

import { Link } from "@heroui/react";
import { Globe, ArrowUp, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import ContactInfo from "@/components/contact/ContactInfo";

interface FooterLink {
  label: string;
  href: string;
  labelTh: string;
}

const quickLinks: FooterLink[] = [
  { label: "About Us", href: "/pds-group", labelTh: "เกี่ยวกับเรา" },
  {
    label: "Products & Services",
    href: "/products-services",
    labelTh: "สินค้าและบริการ",
  },
  { label: "References", href: "/reference", labelTh: "ผลงาน" },
  {
    label: "News & Events",
    href: "/news-events",
    labelTh: "ข่าวสารและกิจกรรม",
  },
];

const services: FooterLink[] = [
  {
    label: "Gas Station Services",
    href: "/products-services#gas-station",
    labelTh: "บริการสถานีบริการน้ำมัน",
  },
  {
    label: "Construction",
    href: "/products-services#construction",
    labelTh: "งานก่อสร้าง",
  },
  {
    label: "Engineering",
    href: "/products-services#engineering",
    labelTh: "งานวิศวกรรม",
  },
  {
    label: "Consulting",
    href: "/products-services#consulting",
    labelTh: "งานที่ปรึกษา",
  },
];

export default function Footer() {
  const [currentLang, setCurrentLang] = useState<"en" | "th">("th");
  const t = useTranslations();
  const locale = useLocale();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="pt-4 relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Subtle Luxury Background Effects */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-800/5"></div>
      </div>

      {/* Ultra Compact Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 items-start">
          {/* Company Info */}
          <div className="lg:col-span-2">
            {/* Compact Luxury Logo */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 rounded bg-white/100 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm flex items-center justify-center relative overflow-hidden group">
                  <Image
                    src="/images/pds-logo.png"
                    alt="PDS Logo"
                    width={32}
                    height={32}
                    className="object-contain relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-wide">
                  PADUNGSILPA
                </span>
                <span className="text-md  font-semibold uppercase">GROUP</span>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed text-md max-w-xs">
              {t("footer.company.description")}
            </p>

            {/* Compact Social Media */}
            {/* <div className="flex space-x-2">
              {[
                {
                  icon: Facebook,
                  color: "hover:bg-blue-600/20 hover:text-blue-400",
                  href: "#",
                },
                {
                  icon: Instagram,
                  color: "hover:bg-pink-600/20 hover:text-pink-400",
                  href: "#",
                },
                {
                  icon: Linkedin,
                  color: "hover:bg-blue-700/20 hover:text-blue-500",
                  href: "#",
                },
                {
                  icon: Youtube,
                  color: "hover:bg-red-600/20 hover:text-red-400",
                  href: "#",
                },
              ].map((social, index) => (
                <button
                  key={index}
                  className={`relative w-10 h-10 rounded-full border border-gray-600/50 text-gray-400 ${social.color} transition-all duration-500 hover:border-gray-400/50 hover:scale-110 hover:shadow-lg group overflow-hidden`}>
                  <social.icon size={16} className="relative z-10 mx-auto" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                </button>
              ))}
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <div className="relative mb-5">
              <h3 className="text-lg font-bold text-white mb-1 tracking-wide">
                {t("footer.quickLinks")}
              </h3>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700"></div>
            </div>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 relative text-md">
                    <span className="relative z-10">
                      {currentLang === "en" ? link.label : link.labelTh}
                    </span>
                    <ExternalLink
                      size={12}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="relative mb-5">
              <h3 className="text-lg font-bold text-white mb-1 tracking-wide">
                {t("footer.services")}
              </h3>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700"></div>
            </div>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={`/${locale}${service.href}`}
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 relative text-md">
                    <span className="relative z-10">
                      {currentLang === "en" ? service.label : service.labelTh}
                    </span>
                    <ExternalLink
                      size={12}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div className="relative mb-5">
              <h3 className="text-lg font-bold text-white mb-1 tracking-wide">
                {t("footer.contact")}
              </h3>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700"></div>
            </div>

            <ContactInfo locale={locale} variant="footer" />
          </div>
        </div>
      </div>

      {/* Luxury Divider */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/50 to-transparent h-px"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent h-px blur-sm"></div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-md font-medium">
            © 2025 Padungsilpa Group. {t("footer.rights")}
          </div>

          <div className="flex items-center space-x-6 text-md">
            <Link
              href={`/${locale}/privacy`}
              className="group text-gray-400 hover:text-white transition-all duration-300 relative">
              <span className="relative z-10">{t("footer.privacy")}</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="group text-gray-400 hover:text-white transition-all duration-300 relative">
              <span className="relative z-10">{t("footer.terms")}</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <button
              onClick={() => setCurrentLang(currentLang === "en" ? "th" : "en")}
              className="group w-8 h-8 rounded-full border border-gray-600/50 text-gray-400 hover:text-white hover:border-gray-400/50 transition-all duration-300 hover:scale-110 hover:shadow-lg overflow-hidden relative">
              <Globe size={14} className="relative z-10 mx-auto" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Compact Luxury Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 group w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-110 hover:-translate-y-1 overflow-hidden">
        <ArrowUp
          size={18}
          className="relative z-10 mx-auto transition-transform duration-300 group-hover:-translate-y-0.5"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </button>
    </footer>
  );
}
