import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Page types for content
export type ContentPage =
  | "HOME"
  | "ABOUT"
  | "HISTORY_1"
  | "HISTORY_2"
  | "VISION_1"
  | "VISION_2"
  | "SERVICE_1"
  | "SERVICE_2"
  | "SERVICE_3"
  | "SERVICE_4";

// Helper to upload content image directly to Supabase Storage and return public URL

// GET - Fetch content by page and type (No auth required)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") as ContentPage;

    if (!id) {
      return NextResponse.json(
        { error: "Page parameter is required" },
        { status: 400 }
      );
    }

    // Validate page
    const validPages: ContentPage[] = [
      "HOME",
      "ABOUT",
      "HISTORY_1",
      "HISTORY_2",
      "VISION_1",
      "VISION_2",
      "SERVICE_1",
      "SERVICE_2",
      "SERVICE_3",
      "SERVICE_4",
    ];

    if (!validPages.includes(id)) {
      return NextResponse.json(
        { error: "Invalid page parameter" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("contents")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("❌ Contents query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [] });
  } catch (err) {
    console.error("GET contents error:", err);
    return NextResponse.json(
      { error: "Failed to fetch contents", details: err },
      { status: 500 }
    );
  }
}
