"use client";

import { ReactNode } from "react";
import MainNavbar from "./Navbar";
import Footer from "./Footer";
import FloatingContactButton from "../ui/FloatingContactButton";
import { ScrollBehavior } from "./ScrollBehavior";

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
      <ScrollBehavior />
      <main className={`relative ${className}`}>
        <MainNavbar />
        <div className="first-section-container">{children}</div>
      </main>
      <Footer />
      <FloatingContactButton />
    </div>
  );
}
