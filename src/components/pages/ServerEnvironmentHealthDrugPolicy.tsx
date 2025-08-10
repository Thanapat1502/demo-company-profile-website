import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { getEnvironmentImages, type EnvironmentImage } from "@/lib/images/environmentImages";

interface ServerEnvironmentHealthDrugPolicyProps {
  locale: string;
}

export default function ServerEnvironmentHealthDrugPolicy({
  locale,
}: ServerEnvironmentHealthDrugPolicyProps) {
  const t = useTranslations();

  // Load environment images server-side
  const environmentImages = getEnvironmentImages();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Main Header */}
          <div className="text-left mb-12">
            <h1 className="text-3xl font-bold text-[var(--primary-blue)] mb-2">
              {t("environmentHealthDrugPolicy.heroTitle")}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t("environmentHealthDrugPolicy.heroSubtitle")}
            </p>
            <div className="w-24 h-px bg-[var(--primary-blue)] mx-auto mt-8"></div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Left Column - Content */}
            <div className="space-y-16">
              {/* Occupational Health Policy */}
              <div>
                <div className="flex items-center mb-6">
                  <h2 className="text-3xl font-bold text-[var(--primary-blue)]">
                    {t("environmentHealthDrugPolicy.sections.occupationalHealth.title")}
                  </h2>
                </div>
                <div className="space-y-0 text-lg text-gray-700 leading-relaxed">
                  {t("environmentHealthDrugPolicy.sections.occupationalHealth.points").split('|,').map((x, index) => {
                    return (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                        <p>{x}</p>
                      </div>
                    )
                  })}

                </div>
              </div>

              {/* Safety Policy */}
              <div>
                <div className="flex items-center mb-6">
                  <h2 className="text-3xl font-bold text-[var(--primary-blue)]">
                    {t("environmentHealthDrugPolicy.sections.safety.title")}
                  </h2>
                </div>
                <div className="space-y-0 text-lg text-gray-700 leading-relaxed">
                  {t("environmentHealthDrugPolicy.sections.safety.points").split('|,').map((x, index) => {
                    return (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                        <p>{x}</p>
                      </div>
                    )
                  })}

                </div>
              </div>

              {/* Drug Policy */}
              <div>
                <div className="flex items-center mb-6">
                  <h2 className="text-3xl font-bold text-[var(--primary-blue)]">
                    {t("environmentHealthDrugPolicy.sections.drug.title")}
                  </h2>
                </div>
                <div className="space-y-0 text-lg text-gray-700 leading-relaxed">
                  {t("environmentHealthDrugPolicy.sections.drug.points").split('|,').map((x, index) => {
                    return (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                        <p>{x}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Environmental Policy */}
              <div>
                <div className="flex items-center mb-6">
                  <h2 className="text-3xl font-bold text-[var(--primary-blue)]">
                    {t("environmentHealthDrugPolicy.sections.environmental.title")}
                  </h2>
                </div>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  {t("environmentHealthDrugPolicy.sections.environmental.points").split('|,').map((x, index) => {
                    return (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full mt-3 mr-4 flex-shrink-0"></div>
                        <p>{x}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Image Gallery */}
            <div className="lg:sticky lg:top-8">
              <div className="overflow-hidden">
                {/* Image Grid Display */}
                <div className="grid grid-cols-3 gap-2">
                  {environmentImages.map((image, index) => (
                    <div
                      key={image.filename}
                      className="relative aspect-[4/3] shadow-xl overflow-hidden group"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover shadow-xl transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 25vw, 25vw"
                        priority={index < 4} // Prioritize first 4 images
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--primary-blue)] mb-8">
              {locale === "th" ? "ความมุ่งมั่นของเรา" : "Our Commitment"}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {locale === "th"
                ? "เราให้ความสำคัญกับสุขภาพอนามัย ความปลอดภัย สิ่งแวดล้อม และการป้องกันสารเสพติด เพื่อสร้างสภาพแวดล้อมการทำงานที่ปลอดภัยและยั่งยืน"
                : "We prioritize health, safety, environment, and drug prevention to create a safe and sustainable work environment."
              }
            </p>

            {/* Key Values Grid */}
            <div className="grid md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--primary-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {locale === "th" ? "สุขภาพอนามัย" : "Health"}
                </h3>
                <p className="text-gray-600">
                  {locale === "th"
                    ? "ดูแลสุขภาพพนักงานทุกคน"
                    : "Caring for everyone's health"
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--primary-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {locale === "th" ? "ความปลอดภัย" : "Safety"}
                </h3>
                <p className="text-gray-600">
                  {locale === "th"
                    ? "ความปลอดภัยเป็นสิ่งสำคัญอันดับหนึ่ง"
                    : "Safety is our top priority"
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--primary-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {locale === "th" ? "สิ่งแวดล้อม" : "Environment"}
                </h3>
                <p className="text-gray-600">
                  {locale === "th"
                    ? "รับผิดชอบต่อสิ่งแวดล้อม"
                    : "Environmental responsibility"
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--primary-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {locale === "th" ? "ป้องกันสารเสพติด" : "Drug Prevention"}
                </h3>
                <p className="text-gray-600">
                  {locale === "th"
                    ? "สถานที่ทำงานปลอดสารเสพติด"
                    : "Drug-free workplace"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
