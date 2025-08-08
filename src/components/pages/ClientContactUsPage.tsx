"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import ContactInfo from "@/components/contact/ContactInfo";
import CompanyList from "@/components/contact/CompanyList";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Building2,
  Users,
  ArrowRight,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { useContactStore } from "@/store/zustand/contactStore";

interface ClientContactUsPageProps {
  locale: string;
}

export default function ClientContactUsPage({
  locale,
}: ClientContactUsPageProps) {
  const t = useTranslations();
  const { fetchContactInfo, contactInfo } = useContactStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    message: "",
  });

  // Fetch contact info on component mount
  useEffect(() => {
    fetchContactInfo();
  }, [fetchContactInfo]);

  const contactMethods = [
    {
      icon: Phone,
      title: t("contact.methods.phone.title"),
      description: t("contact.methods.phone.description"),
      value: contactInfo?.tel || "+66 2 123 4567",
      action: `tel:${contactInfo?.tel || "+6621234567"}`,
    },
    {
      icon: Mail,
      title: t("contact.methods.email.title"),
      description: t("contact.methods.email.description"),
      value: contactInfo?.email || "info@padungsilpa.group",
      action: `mailto:${contactInfo?.email}`,
    },
    {
      icon: MessageCircle,
      title: t("contact.methods.chat.title"),
      description: t("contact.methods.chat.description"),
      value: t("contact.methods.chat.value"),
      action: `https://line.me/R/ti/p/${contactInfo?.line}`,
    },
  ];

  const inquiryTypes = [
    { key: "general", label: t("contact.form.inquiryTypes.general") },
    { key: "quote", label: t("contact.form.inquiryTypes.quote") },
    { key: "support", label: t("contact.form.inquiryTypes.support") },
    { key: "partnership", label: t("contact.form.inquiryTypes.partnership") },
    { key: "career", label: t("contact.form.inquiryTypes.career") },
  ];

  const faqs = [
    {
      icon: Building2,
      question: t("contact.faq.questions.services.question"),
      answer: t("contact.faq.questions.services.answer"),
    },
    {
      icon: Clock,
      question: t("contact.faq.questions.timeline.question"),
      answer: t("contact.faq.questions.timeline.answer"),
    },
    {
      icon: Users,
      question: t("contact.faq.questions.consultation.question"),
      answer: t("contact.faq.questions.consultation.answer"),
    },
    {
      icon: CheckCircle,
      question: t("contact.faq.questions.warranty.question"),
      answer: t("contact.faq.questions.warranty.answer"),
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Buttons Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="luxury-hero-btn-container">
            <button
              className="luxury-hero-btn luxury-hero-btn-primary group"
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }>
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="font-semibold tracking-wide">
                  {t("contact.hero.getQuote")}
                </span>
                <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
              <div className="luxury-btn-shimmer"></div>
              <div className="luxury-btn-glow"></div>
            </button>

            <button
              className="luxury-hero-btn luxury-hero-btn-secondary group"
              onClick={() => (window.location.href = "tel:+6621234567")}>
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="font-semibold tracking-wide">
                  {t("contact.hero.callNow")}
                </span>
                <div className="w-2 h-2 bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
              </span>
              <div className="luxury-btn-border"></div>
              <div className="luxury-btn-glow-secondary"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Section Label */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                {t("contact.methods.title")}
              </span>
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              {t("contact.methods.title")}
            </h2>

            {/* Enhanced Elegant Line */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("contact.methods.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group text-center p-8 card-minimal hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-[var(--primary-blue)]/10">
                  <method.icon
                    size={32}
                    className="text-[var(--primary-blue)] group-hover:text-[var(--primary-blue-dark)] transition-colors"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 tracking-tight">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {method.description}
                </p>
                <a
                  href={method.action}
                  className="inline-block px-6 py-3 bg-[var(--primary-blue)] text-white font-semibold hover:bg-[var(--primary-blue-dark)] transition-colors">
                  {method.value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Information */}
      <section className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Section Label */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                {t("contact.info.sectionLabel")}
              </span>
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              {locale === "th" ? "ข้อมูลการติดต่อ" : "Contact Details"}
            </h2>

            {/* Enhanced Elegant Line */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("contact.info.description")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ContactInfo locale={locale} variant="full" />
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="section-minimal bg-gray-50" id="contact-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-12">
                {/* Section Label */}
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
                  <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                    {t("contact.form.sectionLabel")}
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
                  {t("contact.form.title")}
                </h2>

                <div className="relative flex items-start justify-start mb-6">
                  <div className="w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
                  <div className="absolute w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("contact.form.description")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                      {t("contact.form.firstName")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-colors text-lg"
                      placeholder={t("contact.form.firstNamePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                      {t("contact.form.lastName")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-colors text-lg"
                      placeholder={t("contact.form.lastNamePlaceholder")}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                      {t("contact.form.email")} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-colors text-lg"
                      placeholder={t("contact.form.emailPlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                      {t("contact.form.phone")}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-colors text-lg"
                      placeholder={t("contact.form.phonePlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    {t("contact.form.company")}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-colors text-lg"
                    placeholder={t("contact.form.companyPlaceholder")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    {t("contact.form.inquiryType")} *
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={formData.inquiryType}
                      onChange={(e) =>
                        handleInputChange("inquiryType", e.target.value)
                      }
                      className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-colors text-lg appearance-none cursor-pointer">
                      <option value="">
                        {t("contact.form.inquiryTypePlaceholder")}
                      </option>
                      {inquiryTypes.map((type) => (
                        <option key={type.key} value={type.key}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-0 top-4 w-6 h-6 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    {t("contact.form.message")} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-colors text-lg resize-none"
                    placeholder={t("contact.form.messagePlaceholder")}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center px-12 py-4 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors group mt-8">
                  <Send
                    size={20}
                    className="mr-3 group-hover:translate-x-1 transition-transform"
                  />
                  {t("contact.form.submit")}
                </button>
              </form>
            </div>

            {/* Office Information */}
            <div>
              <div className="mb-12">
                {/* Section Label */}
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
                  <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                    {t("contact.offices.title")}
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
                  {t("contact.offices.title")}
                </h2>

                <div className="relative flex items-start justify-start mb-6">
                  <div className="w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
                  <div className="absolute w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
                </div>
              </div>

              {/* Google Maps Integration */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {t("contact.map.title")}
                </h3>
                {contactInfo?.google_map_url ? (
                  <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src={contactInfo.google_map_url}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={t("contact.map.title")}
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-300 h-80 flex items-center justify-center rounded-lg">
                    <div className="text-center">
                      <MapPin
                        size={48}
                        className="text-gray-500 mx-auto mb-4"
                      />
                      <p className="text-gray-600">{t("contact.map.title")}</p>
                      <p className="text-gray-500 text-sm mt-2">
                        {t("contact.map.loading")}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Company List from Store */}
              <CompanyList locale={locale} variant="list" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-minimal bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Section Label */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                {t("contact.faq.sectionLabel")}
              </span>
              <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
              {t("contact.faq.title")}
            </h2>

            {/* Enhanced Elegant Line */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
              <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("contact.faq.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card-minimal p-8 border-l-4 border-[var(--primary-blue)]">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-[var(--primary-blue)]/10 flex items-center justify-center flex-shrink-0 mt-2">
                    <faq.icon
                      size={24}
                      className="text-[var(--primary-blue)]"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 leading-tight tracking-tight">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
