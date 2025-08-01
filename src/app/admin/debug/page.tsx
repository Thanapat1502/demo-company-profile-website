"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase-client";

// Force dynamic rendering to prevent SSG issues
export const dynamic = "force-dynamic";

export default function AdminDebugPage() {
  const { user, session, isAuthenticated } = useAuth();
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runDatabaseTest = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/test-db", {
        credentials: "include",
      });
      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  const testProductsAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        credentials: "include",
      });
      const result = await response.json();
      setTestResult({
        apiTest: true,
        status: response.status,
        data: result,
      });
    } catch (error) {
      setTestResult({
        apiTest: true,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  const inspectCookies = async () => {
    if (typeof window === "undefined") return;

    const allCookies = document.cookie.split(";").map((cookie) => {
      const [name, ...valueParts] = cookie.trim().split("=");
      return { name, value: valueParts.join("=") };
    });

    const supabaseCookies = allCookies.filter(
      (c) => c.name.includes("supabase") || c.name.startsWith("sb-")
    );

    // Also check Supabase session directly
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    setTestResult({
      cookieInspection: true,
      allCookies: allCookies.map((c) => ({
        name: c.name,
        hasValue: !!c.value,
      })),
      supabaseCookies: supabaseCookies.map((c) => ({
        name: c.name,
        valueLength: c.value?.length || 0,
        valuePreview: c.value?.substring(0, 50) + "...",
      })),
      localStorage:
        typeof window !== "undefined"
          ? Object.keys(localStorage)
              .filter((key) => key.includes("supabase"))
              .map((key) => ({
                key,
                valueLength: localStorage.getItem(key)?.length || 0,
              }))
          : [],
      supabaseSession: {
        hasSession: !!session,
        hasUser: !!user,
        sessionError: error?.message || null,
        userError: userError?.message || null,
        accessToken: session?.access_token ? "present" : "missing",
        refreshToken: session?.refresh_token ? "present" : "missing",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Debug Panel
        </h1>

        {/* Authentication Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Authenticated:</p>
              <p
                className={`font-semibold ${
                  isAuthenticated ? "text-green-600" : "text-red-600"
                }`}>
                {isAuthenticated ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">User Email:</p>
              <p className="font-semibold">{user?.email || "None"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Session:</p>
              <p
                className={`font-semibold ${
                  session ? "text-green-600" : "text-red-600"
                }`}>
                {session ? "Active" : "None"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">User ID:</p>
              <p className="font-mono text-xs">{user?.id || "None"}</p>
            </div>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Database Tests</h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={runDatabaseTest}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {loading ? "Testing..." : "Test Database Connection"}
            </button>
            <button
              onClick={testProductsAPI}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
              {loading ? "Testing..." : "Test Products API"}
            </button>
            <button
              onClick={inspectCookies}
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50">
              Inspect Cookies & Storage
            </button>
          </div>
        </div>

        {/* Test Results */}
        {testResult && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        )}

        {/* Browser Info */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Browser Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Cookies:</p>
              <p className="font-mono text-xs break-all">
                {typeof window !== "undefined"
                  ? document.cookie || "None"
                  : "Loading..."}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Local Storage:</p>
              <p className="font-mono text-xs">
                {typeof window !== "undefined"
                  ? Object.keys(localStorage)
                      .filter((key) => key.includes("supabase"))
                      .join(", ") || "None"
                  : "Loading..."}
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">
            Troubleshooting Steps
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-yellow-700">
            <li>Check if you're authenticated (should show "Yes" above)</li>
            <li>Run "Test Database Connection" to check table existence</li>
            <li>Run "Test Products API" to check API authentication</li>
            <li>If tests fail, check the browser console for detailed logs</li>
            <li>
              If products table doesn't exist, run the SQL script in Supabase
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
