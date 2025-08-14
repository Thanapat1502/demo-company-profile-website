"use client";

import { Share2 } from "lucide-react";

interface ClientShareButtonProps {
  title: string;
  excerpt: string;
  locale: string;
}

export default function ClientShareButton({ title, excerpt, locale }: ClientShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert(locale === "th" ? "คัดลอกลิงก์แล้ว" : "Link copied to clipboard");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-6 py-3 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/20 transition-colors rounded-lg">
      <Share2 className="w-4 h-4" />
      {locale === "th" ? "แชร์" : "Share"}
    </button>
  );
}
