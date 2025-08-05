import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

// Create authenticated Supabase client
async function createAuthenticatedClient() {
  const cookieStore = await cookies();

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

    console.log(
      "Contact API - Auth verification - User:",
      user?.email || "none"
    );
    console.log(
      "Contact API - Auth verification - Error:",
      error?.message || "none"
    );

    if (error || !user) {
      return null;
    }
    return user;
  } catch (err) {
    console.log("Contact API - Auth verification - Exception:", err);
    return null;
  }
}

// GET /api/contact (Public - No auth required)
export async function GET() {
  try {
    console.log("GET /api/contact - Public access");
    const { data, error } = await supabase.from("contact").select("*");
    if (error) {
      console.log("GET /api/contact - Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.log(
      "GET /api/contact - Success, found",
      data?.length,
      "contact records"
    );
    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.log("GET /api/contact - Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createAuthenticatedClient();
    const user = await verifyAuth(supabase);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { data, error } = await supabase
      .from("contact")
      .insert([body])
      .select("*");
    return NextResponse.json({ data, error });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = await createAuthenticatedClient();
    const user = await verifyAuth(supabase);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { ...update } = body;
    const id = process.env.CONTACT_TABLE_ID;
    const { data, error } = await supabase
      .from("contact")
      .update(update)
      .eq("id", id)
      .select("*");
    return NextResponse.json({ data, error });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createAuthenticatedClient();
    const user = await verifyAuth(supabase);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id } = body;
    const { data, error } = await supabase
      .from("contact")
      .delete()
      .eq("id", id)
      .select("*");
    return NextResponse.json({ data, error });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
