"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Navbar height constants
const NAVBAR_HEIGHT_TOP = 100; // When at top of page
const NAVBAR_HEIGHT_SCROLLED = 80; // When scrolled
const ADDITIONAL_OFFSET = 20; // Extra padding for better visual spacing

/**
 * Custom hook to handle smooth scrolling to sections with navbar offset
 */
export const useScrollToSection = () => {
  const router = useRouter();

  // Function to get current navbar height based on scroll position
  const getNavbarHeight = (): number => {
    if (typeof window === 'undefined') return NAVBAR_HEIGHT_SCROLLED;
    
    const scrollY = window.scrollY;
    return scrollY <= 50 ? NAVBAR_HEIGHT_TOP : NAVBAR_HEIGHT_SCROLLED;
  };

  // Function to scroll to a section with proper offset
  const scrollToSection = (sectionId: string, smooth: boolean = true) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const navbarHeight = getNavbarHeight();
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - navbarHeight - ADDITIONAL_OFFSET;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: smooth ? 'smooth' : 'auto'
    });
  };

  // Function to handle hash navigation
  const handleHashNavigation = (hash: string) => {
    if (!hash || hash === '#') return;
    
    const sectionId = hash.replace('#', '');
    
    // Small delay to ensure page is loaded
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  };

  // Function to navigate to a page with hash
  const navigateToSection = (href: string) => {
    const [path, hash] = href.split('#');
    
    if (hash) {
      // If it's the same page, just scroll
      if (path === window.location.pathname || path === '') {
        handleHashNavigation(`#${hash}`);
        return;
      }
      
      // If it's a different page, navigate then scroll
      router.push(href);
    } else {
      router.push(href);
    }
  };

  // Effect to handle initial hash on page load and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        handleHashNavigation(hash);
      }
    };

    // Handle initial hash on page load
    if (window.location.hash) {
      handleHashNavigation(window.location.hash);
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return {
    scrollToSection,
    navigateToSection,
    handleHashNavigation
  };
};

/**
 * Global CSS scroll offset utility
 * This ensures that when clicking anchor links, the scroll position accounts for the navbar
 */
export const applyGlobalScrollOffset = () => {
  if (typeof document === 'undefined') return;

  // Add CSS for scroll padding to account for fixed navbar
  const style = document.createElement('style');
  style.textContent = `
    html {
      scroll-padding-top: 120px; /* Maximum navbar height + extra padding */
      scroll-behavior: smooth;
    }
    
    /* Ensure smooth scrolling for all anchor links */
    a[href*="#"]:not([href="#"]) {
      scroll-behavior: smooth;
    }
    
    /* Custom scroll offset for sections */
    section[id], div[id], h1[id], h2[id], h3[id], h4[id], h5[id], h6[id] {
      scroll-margin-top: 120px;
    }
  `;
  
  document.head.appendChild(style);
};
