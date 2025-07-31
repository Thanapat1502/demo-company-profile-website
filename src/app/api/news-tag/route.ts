import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  console.log("Fetch tag API");
  const { data, error } = await supabase.from("news_tag").select("*");
  console.log("Error tag----------------", error);

  if (error) {
    console.log("Error tag----------------", error);
  }
  return NextResponse.json({ data, error });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;
  const { data, error } = await supabase
    .from("news_tag")
    .insert([{ name }])
    .select();
  return NextResponse.json({ data, error });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { data, error } = await supabase.from("news_tag").delete().eq("id", id);
  return NextResponse.json({ data, error });
}
