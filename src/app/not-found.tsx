"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, ArrowLeft, Mail, Building2, Search, FileText } from 'lucide-react';
import ButtonWrapper from '@/components/ui/ButtonWrapper';
// import MainLayout from '@/components/layout/MainLayout';


export default function NotFoundPage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Get locale from params or default to 'th'
  const locale = (params?.locale as string) || 'en';
  const isThaiLocale = locale === 'th'

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(`/${locale}`);
    }
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div>
      {/* 404 Hero Section with Background Image and Glass Morphism */}
      <section className="min-h-screen relative overflow-hidden flex items-center justify-center">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-sections/hero-banner-1.jpg"
            alt="404 Background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Gradient overlay for depth */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div> */}
        </div>

        {/* Floating Glass Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 backdrop-blur-sm rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200/10 backdrop-blur-sm rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white/3 backdrop-blur-sm rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-100/8 backdrop-blur-sm rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="max-w-4xl py-8 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center gap-4 flex flex-col">
            {/* Enhanced Glass Morphism Container */}
            <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-3xl p-8  shadow-2xl shadow-black/20 backdrop-saturate-150">
              {/* 404 Number with Glass Effect */}
              <div className="mb-8">
                <div className="text-7xl sm:text-8xl lg:text-9xl font-normal mb-4 relative">
                  <span className="text-white bg-clip-text text-transparent">
                    404
                  </span>
                  <div className="absolute inset-0 text-7xl sm:text-8xl lg:text-9xl font-normal opacity-10 blur-sm text-white">
                    404
                  </div>
                </div>
                {/* <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary-blue)] to-blue-400 mx-auto rounded-full"></div> */}
              </div>

              {/* Error Message with Glass Theme */}
              <div className="">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
                  {isThaiLocale ? 'ไม่พบหน้าที่ต้องการ' : 'Page Not Found'}
                </h1>
                <div className="max-w-2xl mx-auto space-y-4">
                  <p className="text-lg text-white/90 leading-relaxed drop-shadow-md">
                    {isThaiLocale
                      ? 'หน้าที่คุณกำลังมองหาอาจถูกลบ เปลี่ยนชื่อ หรือไม่สามารถใช้งานได้ชั่วคราว'
                      : 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
                    }
                  </p>
                  <p className="text-base text-white/80 drop-shadow-sm">
                    {isThaiLocale
                      ? 'กรุณาตรวจสอบ URL หรือใช้ลิงก์ด้านล่างเพื่อค้นหาสิ่งที่คุณต้องการ'
                      : 'Please check the URL or use the links below to find what you need.'
                    }
                  </p>
                </div>
              </div>


            </div>
            {/* Enhanced Glass Morphism Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ButtonWrapper
                as={Link}
                href={`/${locale}`}
                className="bg-[var(--primary-blue)]/80 hover:bg-[var(--primary-blue)]/90 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[var(--primary-blue)]/30 min-w-48 flex items-center justify-center gap-3 backdrop-saturate-150"
                startContent={<Home className="w-5 h-5" />}>
                {isThaiLocale ? 'กลับหน้าแรก' : 'Go Home'}
              </ButtonWrapper>

              <ButtonWrapper
                onPress={handleGoBack}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl min-w-48 flex items-center justify-center gap-3 backdrop-saturate-150"
                startContent={<ArrowLeft className="w-5 h-5" />}>
                {isThaiLocale ? 'ย้อนกลับ' : 'Go Back'}
              </ButtonWrapper>
            </div>

            {/* Glass Morphism Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Link
                href={`/${locale}/pds-group`}
                className="group bg-white/30 hover:bg-white/50 backdrop-blur-sm border border-white/40 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--primary-blue)]/20 rounded-xl flex items-center justify-center group-hover:bg-[var(--primary-blue)]/30 transition-colors">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {isThaiLocale ? 'เกี่ยวกับเรา' : 'About Us'}
                    </h3>
                    <p className="text-sm text-white">
                      {isThaiLocale ? 'ประวัติและวิสัยทัศน์' : 'Our story & vision'}
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href={`/${locale}/products-services`}
                className="group bg-white/30 hover:bg-white/50 backdrop-blur-sm border border-white/40 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--primary-blue)]/20 rounded-xl flex items-center justify-center group-hover:bg-[var(--primary-blue)]/30 transition-colors">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {isThaiLocale ? 'ผลิตภัณฑ์และบริการ' : 'Products & Services'}
                    </h3>
                    <p className="text-sm text-white">
                      {isThaiLocale ? 'สินค้าและบริการของเรา' : 'What we offer'}
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href={`/${locale}/reference`}
                className="group bg-white/30 hover:bg-white/50 backdrop-blur-sm border border-white/40 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--primary-blue)]/20 rounded-xl flex items-center justify-center group-hover:bg-[var(--primary-blue)]/30 transition-colors">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {isThaiLocale ? 'ผลงาน' : 'References'}
                    </h3>
                    <p className="text-sm text-white">
                      {isThaiLocale ? 'โครงการที่ผ่านมา' : 'Our past projects'}
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href={`/${locale}/contact-us`}
                className="group bg-white/30 hover:bg-white/50 backdrop-blur-sm border border-white/40 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--primary-blue)]/20 rounded-xl flex items-center justify-center group-hover:bg-[var(--primary-blue)]/30 transition-colors">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {isThaiLocale ? 'ติดต่อเรา' : 'Contact Us'}
                    </h3>
                    <p className="text-sm text-white">
                      {isThaiLocale ? 'ช่องทางติดต่อ' : 'Get in touch'}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Enhanced Language Switch with Glass Effect */}
            <div className="text-center">
              <p className="text-white/80 mb-4 text-sm drop-shadow-sm">
                {isThaiLocale ? 'เปลี่ยนภาษา:' : 'Switch Language:'}
              </p>
              <div className="flex gap-3 justify-center">
                <ButtonWrapper
                  as={Link}
                  href="/th"
                  className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 backdrop-blur-md backdrop-saturate-150 ${locale === 'th'
                    ? 'bg-[var(--primary-blue)]/80 text-white shadow-lg border border-white/30'
                    : 'bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white hover:text-white'
                    }`}>
                  ไทย
                </ButtonWrapper>
                <ButtonWrapper
                  as={Link}
                  href="/en"
                  className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 backdrop-blur-md backdrop-saturate-150 ${locale === 'en'
                    ? 'bg-[var(--primary-blue)]/80 text-white shadow-lg border border-white/30'
                    : 'bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white hover:text-white'
                    }`}>
                  English
                </ButtonWrapper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
