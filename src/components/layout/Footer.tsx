"use client";

import { Link, Button, Divider } from "@heroui/react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Clock,
  Globe,
  ArrowUp
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface FooterLink {
  label: string;
  href: string;
  labelTh: string;
}

const quickLinks: FooterLink[] = [
  { label: "About Us", href: "/pds-group", labelTh: "เกี่ยวกับเรา" },
  { label: "Products & Services", href: "/products-services", labelTh: "สินค้าและบริการ" },
  { label: "References", href: "/reference", labelTh: "ผลงาน" },
  { label: "News & Events", href: "/news-events", labelTh: "ข่าวสารและกิจกรรม" },
];

const services: FooterLink[] = [
  { label: "Gas Station Services", href: "/products-services#gas-station", labelTh: "บริการสถานีบริการน้ำมัน" },
  { label: "Construction", href: "/products-services#construction", labelTh: "งานก่อสร้าง" },
  { label: "Engineering", href: "/products-services#engineering", labelTh: "งานวิศวกรรม" },
  { label: "Consulting", href: "/products-services#consulting", labelTh: "งานที่ปรึกษา" },
];

export default function Footer() {
  const [currentLang, setCurrentLang] = useState<'en' | 'th'>('th');
  const t = useTranslations();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PDS</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  PADUNGSILPA
                </span>
                <span className="text-sm text-gray-400 font-medium tracking-wider">
                  GROUP
                </span>
              </div>
            </div>

            <p className="text-gray-300 mb-8 leading-relaxed">
              {currentLang === 'en'
                ? "Leading comprehensive gas station business services with over 20 years of experience in construction and engineering."
                : "ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร ด้วยประสบการณ์กว่า 20 ปี ในงานก่อสร้างและวิศวกรรม"
              }
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, color: "hover:text-blue-400", href: "#" },
                { icon: Instagram, color: "hover:text-pink-400", href: "#" },
                { icon: Linkedin, color: "hover:text-blue-600", href: "#" },
                { icon: Youtube, color: "hover:text-red-500", href: "#" },
              ].map((social, index) => (
                <Button
                  key={index}
                  isIconOnly
                  variant="light"
                  className={`text-gray-400 ${social.color} hover:bg-gray-800 transition-colors duration-200`}
                  as={Link}
                  href={social.href}
                >
                  <social.icon size={20} />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              {currentLang === 'en' ? 'Quick Links' : 'ลิงก์ด่วน'}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {currentLang === 'en' ? link.label : link.labelTh}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              {currentLang === 'en' ? 'Our Services' : 'บริการของเรา'}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {currentLang === 'en' ? service.label : service.labelTh}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              {currentLang === 'en' ? 'Contact Info' : 'ข้อมูลติดต่อ'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p className="text-sm">
                    {currentLang === 'en'
                      ? "123 Business District, Bangkok 10110, Thailand"
                      : "123 เขตธุรกิจ กรุงเทพมหานคร 10110 ประเทศไทย"
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">+66 2 123 4567</span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">info@padungsilpa.group</span>
              </div>

              <div className="flex items-start space-x-3">
                <Clock size={20} className="text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p className="text-sm">
                    {currentLang === 'en'
                      ? "Mon - Fri: 8:00 AM - 6:00 PM"
                      : "จันทร์ - ศุกร์: 08:00 - 18:00 น."
                    }
                  </p>
                  <p className="text-sm">
                    {currentLang === 'en'
                      ? "Sat: 8:00 AM - 12:00 PM"
                      : "เสาร์: 08:00 - 12:00 น."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800"></div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2024 Padungsilpa Group. {currentLang === 'en' ? 'All rights reserved.' : 'สงวนลิขสิทธิ์'}
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
              {currentLang === 'en' ? 'Privacy Policy' : 'นโยบายความเป็นส่วนตัว'}
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
              {currentLang === 'en' ? 'Terms of Service' : 'เงื่อนไขการใช้งาน'}
            </Link>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onPress={() => setCurrentLang(currentLang === 'en' ? 'th' : 'en')}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Globe size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
