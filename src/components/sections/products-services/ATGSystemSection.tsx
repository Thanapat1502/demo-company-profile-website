"use client";

import { Cog, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import MinimalButton from "@/components/ui/MinimalButton";

export default function ATGSystemSection() {
  const locale = useLocale();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/udq5UVLwpds"
                title="ระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mr-6">
                <Cog size={32} className="text-orange-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                ระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน
              </h2>
            </div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                เป็นตัวแทนจำหน่ายและติดตั้งระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน
              </p>

              <p>
                อุปกรณ์วัดน้ำมันใต้ดิน เช่น
                เครื่องวัดระดับน้ำมันในถังอัตโนมัติ{" "}
                <strong className="text-orange-600">(ATG)</strong>
                ช่วยให้คุณสามารถตรวจสอบระดับน้ำมันในถังได้แบบ{" "}
                <strong className="text-gray-900">Real-Time</strong>
                เหมาะสำหรับสถานีบริการน้ำมันในยุคที่ราคาน้ำมันมีความผันผวน
              </p>

              <p>
                ระบบนี้ช่วยให้ผู้ประกอบการสามารถจัดการสต็อกน้ำมันได้อย่างมีประสิทธิภาพ
                ลดความสูญเสียจากการรั่วไหล และเพิ่มความแม่นยำในการบริหารจัดการ
              </p>

              <p>
                สามารถใช้ได้กับสถานีบริการน้ำมันภายในองค์กร
                สถานีบริการน้ำมันทั่วไป และคลังน้ำมันที่มีถังสูงถึง{" "}
                <strong className="text-orange-600">21 เมตร</strong>
              </p>
            </div>

            <div className="mt-8">
              <MinimalButton
                href={`/${locale}/contact-us`}
                variant="primary"
                icon={<ArrowRight className="w-5 h-5" />}>
                ติดต่อสอบถาม
              </MinimalButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
