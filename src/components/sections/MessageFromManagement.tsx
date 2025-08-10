"use client";

import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

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
  const t = useTranslations();
  const currentTitle = t(
    "company.executive.messageFromManagement.sectionLabel"
  );
  const currentSubtitle = t("company.executive.messageFromManagement.title");
  const currentMessages = locale === "th" ? messages.th : messages.en;

  return (
    <section id='executive-message' className={`py-8 lg:py-12 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
            {currentSubtitle}
          </h2>

          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-[var(--primary-blue)]"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white md:border border-gray-100 md:shadow-lg hover:shadow-xl transition-shadow duration-500 overflow-hidden">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Managing Director Image */}
              <div className="md:col-span-2 relative group flex items-start pt-0 lg:pt-12 xl:pt-16">
                <div className="relative bg-gray-100 overflow-hidden flex-1">
                  <Image
                    src="/images/managements/ceo.jpeg"
                    alt={locale === "th" ? "กรรมการผู้จัดการ" : "Managing Director"}
                    // fill
                    width={1024}
                    height={1024}
                    quality={100}
                    className="object-cover object-center w-full h-[200px] md:h-full transition-transform duration-700 group-hover:scale-105"
                    // sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                  {/* Professional overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:from-black/10"></div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[var(--primary-blue)]/20 to-transparent"></div>
                </div>
              </div>

              {/* Message Content */}
              <div className="md:col-span-3 p-4 lg:p-12 xl:p-16 flex flex-col justify-center relative">
                {/* Background Pattern */}
                <div className="absolute top-8 right-8 w-32 h-32 opacity-5">
                  <div className="w-full h-full bg-[var(--primary-blue)] transform rotate-45"></div>
                </div>

                {/* Messages */}
                <div className="space-y-8 mb-4 relative z-10">
                  {currentMessages.map((message, index) => (
                    <p
                      key={index}
                      className="text-lg lg:text-xl text-gray-700 !leading-normal font-normal tracking-wide"
                      style={{
                        animationDelay: `${index * 200}ms`,
                      }}>
                      {message}
                    </p>
                  ))}
                </div>

                {/* Signature Section */}
                <div className="border-t border-gray-200 pt-8 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-xl mb-0">
                        {locale === "th"
                          ? "คุณสุภรา สินสมุทรผดุง"
                          : "SUPARA SINSAMUTPHADUNG"
                        }
                      </h4>
                      <h4 className="font-normal text-gray-900 text-xl mb-0">
                        {locale === "th"
                          ? "กรรมการผู้จัดการ"
                          : "Managing Director"
                        }
                      </h4>
                      {/* <p className="text-gray-600 text-base font-medium">
                        {locale === "th"
                          ? "บริษัท ผดุงศิลป์โยธาการ จำกัด"
                          : "Padungsilpa Engineering Co., Ltd."
                        }
                      </p> */}
                    </div>
                    <div className="hidden md:flex flex-col items-center gap-2">
                      <div className="w-20 h-px bg-[var(--primary-blue)]"></div>
                      <div className="w-12 h-px bg-[var(--primary-blue)] opacity-50"></div>
                    </div>
                  </div>
                </div>
              </div>
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
    "ในนามของกลุ่มบริษัท ผดุงศิลป์ฯ ข้าพเจ้าขอแสดงความขอบคุณทุกท่านที่ได้ให้ความไว้วางใจและสนับสนุนบริษัทของเราเสมอมา พวกเรามุ่งมั่นรักษาพนักงานระดับปฏิบัติการและบริหารที่มีความเป็นเลิศ โดยทุกคนมีเป้าหมายเดียวกันในการนำเสนองานก่อสร้าง สินค้า และบริการที่ดีที่สุด รวมถึงบุคลากรที่มีความรู้ความสามารถเป็นเยี่ยม ช่างเทคนิคและผู้จัดการโครงการของเราได้รับการฝึกฝนและรับรองอย่างดี และมีประสบการณ์ในอุตสาหกรรมน้ำมันและพลังงานอื่นๆ เป็นอย่างมาก ซึ่งเป็นการรับรองว่าผลงานและบริการของเราจะมีคุณภาพและตอบสนองต่อความต้องการของอุตสาหกรรมได้อย่างฉับไว",
    "กลุ่มบริษัทในเครือ ผดุงศิลป์ฯ พร้อมเผชิญกับอุปสรรคต่างๆ ในอนาคต ด้วยความมุ่งมั่นที่จะนำเสนอผลงานและบริการที่มีคุณภาพดีและโดดเด่น สมกับที่ทุกท่านได้ให้ความไว้วางใจเรา ขอขอบพระคุณอีกครั้งสำหรับการสนับสนุนและความไว้วางใจที่มีให้กับกลุ่มบริษัท ผดุงศิลป์ฯ พวกเราจะยังคงมุ่งมั่นพัฒนาต่อไปเพื่อสร้างสรรค์คุณค่าและตอบสนองต่อความต้องการของทุกท่านอย่างดีที่สุด",
  ],
  en: [
    "As Managing Director of Padungsilpa Engineering Co., Ltd., I am proud to be part of Thailand's energy industry development for over 30 years.",
    "We have created quality and safe fuel station projects with international standard PERMATANK® technology and professional teams with experience and expertise.",
    "We will continue to strive for excellent service and create innovations to meet customer and society needs sustainably.",
  ],
};
