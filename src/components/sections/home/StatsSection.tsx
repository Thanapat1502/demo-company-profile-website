"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Award, Building, Users, Shield } from "lucide-react";
import Image from "next/image";

export default function StatsSection() {
  const t = useTranslations();
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);

  const stats = [
    {
      icon: Building,
      label: t("home.stats.gasStationConstruction"),
      targetValue: 300,
    },
    {
      icon: Users,
      label: t("home.stats.permatankProduction"),
      targetValue: 20000,
    },
    {
      icon: Award,
      label: t("home.stats.pipeInstallation"),
      targetValue: 300,
    },
    {
      icon: Shield,
      label: t("home.stats.atgSystem"),
      targetValue: 50,
    },
  ];

  useEffect(() => {
    const animateStats = () => {
      stats.forEach((stat, index) => {
        let current = 0;
        const increment = stat.targetValue / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.targetValue) {
            current = stat.targetValue;
            clearInterval(timer);
          }
          setAnimatedStats((prev) => {
            const newStats = [...prev];
            newStats[index] = Math.floor(current);
            return newStats;
          });
        }, 50);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateStats();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("stats-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats-section"
      className="relative flex items-center py-8">

      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-sections/hero-banner-1.jpg"
          alt="Construction background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        {/* Refined Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/45 to-black/70"></div>

        {/* Subtle Glass Effects */}
        <div className="absolute inset-0">
          {/* Minimal Orbs */}
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-white/5 to-blue-300/8 rounded-full blur-xl opacity-60"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-primary-300/6 to-white/4 rounded-full blur-lg opacity-40"
            style={{ animationDelay: '2s' }}></div>

          {/* Clean Gradient Layer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/15"></div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Refined Header */}
        <div className="text-center mb-12">

          {/* Clean Badge */}
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/50 to-white/70"></div>
            <div className="px-6 py-2 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full
                          hover:bg-white/12 transition-all duration-300">
              <span className="text-white font-medium text-xs uppercase tracking-[0.3em] font-mono">
                Our Achievements
              </span>
            </div>
            <div className="w-8 h-px bg-gradient-to-l from-transparent via-white/50 to-white/70"></div>
          </div>

          {/* Clean Title */}
          <div className="relative mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[0.9]">
              {t("home.stats.title")}
            </h2>

            {/* Simple Underline */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5
                          bg-gradient-to-r from-white/60 via-blue-300 to-white/60 rounded-full"></div>
          </div>

          {/* Clean Description */}
          <div className="max-w-2xl mx-auto mb-6">
            <p className="text-lg text-white/85 font-normal leading-relaxed">
              {t("home.stats.description")}
            </p>
          </div>

          {/* Clean Policy Statement */}
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3
                        hover:bg-white/15 transition-all duration-300">
            <p className="text-lg text-white font-semibold tracking-wide uppercase">
              {t("home.stats.policy")}
            </p>
          </div>
        </div>

        {/* Refined Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">

              {/* Clean Icon Container */}
              <div className="relative mb-4">
                {/* <div className="w-20 h-20 mx-auto bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl
                             flex items-center justify-center shadow-lg shadow-black/20
                             group-hover:bg-white/12 group-hover:border-white/25 group-hover:-translate-y-1
                             transition-all duration-300 ease-out">
                  <stat.icon className="w-10 h-10 text-white/90 group-hover:text-white transition-colors duration-300" />
                </div> */}
              </div>

              {/* Clean Number Display */}
              <div className="relative mb-3">
                <div className="inline-block bg-white/0 backdrop-blur-xs rounded-lg px-4 py-3
                             shadow-none shadow-black/25 group-hover:bg-white/15
                             transition-all duration-300 ease-out">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-none
                               group-hover:text-blue-200 transition-all duration-300">
                    {animatedStats[index]}
                    <span className="text-white">+</span>
                  </div>
                </div>
              </div>

              {/* Clean Label */}
              <div className="bg-white/6 backdrop-blur-sm border border-white/15 rounded-lg px-3 py-2 mx-auto max-w-[180px]
                           shadow-sm shadow-black/20 group-hover:bg-white/10
                           transition-all duration-300 ease-out">
                <div className="text-sm text-white/85 font-medium tracking-wide leading-tight
                             group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clean Bottom Message */}
        <div className="text-center">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/8 backdrop-blur-xs border border-white/5 rounded-xl p-6
                          shadow-md shadow-black/25 hover:bg-white/12
                          transition-all duration-300 ease-out group">
              <p className="text-lg text-white/85 font-medium leading-relaxed group-hover:text-white
                         transition-colors duration-300">
                {t("home.stats.bottomMessage")}
              </p>

              {/* Simple Accent Lines */}
              <div className="flex justify-center mt-4 space-x-2">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
