"use client";

import { useEffect, useRef, useState } from "react";

interface ParallaxWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxWrapper({ children, className = "" }: ParallaxWrapperProps) {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Hero Section with Parallax Text */}
      <div className="relative">
        {/* Background images stay fixed */}
        <div className="hero-background">
          {Array.isArray(children) ? children[0] : children}
        </div>

        {/* Text content with parallax effect */}
        <div
          className="hero-text-parallax"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          {/* This will be handled by modifying the ImageCarouselHero component */}
        </div>
      </div>

      {/* Services Section with Parallax Overlap */}
      <div
        className="services-parallax"
        style={{
          transform: `translateY(${-scrollY * 0.3}px)`,
          zIndex: 10,
        }}
      >
        {Array.isArray(children) && children[1] ? children[1] : null}
      </div>
    </div>
  );
}
