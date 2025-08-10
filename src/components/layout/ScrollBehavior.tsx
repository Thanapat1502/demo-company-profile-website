"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { applyGlobalScrollOffset } from '@/hooks/useScrollToSection';

/**
 * Global scroll behavior component
 * Handles smooth scrolling with navbar offset for the entire application
 */
export const ScrollBehavior: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Apply global scroll offset styles
    applyGlobalScrollOffset();
  }, []);

  useEffect(() => {
    // Handle hash navigation when pathname changes (for navigation between pages with hashes)
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure page content is loaded
      const timer = setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          const navbarHeight = window.scrollY <= 50 ? 100 : 80;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navbarHeight - 20;

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });
        }
      }, 300); // Increased delay for page transitions

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // This component doesn't render anything
  return null;
};
