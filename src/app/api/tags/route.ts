import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET - Fetch all tags
export async function GET() {
  try {
    console.log("GET /api/tags - Fetching tags");

    const { data, error } = await supabase
      .from("news_tag")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching tags:", error);
      return NextResponse.json(
        { error: "Failed to fetch tags", details: error },
        { status: 500 }
      );
    }

    console.log("Tags fetched successfully:", data?.length);
    return NextResponse.json({ data, error: null });
  } catch (err) {
    console.error("Catch error in GET tags:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}

// POST - Create new tag
export async function POST(req: Request) {
  try {
    console.log("POST /api/tags - Creating tag");

    const body = await req.json();
    const { tag_th, tag_en } = body;

    if (!tag_th || !tag_en || !tag_th.trim() || !tag_en.trim()) {
      return NextResponse.json(
        { error: "Tag names in both languages are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("news_tag")
      .insert([
        {
          tag_th: tag_th.trim(),
          tag_en: tag_en.trim(),
        },
      ])
      .select();

    if (error) {
      console.error("Error creating tag:", error);
      return NextResponse.json(
        { error: "Failed to create tag", details: error },
        { status: 500 }
      );
    }

    console.log("Tag created successfully:", data);
    return NextResponse.json({ data, error: null });
  } catch (err) {
    console.error("Catch error in POST tags:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}

// PUT - Update tag
export async function PUT(req: Request) {
  try {
    console.log("PUT /api/tags - Updating tag");

    const body = await req.json();
    const { id, tag_th, tag_en } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Tag ID is required" },
        { status: 400 }
      );
    }

    if (!tag_th || !tag_en || !tag_th.trim() || !tag_en.trim()) {
      return NextResponse.json(
        { error: "Tag names in both languages are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("news_tag")
      .update({
        tag_th: tag_th.trim(),
        tag_en: tag_en.trim(),
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating tag:", error);
      return NextResponse.json(
        { error: "Failed to update tag", details: error },
        { status: 500 }
      );
    }

    console.log("Tag updated successfully:", data);
    return NextResponse.json({ data, error: null });
  } catch (err) {
    console.error("Catch error in PUT tags:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}

// DELETE - Delete tag
export async function DELETE(req: Request) {
  try {
    console.log("DELETE /api/tags - Deleting tag");

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Tag ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("news_tag")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error deleting tag:", error);
      return NextResponse.json(
        { error: "Failed to delete tag", details: error },
        { status: 500 }
      );
    }

    console.log("Tag deleted successfully:", data);
    return NextResponse.json({ data, error: null });
  } catch (err) {
    console.error("Catch error in DELETE tags:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}
