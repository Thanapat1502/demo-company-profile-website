"use client";

import { useState, useEffect, useRef } from "react";
import { setTimeout } from "timers";

interface VideoHeroProps {
  videoSrc: string;
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function VideoHero({
  videoSrc,
  title,
  subtitle,
  description,
  children,
  className = "",
}: VideoHeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showTextMasks, setShowTextMasks] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      // Start playing video immediately
      video.play().catch(console.error);

      // After 3 seconds, hide text masks to show normal video content
      setTimeout(() => {
        setShowTextMasks(false);
      }, 3000);
    };

    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Loading Overlay */}
      <div
        className={`absolute inset-0 video-loading-overlay z-20 flex items-center justify-center transition-opacity duration-800 ${isVideoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium tracking-wide uppercase text-sm">Loading</p>
        </div>
      </div>

      {/* Video Background - Always playing */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Text Masks - Show video through text for 3 seconds */}
      <div className={`absolute inset-0 z-30 transition-opacity duration-1000 ${showTextMasks ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>

        {/* Container for text mask effect */}
        <div className="absolute inset-0 flex items-center justify-center text-mask-container">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              {subtitle && (
                <div className="mb-6">
                  <span
                    className="inline-block px-6 py-3 font-black tracking-wide uppercase text-sm video-text-mask"
                    style={{
                      fontSize: '14px',
                      fontWeight: '900',
                      background: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80) center/cover fixed',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: 'var(--primary-blue)' // Fallback
                    }}
                  >
                    {subtitle}
                  </span>
                </div>
              )}

              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-8 leading-tight video-text-mask"
                style={{
                  background: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80) center/cover fixed',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'var(--primary-blue)' // Fallback
                }}
              >
                {title}
              </h1>

              {description && (
                <p
                  className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-black leading-relaxed video-text-mask"
                  style={{
                    background: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80) center/cover fixed',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'var(--primary-blue)' // Fallback
                  }}
                >
                  {description}
                </p>
              )}

              {children && (
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dark Overlay for Text Readability when video is visible */}
      <div className={`absolute inset-0 bg-black/40 z-10 transition-opacity duration-1000 ${showTextMasks ? 'opacity-0' : 'opacity-100'
        }`}></div>

      {/* Content - Only visible when text masks are hidden */}
      <div className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-opacity duration-1000 ${showTextMasks ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
        <div className="max-w-4xl mx-auto">
          {subtitle && (
            <div className="mb-6">
              <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 text-white font-medium tracking-wide uppercase text-sm">
                {subtitle}
              </span>
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl heading-construction-white mb-8 leading-tight">
            {title}
          </h1>

          {description && (
            <p className="text-xl md:text-2xl text-construction-white mb-12 max-w-3xl mx-auto">
              {description}
            </p>
          )}

          {children && (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator - Minimal Design - Only visible when video is playing */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-1000 ${showTextMasks ? 'opacity-0' : 'opacity-100'
        }`}>
        <div className="w-px h-16 bg-white/60 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-transparent to-white/60"></div>
        </div>
      </div>
    </section>
  );
}
