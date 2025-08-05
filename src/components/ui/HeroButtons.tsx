"use client";

import { ArrowRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

interface HeroButtonsProps {
  className?: string;
}

export default function HeroButtons({ className = "" }: HeroButtonsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  // Check if we're on the reference page
  const isReferencePage = pathname.includes('/reference');

  // Determine button content based on current page
  const getButtonContent = () => {
    if (isReferencePage) {
      return {
        primary: {
          text: locale === "th" ? "ดูบริการของเรา" : "View Our Services",
          href: `/${locale}/products-services`,
        },
        secondary: {
          text: locale === "th" ? "ติดต่อเรา" : "Contact Us",
          href: `/${locale}/contact-us`,
        },
      };
    } else {
      return {
        primary: {
          text: locale === "th" ? "ดูผลงาน" : "View Portfolio",
          href: `/${locale}/reference`,
        },
        secondary: {
          text: locale === "th" ? "ติดต่อเรา" : "Contact Us",
          href: `/${locale}/contact-us`,
        },
      };
    }
  };

  const buttonContent = getButtonContent();

  return (
    <div className={`luxury-hero-btn-container ${className}`}>
      {/* Primary Button */}
      <button
        className="luxury-hero-btn luxury-hero-btn-primary group"
        onClick={() => router.push(buttonContent.primary.href)}>
        <span className="relative z-10 flex items-center justify-center gap-3">
          <span className="font-semibold tracking-wide">
            {buttonContent.primary.text}
          </span>
          <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
        </span>
        <div className="luxury-btn-shimmer"></div>
        <div className="luxury-btn-glow"></div>
      </button>

      {/* Secondary Button */}
      <button
        className="luxury-hero-btn luxury-hero-btn-secondary group"
        onClick={() => router.push(buttonContent.secondary.href)}>
        <span className="relative z-10 flex items-center justify-center gap-3">
          <span className="font-semibold tracking-wide">
            {buttonContent.secondary.text}
          </span>
          <div className="w-2 h-2 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
        </span>
        <div className="luxury-btn-border"></div>
        <div className="luxury-btn-glow-secondary"></div>
      </button>
    </div>
  );
}
