"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
} from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import MinimalButton from "@/components/ui/MinimalButton";
import { Badge } from "@heroui/react";
import { Card, CardBody } from "@heroui/react";

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
    "sustainability-initiative": {
      title: "ผดุงศิลป์ริเริ่มโครงการความยั่งยืนเพื่อสิ่งแวดล้อม",
      excerpt:
        "บริษัทเปิดตัวโครงการใหม่เพื่อลดผลกระทบต่อสิ่งแวดล้อม พร้อมเป้าหมายลดการปล่อยคาร์บอน 50% ภายในปี 2570",
      content: `
        <p>กลุ่มบริษัท ผดุงศิลป์ ประกาศเปิดตัวโครงการความยั่งยืนเพื่อสิ่งแวดล้อมอย่างเป็นทางการ โดยมีเป้าหมายลดการปล่อยคาร์บอน 50% ภายในปี 2570</p>
        
        <h2>แผนงานหลัก</h2>
        <ul>
          <li>การใช้พลังงานทดแทนในกระบวนการผลิต</li>
          <li>การพัฒนาวัสดุก่อสร้างที่เป็นมิตรต่อสิ่งแวดล้อม</li>
          <li>การจัดการของเสียอย่างมีประสิทธิภาพ</li>
          <li>การปลูกป่าเพื่อชดเชยคาร์บอน</li>
        </ul>
      `,
      image:
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      category: "ความยั่งยืน",
      date: "2567-01-05",
      author: "ทีมพัฒนาอย่างยั่งยืน",
      slug: "sustainability-initiative",
      readTime: "4 นาที",
      tags: ["ความยั่งยืน", "สิ่งแวดล้อม", "คาร์บอน", "พลังงานทดแทน"],
    },
  };

  useEffect(() => {
    const foundArticle = mockArticles[slug];
    if (foundArticle) {
      setArticle(foundArticle);
      // Get related articles (excluding current article)
      const related = Object.values(mockArticles)
        .filter((a) => a.slug !== slug)
        .slice(0, 2);
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

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            ไม่พบข่าวสารที่ต้องการ
          </h1>
          <p className="text-slate-600 mb-8">
            ข่าวสารที่คุณกำลังมองหาอาจถูกลบหรือย้ายไปแล้ว
          </p>
          <Link href={`/${locale}/news-events`}>
            <MinimalButton className="bg-orange-600 hover:bg-blue-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับไปหน้าข่าวสาร
            </MinimalButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href={`/${locale}/news-events`}
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">ข่าวสาร</span>
            </Link>
            <div className="flex items-center space-x-4">
              <MinimalButton size="sm">
                <Share2 className="w-4 h-4" />
              </MinimalButton>
              <MinimalButton size="sm">
                <Bookmark className="w-4 h-4" />
              </MinimalButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40 z-10" />
        <div className="relative h-[60vh] min-h-[500px]">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <div className="max-w-4xl">
              <Badge className="mb-6 bg-orange-600 text-white hover:bg-blue-800 text-sm font-medium">
                {article.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center space-x-6 text-slate-200">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Article Content */}
            <div className="lg:col-span-8">
              <div className="max-w-none">
                {/* Excerpt */}
                <div className="mb-12">
                  <p className="text-xl text-slate-600 leading-relaxed font-light">
                    {article.excerpt}
                  </p>
                </div>

                {/* Content */}
                <div
                  className="prose prose-lg prose-slate max-w-none"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.8",
                  }}
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags */}
                <div className="mt-16 pt-8 border-t border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">
                    แท็ก
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {article.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        className="px-4 py-2 text-sm border-slate-300 text-slate-700 hover:bg-slate-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <Card className="border-slate-200">
                    <CardBody className="p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-6">
                        ข่าวเด่น
                      </h3>
                      <div className="space-y-6">
                        {relatedArticles.map((relatedArticle, index) => (
                          <Link
                            key={index}
                            href={`/${locale}/news-events/${relatedArticle.slug}`}
                            className="group block">
                            <article className="space-y-3">
                              <div className="relative h-32 bg-slate-100 rounded-lg overflow-hidden">
                                <Image
                                  src={
                                    relatedArticle.image || "/placeholder.svg"
                                  }
                                  alt={relatedArticle.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div>
                                <Badge className="mb-2 text-xs bg-slate-100 text-slate-700">
                                  {relatedArticle.category}
                                </Badge>
                                <h4 className="font-semibold text-slate-900 group-hover:text-blue-800 transition-colors line-clamp-2 mb-2">
                                  {relatedArticle.title}
                                </h4>
                                <div className="flex items-center text-xs text-slate-500 space-x-2">
                                  <span>{formatDate(relatedArticle.date)}</span>
                                  <span>•</span>
                                  <span>{relatedArticle.readTime}</span>
                                </div>
                              </div>
                            </article>
                          </Link>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                )}

                {/* Company Info Card */}
                <Card className="border-slate-200 bg-gradient-to-br from-orange-50 to-orange-100/50">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      เกี่ยวกับผดุงศิลป์กรุ๊ป
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      ผู้นำด้านการก่อสร้างและผลิตภัณฑ์ถังน้ำมันใต้ดิน PERMATANK®
                      ที่มีประสบการณ์กว่า 30 ปี
                    </p>
                    <MinimalButton
                      size="sm"
                      className="w-full border-orange-200 text-white bg-transparent">
                      เรียนรู้เพิ่มเติม
                    </MinimalButton>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ติดตามข่าวสารล่าสุด
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            รับข้อมูลข่าวสารและอัปเดตโครงการใหม่ๆ จากผดุงศิลป์กรุ๊ป
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="อีเมลของคุณ"
              className="flex-1 px-4 py-3 rounded-lg border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <MinimalButton className="hover:bg-blue-800 px-8">
              สมัครรับข่าวสาร
            </MinimalButton>
          </div>
        </div>
      </section>
    </div>
  );
}
