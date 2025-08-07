"use client";

import { Mail } from "lucide-react";

interface MessageFromManagementProps {
  locale: string;
  title?: {
    th: string;
    en: string;
  };
  subtitle?: {
    th: string;
    en: string;
  };
  messages: {
    th: string[];
    en: string[];
  };

  className?: string;
}

export default function MessageFromManagement({
  locale,
  title = {
    th: "สาส์นจากผู้บริหาร",
    en: "Message from Management",
  },
  subtitle = {
    th: "สาส์นจากผู้บริหาร",
    en: "Message from Management",
  },
  messages,
  className = "",
}: MessageFromManagementProps) {
  const currentTitle = locale === "th" ? title.th : title.en;
  const currentSubtitle = locale === "th" ? subtitle.th : subtitle.en;
  const currentMessages = locale === "th" ? messages.th : messages.en;

  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
              {currentTitle}
            </span>
            <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {currentSubtitle}
          </h2>

          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-[var(--primary-blue)]"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-100 shadow-sm p-8 lg:p-12">
            <div className="space-y-6">
              {currentMessages.map((message, index) => (
                <p
                  key={index}
                  className="text-lg text-gray-700 leading-relaxed text-left">
                  {message}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Default message content for Padungsilpa
export const defaultManagementMessage = {
  th: [
    "ในฐานะกรรมการผู้จัดการของบริษัท ผดุงศิลป์โยธาการ จำกัด ผมรู้สึกภาคภูมิใจที่ได้เป็นส่วนหนึ่งของการพัฒนาอุตสาหกรรมพลังงานของประเทศไทย มาเป็นเวลากว่า 30 ปี",
    "เราได้สร้างสรรค์โครงการสถานีบริการน้ำมันที่มีคุณภาพและปลอดภัย ด้วยเทคโนโลยี PERMATANK® ที่เป็นมาตรฐานสากล และทีมงานมืออาชีพที่มีประสบการณ์และความเชี่ยวชาญ",
    "เราจะยังคงมุ่งมั่นในการให้บริการที่เป็นเลิศ และสร้างสรรค์นวัตกรรมเพื่อตอบสนองความต้องการของลูกค้า และสังคมอย่างยั่งยืน",
  ],
  en: [
    "As Managing Director of Padungsilpa Engineering Co., Ltd., I am proud to be part of Thailand's energy industry development for over 30 years.",
    "We have created quality and safe fuel station projects with international standard PERMATANK® technology and professional teams with experience and expertise.",
    "We will continue to strive for excellent service and create innovations to meet customer and society needs sustainably.",
  ],
};
