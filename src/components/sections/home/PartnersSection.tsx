"use client";

import { Image } from "@heroui/react";
import Section from "@/components/ui/Section";

export default function PartnersSection() {
  const partners = [
    {
      name: "PTT",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80",
    },
    {
      name: "Shell",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80",
    },
    {
      name: "Chevron",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80",
    },
    {
      name: "Esso",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80",
    },
    {
      name: "Bangchak",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80",
    },
    {
      name: "IRPC",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80",
    },
  ];

  return (
    <Section background="gray" padding="xl">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          พันธมิตรทางธุรกิจ
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          เราภาคภูมิใจที่ได้ร่วมงานกับพันธมิตรชั้นนำในอุตสาหกรรมน้ำมันและพลังงาน
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 dark:text-gray-400">
          และพันธมิตรอื่นๆ อีกมากมายทั่วประเทศไทย
        </p>
      </div>
    </Section>
  );
}
