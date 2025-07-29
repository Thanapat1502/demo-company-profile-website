"use client";

import { useState, useEffect } from "react";
import { Building2, Wrench, Cog, ArrowRight, Fuel } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";
import MinimalButton from "@/components/ui/MinimalButton";

export default function ProductsServicesPage() {
  const locale = useLocale();
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allProducts = [
    {
      name: "ถังน้ำมันใต้ดิน PERMATANK®",
      description:
        "ถังน้ำมันใต้ดินผนัง 2 ชั้น ทนทาน ปลอดภัย ได้มาตรฐานสากล UL 58 และ UL 1746 ออกแบบเพื่อความปลอดภัยสูงสุดและอายุการใช้งานยาวนาน",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "ท่อน้ำมันใต้ดินผนัง 2 ชั้น",
      description:
        "ระบบท่อน้ำมันใต้ดินที่ป้องกันการรั่วไหล มีระบบตรวจจับการรั่วไหลแบบเรียลไทม์ เหมาะสำหรับการติดตั้งในสถานีบริการน้ำมันทุกขนาด",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "ระบบวัดน้ำมันอัตโนมัติ (ATG)",
      description:
        "ระบบตรวจวัดระดับน้ำมันและการรั่วไหลแบบอัตโนมัติ เชื่อมต่อระบบคอมพิวเตอร์และ IoT สำหรับการจัดการที่มีประสิทธิภาพและทันสมัย",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "หัวจ่ายน้ำมันอัตโนมัติ",
      description:
        "หัวจ่ายน้ำมันที่ทันสมัย ปลอดภัย และมีประสิทธิภาพสูง พร้อมระบบควบคุมอัตโนมัติ ออกแบบเพื่อการใช้งานที่สะดวกและประหยัดพลังงาน",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "ระบบป้องกันการล้นถัง",
      description:
        "ระบบป้องกันการล้นถังน้ำมันที่ทันสมัย ช่วยป้องกันอุบัติเหตุและการสูญเสีย พร้อมระบบแจ้งเตือนอัตโนมัติและการติดตั้งที่ง่ายดาย",
      image:
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "ระบบดับเพลิงอัตโนมัติ",
      description:
        "ระบบดับเพลิงที่ทันสมัยและมีประสิทธิภาพสูง เพื่อความปลอดภัยสูงสุด ตรวจจับและดับเพลิงได้อย่างรวดเร็วและมีประสิทธิภาพ",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Show only first 6 products initially, all when expanded
  const displayedProducts = showAllProducts
    ? allProducts
    : allProducts.slice(0, 6);

  const processSteps = [
    {
      step: "01",
      title: "ปรึกษาและสำรวจ",
      description: "ให้คำปรึกษาเบื้องต้น สำรวจพื้นที่ และประเมินความต้องการ",
    },
    {
      step: "02",
      title: "ออกแบบและวางแผน",
      description: "ออกแบบระบบ จัดทำแบบแปลน และวางแผนการดำเนินงาน",
    },
    {
      step: "03",
      title: "ก่อสร้างและติดตั้ง",
      description: "ดำเนินการก่อสร้าง ติดตั้งอุปกรณ์ และทดสอบระบบ",
    },
    {
      step: "04",
      title: "ส่งมอบและบริการ",
      description: "ส่งมอบงานและให้บริการหลังการขาย รวมถึงการฝึกอบรม",
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <ImageCarouselHero
        images={["/images/hero-sections/hero-banner-3.jpg"]}
        title={`ผลิตภัณฑ์และบริการ`}
        subtitle="บริการครบวงจร"
        description={`ผลิตภัณฑ์และบริการคุณภาพสูง\nสำหรับสถานีบริการน้ำมันและอุตสาหกรรมพลังงาน`}
        autoSlideDelay={6000}>
        <MinimalButton
          href={`/${locale}/contact-us`}
          variant="white"
          icon={<ArrowRight className="w-5 h-5" />}>
          ขอใบเสนอราคา
        </MinimalButton>
        <MinimalButton
          href={`/${locale}/reference`}
          variant="secondary"
          className="border-white text-white hover:bg-white hover:text-gray-900">
          ดูผลงาน
        </MinimalButton>
      </ImageCarouselHero>

      {/* Service 1: งานก่อสร้างสถานีบริการน้ำมัน */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mr-6">
                  <Building2 size={32} className="text-blue-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  งานก่อสร้างสถานีบริการน้ำมัน
                </h2>
              </div>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">
                    บริษัท ผดุงศิลป์โยธาการ จำกัด (PCW)
                  </strong>
                  เป็นบริษัทฯก่อสร้างชั้นนำที่เชี่ยวชาญและมากด้วยประสบการณ์ในงานก่อสร้างสถานีบริการน้ำมัน
                  และก๊าซ ตลอดจนงานอื่นๆที่เกี่ยวข้อง
                  เนื่องจากมีผลงานเป็นที่เชื่อถือ และได้รับความไว้วางใจ
                  จากบริษัทน้ำมันชั้นนำ
                </p>

                <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-600">
                  <p className="font-semibold text-blue-900 text-xl">
                    ภายใต้นโยบาย "ถูกต้อง ถูกตังค์ ทันเวลา ปลอดภัย"
                  </p>
                </div>

                <p>
                  เรามุ่งมั่นพัฒนาการก่อสร้างสถานีบริการน้ำมันให้ได้มาตรฐานสูงสุดทั้งด้านคุณภาพและความปลอดภัย
                </p>
              </div>

              <div className="mt-8">
                <MinimalButton
                  href={`/${locale}/contact-us`}
                  variant="primary"
                  icon={<ArrowRight className="w-5 h-5" />}>
                  ติดต่อสอบถาม
                </MinimalButton>
              </div>
            </div>

            <div className="relative">
              <div
                className="relative h-96 rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  transform: `translateY(${scrollY * 0.1}px)`,
                }}>
                <Image
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="งานก่อสร้างสถานีบริการน้ำมัน"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 2: PERMATANK และถังน้ำมันแบบต่าง ๆ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/HTzu3zmGk80"
                  title="PERMATANK และถังน้ำมันแบบต่าง ๆ"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mr-6">
                  <Fuel size={32} className="text-green-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  PERMATANK และถังน้ำมันแบบต่าง ๆ
                </h2>
              </div>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  ถังน้ำมันใต้ดินแบบผนัง 2 ชั้นของบริษัท ผดุงศิลป์วิศวการ จำกัด
                  ในชื่อผลิตภัณฑ์
                  <strong className="text-gray-900">'PERMATANK'</strong>{" "}
                  ได้รับการผลิตตามมาตรฐาน
                  <strong className="text-blue-600">
                    UL 58 & UL 1746
                  </strong>{" "}
                  โดยใช้เทคโนโลยีจากสถาบัน Steel Tank Institute Technology, USA
                </p>

                <div className="bg-green-50 p-6 rounded-2xl border-l-4 border-green-600">
                  <p className="font-semibold text-green-900 text-xl">
                    ภายใต้นโยบาย &ldquo;ถูกต้อง ถูกตังค์ ทันเวลา ปลอดภัย&rdquo;
                  </p>
                </div>

                <p>
                  เราพัฒนาแบบถังน้ำมันใต้ดินและอุปกรณ์ที่เกี่ยวข้องอย่างต่อเนื่อง
                  เพื่อประโยชน์สูงสุดของลูกค้า ผู้รับเหมา และผู้ค้าอื่น ๆ
                  ที่เกี่ยวข้องกับงานสถานีบริการน้ำมัน
                </p>

                <p>
                  เพื่อให้มั่นใจว่าลูกค้าได้รับสินค้าที่มีคุณภาพและมีอายุการใช้งานยาวนานกว่า
                  <strong className="text-green-600">30 ปี</strong>{" "}
                  ผดุงศิลป์ให้ความสำคัญกับทุกขั้นตอนของกระบวนการผลิตและจัดส่ง
                  PERMATANK®
                </p>
              </div>

              <div className="mt-8">
                <MinimalButton
                  href={`/${locale}/contact-us`}
                  variant="primary"
                  icon={<ArrowRight className="w-5 h-5" />}>
                  ติดต่อสอบถาม
                </MinimalButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 3: จำหน่ายและติดตั้งท่อน้ำมันใต้ดินผนัง 2 ชั้น */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mr-6">
                  <Wrench size={32} className="text-purple-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  จำหน่ายและติดตั้งท่อน้ำมันใต้ดินผนัง 2 ชั้น
                </h2>
              </div>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  ด้วยประสบการณ์การติดตั้งท่อน้ำมันแบบผนัง 2 ชั้นมากกว่า{" "}
                  <strong className="text-purple-600">20 ปี</strong>
                  บริษัท ผดุงศิลป์วิศวการ จำกัด
                  เป็นตัวแทนจำหน่ายและติดตั้งท่อน้ำมันยี่ห้อ
                  <strong className="text-gray-900">
                    NUPIGECO S.P.A.
                  </strong>{" "}
                  รุ่น Smartflex และ Ecoflex ซึ่งผลิตในประเทศอิตาลี
                </p>

                <p>
                  ผลิตจากวัสดุ{" "}
                  <strong className="text-blue-600">
                    HDPE-100 (High-Density Polyethylene)
                  </strong>
                  ที่มีความแข็งแรง ทนทาน ไม่เกิดสนิม
                  และสามารถดัดโค้งได้ตามแนวการติดตั้ง
                </p>

                <div className="bg-purple-50 p-6 rounded-2xl border-l-4 border-purple-600">
                  <p className="font-semibold text-purple-900">
                    ผ่านมาตรฐาน EN14125 & IP2
                    และเป็นไปตามกฎกระทรวงพลังงานของสถานีบริการน้ำมันเชื้อเพลิง
                    พ.ศ. 2552
                  </p>
                </div>

                <p>
                  บริษัทฯ ให้บริการจำหน่ายและติดตั้งท่อน้ำมันผนัง 2
                  ชั้นแก่สถานีบริการน้ำมันชั้นนำ
                  และโรงงานอุตสาหกรรมในประเทศไทยมาตั้งแต่ปี 2545
                  โดยมีทีมงานติดตั้งที่ได้รับการฝึกอบรมจากเจ้าของผลิตภัณฑ์โดยตรง
                  ด้วยประสบการณ์มากกว่า{" "}
                  <strong className="text-purple-600">300 โครงการ</strong>
                </p>
              </div>

              <div className="mt-8">
                <MinimalButton
                  href={`/${locale}/contact-us`}
                  variant="primary"
                  icon={<ArrowRight className="w-5 h-5" />}>
                  ติดต่อสอบถาม
                </MinimalButton>
              </div>
            </div>

            <div className="relative">
              <div
                className="relative h-96 rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  transform: `translateY(${scrollY * -0.1}px)`,
                }}>
                <Image
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="จำหน่ายและติดตั้งท่อน้ำมันใต้ดินผนัง 2 ชั้น"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 4: ระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/udq5UVLwpds"
                  title="ระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mr-6">
                  <Cog size={32} className="text-orange-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  ระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน
                </h2>
              </div>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  เป็นตัวแทนจำหน่ายและติดตั้งระบบวัดน้ำมันอัตโนมัติภายในถังน้ำมัน
                </p>

                <p>
                  อุปกรณ์วัดน้ำมันใต้ดิน เช่น
                  เครื่องวัดระดับน้ำมันในถังอัตโนมัติ{" "}
                  <strong className="text-orange-600">(ATG)</strong>
                  ช่วยให้คุณสามารถตรวจสอบระดับน้ำมันในถังได้แบบ{" "}
                  <strong className="text-gray-900">Real-Time</strong>
                  เหมาะสำหรับสถานีบริการน้ำมันในยุคที่ราคาน้ำมันมีความผันผวน
                </p>

                <div className="bg-orange-50 p-6 rounded-2xl border-l-4 border-orange-600">
                  <p className="font-semibold text-orange-900">
                    ทำให้สามารถคาดการณ์สต๊อกและบริหารต้นทุนได้อย่างมีประสิทธิภาพ
                  </p>
                </div>

                <p>
                  สามารถใช้ได้กับสถานีบริการน้ำมันภายในองค์กร
                  สถานีบริการน้ำมันทั่วไป และคลังน้ำมันที่มีถังสูงถึง{" "}
                  <strong className="text-orange-600">21 เมตร</strong>
                </p>
              </div>

              <div className="mt-8">
                <MinimalButton
                  href={`/${locale}/contact-us`}
                  variant="primary"
                  icon={<ArrowRight className="w-5 h-5" />}>
                  ติดต่อสอบถาม
                </MinimalButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 5: บริการต่าง ๆ เกี่ยวกับถังน้ำมัน */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div
                className="relative h-96 rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  transform: `translateY(${scrollY * 0.15}px)`,
                }}>
                <Image
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="บริการต่าง ๆ เกี่ยวกับถังน้ำมัน"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mr-6">
                  <Cog size={32} className="text-indigo-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  บริการต่าง ๆ เกี่ยวกับถังน้ำมัน
                </h2>
              </div>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <div className="bg-indigo-50 p-6 rounded-2xl border-l-4 border-indigo-600">
                  <p className="font-semibold text-indigo-900 text-xl mb-4">
                    บริษัท ผดุงศิลป์วิศวการ จำกัด
                  </p>
                  <ol className="space-y-2 text-indigo-800">
                    <li>1. งานตรวจสอบการติดตั้งถัง PERMATANK</li>
                    <li>2. งานติดตั้งระบบท่อ NUPI-UPP-KPS</li>
                    <li>3. งานติดตั้ง TANK SUMP</li>
                    <li>4. งานติดตั้ง NANO ATG & ProGauge</li>
                    <li>5. งาน 3D SCAN</li>
                  </ol>
                </div>

                <p>
                  กลุ่มบริษัท ผดุงศิลป์
                  จะรักษาไว้ซึ่งพนักงานชั้นเยี่ยมในระดับปฏิบัติการ และบริหาร
                  โดยที่ทุกคนมีเป้าหมายเดียวกันในการนำเสนอลูกค้าด้วยผลงานก่อสร้าง,
                  สินค้า และบริการ ซึ่งไม่เพียงแต่ดีที่สุดเท่านั้น
                  ยังรวมไปถึงบุคลากรที่มีความรู้ ความสามารถเป็นเยี่ยม
                </p>
              </div>

              <div className="mt-8">
                <MinimalButton
                  href={`/${locale}/contact-us`}
                  variant="primary"
                  icon={<ArrowRight className="w-5 h-5" />}>
                  ติดต่อสอบถาม
                </MinimalButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              ผลิตภัณฑ์ของเรา
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              ผลิตภัณฑ์คุณภาพสูงสำหรับสถานีบริการน้ำมันและอุตสาหกรรมพลังงาน
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product, index) => (
              <div key={index} className="group cursor-pointer">
                {/* Simple image container */}
                <div className="relative h-64 mb-6 overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Clean content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          {!showAllProducts && allProducts.length > 6 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllProducts(true)}
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200">
                <span>ดูผลิตภัณฑ์เพิ่มเติม</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          )}

          {/* Show Less Button */}
          {showAllProducts && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAllProducts(false)}
                className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200">
                <span>ดูน้อยลง</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              ขั้นตอนการดำเนินงาน
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              กระบวนการทำงานที่เป็นระบบและมีประสิทธิภาพ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
