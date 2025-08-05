import { supabase } from "@/lib/supabase-client";

/**
 * Initialize HISTORY content entries in the database
 * This script creates the necessary content entries for the history page
 */
export async function initHistoryContent() {
  console.log("🏛️ Initializing HISTORY content entries...");

  try {
    // Check if HISTORY content already exists
    const { data: existingContent, error: fetchError } = await supabase
      .from("contents")
      .select("*")
      .eq("page", "HISTORY");

    if (fetchError) {
      console.error("❌ Error checking existing content:", fetchError);
      return false;
    }

    console.log(
      "📊 Existing HISTORY content:",
      existingContent?.length || 0,
      "entries"
    );

    // Create HISTORY_1 content if it doesn't exist
    const history1Exists = existingContent?.some((c) => c.id === "HISTORY_1");
    if (!history1Exists) {
      console.log("📝 Creating HISTORY_1 content...");

      const { data: history1Data, error: history1Error } = await supabase
        .from("contents")
        .insert([
          {
            id: "HISTORY_1",
            page: "HISTORY",
            type: "gallery",
            images_url: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select();

      if (history1Error) {
        console.error("❌ Error creating HISTORY_1 content:", history1Error);
        return false;
      }

      console.log("✅ HISTORY_1 content created:", history1Data);
    } else {
      console.log("ℹ️ HISTORY_1 content already exists");
    }

    // Create HISTORY_2 content if it doesn't exist
    const history2Exists = existingContent?.some((c) => c.id === "HISTORY_2");
    if (!history2Exists) {
      console.log("📝 Creating HISTORY_2 content...");

      const { data: history2Data, error: history2Error } = await supabase
        .from("contents")
        .insert([
          {
            id: "HISTORY_2",
            page: "HISTORY",
            type: "gallery",
            images_url: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select();

      if (history2Error) {
        console.error("❌ Error creating HISTORY_2 content:", history2Error);
        return false;
      }

      console.log("✅ HISTORY_2 content created:", history2Data);
    } else {
      console.log("ℹ️ HISTORY_2 content already exists");
    }

    console.log("🎉 HISTORY content initialization completed successfully!");
    return true;
  } catch (error) {
    console.error("❌ Error initializing HISTORY content:", error);
    return false;
  }
}

/**
 * Check HISTORY content status
 */
export async function checkHistoryContentStatus() {
  console.log("🔍 Checking HISTORY content status...");

  try {
    const { data: content, error } = await supabase
      .from("contents")
      .select("*")
      .eq("page", "HISTORY");

    if (error) {
      console.error("❌ Error fetching HISTORY content:", error);
      return null;
    }

    const status = {
      total: content?.length || 0,
      history1: content?.find((c) => c.id === "HISTORY_1"),
      history2: content?.find((c) => c.id === "HISTORY_2"),
    };

    console.log("📊 HISTORY Content Status:");
    console.log("- Total entries:", status.total);
    console.log("- HISTORY_1:", status.history1 ? "✅ Exists" : "❌ Missing");
    console.log("- HISTORY_2:", status.history2 ? "✅ Exists" : "❌ Missing");

    if (status.history1) {
      console.log(
        "  - HISTORY_1 images:",
        status.history1.images_url?.length || 0
      );
    }
    if (status.history2) {
      console.log(
        "  - HISTORY_2 images:",
        status.history2.images_url?.length || 0
      );
    }

    return status;
  } catch (error) {
    console.error("❌ Error checking HISTORY content status:", error);
    return null;
  }
}

/**
 * Reset HISTORY content (for development/testing)
 */
export async function resetHistoryContent() {
  console.log("🔄 Resetting HISTORY content...");

  try {
    // Delete existing HISTORY content
    const { error: deleteError } = await supabase
      .from("contents")
      .delete()
      .eq("page", "HISTORY");

    if (deleteError) {
      console.error("❌ Error deleting HISTORY content:", deleteError);
      return false;
    }

    console.log("🗑️ Existing HISTORY content deleted");

    // Reinitialize
    const success = await initHistoryContent();

    if (success) {
      console.log("🎉 HISTORY content reset completed successfully!");
    }

    return success;
  } catch (error) {
    console.error("❌ Error resetting HISTORY content:", error);
    return false;
  }
}

// Export for use in other files
export default {
  initHistoryContent,
  checkHistoryContentStatus,
  resetHistoryContent,
};
