import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { withAuth, createAuthenticatedClient } from "@/lib/auth-middleware";

// Helper to upload images using authenticated Supabase client
async function uploadImage(file: File, newsId: string): Promise<string> {
  try {
    // Create authenticated client to pass RLS
    const supabaseAuth = await createAuthenticatedClient();

    // Generate a unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `news_${newsId}_${Date.now()}.${fileExt}`;
    const filePath = `public/news_store/${fileName}`;

    // Upload to Supabase Storage with authenticated client
    const { error } = await supabaseAuth.storage
      .from("images")
      .upload(filePath, file, {
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      console.error("Storage upload error:", error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabaseAuth.storage
      .from("images")
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
}

export const POST = withAuth(async (req: NextRequest, supabaseAuth, user) => {
  try {
    const formData = await req.formData();
    const id = uuidv4();
    const title_th = formData.get("title_th") as string;
    const title_en = formData.get("title_en") as string;
    const excerpt_th = formData.get("excerpt_th") as string;
    const excerpt_en = formData.get("excerpt_en") as string;
    // Get category and highlight status
    const category_id = formData.get("category_id") as string;
    const is_highlighted = formData.get("is_highlighted") === "true";
    const status =
      formData.get("status") === "published" ? "published" : "draft";

    // Parse JSON fields with error handling
    let tag, body_th, body_en;
    try {
      tag = JSON.parse(formData.get("tag") as string); // number[]
      body_th = JSON.parse(formData.get("body_th") as string); // Quill JSON
      body_en = JSON.parse(formData.get("body_en") as string); // Quill JSON
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON data in request" },
        { status: 400 }
      );
    }

    let thumbnailUrl = "";

    // Handle thumbnail upload
    const thumbnail = formData.get("thumbnail");
    if (thumbnail && typeof thumbnail === "object") {
      try {
        thumbnailUrl = await uploadImage(thumbnail as File, id);
      } catch {
        return NextResponse.json(
          { error: "Thumbnail upload failed" },
          { status: 500 }
        );
      }
    }

    // Handle images in body editors (extract, upload, replace URLs)
    async function processQuillImages(quillBody: {
      ops?: Array<{ insert?: { image?: string } }>;
    }) {
      if (!quillBody || !quillBody.ops) return quillBody;

      const ops = await Promise.all(
        quillBody.ops.map(async (op: { insert?: { image?: string } }) => {
          if (
            op.insert &&
            op.insert.image &&
            op.insert.image.startsWith("data:")
          ) {
            // It's a base64 image, upload it
            const base64 = op.insert.image;
            // Convert base64 to File
            const res = await fetch(base64);
            const blob = await res.blob();
            const file = new File([blob], `bodyimg-${Date.now()}.png`, {
              type: blob.type,
            });
            try {
              const url = await uploadImage(file, id);
              return { ...op, insert: { image: url } };
            } catch {
              return op;
            }
          }
          return op;
        })
      );
      return { ...quillBody, ops };
    }

    const processedBodyTh = await processQuillImages(body_th);
    const processedBodyEn = await processQuillImages(body_en);
    try {
      // Prepare timestamp fields
      const now = new Date().toISOString();
      const publishAt = status === "published" ? now : null;

      // Use authenticated client for database operations
      const { data, error } = await supabaseAuth
        .from("news")
        .insert([
          {
            id,
            thumbnail: thumbnailUrl,
            title_th,
            title_en,
            excerpt_th,
            excerpt_en,
            tag_id: tag,
            body_th: processedBodyTh,
            body_en: processedBodyEn,
            cat_id: category_id || null,
            is_highlighted,
            status,
            created_at: now,
            updated_at: now,
            publish_at: publishAt,
          },
        ])
        .select();
      return NextResponse.json({ data, error });
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to create news article", details: err },
        { status: 500 }
      );
    }
  } catch (outerError) {
    console.error("Outer catch error:", outerError);
    return NextResponse.json(
      { error: "Internal server error", details: outerError },
      { status: 500 }
    );
  }
});

export const PUT = withAuth(async (req: NextRequest, supabaseAuth, user) => {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const title_th = formData.get("title_th") as string;
    const title_en = formData.get("title_en") as string;
    const excerpt_th = formData.get("excerpt_th") as string;
    const excerpt_en = formData.get("excerpt_en") as string;
    // Get category and highlight status
    const category_id = formData.get("category_id") as string;
    const is_highlighted = formData.get("is_highlighted") === "true";
    const status =
      formData.get("status") === "published" ? "published" : "draft";

    // Parse tags and body content
    const tag = JSON.parse(formData.get("tag") as string); // number[]
    const body_th = JSON.parse(formData.get("body_th") as string); // Quill JSON
    const body_en = JSON.parse(formData.get("body_en") as string); // Quill JSON
    let thumbnailUrl = formData.get("thumbnailUrl") as string;

    // Handle thumbnail upload
    const thumbnail = formData.get("thumbnail");
    if (thumbnail && typeof thumbnail === "object") {
      try {
        thumbnailUrl = await uploadImage(thumbnail as File, id);
      } catch {
        return NextResponse.json(
          { error: "Thumbnail upload failed" },
          { status: 500 }
        );
      }
    }

    // Handle images in body editors (extract, upload, replace URLs)
    async function processQuillImages(quillBody: {
      ops?: Array<{ insert?: { image?: string } }>;
    }) {
      if (!quillBody || !quillBody.ops) return quillBody;
      const ops = await Promise.all(
        quillBody.ops.map(async (op: { insert?: { image?: string } }) => {
          if (
            op.insert &&
            op.insert.image &&
            op.insert.image.startsWith("data:")
          ) {
            const base64 = op.insert.image;
            const res = await fetch(base64);
            const blob = await res.blob();
            const file = new File([blob], `bodyimg-${Date.now()}.png`, {
              type: blob.type,
            });
            try {
              const url = await uploadImage(file, id);
              return { ...op, insert: { image: url } };
            } catch {
              return op;
            }
          }
          return op;
        })
      );
      return { ...quillBody, ops };
    }

    const processedBodyTh = await processQuillImages(body_th);
    const processedBodyEn = await processQuillImages(body_en);

    // Get current article to check status change
    const { data: currentArticle } = await supabaseAuth
      .from("news")
      .select("status, publish_at")
      .eq("id", id)
      .single();

    // Prepare timestamp fields
    const now = new Date().toISOString();
    const updateData: Record<string, unknown> = {
      thumbnail: thumbnailUrl,
      title_th,
      title_en,
      excerpt_th,
      excerpt_en,
      body_th: processedBodyTh,
      body_en: processedBodyEn,
      tag_id: tag,
      cat_id: category_id || null,
      is_highlighted,
      status,
      updated_at: now,
    };

    // If status is changing from draft to published, set publish_at
    if (
      currentArticle &&
      currentArticle.status === "draft" &&
      status === "published"
    ) {
      updateData.publish_at = now;
    }

    // Use authenticated client for database operations
    const { data, error } = await supabaseAuth
      .from("news")
      .update(updateData)
      .eq("id", id)
      .select();
    return NextResponse.json({ data, error });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update news article", details: err },
      { status: 500 }
    );
  }
});

export const DELETE = withAuth(async (req: NextRequest, supabaseAuth, user) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const { data, error } = await supabaseAuth
      .from("news")
      .delete()
      .eq("id", id);
    return NextResponse.json({ data, error });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete news article", details: err },
      { status: 500 }
    );
  }
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    // Get news by id
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("id", id)
      .single();
    return NextResponse.json({ data, error });
  } else {
    // Get all news
    const { data, error } = await supabase.from("news").select("*");
    return NextResponse.json({ data, error });
  }
}
