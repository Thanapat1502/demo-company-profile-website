import { createClient } from "@supabase/supabase-js";

let supabaseInstance: ReturnType<typeof createClient> | null = null;

// Client-side supabase instance
export const supabase = (() => {
  if (!supabaseInstance) {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

    // Check if we're on the server side
    const isServer = typeof window === "undefined";

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: !isServer,
        persistSession: !isServer,
        detectSessionInUrl: !isServer,
        storage: isServer ? undefined : window.localStorage,
      },
      global: {
        headers: {
          "X-Client-Info": isServer ? "supabase-js-server" : "supabase-js-web",
        },
      },
    });
  }
  return supabaseInstance;
})();

// For server-side operations that require elevated permissions
export const createServerClient = () => {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key";

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
