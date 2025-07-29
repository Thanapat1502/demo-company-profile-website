"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  User,
  Clock,
  Tag,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import MinimalButton from "@/components/ui/MinimalButton";

interface NewsArticle {
  title: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
  slug: string;
  readTime: string;
  tags: string[];
}

export default function NewsDetailPage() {
  const t = useTranslations();
  const locale = useLocale();
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);

  // Mock data - in real app, this would come from API
  const mockArticles: Record<string, NewsArticle> = {
    "padungsilpa-wins-major-project": {
      title: "ผดุงศิลป์กรุ๊ป คว้าโครงการก่อสร้างสถานีบริการน้ำมันใหญ่",
      excerpt:
        "บริษัทได้รับเลือกให้เป็นผู้รับเหมาหลักในโครงการก่อสร้างสถานีบริการน้ำมันขนาดใหญ่ มูลค่ากว่า 500 ล้านบาท ในพื้นที่ภาคตะวันออก",
      content: `
        <p>กลุ่มบริษัท ผดุงศิลป์ ประกาศความสำเร็จในการคว้าโครงการก่อสร้างสถานีบริการน้ำมันขนาดใหญ่ มูลค่ากว่า 500 ล้านบาท ในพื้นที่ภาคตะวันออก ซึ่งถือเป็นโครงการที่ใหญ่ที่สุดในรอบ 5 ปีของบริษัท</p>
        
        <h2>รายละเอียดโครงการ</h2>
        <p>โครงการนี้ครอบคลุมการก่อสร้างสถานีบริการน้ำมันแบบครบวงจร พร้อมด้วยสิ่งอำนวยความสะดวกต่างๆ ดังนี้:</p>
        <ul>
          <li>หัวจ่ายน้ำมัน 12 หัว พร้อมระบบ ATG ล่าสุด</li>
          <li>ร้านสะดวกซื้อขนาด 200 ตารางเมตร</li>
          <li>ระบบล้างรถอัตโนมัติ</li>
          <li>ที่จอดรถสำหรับรถบรรทุกขนาดใหญ่</li>
          <li>ระบบพลังงานสะอาดด้วยแผงโซลาร์เซลล์</li>
        </ul>
        
        <h2>เทคโนโลยีที่ใช้</h2>
        <p>โครงการนี้จะใช้เทคโนโลยี PERMATANK® รุ่นล่าสุด ซึ่งเป็นถังน้ำมันใต้ดินผนัง 2 ชั้นที่มีความปลอดภัยสูงสุด พร้อมด้วยระบบตรวจจับการรั่วไหลแบบเรียลไทม์</p>
        
        <h2>กำหนดการดำเนินงาน</h2>
        <p>โครงการจะเริ่มดำเนินการในเดือนกุมภาพันธ์ 2567 และคาดว่าจะแล้วเสร็จในเดือนพฤศจิกายน 2567 โดยจะมีการจ้างงานในพื้นที่ประมาณ 150 คน</p>
        
        <p>นายสมชาย ผดุงศิลป์ ประธานกรรมการบริหาร กล่าวว่า "เราภูมิใจที่ได้รับความไว้วางใจในโครงการสำคัญนี้ และมั่นใจว่าจะส่งมอบงานที่มีคุณภาพสูงสุดตามมาตรฐานสากล"</p>
      `,
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "ข่าวบริษัท",
      date: "2567-01-15",
      author: "ทีมข่าวสาร",
      slug: "padungsilpa-wins-major-project",
      readTime: "3 นาที",
      tags: ["โครงการใหม่", "สถานีบริการ", "ภาคตะวันออก", "PERMATANK"],
    },
    "new-permatank-launch": {
      title: "เปิดตัวถังน้ำมัน PERMATANK® รุ่นใหม่",
      excerpt:
        "นวัตกรรมถังน้ำมันใต้ดินผนัง 2 ชั้น ที่ปลอดภัยและทนทานยิ่งขึ้น พร้อมระบบตรวจจับการรั่วไหลล่าสุด และเทคโนโลยี IoT",
      content: `
        <p>กลุ่มบริษัท ผดุงศิลป์ เปิดตัวถังน้ำมัน PERMATANK® รุ่นใหม่ล่าสุด ที่มาพร้อมกับเทคโนโลยีที่ทันสมัยและระบบความปลอดภัยที่เหนือกว่า</p>
        
        <h2>จุดเด่นของ PERMATANK® รุ่นใหม่</h2>
        <ul>
          <li>ผนัง 2 ชั้นที่หนาขึ้น 30% เพื่อความทนทานสูงสุด</li>
          <li>ระบบตรวจจับการรั่วไหลแบบเรียลไทม์</li>
          <li>เทคโนโลยี IoT สำหรับการตรวจสอบระยะไกล</li>
          <li>วัสดุที่เป็นมิตรต่อสิ่งแวดล้อม</li>
          <li>อายุการใช้งานยาวนานกว่า 50 ปี</li>
        </ul>
        
        <h2>การรับรองมาตรฐาน</h2>
        <p>PERMATANK® รุ่นใหม่ได้รับการรับรองมาตรฐานสากล รวมถึง:</p>
        <ul>
          <li>UL 58 - มาตรฐานสำหรับถังเก็บน้ำมันใต้ดิน</li>
          <li>UL 1746 - มาตรฐานสำหรับระบบตรวจจับการรั่วไหล</li>
          <li>ISO 9001:2015 - ระบบจัดการคุณภาพ</li>
        </ul>
        
        <p>ผลิตภัณฑ์นี้จะเริ่มจำหน่ายในเดือนมีนาคม 2567 และคาดว่าจะได้รับความสนใจจากลูกค้าในอุตสาหกรรมน้ำมันและพลังงานเป็นอย่างมาก</p>
      `,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "ผลิตภัณฑ์",
      date: "2567-01-10",
      author: "ทีมวิศวกรรม",
      slug: "new-permatank-launch",
      readTime: "5 นาที",
      tags: ["PERMATANK", "นวัตกรรม", "เทคโนโลยี", "IoT"],
    },
  };

  useEffect(() => {
    const foundArticle = mockArticles[slug];
    if (foundArticle) {
      setArticle(foundArticle);

      // Get related articles (excluding current article)
      const related = Object.values(mockArticles)
        .filter((a) => a.slug !== slug)
        .slice(0, 3);
      setRelatedArticles(related);
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  if (!article) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ไม่พบข่าวสารที่ต้องการ
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            ข่าวสารที่คุณกำลังมองหาอาจถูกลบหรือย้ายไปแล้ว
          </p>
          <Link href={`/${locale}/news-events`}>
            <MinimalButton variant="primary">กลับไปหน้าข่าวสาร</MinimalButton>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header - Added top margin for navbar */}
      <section className="pt-24 pb-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href={`/${locale}/news-events`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft size={20} className="mr-2" />
            กลับไปหน้าข่าวสาร
          </Link>

          <div className="mb-6">
            <span className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full">
              {article.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <User size={18} className="mr-2" />
              {article.author}
            </div>
            <div className="flex items-center">
              <Calendar size={18} className="mr-2" />
              {formatDate(article.date)}
            </div>
            <div className="flex items-center">
              <Clock size={18} className="mr-2" />
              {article.readTime}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-600">แชร์:</span>
            <div className="flex gap-2">
              <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <Facebook size={18} />
              </button>
              <button className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors">
                <Twitter size={18} />
              </button>
              <button className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors">
                <Linkedin size={18} />
              </button>
              <button className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-4 flex-wrap">
                <Tag size={20} className="text-gray-500" />
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              ข่าวเด่น
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle, index) => (
                <Link
                  key={index}
                  href={`/${locale}/news-events/${relatedArticle.slug}`}
                  className="group block">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-48">
                      <Image
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                          {relatedArticle.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {relatedArticle.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                        {relatedArticle.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {formatDate(relatedArticle.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {relatedArticle.readTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}
