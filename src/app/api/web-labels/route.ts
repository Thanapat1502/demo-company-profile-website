import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
export async function GET() {
  try {
    // For now, return mock data
    // Later you can uncomment this to use real database:
    const { data, error } = await supabase.from("web_labels").select("*");
    console.log("Fetch label:", data);
    return NextResponse.json({ data, error });
  } catch (error) {
    console.log(`Failed to fetch labels: ${error}`);
    return NextResponse.json(
      {
        data: null,
        error: `Failed to fetch labels: ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { key, text } = body;

    if (!key || !text) {
      return NextResponse.json(
        { error: "Missing key or text" },
        { status: 400 }
      );
    }

    // For now, simulate success with mock data
    // Later you can uncomment this to use real database:
    const { data, error } = await supabase
      .from("web_labels")
      .update({ value: text })
      .eq("key", key)
      .select();
    return NextResponse.json({ data, error });
  } catch (error) {
    console.log(`Failed to update labels: ${error}`);
    return NextResponse.json(
      { error: "Failed to update label" },
      { status: 500 }
    );
  }
}
