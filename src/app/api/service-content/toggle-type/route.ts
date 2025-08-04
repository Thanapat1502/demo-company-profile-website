import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth-middleware";

// Valid service IDs
const VALID_SERVICE_IDS = ["SERVICE_1", "SERVICE_2", "SERVICE_3", "SERVICE_4"];

export const PUT = withAuth(async (req: NextRequest, supabase) => {
  try {
    console.log("Service Content Toggle Type - Authenticated request");

    const { serviceId, type } = await req.json();

    // Validate service ID
    if (!VALID_SERVICE_IDS.includes(serviceId)) {
      return NextResponse.json(
        {
          error: `Invalid service ID. Must be one of: ${VALID_SERVICE_IDS.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // Validate type
    if (!["gallery", "video"].includes(type)) {
      return NextResponse.json(
        { error: "Type must be 'gallery' or 'video'" },
        { status: 400 }
      );
    }

    // Check if record exists
    const { data: existingRecord, error: fetchError } = await supabase
      .from("contents")
      .select("*")
      .eq("id", serviceId)
      .eq("page", "SERVICE")
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching existing record:", fetchError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    let result;
    const updateData = {
      type,
      updated_at: new Date().toISOString(),
    };

    if (existingRecord) {
      // Update existing record - only change the type
      const { data, error } = await supabase
        .from("contents")
        .update(updateData)
        .eq("id", serviceId)
        .eq("page", "SERVICE")
        .select()
        .single();

      if (error) {
        console.error("Error updating service content type:", error);
        return NextResponse.json(
          { error: "Failed to update service content type" },
          { status: 500 }
        );
      }
      result = data;
    } else {
      // Create new record with the specified type
      const newRecord = {
        id: serviceId,
        page: "SERVICE",
        type,
        images_url: [],
        video_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("contents")
        .insert(newRecord)
        .select()
        .single();

      if (error) {
        console.error("Error creating service content:", error);
        return NextResponse.json(
          { error: "Failed to create service content" },
          { status: 500 }
        );
      }
      result = data;
    }

    return NextResponse.json({
      success: true,
      data: result,
      message: `Service content type updated to ${type}`,
    });
  } catch (error) {
    console.error("Service content toggle type API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
});
