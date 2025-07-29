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
      labelKey: "references.stats.build",
      targetValue: 300,
    },
    {
      icon: Users,
      labelKey: "references.stats.permatank",
      targetValue: 20000,
    },
    {
      icon: Award,
      labelKey: "references.stats.pipe",
      targetValue: 300,
    },
    {
      icon: Shield,
      labelKey: "references.stats.atg",
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
      className="py-16 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 100%)",
      }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
            ความเป็นเลิศที่พิสูจน์แล้ว
          </h2>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-6">
            กลุ่มบริษัทผดุงศิลป์พัฒนาแบบถังน้ำมันใต้ดินและงานสถานีบริการน้ำมันอย่างต่อเนื่อง
            มุ่งเน้นคุณภาพ ความปลอดภัย และมาตรฐานสูงสุด
          </p>
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl px-8 py-4 shadow-lg">
            <p className="text-lg md:text-xl text-gray-900 font-bold">
              ภายใต้นโยบาย "ถูกต้อง ถูกตังค์ ทันเวลา ปลอดภัย"
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-10 h-10 text-white" />
              </div>

              {/* Number */}
              <div className="text-5xl md:text-7xl font-bold text-white mb-2">
                {index === 0
                  ? `${animatedStats[index]}+`
                  : index === 1
                  ? `${animatedStats[index]}+`
                  : index === 2
                  ? `${animatedStats[index]}+`
                  : `${animatedStats[index]}+`}
              </div>

              {/* Label */}
              <div className="text-xl md:text-2xl text-white/90 font-medium">
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-12">
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            ด้วยประสบการณ์กว่า 50 ปี เราพร้อมให้บริการครบวงจร ตั้งแต่การออกแบบ
            ก่อสร้าง ติดตั้งระบบ และบำรุงรักษา
          </p>
        </div>
      </div>
    </section>
  );
}
