"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Mail, Phone, Facebook, Youtube } from "lucide-react";
import Link from "next/link";
import { useContactStore } from "@/store/zustand/contactStore";
import { useLocale } from "next-intl";

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const { contactInfo, fetchContactInfo } = useContactStore();

  useEffect(() => {
    if (!contactInfo) {
      fetchContactInfo();
    }
  }, [contactInfo, fetchContactInfo]);

  // Create contact options based on store data with fallbacks
  const contactOptions = [
    {
      name: locale === "th" ? "อีเมล" : "Email",
      icon: <Mail className="w-5 h-5" />,
      href: `mailto:${contactInfo?.email || "info@padungsilpa.group"}`,
      color: "bg-red-500 hover:bg-red-600",
    },
    {
      name: locale === "th" ? "โทรศัพท์" : "Phone",
      icon: <Phone className="w-5 h-5" />,
      href: `tel:${contactInfo?.tel || "+6625734222"}`,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "Line",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      ),
      href: contactInfo?.line || "https://line.me/ti/p/@padungsilpa",
      color: "bg-green-400 hover:bg-green-500",
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      href: contactInfo?.facebook || "https://facebook.com/padungsilpa",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
      href: contactInfo?.youtube || "https://youtube.com/@padungsilpa",
      color: "bg-red-600 hover:bg-red-700",
    },
    {
      name: "TikTok",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
      href: contactInfo?.tiktok || "https://tiktok.com/@padungsilpa",
      color: "bg-black hover:bg-gray-800",
    },
  ].filter((option) => {
    // Filter out options with empty or placeholder URLs
    const href = option.href;
    return (
      href &&
      href !== "#" &&
      href !== "mailto:" &&
      href !== "tel:" &&
      !href.includes("undefined") &&
      !href.includes("null")
    );
  });

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options */}
      <div
        className={`flex flex-col gap-3 mb-4 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}>
        {contactOptions.map((option, index) => (
          <Link
            key={option.name}
            href={option.href}
            target={option.href.startsWith("http") ? "_blank" : undefined}
            rel={
              option.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className={`flex items-center justify-center w-12 h-12 rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 ${option.color}`}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
            title={option.name}>
            {option.icon}
          </Link>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen
            ? "bg-red-500 hover:bg-red-600 rotate-45"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        aria-label="ติดต่อเรา">
        <MessageCircle
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        />
      </button>
    </div>
  );
}
