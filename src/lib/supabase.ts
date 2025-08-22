import { createClient } from "@supabase/supabase-js";

let supabaseInstance: ReturnType<typeof createClient> | null = null;

// Check if we're in demo mode
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

// Client-side supabase instance
export const supabase = (() => {
  if (!supabaseInstance) {
    // In demo mode, use placeholder values to prevent errors
    const supabaseUrl = isDemoMode
      ? "https://demo.supabase.co"
      : process.env.NEXT_PUBLIC_SUPABASE_URL ||
        "https://placeholder.supabase.co";
    const supabaseAnonKey = isDemoMode
      ? "demo-key"
      : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

    // Check if we're on the server side
    const isServer = typeof window === "undefined";

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: !isServer && !isDemoMode,
        persistSession: !isServer && !isDemoMode,
        detectSessionInUrl: !isServer && !isDemoMode,
        storage: isServer || isDemoMode ? undefined : window.localStorage,
      },
      global: {
        headers: {
          "X-Client-Info": isServer ? "supabase-js-server" : "supabase-js-web",
          "X-Demo-Mode": isDemoMode ? "true" : "false",
        },
      },
    });
  }
  return supabaseInstance;
})();

// For server-side operations that require elevated permissions
export const createServerClient = () => {
  // In demo mode, use placeholder values
  const supabaseUrl = isDemoMode
    ? "https://demo.supabase.co"
    : process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const serviceRoleKey = isDemoMode
    ? "demo-service-key"
    : process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key";

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        "X-Demo-Mode": isDemoMode ? "true" : "false",
      },
    },
  });
};
