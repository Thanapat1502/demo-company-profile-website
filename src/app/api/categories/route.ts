import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET - Fetch all categories
export async function GET() {
  try {
    console.log("____________________________________________");
    console.log("GET /api/categories - Fetching categories");

    const { data, error } = await supabase
      .from("news_categories")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(">>>Error fetching categories:", error);
      return NextResponse.json(
        { error: "Failed to fetch categories", details: error },
        { status: 500 }
      );
    }

    console.log("Categories fetched successfully:", data?.length);
    console.log("DATA:", data);
    return NextResponse.json({ data, error: null });
  } catch (err) {
    console.error("Catch error in GET categories:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}

// POST - Create new category
export async function POST(req: Request) {
  try {
    console.log("POST /api/categories - Creating category");

    const body = await req.json();
    const { cat_th, cat_en, description_th, description_en } = body;

    if (!cat_th || !cat_en) {
      return NextResponse.json(
        { error: "Category names in both languages are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("news_categories")
      .insert([
        {
          cat_th,
          cat_en,
          description_th,
          description_en,
        },
      ])
      .select();

    if (error) {
      console.error("Error creating category:", error);
      return NextResponse.json(
        { error: "Failed to create category", details: error },
        { status: 500 }
      );
    }

    console.log("Category created successfully:", data);
    return NextResponse.json({ data, error: null });
  } catch (err) {
    console.error("Catch error in POST categories:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}

// PUT - Update category
export async function PUT(req: Request) {
  try {
    console.log("PUT /api/categories - Updating category");

    const body = await req.json();
    const { id, cat_th, cat_en, description_th, description_en } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    if (!cat_th || !cat_en) {
      return NextResponse.json(
        { error: "Category names in both languages are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("news_categories")
      .update({
        cat_th,
        cat_en,
        description_th,
        description_en,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating category:", error);
      return NextResponse.json(
        { error: "Failed to update category", details: error },
        { status: 500 }
      );
    }

    console.log("Category updated successfully:", data);
    return NextResponse.json({ data, error: null });
  } catch (err) {
    console.error("Catch error in PUT categories:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}

// DELETE - Delete category
export async function DELETE(req: Request) {
  try {
    console.log("DELETE /api/categories - Deleting category");

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("news_categories")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error deleting category:", error);
      return NextResponse.json(
        { error: "Failed to delete category", details: error },
        { status: 500 }
      );
    }

    console.log("Category deleted successfully:", data);
    return NextResponse.json({ data, error: null });
  } catch (err) {
    console.error("Catch error in DELETE categories:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err },
      { status: 500 }
    );
  }
}
