"use client";

import Section from "@/components/ui/Section";

export default function StatsSection() {
  const stats = [
    { number: "300+", label: "ก่อสร้างสถานีบริการน้ำมัน (สถานีบริการน้ำมัน)" },
    {
      number: "20,000+",
      label: "ผลิตถังน้ำมันใต้ดินผนัง2ชั้น PERMATANK® (ใบ)",
    },
    {
      number: "300+",
      label: "จำหน่ายและติดตั้งท่อน้ำมันใต้ดินผนัง 2 ชั้น (สถานีบริการน้ำมัน)",
    },
    {
      number: "50+",
      label: "จำหน่ายและติดตั้งระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน (ATG)",
    },
  ];

  return (
    <Section background="white" padding="lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
              {stat.number}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
