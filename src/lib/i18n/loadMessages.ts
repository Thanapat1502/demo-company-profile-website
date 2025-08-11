import { createServerClient } from "@supabase/ssr";
import fs from "fs";
import path from "path";

// Types for our translation system
export interface WebLabel {
  key: string;
  value: string;
  locale: string;
}

export interface Messages {
  [key: string]: string | Messages;
}

// In-memory cache for translations to improve performance
const translationCache = new Map<string, Messages>();

/**
 * Create a server-side Supabase client for fetching translations
 * This version doesn't use cookies to avoid making pages dynamic
 * Only for public translation data that doesn't require authentication
 */
function createSupabaseClientForTranslations() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // No-op for translation loading
        },
      },
    }
  );
}

/**
 * Flatten nested object to dot notation keys
 * Example: { home: { title: "Welcome" } } → { "home.title": "Welcome" }
 */
function flattenObject(obj: any, prefix = ""): Record<string, string> {
  const flattened: Record<string, string> = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      // Recursively flatten nested objects
      Object.assign(flattened, flattenObject(value, newKey));
    } else {
      // Convert value to string
      flattened[newKey] = String(value);
    }
  });

  return flattened;
}

/**
 * Convert flat translation keys to nested object structure
 * Example: { "home.title": "Welcome" } → { home: { title: "Welcome" } }
 */
function flatKeysToNested(flatObject: Record<string, string>): Messages {
  const nested: Messages = {};

  Object.entries(flatObject).forEach(([key, value]) => {
    const keys = key.split(".");
    let current = nested;

    // Navigate/create the nested structure
    for (let i = 0; i < keys.length - 1; i++) {
      const currentKey = keys[i];

      // Check if the current key exists and is not an object
      if (currentKey in current) {
        // If it's a string, we need to convert it to an object
        // but preserve the original value under a special key
        if (typeof current[currentKey] === "string") {
          const originalValue = current[currentKey];
          current[currentKey] = { _value: originalValue };
        }
      } else {
        current[currentKey] = {};
      }

      current = current[currentKey];
    }

    // Set the final value
    const finalKey = keys[keys.length - 1];
    current[finalKey] = value;
  });

  return nested;
}

/**
 * Load translations from JSON file using dynamic import (works better in serverless)
 * Returns flattened key-value pairs
 */
async function loadJsonTranslations(
  locale: string
): Promise<Record<string, string>> {
  try {
    // First try dynamic import (works best in Vercel)
    try {
      let jsonModule;

      // Try different import paths for different environments
      if (locale === "th") {
        jsonModule = await import("../../../messages/th.json");
      } else if (locale === "en") {
        jsonModule = await import("../../../messages/en.json");
      } else {
        // Fallback for other locales
        jsonModule = await import(`../../../messages/${locale}.json`);
      }

      const jsonData = jsonModule.default || jsonModule;

      // Flatten the nested JSON structure
      const flattened = flattenObject(jsonData);

      console.log(
        `📄 Successfully loaded ${
          Object.keys(flattened).length
        } translations from JSON module for locale ${locale}`
      );
      return flattened;
    } catch (importError) {
      console.warn(
        `📄 Dynamic import failed for ${locale}, trying file system...`,
        importError instanceof Error ? importError.message : String(importError)
      );
    }

    // Fallback to file system approach
    const possiblePaths = [
      // Development path
      path.join(process.cwd(), "messages", `${locale}.json`),
      // Vercel production path (standalone build)
      path.join(
        process.cwd(),
        ".next",
        "standalone",
        "messages",
        `${locale}.json`
      ),
      // Alternative Vercel path
      path.join("/var", "task", "messages", `${locale}.json`),
      // Next.js build path
      path.join(process.cwd(), ".next", "server", "messages", `${locale}.json`),
      // Relative to current file
      path.resolve(__dirname, "..", "..", "..", "messages", `${locale}.json`),
      // Alternative relative path
      path.resolve(__dirname, "..", "..", "messages", `${locale}.json`),
      // Root relative path
      path.resolve("/", "var", "task", "messages", `${locale}.json`),
    ];

    let filePath: string | null = null;
    let fileContent: string | null = null;

    // Try each path until we find the file
    for (const tryPath of possiblePaths) {
      try {
        if (fs.existsSync(tryPath)) {
          filePath = tryPath;
          fileContent = fs.readFileSync(tryPath, "utf8");
          break;
        }
      } catch {
        // Continue to next path
        continue;
      }
    }

    if (!fileContent || !filePath) {
      console.warn(
        `📄 JSON translation file not found for locale ${locale}. Tried paths:`,
        possiblePaths.map((p) => `\n  - ${p}`)
      );

      // Log current working directory and available files for debugging
      console.log(`📄 Current working directory: ${process.cwd()}`);
      try {
        const messagesDir = path.join(process.cwd(), "messages");
        if (fs.existsSync(messagesDir)) {
          const files = fs.readdirSync(messagesDir);
          console.log(`📄 Files in messages directory: ${files.join(", ")}`);
        } else {
          console.log(`📄 Messages directory does not exist: ${messagesDir}`);
        }
      } catch {
        console.log(`📄 Could not read messages directory for debugging`);
      }

      return {};
    }

    const jsonData = JSON.parse(fileContent);

    // Flatten the nested JSON structure
    const flattened = flattenObject(jsonData);

    console.log(
      `📄 Successfully loaded ${
        Object.keys(flattened).length
      } translations from JSON file for locale ${locale} (${filePath})`
    );
    return flattened;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      `📄 Error loading JSON translations for locale ${locale}:`,
      errorMessage
    );
    return {};
  }
}

