import { NextRequest, NextResponse } from "next/server";
import { withAuth, withRole, handleAuthenticatedRequest } from "@/lib/auth-middleware";

// Example 1: Basic authentication using withAuth
export const POST = withAuth(async (req: NextRequest, supabase, user) => {
  try {
    const body = await req.json();
    
    // Use authenticated supabase client for database operations
    const { data, error } = await supabase
      .from("some_table")
      .insert({
        ...body,
        user_id: user.id, // User context is available
        created_by: user.email
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, message: "Created successfully" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create record", details: err },
      { status: 500 }
    );
  }
});

// Example 2: Role-based authentication (only admins can delete)
export const DELETE = withRole('admin')(async (req: NextRequest, supabase, user) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("some_table")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      data, 
      message: `Record deleted by admin: ${user.email}` 
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete record", details: err },
      { status: 500 }
    );
  }
});

// Example 3: Simple pattern using handleAuthenticatedRequest
export async function GET(req: NextRequest) {
  return handleAuthenticatedRequest(req, async (supabase, user) => {
    // Simple pattern - just return the result object
    const { data, error } = await supabase
      .from("some_table")
      .select("*")
      .eq("user_id", user.id); // Only get user's own records

    return { data, error, user_info: { id: user.id, email: user.email } };
  });
}

// Example 4: PUT with authentication and validation
export const PUT = withAuth(async (req: NextRequest, supabase, user) => {
  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    // Check if user owns the record (additional authorization)
    const { data: existingRecord } = await supabase
      .from("some_table")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!existingRecord || existingRecord.user_id !== user.id) {
      return NextResponse.json(
        { error: "Forbidden - You can only update your own records" },
        { status: 403 }
      );
    }

    // Update the record
    const { data, error } = await supabase
      .from("some_table")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
        updated_by: user.id
      })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      data, 
      message: "Updated successfully",
      updated_by: user.email 
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update record", details: err },
      { status: 500 }
    );
  }
});
