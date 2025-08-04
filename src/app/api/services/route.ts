import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { withAuth } from "@/lib/auth-middleware";
// Helper to upload image to Supabase Storage and return public URL
async function uploadServiceImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("bucket", "services_store");
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

export const POST = withAuth(async (req: NextRequest, supabase, user) => {
  try {
    const formData = await req.formData();
    const name_th = formData.get("name_th") as string;
    const name_en = formData.get("name_en") as string;
    const description_th = formData.get("description_th") as string;
    const description_en = formData.get("description_en") as string;
    let image_url = formData.get("image_url") as string;
    const imageFile = formData.get("image") as File | null;

    if (imageFile && typeof imageFile === "object") {
      try {
        image_url = await uploadServiceImage(imageFile);
      } catch {
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
          created_by: user.id,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, message: "Service created successfully" });
  } catch (err) {
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
        image_url = await uploadServiceImage(imageFile);
      } catch {
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
