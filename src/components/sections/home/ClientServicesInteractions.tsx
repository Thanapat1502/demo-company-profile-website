"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface ClientServicesInteractionsProps {
  locale: string;
}

export default function ClientServicesInteractions({
  locale,
}: ClientServicesInteractionsProps) {
  const router = useRouter();
  const t = useTranslations();

  return (
    <>
      <button
        className="luxury-hero-btn luxury-hero-btn-primary group overflow-hidden"
        onClick={() => router.push(`/${locale}/products-services`)}>
        <span className="relative z-10 flex items-center justify-center gap-3">
          <span className="font-semibold tracking-wide">
            {t("home.services.viewAll")}
          </span>
          <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
        </span>
        <div className="luxury-btn-shimmer"></div>
        <div className="luxury-btn-glow"></div>
        {/* NavBar-style hover animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
      </button>

      <button
        className="luxury-hero-btn luxury-hero-btn-primary group overflow-hidden"
        onClick={() => router.push(`/${locale}/contact-us`)}>
        <span className="relative z-10 flex items-center justify-center gap-3">
          <span className="font-semibold tracking-wide">
            {t("common.contactUs")}
          </span>
          <div className="w-2 h-2 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
        </span>
        <div className="luxury-btn-shimmer"></div>
        <div className="luxury-btn-glow"></div>
        {/* NavBar-style hover animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
      </button>
    </>
  );
}
