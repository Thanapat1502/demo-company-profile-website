import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { withAuth } from "@/lib/auth-middleware";
// Helper to upload image directly to Supabase Storage and return public URL
async function uploadServiceImage(
  file: File,
  serviceId: string,
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

  // Validate file size (5MB limit)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error("File size too large. Maximum size is 5MB.");
  }

  // Generate a unique filename
  const fileExt = file.name.split(".").pop();
  const fileName = `service_${serviceId}_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 8)}.${fileExt}`;

  // Create the full file path within the images bucket
  const filePath = `public/services_store/${fileName}`;

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
    // Get one service
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .single();
    return NextResponse.json({ data, error });
  } else {
    // Get all services
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });
    return NextResponse.json({ data, error });
  }
}

export const POST = withAuth(async (req: NextRequest, supabase) => {
  console.log("POST API I");
  try {
    console.log("POST API II");
    const formData = await req.formData();
    const name_th = formData.get("name_th") as string;
    const name_en = formData.get("name_en") as string;
    const description_th = formData.get("description_th") as string;
    const description_en = formData.get("description_en") as string;
    let image_url = formData.get("image_url") as string;
    const imageFile = formData.get("image") as File | null;

    // Generate a unique service ID for image upload
    const serviceId = `${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    if (imageFile && typeof imageFile === "object") {
      try {
        image_url = await uploadServiceImage(imageFile, serviceId, supabase);
      } catch (err) {
        console.log("upload image fail:", err);
        return NextResponse.json(
          { error: "Image upload failed" },
          { status: 500 }
        );
      }
    }

    const { data, error } = await supabase
      .from("services")
      .insert([
        {
          name_th,
          name_en,
          description_th,
          description_en,
          image_url,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, message: "Service created successfully" });
  } catch (err) {
    console.log("POST API Error:", err);
    return NextResponse.json(
      { error: "Failed to create service", details: err },
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
    const description_th = formData.get("description_th") as string;
    const description_en = formData.get("description_en") as string;
    let image_url = formData.get("image_url") as string;
    const imageFile = formData.get("image") as File | null;

    if (!id) {
      return NextResponse.json(
        { error: "Missing service ID" },
        { status: 400 }
      );
    }

    if (imageFile && typeof imageFile === "object") {
      try {
        image_url = await uploadServiceImage(imageFile, id, supabase);
      } catch (err) {
        console.log("upload image fail:", err);
        return NextResponse.json(
          { error: "Image upload failed" },
          { status: 500 }
        );
      }
    }

    const { data, error } = await supabase
      .from("services")
      .update({
        name_th,
        name_en,
        description_th,
        description_en,
        image_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, message: "Service updated successfully" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update service", details: err },
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
        { error: "Missing service ID" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data,
      message: `Service deleted by ${user.email}`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete service", details: err },
      { status: 500 }
    );
  }
});
