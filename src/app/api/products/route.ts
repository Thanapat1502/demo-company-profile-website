import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const table = "products";

// Create authenticated Supabase client
async function createAuthenticatedClient() {
  const cookieStore = await cookies();

  // Debug: Log all cookies
  const allCookies = cookieStore.getAll();
  console.log(
    "All cookies received:",
    allCookies.map((c) => ({ name: c.name, hasValue: !!c.value }))
  );

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

// Verify user is authenticated
async function verifyAuth(supabase: ReturnType<typeof createServerClient>) {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    console.log("Auth verification - User:", user?.email || "none");
    console.log("Auth verification - Error:", error?.message || "none");

    if (error || !user) {
      return null;
    }
    return user;
  } catch (err) {
    console.log("Auth verification - Exception:", err);
    return null;
  }
}

// GET /api/products
export async function GET() {
  try {
    const supabase = await createAuthenticatedClient();
    const user = await verifyAuth(supabase);

    if (!user) {
      console.log("GET /api/products - No user found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("GET /api/products - User authenticated:", user.email);
    const { data, error } = await supabase.from(table).select("*");
    if (error) {
      console.log("GET /api/products - Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.log("GET /api/products - Success, found", data?.length, "products");
    return NextResponse.json({ products: data }, { status: 200 });
  } catch (error) {
    console.log("GET /api/products - Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(req: NextRequest) {
  try {
    const supabase = await createAuthenticatedClient();
    const user = await verifyAuth(supabase);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("Body:", body);
    const status = body.status === "available" ? true : false;
    const product = {
      image_url: body.image_url || "",
      name_th: body.name_th || "",
      name_en: body.name_en || "",
      description_th: body.description_th || "",
      description_en: body.description_en || "",
      is_available: status || false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from(table).insert([product]);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
