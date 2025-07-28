"use client";

import ParallaxSection from "@/components/ui/ParallaxSection";
import MinimalButton from "@/components/ui/MinimalButton";
import { Phone, Mail } from "lucide-react";

export default function CTASection() {
  return (
    <ParallaxSection background="dark" padding="xl" speed={0.03}>
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl lg:text-5xl heading-construction-white mb-8">
          พร้อมเริ่มโครงการใหม่?
        </h2>
        <p className="text-lg sm:text-xl text-construction-white mb-8 sm:mb-12 max-w-2xl mx-auto">
          ติดต่อเราวันนี้เพื่อปรึกษาโครงการสถานีบริการน้ำมันของคุณ
          ทีมผู้เชี่ยวชาญพร้อมให้คำแนะนำและบริการที่ดีที่สุด
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <MinimalButton
            href="/contact-us"
            variant="white"
            icon={<Phone className="w-5 h-5" />}
          >
            ติดต่อเรา
          </MinimalButton>
          <MinimalButton
            href="mailto:info@padungsilpa.com"
            variant="secondary"
            className="border-white text-white hover:bg-white hover:text-gray-900"
            icon={<Mail className="w-5 h-5" />}
          >
            ส่งอีเมล
          </MinimalButton>
        </div>
      </div>
    </ParallaxSection>
  );
}
