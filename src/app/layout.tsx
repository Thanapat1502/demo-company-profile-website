import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: "Next.js + HeroUI App",
    template: "%s | Next.js + HeroUI App",
  },
  description:
    "A modern web application built with Next.js, TypeScript, Tailwind CSS, and HeroUI",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HeroUI"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Next.js + HeroUI App",
    description:
      "A modern web application built with Next.js, TypeScript, Tailwind CSS, and HeroUI",
    siteName: "Next.js + HeroUI App",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js + HeroUI App",
    description:
      "A modern web application built with Next.js, TypeScript, Tailwind CSS, and HeroUI",
    creator: "@yourusername",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
