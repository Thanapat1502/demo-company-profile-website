"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, ArrowLeft, Phone, Mail, Building2 } from 'lucide-react';
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
    <MainLayout>
      {/* 404 Hero Section */}
      <section className="section-minimal-large bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23112ef4' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* 404 Visual with construction theme */}
            <div className="mb-12">
              <div className="heading-construction text-8xl sm:text-9xl lg:text-[12rem] font-black mb-6 relative text-[var(--primary-blue)]">
                404
                <div className="absolute inset-0 heading-construction opacity-20 blur-sm">404</div>
              </div>
              <div className="w-32 h-2 bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-light)] mx-auto mb-8"></div>
            </div>

            {/* Error Message with construction theme */}
            <div className="mb-16">
              <h1 className="heading-construction text-4xl sm:text-5xl lg:text-6xl font-black mb-8 leading-tight">
                {isThaiLocale ? 'ไม่พบหน้าที่ต้องการ' : 'PAGE NOT FOUND'}
              </h1>
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-xl text-gray-700 font-medium leading-relaxed">
                  {isThaiLocale
                    ? 'หน้าที่คุณกำลังมองหาอาจถูกลบ เปลี่ยนชื่อ หรือไม่สามารถใช้งานได้ชั่วคราว'
                    : 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
                  }
                </p>
                <p className="text-lg text-gray-600">
                  {isThaiLocale
                    ? 'กรุณาตรวจสอบ URL หรือกลับไปที่หน้าแรกเพื่อค้นหาสิ่งที่คุณต้องการ'
                    : 'Please check the URL or return to our homepage to find what you need.'
                  }
                </p>
              </div>
            </div>

            {/* Action Buttons with construction theme */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <ButtonWrapper
                as={Link}
                href={`/${locale}`}
                className="btn-minimal-primary min-w-64 h-14 text-lg font-bold"
                startContent={<Home className="w-6 h-6" />}>
                {isThaiLocale ? 'กลับหน้าแรก' : 'Go to Homepage'}
              </ButtonWrapper>

              <ButtonWrapper
                as={Link}
                href={`/${locale}/products-services`}
                className="btn-minimal-secondary min-w-64 h-14 text-lg font-bold"
                startContent={<Building2 className="w-6 h-6" />}>
                {isThaiLocale ? 'ดูบริการ' : 'View Services'}
              </ButtonWrapper>

              <ButtonWrapper
                onPress={handleGoBack}
                className="btn-minimal-outline min-w-64 h-14 text-lg font-bold"
                startContent={<ArrowLeft className="w-6 h-6" />}>
                {isThaiLocale ? 'ย้อนกลับ' : 'Go Back'}
              </ButtonWrapper>
            </div>

            {/* Helpful Links with construction theme */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {/* Popular Pages */}
              <div className="card-minimal p-8">
                <h3 className="heading-construction text-xl font-bold mb-6">
                  {isThaiLocale ? 'หน้ายอดนิยม' : 'Popular Pages'}
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href={`/${locale}/pds-group`}
                      className="text-[var(--primary-blue)] hover:text-[var(--primary-blue-dark)] font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full"></div>
                      {isThaiLocale ? 'เกี่ยวกับเรา' : 'About Us'}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/products-services`}
                      className="text-[var(--primary-blue)] hover:text-[var(--primary-blue-dark)] font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full"></div>
                      {isThaiLocale ? 'ผลิตภัณฑ์และบริการ' : 'Products & Services'}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/reference`}
                      className="text-[var(--primary-blue)] hover:text-[var(--primary-blue-dark)] font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full"></div>
                      {isThaiLocale ? 'ผลงาน' : 'References'}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/contact`}
                      className="text-[var(--primary-blue)] hover:text-[var(--primary-blue-dark)] font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-[var(--primary-blue)] rounded-full"></div>
                      {isThaiLocale ? 'ติดต่อเรา' : 'Contact Us'}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="card-minimal p-8">
                <h3 className="heading-construction text-xl font-bold mb-6">
                  {isThaiLocale ? 'ต้องการความช่วยเหลือ?' : 'Need Help?'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--primary-blue)] bg-opacity-10 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[var(--primary-blue)]" />
                    </div>
                    <span className="text-gray-700 font-medium">+66 2-xxx-xxxx</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--primary-blue)] bg-opacity-10 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[var(--primary-blue)]" />
                    </div>
                    <span className="text-gray-700 font-medium">info@padungsilpa.com</span>
                  </div>
                  <ButtonWrapper
                    as={Link}
                    href={`/${locale}/contact`}
                    className="btn-minimal-secondary w-full mt-4">
                    {isThaiLocale ? 'ติดต่อเรา' : 'Contact Us'}
                  </ButtonWrapper>
                </div>
              </div>
            </div>

            {/* Language Switch */}
            <div className="mb-12">
              <p className="text-gray-600 mb-4">
                {isThaiLocale ? 'เปลี่ยนภาษา:' : 'Switch Language:'}
              </p>
              <div className="flex gap-4 justify-center">
                <ButtonWrapper
                  as={Link}
                  href="/th"
                  className={`btn-minimal-${locale === 'th' ? 'primary' : 'outline'} px-6`}>
                  ไทย
                </ButtonWrapper>
                <ButtonWrapper
                  as={Link}
                  href="/en"
                  className={`btn-minimal-${locale === 'en' ? 'primary' : 'outline'} px-6`}>
                  English
                </ButtonWrapper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
