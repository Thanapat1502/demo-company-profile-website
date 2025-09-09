import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { brandName } from "@/lib/static-data/company-info";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: `${brandName.th} - ผู้นำด้านการพัฒนาและจำหน่ายอุปกรณ์สถานีบริการน้ำมัน`,
    template: `%s | ${brandName.en}`,
  },
  description:
    "ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร และ PERMATANK® ด้วยประสบการณ์กว่า 50 ปี Leading comprehensive gas station business services with over 50 years of experience in construction and engineering.",
  keywords: [
    "PERMATANK",
    "PERMATANK®",
    "ถังน้ำมัน",
    "ทำปั้ม",
    "ปั้มน้ำมัน",
    "Gas Station Construction",
    "Petroleum Engineering",
    "Fuel Station Design",
    "Thailand Construction",
    "OIL DEVELOPMENT",
    "Oil Station Services",
    "Industrial Construction",
    "Engineering Consulting",
    "สถานีบริการน้ำมัน",
    "ก่อสร้างสถานีน้ำมัน",
    "วิศวกรรมปิโตรเลียม",
    "OIL DEVELOPMENTกรุ๊ป",
    "บริการก่อสร้าง",
    "วิศวกรรมอุตสาหกรรม",
  ],
  authors: [{ name: brandName.en }],
  creator: brandName.en,
  publisher: brandName.en,
  metadataBase: new URL("https://www.oildevelopment.com"),
  alternates: {
    canonical: "https://www.oildevelopment.com",
    languages: {
      th: "https://www.oildevelopment.com/th",
      en: "https://www.oildevelopment.com/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    alternateLocale: ["en_US"],
    url: "https://www.padungsilpa.group",
    title:
      "กลุ่มบริษัท OIL DEVELOPMENT - ผู้เชี่ยวชาญด้าน PERMATANK® และสถานีบริการน้ำมันครบวงจร",
    description:
      "ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร และ PERMATANK® ด้วยประสบการณ์กว่า 50 ปี Leading comprehensive gas station business services with over 50 years of experience in construction and engineering.",
    siteName: "OIL DEVELOPMENT",
    images: [
      {
        url: "https://padungsilpa.group/images/seo.jpg",
        width: 1200,
        height: 630,
        alt: "OIL DEVELOPMENT - Leading Gas Station Construction & Engineering Services",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@padungsilpagroup",
    creator: "@padungsilpagroup",
    title: "OIL DEVELOPMENT - PERMATANK® and Gas Station construction",
    description:
      "Leading comprehensive gas station business services and PERMATANK® with over 50 years of experience in construction and engineering.",
    images: ["https://padungsilpa.group/images/seo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Business",
  classification: "Construction & Engineering Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansThai.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
