import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

// Types for our translation system
export interface WebLabel {
  key: string;
  value: string;
  locale: string;
}

export interface Messages {
  [key: string]: any;
}

// In-memory cache for translations to improve performance
const translationCache = new Map<string, Messages>();

/**
 * Create a server-side Supabase client for fetching translations
 * This ensures we can fetch data during SSR
 */
async function createSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
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
 * Load translations from JSON file
 * Returns flattened key-value pairs
 */
async function loadJsonTranslations(
  locale: string
): Promise<Record<string, string>> {
  try {
    const filePath = path.join(process.cwd(), "messages", `${locale}.json`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`JSON translation file not found: ${filePath}`);
      return {};
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(fileContent);

    // Flatten the nested JSON structure
    const flattened = flattenObject(jsonData);

    console.log(
      `Loaded ${
        Object.keys(flattened).length
      } translations from JSON file for locale ${locale}`
    );
    return flattened;
  } catch (error) {
    console.error(
      `Error loading JSON translations for locale ${locale}:`,
      error
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
    const supabase = await createSupabaseClient();

    // Fetch all translations for the specified locale
    const { data: labels, error } = await supabase
      .from("web_labels")
      .select("key, value")
      .eq("locale", locale);

    if (error) {
      console.error(
        `Error fetching Supabase translations for locale ${locale}:`,
        error
      );
      return {};
    }

    if (!labels || labels.length === 0) {
      console.warn(`No Supabase translations found for locale ${locale}`);
      return {};
    }

    // Convert array of labels to flat object
    const flatTranslations: Record<string, string> = {};
    labels.forEach((label) => {
      flatTranslations[label.key] = label.value;
    });

    console.log(
      `Loaded ${labels.length} translations from Supabase for locale ${locale}`
    );
    return flatTranslations;
  } catch (error) {
    console.error(
      `Failed to load Supabase translations for locale ${locale}:`,
      error
    );
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
    // Load translations from both sources
    const [jsonTranslations, supabaseTranslations] = await Promise.all([
      loadJsonTranslations(locale),
      loadSupabaseTranslations(locale),
    ]);

    // Merge translations: JSON first, then Supabase overrides
    const mergedTranslations = {
      ...jsonTranslations,
      ...supabaseTranslations,
    };

    // Convert flat keys to nested structure for next-intl
    const nestedTranslations = flatKeysToNested(mergedTranslations);

    // Cache the result for performance
    translationCache.set(cacheKey, nestedTranslations);

    const totalCount = Object.keys(mergedTranslations).length;
    const jsonCount = Object.keys(jsonTranslations).length;
    const supabaseCount = Object.keys(supabaseTranslations).length;

    console.log(
      `Loaded ${totalCount} total translations for locale ${locale} (${jsonCount} from JSON, ${supabaseCount} from Supabase)`
    );
    return nestedTranslations;
  } catch (error) {
    console.error(`Failed to load translations for locale ${locale}:`, error);
    // Return empty object as fallback
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
