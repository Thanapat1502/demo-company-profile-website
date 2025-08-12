"use client";

import { ArrowRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import PrimaryButton from "./PrimaryButton";

interface HeroButtonsProps {
  className?: string;
  primaryButtonHref?: string
  primaryButtonText?: string
}

export default function HeroButtons({ className = "", primaryButtonHref, primaryButtonText }: HeroButtonsProps) {
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
          text: primaryButtonText || locale === "th" ? "ดูบริการของเรา" : "View Our Services",
          href: primaryButtonHref || `/${locale}/products-services`,
        },
        secondary: {
          text: locale === "th" ? "ติดต่อเรา" : "Contact Us",
          href: `/${locale}/contact-us`,
        },
      };
    } else {
      return {
        primary: {
          text: primaryButtonText || (locale === "th" ? "ดูผลงาน" : "References"),
          href: primaryButtonHref || (`/${locale}/reference`),
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
    <div className={`luxury-hero-btn-container !w-auto md:w-full items-center justify-center ${className}`}>
      {/* Primary Button */}
      <PrimaryButton
        className="flex-1"
        // className="luxury-hero-btn luxury-hero-btn-primary group"
        onClick={() => router.push(buttonContent.primary.href)}>
        <span className="relative z-10 flex items-center justify-center gap-3">
          <span className="font-semibold tracking-wide">
            {buttonContent.primary.text}
          </span>
          <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
        </span>
        <div className="luxury-btn-shimmer"></div>
        <div className="luxury-btn-glow"></div>
      </PrimaryButton>

      {/* Secondary Button */}
      <PrimaryButton
        className="flex-1 w-full md:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:shadow-primary-glow"
        onClick={() => router.push(buttonContent.secondary.href)}>
        <span className="relative z-10 flex items-center justify-center gap-3">
          <span className="font-semibold tracking-wide">
            {buttonContent.secondary.text}
          </span>
          <div className="w-2 h-2 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
        </span>
        <div className="luxury-btn-border"></div>
        <div className="luxury-btn-glow-secondary"></div>
      </PrimaryButton>
    </div>
  );
}
