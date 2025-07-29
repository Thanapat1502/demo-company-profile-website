"use client";

import { Building2, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import MinimalButton from "@/components/ui/MinimalButton";

export default function ConstructionServiceSection() {
  const locale = useLocale();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mr-6">
                <Building2 size={32} className="text-blue-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                งานก่อสร้างสถานีบริการน้ำมัน
              </h2>
            </div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">
                  บริษัท ผดุงศิลป์โยธาการ จำกัด (PCW)
                </strong>
                เป็นบริษัทฯก่อสร้างชั้นนำที่เชี่ยวชาญและมากด้วยประสบการณ์ในงานก่อสร้างสถานีบริการน้ำมัน
                และก๊าซ ตลอดจนงานอื่นๆที่เกี่ยวข้อง
                เนื่องจากมีผลงานเป็นที่เชื่อถือ และได้รับความไว้วางใจ
                จากบริษัทน้ำมันชั้นนำ
              </p>

              <p>
                ด้วยประสบการณ์ในการก่อสร้างสถานีบริการน้ำมันมากกว่า{" "}
                <strong className="text-blue-600">50 ปี</strong>
                ทำให้เราเข้าใจถึงความต้องการและข้อกำหนดเฉพาะของอุตสาหกรรมนี้เป็นอย่างดี
              </p>

              <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-600">
                <p className="font-semibold text-blue-900 text-xl">
                  ภายใต้นโยบาย &ldquo;ถูกต้อง ถูกตังค์ ทันเวลา ปลอดภัย&rdquo;
                </p>
              </div>

              <p>
                เราให้บริการครบวงจรตั้งแต่การออกแบบ การก่อสร้าง
                การติดตั้งอุปกรณ์ และการบำรุงรักษา
                เพื่อให้ลูกค้าได้รับบริการที่สมบูรณ์แบบและมีคุณภาพสูงสุด
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

          <div className="relative">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="งานก่อสร้างสถานีบริการน้ำมัน"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