/**
 * Fetch translations from Supabase web_labels table
 * Returns flattened key-value pairs
 */
async function loadSupabaseTranslations(
  locale: string
): Promise<Record<string, string>> {
  try {
    const supabase = createSupabaseClientForTranslations();

    // Add timeout for production reliability
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Supabase request timeout")), 10000); // 10 second timeout
    });

    // Fetch all translations for the specified locale with timeout
    const fetchPromise = supabase
      .from("web_labels")
      .select("key, value")
      .eq("locale", locale)
      .order("key");

    const { data: labels, error } = await Promise.race([
      fetchPromise,
      timeoutPromise,
    ]);

    if (error) {
      console.error(
        `🗄️  Error fetching Supabase translations for locale ${locale}:`,
        error.message || error
      );
      return {};
    }

    if (!labels || labels.length === 0) {
      console.warn(`🗄️  No Supabase translations found for locale ${locale}`);
      return {};
    }

    // Convert array of labels to flat object
    const flatTranslations: Record<string, string> = {};
    labels.forEach((label: { key: string; value: string }) => {
      if (label.key && label.value) {
        flatTranslations[label.key] = label.value;
      }
    });

    console.log(
      `🗄️  Successfully loaded ${labels.length} translations from Supabase for locale ${locale}`
    );
    return flatTranslations;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      `🗄️  Failed to load Supabase translations for locale ${locale}:`,
      errorMessage
    );

    // In production, don't throw - return empty object to allow JSON fallback
    if (process.env.NODE_ENV === "production") {
      console.log(
        `🗄️  Production mode: continuing with JSON translations only for ${locale}`
      );
    }

    return {};
  }
}

/**
 * Load and merge translations from both JSON files and Supabase
 * JSON files are loaded first, then Supabase translations override them
 * Returns nested object structure compatible with next-intl
 */
export async function loadMessages(locale: string): Promise<Messages> {
  // Check cache first for performance
  const cacheKey = `translations_${locale}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    // Load translations from both sources with individual error handling
    const [jsonTranslations, supabaseTranslations] = await Promise.allSettled([
      loadJsonTranslations(locale),
      loadSupabaseTranslations(locale),
    ]);

    // Extract successful results with fallbacks
    const jsonData =
      jsonTranslations.status === "fulfilled" ? jsonTranslations.value : {};
    const supabaseData =
      supabaseTranslations.status === "fulfilled"
        ? supabaseTranslations.value
        : {};

    // Log any failures for debugging
    if (jsonTranslations.status === "rejected") {
      console.warn(
        `Failed to load JSON translations for ${locale}:`,
        jsonTranslations.reason
      );
    }
    if (supabaseTranslations.status === "rejected") {
      console.warn(
        `Failed to load Supabase translations for ${locale}:`,
        supabaseTranslations.reason
      );
    }

    // Merge translations: JSON first, then Supabase overrides (Server-API priority)
    const mergedTranslations = {
      ...jsonData,
      ...supabaseData, // Supabase takes priority over JSON
    };

    // Ensure we have at least some translations
    if (Object.keys(mergedTranslations).length === 0) {
      console.error(
        `No translations loaded for locale ${locale}, using fallback`
      );
      // Try to load fallback locale (English) if current locale fails
      if (locale !== "en") {
        return await loadMessages("en");
      }
      return {}; // Last resort fallback
    }

    // Convert flat keys to nested structure for next-intl
    const nestedTranslations = flatKeysToNested(mergedTranslations);

    // Cache the result for performance
    translationCache.set(cacheKey, nestedTranslations);

    const totalCount = Object.keys(mergedTranslations).length;
    const jsonCount = Object.keys(jsonData).length;
    const supabaseCount = Object.keys(supabaseData).length;
    const overrideCount = Object.keys(jsonData).filter(
      (key) => key in supabaseData
    ).length;

    console.log(
      `✅ Loaded ${totalCount} total translations for locale ${locale}:`,
      `\n  📄 JSON: ${jsonCount} keys`,
      `\n  🗄️  Supabase: ${supabaseCount} keys`,
      `\n  🔄 Overrides: ${overrideCount} keys (Server-API priority)`
    );

    return nestedTranslations;
  } catch (error) {
    console.error(
      `❌ Critical error loading translations for locale ${locale}:`,
      error
    );

    // Try fallback to English if not already English
    if (locale !== "en") {
      console.log(`🔄 Falling back to English translations...`);
      try {
        return await loadMessages("en");
      } catch (fallbackError) {
        console.error(`❌ Fallback to English also failed:`, fallbackError);
      }
    }

    // Last resort: return empty object
    console.log(
      `⚠️  Using empty translations as last resort for locale ${locale}`
    );
    return {};
  }
}

/**
 * Clear the translation cache (useful for development or when translations are updated)
 */
export function clearTranslationCache(locale?: string) {
  if (locale) {
    translationCache.delete(`translations_${locale}`);
  } else {
    translationCache.clear();
  }
}

/**
 * Preload translations for all supported locales
 * Useful for warming up the cache
 */
export async function preloadAllTranslations(locales: string[]) {
  const promises = locales.map((locale) => loadMessages(locale));
  await Promise.all(promises);
  console.log(`Preloaded translations for locales: ${locales.join(", ")}`);
}
