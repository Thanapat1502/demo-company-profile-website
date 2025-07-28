"use client";

import ParallaxSection from "@/components/ui/ParallaxSection";
import { StatCard } from "@/components/ui/MinimalCard";

export default function StatsSection() {
  return (
    <ParallaxSection background="gray" padding="xl" speed={0.1}>
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl heading-construction mb-6">
          ความสำเร็จในตัวเลข
        </h2>
        <div className="w-24 h-1 mx-auto" style={{ backgroundColor: 'var(--primary-blue)' }}></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          number="500+"
          label="โครงการที่สำเร็จ"
          sublabel="สถานีบริการน้ำมัน"
        />
        <StatCard
          number="20+"
          label="ปีประสบการณ์"
          sublabel="ในอุตสาหกรรม"
        />
        <StatCard
          number="200+"
          label="ทีมงานมืออาชีพ"
          sublabel="วิศวกรและช่างเทคนิค"
        />
        <StatCard
          number="100%"
          label="ความพึงพอใจ"
          sublabel="จากลูกค้า"
        />
      </div>
    </ParallaxSection>
  );
}
