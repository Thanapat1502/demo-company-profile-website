import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { withAuth } from "@/lib/auth-middleware";

const table = "products";

// Helper to upload image directly to Supabase Storage and return public URL
async function uploadProductImage(
  file: File,
  productId: string,
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
  const fileName = `product_${productId}_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 8)}.${fileExt}`;

  // Create the full file path within the images bucket
  const filePath = `public/products_store/${fileName}`;

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

// GET /api/products (Public - No auth required)
export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("GET /api/products - Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("GET /api/products - Success, found", data?.length, "products");
    return NextResponse.json({ products: data }, { status: 200 });
  } catch (error) {
    console.log("GET /api/products - Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/products
export const POST = withAuth(async (req: NextRequest, supabase) => {
  try {
    const formData = await req.formData();
    const name_th = formData.get("name_th") as string;
    const name_en = formData.get("name_en") as string;
    const description_th = formData.get("description_th") as string;
    const description_en = formData.get("description_en") as string;
    const status = formData.get("status") as string;
    let image_url = formData.get("image_url") as string;
    const imageFile = formData.get("image") as File | null;

    // Generate a unique product ID for image upload
    const productId = `${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    if (imageFile && typeof imageFile === "object") {
      try {
        image_url = await uploadProductImage(imageFile, productId, supabase);
        console.log("Image uploaded successfully:", image_url);
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return NextResponse.json(
          { error: `Image upload failed: ${(uploadError as Error).message}` },
          { status: 500 }
        );
      }
    }

    const product = {
      image_url: image_url || "",
      name_th: name_th || "",
      name_en: name_en || "",
      description_th: description_th || "",
      description_en: description_en || "",
      status: status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from(table)
      .insert([product])
      .select()
      .single();
    if (error) {
      console.error("Database insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Product created successfully:", data);
    return NextResponse.json({ product: data }, { status: 201 });
  } catch (error) {
    console.error("POST /api/products - Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});

// PUT /api/products
export const PUT = withAuth(async (req: NextRequest, supabase) => {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name_th = formData.get("name_th") as string;
    const name_en = formData.get("name_en") as string;
    const description_th = formData.get("description_th") as string;
    const description_en = formData.get("description_en") as string;
    const status = formData.get("status") as string;
    let image_url = formData.get("image_url") as string;
    const imageFile = formData.get("image") as File | null;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Generate a unique product ID for image upload if new image
    const productId = `${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    if (imageFile && typeof imageFile === "object") {
      try {
        image_url = await uploadProductImage(imageFile, productId, supabase);
        console.log("Image uploaded successfully:", image_url);
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return NextResponse.json(
          { error: `Image upload failed: ${(uploadError as Error).message}` },
          { status: 500 }
        );
      }
    }

    const updateData: {
      name_th: string;
      name_en: string;
      description_th: string;
      description_en: string;
      updated_at: string;
      image_url?: string;
      status: string;
    } = {
      name_th: name_th || "",
      name_en: name_en || "",
      description_th: description_th || "",
      description_en: description_en || "",
      status: status,
      updated_at: new Date().toISOString(),
    };

    // Only update image_url if a new image was uploaded
    if (image_url) {
      updateData.image_url = image_url;
    }

    const { data, error } = await supabase
      .from(table)
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Database update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Product updated successfully:", data);
    return NextResponse.json({ product: data }, { status: 200 });
  } catch (error) {
    console.error("PUT /api/products - Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});

// DELETE /api/products
export const DELETE = withAuth(async (req: NextRequest, supabase) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) {
      console.error("Database delete error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Product deleted successfully:", id);
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/products - Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});
