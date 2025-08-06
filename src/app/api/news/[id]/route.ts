import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "News ID or slug is required" },
        { status: 400 }
      );
    }

    console.log(`📰 Fetching news detail for: ${id}`);

    // Check if the parameter is a UUID (ID) or a slug
    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        id
      );

    let query = supabase.from("news").select(`
        *
      `);

    if (isUUID) {
      // Search by ID
      query = query.eq("id", id);
    } else {
      // Search by slug-like string (search in titles for now)
      query = query.or(`title_th.ilike.%${id}%,title_en.ilike.%${id}%`);
    }

    // Only get published news
    query = query.eq("status", "published");

    const { data, error } = await query.single();

    if (error) {
      console.error("❌ Error fetching news detail:", error);
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "News article not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "Failed to fetch news detail" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "News article not found" },
        { status: 404 }
      );
    }

    console.log(`✅ News detail fetched successfully:`, {
      id: data.id,
      title_th: data.title_th,
      title_en: data.title_en,
      status: data.status,
    });

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.error("❌ Unexpected error in news detail API:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Failed to fetch news detail";

    return NextResponse.json(
      {
        error: errorMessage,
        success: false,
      },
      { status: 500 }
    );
  }
}
