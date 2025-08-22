"use client";

import { createBrowserClient } from "@supabase/ssr";

// Check if we're in demo mode
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export function createClient() {
  // In demo mode, use placeholder values to prevent errors
  const supabaseUrl = isDemoMode
    ? "https://demo.supabase.co"
    : process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = isDemoMode
    ? "demo-key"
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createClient();
