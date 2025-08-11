"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import SEOManager from "@/components/admin/SEOManager";
import { Toaster } from "react-hot-toast";

export default function SEOAdminPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SEOManager />
        </div>
        <Toaster position="top-right" />
      </div>
    </ProtectedRoute>
  );
}
