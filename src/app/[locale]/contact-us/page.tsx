"use client";

import { useState } from "react";
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
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";
import MinimalButton from "@/components/ui/MinimalButton";

export default function ContactUsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    message: "",
  });

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
      name: t("contact.offices.headquarters.name"),
      address: t("contact.offices.headquarters.address"),
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <ImageCarouselHero
        images={[
          "/images/hero-sections/hero-banner-3.jpg",
          "/images/hero-sections/hero-banner-1.jpg",
          "/images/hero-sections/hero-banner-2.jpg",
        ]}
        title={`ติดต่อเรา`}
        subtitle="พร้อมให้คำปรึกษา"
        description={`ติดต่อเราเพื่อรับคำปรึกษาและข้อเสนอ\nที่ดีที่สุดสำหรับโครงการของคุณ`}
        autoSlideDelay={6000}>
        <MinimalButton
          href="#contact-form"
          variant="white"
          icon={<ArrowRight className="w-5 h-5" />}>
          ขอใบเสนอราคา
        </MinimalButton>
        <MinimalButton
          href="tel:+6621234567"
          variant="secondary"
          className="border-white text-white hover:bg-white hover:text-gray-900">
          โทรเลย
        </MinimalButton>
      </ImageCarouselHero>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              วิธีติดต่อเรา
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              เลือกช่องทางที่สะดวกสำหรับคุณ เราพร้อมให้บริการตลอด 24 ชั่วโมง
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="text-center p-8 bg-gray-50 rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <method.icon size={40} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {method.title}
                </h3>
                <p className="text-base text-gray-600 mb-6">
                  {method.description}
                </p>
                <a
                  href={method.action}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition-colors">
                  {method.value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50" id="contact-form">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                ส่งข้อความหาเรา
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                กรอกแบบฟอร์มด้านล่าง เราจะติดต่อกลับภายใน 24 ชั่วโมง
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อ *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="กรอกชื่อของคุณ"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      นามสกุล *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="กรอกนามสกุลของคุณ"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      อีเมล *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="08X-XXX-XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    บริษัท/องค์กร
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ชื่อบริษัทหรือองค์กร"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ประเภทการสอบถาม *
                  </label>
                  <select
                    required
                    value={formData.inquiryType}
                    onChange={(e) =>
                      handleInputChange("inquiryType", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">เลือกประเภทการสอบถาม</option>
                    {inquiryTypes.map((type) => (
                      <option key={type.key} value={type.key}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ข้อความ *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="กรุณาระบุรายละเอียดที่ต้องการสอบถาม..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition-colors">
                  <Send size={20} className="mr-2" />
                  ส่งข้อความ
                </button>
              </form>
            </div>

            {/* Map and Office Info */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                ที่ตั้งสำนักงาน
              </h2>

              {/* Map Placeholder */}
              <div className="bg-gray-300 rounded-3xl h-64 mb-8 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-600">แผนที่ตำแหน่งสำนักงาน</p>
                </div>
              </div>

              {/* Office Information */}
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      {office.name}
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <MapPin
                          size={20}
                          className="text-blue-600 mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-600 leading-relaxed">
                          {office.address}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Phone
                          size={20}
                          className="text-blue-600 flex-shrink-0"
                        />
                        <a
                          href={`tel:${office.phone}`}
                          className="text-gray-600 hover:text-blue-600 transition-colors">
                          {office.phone}
                        </a>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Mail
                          size={20}
                          className="text-blue-600 flex-shrink-0"
                        />
                        <a
                          href={`mailto:${office.email}`}
                          className="text-gray-600 hover:text-blue-600 transition-colors">
                          {office.email}
                        </a>
                      </div>

                      <div className="flex items-start space-x-4">
                        <Clock
                          size={20}
                          className="text-blue-600 mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-600">{office.hours}</span>
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              คำถามที่พบบ่อย
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              คำตอบสำหรับคำถามที่ลูกค้าสอบถามบ่อยที่สุด
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
              {
                icon: Phone,
                question: "ติดต่อขอใบเสนอราคาได้อย่างไร?",
                answer:
                  "สามารถติดต่อผ่านแบบฟอร์ม โทรศัพท์ หรืออีเมล เราจะส่งใบเสนอราคาภายใน 3 วันทำการ",
              },
              {
                icon: MapPin,
                question: "ให้บริการในพื้นที่ไหนบ้าง?",
                answer:
                  "เราให้บริการทั่วประเทศไทย และกำลังขยายไปยังประเทศเพื่อนบ้านในอาเซียน",
              },
            ].map((faq, index) => (
              <div key={index} className="p-8 bg-gray-50 rounded-3xl">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <faq.icon size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
