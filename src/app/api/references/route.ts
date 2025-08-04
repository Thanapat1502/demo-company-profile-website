import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { withAuth } from "@/lib/auth-middleware";
import { v4 as uuidv4 } from "uuid";

// Helper to upload a single image directly to Supabase Storage and return public URL
async function uploadReferenceImage(
  file: File,
  folder: string,
  fileName: string,
  supabase: typeof import("@/lib/supabase").supabase
): Promise<string> {
  // Validate file type
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed."
    );
  }

  // Validate file size (10MB limit for references)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error("File size too large. Maximum size is 10MB.");
  }

  // Generate filename if not provided
  const fileExt = file.name.split(".").pop();
  const finalFileName =
    fileName ||
    `${folder}_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 8)}.${fileExt}`;

  // Create the full file path within the images bucket
  const filePath = `public/reference_store/${folder}/${finalFileName}`;

  // Upload to Supabase Storage (images bucket)
  const { error } = await supabase.storage
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
  const { data: publicUrlData } = supabase.storage
    .from("images")
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    // Get one reference
    const { data, error } = await supabase
      .from("references")
      .select("*")
      .eq("id", id)
      .single();
    return NextResponse.json({ data, error });
  } else {
    // Get all references
    const { data, error } = await supabase
      .from("references")
      .select("*")
      .order("opened_at", { ascending: false });
    return NextResponse.json({ data, error });
  }
}

export const POST = withAuth(async (req: NextRequest, supabase) => {
  console.log("POST API - I");
  try {
    console.log("POST API - II");
    const formData = await req.formData();
    const id = uuidv4();
    const name_th = formData.get("name_th") as string;
    const name_en = formData.get("name_en") as string;
    const type_th = formData.get("type_th") as string;
    const type_en = formData.get("type_en") as string;
    const opened_at = formData.get("opened_at") as string;
    let thumbnail = formData.get("thumbnail") as string;
    let galleries: string[] = [];

    // Handle thumbnail upload
    const thumbnailFile = formData.get("thumbnail_file") as File | null;
    if (thumbnailFile && typeof thumbnailFile === "object") {
      try {
        console.log("POST API upload image-I");
        thumbnail = await uploadReferenceImage(
          thumbnailFile,
          id,
          "thumbnail",
          supabase
        );
      } catch (err) {
        console.log("POST API upload image-x :", err);
        return NextResponse.json(
          { error: "Thumbnail upload failed" },
          { status: 500 }
        );
      }
    }

    // Handle galleries upload (multiple files)
    const galleryFiles = formData.getAll("galleries") as File[];
    if (galleryFiles && galleryFiles.length > 0) {
      for (let i = 0; i < galleryFiles.length; i++) {
        const file = galleryFiles[i];
        if (file && typeof file === "object") {
          try {
            const url = await uploadReferenceImage(
              file,
              id,
              `gallery_${i}`,
              supabase
            );
            galleries.push(url);
          } catch {
            // skip failed image
          }
        }
      }
    } else if (formData.get("galleries_json")) {
      // Accept pre-uploaded gallery URLs as JSON
      galleries = JSON.parse(formData.get("galleries_json") as string);
    }

    console.log("POST API - III");
    const { data, error } = await supabase
      .from("references")
      .insert([
        {
          id,
          name_th,
          name_en,
          type_th,
          type_en,
          thumbnail,
          galleries,
          opened_at,
        },
      ])
      .select();

    if (error) {
      console.log("POST API - xIII Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data,
      message: "Reference created successfully",
    });
  } catch (err) {
    console.log("POST API - xI", err);
    return NextResponse.json(
      { error: "Failed to create reference", details: err },
      { status: 500 }
    );
  }
});

export const PUT = withAuth(async (req: NextRequest, supabase) => {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name_th = formData.get("name_th") as string;
    const name_en = formData.get("name_en") as string;
    const type_th = formData.get("type_th") as string;
    const type_en = formData.get("type_en") as string;
    const opened_at = formData.get("opened_at") as string;
    let thumbnail = formData.get("thumbnail") as string;
    let galleries: string[] = [];

    if (!id) {
      return NextResponse.json(
        { error: "Missing reference ID" },
        { status: 400 }
      );
    }

    // Handle thumbnail upload
    const thumbnailFile = formData.get("thumbnail_file") as File | null;
    if (thumbnailFile && typeof thumbnailFile === "object") {
      try {
        thumbnail = await uploadReferenceImage(
          thumbnailFile,
          id,
          "thumbnail",
          supabase
        );
      } catch {
        return NextResponse.json(
          { error: "Thumbnail upload failed" },
          { status: 500 }
        );
      }
    }

    // Handle galleries upload (multiple files)
    const galleryFiles = formData.getAll("galleries") as File[];
    if (galleryFiles && galleryFiles.length > 0) {
      for (let i = 0; i < galleryFiles.length; i++) {
        const file = galleryFiles[i];
        if (file && typeof file === "object") {
          try {
            const url = await uploadReferenceImage(
              file,
              id,
              `gallery_${i}`,
              supabase
            );
            galleries.push(url);
          } catch {
            // skip failed image
          }
        }
      }
    } else if (formData.get("galleries_json")) {
      galleries = JSON.parse(formData.get("galleries_json") as string);
    }

    const { data, error } = await supabase
      .from("references")
      .update({
        name_th,
        name_en,
        type_th,
        type_en,
        thumbnail,
        galleries,
        opened_at,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data,
      message: "Reference updated successfully",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update reference", details: err },
      { status: 500 }
    );
  }
});

export const DELETE = withAuth(async (req: NextRequest, supabase, user) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing reference ID" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("references")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data,
      message: `Reference deleted by ${user.email}`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete reference", details: err },
      { status: 500 }
    );
  }
});
