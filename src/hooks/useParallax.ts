"use client";

import { useEffect, useState, useCallback } from "react";

interface ParallaxOptions {
  speed?: number;
  offset?: number;
  disabled?: boolean;
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, offset = 0, disabled = false } = options;
  const [scrollY, setScrollY] = useState(0);
  const [transform, setTransform] = useState("translateY(0px)");

  const updateScrollY = useCallback(() => {
    if (disabled) return;

    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);

    // Fix parallax direction - negative value for natural movement
    const parallaxValue = -(currentScrollY + offset) * speed;
    setTransform(`translateY(${parallaxValue}px)`);
  }, [speed, offset, disabled]);

  useEffect(() => {
    if (disabled) return;

    // Throttle scroll events for better performance
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollY();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial call
    updateScrollY();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateScrollY, disabled]);

  return { scrollY, transform };
}

export function useParallaxMultiple(elements: ParallaxOptions[]) {
  const [scrollY, setScrollY] = useState(0);
  const [transforms, setTransforms] = useState<string[]>([]);

  const updateScrollY = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);

    const newTransforms = elements.map(
      ({ speed = 0.5, offset = 0, disabled = false }) => {
        if (disabled) return "translateY(0px)";
        // Fix parallax direction - negative value for natural movement
        const parallaxValue = -(currentScrollY + offset) * speed;
        return `translateY(${parallaxValue}px)`;
      }
    );

    setTransforms(newTransforms);
  }, [elements]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollY();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollY();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateScrollY]);

  return { scrollY, transforms };
}
