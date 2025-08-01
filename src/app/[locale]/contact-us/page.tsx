"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";
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

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    message: "",
  });

  const [activeSection, setActiveSection] = useState("contact");

  const contactMethods = [
    {
      icon: Phone,
      title: "โทรศัพท์",
      description: "ติดต่อเราโดยตรงเพื่อรับคำปรึกษาเบื้องต้น",
      value: "+66 2 123 4567",
      action: "tel:+6621234567",
    },
    {
      icon: Mail,
      title: "อีเมล",
      description: "ส่งข้อความหาเราเพื่อรับข้อมูลรายละเอียด",
      value: "info@padungsilpa.group",
      action: "mailto:info@padungsilpa.group",
    },
    {
      icon: MessageCircle,
      title: "แชทออนไลน์",
      description: "สอบถามข้อมูลแบบเรียลไทม์กับทีมงาน",
      value: "เริ่มแชท",
      action: "#",
    },
  ];

  const offices = [
    {
      name: "สำนักงานใหญ่",
      address: "123 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพมหานคร 10400",
      phone: "+66 2 573 3533",
      email: "bangkok@padungsilpa.group",
      hours: "จันทร์ - ศุกร์: 8:00 - 17:00 น.",
    },
    {
      name: "สำนักงานภูมิภาค",
      address: "456 ถนนศรีจันทร์ ตำบลท่าข้าม อำเภอเมือง จังหวัดกาญจนบุรี 71000",
      phone: "+66 34 567 890",
      email: "regional@padungsilpa.group",
      hours: "จันทร์ - ศุกร์: 8:00 - 17:00 น.",
    },
  ];

  const inquiryTypes = [
    { key: "general", label: "สอบถามทั่วไป" },
    { key: "quote", label: "ขอใบเสนอราคา" },
    { key: "support", label: "บริการหลังการขาย" },
    { key: "partnership", label: "ความร่วมมือทางธุรกิจ" },
    { key: "career", label: "สมัครงาน" },
  ];

  const faqs = [
    {
      icon: Building2,
      question: "บริการของเราครอบคลุมอะไรบ้าง?",
      answer:
        "เราให้บริการครบวงจรตั้งแต่การออกแบบ ก่อสร้าง ติดตั้งอุปกรณ์ และบำรุงรักษาสถานีบริการน้ำมัน",
    },
    {
      icon: Clock,
      question: "ระยะเวลาดำเนินโครงการเป็นอย่างไร?",
      answer:
        "ระยะเวลาขึ้นอยู่กับขนาดโครงการ โดยทั่วไปใช้เวลา 3-6 เดือน สำหรับสถานีบริการขนาดกลาง",
    },
    {
      icon: Users,
      question: "มีบริการให้คำปรึกษาฟรีหรือไม่?",
      answer:
        "มีครับ เรามีทีมผู้เชี่ยวชาญพร้อมให้คำปรึกษาเบื้องต้นฟรี รวมถึงการสำรวจพื้นที่",
    },
    {
      icon: CheckCircle,
      question: "มีการรับประกันหรือไม่?",
      answer:
        "เรารับประกันงานก่อสร้าง 2 ปี และอุปกรณ์ PERMATANK® รับประกัน 10 ปี",
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
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section - Using ImageCarouselHero for consistency */}
        <ImageCarouselHero
          images={["/images/hero-sections/hero-banner-1.jpg"]}
          title="ติดต่อเรา"
          subtitle="พร้อมให้คำปรึกษา"
          description="และข้อเสนอที่ดีที่สุดสำหรับโครงการของคุณ"
          autoSlideDelay={6000}>
          {/* Luxury Hero Buttons */}
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
                  ขอใบเสนอราคา
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
                <span className="font-semibold tracking-wide">โทรเลย</span>
                <div className="w-2 h-2 bg-current opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
              </span>
              <div className="luxury-btn-border"></div>
              <div className="luxury-btn-glow-secondary"></div>
            </button>
          </div>
        </ImageCarouselHero>

        {/* Contact Methods */}
        <section className="section-minimal bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              {/* Section Label */}
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
                <span className="font-bold tracking-wider uppercase text-sm text-[var(--primary-blue)]">
                  ติดต่อเรา
                </span>
                <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
                วิธีติดต่อเรา
              </h2>

              {/* Enhanced Elegant Line */}
              <div className="relative flex items-center justify-center mb-8">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
                <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
              </div>

              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                เลือกช่องทางที่สะดวกสำหรับคุณ เราพร้อมให้บริการตลอด 24 ชั่วโมง
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
                      แบบฟอร์ม
                    </span>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
                    ส่งข้อความหาเรา
                  </h2>

                  <div className="relative flex items-start justify-start mb-6">
                    <div className="w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
                    <div className="absolute w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
                  </div>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    กรอกแบบฟอร์มด้านล่าง เราจะติดต่อกลับภายใน 24 ชั่วโมง
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                        ชื่อ *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-colors text-lg"
                        placeholder="กรอกชื่อของคุณ"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                        นามสกุล *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-colors text-lg"
                        placeholder="กรอกนามสกุลของคุณ"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                        อีเมล *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-colors text-lg"
                        placeholder="example@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                        เบอร์โทรศัพท์
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-colors text-lg"
                        placeholder="08X-XXX-XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                      บริษัท/องค์กร
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                      className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-colors text-lg"
                      placeholder="ชื่อบริษัทหรือองค์กร"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                      ประเภทการสอบถาม *
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.inquiryType}
                        onChange={(e) =>
                          handleInputChange("inquiryType", e.target.value)
                        }
                        className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-colors text-lg appearance-none cursor-pointer">
                        <option value="">เลือกประเภทการสอบถาม</option>
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
                      ข้อความ *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-colors text-lg resize-none"
                      placeholder="กรุณาระบุรายละเอียดที่ต้องการสอบถาม..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center px-12 py-4 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors group mt-8">
                    <Send
                      size={20}
                      className="mr-3 group-hover:translate-x-1 transition-transform"
                    />
                    ส่งข้อความ
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
                      สำนักงาน
                    </span>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
                    ที่ตั้งสำนักงาน
                  </h2>

                  <div className="relative flex items-start justify-start mb-6">
                    <div className="w-24 h-px bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-blue)] to-transparent opacity-80"></div>
                    <div className="absolute w-24 h-px bg-gradient-to-r from-[var(--primary-blue)]/30 via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-gray-300 h-80 mb-12 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={48} className="text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-600">แผนที่ตำแหน่งสำนักงาน</p>
                  </div>
                </div>

                {/* Office Cards */}
                <div className="space-y-8">
                  {offices.map((office, index) => (
                    <div key={index} className="card-minimal p-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-6 tracking-tight">
                        {office.name}
                      </h3>

                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <MapPin
                            size={20}
                            className="text-gray-900 mt-1 flex-shrink-0"
                          />
                          <span className="text-gray-600 leading-relaxed font-light">
                            {office.address}
                          </span>
                        </div>

                        <div className="flex items-center space-x-4">
                          <Phone
                            size={20}
                            className="text-gray-900 flex-shrink-0"
                          />
                          <a
                            href={`tel:${office.phone}`}
                            className="text-gray-600 hover:text-gray-900 transition-colors font-light">
                            {office.phone}
                          </a>
                        </div>

                        <div className="flex items-center space-x-4">
                          <Mail
                            size={20}
                            className="text-gray-900 flex-shrink-0"
                          />
                          <a
                            href={`mailto:${office.email}`}
                            className="text-gray-600 hover:text-gray-900 transition-colors font-light">
                            {office.email}
                          </a>
                        </div>

                        <div className="flex items-start space-x-4">
                          <Clock
                            size={20}
                            className="text-gray-900 mt-1 flex-shrink-0"
                          />
                          <span className="text-gray-600 font-light">
                            {office.hours}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                  คำถามที่พบบ่อย
                </span>
                <div className="w-12 h-px bg-[var(--primary-blue)]"></div>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 mb-6 tracking-[0.02em] !leading-normal drop-shadow-sm">
                คำถามที่พบบ่อย
              </h2>

              {/* Enhanced Elegant Line */}
              <div className="relative flex items-center justify-center mb-8">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)] to-transparent opacity-80"></div>
                <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-[var(--primary-blue)]/30 to-transparent blur-sm"></div>
              </div>

              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                คำตอบสำหรับคำถามที่ลูกค้าสอบถามบ่อยที่สุด
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
    </MainLayout>
  );
}
