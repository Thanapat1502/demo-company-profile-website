import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);
const table = "products";

// GET /api/products
export async function GET() {
  const { data, error } = await supabase.from(table).select("*");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ products: data }, { status: 200 });
}

// POST /api/products
export async function POST(req: NextRequest) {
  const body = await req.json();
  const product = {
    ...body,
    id: uuidv4(),
  };
  const { error } = await supabase.from(table).insert([product]);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ product }, { status: 201 });
}
