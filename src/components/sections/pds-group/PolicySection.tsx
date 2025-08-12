import { useTranslations } from "next-intl";
import { CheckCircle, Clock, DollarSign } from "lucide-react";
import Image from "next/image";

export default function PolicySection() {
  const t = useTranslations();

  const policies = [
    {
      icon: CheckCircle,
      title: t("policySection.policies.correct.title"),
      description: t("policySection.policies.correct.description")
    },
    {
      icon: DollarSign,
      title: t("policySection.policies.rightPrice.title"),
      description: t("policySection.policies.rightPrice.description")
    },
    {
      icon: Clock,
      title: t("policySection.policies.onTime.title"),
      description: t("policySection.policies.onTime.description")
    }
  ];

  return (
    <section className="relative pt-12 lg:pt-16 overflow-hidden">

      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-sections/hero-banner-5.jpg"
          alt="Policy background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        {/* Refined Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/45 to-black/90"></div>

        {/* Subtle Glass Effects */}
        <div className="absolute inset-0">
          {/* Minimal Orbs */}
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-white/5 to-blue-300/8 rounded-full blur-xl opacity-60"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-primary-300/6 to-white/4 rounded-full blur-lg opacity-40"></div>

          {/* Clean Gradient Layer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/15"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Condensed Header */}
        <div className="text-center mb-10">

          {/* Compact Badge */}
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-gradient-to-r from-transparent via-white/50 to-white/70"></div>
            <div className="px-4 py-1 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full">
              <span className="text-white font-medium text-xs uppercase tracking-[0.2em] font-mono">
                Our Policy
              </span>
            </div>
            <div className="w-6 h-px bg-gradient-to-l from-transparent via-white/50 to-white/70"></div>
          </div>

          {/* Compact Title */}
          <div className="relative mb-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[0.9]">
              {t("policySection.title")}
            </h2>

            {/* Simple Underline */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5
                          bg-gradient-to-r from-white/60 via-blue-300 to-white/60 rounded-full"></div>
          </div>

          {/* Compact Policy Statement */}
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-2 mb-3">
            <p className="text-lg text-white font-semibold tracking-wide uppercase">
              {t("policySection.policySlogan")}
            </p>
          </div>
        </div>

        {/* Condensed Policy Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {policies.map((policy, index) => (
            <div key={index} className="p-4 text-center group backdrop-blur-sm border border-white/15 rounded-lg shadow-md">

              {/* Compact Icon Container */}
              <div className="w-16 h-16 mx-auto mb-3 bg-white/8
                           flex items-center justify-center shadow-black/20
                           group-hover:bg-white/12 group-hover:-translate-y-1
                           transition-all duration-300 ease-out">
                <policy.icon className="w-8 h-8 text-white/90 group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Compact Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight
                           group-hover:text-blue-200 transition-colors duration-300">
                {policy.title}
              </h3>

              {/* Compact Description */}
              <p className="text-md text-white/85 leading-relaxed
                         group-hover:text-white transition-colors duration-300">
                {policy.description}
              </p>
            </div>
          ))}
        </div>

        {/* Compact Bottom Message */}
        <div className="text-center">
          <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-lg p-4 max-w-2xl mx-auto
                        hover:bg-white/12 transition-all duration-300 ease-out">
            <p className="text-base text-white/85 leading-relaxed">
              {t("policySection.bottomText")}
            </p>
          </div>
        </div>
      </div>

      {/* Refined Divider */}
      <div className="relative mt-12 pb-12 lg:mt-16 lg:pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent h-px"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/20 to-transparent h-px blur-sm"></div>
      </div>
    </section>
  );
}
