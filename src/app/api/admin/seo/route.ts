import { NextRequest, NextResponse } from "next/server";
import { createServerClient, supabase } from "@/lib/supabase";
import { withAuth } from "@/lib/auth-middleware";

export interface SEOPage {
  id?: string;
  page_path: string;
  locale: string;

  // Basic SEO fields
  title?: string;
  description?: string;
  keywords?: string;

  // Open Graph fields
  og_title?: string;
  og_description?: string;
  og_image?: string;
  og_type?: string;

  // Twitter Card fields
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;

  // Additional SEO fields
  canonical_url?: string;
  robots?: string;
  author?: string;

  // Schema.org structured data
  structured_data?: Record<string, unknown> | string;

  // Meta fields
  is_active?: boolean;
  priority?: number;
  change_frequency?: string;

  // Timestamps
  created_at?: string;
  updated_at?: string;
}

// GET - Fetch all SEO pages or specific page
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page_path = searchParams.get("page_path");
    const locale = searchParams.get("locale");

    let query = supabase
      .from("seo_pages")
      .select("*")
      .order("page_path", { ascending: true });

    if (page_path) {
      query = query.eq("page_path", page_path);
    }

    if (locale) {
      query = query.eq("locale", locale);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching SEO pages:", error);
      return NextResponse.json(
        { error: "Failed to fetch SEO pages" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new SEO page
export const POST = withAuth(async (request: NextRequest) => {
  try {
    const body: SEOPage = await request.json();

    // Validate required fields
    if (!body.page_path || !body.locale) {
      return NextResponse.json(
        { error: "page_path and locale are required" },
        { status: 400 }
      );
    }

    const { data, error } = await createServerClient()
      .from("seo_pages")
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error("Error creating SEO page:", error);
      return NextResponse.json(
        { error: "Failed to create SEO page" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});

// PUT - Update SEO page
export const PUT = withAuth(async (request: NextRequest) => {
  try {
    const body: SEOPage & { id: string } = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "ID is required for update" },
        { status: 400 }
      );
    }

    const { data, error } = await createServerClient()
      .from("seo_pages")
      .update(body)
      .eq("id", body.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating SEO page:", error);
      return NextResponse.json(
        { error: "Failed to update SEO page" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});

// DELETE - Delete SEO page
export const DELETE = withAuth(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await createServerClient()
      .from("seo_pages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting SEO page:", error);
      return NextResponse.json(
        { error: "Failed to delete SEO page" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "SEO page deleted successfully" });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});
