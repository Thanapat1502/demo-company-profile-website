import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Create authenticated Supabase client
async function createAuthenticatedClient() {
  const cookieStore = await cookies();

  // Debug: Get all cookies and log them
  const allCookies = cookieStore.getAll();
  console.log("=== COOKIE DEBUG ===");
  console.log("Total cookies:", allCookies.length);
  allCookies.forEach((cookie) => {
    console.log(
      `Cookie: ${cookie.name} = ${cookie.value ? "[HAS_VALUE]" : "[EMPTY]"}`
    );
  });

  // Find Supabase specific cookies
  const supabaseCookies = allCookies.filter(
    (c) => c.name.includes("supabase") || c.name.startsWith("sb-")
  );
  console.log("Supabase cookies found:", supabaseCookies.length);
  supabaseCookies.forEach((cookie) => {
    console.log(
      `Supabase Cookie: ${cookie.name} = ${cookie.value.substring(0, 50)}...`
    );
  });

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = cookieStore.getAll();
          console.log("getAll() called, returning", cookies.length, "cookies");
          return cookies;
        },
        setAll(cookiesToSet) {
          console.log("setAll() called with", cookiesToSet.length, "cookies");
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              console.log(`Setting cookie: ${name}`);
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            console.log("Error in setAll:", error);
          }
        },
      },
    }
  );
}

// GET /api/test-db - Test database connection and table existence
export async function GET(req: NextRequest) {
  try {
    console.log("=== Database Test Started ===");

    const supabase = await createAuthenticatedClient();

    // Test 1: Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    console.log("Auth test - User:", user?.email || "none");
    console.log("Auth test - Error:", authError?.message || "none");

    // Test 2: Check if products table exists
    const { data: tableData, error: tableError } = await supabase
      .from("products")
      .select("*")
      .limit(1);

    console.log("Table test - Data:", tableData);
    console.log("Table test - Error:", tableError?.message || "none");

    // Test 3: Check if products_services table exists (alternative)
    const { data: altTableData, error: altTableError } = await supabase
      .from("products_services")
      .select("*")
      .limit(1);

    console.log("Alt table test - Data:", altTableData);
    console.log("Alt table test - Error:", altTableError?.message || "none");

    // Test 4: List all cookies
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    console.log(
      "All cookies:",
      allCookies.map((c) => ({ name: c.name, hasValue: !!c.value }))
    );

    const result = {
      timestamp: new Date().toISOString(),
      auth: {
        user: user?.email || null,
        authenticated: !!user,
        error: authError?.message || null,
      },
      tables: {
        products: {
          exists: !tableError,
          error: tableError?.message || null,
        },
        products_services: {
          exists: !altTableError,
          error: altTableError?.message || null,
        },
      },
      cookies: {
        total: allCookies.length,
        supabaseCookies: allCookies.filter((c) => c.name.startsWith("sb-"))
          .length,
      },
      environment: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "missing",
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
    };

    console.log("=== Database Test Result ===", result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Database test error:", error);
    return NextResponse.json(
      {
        error: "Database test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
