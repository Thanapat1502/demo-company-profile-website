import { useTranslations } from "next-intl";
import { CheckCircle, Clock, DollarSign } from "lucide-react";

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
            {t("policySection.title")}
          </h2>

          {/* Enhanced Elegant Line with Glow */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80"></div>
            <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"></div>
          </div>

          <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
            {t("policySection.introText")}
          </p>
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 shadow-lg">
            <p className="text-lg text-white font-bold tracking-wide">
              {t("policySection.policySlogan")}
            </p>
          </div>
          <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed mt-6">
            {t("policySection.qualityText")}
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
            {t("policySection.bottomText")}
          </p>
        </div>
      </div>
    </section>
  );
}
