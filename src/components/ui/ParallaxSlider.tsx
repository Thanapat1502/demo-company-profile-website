"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardBody, Button, Chip } from "@heroui/react";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ParallaxSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  date?: string;
  href?: string;
}

interface ParallaxSliderProps {
  slides: ParallaxSlide[];
  autoSlideDelay?: number;
  height?: string;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
}

export default function ParallaxSlider({
  slides,
  autoSlideDelay = 10000,
  height = "h-96",
  showControls = true,
  showIndicators = true,
  className = "",
}: ParallaxSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying && slides.length > 1) {
      intervalRef.current = setInterval(nextSlide, autoSlideDelay);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, autoSlideDelay, slides.length]);

  // Pause auto-slide on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (!slides.length) return null;

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${height} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Images with Parallax Effect */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === currentSlide ? "translate-x-0" : 
            index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <Card className="bg-white/10 backdrop-blur-md border border-white/20">
              <CardBody className="p-6">
                {slides[currentSlide].category && (
                  <Chip
                    size="sm"
                    color="primary"
                    variant="solid"
                    className="mb-3"
                  >
                    {slides[currentSlide].category}
                  </Chip>
                )}
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {slides[currentSlide].title}
                </h2>
                
                <p className="text-white/90 mb-4 line-clamp-3">
                  {slides[currentSlide].description}
                </p>
                
                <div className="flex items-center justify-between">
                  {slides[currentSlide].date && (
                    <div className="flex items-center text-white/80 text-sm">
                      <Calendar size={16} className="mr-2" />
                      {slides[currentSlide].date}
                    </div>
                  )}
                  
                  {slides[currentSlide].href && (
                    <Button
                      as={Link}
                      href={slides[currentSlide].href}
                      color="primary"
                      variant="solid"
                      endContent={<ArrowRight size={16} />}
                    >
                      Read More
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {showControls && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
