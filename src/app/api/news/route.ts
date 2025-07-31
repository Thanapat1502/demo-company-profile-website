import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

// Helper to upload images using /api/image-upload
async function uploadImage(file: File, newsId: string, fileName?: string) {
  const formData = new FormData();
  formData.append("file", file);
  // Store in public/news_store/[newsId]/
  formData.append("bucket", `news_store/${newsId}`);
  if (fileName) formData.append("fileName", fileName);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/image-upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  const result = await res.json();
  if (result.url) return result.url;
  throw new Error(result.error || "Image upload failed");
}

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

export async function POST(req: Request) {
  console.log("POST /api/news - Starting request");

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

    // console.log("Parsed data:", { id, title, excerpt, tag, body_th, body_en });

    // Handle thumbnail upload
    const thumbnail = formData.get("thumbnail");
    console.log("Image II");

    if (thumbnail && typeof thumbnail === "object") {
      console.log("Image III");
      try {
        console.log("Image IV");
        thumbnailUrl = await uploadImage(thumbnail as File, id);
      } catch (err) {
        console.log("Image xIV:", err);
        return NextResponse.json(
          { error: "Thumbnail upload failed" },
          { status: 500 }
        );
      }
    }

    // Handle images in body editors (extract, upload, replace URLs)
    // Example: Replace all image srcs in body_th/body_en with uploaded URLs
    async function processQuillImages(quillBody: any) {
      console.log("Quill I");

      if (!quillBody || !quillBody.ops) return quillBody;
      console.log("Quill II");
      const ops = await Promise.all(
        quillBody.ops.map(async (op: any) => {
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
      console.log("Quill III");
      return { ...quillBody, ops };
    }

    const processedBodyTh = await processQuillImages(body_th);
    const processedBodyEn = await processQuillImages(body_en);
    console.log("th data", processedBodyTh);
    console.log("en data", processedBodyEn);
    console.log("Attem to add News");
    try {
      const { data, error } = await supabase
        .from("news")
        .insert([
          {
            id,
            thumbnail: thumbnailUrl,
            title_th,
            title_en,
            excerpt_th,
            excerpt_en,
            body_th: processedBodyTh,
            body_en: processedBodyEn,
            tag,
            category_id: category_id || null,
            is_highlighted,
          },
        ])
        .select();
      console.log("=>Success:", data);
      console.log("=>Error:", error);
      return NextResponse.json({ data, error });
    } catch (err) {
      console.log("Catch Error:", err);
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
}

export async function PUT(req: Request) {
  const formData = await req.formData();
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const tag = JSON.parse(formData.get("tag") as string); // number[]
  const body_th = JSON.parse(formData.get("body_th") as string); // Quill JSON
  const body_en = JSON.parse(formData.get("body_en") as string); // Quill JSON
  let thumbnailUrl = formData.get("thumbnailUrl") as string;

  // Handle thumbnail upload
  const thumbnail = formData.get("thumbnail");
  if (thumbnail && typeof thumbnail === "object") {
    try {
      thumbnailUrl = await uploadImage(thumbnail as File, id);
    } catch (err) {
      return NextResponse.json(
        { error: "Thumbnail upload failed" },
        { status: 500 }
      );
    }
  }

  // Handle images in body editors (extract, upload, replace URLs)
  async function processQuillImages(quillBody: any) {
    if (!quillBody || !quillBody.ops) return quillBody;
    const ops = await Promise.all(
      quillBody.ops.map(async (op: any) => {
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

  const { data, error } = await supabase
    .from("news")
    .update({
      thumbnail: thumbnailUrl,
      title,
      subtitle,
      tag,
      body_th: processedBodyTh,
      body_en: processedBodyEn,
    })
    .eq("id", id)
    .select();
  return NextResponse.json({ data, error });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { data, error } = await supabase.from("news").delete().eq("id", id);
  return NextResponse.json({ data, error });
}
