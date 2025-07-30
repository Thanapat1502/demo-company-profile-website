import { supabase } from "@/lib/supabase";

export const authDebug = {
  // Check current authentication status
  async checkAuthStatus() {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      console.log("🔍 Auth Debug Info:");
      console.log("Session:", session);
      console.log("User:", user);
      console.log("Session Error:", sessionError);
      console.log("User Error:", userError);
      
      // Check cookies
      if (typeof window !== 'undefined') {
        const cookies = document.cookie;
        console.log("Cookies:", cookies);
        
        // Look for Supabase cookies specifically
        const supabaseCookies = cookies.split(';').filter(cookie => 
          cookie.trim().startsWith('sb-')
        );
        console.log("Supabase Cookies:", supabaseCookies);
      }
      
      return {
        isAuthenticated: !!user && !!session,
        user,
        session,
        sessionError,
        userError
      };
    } catch (error) {
      console.error("Auth debug error:", error);
      return {
        isAuthenticated: false,
        user: null,
        session: null,
        sessionError: error,
        userError: error
      };
    }
  },

  // Test API call with current auth
  async testApiCall() {
    try {
      console.log("🧪 Testing API call...");
      
      const response = await fetch("/api/products", {
        credentials: "include",
      });
      
      console.log("API Response Status:", response.status);
      console.log("API Response Headers:", Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorData = await response.json();
        console.log("API Error Data:", errorData);
        return { success: false, error: errorData };
      }
      
      const data = await response.json();
      console.log("API Success Data:", data);
      return { success: true, data };
    } catch (error) {
      console.error("API test error:", error);
      return { success: false, error };
    }
  },

  // Full debug report
  async fullDebugReport() {
    console.log("🚀 Starting Full Auth Debug Report...");
    
    const authStatus = await this.checkAuthStatus();
    const apiTest = await this.testApiCall();
    
    const report = {
      timestamp: new Date().toISOString(),
      authStatus,
      apiTest,
      environment: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      }
    };
    
    console.log("📊 Full Debug Report:", report);
    return report;
  }
};

// Helper to run debug in browser console
if (typeof window !== 'undefined') {
  (window as any).authDebug = authDebug;
}
