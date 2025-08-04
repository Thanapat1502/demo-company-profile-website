import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth-middleware";

// Content types enum
export type ContentType = "gallery" | "video";

// Page types for content
export type ContentPage = 
  | "home"
  | "about-history"
  | "about-vision"
  | "products-services";

// Helper to upload content image directly to Supabase Storage and return public URL
async function uploadContentImage(
  file: File,
  page: ContentPage,
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
    throw new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.");
  }

  // Validate file size (10MB limit)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error("File size too large. Maximum size is 10MB.");
  }

  // Generate filename
  const fileExt = file.name.split(".").pop();
  const fileName = `${page}_${imageIndex}_${Date.now()}.${fileExt}`;

  // Create the full file path within the images bucket - upload to content_store
  const filePath = `content_store/${fileName}`;

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

// GET - Fetch content by page and type
export const GET = withAuth(async (req: NextRequest, supabase) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") as ContentPage;
    const type = searchParams.get("type") as ContentType;

    if (!page) {
      return NextResponse.json(
        { error: "Page parameter is required" },
        { status: 400 }
      );
    }

    // Validate page
    const validPages: ContentPage[] = [
      "home",
      "about-history",
      "about-vision",
      "products-services"
    ];

    if (!validPages.includes(page)) {
      return NextResponse.json(
        { error: "Invalid page parameter" },
        { status: 400 }
      );
    }

    let query = supabase
      .from("contents")
      .select("*")
      .eq("page", page);

    if (type) {
      // Validate type
      const validTypes: ContentType[] = ["gallery", "video"];
      if (!validTypes.includes(type)) {
        return NextResponse.json(
          { error: "Invalid type parameter" },
          { status: 400 }
        );
      }
      query = query.eq("type", type);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [] });
  } catch (err) {
    console.error("GET contents error:", err);
    return NextResponse.json(
      { error: "Failed to fetch contents", details: err },
      { status: 500 }
    );
  }
});

// POST - Create new content
export const POST = withAuth(async (req: NextRequest, supabase) => {
  try {
    const formData = await req.formData();
    const page = formData.get("page") as ContentPage;
    const type = formData.get("type") as ContentType;
    const videoUrl = formData.get("video_url") as string;

    if (!page || !type) {
      return NextResponse.json(
        { error: "Page and type are required" },
        { status: 400 }
      );
    }

    // Validate page and type
    const validPages: ContentPage[] = ["home", "about-history", "about-vision", "products-services"];
    const validTypes: ContentType[] = ["gallery", "video"];

    if (!validPages.includes(page) || !validTypes.includes(type)) {
      return NextResponse.json(
        { error: "Invalid page or type" },
        { status: 400 }
      );
    }

    let imagesUrls: string[] = [];

    // Handle image uploads for gallery type
    if (type === "gallery") {
      const imageFiles: File[] = [];
      let index = 0;
      while (formData.has(`image_${index}`)) {
        const file = formData.get(`image_${index}`) as File;
        if (file && typeof file === "object") {
          imageFiles.push(file);
        }
        index++;
      }

      // Upload images
      for (let i = 0; i < imageFiles.length; i++) {
        try {
          const imageUrl = await uploadContentImage(
            imageFiles[i],
            page,
            i,
            supabase
          );
          imagesUrls.push(imageUrl);
        } catch (err) {
          console.error("Image upload failed:", err);
          return NextResponse.json(
            { error: `Image upload failed: ${err}` },
            { status: 500 }
          );
        }
      }
    }

    // Create content record
    const { data, error } = await supabase
      .from("contents")
      .insert([
        {
          page,
          type,
          images_url: imagesUrls,
          video_url: type === "video" ? videoUrl : null,
        },
      ])
      .select();

    if (error) {
      console.error("Create content error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data: data[0],
      message: "Content created successfully",
    });
  } catch (err) {
    console.error("POST contents error:", err);
    return NextResponse.json(
      { error: "Failed to create content", details: err },
      { status: 500 }
    );
  }
});

// PUT - Update existing content
export const PUT = withAuth(async (req: NextRequest, supabase) => {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const page = formData.get("page") as ContentPage;
    const type = formData.get("type") as ContentType;
    const videoUrl = formData.get("video_url") as string;

    if (!id) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 }
      );
    }

    // Get existing content
    const { data: existingContent, error: fetchError } = await supabase
      .from("contents")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    // Get existing images
    const existingImages = formData.get("existing_images");
    let imagesUrls: string[] = [];
    
    if (existingImages) {
      try {
        imagesUrls = JSON.parse(existingImages as string);
      } catch {
        imagesUrls = existingContent.images_url || [];
      }
    } else {
      imagesUrls = existingContent.images_url || [];
    }

    // Handle new image uploads
    if (type === "gallery") {
      const newImageFiles: File[] = [];
      let index = 0;
      while (formData.has(`image_${index}`)) {
        const file = formData.get(`image_${index}`) as File;
        if (file && typeof file === "object") {
          newImageFiles.push(file);
        }
        index++;
      }

      // Upload new images
      for (let i = 0; i < newImageFiles.length; i++) {
        try {
          const imageUrl = await uploadContentImage(
            newImageFiles[i],
            page || existingContent.page,
            imagesUrls.length + i,
            supabase
          );
          imagesUrls.push(imageUrl);
        } catch (err) {
          console.error("Image upload failed:", err);
          return NextResponse.json(
            { error: `Image upload failed: ${err}` },
            { status: 500 }
          );
        }
      }
    }

    // Update content record
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (page) updateData.page = page;
    if (type) updateData.type = type;
    if (type === "gallery") updateData.images_url = imagesUrls;
    if (type === "video" && videoUrl) updateData.video_url = videoUrl;

    const { data, error } = await supabase
      .from("contents")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Update content error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data: data[0],
      message: "Content updated successfully",
    });
  } catch (err) {
    console.error("PUT contents error:", err);
    return NextResponse.json(
      { error: "Failed to update content", details: err },
      { status: 500 }
    );
  }
});

// DELETE - Delete content
export const DELETE = withAuth(async (req: NextRequest, supabase) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("contents")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete content error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Content deleted successfully",
    });
  } catch (err) {
    console.error("DELETE contents error:", err);
    return NextResponse.json(
      { error: "Failed to delete content", details: err },
      { status: 500 }
    );
  }
});
