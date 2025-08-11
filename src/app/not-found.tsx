"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GlobalNotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Thai 404 page to maintain locale structure
    // router.replace('/th');
  }, [router]);

  // Show minimal loading state while redirecting
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-black text-[#112Ef4] mb-4">404</div>
        <p className="text-gray-600">Page not found</p>
      </div>
    </div>
  );
}