"use client";

import React, { useState } from "react";

interface YouTubeEmbedProps {
  url: string;
  title?: string;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1";
  autoplay?: boolean;
  showControls?: boolean;
  enableDebug?: boolean;
}

export default function YouTubeEmbed({
  url,
  title = "YouTube Video",
  className = "",
  aspectRatio = "16/9",
  autoplay = false,
  showControls = true,
  enableDebug = false,
}: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Convert YouTube URL to embed format
  const convertToEmbedUrl = (inputUrl: string): string => {
    if (!inputUrl) {
      console.warn("YouTubeEmbed: No URL provided");
      return "";
    }

    let videoId = "";
    let embedUrl = "";

    // Debug logging
    if (enableDebug) {
      console.log("🎥 YouTubeEmbed Debug:");
      console.log("- Input URL:", inputUrl);
    }

    try {
      // Handle different YouTube URL formats
      if (inputUrl.includes("youtube.com/watch?v=")) {
        // Standard YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
        videoId = inputUrl.split("v=")[1]?.split("&")[0];
        if (enableDebug) console.log("- Detected youtube.com/watch format");
      } else if (inputUrl.includes("youtu.be/")) {
        // Short YouTube URL: https://youtu.be/VIDEO_ID
        videoId = inputUrl.split("youtu.be/")[1]?.split("?")[0];
        if (enableDebug) console.log("- Detected youtu.be format");
      } else if (inputUrl.includes("youtube.com/embed/")) {
        // Already embed format: https://www.youtube.com/embed/VIDEO_ID
        embedUrl = inputUrl;
        videoId = inputUrl.split("/embed/")[1]?.split("?")[0];
        if (enableDebug) console.log("- Already in embed format");
      } else {
        console.error("YouTubeEmbed: Unsupported YouTube URL format:", inputUrl);
        setHasError(true);
        return "";
      }

      // Build embed URL if not already in embed format
      if (!embedUrl && videoId) {
        const params = new URLSearchParams();
        
        if (autoplay) params.append("autoplay", "1");
        if (!showControls) params.append("controls", "0");
        
        // Add other useful parameters
        params.append("rel", "0"); // Don't show related videos
        params.append("modestbranding", "1"); // Minimal YouTube branding
        
        const queryString = params.toString();
        embedUrl = `https://www.youtube.com/embed/${videoId}${queryString ? `?${queryString}` : ""}`;
      }

      if (enableDebug) {
        console.log("- Extracted videoId:", videoId);
        console.log("- Final embed URL:", embedUrl);
        console.log("- Is valid:", !!videoId && embedUrl.includes("/embed/"));
        console.log("=====================================");
      }

      return embedUrl;
    } catch (error) {
      console.error("YouTubeEmbed: Error converting URL:", error);
      setHasError(true);
      return "";
    }
  };

  const embedUrl = convertToEmbedUrl(url);
  const videoId = embedUrl.split("/embed/")[1]?.split("?")[0];

  // Get aspect ratio class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "4/3":
        return "aspect-[4/3]";
      case "1/1":
        return "aspect-square";
      default:
        return "aspect-video"; // 16:9
    }
  };

  if (!embedUrl || hasError) {
    return (
      <div className={`${getAspectRatioClass()} bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm">Video unavailable</p>
          {enableDebug && (
            <p className="text-xs mt-2 text-red-500">
              Invalid URL: {url}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${getAspectRatioClass()} ${className}`}>
      {/* Debug info overlay */}
      {enableDebug && process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 z-10 bg-black/80 text-white text-xs p-2 rounded max-w-xs">
          <div><strong>Video ID:</strong> {videoId}</div>
          <div><strong>Embed URL:</strong> {embedUrl.substring(0, 50)}...</div>
          <div><strong>Status:</strong> {isLoaded ? '✅ Loaded' : '⏳ Loading'}</div>
        </div>
      )}

      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <p className="text-sm">Loading video...</p>
          </div>
        </div>
      )}

      {/* YouTube iframe */}
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => {
          setIsLoaded(true);
          if (enableDebug) console.log("✅ YouTubeEmbed iframe loaded successfully");
        }}
        onError={(e) => {
          setHasError(true);
          if (enableDebug) console.error("🚨 YouTubeEmbed iframe error:", e);
        }}
      />
    </div>
  );
}
