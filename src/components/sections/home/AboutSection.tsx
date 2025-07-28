"use client";

import ParallaxSection from "@/components/ui/ParallaxSection";
import MinimalButton from "@/components/ui/MinimalButton";
import { FeatureCard } from "@/components/ui/MinimalCard";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <ParallaxSection background="white" padding="xl" speed={0.05}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-px" style={{ backgroundColor: 'var(--primary-blue)' }}></div>
              <span className="font-bold tracking-wider uppercase text-sm" style={{ color: 'var(--primary-blue)' }}>เกี่ยวกับเรา</span>
            </div>

            <h2 className="text-4xl lg:text-5xl heading-construction leading-tight">
              ผู้เชี่ยวชาญด้าน
              <br />
              สถานีบริการน้ำมัน
            </h2>

            <p className="text-lg text-construction leading-relaxed">
              กลุ่มบริษัท ผดุงศิลป์ เป็นผู้นำด้านการก่อสร้างและวิศวกรรมสถานีบริการน้ำมัน
              ด้วยประสบการณ์กว่า 20 ปี เราได้สร้างความเชื่อมั่นให้กับลูกค้าทั่วประเทศไทย
            </p>
          </div>

          {/* Key Features - No emojis, minimal design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FeatureCard
              title="ประสบการณ์ยาวนาน"
              description="มากกว่า 20 ปีในอุตสาหกรรม"
            />
            <FeatureCard
              title="บริการครบวงจร"
              description="ตั้งแต่ออกแบบถึงบำรุงรักษา"
            />
            <FeatureCard
              title="มาตรฐานสากล"
              description="ISO 9001:2015 Certified"
            />
            <FeatureCard
              title="ทีมมืออาชีพ"
              description="วิศวกรและช่างเทคนิคชำนาญ"
            />
          </div>

          <div className="pt-4">
            <MinimalButton
              href="/pds-group"
              variant="secondary"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              เรียนรู้เพิ่มเติมเกี่ยวกับเรา
            </MinimalButton>
          </div>
        </div>

        {/* Right Content - Image with minimal design */}
        <div className="relative">
          <div className="aspect-[4/3] bg-gray-200 overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Construction team"
              width={2070}
              height={1380}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Minimal floating card - no rounded corners */}
          <div className="absolute -bottom-6 -left-6 bg-white p-8 shadow-xl border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-50 flex items-center justify-center">
                <CheckCircle className="w-8 h-8" style={{ color: 'var(--primary-blue)' }} />
              </div>
              <div>
                <div className="text-2xl font-black" style={{ color: 'var(--primary-blue)' }}>ISO 9001</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider font-bold">Quality Management</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
}
