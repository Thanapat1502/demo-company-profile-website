"use client";

import { Cog, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import MinimalButton from "@/components/ui/MinimalButton";

export default function TankServicesSection() {
  const locale = useLocale();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="บริการต่าง ๆ เกี่ยวกับถังน้ำมัน"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mr-6">
                <Cog size={32} className="text-indigo-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                บริการต่าง ๆ เกี่ยวกับถังน้ำมัน
              </h2>
            </div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <div className="bg-indigo-50 p-6 rounded-2xl border-l-4 border-indigo-600">
                <p className="font-semibold text-indigo-900 text-xl mb-4">
                  บริษัท ผดุงศิลป์วิศวการ จำกัด
                </p>
                <ol className="space-y-2 text-indigo-800">
                  <li>1. งานตรวจสอบการติดตั้งถัง PERMATANK</li>
                  <li>2. งานติดตั้งระบบท่อ NUPI-UPP-KPS</li>
                  <li>3. งานติดตั้ง TANK SUMP</li>
                  <li>4. งานติดตั้ง NANO ATG & ProGauge</li>
                  <li>5. งาน 3D SCAN</li>
                </ol>
              </div>

              <p>
                กลุ่มบริษัท ผดุงศิลป์
                จะรักษาไว้ซึ่งพนักงานชั้นเยี่ยมในระดับปฏิบัติการ และบริหาร
                โดยที่ทุกคนมีเป้าหมายเดียวกันในการนำเสนอลูกค้าด้วยผลงานก่อสร้าง,
                สินค้า และบริการ ซึ่งไม่เพียงแต่ดีที่สุดเท่านั้น
                ยังรวมไปถึงบุคลากรที่มีความรู้ ความสามารถเป็นเยี่ยม
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
