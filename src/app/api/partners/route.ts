import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { withAuth, createAuthenticatedClient } from "@/lib/auth-middleware";
import { v4 as uuidv4 } from "uuid";

// Helper to upload logo using authenticated Supabase client
async function uploadLogo(file: File, partnerId: string): Promise<string> {
  try {
    // Create authenticated client to pass RLS
    const supabaseAuth = await createAuthenticatedClient();

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `partner_${partnerId}_${Date.now()}.${fileExt}`;
    const filePath = `public/partner_store/${fileName}`;

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
    console.error("Logo upload error:", error);
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

    console.log("Attempting to delete partner logo:", filePath);

    const { error } = await supabaseAuth.storage
      .from("images")
      .remove([filePath]);

    if (error) {
      console.error("Error deleting partner logo from storage:", error);
    } else {
      console.log("Successfully deleted partner logo:", filePath);
    }
  } catch (error) {
    console.error("Error in deleteImageFromStorage:", error);
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .order("id", { ascending: false });
  return NextResponse.json({ data, error });
}

export const POST = withAuth(async (req: NextRequest, supabaseAuth) => {
  try {
    const formData = await req.formData();
    const id = uuidv4();
    const name = formData.get("name") as string;
    let logo_url = formData.get("logo_url") as string;
    const logoFile = formData.get("logo") as File | null;

    if (!name) {
      return NextResponse.json(
        { error: "Partner name is required" },
        { status: 400 }
      );
    }

    // Handle logo upload
    if (logoFile && typeof logoFile === "object") {
      try {
        logo_url = await uploadLogo(logoFile, id);
      } catch (error) {
        console.error("Logo upload error:", error);
        return NextResponse.json(
          { error: "Logo upload failed" },
          { status: 500 }
        );
      }
    }

    // Prepare timestamp fields
    const now = new Date().toISOString();

    // Use authenticated client for database operations
    const { data, error } = await supabaseAuth
      .from("partners")
      .insert([
        {
          name,
          logo_url,
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
    console.error("POST partner error:", err);
    return NextResponse.json(
      { error: "Failed to create partner", details: err },
      { status: 500 }
    );
  }
});

export const PUT = withAuth(async (req: NextRequest, supabaseAuth) => {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    let logo_url = formData.get("logo_url") as string;
    const logoFile = formData.get("logo") as File | null;

    if (!id || !name) {
      return NextResponse.json(
        { error: "Partner ID and name are required" },
        { status: 400 }
      );
    }

    // Get current partner to check for existing logo
    const { data: currentPartner } = await supabaseAuth
      .from("partners")
      .select("logo_url")
      .eq("id", id)
      .single();

    // Handle logo upload
    if (logoFile && typeof logoFile === "object") {
      try {
        // Delete old logo if it exists and we're uploading a new one
        if (currentPartner?.logo_url) {
          await deleteImageFromStorage(supabaseAuth, currentPartner.logo_url);
        }

        logo_url = await uploadLogo(logoFile, id);
      } catch (error) {
        console.error("Logo upload error:", error);
        return NextResponse.json(
          { error: "Logo upload failed" },
          { status: 500 }
        );
      }
    }

    // Prepare timestamp fields
    const now = new Date().toISOString();

    // Use authenticated client for database operations
    const { data, error } = await supabaseAuth
      .from("partners")
      .update({
        name,
        logo_url,
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
    console.error("PUT partner error:", err);
    return NextResponse.json(
      { error: "Failed to update partner", details: err },
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
        { error: "Missing partner ID" },
        { status: 400 }
      );
    }

    // Get the partner first to retrieve the logo URL
    const { data: partnerToDelete, error: fetchError } = await supabaseAuth
      .from("partners")
      .select("logo_url")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching partner for deletion:", fetchError);
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    // Delete the partner from database
    const { data, error } = await supabaseAuth
      .from("partners")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting partner:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Delete the logo image if it exists
    if (partnerToDelete?.logo_url) {
      await deleteImageFromStorage(supabaseAuth, partnerToDelete.logo_url);
    }

    return NextResponse.json({
      data,
      message: "Partner and associated logo deleted successfully",
    });
  } catch (err) {
    console.error("Delete partner operation failed:", err);
    return NextResponse.json(
      { error: "Failed to delete partner", details: err },
      { status: 500 }
    );
  }
});
