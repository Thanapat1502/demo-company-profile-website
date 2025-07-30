"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
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
      answer: "เราให้บริการครบวงจรตั้งแต่การออกแบบ ก่อสร้าง ติดตั้งอุปกรณ์ และบำรุงรักษาสถานีบริการน้ำมัน",
    },
    {
      icon: Clock,
      question: "ระยะเวลาดำเนินโครงการเป็นอย่างไร?",
      answer: "ระยะเวลาขึ้นอยู่กับขนาดโครงการ โดยทั่วไปใช้เวลา 3-6 เดือน สำหรับสถานีบริการขนาดกลาง",
    },
    {
      icon: Users,
      question: "มีบริการให้คำปรึกษาฟรีหรือไม่?",
      answer: "มีครับ เรามีทีมผู้เชี่ยวชาญพร้อมให้คำปรึกษาเบื้องต้นฟรี รวมถึงการสำรวจพื้นที่",
    },
    {
      icon: CheckCircle,
      question: "มีการรับประกันหรือไม่?",
      answer: "เรารับประกันงานก่อสร้าง 2 ปี และอุปกรณ์ PERMATANK® รับประกัน 10 ปี",
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
      {/* Hero Section */}
      <section className="relative h-screen bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-sections/hero-banner-1.jpg')",
            backgroundPosition: "center 30%"
          }}
        ></div>
        
        <div className="relative z-20 h-full flex items-center">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
                ติดต่อเรา
              </h1>
              <p className="text-2xl md:text-3xl text-gray-200 mb-12 font-light leading-relaxed">
                พร้อมให้คำปรึกษา<br />
                และข้อเสนอที่ดีที่สุดสำหรับโครงการของคุณ
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-sm hover:bg-gray-100 transition-colors group"
                >
                  ขอใบเสนอราคา
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a 
                  href="tel:+6621234567"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-sm hover:bg-white hover:text-gray-900 transition-colors"
                >
                  โทรเลย
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              วิธีติดต่อเรา
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              เลือกช่องทางที่สะดวกสำหรับคุณ เราพร้อมให้บริการตลอด 24 ชั่วโมง
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group text-center p-12 border border-gray-200 hover:border-gray-900 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center">
                  <method.icon size={32} className="text-gray-900 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-8 font-light leading-relaxed">
                  {method.description}
                </p>
                <a
                  href={method.action}
                  className="inline-block px-6 py-3 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors"
                >
                  {method.value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-24 bg-gray-50" id="contact-form">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
                ส่งข้อความหาเรา
              </h2>
              <p className="text-xl text-gray-600 mb-12 font-light">
                กรอกแบบฟอร์มด้านล่าง เราจะติดต่อกลับภายใน 24 ชั่วโมง
              </p>

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
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
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
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
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
                      onChange={(e) => handleInputChange("email", e.target.value)}
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
                      onChange={(e) => handleInputChange("phone", e.target.value)}
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
                    onChange={(e) => handleInputChange("company", e.target.value)}
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
                      onChange={(e) => handleInputChange("inquiryType", e.target.value)}
                      className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-colors text-lg appearance-none cursor-pointer"
                    >
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
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 transition-colors text-lg resize-none"
                    placeholder="กรุณาระบุรายละเอียดที่ต้องการสอบถาม..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center px-12 py-4 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors group mt-8"
                >
                  <Send size={20} className="mr-3 group-hover:translate-x-1 transition-transform" />
                  ส่งข้อความ
                </button>
              </form>
            </div>

            {/* Office Information */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
                ที่ตั้งสำนักงาน
              </h2>

              {/* Map Placeholder */}
              <div className="bg-gray-300 h-80 mb-12 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-600 font-light">แผนที่ตำแหน่งสำนักงาน</p>
                </div>
              </div>

              {/* Office Cards */}
              <div className="space-y-8">
                {offices.map((office, index) => (
                  <div key={index} className="bg-white border border-gray-200 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      {office.name}
                    </h3>

                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <MapPin size={20} className="text-gray-900 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 leading-relaxed font-light">
                          {office.address}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Phone size={20} className="text-gray-900 flex-shrink-0" />
                        <a
                          href={`tel:${office.phone}`}
                          className="text-gray-600 hover:text-gray-900 transition-colors font-light"
                        >
                          {office.phone}
                        </a>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Mail size={20} className="text-gray-900 flex-shrink-0" />
                        <a
                          href={`mailto:${office.email}`}
                          className="text-gray-600 hover:text-gray-900 transition-colors font-light"
                        >
                          {office.email}
                        </a>
                      </div>

                      <div className="flex items-start space-x-4">
                        <Clock size={20} className="text-gray-900 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 font-light">{office.hours}</span>
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              คำถามที่พบบ่อย
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              คำตอบสำหรับคำถามที่ลูกค้าสอบถามบ่อยที่สุด
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-gray-900 pl-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 mt-2">
                    <faq.icon size={24} className="text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            พร้อมเริ่มโครงการของคุณแล้วหรือยัง?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto font-light">
            ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรีและใบเสนอราคาที่เหมาะสมกับโครงการของคุณ
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors group"
            >
              เริ่มต้นเลย
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="tel:+6621234567"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              หรือโทรเลย
            </a>
          </div>
        </div>
      </section>
    </div>
    </MainLayout>
  );
}