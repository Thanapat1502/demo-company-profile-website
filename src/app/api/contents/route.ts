import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth-middleware";
import { supabase } from "@/lib/supabase";

// Content types enum
export type ContentType = "gallery" | "video";

// Page types for content
export type ContentPage = "HOME" | "ABOUT" | "HISTORY" | "SERVICE" | "VISION";

// Helper to upload content image directly to Supabase Storage and return public URL
async function uploadContentImage(
  file: File,
  page: ContentPage,
  imageIndex: number,
  supabase: any // Accept authenticated Supabase client from withAuth
): Promise<string> {
  console.log("📤 uploadContentImage - Starting upload:");
  console.log("- File:", { name: file.name, size: file.size, type: file.type });
  console.log("- Page:", page);
  console.log("- Image index:", imageIndex);

  // Validate file type
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (!allowedTypes.includes(file.type)) {
    console.error("❌ Invalid file type:", file.type);
    throw new Error(
      "Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed."
    );
  }

  // Validate file size (10MB limit)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    console.error("❌ File too large:", file.size);
    throw new Error("File size too large. Maximum size is 10MB.");
  }

  // Generate filename
  const fileExt = file.name.split(".").pop();
  const fileName = `${page}_${imageIndex}_${Date.now()}.${fileExt}`;
  console.log("- Generated filename:", fileName);

  // Create the full file path within the images bucket - upload to public/home_content
  const filePath = `public/home_content/${fileName}`;
  console.log("- File path:", filePath);

  // Upload to Supabase Storage (images bucket)
  console.log("- Uploading to Supabase storage...");
  const { error } = await supabase.storage
    .from("images")
    .upload(filePath, file, {
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    console.error("❌ Storage upload error:", error);
    console.error("- Error details:", {
      message: error.message,
      statusCode: error.statusCode,
      error: error.error,
    });
    throw new Error(`Upload failed: ${error.message}`);
  }

  console.log("✅ Upload successful, getting public URL...");

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from("images")
    .getPublicUrl(filePath);

  console.log("✅ Public URL generated:", publicUrlData.publicUrl);
  return publicUrlData.publicUrl;
}

// GET - Fetch content by page and type (No auth required)
export async function GET(req: NextRequest) {
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
      "HOME",
      "ABOUT",
      "HISTORY",
      "SERVICE",
      "VISION",
    ];

    if (!validPages.includes(page)) {
      return NextResponse.json(
        { error: "Invalid page parameter" },
        { status: 400 }
      );
    }

    let query = supabase.from("contents").select("*").eq("page", page);

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
      console.error("❌ Contents query error:", error);
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
}

// POST - Create new content
export const POST = withAuth(async (req: NextRequest, supabase, user) => {
  console.log("🔐 API /contents POST - Authentication successful");
  console.log("- User:", { id: user.id, email: user.email });
  try {
    const formData = await req.formData();
    console.log("- FormData received, processing...");
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
    const validPages: ContentPage[] = [
      "HOME",
      "HISTORY",
      "SERVICE",
      "VISION",
      "ABOUT",
    ];
    const validTypes: ContentType[] = ["gallery", "video"];

    if (!validPages.includes(page) || !validTypes.includes(type)) {
      return NextResponse.json(
        { error: "Invalid page or type" },
        { status: 400 }
      );
    }

    const imagesUrls: string[] = [];

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
      console.log("📸 Starting image uploads for POST request:");
      console.log("- Number of images to upload:", imageFiles.length);
      console.log("- Page:", page);
      console.log("- Using authenticated supabase client");

      for (let i = 0; i < imageFiles.length; i++) {
        try {
          console.log(
            `📤 Uploading image ${i + 1}/${imageFiles.length}:`,
            imageFiles[i].name
          );
          const imageUrl = await uploadContentImage(
            imageFiles[i],
            page,
            i,
            supabase
          );
          console.log(`✅ Image ${i + 1} uploaded successfully:`, imageUrl);
          imagesUrls.push(imageUrl);
        } catch (err) {
          console.error(`❌ Image ${i + 1} upload failed:`, err);
          return NextResponse.json(
            { error: `Image upload failed: ${err}` },
            { status: 500 }
          );
        }
      }
      console.log("✅ All images uploaded successfully for POST request");
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
export const PUT = withAuth(async (req: NextRequest, supabase, user) => {
  console.log("🔐 API /contents PUT - Authentication successful");
  console.log("- User:", { id: user.id, email: user.email });
  try {
    const formData = await req.formData();
    console.log("- FormData received, processing...");
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
      console.log("📸 Starting image uploads for PUT request:");
      console.log("- Number of new images to upload:", newImageFiles.length);
      console.log("- Page:", page || existingContent.page);
      console.log("- Current images count:", imagesUrls.length);
      console.log("- Using authenticated supabase client");

      for (let i = 0; i < newImageFiles.length; i++) {
        try {
          console.log(
            `📤 Uploading new image ${i + 1}/${newImageFiles.length}:`,
            newImageFiles[i].name
          );
          const imageUrl = await uploadContentImage(
            newImageFiles[i],
            page || existingContent.page,
            imagesUrls.length + i,
            supabase
          );
          console.log(`✅ New image ${i + 1} uploaded successfully:`, imageUrl);
          imagesUrls.push(imageUrl);
        } catch (err) {
          console.error(`❌ New image ${i + 1} upload failed:`, err);
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
export const DELETE = withAuth(async (req: NextRequest, supabase, user) => {
  console.log("🔐 API /contents DELETE - Authentication successful");
  console.log("- User:", { id: user.id, email: user.email });
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("contents").delete().eq("id", id);

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
