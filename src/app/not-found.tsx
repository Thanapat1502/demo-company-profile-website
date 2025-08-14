"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, ArrowLeft, Mail, Building2, Search, FileText } from 'lucide-react';
import ButtonWrapper from '@/components/ui/ButtonWrapper';
import MainLayout from '@/components/layout/MainLayout';

export default function NotFoundPage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Get locale from params or default to 'th'
  const locale = (params?.locale as string) || 'th';
  const isThaiLocale = locale === 'th';

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
    <MainLayout forceSolidNavBar>
      {/* 404 Hero Section with Glass Morphism */}
      <section className="mt-[80px] min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 relative overflow-hidden flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Glass Orbs */}
          {/* <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200/20 backdrop-blur-sm rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white/5 backdrop-blur-sm rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-100/15 backdrop-blur-sm rounded-full animate-pulse delay-500"></div> */}

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23112ef4' fill-opacity='0.4'%3E%3Cpath d='M20 20h20v20H20V20zm-20 0h20v20H0V20z'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Glass Morphism Container */}
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/5">
              {/* 404 Number with Glass Effect */}
              <div className="mb-8">
                <div className="text-7xl sm:text-8xl lg:text-9xl font-black mb-4 relative">
                  <span className="bg-gradient-to-br from-[var(--primary-blue)] to-blue-600 bg-clip-text text-transparent">
                    404
                  </span>
                  <div className="absolute inset-0 text-7xl sm:text-8xl lg:text-9xl font-black opacity-10 blur-sm text-[var(--primary-blue)]">
                    404
                  </div>
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary-blue)] to-blue-400 mx-auto rounded-full"></div>
              </div>

              {/* Error Message with Glass Theme */}
              <div className="mb-12">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-slate-800">
                  {isThaiLocale ? 'ไม่พบหน้าที่ต้องการ' : 'Page Not Found'}
                </h1>
                <div className="max-w-2xl mx-auto space-y-4">
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {isThaiLocale
                      ? 'หน้าที่คุณกำลังมองหาอาจถูกลบ เปลี่ยนชื่อ หรือไม่สามารถใช้งานได้ชั่วคราว'
                      : 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
                    }
                  </p>
                  <p className="text-base text-slate-500">
                    {isThaiLocale
                      ? 'กรุณาตรวจสอบ URL หรือใช้ลิงก์ด้านล่างเพื่อค้นหาสิ่งที่คุณต้องการ'
                      : 'Please check the URL or use the links below to find what you need.'
                    }
                  </p>
                </div>
              </div>

              {/* Glass Morphism Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <ButtonWrapper
                  as={Link}
                  href={`/${locale}`}
                  className="bg-[var(--primary-blue)]/90 hover:bg-[var(--primary-blue)] backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[var(--primary-blue)]/25 min-w-48 flex items-center justify-center gap-3"
                  startContent={<Home className="w-5 h-5" />}>
                  {isThaiLocale ? 'กลับหน้าแรก' : 'Go Home'}
                </ButtonWrapper>

                <ButtonWrapper
                  onPress={handleGoBack}
                  className="bg-white/40 hover:bg-white/60 backdrop-blur-sm border border-white/30 text-slate-700 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg min-w-48 flex items-center justify-center gap-3"
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
                      <Building2 className="w-6 h-6 text-[var(--primary-blue)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">
                        {isThaiLocale ? 'เกี่ยวกับเรา' : 'About Us'}
                      </h3>
                      <p className="text-sm text-slate-600">
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
                      <FileText className="w-6 h-6 text-[var(--primary-blue)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">
                        {isThaiLocale ? 'ผลิตภัณฑ์และบริการ' : 'Products & Services'}
                      </h3>
                      <p className="text-sm text-slate-600">
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
                      <Search className="w-6 h-6 text-[var(--primary-blue)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">
                        {isThaiLocale ? 'ผลงาน' : 'References'}
                      </h3>
                      <p className="text-sm text-slate-600">
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
                      <Mail className="w-6 h-6 text-[var(--primary-blue)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">
                        {isThaiLocale ? 'ติดต่อเรา' : 'Contact Us'}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {isThaiLocale ? 'ช่องทางติดต่อ' : 'Get in touch'}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Language Switch with Glass Effect */}
              <div className="text-center">
                <p className="text-slate-600 mb-4 text-sm">
                  {isThaiLocale ? 'เปลี่ยนภาษา:' : 'Switch Language:'}
                </p>
                <div className="flex gap-3 justify-center">
                  <ButtonWrapper
                    as={Link}
                    href="/th"
                    className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${locale === 'th'
                      ? 'bg-[var(--primary-blue)]/90 text-white shadow-lg'
                      : 'bg-white/40 hover:bg-white/60 backdrop-blur-sm border border-white/30 text-slate-700'
                      }`}>
                    ไทย
                  </ButtonWrapper>
                  <ButtonWrapper
                    as={Link}
                    href="/en"
                    className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${locale === 'en'
                      ? 'bg-[var(--primary-blue)]/90 text-white shadow-lg'
                      : 'bg-white/40 hover:bg-white/60 backdrop-blur-sm border border-white/30 text-slate-700'
                      }`}>
                    English
                  </ButtonWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
