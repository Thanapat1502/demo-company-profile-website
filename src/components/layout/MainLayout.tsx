"use client";

import { ReactNode } from "react";
import MainNavbar from "./Navbar";
import Footer from "./Footer";
import FloatingContactButton from "../ui/FloatingContactButton";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function MainLayout({
  children,
  className = "",
}: MainLayoutProps) {
  return (
    <div className="min-h-screen relative">
      <main className={`relative ${className}`}>
        <MainNavbar />
        <div className="first-section-container">{children}</div>
      </main>
      <Footer />
      <FloatingContactButton />
    </div>
  );
}
