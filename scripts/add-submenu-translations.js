/**
 * Script to add navbar submenu translations to Supabase web_labels table
 * Usage: node scripts/add-submenu-translations.js
 */

const { createClient } = require("@supabase/supabase-js");

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing required environment variables:");
  console.error("- NEXT_PUBLIC_SUPABASE_URL");
  console.error("- NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Submenu translations to add
const submenuTranslations = [
  // About Company
  {
    key: "navigation.company.about",
    value: "About Padungsilpa Company",
    locale: "en",
    description: "Company submenu - About company link",
  },
  {
    key: "navigation.company.about",
    value: "เกี่ยวกับบริษัทผดุงศิลป์",
    locale: "th",
    description: "Company submenu - About company link",
  },
  // Company History
  {
    key: "navigation.company.history",
    value: "Company History",
    locale: "en",
    description: "Company submenu - History link",
  },
  {
    key: "navigation.company.history",
    value: "ประวัติความเป็นมา",
    locale: "th",
    description: "Company submenu - History link",
  },
  // Executive Team
  {
    key: "navigation.company.executive",
    value: "Executive Team",
    locale: "en",
    description: "Company submenu - Executive team link",
  },
  {
    key: "navigation.company.executive",
    value: "ผู้บริหาร",
    locale: "th",
    description: "Company submenu - Executive team link",
  },
  // Mission & Vision
  {
    key: "navigation.company.mission",
    value: "Mission & Vision",
    locale: "en",
    description: "Company submenu - Mission and vision link",
  },
  {
    key: "navigation.company.mission",
    value: "วิสัยทัศน์และพันธกิจ",
    locale: "th",
    description: "Company submenu - Mission and vision link",
  },
];

async function addSubmenuTranslations() {
  try {
    console.log("🚀 Adding navbar submenu translations...\n");

    let successCount = 0;
    let errorCount = 0;

    // Insert translations one by one to handle conflicts better
    for (const translation of submenuTranslations) {
      const { data, error } = await supabase
        .from("web_labels")
        .upsert(translation);

      if (error) {
        console.error(
          `❌ Error inserting ${translation.key} (${translation.locale}):`,
          error
        );
        errorCount++;
      } else {
        console.log(
          `✅ Added: ${translation.key} (${translation.locale}): ${translation.value}`
        );
        successCount++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   - Successfully added: ${successCount}`);
    console.log(`   - Errors: ${errorCount}`);

    if (errorCount === 0) {
      console.log("\n🎉 All navbar submenu translations are now available!");
    } else {
      console.log(
        "\n⚠️  Some translations failed to insert. Check the errors above."
      );
    }
  } catch (error) {
    console.error("💥 Script failed:", error);
    process.exit(1);
  }
}

// Run the script
addSubmenuTranslations();
