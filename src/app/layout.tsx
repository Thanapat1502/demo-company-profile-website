import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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
    default: "Padungsilpa Group | ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร",
    template: "%s | Padungsilpa Group",
  },
  description:
    "Leading comprehensive gas station business services with over 50 years of experience in construction and engineering. ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร ด้วยประสบการณ์กว่า 50 ปี",
  keywords: [
    "Gas Station Construction",
    "Petroleum Engineering",
    "Fuel Station Design",
    "Thailand Construction",
    "Padungsilpa Group",
    "Oil Station Services",
    "Industrial Construction",
    "Engineering Consulting",
    "สถานีบริการน้ำมัน",
    "ก่อสร้างสถานีน้ำมัน",
    "วิศวกรรมปิโตรเลียม",
    "ผดุงศิลป์กรุ๊ป",
    "บริการก่อสร้าง",
    "วิศวกรรมอุตสาหกรรม",
  ],
  authors: [{ name: "Padungsilpa Group" }],
  creator: "Padungsilpa Group",
  publisher: "Padungsilpa Group",
  metadataBase: new URL("https://www.padungsilpa.group"),
  alternates: {
    canonical: "https://www.padungsilpa.group",
    languages: {
      "th": "https://www.padungsilpa.group/th",
      "en": "https://www.padungsilpa.group/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    alternateLocale: ["en_US"],
    url: "https://www.padungsilpa.group",
    title: "Padungsilpa Group | ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร",
    description:
      "Leading comprehensive gas station business services with over 50 years of experience in construction and engineering. ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร ด้วยประสบการณ์กว่า 50 ปี",
    siteName: "Padungsilpa Group",
    images: [
      {
        url: "https://padungsilpa.techtoptierapp.com/images/seo.jpg",
        width: 1200,
        height: 630,
        alt: "Padungsilpa Group - Leading Gas Station Construction & Engineering Services",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@padungsilpagroup",
    creator: "@padungsilpagroup",
    title: "Padungsilpa Group | ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร",
    description:
      "Leading comprehensive gas station business services with over 50 years of experience in construction and engineering.",
    images: ["https://padungsilpa.techtoptierapp.com/images/seo.jpg"],
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansThai.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
