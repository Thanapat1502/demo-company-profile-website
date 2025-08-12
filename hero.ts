import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clean Energy Brand Palette
        primary: {
          50: "#f0f2fe",
          100: "#a6b1fa",
          200: "#5b70f7",
          300: "#2a45f4", // Main brand color
          400: "#112FF3",
          500: "#0b27df",
          600: "#0921ba",
          700: "#071a95",
          800: "#06146f",
          900: "#040d4a",
          950: "#040d4a",
        },
        // Clean whites and grays
        white: "#ffffff",
        gray: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373", // Text gray
          600: "#525252",
          700: "#404040", // Dark text
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        // Glass effect colors
        glass: {
          white: "rgba(255, 255, 255, 0.1)",
          light: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.2)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-noto-sans-thai)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "var(--font-noto-sans-thai)",
          "var(--font-poppins)",
          "system-ui",
          "sans-serif",
        ],
        thai: ["var(--font-noto-sans-thai)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
        "fade-in-up": "fadeInUp 1s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        "slide-in-left": "slideInLeft 1s ease-out",
        "slide-in-right": "slideInRight 1s ease-out",
        "scale-in": "scaleIn 0.6s ease-out",
        "parallax-slow": "parallax 30s linear infinite",
        "parallax-fast": "parallax 15s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 3s infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "nav-slide": "navSlide 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        parallax: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-100px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(14, 165, 233, 0.5)" },
          "100%": { boxShadow: "0 0 40px rgba(14, 165, 233, 0.8)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(123, 191, 213, 0.3)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(123, 191, 213, 0.6)",
            transform: "scale(1.02)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        navSlide: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        // Glass effect gradients
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        "glass-border":
          "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
        "primary-gradient": "linear-gradient(135deg, #112FF3 0%, #112FF3 100%)",
        "primary-glass":
          "linear-gradient(135deg, rgba(123,191,213,0.1) 0%, rgba(74,155,181,0.05) 100%)",

        // Clean backgrounds
        "hero-overlay":
          "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)",
        "white-glass":
          "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",

        // Minimal patterns for texture
        "glass-pattern":
          'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
      },
      boxShadow: {
        glass:
          "0 8px 32px 0 rgba(123, 191, 213, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
        "glass-strong":
          "0 25px 50px -12px rgba(123, 191, 213, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
        "glass-subtle":
          "0 4px 16px 0 rgba(123, 191, 213, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
        primary: "0 10px 25px rgba(123, 191, 213, 0.3)",
        "primary-glow": "0 0 20px rgba(123, 191, 213, 0.4)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              50: "#f0f9ff",
              100: "#e0f2fe",
              200: "#bae6fd",
              300: "#7dd3fc",
              400: "#38bdf8",
              500: "#0ea5e9",
              600: "#0284c7",
              700: "#0369a1",
              800: "#075985",
              900: "#0c4a6e",
              DEFAULT: "#0ea5e9",
              foreground: "#ffffff",
            },
            secondary: {
              50: "#ecfdf5",
              100: "#d1fae5",
              200: "#a7f3d0",
              300: "#6ee7b7",
              400: "#34d399",
              500: "#10b981",
              600: "#059669",
              700: "#047857",
              800: "#065f46",
              900: "#064e3b",
              DEFAULT: "#10b981",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
  ],
};
