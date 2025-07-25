"use client";

import { Button } from "@heroui/react";
import { ReactNode } from "react";
import { ChevronRight, Play } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  children?: ReactNode;
  height?: "sm" | "md" | "lg" | "xl" | "full";
  overlay?: boolean;
  textAlign?: "left" | "center" | "right";
  className?: string;
}

const heightClasses = {
  sm: "h-64 md:h-80",
  md: "h-80 md:h-96",
  lg: "h-96 md:h-[32rem]",
  xl: "h-[32rem] md:h-[40rem]",
  full: "h-screen",
};

export default function HeroSection({
  title,
  subtitle,
  description,
  backgroundImage,
  backgroundVideo,
  primaryAction,
  secondaryAction,
  children,
  height = "lg",
  overlay = true,
  textAlign = "center",
  className = "",
}: HeroSectionProps) {
  const textAlignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[textAlign];

  const justifyClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }[textAlign];

  return (
    <section className={`relative ${heightClasses[height]} ${className}`}>
      {/* Background */}
      {backgroundVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {backgroundImage && !backgroundVideo && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Gradient Background if no image/video */}
      {!backgroundImage && !backgroundVideo && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900" />
      )}

      {/* Overlay */}
      {overlay && <div className="absolute inset-0 bg-black/40" />}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            className={`max-w-4xl ${
              textAlign === "center" ? "mx-auto" : ""
            } ${textAlignClass}`}>
            {subtitle && (
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-blue-600/20 backdrop-blur-sm rounded-full text-blue-200 text-sm font-medium border border-blue-400/30">
                  {subtitle}
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>

            {description && (
              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                {description}
              </p>
            )}

            {/* Action Buttons */}
            {(primaryAction || secondaryAction) && (
              <div
                className={`flex flex-col sm:flex-row gap-4 ${justifyClass}`}>
                {primaryAction && (
                  <Button
                    size="lg"
                    color="primary"
                    variant="solid"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3"
                    endContent={<ChevronRight size={20} />}
                    as={primaryAction.href ? "a" : "button"}
                    href={primaryAction.href}
                    onPress={primaryAction.onClick}>
                    {primaryAction.label}
                  </Button>
                )}

                {secondaryAction && (
                  <Button
                    size="lg"
                    variant="bordered"
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-3"
                    startContent={<Play size={20} />}
                    as={secondaryAction.href ? "a" : "button"}
                    href={secondaryAction.href}
                    onPress={secondaryAction.onClick}>
                    {secondaryAction.label}
                  </Button>
                )}
              </div>
            )}

            {/* Custom Children */}
            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
