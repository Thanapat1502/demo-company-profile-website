"use client";

import { ReactNode } from "react";
import MainNavbar from "./Navbar";
import Footer from "./Footer";
import FloatingContactButton from "../ui/FloatingContactButton";
import { ScrollBehavior } from "./ScrollBehavior";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  forceSolidNavBar?: boolean;
}

export default function MainLayout({
  children,
  className = "",
  forceSolidNavBar
}: MainLayoutProps) {
  return (
    <div className="min-h-screen relative">
      <ScrollBehavior />
      <main className={`relative ${className}`}>
        <MainNavbar forceSolid={forceSolidNavBar} />
        <div className="first-section-containers">{children}</div>
      </main>
      <Footer />
      <FloatingContactButton />
    </div>
  );
}
