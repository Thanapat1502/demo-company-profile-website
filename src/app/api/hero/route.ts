import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth-middleware";
import { supabase } from "@/lib/supabase";

// Hero section IDs enum
export type HeroSectionId =
  | "HOME"
  | "ABOUT_MAIN"
  | "ABOUT_HISTORY"
  | "ABOUT_VISION"
  | "ABOUT_EXECUTIVE"
  | "PRODUCTS_SERVICE"
  | "NEWS"
  | "CONTACT"
  | "REFERENCE";

// Helper to upload hero image directly to Supabase Storage and return public URL
async function uploadHeroImage(
  file: File,
  heroId: HeroSectionId,
  imageIndex: number,
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

  // Validate file size (10MB limit)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error("File size too large. Maximum size is 10MB.");
  }

  // Generate filename
  const fileExt = file.name.split(".").pop();
  const fileName = `${heroId}_${imageIndex}_${Date.now()}.${fileExt}`;

  // Create the full file path within the images bucket - upload to public/hero_store
  const filePath = `public/hero_store/${fileName}`;

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

// GET - Fetch hero section by ID (Public - No auth required)
export async function GET(req: NextRequest) {
  console.log("Hero GET");
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") as HeroSectionId;

    if (!id) {
      return NextResponse.json(
        { error: "Hero section ID is required" },
        { status: 400 }
      );
    }

    // Validate hero section ID
    const validIds: HeroSectionId[] = [
      "HOME",
      "ABOUT_MAIN",
      "ABOUT_HISTORY",
      "ABOUT_VISION",
      "ABOUT_EXECUTIVE",
      "PRODUCTS_SERVICE",
      "NEWS",
      "CONTACT",
      "REFERENCE",
    ];

    if (!validIds.includes(id)) {
      return NextResponse.json(
        { error: "Invalid hero section ID" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("hero_section")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No data found, return empty hero section
        return NextResponse.json({
          data: {
            id,
            hero_images: [],
          },
        });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // console.log("Hero GET - Success:", data);
    return NextResponse.json({ data });
  } catch (err) {
    console.error("GET hero section error:", err);
    return NextResponse.json(
      { error: "Failed to fetch hero section", details: err },
      { status: 500 }
    );
  }
}

// PUT - Create or Update hero section
export const PUT = withAuth(async (req: NextRequest, supabase) => {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as HeroSectionId;

    if (!id) {
      return NextResponse.json(
        { error: "Hero section ID is required" },
        { status: 400 }
      );
    }

    // Validate hero section ID
    const validIds: HeroSectionId[] = [
      "HOME",
      "ABOUT_MAIN",
      "ABOUT_HISTORY",
      "ABOUT_VISION",
      "ABOUT_EXECUTIVE",
      "PRODUCTS_SERVICE",
      "NEWS",
      "CONTACT",
      "REFERENCE",
    ];

    if (!validIds.includes(id)) {
      return NextResponse.json(
        { error: "Invalid hero section ID" },
        { status: 400 }
      );
    }

    // Get existing hero images
    const existingImages = formData.get("existing_images");
    let heroImages: string[] = [];

    if (existingImages) {
      try {
        heroImages = JSON.parse(existingImages as string);
      } catch {
        heroImages = [];
      }
    }

    // Handle new image uploads
    const newImageFiles: File[] = [];
    let index = 0;
    while (formData.has(`hero_image_${index}`)) {
      const file = formData.get(`hero_image_${index}`) as File;
      if (file && typeof file === "object") {
        newImageFiles.push(file);
      }
      index++;
    }

    // Upload new images and add to hero_images array
    for (let i = 0; i < newImageFiles.length; i++) {
      try {
        const imageUrl = await uploadHeroImage(
          newImageFiles[i],
          id,
          heroImages.length + i,
          supabase
        );
        heroImages.push(imageUrl);
      } catch (err) {
        console.error("Image upload failed:", err);
        return NextResponse.json(
          { error: `Image upload failed: ${err}` },
          { status: 500 }
        );
      }
    }

    // Check if hero section exists
    const { data: existing } = await supabase
      .from("hero_section")
      .select("id")
      .eq("id", id)
      .single();

    let result;
    if (existing) {
      // Update existing record
      const { data, error } = await supabase
        .from("hero_section")
        .update({
          hero_images: heroImages,
        })
        .eq("id", id)
        .select();

      if (error) {
        console.error("Update hero section error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      result = data;
    } else {
      // Create new record
      const { data, error } = await supabase
        .from("hero_section")
        .insert([
          {
            id,
            hero_images: heroImages,
          },
        ])
        .select();

      if (error) {
        console.error("Create hero section error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      result = data;
    }

    return NextResponse.json({
      data: result[0],
      message: "Hero section updated successfully",
    });
  } catch (err) {
    console.error("PUT hero section error:", err);
    return NextResponse.json(
      { error: "Failed to update hero section", details: err },
      { status: 500 }
    );
  }
});

// POST - Create new hero section (alias for PUT for compatibility)
export const POST = PUT;
