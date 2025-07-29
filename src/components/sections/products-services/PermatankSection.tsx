"use client";

import { Fuel, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import MinimalButton from "@/components/ui/MinimalButton";

export default function PermatankSection() {
  const locale = useLocale();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/HTzu3zmGk80"
                title="PERMATANK และถังน้ำมันแบบต่าง ๆ"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mr-6">
                <Fuel size={32} className="text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                PERMATANK และถังน้ำมันแบบต่าง ๆ
              </h2>
            </div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                ถังน้ำมันใต้ดินแบบผนัง 2 ชั้นของบริษัท ผดุงศิลป์วิศวการ จำกัด
                ในชื่อผลิตภัณฑ์
                <strong className="text-gray-900">&apos;PERMATANK&apos;</strong>{" "}
                ได้รับการผลิตตามมาตรฐาน
                <strong className="text-blue-600">
                  UL 58 & UL 1746
                </strong>{" "}
                โดยใช้เทคโนโลยีจากสถาบัน Steel Tank Institute Technology, USA
              </p>

              <div className="bg-green-50 p-6 rounded-2xl border-l-4 border-green-600">
                <p className="font-semibold text-green-900 text-xl">
                  ภายใต้นโยบาย &ldquo;ถูกต้อง ถูกตังค์ ทันเวลา ปลอดภัย&rdquo;
                </p>
              </div>

              <p>
                เราพัฒนาแบบถังน้ำมันใต้ดินและอุปกรณ์ที่เกี่ยวข้องอย่างต่อเนื่อง
                เพื่อประโยชน์สูงสุดของลูกค้า ผู้รับเหมา และผู้ค้าอื่น ๆ
                ที่เกี่ยวข้องกับงานสถานีบริการน้ำมัน
              </p>

              <p>
                เพื่อให้มั่นใจว่าลูกค้าได้รับสินค้าที่มีคุณภาพและมีอายุการใช้งานยาวนานกว่า
                <strong className="text-green-600">30 ปี</strong>{" "}
                ผดุงศิลป์ให้ความสำคัญกับทุกขั้นตอนของกระบวนการผลิตและจัดส่ง
                PERMATANK®
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
