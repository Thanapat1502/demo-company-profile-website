import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth-middleware";
import { supabase } from "@/lib/supabase";

// Valid service IDs
const VALID_SERVICE_IDS = ["SERVICE_1", "SERVICE_2", "SERVICE_3", "SERVICE_4"];

// Helper to upload service content image directly to Supabase Storage and return public URL
async function uploadServiceImage(
  file: File,
  serviceId: string,
  imageIndex: number,
  supabaseClient: typeof import("@/lib/supabase").supabase
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
  const fileName = `public/content_store/service/${serviceId}/${Date.now()}-${imageIndex}.${fileExt}`;

  // Upload to Supabase Storage (images bucket) - using File directly
  console.log("Attempting upload to:", fileName);
  console.log("File size:", file.size, "bytes");
  console.log("File type:", file.type);

  const { error: uploadError } = await supabaseClient.storage
    .from("images")
    .upload(fileName, file, {
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    console.error("Storage upload error:", uploadError);
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // Get public URL
  const { data: publicUrlData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

export const PUT = withAuth(async (req: NextRequest, supabaseAuth, user) => {
  console.log("------------PUT API-----------------------------");
  try {
    console.log("Service Content PUT - Authenticated user:", user.id);
    console.log("User email:", user.email);

    // Test authentication by checking user session
    const { data: sessionData, error: sessionError } =
      await supabaseAuth.auth.getUser();
    console.log(
      "Session check:",
      sessionData ? "Valid" : "Invalid",
      sessionError?.message || ""
    );
    const formData = await req.formData();

    const id = formData.get("id") as string;
    const page = formData.get("page") as string;
    const type = formData.get("type") as "gallery" | "video";
    const videoUrl = formData.get("video_url") as string;
    const existingImagesStr = formData.get("existing_images") as string;

    // Validate service ID
    if (!VALID_SERVICE_IDS.includes(id)) {
      return NextResponse.json(
        {
          error: `Invalid service ID. Must be one of: ${VALID_SERVICE_IDS.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // Validate page
    if (page !== "SERVICE") {
      return NextResponse.json(
        { error: "Page must be 'SERVICE'" },
        { status: 400 }
      );
    }

    // Validate type
    if (!["gallery", "video"].includes(type)) {
      return NextResponse.json(
        { error: "Type must be 'gallery' or 'video'" },
        { status: 400 }
      );
    }

    let existingImages: string[] = [];
    if (existingImagesStr) {
      try {
        existingImages = JSON.parse(existingImagesStr);
      } catch (error) {
        console.error("Error parsing existing images:", error);
        existingImages = [];
      }
    }

    // Collect new image files
    const imageFiles: File[] = [];
    let index = 0;
    while (true) {
      const file = formData.get(`image_${index}`) as File;
      if (!file) break;
      imageFiles.push(file);
      index++;
    }

    const uploadedImageUrls: string[] = [];

    // Upload new images if any
    if (imageFiles.length > 0) {
      try {
        const uploadPromises = imageFiles.map((file, i) =>
          uploadServiceImage(file, id, i, supabaseAuth)
        );
        const newImageUrls = await Promise.all(uploadPromises);
        uploadedImageUrls.push(...newImageUrls);
      } catch (error) {
        console.error("Error uploading images:", error);
        return NextResponse.json(
          { error: `Failed to upload images: ${(error as Error).message}` },
          { status: 500 }
        );
      }
    }

    // Combine existing and new image URLs
    const allImageUrls = [...existingImages, ...uploadedImageUrls];

    // Prepare data for database
    const contentData: Record<string, any> = {
      id,
      page,
      type,
      updated_at: new Date().toISOString(),
    };

    if (type === "gallery") {
      contentData.images_url = allImageUrls;
      contentData.video_url = null; // Clear video URL when switching to gallery
    } else if (type === "video") {
      contentData.video_url = videoUrl || null;
      contentData.images_url = allImageUrls; // Keep images even for video type
    }

    // Check if record exists
    const { data: existingRecord, error: fetchError } = await supabaseAuth
      .from("contents")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching existing record:", fetchError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    let result;
    if (existingRecord) {
      // Update existing record
      const { data, error } = await supabaseAuth
        .from("contents")
        .update(contentData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating service content:", error);
        return NextResponse.json(
          { error: "Failed to update service content" },
          { status: 500 }
        );
      }
      result = data;
    } else {
      // Create new record
      contentData.created_at = new Date().toISOString();

      const { data, error } = await supabaseAuth
        .from("contents")
        .insert(contentData)
        .select()
        .single();

      if (error) {
        console.error("Error creating service content:", error);
        return NextResponse.json(
          { error: "Failed to create service content" },
          { status: 500 }
        );
      }
      result = data;
    }

    return NextResponse.json({
      success: true,
      data: result,
      message: `Service content ${
        existingRecord ? "updated" : "created"
      } successfully`,
    });
  } catch (error) {
    console.error("Service content API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});

export async function GET(req: NextRequest) {
  try {
    console.log("Service Content GET - Public request");
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      // Get specific service content
      if (!VALID_SERVICE_IDS.includes(id)) {
        return NextResponse.json(
          {
            error: `Invalid service ID. Must be one of: ${VALID_SERVICE_IDS.join(
              ", "
            )}`,
          },
          { status: 400 }
        );
      }

      const { data, error } = await supabase
        .from("contents")
        .select("*")
        .eq("id", id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching service content:", error);
        return NextResponse.json(
          { error: "Failed to fetch service content" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: data || null,
      });
    } else {
      // Get all service content
      const { data, error } = await supabase
        .from("contents")
        .select("*")
        .eq("page", "SERVICE")
        .order("id");

      if (error) {
        console.error("Error fetching service content:", error);
        return NextResponse.json(
          { error: "Failed to fetch service content" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: data || [],
      });
    }
  } catch (error) {
    console.error("Service content GET API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
