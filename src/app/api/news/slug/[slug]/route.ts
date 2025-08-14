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

    console.log(`📰 Fetching news detail for slug: ${slug} (locale: ${locale})`);

    // Determine which slug column to search based on locale
    const slugColumn = locale === "en" ? "slug_en" : "slug_th";

    const { data, error } = await supabase
      .from("news")
      .select(`
        *,
        news_categories!inner(
          id,
          cat_th,
          cat_en
        )
      `)
      .eq(slugColumn, slug)
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

    console.log(`✅ News article found: ${data.title_th || data.title_en}`);

    return NextResponse.json({ 
      data,
      slug: {
        current: slug,
        th: data.slug_th,
        en: data.slug_en
      }
    });

  } catch (error) {
    console.error("❌ Unexpected error in news slug API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
