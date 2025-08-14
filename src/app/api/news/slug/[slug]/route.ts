import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "th";

    if (!slug) {
      return NextResponse.json(
        { error: "News slug is required" },
        { status: 400 }
      );
    }

    // Decode the slug to handle Thai characters properly
    const decodedSlug = decodeURIComponent(slug);
    console.log(
      `📰 Fetching news detail for slug: ${slug} -> ${decodedSlug} (locale: ${locale})`
    );

    // Determine which slug column to search based on locale
    const slugColumn = locale === "en" ? "slug_en" : "slug_th";

    const { data, error } = await supabase
      .from("news")
      .select(
        `
        *,
        news_categories!inner(
          id,
          cat_th,
          cat_en
        )
      `
      )
      .eq(slugColumn, decodedSlug)
      .eq("status", "published")
      .single();

    if (error) {
      console.error("❌ Error fetching news by slug:", error);

      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "News article not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: "Failed to fetch news article" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "News article not found" },
        { status: 404 }
      );
    }

    // Fetch category data if cat_id exists
    let category = null;
    if (data.cat_id) {
      const { data: categoryData } = await supabase
        .from("news_categories")
        .select("id, cat_th, cat_en")
        .eq("id", data.cat_id)
        .single();
      category = categoryData;
    }

    console.log(`✅ News article found: ${data.title_th || data.title_en}`);

    const response = NextResponse.json({
      data,
      category,
      slug: {
        current: slug,
        th: data.slug_th,
        en: data.slug_en,
      },
    });

    // Disable caching for API routes
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("❌ Unexpected error in news slug API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
