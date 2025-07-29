import { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/sections/home/HeroSection";
// import StatsSection from "@/components/sections/home/StatsSection";
// import AboutSection from "@/components/sections/home/AboutSection";
import ServicesSection from "@/components/sections/home/ServicesSection";
// import CTASection from "@/components/sections/home/CTASection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'th'
    ? "กลุ่มบริษัท ผดุงศิลป์ | ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร"
    : "Padungsilpa Group | Leading Gas Station Construction & Engineering Services";

  const description = locale === 'th'
    ? "ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร ด้วยประสบการณ์กว่า 50 ปี ในงานก่อสร้างและวิศวกรรม บริการครบวงจรตั้งแต่ออกแบบ ก่อสร้าง จนถึงบำรุงรักษา"
    : "Leading comprehensive gas station business services with over 50 years of experience in construction and engineering. From design and construction to maintenance services.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.padungsilpa.group/${locale}`,
      locale: locale === 'th' ? 'th_TH' : 'en_US',
      images: [
        {
          url: "https://padungsilpa.techtoptierapp.com/images/seo.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: ["https://padungsilpa.techtoptierapp.com/images/seo.jpg"],
    },
    alternates: {
      canonical: `https://www.padungsilpa.group/${locale}`,
      languages: {
        "th": "https://www.padungsilpa.group/th",
        "en": "https://www.padungsilpa.group/en",
      },
    },
  };
}

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <ServicesSection />
      {/* <StatsSection />
      <AboutSection />
      <CTASection /> */}
    </MainLayout>
  );
}
