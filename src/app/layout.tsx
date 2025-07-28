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
    "Leading comprehensive gas station business services with over 20 years of experience in construction and engineering. ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร ด้วยประสบการณ์กว่า 20 ปี",
  keywords: [
    "Gas Station",
    "Construction",
    "Engineering",
    "Thailand",
    "Padungsilpa",
    "สถานีบริการน้ำมัน",
    "ก่อสร้าง",
    "วิศวกรรม",
  ],
  authors: [{ name: "Padungsilpa Group" }],
  creator: "Padungsilpa Group",
  metadataBase: new URL("https://www.padungsilpa.group"),
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://www.padungsilpa.group",
    title: "Padungsilpa Group | ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร",
    description:
      "Leading comprehensive gas station business services with over 20 years of experience in construction and engineering.",
    siteName: "Padungsilpa Group",
  },
  twitter: {
    card: "summary_large_image",
    title: "Padungsilpa Group | ผู้นำด้านธุรกิจสถานีบริการน้ำมันครบวงจร",
    description:
      "Leading comprehensive gas station business services with over 20 years of experience in construction and engineering.",
    creator: "@padungsilpagroup",
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
