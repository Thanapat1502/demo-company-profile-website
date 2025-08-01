import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { withAuth, createAuthenticatedClient } from "@/lib/auth-middleware";
import { v4 as uuidv4 } from "uuid";

// Helper to upload executive image using authenticated Supabase client
async function uploadExecutiveImage(
  file: File,
  executiveId: string
): Promise<string> {
  try {
    // Create authenticated client to pass RLS
    const supabaseAuth = await createAuthenticatedClient();

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `executive_${executiveId}_${Date.now()}.${fileExt}`;
    const filePath = `public/executive_store/${fileName}`;

    // Upload to Supabase Storage
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
    console.error("Executive image upload error:", error);
    throw error;
  }
}

// Helper function to delete image from Supabase storage
async function deleteImageFromStorage(
  supabaseAuth: Awaited<ReturnType<typeof createAuthenticatedClient>>,
  imageUrl: string
) {
  if (!imageUrl) return;

  try {
    // Extract the file path from the URL
    const urlParts = imageUrl.split("/");
    const bucketIndex = urlParts.findIndex((part) => part === "images");

    if (bucketIndex === -1) {
      console.warn("Could not extract file path from URL:", imageUrl);
      return;
    }

    // Get the path after 'images/' bucket
    const filePath = urlParts.slice(bucketIndex + 1).join("/");

    if (!filePath) {
      console.warn("Empty file path extracted from URL:", imageUrl);
      return;
    }

    console.log("Attempting to delete executive image:", filePath);

    const { error } = await supabaseAuth.storage
      .from("images")
      .remove([filePath]);

    if (error) {
      console.error("Error deleting executive image from storage:", error);
    } else {
      console.log("Successfully deleted executive image:", filePath);
    }
  } catch (error) {
    console.error("Error in deleteImageFromStorage:", error);
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("executive")
    .select("*")
    .order("updated_at", { ascending: false });
  return NextResponse.json({ data, error });
}

export const POST = withAuth(async (req: NextRequest, supabaseAuth) => {
  try {
    const formData = await req.formData();
    const id = uuidv4();
    const name_th = formData.get("name_th") as string;
    const name_en = formData.get("name_en") as string;
    const position_th = formData.get("position_th") as string;
    const position_en = formData.get("position_en") as string;
    let image_url = formData.get("image_url") as string;
    const imageFile = formData.get("image") as File | null;

    if (!name_th || !name_en || !position_th || !position_en) {
      return NextResponse.json(
        { error: "All name and position fields are required" },
        { status: 400 }
      );
    }

    // Handle image upload
    if (imageFile && typeof imageFile === "object") {
      try {
        image_url = await uploadExecutiveImage(imageFile, id);
      } catch (error) {
        console.error("Image upload error:", error);
        return NextResponse.json(
          { error: "Image upload failed" },
          { status: 500 }
        );
      }
    }

    // Prepare timestamp fields
    const now = new Date().toISOString();

    // Use authenticated client for database operations
    const { data, error } = await supabaseAuth
      .from("executive")
      .insert([
        {
          name_th,
          name_en,
          position_th,
          position_en,
          image_url,
          created_at: now,
          updated_at: now,
        },
      ])
      .select();

    if (error) {
      console.error("Database insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("POST executive error:", err);
    return NextResponse.json(
      { error: "Failed to create executive member", details: err },
      { status: 500 }
    );
  }
});

export const PUT = withAuth(async (req: NextRequest, supabaseAuth) => {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name_th = formData.get("name_th") as string;
    const name_en = formData.get("name_en") as string;
    const position_th = formData.get("position_th") as string;
    const position_en = formData.get("position_en") as string;
    let image_url = formData.get("image_url") as string;
    const imageFile = formData.get("image") as File | null;

    if (!id || !name_th || !name_en || !position_th || !position_en) {
      return NextResponse.json(
        { error: "Executive ID and all name/position fields are required" },
        { status: 400 }
      );
    }

    // Get current executive to check for existing image
    const { data: currentExecutive } = await supabaseAuth
      .from("executive")
      .select("image_url")
      .eq("id", id)
      .single();

    // Handle image upload
    if (imageFile && typeof imageFile === "object") {
      try {
        // Delete old image if it exists and we're uploading a new one
        if (currentExecutive?.image_url) {
          await deleteImageFromStorage(
            supabaseAuth,
            currentExecutive.image_url
          );
        }

        image_url = await uploadExecutiveImage(imageFile, id);
      } catch (error) {
        console.error("Image upload error:", error);
        return NextResponse.json(
          { error: "Image upload failed" },
          { status: 500 }
        );
      }
    }

    // Prepare timestamp fields
    const now = new Date().toISOString();

    // Use authenticated client for database operations
    const { data, error } = await supabaseAuth
      .from("executive")
      .update({
        name_th,
        name_en,
        position_th,
        position_en,
        image_url,
        updated_at: now,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Database update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("PUT executive error:", err);
    return NextResponse.json(
      { error: "Failed to update executive member", details: err },
      { status: 500 }
    );
  }
});

export const DELETE = withAuth(async (req: NextRequest, supabaseAuth) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing executive ID" },
        { status: 400 }
      );
    }

    // Get the executive first to retrieve the image URL
    const { data: executiveToDelete, error: fetchError } = await supabaseAuth
      .from("executive")
      .select("image_url")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching executive for deletion:", fetchError);
      return NextResponse.json(
        { error: "Executive not found" },
        { status: 404 }
      );
    }

    // Delete the executive from database
    const { data, error } = await supabaseAuth
      .from("executive")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting executive:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Delete the image if it exists
    if (executiveToDelete?.image_url) {
      await deleteImageFromStorage(supabaseAuth, executiveToDelete.image_url);
    }

    return NextResponse.json({
      data,
      message: "Executive member and associated image deleted successfully",
    });
  } catch (err) {
    console.error("Delete executive operation failed:", err);
    return NextResponse.json(
      { error: "Failed to delete executive member", details: err },
      { status: 500 }
    );
  }
});
