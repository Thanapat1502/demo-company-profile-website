"use client";

import { useState } from "react";
import { Calendar, User, ArrowRight, Search, Clock, Tag } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import ImageCarouselHero from "@/components/ui/ImageCarouselHero";
import MinimalButton from "@/components/ui/MinimalButton";

export default function NewsEventsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const featuredNews = [
    {
      id: "1",
      title: "ผดุงศิลป์กรุ๊ป คว้าโครงการก่อสร้างสถานีบริการน้ำมันใหญ่",
      description:
        "บริษัทได้รับเลือกให้เป็นผู้รับเหมาหลักในโครงการก่อสร้างสถานีบริการน้ำมันขนาดใหญ่ มูลค่ากว่า 500 ล้านบาท ในพื้นที่ภาคตะวันออก",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "ข่าวบริษัท",
      date: "15 มกราคม 2567",
      author: "ทีมข่าวสาร",
      slug: "padungsilpa-wins-major-project",
      readTime: "3 นาที",
    },
    {
      id: "2",
      title: "เปิดตัวถังน้ำมัน PERMATANK® รุ่นใหม่",
      description:
        "นวัตกรรมถังน้ำมันใต้ดินผนัง 2 ชั้น ที่ปลอดภัยและทนทานยิ่งขึ้น พร้อมระบบตรวจจับการรั่วไหลล่าสุด และเทคโนโลยี IoT",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "ผลิตภัณฑ์",
      date: "10 มกราคม 2567",
      author: "ทีมวิศวกรรม",
      slug: "new-permatank-launch",
      readTime: "5 นาที",
    },
    {
      id: "3",
      title: "มาตรฐานความปลอดภัยใหม่ในการก่อสร้าง",
      description:
        "บริษัทนำมาตรฐานความปลอดภัยระดับสากลมาใช้ในทุกโครงการ เพื่อความปลอดภัยของพนักงานและสิ่งแวดล้อม ตามมาตรฐาน ISO 45001",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "ความปลอดภัย",
      date: "8 มกราคม 2567",
      author: "ทีมความปลอดภัย",
      slug: "new-safety-standards",
      readTime: "4 นาที",
    },
  ];

  const newsArticles = [
    {
      title: "การใช้เทคโนโลยี AI ในการตรวจสอบคุณภาพ",
      excerpt:
        "บริษัทนำเทคโนโลยี AI มาใช้ในการตรวจสอบคุณภาพการก่อสร้าง เพื่อความแม่นยำและประสิทธิภาพที่สูงขึ้น",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "เทคโนโลยี",
      date: "2567-01-05",
      author: "ทีมเทคโนโลยี",
      slug: "ai-quality-control",
      readTime: "6 นาที",
    },
    {
      title: "โครงการพลังงานสะอาดในสถานีบริการ",
      excerpt:
        "เริ่มโครงการติดตั้งแผงโซลาร์เซลล์และระบบพลังงานสะอาดในสถานีบริการน้ำมันทั่วประเทศ",
      image:
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      category: "ความยั่งยืน",
      date: "2567-01-01",
      author: "ทีมพลังงาน",
      slug: "green-energy-initiative",
      readTime: "4 นาที",
    },
    {
      title: "ขยายธุรกิจสู่ภูมิภาคเอเชียตะวันออกเฉียงใต้",
      excerpt:
        "บริษัทเตรียมขยายธุรกิจไปยังประเทศเพื่อนบ้าน เริ่มจากเวียดนามและกัมพูชา",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "ธุรกิจ",
      date: "2566-12-20",
      author: "ทีมบริหาร",
      slug: "regional-expansion",
      readTime: "5 นาที",
    },
    {
      title: "ระบบสถานีอัจฉริยะ Smart Station",
      excerpt:
        "เปิดตัวระบบสถานีอัจฉริยะที่สามารถควบคุมและตรวจสอบได้แบบเรียลไทม์ผ่านแอปพลิเคชัน",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "เทคโนโลยี",
      date: "2566-12-15",
      author: "ทีมพัฒนา",
      slug: "smart-station-technology",
      readTime: "7 นาที",
    },
    {
      title: "ความร่วมมือกับมหาวิทยาลัยชั้นนำ",
      excerpt:
        "ลงนามความร่วมมือกับมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี เพื่อพัฒนานวัตกรรมใหม่",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80",
      category: "ความร่วมมือ",
      date: "2566-12-10",
      author: "ทีมพัฒนาธุรกิจ",
      slug: "university-partnership",
      readTime: "3 นาที",
    },
    {
      title: "โปรแกรมฝึกอบรมพนักงานใหม่",
      excerpt:
        "เปิดโปรแกรมฝึกอบรมพนักงานใหม่ด้านความปลอดภัยและเทคโนโลยีใหม่ล่าสุด",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "การฝึกอบรม",
      date: "2566-12-05",
      author: "ทีมทรัพยากรมนุษย์",
      slug: "employee-training-program",
      readTime: "4 นาที",
    },
    {
      title: "รางวัลความเป็นเลิศด้านความปลอดภัย",
      excerpt:
        "บริษัทได้รับรางวัลความเป็นเลิศด้านความปลอดภัยจากสมาคมวิศวกรรมโยธาแห่งประเทศไทย",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      category: "รางวัล",
      date: "2566-11-28",
      author: "ทีมประชาสัมพันธ์",
      slug: "safety-excellence-award",
      readTime: "2 นาที",
    },
    {
      title: "การพัฒนาระบบจัดการสิ่งแวดล้อม",
      excerpt:
        "นำระบบจัดการสิ่งแวดล้อมมาตรฐาน ISO 14001 มาใช้ในทุกโครงการเพื่อลดผลกระทบต่อสิ่งแวดล้อม",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "สิ่งแวดล้อม",
      date: "2566-11-20",
      author: "ทีมสิ่งแวดล้อม",
      slug: "environmental-management-system",
      readTime: "5 นาที",
    },
  ];

  const categories = [
    { key: "all", label: "ทั้งหมด" },
    { key: "ข่าวบริษัท", label: "ข่าวบริษัท" },
    { key: "เทคโนโลยี", label: "เทคโนโลยี" },
    { key: "ความยั่งยืน", label: "ความยั่งยืน" },
    { key: "ธุรกิจ", label: "ธุรกิจ" },
    { key: "ความปลอดภัย", label: "ความปลอดภัย" },
    { key: "รางวัล", label: "รางวัล" },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      {/* Hero Section */}
      <ImageCarouselHero
        images={[
          "/images/hero-sections/hero-banner-2.jpg",
          "/images/hero-sections/hero-banner-1.jpg",
          "/images/hero-sections/hero-banner-3.jpg",
        ]}
        title={`ข่าวสารและกิจกรรม\nกลุ่มบริษัทผดุงศิลป์`}
        subtitle="อัพเดทข่าวสารล่าสุด"
        description={`ติดตามข่าวสาร นวัตกรรม และกิจกรรม\nของบริษัทได้ที่นี่`}
        autoSlideDelay={6000}>
        <MinimalButton
          href="#newsletter"
          variant="white"
          icon={<ArrowRight className="w-5 h-5" />}>
          สมัครรับข่าวสาร
        </MinimalButton>
        <MinimalButton
          href={`/${locale}/contact-us`}
          variant="secondary"
          className="border-white text-white hover:bg-white hover:text-gray-900">
          ติดต่อเรา
        </MinimalButton>
      </ImageCarouselHero>

      {/* Featured News */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              ข่าวเด่น
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              ข่าวสารและความเคลื่อนไหวสำคัญของบริษัท
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {featuredNews.map((news, index) => (
              <Link
                key={news.id}
                href={`/${locale}/news-events/${news.slug}`}
                className="group block"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: "slideInLeft 0.8s ease-out forwards",
                }}>
                <article className="relative bg-white/80 backdrop-blur-sm border border-gray-100/60 hover:border-gray-200/80 transition-all duration-700 ease-out hover:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-3 overflow-hidden group-hover:bg-white/95">
                  {/* Luxury gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {/* Minimal category indicator */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

                  <div className="relative p-8">
                    {/* Elegant date and category */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4 text-xs text-gray-500 font-light tracking-wider uppercase">
                        <span>{news.date}</span>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <span>{news.category}</span>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-500">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Minimal image container */}
                    <div className="relative h-48 mb-8 overflow-hidden bg-gray-50">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover transition-all duration-1000 ease-out group-hover:scale-105 group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>

                    {/* Typography with luxury spacing */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-light text-gray-900 leading-tight tracking-wide line-clamp-2 group-hover:text-gray-800 transition-colors duration-500">
                        {news.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 font-light">
                        {news.description}
                      </p>

                      {/* Elegant read time indicator */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-500">
                        <div className="flex items-center text-xs text-gray-500 font-light">
                          <Clock size={14} className="mr-2" />
                          {news.readTime}
                        </div>

                        {/* Minimal read more */}
                        <div className="flex items-center text-blue-600 text-sm font-light opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                          <span className="mr-3 tracking-wide">อ่านต่อ</span>
                          <div className="w-6 h-px bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtle hover border effect */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-blue-100/50 transition-all duration-700 pointer-events-none"></div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="ค้นหาข่าวสาร..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.key
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}>
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              ข่าวสารล่าสุด
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              อัพเดทข่าวสารและความเคลื่อนไหวของบริษัทอย่างต่อเนื่อง
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredArticles.map((article, index) => (
              <Link
                key={index}
                href={`/${locale}/news-events/${article.slug}`}
                className="group block"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "scaleIn 0.6s ease-out forwards",
                }}>
                <article className="relative bg-white/70 backdrop-blur-sm border border-gray-100/50 hover:border-gray-200/70 transition-all duration-600 ease-out hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-2 overflow-hidden group-hover:bg-white/90">
                  {/* Minimal top accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-600 origin-left"></div>

                  {/* Luxury background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/40 via-white/60 to-blue-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-600"></div>

                  <div className="relative p-6">
                    {/* Minimal header with category and number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-xs text-gray-500 font-light tracking-widest uppercase">
                        {article.category}
                      </div>
                      <div className="w-6 h-6 bg-gray-100/80 flex items-center justify-center text-xs font-light text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-500">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Elegant image container */}
                    <div className="relative h-40 mb-6 overflow-hidden bg-gray-100/50">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-all duration-800 ease-out group-hover:scale-110 group-hover:brightness-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600"></div>
                    </div>

                    {/* Refined typography */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-light text-gray-900 leading-snug tracking-wide line-clamp-2 group-hover:text-gray-800 transition-colors duration-500">
                        {article.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 font-light">
                        {article.excerpt}
                      </p>

                      {/* Minimal metadata */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100/80 group-hover:border-gray-200/80 transition-colors duration-500">
                        <div className="flex items-center space-x-4 text-xs text-gray-500 font-light">
                          <div className="flex items-center">
                            <User size={12} className="mr-1.5" />
                            {article.author}
                          </div>
                          <div className="w-px h-3 bg-gray-300"></div>
                          <div className="flex items-center">
                            <Calendar size={12} className="mr-1.5" />
                            {formatDate(article.date)}
                          </div>
                        </div>

                        {/* Elegant read indicator */}
                        <div className="flex items-center text-xs text-gray-500 font-light">
                          <Clock size={12} className="mr-1.5" />
                          {article.readTime}
                        </div>
                      </div>

                      {/* Minimal read more */}
                      <div className="flex items-center justify-end pt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                        <div className="flex items-center text-blue-600 text-sm font-light">
                          <span className="mr-2 tracking-wide">อ่านต่อ</span>
                          <div className="w-4 h-px bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtle border effect */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-blue-100/40 transition-all duration-600 pointer-events-none"></div>
                </article>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">
                ไม่พบข่าวสารที่ตรงกับการค้นหา
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-2xl font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center mx-auto">
              <span>โหลดข่าวสารเพิ่มเติม</span>
              <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section
        className="py-16 bg-gradient-to-r from-blue-600 to-blue-800"
        id="newsletter">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            สมัครรับข่าวสาร
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            รับข่าวสารและอัพเดทล่าสุดจากเราก่อนใคร
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-6">
            <input
              type="email"
              placeholder="กรอกอีเมลของคุณ"
              className="flex-1 px-6 py-3 rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-white text-blue-600 rounded-2xl font-medium hover:bg-gray-100 transition-colors">
              สมัครรับข่าวสาร
            </button>
          </div>

          <p className="text-sm text-blue-200">
            เราจะไม่แชร์อีเมลของคุณกับบุคคลที่สาม และคุณสามารถยกเลิกได้ตลอดเวลา
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
