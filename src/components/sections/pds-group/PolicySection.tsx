"use client";

import { useLocale } from "next-intl";
import { CheckCircle, Target, Clock, DollarSign } from "lucide-react";

export default function PolicySection() {
  const locale = useLocale();

  const policies = [
    {
      icon: CheckCircle,
      title: locale === "th" ? "ถูกต้อง" : "Correct",
      description: locale === "th" 
        ? "ด้วยประสบการณ์มากกว่า 50 ปี กลุ่มบริษัทผดุงศิลป์มุ่งมั่นพัฒนาคุณภาพงานและประสิทธิภาพของระบบอย่างต่อเนื่อง เพื่อให้มั่นใจว่าสินค้าและบริการมีคุณภาพสูง 'ถูกต้อง' และได้มาตรฐานที่ตรงกับความต้องการของลูกค้า"
        : "With over 50 years of experience, Padungsilpa Group is committed to continuously developing work quality and system efficiency to ensure that products and services are of high quality, 'correct', and meet customer requirements."
    },
    {
      icon: DollarSign,
      title: locale === "th" ? "ถูกตังค์" : "Right Price",
      description: locale === "th"
        ? "กลุ่มบริษัทผดุงศิลป์ให้ความสำคัญกับการจัดหาวัตถุดิบที่เป็นไปตามข้อกำหนดอุตสาหกรรม ในราคาที่ยุติธรรม เพื่อให้มั่นใจว่าลูกค้าได้รับสินค้าและบริการที่มีคุณภาพ 'ถูกตังค์' และเป็นไปตามมาตรฐาน"
        : "Padungsilpa Group prioritizes sourcing materials that meet industry specifications at fair prices, ensuring customers receive quality products and services at the 'right price' and according to standards."
    },
    {
      icon: Clock,
      title: locale === "th" ? "ทันเวลา" : "On Time",
      description: locale === "th"
        ? "บริษัทพัฒนาและปรับปรุงคุณภาพงานและระบบการทำงานอย่างต่อเนื่อง เพื่อให้สามารถดำเนินโครงการได้ตรงตามกำหนด ส่งมอบสินค้าและบริการที่มีคุณภาพ 'ทันเวลา' และเป็นไปตามมาตรฐานทุกขั้นตอน"
        : "The company continuously develops and improves work quality and systems to ensure projects are completed on schedule, delivering quality products and services 'on time' and meeting standards at every step."
    }
  ];

  return (
    <section className="section-minimal relative overflow-hidden bg-gradient-to-br from-[var(--primary-blue)] via-blue-700 to-blue-900">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/20 via-transparent to-blue-900/20"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Strong & Minimal Style */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
            {locale === "th" ? "นโยบายการดำเนินงาน" : "Operating Policy"}
          </h2>

          {/* Enhanced Elegant Line with Glow */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></div>
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"></div>
          </div>

          <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
            {locale === "th"
              ? "กลุ่มบริษัทผดุงศิลป์เริ่มต้นธุรกิจสถานีบริการน้ำมันในปี 2507 และมีประสบการณ์มากกว่า 50 ปี ดำเนินงานภายใต้นโยบาย"
              : "Padungsilpa Group started the fuel station business in 1964 and has over 50 years of experience, operating under the policy"
            }
          </p>
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 shadow-lg">
            <p className="text-lg text-white font-bold tracking-wide">
              {locale === "th" 
                ? "'ถูกต้อง ถูกตังค์ ทันเวลา'"
                : "'Correct, Right Price, On Time'"
              }
            </p>
          </div>
          <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed mt-6">
            {locale === "th"
              ? "เพื่อรับรองมาตรฐานคุณภาพในทุกขั้นตอนของการดำเนินงาน"
              : "To ensure quality standards in every step of operations"
            }
          </p>
        </div>

        {/* Policy Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {policies.map((policy, index) => (
            <div key={index} className="text-center group">
              {/* Icon - Minimal design without rounded corners */}
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <policy.icon className="w-10 h-10 text-white" />
              </div>

              {/* Title - Strong typography */}
              <div className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                {policy.title}
              </div>

              {/* Description - Clean typography */}
              <div className="text-base text-white/90 leading-relaxed">
                {policy.description}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message - Clean typography */}
        <div className="text-center mt-16">
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            {locale === "th"
              ? "ด้วยประสบการณ์กว่า 50 ปี เราพร้อมให้บริการครบวงจร ตั้งแต่การออกแบบ ก่อสร้าง ติดตั้งระบบ และบำรุงรักษา"
              : "With over 50 years of experience, we are ready to provide comprehensive services from design, construction, system installation, and maintenance"
            }
          </p>
        </div>
      </div>
    </section>
  );
}
