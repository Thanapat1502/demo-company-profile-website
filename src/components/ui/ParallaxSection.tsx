"use client";

import { ReactNode } from 'react';
import { useParallax } from '@/hooks/useParallax';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  offset?: number;
  className?: string;
  background?: 'white' | 'gray' | 'dark';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function ParallaxSection({
  children,
  speed = 0.5,
  offset = 0,
  className = '',
  background = 'white',
  padding = 'lg',
}: ParallaxSectionProps) {
  const { transform } = useParallax({ speed, offset });

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900',
  };

  const paddingClasses = {
    sm: 'section-minimal py-16',
    md: 'section-minimal py-20',
    lg: 'section-minimal py-24',
    xl: 'section-minimal-large py-32',
  };

  return (
    <section className={`parallax-container ${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}>
      <div 
        className="parallax-element"
        style={{ transform }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </section>
  );
}

interface ParallaxBackgroundProps {
  children: ReactNode;
  backgroundImage?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  speed?: number;
  className?: string;
}

export function ParallaxBackground({
  children,
  backgroundImage,
  overlay = true,
  overlayOpacity = 0.6,
  speed = 0.3,
  className = '',
}: ParallaxBackgroundProps) {
  const { transform } = useParallax({ speed });

  return (
    <section className={`relative parallax-container min-h-screen flex items-center ${className}`}>
      {/* Background Image with Parallax */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 parallax-bg"
          style={{ 
            transform,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
      )}

      {/* Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </section>
  );
}
