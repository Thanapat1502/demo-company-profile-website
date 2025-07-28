"use client";

import { useState, useEffect } from "react";
import MinimalButton from "@/components/ui/MinimalButton";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  const products = [
    {
      id: 1,
      title: "PERMATANK และถังน้ำมันแบบต่างๆ",
      shortTitle: "PERMATANK",
      description: "ถังน้ำมันใต้ดินแบบผนัง 2 ชั้นของ บริษัท ผดุงศิลป์วิศวการ จำกัด ผลิตตามมาตรฐานของ UL และ STEEL TANK INSTITUTE Technology ถังมีความแข็งแรง ทนทาน มีคุณภาพ มีอายุใช้งานยาวนานถึงกว่า 30 ปี",
      image: "/images/services/pds-product-2.webp",
      color: "from-emerald-600 to-emerald-800",
      accent: "#059669"
    },
    {
      id: 2,
      title: "งานก่อสร้างสถานีบริการน้ำมัน",
      shortTitle: "ก่อสร้างสถานี",
      description: "บริษัท ผดุงศิลป์โยธาการ จำกัด (PCW) เป็นบริษัทฯก่อสร้างชั้นนำที่เชี่ยวชาญและมากด้วยประสบการณ์ในงานก่อสร้างสถานีบริการน้ำมัน และก๊าซ ตลอดจนงานอื่นๆที่เกี่ยวข้อง เนื่องจากมีผลงานเป็นที่เชื่อถือ และได้รับความไว้วางใจ จากบริษัทน้ำมันชั้นนำ",
      image: "/images/services/pds-product-1.webp",
      color: "from-blue-600 to-blue-800",
      accent: "#1e40af"
    },
    {
      id: 3,
      title: "จำหน่ายและติดตั้งท่อน้ำมัน",
      shortTitle: "ท่อน้ำมัน 2 ชั้น",
      description: "บริษัทฯ ยังได้ทำการขายและติดตั้งท่อน้ำมันผนัง 2 ชั้น ที่ได้รับการรับรองจากกรมธุรกิจพลังงาน",
      image: "/images/services/pds-product-3.webp",
      color: "from-purple-600 to-purple-800",
      accent: "#7c3aed"
    },
    {
      id: 4,
      title: "ระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน",
      shortTitle: "ระบบวัดอัตโนมัติ",
      description: "บริษัท ผดุงศิลป์วิศวการ จำกัด (PSE) เป็นตัวแทนจำหน่ายและติดตั้งระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน",
      image: "/images/services/pds-product-4.webp",
      color: "from-orange-600 to-orange-800",
      accent: "#ea580c"
    },
    {
      id: 5,
      title: "อุปกรณ์เกี่ยวกับถังน้ำมัน",
      shortTitle: "อุปกรณ์ถังน้ำมัน",
      description: "บริษัท ผดุงศิลป์วิศวการ จำกัด (PSE) พัฒนาแบบถังน้ำมันใต้ดิน และอุปกรณ์ที่เกี่ยวข้องต่างๆ อย่างต่อเนื่อง",
      image: "/images/services/pds-product-5.webp",
      color: "from-red-600 to-red-800",
      accent: "#dc2626"
    },
    {
      id: 6,
      title: "ให้บริการต่างๆเกี่ยวกับถังน้ำมัน",
      shortTitle: "บริการถังน้ำมัน",
      description: "• งานฝังถังน้ำมันใต้ดินผนัง 2 ชั้น PERMATANK®\n• งานติดตั้งท่อน้ำมัน 2 ชั้น ยี่ห้อ NUPI ในสถานีบริการน้ำมัน\n• งานตรวจเช็คระบบท่อ และการรั่วซึมของท่อจ่ายน้ำมัน",
      image: "/images/services/pds-product-6.webp",
      color: "from-teal-600 to-teal-800",
      accent: "#0d9488"
    }
  ];

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const handleProductClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section
      id="services"
      className="relative min-h-screen bg-white services-elegant-texture overflow-hidden services-parallax-section parallax-optimized services-section-overlap"
      style={{
        transform: `translateY(${-scrollY * 0.3}px)`,
      }}
    >
      {/* Elegant texture background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${products[activeIndex].accent}08 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, ${products[activeIndex].accent}05 0%, transparent 50%)`,
          transition: 'background-image 1s ease-in-out'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="w-20 h-px bg-gray-300"></div>
              <span className="text-[var(--primary-blue)] uppercase text-2xl lg:text-5xl font-semibold">
                สินค้าและบริการ
              </span>
              <div className="w-20 h-px bg-gray-300"></div>
            </div>

            {/* <h2 className="text-5xl lg:text-5xl font-black text-[var(--primary-blue)] mb-8 leading-tight">
              สินค้าและบริการ
            </h2> */}

            <p className="text-md md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-normal">
              ตลอดระยะเวลากว่า 50 ปี กลุ่มบริษัทผดุงศิลป์ คือผู้เชี่ยวชาญในธุรกิจสถานีบริการน้ำมันครบวงจร ปัจจุบันเรามีสินค้าและบริการที่ตอบสนองความต้องการของกลุ่มลูกค้า ดังต่อไปนี้
            </p>
          </div>

          {/* Main Content Area */}
          <div className="space-y-12">

            {/* Featured Products Grid - Desktop / Carousel - Mobile */}
            <div className="space-y-6">
              {/* Desktop Grid - Hidden on Mobile */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className={`relative aspect-square overflow-hidden bg-gray-100 shadow-lg transition-all duration-500 cursor-pointer group`}
                    onClick={() => handleProductClick(index)}
                  >
                    {/* Product Image */}
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                    {/* Product content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-6">
                      {/* Content container that moves up on hover to make room for learn more link */}
                      <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-12">
                        <div className="space-y-3">
                          {/* Product Title - Moves up on hover */}
                          <h3 className="text-xl lg:text-xl font-black text-white line-clamp-1 leading-tight transform transition-all duration-500 ease-out">
                            {product.title}
                          </h3>

                          {/* Product Description - Moves up on hover */}
                          <p className="text-white/80 text-md leading-relaxed line-clamp-2 transform transition-all duration-500 ease-out">
                            {product.description}
                          </p>
                        </div>
                      </div>

                      {/* Learn More Link - Slides up from bottom */}
                      <div className="absolute bottom-6 left-6 right-6 overflow-hidden">
                        <div className="transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-150">
                          <span className="inline-flex items-center gap-2 text-white/90 text-md font-medium group-hover:text-white transition-colors duration-300 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-black/30 hover:border-white/30">
                            เรียนรู้เพิ่มเติม
                            <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </div>
                      </div>
                    </div>


                  </div>
                ))}
              </div>

              {/* Mobile Carousel */}
              <div className="hidden">
                <div className="relative">
                  {/* Carousel Container */}
                  <div className="overflow-hidden">
                    <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${activeIndex * 100} %)` }}
                    >
                      {products.map((product, index) => (
                        <div
                          key={product.id}
                          className="w-full flex-shrink-0 relative h-[500px] bg-gray-100"
                        >
                          {/* Product Image */}
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />

                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                          {/* Product content overlay */}
                          <div className="absolute inset-0 flex flex-col justify-end p-6">
                            <div className="space-y-4">

                              {/* Product Title */}
                              <h3 className="text-2xl font-black text-white leading-tight">
                                {product.title}
                              </h3>

                              {/* Product Description */}
                              <p className="text-white/90 leading-relaxed text-base">
                                {product.description}
                              </p>

                              {/* Action Button */}
                              <div className="pt-2">
                                <MinimalButton
                                  href="/products-services"
                                  variant="white"
                                  icon={<ExternalLink className="w-5 h-5" />}
                                  className="px-6 py-3"
                                >
                                  เรียนรู้เพิ่มเติม
                                </MinimalButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Navigation Dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {products.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleProductClick(index)}
                        className={`w - 3 h - 3 rounded - full transition - all duration - 300 ${index === activeIndex
                          ? 'scale-125'
                          : 'hover:scale-110'
                          }`}
                        style={{
                          backgroundColor: index === activeIndex ? products[activeIndex].accent : 'rgba(0,0,0,0.3)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="text-center space-y-6 pt-8">
              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  สนใจสินค้าและบริการของเรา?
                </h4>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  ติดต่อเราเพื่อขอคำปรึกษาและรับใบเสนอราคาฟรี หรือดูรายละเอียดเพิ่มเติมของสินค้าและบริการทั้งหมด
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <MinimalButton
                  href="/products-services"
                  variant="primary"
                  icon={<ArrowRight className="w-5 h-5" />}
                  className="px-8 py-4 text-lg"
                >
                  ดูสินค้าและบริการทั้งหมด
                </MinimalButton>

                <MinimalButton
                  href="/contact"
                  variant="secondary"
                  className="px-8 py-4 text-lg border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900"
                >
                  ติดต่อเรา
                </MinimalButton>
              </div>
            </div>
          </div>


        </div>
      </div >
    </section >
  );
}