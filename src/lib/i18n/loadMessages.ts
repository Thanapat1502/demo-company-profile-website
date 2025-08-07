import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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
 * Convert flat translation keys to nested object structure
 * Example: { "home.title": "Welcome" } → { home: { title: "Welcome" } }
 */
function flatKeysToNested(flatObject: Record<string, string>): Messages {
  const nested: Messages = {};

  Object.entries(flatObject).forEach(([key, value]) => {
    const keys = key.split('.');
    let current = nested;

    // Navigate/create the nested structure
    for (let i = 0; i < keys.length - 1; i++) {
      const currentKey = keys[i];
      if (!(currentKey in current)) {
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
 * Fetch translations from Supabase web_labels table
 * Returns nested object structure compatible with next-intl
 */
export async function loadMessages(locale: string): Promise<Messages> {
  // Check cache first for performance
  const cacheKey = `translations_${locale}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    const supabase = await createSupabaseClient();
    
    // Fetch all translations for the specified locale
    const { data: labels, error } = await supabase
      .from('web_labels')
      .select('key, value')
      .eq('locale', locale);

    if (error) {
      console.error(`Error fetching translations for locale ${locale}:`, error);
      // Return empty object as fallback
      return {};
    }

    if (!labels || labels.length === 0) {
      console.warn(`No translations found for locale ${locale}`);
      return {};
    }

    // Convert array of labels to flat object
    const flatTranslations: Record<string, string> = {};
    labels.forEach((label) => {
      flatTranslations[label.key] = label.value;
    });

    // Convert flat keys to nested structure
    const nestedTranslations = flatKeysToNested(flatTranslations);

    // Cache the result for performance
    translationCache.set(cacheKey, nestedTranslations);

    console.log(`Loaded ${labels.length} translations for locale ${locale}`);
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
  const promises = locales.map(locale => loadMessages(locale));
  await Promise.all(promises);
  console.log(`Preloaded translations for locales: ${locales.join(', ')}`);
}
