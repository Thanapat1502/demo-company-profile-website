"use client";

import { Wrench, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import MinimalButton from "@/components/ui/MinimalButton";

export default function PipeInstallationSection() {
  const locale = useLocale();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mr-6">
                <Wrench size={32} className="text-purple-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                จำหน่ายและติดตั้งท่อน้ำมันใต้ดินผนัง 2 ชั้น
              </h2>
            </div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                ด้วยประสบการณ์การติดตั้งท่อน้ำมันแบบผนัง 2 ชั้นมากกว่า{" "}
                <strong className="text-purple-600">20 ปี</strong>
                บริษัท ผดุงศิลป์วิศวการ จำกัด
                เป็นตัวแทนจำหน่ายและติดตั้งท่อน้ำมันยี่ห้อ
                <strong className="text-gray-900">
                  NUPIGECO S.P.A.
                </strong>{" "}
                รุ่น Smartflex และ Ecoflex ซึ่งผลิตในประเทศอิตาลี
              </p>

              <p>
                ผลิตจากวัสดุ{" "}
                <strong className="text-purple-600">
                  Polyethylene (PE) และ Polyamide (PA)
                </strong>{" "}
                ที่มีคุณสมบัติพิเศษในการป้องกันการรั่วไหลของน้ำมัน
                และสามารถตรวจจับการรั่วไหลได้แบบ Real-Time
              </p>

              <p>
                ระบบท่อนี้ได้รับการรับรองมาตรฐานจาก{" "}
                <strong className="text-gray-900">
                  European Standard EN 14125
                </strong>{" "}
                และผ่านการทดสอบในสภาพแวดล้อมที่หลากหลาย
                รับประกันความทนทานและความปลอดภัยสูงสุด
              </p>

              <p>
                โดยมีทีมงานติดตั้งที่ได้รับการฝึกอบรมจากเจ้าของผลิตภัณฑ์โดยตรง
                ด้วยประสบการณ์มากกว่า{" "}
                <strong className="text-purple-600">300 โครงการ</strong>
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
                alt="จำหน่ายและติดตั้งท่อน้ำมันใต้ดินผนัง 2 ชั้น"
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
