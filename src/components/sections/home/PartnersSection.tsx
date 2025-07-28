"use client";

import { Image } from "@heroui/react";
import Section from "@/components/ui/Section";
import { motion } from "framer-motion";
import { Handshake, Star } from "lucide-react";

export default function PartnersSection() {
  const partners = [
    {
      name: "PTT",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80",
      description: "บริษัทปิโตรเลียมแห่งประเทศไทย"
    },
    {
      name: "Shell",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80",
      description: "Royal Dutch Shell"
    },
    {
      name: "Chevron",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80",
      description: "Chevron Corporation"
    },
    {
      name: "Esso",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80",
      description: "ExxonMobil"
    },
    {
      name: "Bangchak",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80",
      description: "บางจากคอร์ปอเรชั่น"
    },
    {
      name: "IRPC",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80",
      description: "ไออาร์พีซี"
    },
  ];

  return (
    <Section background="white" padding="xl">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-6 py-3 mb-6">
            <Handshake className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-medium">พันธมิตรของเรา</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              พันธมิตรทางธุรกิจ
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ชั้นนำระดับโลก
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            เราภาคภูมิใจที่ได้ร่วมงานกับพันธมิตรชั้นนำในอุตสาหกรรมน้ำมันและพลังงาน
            สร้างความเชื่อมั่นและคุณภาพในทุกโครงการ
          </p>
        </motion.div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="group"
          >
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>

              {/* Logo Container */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-full h-16 flex items-center justify-center mb-4">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Partner Name */}
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 text-center">
                  {partner.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {partner.description}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
          </div>

          <p className="text-gray-700 font-semibold text-lg mb-2">
            ความไว้วางใจจากพันธมิตรชั้นนำ
          </p>

          <p className="text-gray-600">
            และพันธมิตรอื่นๆ อีกมากมายทั่วประเทศไทย ที่เชื่อมั่นในคุณภาพและความเชี่ยวชาญของเรา
          </p>
        </div>
      </motion.div>
    </Section>
  );
}
