import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/references/[id] - Fetch a single reference by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: { message: "Reference ID is required" } },
        { status: 400 }
      );
    }

    // Fetch reference from Supabase
    const { data, error } = await supabase
      .from("references")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: { message: "Failed to fetch reference" } },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: { message: "Reference not found" } },
        { status: 404 }
      );
    }

    // Transform the data to match our interface
    const transformedData = {
      id: data.id,
      name_th: data.name_th || "",
      name_en: data.name_en || "",
      type_th: data.type_th || "",
      type_en: data.type_en || "",
      location_th: data.location_th || "",
      location_en: data.location_en || "",
      open_at: data.open_at || data.opened_at || "", // Handle both field names
      galleries: data.galleries || [],
      thumbnail: data.thumbnail || "",
    };

    return NextResponse.json({
      data: transformedData,
      error: null,
    });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
