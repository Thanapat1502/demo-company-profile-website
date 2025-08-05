"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Award, Building, Users, Shield } from "lucide-react";

export default function StatsSection() {
  const t = useTranslations();
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);

  const stats = [
    {
      icon: Building,
      label: "ก่อสร้างสถานีบริการน้ำมัน (สถานีบริการน้ำมัน)",
      targetValue: 300,
    },
    {
      icon: Users,
      label: "ผลิตถังน้ำมันใต้ดินผนัง2ชั้น PERMATANK® (ใบ)",
      targetValue: 20000,
    },
    {
      icon: Award,
      label: "จำหน่ายและติดตั้งท่อน้ำมันใต้ดินผนัง 2 ชั้น (สถานีบริการน้ำมัน)",
      targetValue: 300,
    },
    {
      icon: Shield,
      label: "จำหน่ายและติดตั้งระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน (ATG)",
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
      className="section-minimal relative overflow-hidden bg-gradient-to-br from-[var(--primary-blue)] via-blue-700 to-blue-900">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/20 via-transparent to-blue-900/20"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Strong & Minimal Style */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
            ความเป็นเลิศที่พิสูจน์แล้ว
          </h2>

          {/* Enhanced Elegant Line with Glow */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></div>
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"></div>
          </div>

          <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
            กลุ่มบริษัทผดุงศิลป์พัฒนาแบบถังน้ำมันใต้ดินและงานสถานีบริการน้ำมันอย่างต่อเนื่อง
            มุ่งเน้นคุณภาพ ความปลอดภัย และมาตรฐานสูงสุด
          </p>
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 shadow-lg">
            <p className="text-lg text-white font-bold tracking-wide">
              ภายใต้นโยบาย "ถูกต้อง ถูกตังค์ ทันเวลา ปลอดภัย"
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              {/* Icon - Minimal design without rounded corners */}
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <stat.icon className="w-10 h-10 text-white" />
              </div>

              {/* Number - Strong typography */}
              <div className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                {index === 0
                  ? `${animatedStats[index]}+`
                  : index === 1
                  ? `${animatedStats[index]}+`
                  : index === 2
                  ? `${animatedStats[index]}+`
                  : `${animatedStats[index]}+`}
              </div>

              {/* Label - Clean typography */}
              <div className="text-lg text-white/90 font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message - Clean typography */}
        <div className="text-center mt-16">
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            ด้วยประสบการณ์กว่า 50 ปี เราพร้อมให้บริการครบวงจร ตั้งแต่การออกแบบ
            ก่อสร้าง ติดตั้งระบบ และบำรุงรักษา
          </p>
        </div>
      </div>
    </section>
  );
}
