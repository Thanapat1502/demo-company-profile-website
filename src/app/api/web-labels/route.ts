import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { withAuth } from "@/lib/auth-middleware";
export async function GET() {
  try {
    // Fetch web labels ordered by id for consistent ordering
    const { data, error } = await supabase
      .from("web_labels")
      .select("*")
      .order("id", { ascending: true });

    console.log("Fetch label:", data);
    return NextResponse.json({ data, error });
  } catch (error) {
    console.log(`Failed to fetch labels: ${error}`);
    return NextResponse.json(
      {
        data: null,
        error: `Failed to fetch labels: ${error}`,
      },
      { status: 500 }
    );
  }
}

// PATCH - Update web label (Authenticated route)
export const PATCH = withAuth(async (req: NextRequest, supabase, user) => {
  try {
    const body = await req.json();
    const { id, text } = body;

    console.log(
      "PATCH web-labels - User:",
      user.email,
      "ID:",
      id,
      "Text length:",
      text?.length
    );

    // Validate required fields
    if (!id || text === undefined || text === null) {
      console.error("Validation error: Missing id or text", { id, text });
      return NextResponse.json(
        { error: "Missing id or text" },
        { status: 400 }
      );
    }

    // Validate that the text is a string
    if (typeof text !== "string") {
      return NextResponse.json(
        { error: "Text must be a string" },
        { status: 400 }
      );
    }

    // Update the web label by id
    const { data, error } = await supabase
      .from("web_labels")
      .update({
        value: text.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to update label", details: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Label not found" }, { status: 404 });
    }

    return NextResponse.json({
      data: data[0],
      message: "Label updated successfully",
    });
  } catch (error) {
    console.error("Failed to update label:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
});
