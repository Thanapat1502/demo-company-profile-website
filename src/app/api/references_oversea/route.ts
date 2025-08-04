import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { withAuth } from "@/lib/auth-middleware";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    // Get one oversea project
    const { data, error } = await supabase
      .from("references_oversea")
      .select("*")
      .eq("id", id)
      .single();
    return NextResponse.json({ data, error });
  } else {
    // Get all oversea projects
    const { data, error } = await supabase
      .from("references_oversea")
      .select("*")
      .order("created_at", { ascending: false });
    return NextResponse.json({ data, error });
  }
}

export const POST = withAuth(async (req: NextRequest, supabase) => {
  console.log("oversea I");
  try {
    console.log("oversea II");
    const {
      brand,
      type_th,
      type_en,
      project_name_th,
      project_name_en,
      country_th,
      country_en,
    } = await req.json();

    if (
      !brand ||
      !type_th ||
      !type_en ||
      !project_name_th ||
      !project_name_en ||
      !country_th ||
      !country_en
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("references_oversea")
      .insert([
        {
          brand,
          type_th,
          type_en,
          project_name_th,
          project_name_en,
          country_th,
          country_en,
        },
      ])
      .select();

    if (error) {
      console.log("400 Oversea xII:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data: data[0],
      message: "Oversea project created successfully",
    });
  } catch (err) {
    console.log("500 Oversea xI:", err);

    return NextResponse.json(
      { error: "Failed to create oversea project", details: err },
      { status: 500 }
    );
  }
});

export const PUT = withAuth(async (req: NextRequest, supabase) => {
  try {
    const {
      id,
      brand,
      type_th,
      type_en,
      project_name_th,
      project_name_en,
      country_th,
      country_en,
    } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing project ID" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("references_oversea")
      .update({
        brand,
        type_th,
        type_en,
        project_name_th,
        project_name_en,
        country_th,
        country_en,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data: data[0],
      message: "Oversea project updated successfully",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update oversea project", details: err },
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
        { error: "Missing project ID" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("references_oversea")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data,
      message: `Oversea project deleted by ${user.email}`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete oversea project", details: err },
      { status: 500 }
    );
  }
});
