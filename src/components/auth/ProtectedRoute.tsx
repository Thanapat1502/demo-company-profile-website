"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // Check if we're in demo mode
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  useEffect(() => {
    if (!loading) {
      // In demo mode, bypass authentication check
      if (isDemoMode) {
        setIsChecking(false);
      } else if (!isAuthenticated) {
        router.push("/admin/login");
      } else {
        setIsChecking(false);
      }
    }
  }, [isAuthenticated, loading, router, isDemoMode]);

  // Show loading spinner while checking authentication (skip in demo mode)
  if (!isDemoMode && (loading || isChecking)) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking authentication...</p>
          </div>
        </div>
      )
    );
  }

  // Show children if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // This shouldn't be reached due to the redirect, but just in case
  return null;
}
